# Simple Cache
> A fast, simple and lightweight key value store for modern browsers.

Question or comments please feel free to open an [issue](https://github.com/stetsmando/simple-cache/issues) or email me at stetsmando@gmail.com

## Want to Contribute or Help Out?
Feel free to head over to the [GitHut](https://github.com/stetsmando/simple-cache) page and submit comments, issues, pulls and whatever else you'd like. I plan on adding features as I need them for my own projects so if something isn't happening fast enough for you why not do it yourself? :wink:

## Installation
```bash
# NPM 5+
npm install @stetsonpierce/simple-cache

# Older NPM versions
npm install @stetsonpierce/simple-cache --save
```

## Simple Example
```javascript
// Import the package (Compiled Frameworks)
import SimpleCache from '@stetsonpierce/simple-cache';

// Create a new instance
const simpleCache = new SimpleCache({
  defaultTTL: 1000 * 60 * 60 * 24,
  namespace: 'MYAPP_',
  logMessages: true,
});

/** Quick aside about provided properties:
* defaultTTL defines a number in milliseconds into the future that cached
* objects should persist.
*
* namespace defines the prefix to all keys provided. This helps ensure
* you won't run into collision issues.
*
* logMessages is a simple flag to determine if console messages should be printed or not.
*/ 

// Create an object that we'd like to store in our cache
const myObject = { someProp: 'Bingo', somethingElse: 1 };
// Also create a string we'd like to store
const myString = 'Dingo';
// And an array as well
const myArray = ['1', 2, { a: 3 }];

// Store all the things!
simpleCache.cache('myObject', myObject);
simpleCache.cache('myString', myString);
simpleCache.cache('myArray', myArray);

// Now retrieve them
console.log(simpleCache.get('myObject')); // Prints { someProp: 'Bingo', somethingElse: 1 }
console.log(simpleCache.get('myString')); // Prints 'Dingo'
console.log(simpleCache.get('myArray')); // Prints ['1', 2, { a: 3 }]

// Now bust a cache before the expire time runs out
simpleCache.bust('myObject');

// Now try and retrieve it
simpleCache.get('myObject') // Prints null
```

__Something worth considering is that I'm using this with a front end framework, specifically Vue.js. Because of this all my code is being transpiled down to something that most browsers can understand. If you're using wanting to use this without having to build/bundle, you can get the latest release compiled and or minified [here](https://github.com/stetsmando/simple-cache/tree/master/lib).__