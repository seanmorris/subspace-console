"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Console = void 0;

var _View2 = require("curvature/base/View");

var _Bag = require("curvature/base/Bag");

var _MeltingText = require("./view/MeltingText");

var _Task = require("./Task");

var _Path = require("./Path");

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

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
    _this.template = "<div class = \"terminal [[inverted]]\" cv-on = \"click:focus(event)\">\n\t<div class = \"output\" cv-each = \"output:line:l\" cv-ref = \"output:curvature/base/Tag\">\n\t\t<p>[[line]]</p>\n\t</div>\n\t<div class = \"bottom\">\n\t\t<div>[[prompt]]&nbsp;</div>\n\t\t<div>\n\t\t\t<form cv-on = \"submit:cancel(event)\">\n\t\t\t\t<textarea\n\t\t\t\t\tcv-bind = \"input\"\n\t\t\t\t\tcv-on   = \":keydown(event);:keyup(event)\"\n\t\t\t\t\tcv-ref  = \"input:curvature/base/Tag\"\n\t\t\t\t\trow     = \"1\"\n\t\t\t\t></textarea>\n\t\t\t</form>\n\n\t\t\t<form cv-on = \"submit:cancel(event)\">\n\t\t\t\t<input\n\t\t\t\t\tautocomplete = \"one-time-code\"\n\t\t\t\t\tname    = \"pw-input\"\n\t\t\t\t\ttype    = \"password\"\n\t\t\t\t\tcv-bind = \"input\"\n\t\t\t\t\tcv-ref  = \"password:curvature/base/Tag\"\n\t\t\t\t\tcv-on   = \":keydown(event,false);:keyup(event,false)\"\n\t\t\t\t/>\n\t\t\t</form>\n\n\t\t\t<input\n\t\t\t\tcv-on  = \"input:fileLoaded(event)\"\n\t\t\t\tcv-ref = \"file:curvature/base/Tag\"\n\t\t\t\tname   = \"file-input\"\n\t\t\t\ttype   = \"file\"\n\t\t\t\tstyle  = \"display: none\"\n\t\t\t/>\n\t\t</div>\n\t</div>\n</div>\n\n<div class = \"scanlines\"></div>\n";
    _this.args.input = '';
    _this.args.output = [];
    _this.args.inverted = '';
    _this.localEcho = true;
    _this.postToken = null;
    _this.args.prompt = '::';
    _this.routes = {};
    _this.args.passwordMode = false;
    _this.tasks = [];
    _this.taskList = new _Bag.Bag();
    _this.taskList.type = _Task.Task;
    _this.max = 512;
    _this.historyCursor = -1;
    _this.history = [];
    _this.env = new Map();

    _this.args.output.___after(function (t, k, o, a) {
      if (k !== 'push') {
        return;
      }

      if (_this.args.output.length > _this.max) {
        var removed = _this.args.output.shift();

        if (_typeof(removed) === 'object') {
          removed.remove();
        }
      }

      _this.scrollToBottom();
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
      // console.log(command);
      if (this.historyCursor != 0) {
        this.history.unshift(command);
      }

      var ret;

      if (command.substring(0, 1) === '/') {
        if (!this.args.passwordMode) {
          this.args.output.push(":: ".concat(command));
        }

        ret = this.interpret(command.substr(1));
      } else if (this.tasks.length) {
        if (!this.args.passwordMode) {
          this.args.output.push("".concat(this.tasks[0].prompt, " ").concat(command));
        }

        ret = this.tasks[0].write(command) || Promise.resolve();
      } else {
        if (!this.args.passwordMode) {
          this.args.output.push(":: ".concat(command));
        }

        ret = this.interpret(command);
      }

      if (!(ret instanceof Promise)) {
        ret = Promise.resolve(ret);
      }

      this.historyCursor = -1;
      this.originalInput = this.args.input = '';
      return ret;
    }
  }, {
    key: "runScript",
    value: function runScript(url) {
      var _this2 = this;

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
            _this2.args.output.push(line.substring(1));

            process(lines);
          } else if (line) {
            _this2.runCommand(line).then(function () {
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
      var _this3 = this;

      var inputBox = this.tags.input.element;
      var passwordBox = this.tags.password.element;
      this.args.bindTo('input', function (v) {
        inputBox.style.height = 'auto';
        inputBox.style.height = inputBox.scrollHeight + 'px';
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
        _this3.focus(null, v);
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
    value: function interpret(command) {
      var _this4 = this;

      this.historyCursor = -1;
      var commands = command.split(/\s*\|\s*/);
      var task = null;
      var topTask = null;

      var _iterator = _createForOfIteratorHelper(commands),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var commandString = _step.value;
          var args = commandString.trim().split(' ');

          var _command = args.shift().trim();

          if (_command.length > 1 && _command.substr(-1) == "?") {
            _command = _command.substr(0, _command.length - 1);

            if (_command in this.path) {
              this.args.output.push("?? ".concat(this.path[_command].helpText));
              this.args.output.push("?? ".concat(this.path[_command].useText));
            }

            continue;
          }

          if (_command in this.path) {
            var cmdClass = this.path[_command]; // console.log(cmdClass);

            task = new cmdClass(args, task, this);
          } else {
            switch (_command) {
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
                this.args.output.push("!! Bad command: ".concat(_command));
            }
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      if (task) {
        this.tasks.unshift(task);

        var output = function output(event) {
          var prompt = task.outPrompt || task.prompt || _this4.args.prompt || '::';

          _this4.args.output.push("".concat(prompt, " ").concat(event.detail));
        };

        var error = function error(event) {
          var errorPrompt = task.errorPrompt || '!!';

          _this4.args.output.push("".concat(errorPrompt, " ").concat(event.detail));
        };

        task.addEventListener('output', output);
        task.addEventListener('error', error);
        task.execute();
        task["catch"](function (error) {
          return console.error(error);
        });
        task["catch"](function (error) {
          return _this4.args.output.push("!! ".concat(error));
        });
        this.args.prompt = task.prompt;
        task["finally"](function (done) {
          task.removeEventListener('error', error);
          task.removeEventListener('output', output);

          _this4.tasks.shift();

          if (_this4.tasks.length) {
            _this4.args.prompt = _this4.tasks[0].prompt;
          } else {
            _this4.args.prompt = '::';
          }
        });
      }

      this.args.input = '';
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
      var _this5 = this;

      switch (event.key) {
        case 'ArrowDown':
          this.historyCursor--;

          if (this.historyCursor <= -1) {
            this.historyCursor = -1;
            this.args.input = this.originalInput;
            return;
          }

          this.args.input = this.history[this.historyCursor];
          this.onNextFrame(function () {
            var element = _this5.tags.input.element;
            element.selectionStart = element.value.length;
            element.selectionEnd = element.value.length;
          });
          break;

        case 'ArrowUp':
          if (this.historyCursor == -1) {
            this.originalInput = this.args.input;
          }

          this.historyCursor++;

          if (this.historyCursor >= this.history.length) {
            this.historyCursor--;
            return;
          }

          this.args.input = this.history[this.historyCursor];
          this.onNextFrame(function () {
            var element = _this5.tags.input.element;
            element.selectionStart = element.value.length;
            element.selectionEnd = element.value.length;
          });
          break;

        case 'Escape':
          if (this.tasks.length) {
            console.log(_Task.Task.KILL);
            this.tasks[0]["finally"](function () {
              return _this5.args.output.push(":: Killed.");
            });
            this.tasks[0].signal(_Task.Task.KILL);
            this.tasks[0].signal('kill');
          }

          this.args.passwordMode = false;
          break;

        case 'Tab':
          event.preventDefault();

          if (!this.args.input || this.args.input[0] !== '/') {
            break;
          }

          var search = this.args.input.substr(1);

          for (var cmd in this.path) {
            if (cmd.length < search.length) {
              continue;
            }

            if (search === cmd.substr(0, search.length)) {
              this.args.input = '/' + cmd;
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
      var scrollTo = (this.scroller === document.body ? this.scroller : document.body).scrollHeight;
      this.onNextFrame(function () {
        scroller.scrollTo({
          behavior: 'smooth',
          left: 0,
          top: scrollTo
        });
      });
    }
  }]);

  return Console;
}(_View2.View);

exports.Console = Console;