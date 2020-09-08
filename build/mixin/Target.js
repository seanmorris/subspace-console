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