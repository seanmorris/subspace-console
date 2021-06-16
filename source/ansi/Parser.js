import { IGNORE, INSERT, ENTER, LEAVE, HOME } from 'sixgram/Actions';
import { Parser as BaseParser } from 'sixgram/Parser';

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

export const Parser = new BaseParser(tokens, modes);
