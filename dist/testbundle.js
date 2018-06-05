var SimpleCache =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return SimpleCache; });\n/* harmony import */ var _lib_LocalStorage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/LocalStorage */ \"./src/lib/LocalStorage.js\");\n/* harmony import */ var _lib_SessionStorage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/SessionStorage */ \"./src/lib/SessionStorage.js\");\n/* harmony import */ var _lib_Logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/Logger */ \"./src/lib/Logger.js\");\n\n\n\n\nconst local = new _lib_LocalStorage__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\nconst session = new _lib_SessionStorage__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\n\nclass SimpleCache {\n  constructor(opts = {}) {\n    this.ttl = opts.ttl || 1000 * 60 * 60 * 24 // 24 hours\n    this.namespace = opts.namespace || 'SC_';\n    this.logger = new _lib_Logger__WEBPACK_IMPORTED_MODULE_2__[\"default\"](opts.logMessages || false);\n  }\n\n  async set(...args) {\n    if (typeof args[0] == 'string') {\n      // Single Input\n      const key = `${ this.namespace }${ args[0] }`;\n      \n      this.logger.log(`Set Single`);\n      this.logger.log(`Key ${ key }`);\n\n      if (args[2]) {\n        // We're using Session Storage\n        const item = this.buildItem(args[1]);\n\n        this.logger.log(`Storing in Session`);\n        this.logger.log(`Item ${ JSON.stringify(item) }`);\n        session.set(key, item);\n      }\n      else {\n        // We're using Local Storage\n        const item = this.buildItem(args[1]);\n\n        this.logger.log(`Storing in Local`);\n        this.logger.log(`Item ${ JSON.stringify(item) }`);\n        local.set(key, item);\n      }\n    }\n    else if (Array.isArray(args[0])) {\n      // Bulk operation\n      this.logger.log(`Set Multi`);\n\n      if (args[1]) {\n        // We're using Session Storage\n        this.logger.log(`Storing in Session`);\n        this.logger.log(`Values ${ args[0] }`);\n\n        const promises = [];\n\n        args[0].forEach(obj => {\n          promises.push(new Promise((resolve, reject) => {\n            const key = `${ this.namespace }${ obj.key }`;\n            const item = this.buildItem(obj);\n            this.logger.log(`Item ${ JSON.stringify(item) }`);\n            session.set(key, item);\n            resolve();\n          }));\n        });\n\n        this.logger.log(`All Promises Created`);\n        return Promise.all(promises);\n      }\n      else {\n        // We're using Local Storage\n        this.logger.log(`Storing in Local`);\n        this.logger.log(`Values ${ args[0] }`);\n\n        const promises = [];\n\n        args[0].forEach(obj => {\n          promises.push(new Promise((resolve, reject) => {\n            const key = `${ this.namespace }${ obj.key }`;\n            const item = this.buildItem(obj);\n            this.logger.log(`Item ${ JSON.stringify(item) }`);\n            local.set(key, item);\n            resolve();\n          }));\n        });\n\n        this.logger.log(`All Promises Created`);\n        return Promise.all(promises);\n      }\n    }\n  }\n\n  async get(...args) {\n    if (typeof args[0] == 'string') {\n      // Single Retrieval\n      const key = `${ this.namespace }${ args[0] }`;\n      let found = 'session';\n\n      this.logger.log(`Get Single`);\n      this.logger.log(`Key ${ key }`);\n      this.logger.log(`Checking Session...`);\n\n      let item = session.get(key);\n      if (!item) {\n        this.logger.log(`Checking Local...`);\n        this.found = 'local';\n        item = local.get(key);\n        if (!item) {\n          this.logger.log(`Nothing Found`);\n          return null;\n        }\n      }\n\n      this.logger.log(`Item Found`);\n\n      item = JSON.parse(item);\n\n      if (Date.now() >= item.ttl) {\n        this.logger.log(`Item Expired`);\n        if (found === 'session') {\n          this.logger.log('Remove Session');\n          session.remove(key);\n          this.logger.log(`Checking Local...`);\n          item = local.get(key);\n          if (!item) {\n            this.logger.log(`Local Not Found`);\n            return null;\n          }\n\n          this.logger.log(`Item Found`);\n\n          item = JSON.parse(item);\n\n          if (Date.now() >= item.ttl) {\n            this.logger.log(`Item Expired`);\n            this.logger.log('Remove Local');\n            local.remove(key);\n            return null;\n          }\n        }\n        else {\n          this.logger.log(`Item Expired`);\n          this.logger.log('Remove Local');\n          local.remove(key);\n          return null;\n        }\n      }\n\n      return item.value;\n    }\n    else if (Array.isArray(args[0])) {\n      // Multi Retrieval\n      const promises = [];\n\n      args[0].forEach(key => {\n        promises.push(new Promise((resolve, reject) => {\n          let item = local.get(`${ this.namespace }${ key }`);\n          if (!item)\n            return resolve(null);\n\n          item = JSON.parse(item);\n          if (Date.now() >= item.ttl) {\n            // Item has expired\n            local.remove(`${ this.namespace }${ key }`);\n            return resolve(null);\n          }\n\n          return resolve(item.value);\n        }));\n      });\n\n      return await Promise.all(promises);\n    }\n  }\n\n  async remove(...args) {\n    if (typeof args[0] == 'string') {\n      // Single Removal\n      this.logger.log(`Remove Single`);\n      const key = `${ this.namespace }${ args[0] }`;\n      this.logger.log(`Key ${ key }`);\n      local.remove(key);\n      session.remove(key);\n    }\n    else if (Array.isArray(args[0])) {\n      // Multi Removal\n      this.logger.log(`Remove Multi`);\n      const promises = [];\n\n      args[0].forEach(key => {\n        promises.push(new Promise((resolve, reject) => {\n          const fullKey = `${ this.namespace }${ key }`;\n          this.logger.log(`Key ${ fullKey }`);\n          local.remove(fullKey);\n          session.remove(fullKey);\n          resolve();\n        }));\n      });\n\n      return await Promise.all(promises);\n    }\n  }\n\n  buildItem(obj) {\n    let ttl = this.ttl;\n    if (obj.ttl) {\n      ttl = obj.ttl;\n      delete obj.ttl;\n    }\n\n    ttl += Date.now();\n\n    return { value: obj, ttl };\n  }\n}\n\n\n//# sourceURL=webpack://SimpleCache/./src/index.js?");

/***/ }),

/***/ "./src/lib/LocalStorage.js":
/*!*********************************!*\
  !*** ./src/lib/LocalStorage.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return LocalStorage; });\nclass LocalStorage {\n  set(key, value) {\n    localStorage.setItem(key, JSON.stringify(value));\n  }\n\n  get(key) {\n    return localStorage.getItem(key);\n  }\n\n  remove(key) {\n    localStorage.removeItem(key);\n  }\n}\n\n\n//# sourceURL=webpack://SimpleCache/./src/lib/LocalStorage.js?");

/***/ }),

/***/ "./src/lib/Logger.js":
/*!***************************!*\
  !*** ./src/lib/Logger.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Logger; });\nclass Logger {\n  constructor(isActive) {\n    this.isActive = isActive || false;\n    this.key = 'SC:';\n  }\n\n  log(msg) {\n    if (this.isActive) { console.log(`${ this.key } ${ msg }`) }\n  }\n}\n\n//# sourceURL=webpack://SimpleCache/./src/lib/Logger.js?");

/***/ }),

/***/ "./src/lib/SessionStorage.js":
/*!***********************************!*\
  !*** ./src/lib/SessionStorage.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return SessionStorage; });\nclass SessionStorage {\n  set(key, value) {\n    sessionStorage.setItem(key, JSON.stringify(value));\n  }\n\n  get(key) {\n    return sessionStorage.getItem(key);\n  }\n\n  remove(key) {\n    sessionStorage.removeItem(key);\n  }\n}\n\n\n//# sourceURL=webpack://SimpleCache/./src/lib/SessionStorage.js?");

/***/ })

/******/ });