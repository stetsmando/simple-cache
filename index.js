export default class SimpleCache {
  constructor({
    defaultTtl = 1000 * 60 * 60 * 24, // 24 hour default
    namespace = 'SC_',
  }) {
    this.defaultTtl = defaultTtl;
    this.namespace = namespace;
  }
  get(key) {
    let item = localStorage.getItem(`${ this.namespace }${ key }`);
    if (!item)
      return null;

    item = JSON.parse(item);
    if (Date.now() >= item.ttl)
      return null;

    return item.value;
  }

  cache(key, value, expiresIn) {
    let ttl = expiresIn;

    ttl = !ttl || ttl.constructor !== Date ?
      new Date(Date.now() + this.defaultTtl).valueOf() :
      expiresIn.valueOf();

    const item = { value, ttl };
    // console.log(`--CACHING--\nKEY: sc_${ key }\nVALUE: ${ JSON.stringify(item, null, 2) }`);
    localStorage.setItem(`${ this.namespace }${ key }`, JSON.stringify(item));
  }

  bust(key) {
    // console.log(`Bust cache for:sc_${ key }`);
    localStorage.removeItem(`${ this.namespace }${ key }`);
  }
}
