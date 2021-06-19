import { IGNORE, INSERT, ENTER, LEAVE, HOME } from 'sixgram/Actions';
import { Parser as BaseParser } from 'sixgram/Parser';

const tokens = {
	reset:         /\u001b\[(0);?m/
	, graphics:    /\u001b\[(\d+);?(\d+)?;?([\d;]*)?./
	, escaped:     /\\([^e])/
	, characters:  /.+?(?=\u001b|$)/s
};

const modes  = {
	normal:{
		reset:        [IGNORE, ENTER, LEAVE]
		, escaped:    [IGNORE, ENTER, LEAVE]
		, graphics:   [IGNORE, ENTER, LEAVE]
		, characters: [INSERT]
	},
}

export const Parser = new BaseParser(tokens, modes);
