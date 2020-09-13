import { View } from 'curvature/base/View';

import { MeltingText } from './view/MeltingText';

import { Task } from './Task';
import { Path } from './Path';

import { rawquire } from './rawquire.macro';

export class Console extends View {
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

		this.max = 512;

		this.historyCursor = -1;
		this.history       = [];

		this.env = new Map();

		this.args.output.___after((t, k, o, a) => {
			if(k !== 'push')
			{
				return;
			}

			if(this.args.output.length > this.max)
			{
				const removed = this.args.output.shift();

				if(typeof removed === 'object')
				{
					removed.remove();
				}
			}

			const scroller = this.scroller;
			const scrollTo = scroller === window
				? document.body.scrollHeight
				: scroller.scrollHeight;

			this.onNextFrame(() =>{
				scroller.scrollTo({
					behavior: 'smooth'
					, left:   0
					, top:    scroller.scrollHeight
				});

			});
		});

		if(allOptions.init)
		{
			this.runScript(allOptions.init);
		}

		this.scroller = allOptions.scroller || window;

		this.path = allOptions.path || {};

		this.originalInput = '';
	}

	runCommand(command)
	{
		// console.log(command);

		if(this.historyCursor != 0)
		{
			this.history.unshift(command);
		}

		let ret;

		if(command.substring(0, 1) === '/')
		{
			if(!this.args.passwordMode)
			{
				this.args.output.push(`:: ${command}`);
			}

			ret = this.interpret(command.substr(1));
		}
		else if(this.tasks.length)
		{
			if(!this.args.passwordMode)
			{
				this.args.output.push(`${this.tasks[0].prompt} ${command}`);
			}

			ret = this.tasks[0].write(command) || Promise.resolve();
		}
		else
		{
			if(!this.args.passwordMode)
			{
				this.args.output.push(`:: ${command}`);
			}

			ret = this.interpret(command);
		}

		if(!(ret instanceof Promise))
		{
			ret = Promise.resolve(ret);
		}

		this.historyCursor = -1;

		this.originalInput = this.args.input = '';

		return ret;
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
			inputBox.style.height = 'auto';
			inputBox.style.height = inputBox.scrollHeight + 'px';
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

	interpret(command)
	{
		this.historyCursor = -1;

		const commands = command.split(/\s*\|\s*/);

		let task = null;
		let topTask = null;

		for(const commandString of commands)
		{
			const args = commandString.trim().split(' ');
			const command = args.shift().trim();

			if(command.length > 1 && command.substr(-1) == "?")
			{
				command = command.substr(0, command.length - 1);

				if(command in this.path)
				{
					this.args.output.push(`?? ${this.path[command].helpText}`);
					this.args.output.push(`?? ${this.path[command].useText}`);
				}

				continue;
			}

			if(command in this.path)
			{
				const cmdClass = this.path[command];

				// console.log(cmdClass);

				task = new cmdClass(args, task, this);
			}
			else
			{
				switch (command)
				{
					case 'clear': this.args.output.splice(0); break;

					case 'z':
						this.args.output.push(
							new MeltingText({ input: 'lmao!' })
						);
						break;

					case 'commands':
					case '?':
						this.args.output.push(`   Subspace Console 0.29a ©2018-2020 Sean Morris`);

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
		}

		if(task)
		{
			this.tasks.unshift(task);

			const output = (event) => {
				const prompt = task.outPrompt || task.prompt || this.args.prompt || '::';

				this.args.output.push(`${prompt} ${event.detail}`);
			};

			const error  = (event) => {
				const errorPrompt = task.errorPrompt || '!!';

				this.args.output.push(`${errorPrompt} ${event.detail}`);
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

		this.args.input = '';

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
			case 'ArrowDown':
				this.historyCursor--;

				if(this.historyCursor <= -1)
				{
					this.historyCursor = -1;
					this.args.input = this.originalInput;
					return;
				}

				this.args.input = this.history[this.historyCursor];

				this.onNextFrame(()=>{
					const element = this.tags.input.element;
					element.selectionStart = element.value.length;
					element.selectionEnd   = element.value.length;
				});
				break;

			case 'ArrowUp':
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

				this.onNextFrame(()=>{
					const element = this.tags.input.element;
					element.selectionStart = element.value.length;
					element.selectionEnd   = element.value.length;
				});
				break;

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

				break;

			default:
				this.historyCursor = -1;
				window.scrollTo({
					top: document.body.scrollHeight,
					left: 0,
					behavior: 'smooth'
				});
				break;
		}
	}

	cancel(event)
	{
		event.preventDefault();
		event.stopPropagation();
	}
}
