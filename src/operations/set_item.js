export default {
  single: ({ key, value, store, log }) => {
    log(`Set Single`)
    log(`"${key}":${JSON.stringify(value)}`)
    store.set(key, value)

    return { key, value }
  },
  multi: ({ values, store, log }) => {
    log(`Set Multi`)
    const promises = []
    values.forEach(({ key, value }) => {
      promises.push(new Promise((resolve, reject) => {
        log(`"${key}": ${JSON.stringify(value)}`)
        store.set(key, value)
        resolve({ key, value })
      }))
    })

    return Promise.all(promises)
  }
}
