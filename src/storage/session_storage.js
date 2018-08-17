/* eslint no-undef: 0 */

export default {
  set: (key, value) => sessionStorage.setItem(key, JSON.stringify(value)),
  get: key => sessionStorage.getItem(key),
  remove: key => sessionStorage.removeItem(key)
}
