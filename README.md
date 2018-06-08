# Simple Cache
> A fast, simple and lightweight expiring key value store for modern browsers.

![Version](https://img.shields.io/badge/Version-2.X-brightgreen.svg) [![](https://data.jsdelivr.com/v1/package/npm/@stetsonpierce/simple-cache/badge)](https://www.jsdelivr.com/package/npm/@stetsonpierce/simple-cache)

Question or comments please feel free to open an [issue](https://github.com/stetsmando/simple-cache/issues) or email me at me@stetson.io. You can also visit the simple-cache [website](https://simple-cache.herokuapp.com/).

## About
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
<!-- Regular -->
<script src="https://cdn.jsdelivr.net/npm/@stetsonpierce/simple-cache/lib/simple-cache.js"></script>

<!-- Or Minified -->
<script src="https://cdn.jsdelivr.net/npm/@stetsonpierce/simple-cache/lib/simple-cache.min.js"></script>
```

## Usage
### Via **Script Tag**
```html
<--! index.hmtl -->
<script src="https://cdn.jsdelivr.net/npm/@stetsonpierce/simple-cache/lib/simple-cache.min.js"></script>

<script>
  const cache = new SimpleCache.default();
  cache.set('someKey', 'someValue');
  console.log(await cache.get('someKey')); // Logs 'someValue'
  cache.remove('someKey');
  console.log(await cache.get('someKey')); // Logs null
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
console.log(await cache.get('someKey')); // Logs 'someValue'
cache.remove('someKey');
console.log(await cache.get('someKey')); // Logs null
```

## Creation
### **SimpleCache([options])**
* **Arguments:**
  * `{ Object } [options]`
    * `{ number } ttl`
    * `{ string } namespace`
    * `{ boolean } logMessages`
* **Returns:** `SimpleCache Instance`

#### **`ttl`**
* **Type:** `number`
* **Default:** `1000 * 60 * 60 * 24 | (24 Hours)`
* **Details:** Defines the global default for caching time in milliseconds, can be overridden per item. See [overriding ttl](https://github.com/stetsmando/simple-cache/tree/master#overriding-ttl) for more info.

#### **`namespace`**
* **Type:** `string`
* **Default:** `SC_`
* **Details:** Defines the global namespace prefix for all cached items.

#### **`logMessages`**
* **Type:** `boolean`
* **Default:** `false`
* **Details:** Enables verbose logging for all operations. Very useful for debugging. See [debugging](https://github.com/stetsmando/simple-cache/tree/master#debugging) for more info.

### Example:
```javascript
const cache = new SimpleCache({
  ttl: 1000 * 30, // 30 seconds
  namespace: 'MYAPP_',
  logMessages: true,
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

_NOTE: All operations provided by SimpleCache can be called in bulk, see [bulk operations](https://github.com/stetsmando/simple-cache/tree/master#bulk-operations) for more info._

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

_NOTE: All operations provided by SimpleCache can be called in bulk, see [bulk operations](https://github.com/stetsmando/simple-cache/tree/master#bulk-operations) for more info._

* **Example:**
```javascript
  const myString = await cache.get('myString');
  console.log(myString); // Prints 'myValue'

  const myObject = await cache.get('myObject');
  console.log(myObject.isCool); // Prints true

  const myBool = await cache.get('myBool');
  if (myBool) {
    console.log(myBool); // Prints true
  }
```

### **cache.remove(key)**

* **Arguments:**
  * `{ string } key`
* **Description:**

`cache.remove` will remove a cached value from both **session storage** and **local storage**.

_NOTE: All operations provided by SimpleCache can be called in bulk, see [bulk operations](https://github.com/stetsmando/simple-cache/tree/master#bulk-operations) for more info._

* **Example:**
```javascript
  cache.remove('myString');

  console.log(await cache.get('myString')); // Prints null
```

## Bulk Operations
`cache.set`, `cache.get` and `cache.remove` have all been written to support bulk operations in addition to single input. This is accomplished by passing an array of values rather than a single input.

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
  cache.set([
    { key: 'myString1', value: 'value1' },
    { key: 'myString2', value: 'value2' },
    { key: 'myString3', value: 'value3' },
  ]);

  console.log(await cache.get('myString2')); // Prints 'value2'
```

### **cache.get(keys)**

* **Arguments:**
  * `{ Array<string> } keys`
* **Returns:**
  * `{ Array<any> } values`
* **Description:**

`cache.get` requires an array of strings that correlate to keys being requested. The bulk operations follow the same [waterfall](https://github.com/stetsmando/simple-cache/tree/master#waterfall) logic that the singular operation does.

* **Example:**
```javascript
  cache.set([
    { key: 'myString1', value: 'value1' },
    { key: 'myString2', value: 'value2' },
    { key: 'myString3', value: 'value3' },
  ]);

  const values = await cache.get(['myString1', 'myString5', 'myString3']);
  // Returns ['value1', null, 'value3']

```

### **cache.remove(keys)**

* **Arguments:**
  * `{ Array<string> } keys`
* **Description:**

`cache.remove` requires an array of strings that correlate to keys being requested. It will then remove that cached value from both **session storage** and **local storage**.

* **Example:**
```javascript
  cache.set([
    { key: 'myString1', value: 'value1' },
    { key: 'myString2', value: 'value2' },
    { key: 'myString3', value: 'value3' },
  ]);

  await cache.remove(['myString1', 'myString2', 'myString3']);

  const values = await cache.get(['myString1', 'myString2', 'myString3']);
  // Returns [null, null, null]
```

## Overriding TTL
Short for **_Time To Live_**, ttl specifies how long to respect a cached value before determining it has expired. While SimpleCache gives you the [global ttl](https://github.com/stetsmando/simple-cache/tree/master#ttl) as a default for all items being cached, it also gives you the ability to specify a ttl on a per item basis. However, this only works if you pass an `Object` into set that has a `ttl` property.

**Example:**
```javascript
  const myObject = {
    value: 'Some string goes here!',
    ttl: 5000, // 5 Seconds
  };
  cache.set('myKey', myObject);

  // After 2 Seconds the value will still be available
  setTimeout(() => {
    cache.get('myKey')
      .then(someValue => {
        console.log(someValue); // Prints { value: 'Some string goes here!' }
      });
  }, 2000);

  // 
  setTimeout(() => {
    cache.get('myKey')
      .then(someValue => {
        console.log(someValue); //Prints null
      });
  }, 6000);
```

## Waterfall

When retrieving values SimpleCache uses waterfall logic when attempting to find stored values. Meaning **session storage** is checked first, followed by **local storage** if nothing is found. Since **session storage** is more fragile it is respected as the highest priority for cached items.

## Debugging

SimpleCache has very verbose logging if you need to figure out why something isn't working the way you'd expect. Just pass `logMessages: true` to enable this.

**Example:**
```javascript
import SimpleCache from '@stetsonpierce/simple-cache';

const cache = new SimpleCache({
  logMessage: true,
});

cache.set('myKey', 'myValue');
```
```bash
# Example Output
15:18:03.550 SC: Set Single
15:18:03.550 SC: Key SC_myKey
15:18:03.550 SC: Storing in Local
15:18:03.551 SC: Item {"value":"myValue","ttl":1528492683550}
```