'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SessionStorage = function SessionStorage() {
  _classCallCheck(this, SessionStorage);

  this.isNode = typeof window === 'undefined';
};

exports.default = SessionStorage;