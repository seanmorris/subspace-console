"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var IGNORE = 0;
var INSERT = 1;
var ENTER = 2;
var LEAVE = 3;
var HOME = 4;

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
          console.log(chunk.type, chunk.depth, value);
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
                newChunk.type = type;
                chunk.list.push(newChunk);
                this.stack.push(chunk);
                chunk = newChunk; // this.mode = chunk.type;

                break;

              case LEAVE:
                if (!this.stack.length) {
                  console.log(this.mode, "\"".concat(value, "\""), chunk);
                  throw new Error("Already at the top of the stack.");
                }

                chunk = this.stack.pop();
                this.mode = chunk.type;
                mode = this.modes[this.mode];
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

        if (_typeof(chunk) === 'object') {
          output += this.process(chunk);
          continue;
        }

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
  esc: /\u1b\u5b/,
  parameters: /(\d+;)+m/,
  character: /./
};
var modes = {
  normal: {
    character: {
      esc: ['parameters', ENTER, INSERT, LEAVE]
    }
  }
};
var parser = new Parser(tokens, modes);
var syntax = parser.parse('The >quick \\<brown\\\\ fox<< jumps over< the lazy dog\\n');
process.stdout.write(JSON.stringify(syntax, null, 2) + '\n');
var change = new Transformer({
  elevate: function elevate(x) {
    return String(x).toUpperCase();
  },
  escape: function escape(x) {
    return x === 'n' ? "\n" : x;
  },
  normal: function normal(x) {
    return String(x);
  }
});
var output = change.process(syntax);
process.stdout.write(output + '\n', null, 2);