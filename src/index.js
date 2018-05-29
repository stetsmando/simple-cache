import LocalStorage from './lib/LocalStorage';
import SessionStorage from './lib/SessionStorage';
import Logger from './lib/Logger';

const local = new LocalStorage();
const session = new SessionStorage();

export default class SimpleCache {
  constructor(ttl, namespace, logMessages) {
    this.ttl = ttl || 1000 * 60 * 60 * 24 // 24 hours
    this.namespace = namespace || 'SC_';
    this.logger = new Logger(logMessages);
  }

  async set(...args) {
    if (typeof args[0] == 'string') {
      // Single Input
      const key = `${ this.namespace }${ args[0] }`;
      
      this.logger.log(`SC:Set Single`);
      this.logger.log(`SC:Key ${ key }`);

      if (args[2]) {
        // We're using Session Storage
        if (this.logMessages) { console.log(`SC:Storing in Session`) }
        const item = this.buildItem(args[1]);
        if (this.logMessages) { console.log(`SC:Item ${ JSON.stringify(item) }`) }
        session.set(key, item);
      }
      else {
        // We're using Local Storage
        if (this.logMessages) { console.log(`SC:Storing in Local`) }
        const item = this.buildItem(args[1]);
        if (this.logMessages) { console.log(`SC:Item ${ JSON.stringify(item) }`) }
        local.set(key, item);
      }
    }
    else if (Array.isArray(args[0])) {
      // Bulk operation
      if (this.logMessages) { console.log(`SC:Set Multi`) }

      if (args[1]) {
        // We're using Session Storage
        if (this.logMessages) { console.log(`SC:Storing in Session`) }
        if (this.logMessages) { console.log(`SC:Values ${ args[0] }`) }
        const promises = [];

        args[0].forEach(obj => {
          promises.push(new Promise((resolve, reject) => {
            const key = `${ this.namespace }${ obj.key }`;
            const item = this.buildItem(obj);
            if (this.logMessages) { console.log(`SC:Item ${ JSON.stringify(item) }`) }
            session.set(key, item);
            resolve();
          }));
        });

        if (this.logMessages) { console.log(`SC:All Promises Created`) }
        return Promise.all(promises);
      }
      else {
        // We're using Local Storage
        if (this.logMessages) { console.log(`SC:Storing in Local`) }
        const promises = [];

        args[0].forEach(obj => {
          promises.push(new Promise((resolve, reject) => {
            const key = `${ this.namespace }${ obj.key }`;
            const item = this.buildItem(obj);
            local.set(key, item);
            resolve();
          }));
        });

        return Promise.all(promises);
      }
    }
  }

  async get(...args) {
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
      const promises = [];

      args[0].forEach(key => {
        promises.push(new Promise((resolve, reject) => {
          let item = local.get(`${ this.namespace }${ key }`);
          if (!item)
            return resolve(null);

          item = JSON.parse(item);
          if (Date.now() >= item.ttl) {
            // Item has expired
            local.remove(`${ this.namespace }${ key }`);
            return resolve(null);
          }

          return resolve(item.value);
        }));
      });

      return await Promise.all(promises);
    }
  }

  async remove(...args) {
    if (typeof args[0] == 'string') {
      // Single Removal
      local.remove(`${ this.namespace }${ args[0] }`);
    }
    else if (Array.isArray(args[0])) {
      // Multi Removal
      const promises = [];

      args[0].forEach(key => {
        promises.push(new Promise((resolve, reject) => {
          local.remove(`${ this.namespace }${ key }`);
          resolve();
        }));
      });

      return await Promise.all(promises);
    }
  }

  buildItem(obj) {
    let ttl = this.ttl;
    if (obj.ttl) {
      ttl = obj.ttl;
      delete obj.ttl;
    }

    ttl += Date.now();

    return { value: obj, ttl };
  }
}
