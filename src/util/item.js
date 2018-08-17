export default {
  create: (defaultTTL, log) => {
    log(`Init defaultTTL: ${defaultTTL}`)
    return {
      build: (value) => {
        if (value.ttl) {
          log(`Using provided ttl: ${value.ttl}`)
          let ttl = value.ttl
          delete value.ttl

          return { value: value, ttl }
        }

        let ttl = Date.now() + defaultTTL
        log(`Setting ttl: ${ttl}`)

        return { value, ttl }
      }
    }
  }
}
