const { Denkovi: datnetip } = require("./dist/datnetip");
const { Denkovi: smartden } = require("./dist/smartden");

class Denkovi {
  #ip;
  #password;
  #user;
  #port;
  #model;
  #denkovi;
  constructor(options) {
    this.#ip = options.ip;
    this.#port = options.port;
    this.#password = options.password;
    this.#user = options.user;
    this.#model = options.model.toLowerCase();
    if (this.#model === 'datnetip') {
      this.#denkovi = new datnetip({ ip: this.#ip, port: this.#port, password: this.#password });
    } else if (this.#model === 'smartden') {
      this.#denkovi = new smartden({ ip: this.#ip, port: this.#port, password: this.#password });
    } else {
      throw new Error("Invalid model specified");
    }
  }

  async getStates() {
    return this.#denkovi.getStates();
  }
  async getState(out) {
    return this.#denkovi.getState(out);
  }
  async setState(out, value) {
    return this.#denkovi.setState(out, value);
  }
}

exports.Denkovi = Denkovi;
