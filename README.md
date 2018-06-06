# Simple Cache
> A fast, simple and lightweight expiring key value store for modern browsers.

![Version](https://img.shields.io/badge/Version-2.X-brightgreen.svg)

Question or comments please feel free to open an [issue](https://github.com/stetsmando/simple-cache/issues) or email me at me@stetson.io. You can also visit the simple-cache [website](https://simple-cache.herokuapp.com/).

## Want to Contribute or Help Out?
Feel free to head over to the [GitHub](https://github.com/stetsmando/simple-cache) page and submit comments, issues, pulls and whatever else you'd like. I plan on adding features as I need them for my own projects so if something isn't happening fast enough for you why not do it yourself? :wink:

## Installation
```bash
npm i @stetsonpierce/simple-cache
```

## Usage
### Via **Script Tag**
```html
<--! index.hmtl -->
<script src="<CDN_LINK>"></script>
<script>
  const cache = new SimpleCache.default();
  cache.set('someKey', 'someValue');
  console.log(cache.get('someKey')); // Logs 'someValue'
  cache.remove('someKey');
  console.log(cache.get('someKey')); // Logs null
</script>
```
### Via **JavaScript Module**
```javascript
// Can be used as an ES6 Module
import SimpleCache from '@stetsonpierce/simple-cache';

// Or a CommonJS Module
const SimpleCache = require('@stetsonpierce/simple-cache');

const cache = new SimpleCache();

cache.set('someKey', 'someValue');
console.log(cache.get('someKey')); // Logs 'someValue'
cache.remove('someKey');
console.log(cache.get('someKey')); // Logs null
```

## Creation
### **SimpleCache([options])**
* **Arguments:**
  * `{ Object } [options]`
    * `{ number } ttl`
    * `{ string } namespace`
    * `{ boolean } logMessages`
* **Returns:** `SimpleCache Instance`

### **ttl**
* **Type:** `number`
* **Default:** `1000 * 60 * 60 * 24 | (24 Hours)`
* **Details:** Defines the global default for caching time in milliseconds, can be overridden. See [overriding ttl](#) for more info.

### **namespace**
* **Type:** `string`
* **Default:** `SC_`
* **Details:** Defines the global namespace prefix for all cached items.

### **logMessages**
* **Type:** `boolean`
* **Default:** `false`
* **Details:** Enables verbose logging for all operations. Very useful for debugging. See [debugging](#) for more info.

### Example:
```javascript
const cache = new SimpleCache({
  ttl: 1000 * 30, // 30 seconds
  namespace: 'MYAPP_',
  logMessages: true,
});
```

## Docs
Built on top of the [Window.localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) and [Window.sessionStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage) APIs, `SimpleCache.js` was a solution developed to provide an expiring semi-persistent data store for modern browsers. Originally it only supported LocalStorage, but has been re-written to support session storage as well.

### **cache.set(key, value, [session])**
* **Arguments:**
  * `{ string } key`
  * `{ string | Object } value`
  * `{ boolean } [session]`
* **Description:**

`cache.set` is used to store values in either local or session storage. The default storage location is local storage. To indicate **session storage** as the desired data store just pass `true` for the session parameter. Values provided can be anything that can be serialized in a JSON structure, this includes `strings`, `booleans`, `Objects`, etc. 

_NOTE: All operations provided by SimpleCache can be called in bulk, see [bulk operations](#) for more info._

* **Example:**
```javascript
  cache.set('myString', 'myValue');
  cache.set('myObject', { isCool: true });
  cache.set('myBool', true);
```

### **cache.get(key)**

* **Arguments:**
  * `{ string } key`
* **Returns:**
  * `{ string | boolean | Object } value`
* **Description:**

`cache.get` provides a uniform way to retrieve any value that has been stored by SimpleCache. The values are stringified so they will be accessible as JavaScript objects after you retrieve them. Get provides waterfall logic for retrieval. Meaning that it will check **session storage** first and then check **local storage** if nothing is found. The reasoning behind this priority is that session storage values are lost after each browser session so it makes the most sense that they're the most important as they are  relevant for a shorter period of time.

_NOTE: All operations provided by SimpleCache can be called in bulk, see [bulk operations](#) for more info._

* **Example:**
```javascript
  const myString = cache.get('myString');
  console.log(myString); // Prints 'myValue'

  const myObject = cache.get('myObject');
  console.log(myObject.isCool); // Prints true

  const myBool = cache.get('myBool');
  if (myBool) {
    console.log(myBool); // Prints true
  }
```

### **cache.remove(key)**

* **Arguments:**
  * `{ string } key`
* **Description:**

`cache.remove` will remove a cached value from both **session storage** and **local storage**.

_NOTE: All operations provided by SimpleCache can be called in bulk, see [bulk operations](#) for more info._

* **Example:**
```javascript
  cache.remove('myString');

  console.log(cache.get('myString')); // Prints null
```

## Bulk Operations