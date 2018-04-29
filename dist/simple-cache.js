/** @license SimpleCache v2.X
 * simple-cache.js
 *
 * Author: Stetson Pierce
 *
 * This source code is licensed under the MIT license.
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SimpleCache = function () {
  function SimpleCache(_ref) {
    var _ref$defaultTTL = _ref.defaultTTL,
        defaultTTL = _ref$defaultTTL === undefined ? 1000 * 60 * 60 * 24 : _ref$defaultTTL,
        _ref$namespace = _ref.namespace,
        namespace = _ref$namespace === undefined ? 'SC_' : _ref$namespace,
        _ref$logMessages = _ref.logMessages,
        logMessages = _ref$logMessages === undefined ? false : _ref$logMessages;

    _classCallCheck(this, SimpleCache);

    this.defaultTTL = defaultTTL;
    this.namespace = namespace;
    this.logMessages = logMessages;
  }

  _createClass(SimpleCache, [{
    key: 'get',
    value: function get(key) {
      if (this.logMessages) {
        console.log('SC:Looking up cache for key:' + this.namespace + key);
      }
      var item = localStorage.getItem('' + this.namespace + key);
      if (!item) {
        if (this.logMessages) {
          console.log('SC:No item found');
        }
        return null;
      }

      item = JSON.parse(item);
      if (Date.now() >= item.ttl) {
        if (this.logMessages) {
          console.log('SC:Item expired, returning null');
        }
        localStorage.removeItem('' + this.namespace + key);

        return null;
      }

      if (this.logMessages) {
        console.log('SC:Cached Value\nKEY:' + this.namespace + key + '\nVALUE:' + JSON.stringify(item, null, 2));
      }
      return item.value;
    }
  }, {
    key: 'cache',
    value: function cache(key, value, expiresIn) {
      var ttl = expiresIn;

      ttl = !ttl || ttl.constructor !== Date ? new Date(Date.now() + this.defaultTTL).valueOf() : expiresIn.valueOf();

      var item = { value: value, ttl: ttl };
      if (this.logMessages) {
        console.log('SC:Caching\nKEY: ' + this.namespace + key + '\nVALUE: ' + JSON.stringify(item, null, 2));
      }
      localStorage.setItem('' + this.namespace + key, JSON.stringify(item));
    }
  }, {
    key: 'bust',
    value: function bust(key) {
      if (this.logMessages) {
        console.log('SC:Bust cache for:' + this.namespace + key);
      }
      localStorage.removeItem('' + this.namespace + key);
    }
  }]);

  return SimpleCache;
}();

exports.default = SimpleCache;