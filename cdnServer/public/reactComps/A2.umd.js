(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('react'), require('./B1')) :
    typeof define === 'function' && define.amd ? define(['react', './B1'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, (global.WeiMob = global.WeiMob || {}, global.WeiMob.A2 = factory(global.React, global.com)));
}(this, (function (React, com) { 'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
    var com__default = /*#__PURE__*/_interopDefaultLegacy(com);

    function A2(porps) {
      return /*#__PURE__*/React__default['default'].createElement("div", null, "A2 ", porps.text, com__default['default']);
    }

    return A2;

})));
