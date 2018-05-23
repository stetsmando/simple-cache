export default class SessionStorage {
  constructor() {
    this.isNode = typeof window === 'undefined';
  }
}
