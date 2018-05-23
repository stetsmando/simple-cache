/** @license SimpleCache v2.X
 * simple-cache.js
 *
 * Author: Stetson Pierce
 *
 * This source code is licensed under the MIT license.
 */
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _LocalStorage = require('./lib/LocalStorage');

var _LocalStorage2 = _interopRequireDefault(_LocalStorage);

var _SessionStorage = require('./lib/SessionStorage');

var _SessionStorage2 = _interopRequireDefault(_SessionStorage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var localStorage = new _LocalStorage2.default();
var sessionStorage = new _SessionStorage2.default();

module.exports = function () {
  function SimpleCache(ttl, namespace, logMessages) {
    _classCallCheck(this, SimpleCache);

    this.ttl = ttl || 1000 * 60 * 60 * 24; // 24 hours
    this.namespace = namespace || 'SC_';
    this.logMessages = logMessages || false;
  }

  _createClass(SimpleCache, [{
    key: 'set',
    value: function set() {
      if (typeof (arguments.length <= 0 ? undefined : arguments[0]) == 'string') {
        // Single Input
        if (arguments.length <= 2 ? undefined : arguments[2]) {
          // We're using Session Storage
          console.log('Session - Caching: ' + (arguments.length <= 0 ? undefined : arguments[0]) + ': ' + (arguments.length <= 1 ? undefined : arguments[1]));
        } else {
          // We're using Local Storage

        }
      } else if (Array.isArray(arguments.length <= 0 ? undefined : arguments[0])) {
        // Bulk operation
      }
    }

    // setInStone(...args) {}
    // get(...args) {}
    // remove(...args) {}

  }]);

  return SimpleCache;
}();