"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Parser = void 0;

var _Actions = require("sixgram/Actions");

var _Parser = require("sixgram/Parser");

var tokens = {
  reset: /\u001b\[(0)m/,
  esc: /\u001b\[(\d+);?(\d+)?;?([\d;]*)./,
  characters: /[^\u001b]+/
};
var modes = {
  normal: {
    reset: [_Actions.IGNORE, _Actions.ENTER, _Actions.LEAVE],
    esc: [_Actions.IGNORE, _Actions.ENTER, _Actions.LEAVE],
    characters: [_Actions.INSERT]
  }
};
var Parser = new _Parser.Parser(tokens, modes);
exports.Parser = Parser;