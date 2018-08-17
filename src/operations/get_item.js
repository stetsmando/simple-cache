export default {
  // NOTE: SimpleCache will use waterfall checks to find values
  // Session storage is more fragile so it will be checked first
  single: function ({ key, local, session, log }) {
    log(`Get Single`)
    log(`Key ${key}`)

    return this._waterfallLogic({ key, local, session, log })
  },
  multi: function ({ keys, local, session, log }) {
    log(`Get Multi`)
    const promises = []
    keys.forEach(key =>
      promises.push(new Promise(resolve => {
        resolve(this._waterfallLogic({ key, local, session, log }))
      }))
    )
    return Promise.all(promises)
  },
  _waterfallLogic: function ({ key, local, session, log }) {
    // TODO: Come back and clean this function up
    log(`Checking session...`)
    let foundIn = 'session'
    let item = session.get(key)
    if (!item) {
      log(`Checking local...`)
      foundIn = 'local'
      item = local.get(key)
      if (!item) {
        log(`Nothing Found`)
        return null
      }
    }

    log(`Item Found`)
    item = JSON.parse(item)

    if (Date.now() >= item.ttl) {
      log(`Item Expired`)

      if (foundIn === 'session') {
        // Retry in local
        log(`Removing session cache`)
        session.remove(key)
        log(`Checking local...`)
        item = local.get(key)
        if (!item) {
          log(`Nothing Found`)
          return null
        }

        log(`Item Found`)
        item = JSON.parse(item)

        if (Date.now() >= item.ttl) {
          log(`Item Expired`)
          log(`Removing local cache`)
          local.remove(key)
          return null
        }
      } else {
        log(`Removing local cache`)
        local.remove(key)
        return null
      }
    }

    return item.value
  }
}
