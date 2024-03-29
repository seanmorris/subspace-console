"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Console = void 0;

var _View2 = require("curvature/base/View");

var _Bag = require("curvature/base/Bag");

var _MeltingText = require("./view/MeltingText");

var _EchoMessage = require("./view/EchoMessage");

var _Task = require("./Task");

var _Path = require("./Path");

var _Renderer = require("./ansi/Renderer");

var _Parser = require("./ansi/Parser");

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var Console = /*#__PURE__*/function (_View) {
  _inherits(Console, _View);

  var _super = _createSuper(Console);

  function Console() {
    var _this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Console);

    _this = _super.call(this, args);
    var defaults = {
      init: false,
      path: _Path.Path
    };
    var allOptions = Object.assign({}, defaults, options);
    _this.template = "<div class = \"terminal [[inverted]]\" cv-on = \"click:focus(event);:keydown(event):c;:keyup(event)c\">\n\t<div class = \"output\" cv-each = \"output:line:l\" cv-ref = \"output:curvature/base/Tag\">\n\t\t<p>[[line]]</p>\n\t</div>\n\t<div class = \"bottom\">\n\t\t<div>[[prompt]]&nbsp;</div>\n\t\t<div>\n\t\t\t<form cv-on = \"submit:cancel(event)\">\n\t\t\t\t<textarea\n\t\t\t\t\tcv-bind = \"input\"\n\t\t\t\t\tcv-ref  = \"input:curvature/base/Tag\"\n\t\t\t\t\trow     = \"1\"\n\t\t\t\t></textarea>\n\t\t\t</form>\n\n\t\t\t<form cv-on = \"submit:cancel(event)\">\n\t\t\t\t<input\n\t\t\t\t\tautocomplete = \"one-time-code\"\n\t\t\t\t\tname    = \"pw-input\"\n\t\t\t\t\ttype    = \"password\"\n\t\t\t\t\tcv-bind = \"input\"\n\t\t\t\t\tcv-ref  = \"password:curvature/base/Tag\"\n\t\t\t\t/>\n\t\t\t</form>\n\n\t\t\t<input\n\t\t\t\tcv-on  = \"input:fileLoaded(event)\"\n\t\t\t\tcv-ref = \"file:curvature/base/Tag\"\n\t\t\t\tname   = \"file-input\"\n\t\t\t\ttype   = \"file\"\n\t\t\t\tstyle  = \"display: none\"\n\t\t\t/>\n\t\t</div>\n\t</div>\n</div>\n\n<div class = \"scanlines\"></div>\n";
    _this.args.input = '';
    _this.args.output = [];
    _this.args.inverted = '';
    _this.localEcho = true;
    _this.postToken = null;
    _this.args.prompt = '::';
    _this.routes = {};
    _this.args.passwordMode = false;
    _this.tasks = [];
    _this.external = options.external || [];
    _this.taskList = new _Bag.Bag();
    _this.taskList.type = _Task.Task;
    _this.max = 10;
    _this.historyCursor = -1;
    _this.history = [];
    _this.env = new Map();

    _this.args.output.___after(function (t, k, o, a) {
      if (k !== 'push') {
        return;
      }

      _this.onNextFrame(function () {
        return _this.scrollToBottom();
      });
    });

    if (allOptions.init) {
      _this.runScript(allOptions.init);
    }

    _this.scroller = allOptions.scroller || document.body;
    _this.path = allOptions.path || {};
    _this.originalInput = '';
    return _this;
  }

  _createClass(Console, [{
    key: "runCommand",
    value: function runCommand(command) {
      var _this2 = this;

      if (this.historyCursor != 0) {
        this.history.unshift(command);
      }

      return new Promise(function (accept) {
        var task;

        if (command.substring(0, 1) === '/') {
          if (!_this2.args.passwordMode) {
            var output = new _EchoMessage.EchoMessage({
              message: command
            });

            _this2.args.output.push(output);
          }

          var unescaped = _this2.unescape(command.substr(1));

          task = _this2.interpret(unescaped);
        } else if (_this2.tasks.length) {
          if (!_this2.args.passwordMode) {
            var _output = new _EchoMessage.EchoMessage({
              message: command,
              prompt: _this2.tasks[0].prompt
            });

            _this2.args.output.push(_output);
          }

          var _unescaped = _this2.unescape(command);

          task = _this2.tasks[0].write(_unescaped) || Promise.resolve();
        } else {
          if (!_this2.args.passwordMode) {
            _this2.args.output.push(":: ".concat(command));
          }

          var _unescaped2 = _this2.unescape(command);

          task = _this2.interpret(_unescaped2);
        }

        if (!(task instanceof _Task.Task) && !(task instanceof Promise)) {
          task = Promise.resolve(task);
        }

        _this2.historyCursor = -1;
        _this2.originalInput = _this2.args.input = '';
        task.then(function (result) {
          return accept(result);
        });
      })["catch"](function (error) {
        _this2.args.output.push("Unexpected error: ".concat(error));
      });
    }
  }, {
    key: "runScript",
    value: function runScript(url) {
      var _this3 = this;

      fetch(url + '?api=txt').then(function (response) {
        return response.text();
      }).then(function (init) {
        var lines = init.split("\n");

        var process = function process(lines) {
          if (!lines.length) {
            return;
          }

          var line = lines.shift();

          if (line && line[0] == '!') {
            _this3.args.output.push(line.substring(1));

            process(lines);
          } else if (line) {
            _this3.runCommand(line).then(function () {
              return process(lines);
            });
          } else {
            process(lines);
          }
        };

        process(lines);
      });
    }
  }, {
    key: "postRender",
    value: function postRender() {
      var _this4 = this;

      var inputBox = this.tags.input.element;
      var passwordBox = this.tags.password.element;
      this.args.bindTo('input', function (v) {// inputBox.style.height = 'auto';
        // inputBox.style.height = inputBox.scrollHeight + 'px';
      }, {
        frame: 1
      });
      this.args.bindTo('passwordMode', function (v) {
        if (v) {
          inputBox.style.display = 'none';
          passwordBox.style.display = 'unset';
        } else {
          inputBox.style.display = 'unset';
          passwordBox.style.display = 'none';
        }
      });
      this.args.bindTo('passwordMode', function (v) {
        _this4.focus(null, v);
      }, {
        frame: 1
      });
    }
  }, {
    key: "focus",
    value: function focus() {
      var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var passwordMode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      if (event) {
        event.preventDefault();
      }

      if (event && event.target && event.target.matches('input,textarea')) {
        return;
      }

      if (window.getSelection().toString()) {
        return;
      }

      if (passwordMode || this.args.passwordMode) {
        this.tags.password.element.focus();
        return;
      }

      this.tags.input.element.focus();
    }
  }, {
    key: "interpret",
    value: function interpret(input) {
      var _this5 = this;

      this.historyCursor = -1;
      var expressions = input.split(/\s*\;\s*/);
      var lastTask = null;

      var _iterator = _createForOfIteratorHelper(expressions),
          _step;

      try {
        var _loop = function _loop() {
          var expression = _step.value;

          var task = _this5.pipe(expression.split(/\s*\|\s*/));

          if (task) {
            _this5.tasks.unshift(task);

            var output = function output(event) {
              var line = event.detail;

              if (_typeof(line) === 'object') {
                _this5.args.output.push(line);
              } else {
                var prompt = task.outPrompt || task.prompt || _this5.args.prompt || '::';

                var rendered = _this5.parseAnsi(line, prompt);

                _this5.args.output.push(rendered);
              }
            };

            var error = function error(event) {
              console.error(event);
              var line = event.detail;
              var errorPrompt = task.errorPrompt || '!!';

              var rendered = _this5.parseAnsi(line, errorPrompt);

              _this5.args.output.push(rendered);
            };

            task.addEventListener('output', output);
            task.addEventListener('error', error);
            task.execute();
            task["catch"](function (error) {
              return console.error(error);
            });
            task["catch"](function (error) {
              return _this5.args.output.push("!! ".concat(error));
            });
            _this5.args.prompt = task.prompt;
            task["finally"](function (done) {
              task.removeEventListener('error', error);
              task.removeEventListener('output', output);

              _this5.tasks.shift();

              if (_this5.tasks.length) {
                _this5.args.prompt = _this5.tasks[0].prompt;
              } else {
                _this5.args.prompt = '::';
              }
            });
          }

          lastTask = task;
        };

        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          _loop();
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return lastTask;
    }
  }, {
    key: "pipe",
    value: function pipe(commands, previousTask) {
      var task = null;
      var commandString = commands.shift();
      var args = commandString.trim().split(' ');
      var command = args.shift().trim();

      if (command.length > 1 && command.substr(-1) == "?") {
        command = command.substr(0, command.length - 1);

        if (command in this.path) {
          this.args.output.push("?? ".concat(this.path[command].helpText));
          this.args.output.push("?? ".concat(this.path[command].useText));
        }

        return;
      }

      if (command in this.path) {
        var cmdClass = this.path[command];
        task = _construct(cmdClass, [args, previousTask, this].concat(_toConsumableArray(this.external)));
      } else {
        switch (command) {
          case 'clear':
            this.args.output.splice(0);
            break;

          case 'z':
            this.args.output.splice(0);
            this.args.output.push(new _MeltingText.MeltingText({
              input: '!!!'
            }));
            break;

          case 'commands':
          case '?':
            this.args.output.push("   Subspace Console 0.29a \xA92018-2021 Sean Morris");

            for (var cmd in this.path) {
              this.args.output.push(" * ".concat(cmd, " - ").concat(this.path[cmd].helpText));
              this.path[cmd].useText && this.args.output.push("   ".concat(this.path[cmd].useText));
              this.args.output.push("  ");
            }

            break;

          default:
            this.args.output.push("!! Bad command: ".concat(command));
        }
      }

      if (commands.length) {
        return this.pipe(commands, task);
      }

      return task;
    }
  }, {
    key: "keydown",
    value: function keydown(event, autocomplete) {
      switch (event.key) {
        case 'Tab':
          if (autocomplete) {
            break;
          }

          event.preventDefault();
          break;

        case 'Enter':
          if (!event.ctrlKey) {
            event.preventDefault();
          }

          break;
      }
    }
  }, {
    key: "keyup",
    value: function keyup(event, autocomplete) {
      var _this6 = this;

      switch (event.key) {
        case 'ArrowDown':
          {
            this.onNextFrame(function () {
              return _this6.scrollToBottom();
            });
            this.historyCursor--;

            if (this.historyCursor <= -1) {
              this.historyCursor = -1;
              this.args.input = this.originalInput;
              return;
            }

            this.args.input = this.history[this.historyCursor];
            var element = this.tags.input.element;
            element.selectionStart = element.value.length;
            element.selectionEnd = element.value.length;
            event.stopImmediatePropagation();
            event.stopPropagation();
            event.preventDefault();
            break;
          }

        case 'ArrowUp':
          {
            this.onNextFrame(function () {
              return _this6.scrollToBottom();
            });

            if (this.historyCursor == -1) {
              this.originalInput = this.args.input;
            }

            this.historyCursor++;

            if (this.historyCursor >= this.history.length) {
              this.historyCursor--;
              return;
            }

            this.args.input = this.history[this.historyCursor];
            var _element = this.tags.input.element;
            _element.selectionStart = _element.value.length;
            _element.selectionEnd = _element.value.length;
            event.stopImmediatePropagation();
            event.stopPropagation();
            event.preventDefault();
            break;
          }

        case 'Escape':
          if (this.tasks.length) {
            this.tasks[0]["finally"](function () {
              return _this6.args.output.push(":: Killed.");
            });
            this.tasks[0].signal(_Task.Task.KILL);
          }

          this.args.passwordMode = false;
          break;

        case 'Tab':
          event.preventDefault();

          if (!this.args.input) {
            break;
          }

          var search = this.args.input;
          var sigil = '';

          if (this.args.input[0] === '/') {
            search = this.args.input.substr(1);
            sigil = this.args.input.substr(0, 1);
            break;
          }

          for (var cmd in this.path) {
            if (cmd.length < search.length) {
              continue;
            }

            if (search === cmd.substr(0, search.length)) {
              this.args.input = sigil + cmd;
              break;
            }
          }

          break;

        case 'Enter':
          if (!event.ctrlKey) {
            event.preventDefault();
          } else {
            return;
          }

          this.runCommand(this.args.input);
          this.args.input = '';
          break;

        default:
          this.historyCursor = -1;
          this.scrollToBottom();
          break;
      }
    }
  }, {
    key: "cancel",
    value: function cancel(event) {
      event.preventDefault();
      event.stopPropagation();
    }
  }, {
    key: "scrollToBottom",
    value: function scrollToBottom() {
      var scroller = (this.scroller === document.body ? window : this.scroller) || window;
      var scrollTo = this.scroller.scrollHeight;
      this.onNextFrame(function () {
        scroller.scrollTo({
          behavior: 'smooth',
          left: 0,
          top: scrollTo
        });
      });
    }
  }, {
    key: "parseAnsi",
    value: function parseAnsi(line, prompt) {
      line = line.replace(/</g, '&lt;').replace(/>/g, '&gt;');
      var renderer = new _Renderer.Renderer();

      var parsed = _Parser.Parser.parse(line);

      var wrapped = renderer.process(parsed);

      if (!prompt) {
        return _View2.View.from("<span class =\"ansi\">".concat(wrapped, "</span>"));
      }

      var promptEsc = prompt.replace(/</g, '&lt;').replace(/>/g, '&gt;');

      var rendered = _View2.View.from("".concat(promptEsc, " <span class =\"ansi\">").concat(wrapped, "</span>"));

      return rendered;
    }
  }, {
    key: "unescape",
    value: function unescape(string) {
      return string.replace(/\\n/gm, '\n').replace(/\\r/gm, '\r').replace(/\\t/gm, '\t').replace(/\\e/gm, "\x1B").replace(/\\u001b/gm, "\x1B");
    }
  }, {
    key: "write",
    value: function write() {
      for (var _len = arguments.length, lines = new Array(_len), _key = 0; _key < _len; _key++) {
        lines[_key] = arguments[_key];
      }

      for (var _i = 0, _lines = lines; _i < _lines.length; _i++) {
        var line = _lines[_i];

        if (typeof line === 'string') {
          var unescaped = this.unescape(line);
          var parsed = this.parseAnsi(unescaped);
          this.args.output.push(parsed);
          continue;
        }

        this.args.output.push(line);
      }
    }
  }]);

  return Console;
}(_View2.View);

exports.Console = Console;