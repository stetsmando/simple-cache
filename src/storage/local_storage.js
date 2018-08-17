/* eslint no-undef: 0 */

export default {
  set: (key, value) => localStorage.setItem(key, JSON.stringify(value)),
  get: key => localStorage.getItem(key),
  remove: key => localStorage.removeItem(key)
}
