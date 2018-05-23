'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LocalStorage = function () {
  function LocalStorage() {
    _classCallCheck(this, LocalStorage);

    this.isNode = typeof window === 'undefined';
    if (this.isNode) {
      this.cache = {};
    }
  }

  _createClass(LocalStorage, [{
    key: 'set',
    value: function set(key, value) {
      if (this.isNode) {
        this.cache[key] = value;
        return;
      }

      localStorage.set(key, value);
    }
  }, {
    key: 'get',
    value: function get() {}
  }, {
    key: 'remove',
    value: function remove() {}
  }]);

  return LocalStorage;
}();

exports.default = LocalStorage;