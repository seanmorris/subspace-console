"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Renderer = void 0;

var _Renderer = require("sixgram/Renderer");

var _pallete = require("./pallete");

var _Colors = require("./Colors255");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var audio = new AudioContext();
var gainNode = audio.createGain();
gainNode.connect(audio.destination);
gainNode.gain.value = 10 * 0.01;

var Renderer = /*#__PURE__*/function (_BaseRenderer) {
  _inherits(Renderer, _BaseRenderer);

  var _super = _createSuper(Renderer);

  function Renderer() {
    var _this;

    _classCallCheck(this, Renderer);

    _this = _super.call(this, {
      normal: function normal(chunk, parent) {
        return _this.setGraphicsMode(chunk, parent);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "style", {});

    return _this;
  }

  _createClass(Renderer, [{
    key: "reset",
    value: function reset() {
      for (var _i = 0, _Object$entries = Object.entries(this.style); _i < _Object$entries.length; _i++) {
        var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 1),
            k = _Object$entries$_i[0];

        delete this.style[k];
      }
    }
  }, {
    key: "beep",
    value: function beep() {
      var oscillator = audio.createOscillator();
      oscillator.connect(gainNode);
      oscillator.frequency.value = 840;
      oscillator.type = "square";
      oscillator.start(audio.currentTime);
      oscillator.stop(audio.currentTime + 200 * 0.001);
    }
  }, {
    key: "setGraphicsMode",
    value: function setGraphicsMode(chunk, parent) {
      if (typeof chunk === 'string') {
        if (chunk === '') {
          return false;
        }

        var styleString = '';

        for (var _i2 = 0, _Object$entries2 = Object.entries(this.style); _i2 < _Object$entries2.length; _i2++) {
          var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i2], 2),
              key = _Object$entries2$_i[0],
              val = _Object$entries2$_i[1];

          styleString += "".concat(key, ": ").concat(val, "; ");
        }

        return "<span class = \"ansi\" style = \"".concat(styleString, "\">").concat(chunk, "</span>");
      }

      if (_typeof(chunk) === 'object') {
        if (chunk.type === 'escaped' && chunk.groups[0] === 'a') {
          this.beep();
        }

        if (chunk.type === 'graphics' || chunk.type === 'reset') {
          for (var g = 0; g < chunk.groups.length; g++) {
            var group = Number(chunk.groups[g]);

            if (chunk.groups[g] === '') {
              return false;
            }

            switch (group) {
              case 0:
                for (var _key in this.style) {
                  delete this.style[_key];
                }

                break;

              case 1:
                this.style['filter'] = 'contrast(1.25)'; // this.style['text-shadow'] = '1px 1px 1px rgba(0,0,0,0.25), 0px 0px 1px rgba(0,0,0,0.125)';

                this.style['font-weight'] = 'bold';
                this.style['opacity'] = 1;
                break;

              case 2:
                this.style['filter'] = 'brightness(0.85)';
                this.style['font-weight'] = 'light';
                this.style['opacity'] = 0.75;
                break;

              case 3:
                this.style['font-style'] = 'italic';
                break;

              case 4:
                this.style['text-decoration'] = 'underline';
                break;

              case 5:
                this.style['animation'] = 'var(--ansiBlink)';
                break;

              case 7:
                this.style['filter'] = 'invert(1)';
                break;

              case 8:
                this.style['filter'] = 'contrast(0.5)';
                this.style['opacity'] = 0.1;
                break;

              case 9:
                this.style['text-decoration'] = 'line-through';
                break;

              case 10:
                this.style['font-family'] = 'var(--base-font))';
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
                this.style['font-family'] = "var(--alt-font-no-".concat(group, ")");
                break;

              case 20:
                this.style['font-family'] = 'var(--alt-font-fraktur)';
                this.style['font-size'] = '1.1rem';
                break;

              case 21:
                this.style['font-weight'] = 'initial';
                break;

              case 22:
                this.style['font-weight'] = 'initial';
                break;

              case 23:
                this.style['font-weight'] = 'initial';
                this.style['font-style'] = 'initial';
                break;

              case 24:
                this.style['text-decoration'] = 'none';
                this.style['font-family'] = 'sans-serif';
                this.style['font-size'] = '12pt';
                break;

              case 25:
                this.style['animation'] = 'none';
                break;

              case 26:
                this.style['text-transform'] = 'full-width';
                break;

              case 27:
                this.style['filter'] = 'initial';
                break;

              case 28:
                this.style['opacity'] = 'initial';
                break;

              case 29:
                this.style['text-decoration'] = 'initial';
                break;

              case 30:
                this.style['color'] = _pallete.pallete.black;
                break;

              case 31:
                this.style['color'] = _pallete.pallete.red;
                break;

              case 32:
                this.style['color'] = _pallete.pallete.green;
                break;

              case 33:
                this.style['color'] = _pallete.pallete.yellow;
                break;

              case 34:
                this.style['color'] = _pallete.pallete.blue;
                break;

              case 35:
                this.style['color'] = _pallete.pallete.magenta;
                break;

              case 36:
                this.style['color'] = _pallete.pallete.cyan;
                break;

              case 37:
                this.style['color'] = _pallete.pallete.white;
                break;

              case 38:
                if (chunk.groups[1 + g] == 2) {
                  var _chunk$groups$split = chunk.groups[2 + g].split(';'),
                      _chunk$groups$split2 = _slicedToArray(_chunk$groups$split, 3),
                      rd = _chunk$groups$split2[0],
                      gr = _chunk$groups$split2[1],
                      bl = _chunk$groups$split2[2];

                  this.style['color'] = "rgb(".concat(rd, ",").concat(gr, ",").concat(bl, ")");
                }

                if (chunk.groups[1 + g] == 5) {
                  var _Colors255$Number = _Colors.Colors255[Number(chunk.groups[2 + g])],
                      _rd = _Colors255$Number.r,
                      _gr = _Colors255$Number.g,
                      _bl = _Colors255$Number.b;

                  this.style['color'] = "rgb(".concat(_rd, ",").concat(_gr, ",").concat(_bl, ")");
                }

                g += 2;
                break;

              case 39:
                this.style['color'] = 'var(--fgColor)';
                break;

              case 40:
                this.style['background-color'] = _pallete.pallete.black;
                break;

              case 41:
                this.style['background-color'] = _pallete.pallete.red;
                break;

              case 42:
                this.style['background-color'] = _pallete.pallete.green;
                break;

              case 43:
                this.style['background-color'] = _pallete.pallete.yellow;
                break;

              case 44:
                this.style['background-color'] = _pallete.pallete.blue;
                break;

              case 45:
                this.style['background-color'] = _pallete.pallete.magenta;
                break;

              case 46:
                this.style['background-color'] = _pallete.pallete.cyan;
                break;

              case 47:
                this.style['background-color'] = _pallete.pallete.white;
                break;

              case 48:
                if (chunk.groups[1 + g] == 2) {
                  var _chunk$groups$split3 = chunk.groups[2 + g].split(';'),
                      _chunk$groups$split4 = _slicedToArray(_chunk$groups$split3, 3),
                      _rd2 = _chunk$groups$split4[0],
                      _gr2 = _chunk$groups$split4[1],
                      _bl2 = _chunk$groups$split4[2];

                  this.style['background-color'] = "rgb(".concat(_rd2, ",").concat(_gr2, ",").concat(_bl2, ")");
                }

                if (chunk.groups[1 + g] == 5) {
                  var _Colors255$Number2 = _Colors.Colors255[Number(chunk.groups[2 + g])],
                      _rd3 = _Colors255$Number2.r,
                      _gr3 = _Colors255$Number2.g,
                      _bl3 = _Colors255$Number2.b;

                  this.style['background-color'] = "rgb(".concat(_rd3, ",").concat(_gr3, ",").concat(_bl3, ")");
                }

                g += 2;
                break;

              case 49:
                this.style['background-color'] = 'var(--bgColor)';
                break;

              case 50:
                this.style['text-transform'] = 'initial';
                break;

              case 51:
                this.style['border'] = '1px solid currentColor';
                break;

              case 52:
                this.style['border'] = '1px solid currentColor';
                this.style['border-radius'] = '1em';
                break;

              case 53:
                this.style['text-decoration'] = 'overline';
                break;

              case 54:
                this.style['border'] = 'initial';
                break;

              case 55:
                this.style['border'] = 'initial';
                break;
            }
          }
        }

        return false;
      }
    }
  }]);

  return Renderer;
}(_Renderer.Renderer);

exports.Renderer = Renderer;