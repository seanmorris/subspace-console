"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Renderer = void 0;

var _Renderer = require("sixgram/Renderer");

var _Colors = require("./Colors255");

var _pallete = require("./pallete");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var oneByte = {};

for (var c in _Colors.Colors255) {
  var color = _Colors.Colors255[c];
  oneByte[color.colorId] = color.rgb;
}

var style = {};
var Renderer = new _Renderer.Renderer({
  normal: function normal(chunk, parent) {
    if (typeof chunk === 'string') {
      var styleString = '';

      for (var _i = 0, _Object$entries = Object.entries(style); _i < _Object$entries.length; _i++) {
        var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
            key = _Object$entries$_i[0],
            val = _Object$entries$_i[1];

        styleString += "".concat(key, ": ").concat(val, "; ");
      }

      return "<span class = \"ansi\" style = \"".concat(styleString, "\">").concat(chunk, "</span>");
    }

    if (_typeof(chunk) === 'object') {
      if (chunk.type === 'esc' || chunk.type === 'reset') {
        for (var g in chunk.groups) {
          var group = Number(chunk.groups[g]);

          switch (group) {
            case 0:
              for (var _key in style) {
                delete style[_key]; // style[key] = 'initial'
                // if(key === 'color')
                // {
                // 	style[key] = 'var(--fgColor)'
                // }
                // if(key === 'background-color')
                // {
                // 	style[key] = 'var(--bgColor)'
                // }
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
              style['color'] = _pallete.pallete.black;
              break;

            case 31:
              style['color'] = _pallete.pallete.red;
              break;

            case 32:
              style['color'] = _pallete.pallete.green;
              break;

            case 33:
              style['color'] = _pallete.pallete.yellow;
              break;

            case 34:
              style['color'] = _pallete.pallete.blue;
              break;

            case 35:
              style['color'] = _pallete.pallete.magenta;
              break;

            case 36:
              style['color'] = _pallete.pallete.cyan;
              break;

            case 37:
              style['color'] = _pallete.pallete.white;
              break;

            case 38:
              if (chunk.groups[2] == 2) {
                var _chunk$groups$split = chunk.groups[_g + 1].split(';'),
                    _chunk$groups$split2 = _slicedToArray(_chunk$groups$split, 3),
                    r = _chunk$groups$split2[0],
                    _g = _chunk$groups$split2[1],
                    b = _chunk$groups$split2[2];

                style['color'] = "rgb(".concat(r, ",").concat(_g, ",").concat(b, ")");
              }

              if (chunk.groups[2] == 5) {
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
              style['background-color'] = _pallete.pallete.black;
              break;

            case 41:
              style['background-color'] = _pallete.pallete.red;
              break;

            case 42:
              style['background-color'] = _pallete.pallete.green;
              break;

            case 43:
              style['background-color'] = _pallete.pallete.yellow;
              break;

            case 44:
              style['background-color'] = _pallete.pallete.blue;
              break;

            case 45:
              style['background-color'] = _pallete.pallete.magenta;
              break;

            case 46:
              style['background-color'] = _pallete.pallete.cyan;
              break;

            case 47:
              style['background-color'] = _pallete.pallete.white;
              break;

            case 48:
              if (chunk.groups[1] == 2) {
                var _chunk$groups$2$split = chunk.groups[2].split(';'),
                    _chunk$groups$2$split2 = _slicedToArray(_chunk$groups$2$split, 3),
                    _r2 = _chunk$groups$2$split2[0],
                    _g3 = _chunk$groups$2$split2[1],
                    _b2 = _chunk$groups$2$split2[2];

                style['background-color'] = "rgb(".concat(_r2, ",").concat(_g3, ",").concat(_b2, ")");
              }

              if (chunk.groups[1] == 5) {
                var _oneByte$Number2 = oneByte[Number(chunk.groups[2])],
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
      }

      return false;
    }
  }
});
exports.Renderer = Renderer;