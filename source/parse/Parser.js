const IGNORE = 0;
const INSERT = 1;
const ENTER  = 2;
const LEAVE  = 3;
const HOME   = 4;

const colors16  = require('./colors-16');
const colors255 = require('./colors-255');

class Chunk
{
	constructor()
	{
		this.depth = 0;
		this.match = null;
		this.type  = 'normal';
		this.list  = [];
	}
}

class Parser
{
	constructor(tokens, modes)
	{
		this.index = 0;
		this.mode  = 'normal';
		this.stack = [];

		this.tokens = tokens || {};
		this.modes  = modes  || {};
	}

	parse(source)
	{
		if(!(this.mode in this.modes))
		{
			throw new Error(`Mode ${this.mode} does not exist on parser.`, this);
		}

		let chunk = new Chunk;
		let mode  = this.modes[this.mode];

		chunk.type = this.mode;

		while(this.index < source.length)
		{
			let matched = false;

			for(const tokenName in mode)
			{
				const token  = this.tokens[tokenName];
				const search = token.exec(source.substr(this.index));

				if(!search || search.index > 0)
				{
					continue;
				}

				if(!mode[tokenName])
				{
					throw new Error(`Invalid token type "${tokenName}" found in mode "${this.mode}".`);
					continue;
				}

				const value = search[0];

				const actions = typeof mode[tokenName] === 'object'
					? mode[tokenName]
					: [mode[tokenName]];

				matched = true;

				this.index += value.length;

				let type = 'normal';

				for(const i in actions)
				{
					const action = actions[i];

					if(typeof action === 'string')
					{
						if(!(action in this.modes))
						{
							throw new Error(`Mode "${action}" does not exist.`)
						}

						this.mode = action;
						mode = this.modes[this.mode];
						type = action;

						continue;
					}

					switch(action)
					{
						case INSERT:
							chunk.list.push(value);
							break;

						case ENTER:

							const newChunk  = new Chunk;

							newChunk.depth  = chunk.depth + 1;
							newChunk.match  = value;
							newChunk.groups = [...value.match(token)].slice(1);
							newChunk.mode   = type;
							newChunk.type   = tokenName;

							chunk.list.push(newChunk);
							this.stack.push(chunk);

							chunk = newChunk;
							// this.mode = chunk.type;

							break;

						case LEAVE:
							if(!this.stack.length)
							{
								// throw new Warning(`Already at the top of the stack.`)
							}
							else
							{

								chunk = this.stack.pop();

								this.mode = chunk.type;
								mode = this.modes[this.mode];

							}

							break;

						case HOME:
							this.stack.splice(0);
							mode = this.modes['normal'];
							break;
					}
				}

				break;
			}

			if(!matched)
			{
				break;
			}
		}

		if(this.stack.length)
		{
			throw new Error('Did not return to top of stack!');
		}

		return this.stack.shift() || chunk;
	}
}

class Transformer
{
	constructor(ops)
	{
		this.ops = ops || {};
	}

	process(tree)
	{
		let output = '';

		for(const i in tree.list)
		{
			let chunk = tree.list[i];

			if(this.ops[tree.type])
			{
				output += this.ops[tree.type]( chunk, tree );
			}
			else
			{
				output += chunk;
			}

		}

		return output;
	}
}

// const tokens = {
// 	space:       /\s+/s
// 	, word:      /\w+/
// 	, down:      /</
// 	, up:        />/
// 	, escape:    /\\/
// 	, n:         /n/
// 	, character: /./
// };

// const modes  = {
// 	normal:{
// 		escape:  ['escape', ENTER]
// 		, space: INSERT
// 		, word:  INSERT
// 		, up:    ['up',   ENTER, INSERT]
// 		, down:  ['down', ENTER, INSERT]
// 	}
// 	, elevate:{
// 		escape:  ['escape', ENTER]
// 		, space: INSERT
// 		, word:  INSERT
// 		, up:    ['up',   ENTER]
// 		, down:  ['down', ENTER]
// 	}
// 	, escape:{
// 		character: [INSERT, LEAVE]
// 	}
// 	, up:{
// 		space:  [LEAVE, 'elevate', ENTER, INSERT]
// 		, word: [LEAVE, 'elevate', ENTER, INSERT]
// 		, up:   [INSERT, LEAVE]
// 		, down: LEAVE
// 	}
// 	, down:{
// 		space:  [LEAVE, INSERT, LEAVE]
// 		, word: [LEAVE, INSERT, LEAVE]
// 		, up:   [LEAVE, 'up', ENTER]
// 		, down: [INSERT, LEAVE]
// 	}
// };

const tokens = {
	reset:         /\u001b\[(0)m/
	, esc:         /\u001b\[(\d+);?(\d+)?;?([\d;]*)./
	, characters:  /[^\u001b]+/
};

const modes  = {
	normal:{
		reset: [IGNORE, ENTER, LEAVE]
		, esc: [IGNORE, ENTER, LEAVE]
		, characters: [INSERT]
	},
}

const readline = require('readline');

var rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	terminal: false
});

rl.on('line', (line) => {
	const parser = new Parser(tokens, modes);
	const syntax = parser.parse(line);

	// process.stdout.write(JSON.stringify(syntax, null, 2) + '\n');

	let style = {};

	const change = new Transformer({
		normal:   (chunk, parent) => {

			if(typeof chunk === 'string')
			{
				return chunk;
			}

			if(typeof chunk === 'object')
			{
				if(chunk.type === 'esc' || chunk.type === 'reset')
				{
					let styleString = '';

					for(g in chunk.groups)
					{
						const group = Number(chunk.groups[g]);


						for([key, val] of Object.entries(style))
						{
							styleString += `${key}: ${val}; `;
						}

						switch(group)
						{
							case 0:
								for(key in style)
								{
									style[key] = 'initial'

									if(key === 'color')
									{
										style[key] = 'var(--fgColor)'
									}

									if(key === 'background-color')
									{
										style[key] = 'var(--bgColor)'
									}
								}
								break;

							case 1:
								style['filter'] = 'brightness(1.5) contrast(0.5)';
								style['opacity'] = 1;
								break;

							case 2:
								style['filter'] = 'brightness(0.5) contrast(1.5)';
								style['opacity'] = 0.75;
								break;

							case 3:
								style['font-style'] = 'italic';
								break;

							case 4:
								style['text-decoration'] = 'underline';
								break;

							case 5:
								style['animation'] = 'var(--ansiBlink)';
								break;

							case 7:
								style['filter'] = 'invert(1) contrast(1.5)';
								break;

							case 8:
								style['opacity'] = 0.1;
								break;

							case 9:
								style['text-decoration'] = 'line-through';
								break;

							case 10:
								style['font-family'] = 'var(--base-font))';
								break;

							case 11:
							case 12:
							case 13:
							case 14:
							case 15:
							case 16:
							case 17:
							case 18:
							case 19:
								style['font-family'] = `var(--alt-font-no-${group})`;
								break;

							case 20:
								style['font-family'] = 'var(--alt-font-fraktur)';
								break;

							case 21:
								style['font-weight'] = 'initial';
								break;

							case 22:
								style['font-weight'] = 'initial';
								break;

							case 23:
								style['font-style'] = 'fractur';
								break;

							case 24:
								style['text-decoration'] = 'none';
								break;

							case 25:
								style['animation'] = 'none';
								break;

							case 27:
								style['filter'] = 'initial';
								break;

							case 28:
								style['opacity'] = 'initial';
								break;

							case 29:
								style['text-decoration'] = 'initial';
								break;

							case 30:
								style['color'] = pallete.black;
								break;

							case 31:
								style['color'] = pallete.red;
								break;

							case 32:
								style['color'] = pallete.green;
								break;

							case 33:
								style['color'] = pallete.yellow;
								break;

							case 34:
								style['color'] = pallete.blue;
								break;

							case 35:
								style['color'] = pallete.magenta;
								break;

							case 36:
								style['color'] = pallete.cyan;
								break;

							case 37:
								style['color'] = pallete.white;
								break;

							case 38:

								if(chunk.groups[1] == 2)
								{
									const [r,g,b] = chunk.groups[g+1].split(';');

									style['color'] = `rgb(${r},${g},${b})`;
								}

								if(chunk.groups[1] == 5)
								{
									const {r,g,b} = oneByte[ Number(chunk.groups[g+1]) ];

									style['color'] = `rgb(${r},${g},${b})`;
								}

								break;

							case 39:
								style['color'] = 'var(--fgColor)';
								break;

							case 40:
								style['background-color'] = pallete.black;
								break;

							case 41:
								style['background-color'] = pallete.red;
								break;

							case 42:
								style['background-color'] = pallete.green;
								break;

							case 43:
								style['background-color'] = pallete.yellow;
								break;

							case 44:
								style['background-color'] = pallete.blue;
								break;

							case 45:
								style['background-color'] = pallete.magenta;
								break;

							case 46:
								style['background-color'] = pallete.cyan;
								break;

							case 47:
								style['background-color'] = pallete.white;
								break;

							case 38:

								if(chunk.groups[1] == 2)
								{
									const [r,g,b] = chunk.groups[g+1].split(';');

									style['background-color'] = `rgb(${r},${g},${b})`;
								}

								if(chunk.groups[1] == 5)
								{
									const {r,g,b} = oneByte[ Number(chunk.groups[g+1]) ];

									style['background-color'] = `rgb(${r},${g},${b})`;
								}

								break;

							case 49:
								style['background-color'] = 'var(--bgColor)';
								break;

							case 51:
								style['border'] = '1px solid currentColor';
								break;

							case 52:
								style['border'] = '1px solid currentColor';
								style['border-radius'] = '1em';
								break;

							case 53:
								style['border-top'] = '1px solid currentColor';
								break;

							case 54:
								style['border'] = 'initial';
								break;

							case 55:
								style['border'] = 'initial';
								break;
						}
					}

					return `</span><span class = "ansi" style = "${styleString}">`
				}
			}
		}
	});

	const output = '<div>' + change.process(syntax) + '</div>';

	console.log(output);
});

