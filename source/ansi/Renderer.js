import { Renderer as BaseRenderer } from 'sixgram/Renderer';

import { Colors255 } from './Colors255';
import { pallete   } from './pallete';

const oneByte = {};

for(const c in Colors255)
{
	const color = Colors255[c];

	oneByte[ color.colorId ] = color.rgb;
}
const style = {};

export const Renderer = new BaseRenderer({
	normal:   (chunk, parent) => {

		if(typeof chunk === 'string')
		{
			let styleString = '';

			for(const [key, val] of Object.entries(style))
			{
				styleString += `${key}: ${val}; `;
			}

			return `<span class = "ansi" style = "${styleString}">${chunk}</span>`;
		}

		if(typeof chunk === 'object')
		{
			if(chunk.type === 'esc' || chunk.type === 'reset')
			{

				for(const g in chunk.groups)
				{
					const group = Number(chunk.groups[g]);

					switch(group)
					{
						case 0:
							for(const key in style)
							{
								delete style[key];
								// style[key] = 'initial'

								// if(key === 'color')
								// {
								// 	style[key] = 'var(--fgColor)'
								// }

								// if(key === 'background-color')
								// {
								// 	style[key] = 'var(--bgColor)'
								// }
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

							if(chunk.groups[2] == 2)
							{
								const [r,g,b] = chunk.groups[g+1].split(';');

								style['color'] = `rgb(${r},${g},${b})`;
							}

							if(chunk.groups[2] == 5)
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

						case 48:

							if(chunk.groups[1] == 2)
							{
								const [r,g,b] = chunk.groups[2].split(';');

								style['background-color'] = `rgb(${r},${g},${b})`;
							}

							if(chunk.groups[1] == 5)
							{
								const {r,g,b} = oneByte[ Number(chunk.groups[2]) ];

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
			}

			return false;
		}
	}
});
