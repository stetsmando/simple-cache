import LocalStorage from './lib/LocalStorage';
import SessionStorage from './lib/SessionStorage';

const local = new LocalStorage();
const session = new SessionStorage();

export default class SimpleCache {
  constructor(ttl, namespace, logMessages) {
    this.ttl = ttl || 1000 * 60 * 60 * 24 // 24 hours
    this.namespace = namespace || 'SC_';
    this.logMessages = logMessages || false;
  }

  set(...args) {
    console.log(`Setting...`);
    if (typeof args[0] == 'string') {
      // Single Input
      if (args[2]) {
        // We're using Session Storage
        console.log(`Session - Caching: ${ args[0] }: ${ args[1] }`);
      }
      else {
        // We're using Local Storage
        let ttl = this.ttl;
        if (args[1].ttl) {
          ttl = args[1].ttl;
          delete args[1].ttl;
        }

        const item = { value: args[1], ttl };
        local.set(`${ this.namespace }${ args[0] }`, JSON.stringify(item));
      }
    }
    else if (Array.isArray(args[0])) {
      debugger;
      // Bulk operation
      if (args[1]) {
        // We're using Session Storage
        
      }
      else {
        // We're using Local Storage
        debugger;
        args[0].forEach(obj => {
          let ttl = this.ttl;
          if (obj.value.ttl) {
            ttl = obj.value.ttl;
            delete obj.value.ttl;
          }

          const item = { value: obj.value, ttl };
          local.set(`${ this.namespace }${ obj.key }`, JSON.stringify(item));
        });
      }
    }
  }

  get(...args) {
    if (typeof args[0] == 'string') {
      // Single Retrieval
      let item = local.get(`${ this.namespace }${ args[0] }`);
      if (!item)
        return null;

      item = JSON.parse(item);
      if (Date.now() >= item.ttl) {
        // Item has expired
        local.remove(`${ this.namespace }${ args[0] }`);
        return null;
      }

      return item.value;
    }
    else if (Array.isArray(args[0])) {
      // Multi Retrieval
    }
  }
  // setInStone(...args) {}
  // remove(...args) {}
}
