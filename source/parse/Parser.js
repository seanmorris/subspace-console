const INSERT = 1;
const ENTER = 2;
const LEAVE = 3;

class Chunk
{
	constructor()
	{
		this.depth = 0;
		this.match = 0;
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

				const value  = search[0];
				const actions = typeof mode[tokenName] === 'object'
					? mode[tokenName]
					: [mode[tokenName]];

				matched = true;

				console.log(chunk.type,chunk.depth,value);

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

							const newChunk = new Chunk;
							newChunk.depth = chunk.depth + 1;
							newChunk.match = value;
							newChunk.type  = type;

							chunk.list.push(newChunk);
							this.stack.push(chunk);

							chunk = newChunk;
							// this.mode = chunk.type;

							break;

						case LEAVE:
							if(!this.stack.length)
							{
								console.log(this.mode, `"${value}"`, chunk);
								throw new Error(`Already at the top of the stack.`)
							}

							chunk = this.stack.pop();

							this.mode = chunk.type;
							mode = this.modes[this.mode];

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
			const chunk = tree.list[i];

			if(typeof chunk === 'object')
			{
				output += this.process(chunk);

				continue;
			}

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

const tokens = {
	space:       /\s+/s
	, word:      /\w+/
	, down:      /</
	, up:        />/
	, escape:    /\\/
	, n:         /n/
	, character: /./
};

const modes  = {
	normal:{
		escape:  ['escape', ENTER]
		, space: INSERT
		, word:  INSERT
		, up:    ['up',   ENTER, INSERT]
		, down:  ['down', ENTER, INSERT]
	}
	, elevate:{
		escape:  ['escape', ENTER]
		, space: INSERT
		, word:  INSERT
		, up:    ['up',   ENTER]
		, down:  ['down', ENTER]
	}
	, escape:{
		character: [INSERT, LEAVE]
	}
	, up:{
		space:  [LEAVE, 'elevate', ENTER, INSERT]
		, word: [LEAVE, 'elevate', ENTER, INSERT]
		, up:   [INSERT, LEAVE]
		, down: LEAVE
	}
	, down:{
		space:  [LEAVE, INSERT, LEAVE]
		, word: [LEAVE, INSERT, LEAVE]
		, up:   [LEAVE, 'up', ENTER]
		, down: [INSERT, LEAVE]
	}
};

const parser = new Parser(tokens, modes);
const syntax = parser.parse('The >quick \\<brown\\\\ fox<< jumps over< the lazy dog\\n');

process.stdout.write(JSON.stringify(syntax, null, 2) + '\n');

const change = new Transformer({
	elevate:  (x) => String(x).toUpperCase()
	, escape: (x) => x === 'n' ? "\n" : x
	, normal: (x) => String(x)
});

const output = change.process(syntax);

process.stdout.write(output + '\n', null, 2);
