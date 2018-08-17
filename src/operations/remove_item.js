export default {
  single: ({ key, stores, log }) => {
    log(`Remove Single`)
    log(`"${key}"`)
    stores.forEach(store => store.remove(key))

    return { key }
  },
  multi: ({ keys, stores, log }) => {
    log(`Remove Multi`)
    const promises = []
    keys.forEach(key => {
      promises.push(new Promise(resolve => {
        log(`"${key}"`)
        stores.forEach(store => store.remove(key))
        resolve(key)
      }))
    })

    return Promise.all(promises)
  }
}
