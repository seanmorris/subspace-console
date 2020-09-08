const fs   = require('fs');
const path = require('path');

const createMacro = require('babel-plugin-macros').createMacro;

function rawquire({ references, state, babel })
{
	const { default: rawquire = [] } = references

	const sourceDir = state.file.opts.filename;

	for(const reference of references.rawquire)
	{
		if(reference.parentPath.type !== 'CallExpression')
		{
			return;
		}

		const callRef      = reference.parentPath;
		const shortPath    = callRef.get("arguments")[0].evaluate().value;
		const templatePath = require.resolve(shortPath, path.dirname(sourceDir));
		const content      = fs.readFileSync(templatePath, 'utf8');

		callRef.replaceWith(babel.types.stringLiteral(content));
	}
}

module.exports = createMacro(rawquire);
