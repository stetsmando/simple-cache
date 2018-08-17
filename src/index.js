import setItem from './operations/set_item'
import getItem from './operations/get_item'
import removeItem from './operations/remove_item'
import Item from './util/item'
import Logger from './util/logger'

import session from './storage/session_storage'
import local from './storage/local_storage'

export default class SimpleCache {
  constructor (opts = {}) {
    this.ttl = opts.ttl
      ? opts.ttl
      : 1000 * 60 * 60 * 24 // 24 hour default
    this.namespace = opts.namespace
      ? opts.namespace
      : 'SimpleCache:'
    this.log = Logger.create({
      debug: opts.debug,
      key: this.namespace
    })
    this.buildItem = Item.create(this.ttl, this.log).build
  }

  set (...args) {
    if (typeof args[0] === 'string') {
      // Single Set
      let store = null

      if (args[2]) {
        // We're using Session Storage
        this.log(`Storing in Session`)
        store = session
      } else {
        // We're using Local Storage
        this.log(`Storing in Local`)
        store = local
      }

      return setItem.single({
        key: `${this.namespace}${args[0]}`,
        value: this.buildItem(args[1]),
        store,
        log: this.log
      })
    } else if (Array.isArray(args[0])) {
      // Multi Set
      const values = args[0].map(({ key, value }) => {
        return {
          key: `${this.namespace}${key}`,
          value: this.buildItem(value)
        }
      })
      let store = null

      if (args[1]) {
        // We're using session storage
        this.log(`Storing in Session`)
        store = session
      } else {
        this.log(`Storing in Local`)
        store = local
      }

      return setItem.multi({
        namespace: this.namespace,
        values,
        store,
        log: this.log
      })
    }
  }

  get (...args) {
    // NOTE: I don't love this but I need to pass in the stores
    // explicitly. I'll come back and do this is a cleaner way.
    if (typeof args[0] === 'string') {
      // Single Retrieval
      return getItem.single({
        key: `${this.namespace}${args[0]}`,
        local,
        session,
        log: this.log
      })
    } else if (Array.isArray(args[0])) {
      // Multi Removal
      const keys = args[0].map(key => `${this.namespace}${key}`)

      return getItem.multi({
        keys,
        local,
        session,
        log: this.log
      })
    }
  }

  remove (...args) {
    const stores = [ session, local ]

    if (typeof args[0] === 'string') {
      // Single Removal
      return removeItem.single({
        key: `${this.namespace}${args[0]}`,
        stores,
        log: this.log
      })
    } else if (Array.isArray(args[0])) {
      // Multi Removal
      const keys = args[0].map(key => `${this.namespace}${key}`)

      return removeItem.multi({
        keys,
        stores,
        log: this.log
      })
    }
  }
}
