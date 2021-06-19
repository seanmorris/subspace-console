"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Parser = void 0;

var _Actions = require("sixgram/Actions");

var _Parser = require("sixgram/Parser");

var tokens = {
  reset: /\u001b\[(0);?m/,
  graphics: /\u001b\[(\d+);?(\d+)?;?([\d;]*)?./,
  escaped: /\\([^e])/,
  characters: /[\s\S]+?(?=\x1B|$)/
};
var modes = {
  normal: {
    reset: [_Actions.IGNORE, _Actions.ENTER, _Actions.LEAVE],
    escaped: [_Actions.IGNORE, _Actions.ENTER, _Actions.LEAVE],
    graphics: [_Actions.IGNORE, _Actions.ENTER, _Actions.LEAVE],
    characters: [_Actions.INSERT]
  }
};
var Parser = new _Parser.Parser(tokens, modes);
exports.Parser = Parser;