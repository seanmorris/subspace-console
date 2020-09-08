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