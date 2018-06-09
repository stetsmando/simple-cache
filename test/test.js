const assert = require('assert')
const { LocalStorage } = require('node-localstorage')
const SimpleCache = require('../src')

const localStorage = new LocalStorage('../test_store')

const cache = new SimpleCache({
  debug: true,
  store: localStorage,
})

describe('SimpleCache test suite', () => {
  describe('Internal function testing', () => {
    it('Builds timestamped object correctly', () => {
      const value = { key: 'string value' }
      const result = cache._addExpirationToValue(value)
      assert.deepEqual(result.value, value)
      assert.ok(new Date(result.ttl).valueOf() > Date.now())
    })

    it('Evaluates retrieved item correctly', () => {
      const expired = JSON.stringify({ ttl: Date.now() - 1 })
      const valid = JSON.stringify({ value: 'value', ttl: Date.now() + 1000 })

      assert.equal(null, cache._handleRetrievedEntry(null))
      assert.equal(null, cache._handleRetrievedEntry(expired))
      assert.equal('value', cache._handleRetrievedEntry(valid))
    })

    it('Expires items automatically', done => {
      cache.set('key', 'value', 5)
      setTimeout(() => {
        assert.strictEqual(cache.get('key'), null)
        done()
      }, 10)
    })
  })

  describe('API testing', () => {
    it('Sets item appropriately', () => {
      cache.set('key', 'value')
      const cacheEntry = JSON.parse(localStorage.getItem('SimpleCache_key'))
      assert.equal(cacheEntry.value, 'value')
    })

    it('Gets set item correctly', () => {
      const value = cache.get('key')
      assert.equal(value, 'value')
    })

    it('Clears items after retrieval', () => {
      assert.equal(null, cache.get('key'))
    })

    it('Allows removal of item', () => {
      cache.set('key', 'value')
      cache.remove('key')
      assert.equal(null, cache.get('key'))
    })

    it('Allows custom ttl', () => {
      cache.set('key', 'value', 1000)
      const cacheEntry = JSON.parse(localStorage.getItem('SimpleCache_key'))
      assert.ok(cacheEntry.ttl - Date.now() <= 1000)
    })
  })
})
