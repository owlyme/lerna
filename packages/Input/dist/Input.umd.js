(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('react')) :
	typeof define === 'function' && define.amd ? define(['react'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, (global.WeiMob = global.WeiMob || {}, global.WeiMob.Input = factory()));
}(this, (function () { 'use strict';

	var Input = function Input(f) {
	  return f;
	};

	return Input;

})));
