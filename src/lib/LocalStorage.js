export default class LocalStorage {
  set(key, value) {
    localStorage.setItem(key, value);
  }

  get(key) {
    debugger;
    localStorage.getItem(key);
  }

  remove(key) {
    localStorage.removeItem(key);
  }
}
