export default {
  create: ({ debug, key = '' } = {}) => {
    return !debug ? () => {} : (msg) => {
      console.log(`${key}${msg}`)
    }
  }
}
