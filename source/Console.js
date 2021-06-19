import { View } from 'curvature/base/View';
import { Bag  } from 'curvature/base/Bag';

import { MeltingText } from './view/MeltingText';
import { EchoMessage } from './view/EchoMessage';

import { Task } from './Task';
import { Path } from './Path';

import { rawquire } from 'rawquire/rawquire.macro';

import { Renderer as AnsiRenderer } from './ansi/Renderer';
import { Parser as AnsiParser } from './ansi/Parser';

export class Console extends View
{
	constructor(options = {}, args = {})
	{
		super(args);

		const defaults = {init: false, path: Path};

		const allOptions = Object.assign({}, defaults, options);

		this.template      = rawquire('./console.tmp.html');
		this.args.input    = '';
		this.args.output   = [];
		this.args.inverted = '';
		this.localEcho     = true;
		this.postToken     = null;
		this.args.prompt   = '::';
		this.routes        = {};

		this.args.passwordMode = false;

		this.tasks = [];

		this.taskList = new Bag;

		this.taskList.type = Task;

		this.max = 10;

		this.historyCursor = -1;
		this.history       = [];

		this.env = new Map();

		this.args.output.___after((t, k, o, a) => {

			if(k !== 'push')
			{
				return;
			}

			this.onNextFrame(()=> this.scrollToBottom());
		});

		if(allOptions.init)
		{
			this.runScript(allOptions.init);
		}

		this.scroller = allOptions.scroller || document.body;

		this.path = allOptions.path || {};

		this.originalInput = '';
	}

	runCommand(command)
	{
		if(this.historyCursor != 0)
		{
			this.history.unshift(command);
		}

		return new Promise(accept => {

			let task;

			if(command.substring(0, 1) === '/')
			{
				if(!this.args.passwordMode)
				{
					const output = new EchoMessage({message:command});

					this.args.output.push(output);
				}

				const unescaped = this.unescape(command.substr(1));

				task = this.interpret(unescaped);
			}
			else if(this.tasks.length)
			{
				if(!this.args.passwordMode)
				{
					const output = new EchoMessage({message:command, prompt:this.tasks[0].prompt});

					this.args.output.push(output);
				}

				const unescaped = this.unescape(command);

				task = this.tasks[0].write(unescaped) || Promise.resolve();
			}
			else
			{
				if(!this.args.passwordMode)
				{
					this.args.output.push(`:: ${command}`);
				}

				const unescaped = this.unescape(command);

				task = this.interpret(unescaped);
			}

			if(!(task instanceof Task) && !(task instanceof Promise))
			{
				task = Promise.resolve(task);

				this.args.output.push(`:: ${command}`);
			}

			this.historyCursor = -1;

			this.originalInput = this.args.input = '';

			task.then(result => accept(result));

		}).catch(error => {

			this.args.output.push(`Unexpected error: ${error}`);

		});
	}

	runScript(url)
	{
		fetch(url + '?api=txt').then((response) => {
			return response.text();
		}).then((init) => {
			let lines = init.split("\n");

			const process = (lines) => {

				if(!lines.length)
				{
					return;
				}

				let line = lines.shift();

				if (line && line[0] == '!')
				{
					this.args.output.push(line.substring(1));
					process(lines);
				}
				else if(line)
				{
					this.runCommand(line).then(()=>process(lines));
				}
				else
				{
					process(lines);
				}
			}

			process(lines);
		});
	}

	postRender()
	{
		const inputBox    = this.tags.input.element;
		const passwordBox = this.tags.password.element;

		this.args.bindTo('input', (v) => {
			// inputBox.style.height = 'auto';
			// inputBox.style.height = inputBox.scrollHeight + 'px';
		}, {frame: 1});

		this.args.bindTo('passwordMode', (v) => {
			if(v)
			{
				inputBox.style.display = 'none';
				passwordBox.style.display = 'unset';
			}
			else
			{
				inputBox.style.display = 'unset';
				passwordBox.style.display = 'none';
			}
		});

		this.args.bindTo('passwordMode', (v) => {
			this.focus(null, v);
		}, {frame: 1});
	}

	focus(event = null, passwordMode = null)
	{
		if(event)
		{
			event.preventDefault();
		}

		if (event && event.target && event.target.matches('input,textarea'))
		{
			return;
		}

		if(window.getSelection().toString())
		{
			return;
		}

		if(passwordMode || this.args.passwordMode)
		{
			this.tags.password.element.focus();
			return;
		}

		this.tags.input.element.focus();
	}

	interpret(input)
	{
		this.historyCursor = -1;

		const expressions = input.split(/\s*\;\s*/);

		let lastTask = null;

		for(const expression of expressions)
		{
			const task = this.pipe( expression.split(/\s*\|\s*/) );

			if(task)
			{
				this.tasks.unshift(task);

				const output = (event) => {

					const line = event.detail;

					if(typeof line === 'object')
					{
						this.args.output.push(line);
					}
					else
					{
						const prompt = task.outPrompt || task.prompt || this.args.prompt || '::';

						const rendered = this.parseAnsi(line, prompt);

						this.args.output.push(rendered);
					}
				};

				const error  = (event) => {

					console.error(event);

					const line = event.detail;

					const errorPrompt = task.errorPrompt || '!!';

					const rendered = this.parseAnsi(line, errorPrompt);

					this.args.output.push(rendered);
				}

				task.addEventListener('output', output);
				task.addEventListener('error', error);

				task.execute();

				task.catch(error  => console.error(error));
				task.catch(error  => this.args.output.push(`!! ${error}`));

				this.args.prompt = task.prompt;

				task.finally(done => {
					task.removeEventListener('error', error);
					task.removeEventListener('output', output);

					this.tasks.shift();

					if(this.tasks.length)
					{
						this.args.prompt = this.tasks[0].prompt;
					}
					else
					{
						this.args.prompt = '::';
					}
				});
			}

			lastTask = task;
		}

		return lastTask;
	}

	pipe(commands, previousTask)
	{
		let task = null;

		const commandString = commands.shift();

		const args = commandString.trim().split(' ');

		let command = args.shift().trim();

		if(command.length > 1 && command.substr(-1) == "?")
		{
			command = command.substr(0, command.length - 1);

			if(command in this.path)
			{
				this.args.output.push(`?? ${this.path[ command ].helpText}`);
				this.args.output.push(`?? ${this.path[ command ].useText}`);
			}

			return;
		}

		if(command in this.path)
		{
			const cmdClass = this.path[command];

			task = new cmdClass(args, previousTask, this);
		}
		else
		{
			switch (command)
			{
				case 'clear': this.args.output.splice(0); break;

				case 'z':
					this.args.output.splice(0);
					this.args.output.push(new MeltingText({ input: '!!!' }));
					break;

				case 'commands':
				case '?':
					this.args.output.push(`   Subspace Console 0.29a ©2018-2021 Sean Morris`);

					for(const cmd in this.path)
					{
						this.args.output.push(` * ${cmd} - ${this.path[cmd].helpText}`);
						this.path[cmd].useText
						&& this.args.output.push(`   ${this.path[cmd].useText}`);

						this.args.output.push(`  `);

					}
					break;

				default:
					this.args.output.push(`!! Bad command: ${command}`);
			}
		}

		if(commands.length)
		{
			return this.pipe(commands, task);
		}

		return task;
	}

	keydown(event, autocomplete)
	{
		switch(event.key)
		{
			case 'Tab':
				if(autocomplete)
				{
					break;
				}
				event.preventDefault();
				break;

			case 'Enter':
				if(!event.ctrlKey)
				{
					event.preventDefault();
				}
				break;
		}
	}

	keyup(event, autocomplete)
	{
		switch(event.key)
		{
			case 'ArrowDown': {

				this.onNextFrame(()=> this.scrollToBottom());

				this.historyCursor--;

				if(this.historyCursor <= -1)
				{
					this.historyCursor = -1;
					this.args.input = this.originalInput;
					return;
				}

				this.args.input = this.history[this.historyCursor];

				const element = this.tags.input.element;
				element.selectionStart = element.value.length;
				element.selectionEnd   = element.value.length;

				event.stopImmediatePropagation();
				event.stopPropagation();
				event.preventDefault();

				break;
			}

			case 'ArrowUp': {

				this.onNextFrame(()=> this.scrollToBottom());

				if(this.historyCursor == -1)
				{
					this.originalInput = this.args.input;
				}

				this.historyCursor++;

				if (this.historyCursor >= this.history.length) {
					this.historyCursor--;
					return;
				}

				this.args.input = this.history[this.historyCursor];

				const element = this.tags.input.element;

				element.selectionStart = element.value.length;
				element.selectionEnd   = element.value.length;

				event.stopImmediatePropagation();
				event.stopPropagation();
				event.preventDefault();

				break;
			}

			case 'Escape':
				if(this.tasks.length)
				{
					console.log( Task.KILL );

					this.tasks[0].finally(()=>this.args.output.push(
						`:: Killed.`
					));

					this.tasks[0].signal( Task.KILL );
					this.tasks[0].signal('kill');
				}

				this.args.passwordMode = false;
				break;

			case 'Tab':

				event.preventDefault();

				if(!this.args.input || this.args.input[0] !== '/')
				{
					break;
				}

				const search = this.args.input.substr(1);

				for(const cmd in this.path)
				{
					if(cmd.length < search.length)
					{
						continue;
					}

					if(search === cmd.substr(0, search.length))
					{
						this.args.input = '/' + cmd;
						break;
					}
				}

				break;

			case 'Enter':
				if(!event.ctrlKey)
				{
					event.preventDefault();
				}
				else
				{
					return;
				}

				this.runCommand(this.args.input);
				this.args.input = '';

				break;

			default:
				this.historyCursor = -1;
				this.scrollToBottom();
				break;
		}
	}

	cancel(event)
	{
		event.preventDefault();
		event.stopPropagation();
	}

	scrollToBottom()
	{
		const scroller = (this.scroller === document.body ? window : this.scroller) || window;
		const scrollTo = (this.scroller === document.body ? this.scroller : document.body).scrollHeight;

		this.onNextFrame(() =>{
			scroller.scrollTo({behavior: 'smooth', left: 0, top: scrollTo});
		});
	}

	parseAnsi(line, prompt)
	{
		line = line.replace(/</g, '&lt;').replace(/>/g, '&gt;');

		const renderer = new AnsiRenderer;

		const parsed  = AnsiParser.parse(line);
		const wrapped = renderer.process(parsed);

		if(!prompt)
		{
			return View.from(`<span class ="ansi">${wrapped}</span>`);
		}

		const promptEsc = prompt
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;');

		const rendered = View.from(`${promptEsc} <span class ="ansi">${wrapped}</span>`);

		return rendered;
	}

	unescape(string)
	{
		return string
			.replace(/\\n/gm,'\n')
			.replace(/\\r/gm,'\r')
			.replace(/\\t/gm,'\t')
			.replace(/\\e/gm,'\u001b')
			.replace(/\\u001b/gm,'\u001b')
	}

	write(...lines)
	{
		for(const line of lines)
		{
			if(typeof line === 'string')
			{
				const unescaped = this.unescape(line);
				const parsed = this.parseAnsi(unescaped);

				this.args.output.push(parsed);

				continue;
			}

			this.args.output.push(line);
		}
	}
}
