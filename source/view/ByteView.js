import { View } from 'curvature/base/View';

export class ByteView extends View
{
	constructor(args = {})
	{
		super(args);

		this.template = `<span cv-each = "bytes:byte:b">
			<span class = "byte" style = "width:2em;" cv-ref  = "byte:curvature/base/Tag"></span>
		</span>`;
	}

	attached()
	{
		// let color = '#' + [
		// 	(Math.pow(Math.cos(Math.PI * hue + 5), 2) * 192)
		// 	, (Math.pow(Math.cos(Math.PI * hue + 10), 2) * 192)
		// 	, (Math.pow(Math.cos(Math.PI * hue + 0), 2) * 192)
		// ].map((x)=>Math.floor(x).toString(16).padStart(2, '0')).join('');

		requestAnimationFrame(()=>{
			const byte = this.args.value;
			const hue  = parseInt(byte, 16);

			this.args.bindTo('value', (v) => {
				this.tags.byte.element.textContent = v;
			});

			if(!hue)
			{
				return;
			}

			let color = "hsl(" + ((360 * hue) / 0xFF) + ",100%,50%)";

			this.tags.byte.element.style.color = color;
		});


		// $view.tags.byte.element.style['text-shadow'] = `2px 0px 5px ${color}, -2px 0px 5px ${color}`
	}
}
