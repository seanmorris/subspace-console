"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Console = void 0;

var _View2 = require("curvature/base/View");

var _Socket = require("subspace-client/Socket");

var _MeltingText = require("view/MeltingText");

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

    console.log(options.path);
    console.log(options);
    _this = _super.call(this, args);
    var defaults = {
      init: false,
      path: _Path.Path
    };
    var allOptions = Object.assign({}, defaults, options);
    console.log(allOptions.path);
    console.log(allOptions);
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

      _this.onNextFrame(function () {
        window.scrollTo({
          top: document.body.scrollHeight,
          left: 0,
          behavior: 'smooth'
        });
      });
    });

    if (allOptions.init) {
      _this.runScript(allOptions.init);
    }

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

          if (_command.substr(-1) == "?") {
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
                this.args.output.push(new _MeltingText.MeltingText({
                  input: 'lmao!'
                }));
                break;

              case 'commands':
              case '?':
                this.args.output.push("   Subspace Console 0.29a \xA92018-2020 Sean Morris");

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
          var prompt = task.prompt || _this4.args.prompt || '::';

          _this4.args.output.push("".concat(prompt, " ").concat(event.detail));
        };

        var error = function error(event) {
          var errorPrompt = task.errorPrompt || '!!';
          _this4.args.prompt = errorPrompt;

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
          window.scrollTo({
            top: document.body.scrollHeight,
            left: 0,
            behavior: 'smooth'
          });
          break;
      }
    }
  }, {
    key: "cancel",
    value: function cancel(event) {
      event.preventDefault();
      event.stopPropagation();
    }
  }]);

  return Console;
}(_View2.View);

exports.Console = Console;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Path = void 0;

var _Task = require("subspace-console/Task");

var Path = {
  task: _Task.Task
};
exports.Path = Path;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Task = void 0;

var _Bindable = require("curvature/base/Bindable");

var _Mixin = require("curvature/base/Mixin");

var _Target = require("./mixin/Target");

var _TaskSignals = require("./mixin/TaskSignals");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var taskId = 0;
var target = Symbol('target');
var Accept = Symbol('accept');
var Reject = Symbol('reject');
var Execute = Symbol('execute');

var Task = /*#__PURE__*/function (_Mixin$with) {
  _inherits(Task, _Mixin$with);

  var _super = _createSuper(Task);

  function Task() {
    var _this;

    var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var prev = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var term = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    _classCallCheck(this, Task);

    _this = _super.call(this);

    _defineProperty(_assertThisInitialized(_this), "title", 'Generic Task');

    _defineProperty(_assertThisInitialized(_this), "prompt", '::');

    _this.args = args;
    _this.prev = prev;
    _this.term = term;
    _this.status = -1;
    _this.thread = new Promise(function (accept, reject) {
      _this[Accept] = accept;
      _this[Reject] = reject;
    });
    _this.id = taskId++;

    _this.thread["finally"](function () {
      return console.log(_this.title + ' closed.');
    });

    return _possibleConstructorReturn(_this, _assertThisInitialized(_this));
  }

  _createClass(Task, [{
    key: "then",
    value: function then(callback) {
      return this.thread.then(callback);
    }
  }, {
    key: "catch",
    value: function _catch(callback) {
      return this.thread["catch"](callback);
    }
  }, {
    key: "finally",
    value: function _finally(callback) {
      return this.thread["finally"](callback);
    }
  }, {
    key: "print",
    value: function print(detail) {
      this.dispatchEvent(new CustomEvent('output', {
        detail: detail
      }));
    }
  }, {
    key: "printErr",
    value: function printErr(detail) {
      this.dispatchEvent(new CustomEvent('error', {
        detail: detail
      }));
    }
  }, {
    key: "write",
    value: function write(line) {
      return this.main(line);
    }
  }, {
    key: "signal",
    value: function signal(signalName) {
      console.log(this, "signal::".concat(signalName));

      if (this["signal::".concat(signalName)]) {
        this["signal::".concat(signalName)]();
      }

      switch (signalName) {
        case 'close':
          if (this.dispatchEvent(new CustomEvent('close'))) {
            this.status > 0 ? this[Reject]() : this[Accept]();
          }

          break;

        case 'kill':
          this.status > 0 ? this[Reject]() : this[Accept]();
          break;
      }
    }
  }, {
    key: "execute",
    value: function execute() {
      return this[Execute](this.prev);
    }
  }, {
    key: Execute,
    value: function value() {
      var _this2 = this;

      if (prev) {
        var _onOutputEvent = function _onOutputEvent(_ref) {
          var detail = _ref.detail;
          return _this2.write(detail);
        };

        prev.addEventListener('output', _onOutputEvent);
      }

      console.log(this.title + ' initializing.');
      var init = this.init.apply(this, _toConsumableArray(this.args));
      var prev = this.prev;

      if (!(init instanceof Promise)) {
        init = Promise.resolve(init);
      } else {
        console.log(this.title + ' continues...');
      }

      if (prev) {
        prev[Execute]();
        return Promise.allSettled([prev, init])["finally"](function () {
          prev.then(function (r) {
            return _this2[Accept](r);
          });
          prev["catch"](function (e) {
            return _this2[Reject](r);
          });
          prev.removeEventListener('output', onOutputEvent);
          return _this2.done();
        });
      } else {
        return Promise.allSettled([init]).then(function () {
          try {
            _this2.main(undefined);

            _this2[Accept]();
          } catch (_unused) {
            _this2[Reject]();
          }

          _this2.done();
        });
      }
    }
  }, {
    key: "init",
    value: function init() {}
  }, {
    key: "main",
    value: function main() {
      var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    }
  }, {
    key: "done",
    value: function done(results) {
      return this.status;
    }
  }]);

  return Task;
}(_Mixin.Mixin["with"](_Target.Target, _TaskSignals.TaskSignals)); // export class Task extends Target.mix(BaseTask){};


exports.Task = Task;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MixPromise = void 0;

var _Mixin = require("curvature/base/Mixin");

var _Bindable = require("curvature/base/Bindable");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var promise = Symbol('promise');

var MixPromise = /*#__PURE__*/function () {
  function MixPromise() {
    _classCallCheck(this, MixPromise);
  }

  _createClass(MixPromise, [{
    key: _Mixin.Mixin._constructor,
    value: function value(instance) {
      instance[promise] = new Promise();
    }
  }, {
    key: "then",
    value: function then(callback) {
      return this[promise].then(callback);
    }
  }, {
    key: "catch",
    value: function _catch(callback) {
      return this[promise]["catch"](callback);
    }
  }, {
    key: "finally",
    value: function _finally(callback) {
      return this[promise]["finally"](callback);
    }
  }]);

  return MixPromise;
}();

exports.MixPromise = MixPromise;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Target = void 0;

var _Mixin = require("curvature/base/Mixin");

var _Target;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var target = Symbol('target');
var index = 0;
var Target = (_Target = {}, _defineProperty(_Target, _Mixin.Mixin.constructor, function () {
  try {
    this[target] = new EventTarget();
  } catch (error) {
    this[target] = document.createDocumentFragment();
  }

  this[target].x = index++;
}), _defineProperty(_Target, "dispatchEvent", function dispatchEvent() {
  var _this$target;

  (_this$target = this[target]).dispatchEvent.apply(_this$target, arguments);
}), _defineProperty(_Target, "addEventListener", function addEventListener() {
  var _this$target2;

  (_this$target2 = this[target]).addEventListener.apply(_this$target2, arguments);
}), _defineProperty(_Target, "removeEventListener", function removeEventListener() {
  var _this$target3;

  (_this$target3 = this[target]).removeEventListener.apply(_this$target3, arguments);
}), _Target);
exports.Target = Target;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TaskSignals = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var TaskSignals = /*#__PURE__*/function () {
  function TaskSignals() {
    _classCallCheck(this, TaskSignals);
  }

  _createClass(TaskSignals, [{
    key: 'signal::kill',
    value: function signalKill() {
      console.log('KILL!');
      this.status > 0 ? this[Reject]() : this[Accept]();
    }
  }, {
    key: 'signal::close',
    value: function signalClose() {
      if (this.dispatchEvent(new CustomEvent('error', {
        detail: detail
      }))) {
        this.status > 0 ? this[Reject]() : this[Accept]();
      }
    }
  }]);

  return TaskSignals;
}();

exports.TaskSignals = TaskSignals;

_defineProperty(TaskSignals, "KILL", 'kill');

_defineProperty(TaskSignals, "CLOSE", 'close');
"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var fs = require('fs');

var path = require('path');

var createMacro = require('babel-plugin-macros').createMacro;

function rawquire(_ref) {
  var references = _ref.references,
      state = _ref.state,
      babel = _ref.babel;
  var _references$default = references["default"],
      rawquire = _references$default === void 0 ? [] : _references$default;
  var sourceDir = state.file.opts.filename;

  var _iterator = _createForOfIteratorHelper(references.rawquire),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var reference = _step.value;

      if (reference.parentPath.type !== 'CallExpression') {
        return;
      }

      var callRef = reference.parentPath;
      var shortPath = callRef.get("arguments")[0].evaluate().value;

      var templatePath = require.resolve(shortPath, path.dirname(sourceDir));

      var content = fs.readFileSync(templatePath, 'utf8');
      callRef.replaceWith(babel.types.stringLiteral(content));
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
}

module.exports = createMacro(rawquire);
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BinaryMessageView = void 0;

var _View2 = require("curvature/base/View");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var BinaryMessageView = /*#__PURE__*/function (_View) {
  _inherits(BinaryMessageView, _View);

  var _super = _createSuper(BinaryMessageView);

  function BinaryMessageView() {
    var _this;

    var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, BinaryMessageView);

    _this = _super.call(this, args);
    _this.template = "<span>&gt;&gt;&nbsp;0x</span>[[header]]&nbsp;[[message]]";
    return _this;
  }

  return BinaryMessageView;
}(_View2.View);

exports.BinaryMessageView = BinaryMessageView;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ByteView = void 0;

var _View2 = require("curvature/base/View");

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

var ByteView = /*#__PURE__*/function (_View) {
  _inherits(ByteView, _View);

  var _super = _createSuper(ByteView);

  function ByteView() {
    var _this;

    var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, ByteView);

    _this = _super.call(this, args);
    _this.args.separator = _this.args.separator || '';
    _this.template = "<span\n\t\t\tcv-each = \"bytes:byte:b\"\n\t\t\tcv-carry = \"separator\"\n\t\t\t\"><span\n\t\t\t\tclass  = \"byte\"\n\t\t\t\tcv-on  = \"cvDomAttached:color(event, byte, $view)\"\n\t\t\t\tcv-ref = \"byte:curvature/base/Tag\"\n\n\t\t\t>[[byte]][[separator]]</span></span>";
    return _this;
  }

  _createClass(ByteView, [{
    key: "color",
    value: function color(event, _byte, $view) {
      var hue = parseInt(_byte, 16); // let color = '#' + [
      // 	(Math.pow(Math.cos(Math.PI * hue + 5), 2) * 192)
      // 	, (Math.pow(Math.cos(Math.PI * hue + 10), 2) * 192)
      // 	, (Math.pow(Math.cos(Math.PI * hue + 0), 2) * 192)
      // ].map((x)=>Math.floor(x).toString(16).padStart(2, '0')).join('');

      if (!hue) {
        return;
      }

      var color = "hsl(" + 360 * hue / 0xFF + ",100%,50%)";
      $view.tags["byte"].element.style.color = color; // $view.tags.byte.element.style['text-shadow'] = `2px 0px 5px ${color}, -2px 0px 5px ${color}`
    }
  }]);

  return ByteView;
}(_View2.View);

exports.ByteView = ByteView;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MeltingText = void 0;

var _View = require("curvature/base/View");

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

var MeltingText = /*#__PURE__*/function (_BaseView) {
  _inherits(MeltingText, _BaseView);

  var _super = _createSuper(MeltingText);

  function MeltingText(args) {
    var _this;

    _classCallCheck(this, MeltingText);

    _this = _super.call(this, args);
    _this.last = _this.init = Date.now();
    _this.charUp = [// '\u030d', /*     ̍     */		'\u030e', /*     ̎     */		'\u0304', /*     ̄     */		'\u0305', /*     ̅     */
    // '\u033f', /*     ̿     */		'\u0311', /*     ̑     */		'\u0306', /*     ̆     */		'\u0310', /*     ̐     */
    // '\u0352', /*     ͒     */		'\u0357', /*     ͗     */		'\u0351', /*     ͑     */		'\u0307', /*     ̇     */
    // '\u0308', /*     ̈     */		'\u030a', /*     ̊     */		'\u0342', /*     ͂     */		'\u0343', /*     ̓     */
    "\u0344",
    /*     ̈́     */

    /*	'\u034a', /*     ͊     */

    /*	'\u034b', /*     ͋     */

    /*	'\u034c', /*     ͌     */
    "\u0303",
    /*     ̃     */

    /*	'\u0302', /*     ̂     */

    /*	'\u030c', /*     ̌     */

    /*	'\u0350', /*     ͐     */
    "\u0300"
    /*     ̀     */
    //	'\u0301', /*     ́     */		'\u030b', /*     ̋     */		'\u030f', /*     ̏     */
    // '\u0312', /*     ̒     */		'\u0313', /*     ̓     */		'\u0314', /*     ̔     */		'\u033d', /*     ̽     */
    // '\u0309', /*     ̉     */		'\u0363', /*     ͣ     */		'\u0364', /*     ͤ     */		'\u0365', /*     ͥ     */
    // '\u0366', /*     ͦ     */		'\u0367', /*     ͧ     */		'\u0368', /*     ͨ     */		'\u0369', /*     ͩ     */
    // '\u036a', /*     ͪ     */		'\u036b', /*     ͫ     */		'\u036c', /*     ͬ     */		'\u036d', /*     ͭ     */
    // '\u036e', /*     ͮ     */		'\u036f', /*     ͯ     */		'\u033e', /*     ̾     */		'\u035b', /*     ͛     */
    ];
    _this.charMid = ["\u0315",
    /*     ̕     */
    "\u031B",
    /*     ̛     */
    "\u0340",
    /*     ̀     */
    "\u0341",
    /*     ́     */
    "\u0358",
    /*     ͘     */
    "\u0321",
    /*     ̡     */
    "\u0322",
    /*     ̢     */
    "\u0327",
    /*     ̧     */
    "\u0328",
    /*     ̨     */
    "\u0334",
    /*     ̴     */
    "\u0335",
    /*     ̵     */
    "\u0336",
    /*     ̶     */
    "\u034F",
    /*     ͏     */
    "\u035C",
    /*     ͜     */
    "\u035D",
    /*     ͝     */
    "\u035E",
    /*     ͞     */
    "\u035F",
    /*     ͟     */
    "\u0360",
    /*     ͠     */

    /*'\u0362',      ͢     */
    "\u0338",
    /*     ̸     */
    "\u0337",
    /*     ̷     */
    "\u0361"
    /*     ͡     */

    /*'\u0489'     ҉_     */
    ];
    _this.charDown = [// '\u0316', /*     ̖     */		'\u0317', /*     ̗     */		'\u0318', /*     ̘     */		'\u0319', /*     ̙     */
    // '\u0316', /*     ̖     */		'\u0317', /*     ̗     */		'\u0318', /*     ̘     */		'\u0319', /*     ̙     */
    // '\u0320', /*     ̠     */		'\u0324', /*     ̤     */		'\u0325', /*     ̥     */		'\u0326', /*     ̦     */
    // '\u0329', /*     ̩     */		'\u032a', /*     ̪     */		'\u032b', /*     ̫     */		'\u032c', /*     ̬     */
    // '\u032d', /*     ̭     */		'\u032e', /*     ̮     */		'\u032f', /*     ̯     */		'\u0330', /*     ̰     */
    // '\u0331', /*     ̱     */		'\u0332', /*     ̲     */		'\u0333', /*     ̳     */		'\u0339', /*     ̹     */
    "\u033A",
    /*     ̺     */
    "\u033B",
    /*     ̻     */
    "\u033C",
    /*     ̼     */
    "\u0345"
    /*     ͅ     */
    //'\u0347', /*     ͇     */		'\u0348', /*     ͈     */		'\u0349', /*     ͉     */		'\u034d', /*     ͍     */
    //'\u034e', /*     ͎     */		'\u0353', /*     ͓     */		'\u0354', /*     ͔     */		'\u0355', /*     ͕     */
    // '\u0356', /*     ͖     */		'\u0359', /*     ͙     */		'\u035a', /*     ͚     */		'\u0323' /*     ̣     */
    ];
    _this.template = "\n\t\t\t<div cv-bind = \"output\" class = \"melting\"></div>\n\t\t";
    _this.args.input = "Magic is no more than the art of employing consciously invisible means to produce visible effects. Will, love, and imagination are magic powers that everyone possesses; and whoever knows how to develop them to their fullest extent is a magician. Magic has but one dogma, namely, that the seen is the measure of the unseen\n"; // this.args.input      = 'anything';

    _this.args.output = 'uh.';
    _this.corruptors = [];
    _this.maxMaxCorrupt = 25;
    _this.maxCorrupt = 0;
    _this.type = '';

    _this.onFrame(function () {
      _this.typewriter(_this.args.input);
    });

    _this.onInterval(16 * 4, function () {
      var selection = window.getSelection();

      if (selection.anchorOffset !== selection.focusOffset) {
        return;
      }

      if (selection.anchorNode !== selection.focusNode) {
        return;
      }

      _this.args.output = _this.corrupt(_this.type); // this.args.output = this.type;
    });

    _this.args.bindTo('input', function (v) {
      _this.type = '';
      _this.corruptors = [];
    });

    return _this;
  }

  _createClass(MeltingText, [{
    key: "age",
    value: function age() {
      return this.init - Date.now();
    }
  }, {
    key: "lastFrame",
    value: function lastFrame() {
      return this.last - Date.now();
    }
  }, {
    key: "corrupt",
    value: function corrupt(v) {
      if (v.length * 1.15 < this.args.input.length) {
        return this.type;
      }

      var chars = v.split('');

      var random = function random(x) {
        return parseInt(Math.random() * x);
      };

      if (random(1024) < 256 && this.maxCorrupt < this.maxMaxCorrupt) {
        this.maxCorrupt += 5;
      }

      for (var _i in chars) {
        this.corruptors[_i] = this.corruptors[_i] || [];

        if (chars[_i].match(/\W/)) {
          continue;
        }

        var charSets = [// this.charDown // Melt Slow
        this.charDown, this.charMid // Melt
        // this.charDown, this.charUp,   this.charMid, // Boil
        // this.charMid, this.charUp, // Burn
        // this.charMid // Simmer
        // this.charUp // Rain
        ];
        var charSet = charSets[random(charSets.length)];

        if (random(8192) < 1) {
          this.corruptors[_i].unshift(charSet[random(charSet.length)]);
        }

        if (this.corruptors[_i].length < this.maxCorrupt) {
          this.corruptors[_i].unshift(charSet[random(charSet.length)]);
        }

        if (random(2048) < 1 && this.maxCorrupt > 25) {
          this.corruptors[_i].splice(5 * random(5));
        }

        this.corruptors[_i].push(this.corruptors[_i].shift());
      }

      for (var i in chars) {
        if (this.corruptors[i]) {
          chars[i] += this.corruptors[i].join('');
        }
      }

      return chars.join('');
    }
  }, {
    key: "typewriter",
    value: function typewriter(v) {
      this.type = this.type || '';

      if (this.type !== v) {
        this.type += v.substr(this.type.length, 1);
        this.onTimeout(150, function () {
          var max = window.scrollY + window.innerHeight;

          if (document.body.scrollHeight > max) {
            window.scrollTo({
              top: document.body.scrollHeight,
              left: 0,
              behavior: 'smooth'
            });
          }
        });
      } else {
        return true;
      }

      return false;
    }
  }]);

  return MeltingText;
}(_View.View);

exports.MeltingText = MeltingText;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TextMessageView = void 0;

var _View2 = require("curvature/base/View");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var TextMessageView = /*#__PURE__*/function (_View) {
  _inherits(TextMessageView, _View);

  var _super = _createSuper(TextMessageView);

  function TextMessageView() {
    var _this;

    var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, TextMessageView);

    _this = _super.call(this, args);
    _this.template = "<span>&gt;&gt;&nbsp;</span><span class = \"text\">[[message]]</span>";
    return _this;
  }

  return TextMessageView;
}(_View2.View);

exports.TextMessageView = TextMessageView;
