"use strict";
const snmp = require("net-snmp");

const PIN_OIDS = [
  { url: "1.3.6.1.4.1.42505.9.2.1", name: "p3" },
  { url: "1.3.6.1.4.1.42505.9.2.2", name: "p5" },
  { url: "1.3.6.1.4.1.42505.9.2.3", name: "p6" },
  { url: "1.3.6.1.4.1.42505.9.1.25.0", name: "p3_dir" },
  { url: "1.3.6.1.4.1.42505.9.1.26.0", name: "p5_dir" }
];

class Denkovi {
  #ip;
  #model;
  #password;
  #user;
  #port;

  constructor(model, ip, port = 161, user = "admin", password = "private") {
    this.#ip = ip;
    this.#model = model;
    this.#password = password;
    this.#user = user;
    this.#port = port;
  }

  #snmpGet = (oids, callback) => {
    const options = {
      port: parseInt(this.#port),
      retries: 1,
      timeout: 5000,
      transport: "udp4",
      trapPort: 163,
      version: snmp.Version1
    };
    const session = snmp.createSession(this.#ip, this.#password, options);
    session.get(oids, (error, varbinds) => {
      callback(error, varbinds);
    });
  };

  #snmpSet = (oid, updateValue, callback) => {
    const options = {
      port: parseInt(this.#port),
      retries: 1,
      timeout: 5000,
      transport: "udp4",
      trapPort: 163,
      version: snmp.Version1
    };
    const session = snmp.createSession(this.#ip, this.#password, options);
    const varbinds = [{
      oid: oid,
      type: snmp.ObjectType.Integer,
      value: parseInt(updateValue)
    }];
    session.set(varbinds, (error, varbinds) => {
      callback(error, varbinds);
    });
  };

  #createJsonRespond = (name, varbinds) => {
    let jsonTxt = `"${name}":`;
    for (const varbind of varbinds) {
      jsonTxt += `"${varbind.value.toString()}",`;
    }
    jsonTxt = jsonTxt.slice(0, -1); // Rimuovi l'ultima virgola
    return jsonTxt;
  };

  getStates() {
    const getPinsState = (pinPrefix, pinStart, pinCount) => {
      const pins = [];
      const oids = PIN_OIDS.find(el => el.name == pinPrefix);
      for (let i = 1; i <= pinCount; i++) {
        pins.push(new Promise((resolve, reject) => {
          const oid = `${oids.url}.${i}.0`;
          this.#snmpGet([oid], (error, varbinds) => {
            if (error) {
              reject(error);
            } else {
              resolve(this.#createJsonRespond(`${oids.name}_${i + pinStart}`, varbinds));
            }
          });
        }));
      }
      return Promise.all(pins);
    };

    const getDirState = (pinPrefix) => {
      const oids = PIN_OIDS.find(el => el.name == pinPrefix);
      return new Promise((resolve, reject) => {
        this.#snmpSet([oids.url], (error, varbinds) => {
          if (error) {
            reject(error);
          } else {
            resolve(this.#createJsonRespond(oids.name, varbinds));
          }
        });
      });
    };

    const promises = [];
    promises.push(getPinsState("p3", 0, 8));
    promises.push(getPinsState("p5", 8, 8));
    promises.push(getPinsState("p6", 0, 8));
    /*      promises.push(getDirState("p3_dir")); 
        promises.push(getDirState("p5_dir"));  */

    return Promise.all(promises).then((results) => {
      const jsonRespond = JSON.parse(`{${results.join(",")}}`);
      return jsonRespond;
    }).catch(error => {
      throw new Error("Error: " + error);
    });
  }
  getState(out) {
    const pinPrefix = out <= 8 ? "p3" : "p5";
    const pinNumber = out <= 8 ? out : out - 8;
    const oid = PIN_OIDS.find(el => el.name == pinPrefix);
    const url = `${oid.url}.${pinNumber}.0`;
    return new Promise((resolve, reject) => {
      this.#snmpGet([url], (error, varbinds) => {
        if (error) {
          reject(error);
        } else {
          resolve(JSON.parse(`{${this.#createJsonRespond(`${oid.name}_${out}`, varbinds)}}`));
        }
      });
    });

  }
  setOut(out, value, status = true) {
    const pinPrefix = out <= 8 ? "p3" : "p5";
    const pinNumber = out <= 8 ? out : out - 8;
    const oid = PIN_OIDS.find(el => el.name == pinPrefix);
    const url = `${oid.url}.${pinNumber}.0`;
    return new Promise((resolve, reject) => {
      this.#snmpSet(url, value, (error, varbinds) => {
        if (error) {
          reject(new Error("Error: " + error));
        } else if (status) {
          try {
            resolve(this.getState(out));
          } catch (err) {
            reject(err);
          }
        }
      });
    });
  }
}

exports.Denkovi = Denkovi;
