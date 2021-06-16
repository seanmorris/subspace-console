"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

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