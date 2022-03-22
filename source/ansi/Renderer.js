import { Renderer as BaseRenderer } from 'sixgram/Renderer';

import { pallete } from './pallete';
import { Colors255 } from './Colors255';

const audio = typeof window.AudioContext === 'function'
	? new window.AudioContext()
	: false;

if(audio)
{
	const gainNode = audio.createGain();
	gainNode.connect(audio.destination);
	gainNode.gain.value = 10 * 0.01;
}

export class Renderer extends BaseRenderer
{
	style = {};

	constructor()
	{
		super({
			normal: (chunk, parent) => this.setGraphicsMode(chunk, parent)
		})
	}

	reset()
	{
		for(const [k,] of Object.entries(this.style))
		{
			delete this.style[k];
		}
	}

	beep()
	{
		if(!audio)
		{
			return;
		}
		
		const oscillator = audio.createOscillator();

		oscillator.connect(gainNode);
		oscillator.frequency.value = 840;
		oscillator.type="square";

		oscillator.start(audio.currentTime)
		oscillator.stop(audio.currentTime + 200 * 0.001);
	}

	setGraphicsMode(chunk, parent)
	{
		if(typeof chunk === 'string')
		{
			if(chunk === '')
			{
				return false;
			}

			let styleString = '';

			for(const [key, val] of Object.entries(this.style))
			{
				styleString += `${key}: ${val}; `;
			}

			return `<span class = "ansi" style = "${styleString}">${chunk}</span>`;
		}

		if(typeof chunk === 'object')
		{
			if(chunk.type === 'escaped' && chunk.groups[0] === 'a')
			{
				this.beep();
			}

			if(chunk.type === 'graphics' || chunk.type === 'reset')
			{
				for(let g = 0; g < chunk.groups.length; g++)
				{
					const group = Number(chunk.groups[g]);

					if(chunk.groups[g] === '')
					{
						return false;
					}

					switch(group)
					{
						case 0:
							for(const key in this.style)
							{
								delete this.style[key];
							}
							break;

						case 1:
							this.style['filter'] = 'contrast(1.25)';
							// this.style['text-shadow'] = '1px 1px 1px rgba(0,0,0,0.25), 0px 0px 1px rgba(0,0,0,0.125)';
							this.style['font-weight'] = 'bold';
							this.style['opacity'] = 1;
							break;

						case 2:
							this.style['filter'] = 'brightness(0.85)';
							this.style['font-weight'] = 'light';
							this.style['opacity'] = 0.75;
							break;

						case 3:
							this.style['font-style'] = 'italic';
							break;

						case 4:
							this.style['text-decoration'] = 'underline';
							break;

						case 5:
							this.style['animation'] = 'var(--ansiBlink)';
							break;

						case 7:
							this.style['filter'] = 'invert(1)';
							break;

						case 8:
							this.style['filter'] = 'contrast(0.5)';
							this.style['opacity'] = 0.1;
							break;

						case 9:
							this.style['text-decoration'] = 'line-through';
							break;

						case 10:
							this.style['font-family'] = 'var(--base-font))';
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
							this.style['font-family'] = `var(--alt-font-no-${group})`;
							break;

						case 20:
							this.style['font-family'] = 'var(--alt-font-fraktur)';
							this.style['font-size'] = '1.1rem';
							break;

						case 21:
							this.style['font-weight'] = 'initial';
							break;

						case 22:
							this.style['font-weight'] = 'initial';
							break;

						case 23:
							this.style['font-weight'] = 'initial';
							this.style['font-style'] = 'initial';
							break;

						case 24:
							this.style['text-decoration'] = 'none';
							this.style['font-family'] = 'sans-serif';
							this.style['font-size'] = '12pt';
							break;

						case 25:
							this.style['animation'] = 'none';
							break;

						case 26:
							this.style['text-transform'] = 'full-width';
							break;

						case 27:
							this.style['filter'] = 'initial';
							break;

						case 28:
							this.style['opacity'] = 'initial';
							break;

						case 29:
							this.style['text-decoration'] = 'initial';
							break;

						case 30:
							this.style['color'] = pallete.black;
							break;

						case 31:
							this.style['color'] = pallete.red;
							break;

						case 32:
							this.style['color'] = pallete.green;
							break;

						case 33:
							this.style['color'] = pallete.yellow;
							break;

						case 34:
							this.style['color'] = pallete.blue;
							break;

						case 35:
							this.style['color'] = pallete.magenta;
							break;

						case 36:
							this.style['color'] = pallete.cyan;
							break;

						case 37:
							this.style['color'] = pallete.white;
							break;

						case 38:

							if(chunk.groups[1 + g] == 2)
							{
								const [rd,gr,bl] = chunk.groups[2 + g].split(';');

								this.style['color'] = `rgb(${rd},${gr},${bl})`;
							}

							if(chunk.groups[1 + g] == 5)
							{
								const {r:rd,g:gr,b:bl} = Colors255[ Number(chunk.groups[2 + g]) ];

								this.style['color'] = `rgb(${rd},${gr},${bl})`;
							}

							g += 2;

							break;

						case 39:
							this.style['color'] = 'var(--fgColor)';
							break;

						case 40:
							this.style['background-color'] = pallete.black;
							break;

						case 41:
							this.style['background-color'] = pallete.red;
							break;

						case 42:
							this.style['background-color'] = pallete.green;
							break;

						case 43:
							this.style['background-color'] = pallete.yellow;
							break;

						case 44:
							this.style['background-color'] = pallete.blue;
							break;

						case 45:
							this.style['background-color'] = pallete.magenta;
							break;

						case 46:
							this.style['background-color'] = pallete.cyan;
							break;

						case 47:
							this.style['background-color'] = pallete.white;
							break;

						case 48:

							if(chunk.groups[1 + g] == 2)
							{
								const [rd,gr,bl] = chunk.groups[2 + g].split(';');

								this.style['background-color'] = `rgb(${rd},${gr},${bl})`;
							}

							if(chunk.groups[1 + g] == 5)
							{
								const {r:rd,g:gr,b:bl} = Colors255[ Number(chunk.groups[2 + g]) ];

								this.style['background-color'] = `rgb(${rd},${gr},${bl})`;
							}

							g += 2;

							break;

						case 49:
							this.style['background-color'] = 'var(--bgColor)';
							break;

						case 50:
							this.style['text-transform'] = 'initial';
							break;

						case 51:
							this.style['border'] = '1px solid currentColor';
							break;

						case 52:
							this.style['border'] = '1px solid currentColor';
							this.style['border-radius'] = '1em';
							break;

						case 53:
							this.style['text-decoration'] = 'overline';
							break;

						case 54:
							this.style['border'] = 'initial';
							break;

						case 55:
							this.style['border'] = 'initial';
							break;
					}
				}
			}

			return false;
		}
	}
}
