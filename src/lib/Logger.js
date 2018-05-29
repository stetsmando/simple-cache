export default class Logger {
  constructor(isActive) {
    this.isActive = isActive || false;
    this.key = 'SC:';
  }

  log(msg) {
    if (this.isActive) { console.log(`${ this.key }msg`) }
  }
}