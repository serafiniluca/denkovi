"use strict";

class Denkovi {
  #ip;
  #password;
  #user;
  #port;
  constructor(options) {
    this.#ip = options.ip;
    this.#password = options.password || "admin";
    this.#user = options.user || "admin";
    this.#port = options.port || 80;
  }

  async getStates() {
    const url = `http://${this.#ip}:${this.#port}/current_state.json?pw=${this.#password}`;
    const response = await fetch(url);
    const jsonResponseContent = await response.json();
    return this.#parseOutput(jsonResponseContent.CurrentState.Output);
  }

  async getState(out) {
    if (out < 1 || out > 16) {
      throw new Error("Error: Pin value must be between 1 and 16");
    }
    const url = `http://${this.#ip}:${this.#port}/current_state.json?pw=${this.#password}`;
    const response = await fetch(url);
    const jsonResponseContent = await response.json();
    return {
      name: jsonResponseContent.CurrentState.Output[out].Name,
      value: parseInt(jsonResponseContent.CurrentState.Output[out].Value),
      id: out
    };
  }

  async setState(out, value) {
    if (out < 1 || out > 16) {
      throw new Error("Error: Pin value must be between 1 and 16");
    }
    const relayNumber = `Relay${out}`;
    const url = `http://${this.#ip}:${this.#port}/current_state.json?pw=${this.#password}&${relayNumber}=${value}`;
    const response = await fetch(url);
    const jsonResponseContent = await response.json();
    return this.#parseOutput(jsonResponseContent.CurrentState.Output);
  }

  #parseOutput(output) {
    return output.map((relay, index) => ({
      name: relay.Name,
      value: parseInt(relay.Value),
      id: index + 1
    }));
  }
}

exports.Denkovi = Denkovi;
