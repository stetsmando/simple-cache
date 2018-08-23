# Simple Cache
> A fast, simple and lightweight expiring key value store for modern browsers.

![Version](https://img.shields.io/badge/Version-3.X-brightgreen.svg) [![](https://data.jsdelivr.com/v1/package/npm/@stetsonpierce/simple-cache/badge)](https://www.jsdelivr.com/package/npm/@stetsonpierce/simple-cache)

Question or comments please feel free to open an [issue](https://github.com/stetsmando/simple-cache/issues) or email me at me@stetson.io. You can also visit the simple-cache [website](https://simple-cache.herokuapp.com/).

## About

_**NOTE:**_ SimpleCache follows [semver](https://semver.org/) versioning and is under active development.

Built on top of the [Window.localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) and [Window.sessionStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage) APIs, `SimpleCache.js` was a solution developed to provide an expiring semi-persistent data store for modern browsers. I've written an [article](https://simple-cache.herokuapp.com/explain) explaining the how/why of SimpleCache if you're interested.

## Want to Contribute or Help Out?
Feel free to head over to the [GitHub](https://github.com/stetsmando/simple-cache) page and submit comments, issues, pulls and whatever else you'd like. I plan on adding features as I need them for my own projects so if something isn't happening fast enough for you why not do it yourself? :wink:

## Installation

### **NPM**
```bash
npm i @stetsonpierce/simple-cache
```

### **CDN**
```html
<!-- Minified -->
<script src="https://cdn.jsdelivr.net/npm/@stetsonpierce/simple-cache@3/dist/simple-cache.min.js"></script>
```

## Usage
### Via **Script Tag**
```html
<--! index.hmtl -->
<script src="https://cdn.jsdelivr.net/npm/@stetsonpierce/simple-cache@3/dist/simple-cache.min.js"></script>

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
    * `{ boolean } debug`
* **Returns:** `SimpleCache Instance`

#### **`ttl`**
* **Type:** `number`
* **Default:** `1000 * 60 * 60 * 24 | (24 Hours)`
* **Details:** Defines the global default for caching time in milliseconds, can be overridden per item. See [overriding ttl](#overriding-ttl) for more info.

#### **`namespace`**
* **Type:** `string`
* **Default:** `SC_`
* **Details:** Defines the global namespace prefix for all cached items.

#### **`debug`**
* **Type:** `boolean`
* **Default:** `false`
* **Details:** Enables verbose logging for all operations. See [debugging](#debugging) for more info.

### Example:
```javascript
const cache = new SimpleCache({
  ttl: 1000 * 30, // 30 seconds
  namespace: 'MYAPP_',
  debug: true,
});
```

## Docs
### **cache.set(key, value, [session])**
* **Arguments:**
  * `{ string } key`
  * `{ string | Object } value`
  * `{ boolean } [session]`
* **Description:**

`cache.set` is used to store values in either local or session storage. The default storage location is local storage. To indicate **session storage** as the desired data store just pass `true` for the session parameter. Values provided can be anything serializable via JSON.stringify, this includes `strings`, `booleans`, `Objects`, etc. 

_NOTE: All operations provided by SimpleCache can be called in bulk, see [bulk operations](#bulk-operations) for more info._

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

`cache.get` provides a uniform way to retrieve any value that has been stored by SimpleCache. The values are stringified so they will be accessible as JavaScript objects after you retrieve them. `cache.get` also provides waterfall logic for retrieval. Meaning **session storage** is checked first followed by **local storage** if nothing is found. Since **session storage** is more fragile it is respected as the highest priority for cached items.

_NOTE: All operations provided by SimpleCache can be called in bulk, see [bulk operations](#bulk-operations) for more info._

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

_NOTE: All operations provided by SimpleCache can be called in bulk, see [bulk operations](#bulk-operations) for more info._

* **Example:**
```javascript
  cache.remove('myString');

  console.log(cache.get('myString')); // Prints null
```

## Bulk Operations
`cache.set`, `cache.get` and `cache.remove` have all been written to support bulk operations in addition to single input. This is accomplished by passing an array of values rather than a single input. It's worth noting that all bulk operations will return a promise that you can chain or await.

### **cache.set(values, [session])**
* **Arguments:**
  * `{ Array<Object> } values`
    * `{ string } key`
    * `{ string | boolean | Object } value`
  * `{ boolean } [session]`
* **Description:**

`cache.set` requires an array of objects that contain the two properties **key** and **value**. The properties are fairly self-explanatory. **Key** is the string value to be used as the key and **value** will be the serializable value to be stored with the associated key.

* **Example:**
```javascript
  await cache.set([
    { key: 'myString1', value: 'value1' },
    { key: 'myString2', value: 'value2' },
    { key: 'myString3', value: 'value3' },
  ]);

  console.log(cache.get('myString2')); // Prints 'value2'
```

### **cache.get(keys)**

* **Arguments:**
  * `{ Array<string> } keys`
* **Returns:**
  * `{ Array<any> } values`
* **Description:**

`cache.get` requires an array of strings that correlate to keys being requested. The bulk operations follow the same [waterfall](#waterfall) logic that the singular operation does.

* **Example:**
```javascript
  await cache.set([
    { key: 'myString1', value: 'value1' },
    { key: 'myString2', value: 'value2' },
    { key: 'myString3', value: 'value3' },
  ]);

  const values = await cache.get(['myString1', 'myString5', 'myString3']);
  console.log(values)
  // Prints ['value1', null, 'value3']

```

### **cache.remove(keys)**

* **Arguments:**
  * `{ Array<string> } keys`
* **Description:**

`cache.remove` requires an array of strings that correlate to keys being requested. It will then remove that cached value from both **session storage** and **local storage**.

* **Example:**
```javascript
  await cache.set([
    { key: 'myString1', value: 'value1' },
    { key: 'myString2', value: 'value2' },
    { key: 'myString3', value: 'value3' },
  ]);

  await cache.remove(['myString1', 'myString2', 'myString3']);

  const values = await cache.get(['myString1', 'myString2', 'myString3']);
  console.log(values)
  // Prints [null, null, null]
```

## Overriding TTL
Short for **_Time To Live_**, ttl specifies how long to respect a cached value before determining it has expired. While SimpleCache gives you the [global ttl](#ttl) as a default for all items being cached, it also gives you the ability to specify a ttl on a per item basis. However, this only works if you pass an `Object` into set that has a `ttl` property. Currently you have to pass single item array if you want to set custom ttl for only one item.

**Example:**
```javascript
  const myObject = {
    value: 'Some string goes here!',
    ttl: 5000, // 5 Seconds
  };
  cache.set('myKey', myObject);

  // After 2 Seconds the value will still be available
  setTimeout(() => {
    console.log(cache.get('myKey')) // Prints { value: 'Some string goes here!' }
  }, 2000);

  // 
  setTimeout(() => {
    console.log(cache.get('myKey')) // Prints null
  }, 6000);
```

## Waterfall

When retrieving values SimpleCache uses waterfall logic when attempting to find stored values. Meaning **session storage** is checked first, followed by **local storage** if nothing is found. Since **session storage** is more fragile it is respected as the highest priority for cached items.

## Debugging

SimpleCache has very verbose logging if you need to figure out why something isn't working the way you'd expect. Just pass `debug: true` to enable this. SimpleCache uses either the default namespace, or the one you provided to prefix all log messages.

**Example:**
```javascript
import SimpleCache from '@stetsonpierce/simple-cache';

const cache = new SimpleCache({
  debug: true,
});

cache.set('myKey', 'myValue');
```
```bash
# Example Output
15:18:03.550 SimpleCache:Storing in Local
15:18:03.550 SimpleCache:Setting ttl: 1534577434218
15:18:03.550 SimpleCache:Set Single
15:18:03.551 SimpleCache:"SimpleCache:test":{"value":true,"ttl":1534577434218}
```

## Changelog

### v3.0
**Major Changes:**
* Fixed bug where setting bulk values wouldn't save in session storage
* logMessages prop renamed to debug
* All _single_ actions are now synchronous so you don’t have to await them
* All operations now return _some_ value

**Minor Changes:**
* Added tests with 100% coverage
* Refactored app to make it more maintainable, testable and approachable
