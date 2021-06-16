"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ByteView = void 0;

var _View2 = require("curvature/base/View");

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

var ByteView = /*#__PURE__*/function (_View) {
  _inherits(ByteView, _View);

  var _super = _createSuper(ByteView);

  function ByteView() {
    var _this;

    var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, ByteView);

    _this = _super.call(this, args);
    _this.template = "<span cv-each = \"bytes:byte:b\">\n\t\t\t<span class = \"byte\" style = \"width:2em;\" cv-ref  = \"byte:curvature/base/Tag\"></span>\n\t\t</span>";
    return _this;
  }

  _createClass(ByteView, [{
    key: "attached",
    value: function attached() {
      var _this2 = this;

      // let color = '#' + [
      // 	(Math.pow(Math.cos(Math.PI * hue + 5), 2) * 192)
      // 	, (Math.pow(Math.cos(Math.PI * hue + 10), 2) * 192)
      // 	, (Math.pow(Math.cos(Math.PI * hue + 0), 2) * 192)
      // ].map((x)=>Math.floor(x).toString(16).padStart(2, '0')).join('');
      requestAnimationFrame(function () {
        var _byte = _this2.args.value;
        var hue = parseInt(_byte, 16);

        _this2.args.bindTo('value', function (v) {
          _this2.tags["byte"].element.textContent = v;
        });

        if (!hue) {
          return;
        }

        var color = "hsl(" + 360 * hue / 0xFF + ",100%,50%)";
        _this2.tags["byte"].element.style.color = color;
      }); // $view.tags.byte.element.style['text-shadow'] = `2px 0px 5px ${color}, -2px 0px 5px ${color}`
    }
  }]);

  return ByteView;
}(_View2.View);

exports.ByteView = ByteView;