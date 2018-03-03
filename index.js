export default class SimpleCache {
  constructor({
    defaultTtl = 1000 * 60 * 60 * 24, // 24 hour default
    namespace = 'SC_',
    logMessages = false, // No logging by default
  }) {
    this.defaultTtl = defaultTtl;
    this.namespace = namespace;
  }
  get(key) {
    console.log(`SC:Looking up cache for key:${this.namespace }${ key }`);
    let item = localStorage.getItem(`${ this.namespace }${ key }`);
    if (!item) {
      console.log('SC:No item found');
      return null;
    }

    item = JSON.parse(item);
    if (Date.now() >= item.ttl) {
      console.log('SC:Item expired, returning null');
      return null;
    }

    console.log(`SC:Cached Value\nKEY:${ this.namespace }${ key }\nVALUE:${ JSON.stringify(item, null, 2) }`);
    return item.value;
  }

  cache(key, value, expiresIn) {
    let ttl = expiresIn;

    ttl = !ttl || ttl.constructor !== Date ?
      new Date(Date.now() + this.defaultTtl).valueOf() :
      expiresIn.valueOf();

    const item = { value, ttl };
    console.log(`SC:Caching\nKEY: ${ this.namespace }${ key }\nVALUE: ${ JSON.stringify(item, null, 2) }`);
    localStorage.setItem(`${ this.namespace }${ key }`, JSON.stringify(item));
  }

  bust(key) {
    console.log(`SC:Bust cache for:${ this.namespace }${ key }`);
    localStorage.removeItem(`${ this.namespace }${ key }`);
  }
}
