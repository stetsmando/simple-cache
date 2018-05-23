const SimpleCache = require('./dist/simple-cache.js');
console.log(SimpleCache);
const cache = new SimpleCache();

cache.set('key', 'value');
cache.set('key', { key: 'value' });

cache.set('key', 'value', false);
cache.set('key', { key: 'value' }, false);

cache.set('key', 'value', true);
cache.set('key', { key: 'value' }, true);

cache.set([{
  key: 'key',
  value: 'value',
}, {
  key: 'key2',
  value: 'value2',
}]);

cache.set([{
  key: 'key',
  value: 'value',
}, {
  key: 'key2',
  value: 'value2',
}], false);

cache.set([{
  key: 'key',
  value: 'value',
}, {
  key: 'key2',
  value: 'value2',
}], false);