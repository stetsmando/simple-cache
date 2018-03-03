export default class SimpleCache {
  constructor({
    defaultTTL = 1000 * 60 * 60 * 24, // 24 hour default
    namespace = 'SC_',
    logMessages = false, // No logging by default
  }) {
    this.defaultTTL = defaultTTL;
    this.namespace = namespace;
    this.logMessages = logMessages;
  }
  get(key) {
    if (this.logMessages) {
      console.log(`SC:Looking up cache for key:${this.namespace }${ key }`);
    }
    let item = localStorage.getItem(`${ this.namespace }${ key }`);
    if (!item) {
      if (this.logMessages) {
        console.log('SC:No item found');
      }
      return null;
    }

    item = JSON.parse(item);
    if (Date.now() >= item.ttl) {
      if (this.logMessages) {
        console.log('SC:Item expired, returning null');
      }
      localStorage.removeItem(`${ this.namespace }${ key }`);

      return null;
    }

    if (this.logMessages) {
      console.log(`SC:Cached Value\nKEY:${ this.namespace }${ key }\nVALUE:${ JSON.stringify(item, null, 2) }`);
    }
    return item.value;
  }

  cache(key, value, expiresIn) {
    let ttl = expiresIn;

    ttl = !ttl || ttl.constructor !== Date ?
      new Date(Date.now() + this.defaultTTL).valueOf() :
      expiresIn.valueOf();

    const item = { value, ttl };
    if (this.logMessages) {
      console.log(`SC:Caching\nKEY: ${ this.namespace }${ key }\nVALUE: ${ JSON.stringify(item, null, 2) }`);
    }
    localStorage.setItem(`${ this.namespace }${ key }`, JSON.stringify(item));
  }

  bust(key) {
    if (this.logMessages) {
      console.log(`SC:Bust cache for:${ this.namespace }${ key }`);
    }
    localStorage.removeItem(`${ this.namespace }${ key }`);
  }
}
