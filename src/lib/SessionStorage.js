export default class SessionStorage {
  set(key, value) {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  get(key) {
    return sessionStorage.getItem(key);
  }

  remove(key) {
    sessionStorage.removeItem(key);
  }
}
