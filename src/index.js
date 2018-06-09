// Local storage systems are sync: https://stackoverflow.com/a/20231329

function SimpleCache({
  ttl = 1000 * 60 * 60 * 24, // 24 hours in ms
  namespace = 'SimpleCache_',
  store = localStorage,
  debug = false,
}) {
  Object.assign(this, { ttl, namespace, store, debug })

  this._log = msg => {
    this.debug && console.debug(msg)
  }

  this.set = (key, value, store = this.store, ttl) => {
    // Allow ttl in third position if using default store
    if (Number.isInteger(store)) {
      ttl = store
      store = this.store
    }
    if (Array.isArray(key)) {
      this._log('Array detected. Bulk set')
      key.forEach(keyValuePair => {
        if (Array.isArray(keyValuePair)) {
          const [k, v] = keyValuePair
          this._setWithTimestampAndNamespace(k, v, store, ttl)
        } else {
          const { k, v } = keyValuePair
          this._setWithTimestampAndNamespace(k, v, store, ttl)
        }
      })
    } else {
      this._setWithTimestampAndNamespace(key, value, store, ttl)
    }

    // Automatically delete the item after the ttl, if the current state is still available
    setTimeout(this.remove.bind(key, store), ttl)
  }

  this._setWithTimestampAndNamespace = (key, value, store, ttl) => {
    const timestampedValue = this._addExpirationToValue(value, ttl)
    this._log(
      `Storing value: [${this.namespace}${key}, ${JSON.stringify(
        timestampedValue
      )}]`
    )
    store.setItem(`${this.namespace}${key}`, JSON.stringify(timestampedValue))
  }

  this.get = (key, store = this.store) => {
    if (Array.isArray(key)) {
      this._log('Array detected. Bulk get')
      return key.map(k => this._getWithNamespace(k, store))
    } else {
      return this._getWithNamespace(key, store)
    }
  }

  this._getWithNamespace = (key, store) => {
    this._log(`Retrieving key: ${this.namespace}${key}`)
    const returnValue = this._handleRetrievedEntry(
      store.getItem(`${this.namespace}${key}`)
    )
    this._removeWithNamepace(key, store)
    return returnValue
  }

  this._handleRetrievedEntry = value => {
    if (value === null) {
      this._log('Value has expired or does not exist')
      return null
    }
    const parsedValue = JSON.parse(value)
    if (parsedValue.ttl < Date.now()) {
      this._log('Value has expired')
      return null
    }
    return parsedValue.value
  }

  this.remove = (key, store = this.store) => {
    if (Array.isArray(key)) {
      this._log('Array detected. Bulk remove')
      return key.forEach(k => this._removeWithNamepace(k, store))
    } else {
      return this._removeWithNamepace(key, store)
    }
  }

  this._removeWithNamepace = (key, store) => {
    this._log(`Removing key: ${this.namespace}${key}`)
    return store.removeItem(`${this.namespace}${key}`)
  }

  this._addExpirationToValue = (value, customTTL) => {
    return {
      value,
      ttl: (customTTL || this.ttl) + Date.now(),
    }
  }
}

module.exports = SimpleCache
