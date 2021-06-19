import { View } from 'curvature/base/View';

export class EchoMessage extends View
{
	constructor(args = {})
	{
		super(args);

		this.args.prompt = this.args.prompt || '<<';

		this.template = `<span>[[prompt]]&nbsp;</span><span class = "text">[[message]]</span>`;
	}
}
