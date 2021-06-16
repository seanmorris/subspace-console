"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var IGNORE = 0;
var INSERT = 1;
var ENTER = 2;
var LEAVE = 3;
var HOME = 4;

var colors16 = require('./colors-16');

var colors255 = require('./colors-255');

var Chunk = function Chunk() {
  _classCallCheck(this, Chunk);

  this.depth = 0;
  this.match = null;
  this.type = 'normal';
  this.list = [];
};

var Parser = /*#__PURE__*/function () {
  function Parser(tokens, modes) {
    _classCallCheck(this, Parser);

    this.index = 0;
    this.mode = 'normal';
    this.stack = [];
    this.tokens = tokens || {};
    this.modes = modes || {};
  }

  _createClass(Parser, [{
    key: "parse",
    value: function parse(source) {
      if (!(this.mode in this.modes)) {
        throw new Error("Mode ".concat(this.mode, " does not exist on parser."), this);
      }

      var chunk = new Chunk();
      var mode = this.modes[this.mode];
      chunk.type = this.mode;

      while (this.index < source.length) {
        var matched = false;

        for (var tokenName in mode) {
          var token = this.tokens[tokenName];
          var search = token.exec(source.substr(this.index));

          if (!search || search.index > 0) {
            continue;
          }

          if (!mode[tokenName]) {
            throw new Error("Invalid token type \"".concat(tokenName, "\" found in mode \"").concat(this.mode, "\"."));
            continue;
          }

          var value = search[0];
          var actions = _typeof(mode[tokenName]) === 'object' ? mode[tokenName] : [mode[tokenName]];
          matched = true;
          this.index += value.length;
          var type = 'normal';

          for (var i in actions) {
            var action = actions[i];

            if (typeof action === 'string') {
              if (!(action in this.modes)) {
                throw new Error("Mode \"".concat(action, "\" does not exist."));
              }

              this.mode = action;
              mode = this.modes[this.mode];
              type = action;
              continue;
            }

            switch (action) {
              case INSERT:
                chunk.list.push(value);
                break;

              case ENTER:
                var newChunk = new Chunk();
                newChunk.depth = chunk.depth + 1;
                newChunk.match = value;
                newChunk.groups = _toConsumableArray(value.match(token)).slice(1);
                newChunk.mode = type;
                newChunk.type = tokenName;
                chunk.list.push(newChunk);
                this.stack.push(chunk);
                chunk = newChunk; // this.mode = chunk.type;

                break;

              case LEAVE:
                if (!this.stack.length) {// throw new Warning(`Already at the top of the stack.`)
                } else {
                  chunk = this.stack.pop();
                  this.mode = chunk.type;
                  mode = this.modes[this.mode];
                }

                break;

              case HOME:
                this.stack.splice(0);
                mode = this.modes['normal'];
                break;
            }
          }

          break;
        }

        if (!matched) {
          break;
        }
      }

      if (this.stack.length) {
        throw new Error('Did not return to top of stack!');
      }

      return this.stack.shift() || chunk;
    }
  }]);

  return Parser;
}();

var Transformer = /*#__PURE__*/function () {
  function Transformer(ops) {
    _classCallCheck(this, Transformer);

    this.ops = ops || {};
  }

  _createClass(Transformer, [{
    key: "process",
    value: function process(tree) {
      var output = '';

      for (var i in tree.list) {
        var chunk = tree.list[i];

        if (this.ops[tree.type]) {
          output += this.ops[tree.type](chunk, tree);
        } else {
          output += chunk;
        }
      }

      return output;
    }
  }]);

  return Transformer;
}(); // const tokens = {
// 	space:       /\s+/s
// 	, word:      /\w+/
// 	, down:      /</
// 	, up:        />/
// 	, escape:    /\\/
// 	, n:         /n/
// 	, character: /./
// };
// const modes  = {
// 	normal:{
// 		escape:  ['escape', ENTER]
// 		, space: INSERT
// 		, word:  INSERT
// 		, up:    ['up',   ENTER, INSERT]
// 		, down:  ['down', ENTER, INSERT]
// 	}
// 	, elevate:{
// 		escape:  ['escape', ENTER]
// 		, space: INSERT
// 		, word:  INSERT
// 		, up:    ['up',   ENTER]
// 		, down:  ['down', ENTER]
// 	}
// 	, escape:{
// 		character: [INSERT, LEAVE]
// 	}
// 	, up:{
// 		space:  [LEAVE, 'elevate', ENTER, INSERT]
// 		, word: [LEAVE, 'elevate', ENTER, INSERT]
// 		, up:   [INSERT, LEAVE]
// 		, down: LEAVE
// 	}
// 	, down:{
// 		space:  [LEAVE, INSERT, LEAVE]
// 		, word: [LEAVE, INSERT, LEAVE]
// 		, up:   [LEAVE, 'up', ENTER]
// 		, down: [INSERT, LEAVE]
// 	}
// };


var tokens = {
  reset: /\u001b\[(0)m/,
  esc: /\u001b\[(\d+);?(\d+)?;?([\d;]*)./,
  characters: /[^\u001b]+/
};
var modes = {
  normal: {
    reset: [IGNORE, ENTER, LEAVE],
    esc: [IGNORE, ENTER, LEAVE],
    characters: [INSERT]
  }
};

var readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});
rl.on('line', function (line) {
  var parser = new Parser(tokens, modes);
  var syntax = parser.parse(line); // process.stdout.write(JSON.stringify(syntax, null, 2) + '\n');

  var style = {};
  var change = new Transformer({
    normal: function normal(chunk, parent) {
      if (typeof chunk === 'string') {
        return chunk;
      }

      if (_typeof(chunk) === 'object') {
        if (chunk.type === 'esc' || chunk.type === 'reset') {
          var styleString = '';

          for (g in chunk.groups) {
            var group = Number(chunk.groups[g]);

            for (var _i = 0, _Object$entries = Object.entries(style); _i < _Object$entries.length; _i++) {
              var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2);

              key = _Object$entries$_i[0];
              val = _Object$entries$_i[1];
              styleString += "".concat(key, ": ").concat(val, "; ");
            }

            switch (group) {
              case 0:
                for (key in style) {
                  style[key] = 'initial';

                  if (key === 'color') {
                    style[key] = 'var(--fgColor)';
                  }

                  if (key === 'background-color') {
                    style[key] = 'var(--bgColor)';
                  }
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
                style['font-family'] = "var(--alt-font-no-".concat(group, ")");
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
                if (chunk.groups[1] == 2) {
                  var _chunk$groups$split = chunk.groups[_g + 1].split(';'),
                      _chunk$groups$split2 = _slicedToArray(_chunk$groups$split, 3),
                      r = _chunk$groups$split2[0],
                      _g = _chunk$groups$split2[1],
                      b = _chunk$groups$split2[2];

                  style['color'] = "rgb(".concat(r, ",").concat(_g, ",").concat(b, ")");
                }

                if (chunk.groups[1] == 5) {
                  var _oneByte$Number = oneByte[Number(chunk.groups[_g2 + 1])],
                      _r = _oneByte$Number.r,
                      _g2 = _oneByte$Number.g,
                      _b = _oneByte$Number.b;
                  style['color'] = "rgb(".concat(_r, ",").concat(_g2, ",").concat(_b, ")");
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

              case 38:
                if (chunk.groups[1] == 2) {
                  var _chunk$groups$split3 = chunk.groups[_g3 + 1].split(';'),
                      _chunk$groups$split4 = _slicedToArray(_chunk$groups$split3, 3),
                      _r2 = _chunk$groups$split4[0],
                      _g3 = _chunk$groups$split4[1],
                      _b2 = _chunk$groups$split4[2];

                  style['background-color'] = "rgb(".concat(_r2, ",").concat(_g3, ",").concat(_b2, ")");
                }

                if (chunk.groups[1] == 5) {
                  var _oneByte$Number2 = oneByte[Number(chunk.groups[_g4 + 1])],
                      _r3 = _oneByte$Number2.r,
                      _g4 = _oneByte$Number2.g,
                      _b3 = _oneByte$Number2.b;
                  style['background-color'] = "rgb(".concat(_r3, ",").concat(_g4, ",").concat(_b3, ")");
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

          return "</span><span class = \"ansi\" style = \"".concat(styleString, "\">");
        }
      }
    }
  });
  var output = '<div>' + change.process(syntax) + '</div>';
  console.log(output);
});