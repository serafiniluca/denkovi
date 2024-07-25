const { Denkovi: datnetip } = require("./dist/datnetip");
const { Denkovi: smartden } = require("./dist/smartden");

class Denkovi {
  #ip;
  #password;
  #user;
  #port;
  #model;
  #timeout;
  #denkovi;
  constructor(options) {
    this.#ip = options.ip;
    this.#port = options.port;
    this.#password = options.password;
    this.#user = options.user;
    this.#timeout = opacity.timeout,
      this.#model = options.model.toLowerCase();
    if (this.#model === 'datnetip') {
      this.#denkovi = new datnetip({ ip: this.#ip, port: this.#port, password: this.#password, timeout: this.#timeout });
    } else if (this.#model === 'smartden') {
      this.#denkovi = new smartden({ ip: this.#ip, port: this.#port, password: this.#password });
    } else {
      throw new Error("Invalid model specified");
    }
  }

  async getStates() {
    return this.#denkovi.getStates();
  }
  async getState(out, port) {
    return this.#denkovi.getState(out, port);
  }
  async setState(out, port, value) {
    return this.#denkovi.setState(out, port, value);
  }
}

exports.Denkovi = Denkovi;
