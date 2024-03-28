const { Denkovi } = require("denkovi");

const releBoard = new Denkovi({ model: "datnetip", ip: "192.168.0.51" });

const Getstate = async () => {
  const status = await releBoard.getState(1);
  console.log(status);
};
const Getstates = async () => {
  const status = await releBoard.getStates();
  console.log(status);
};
const setState = async () => {
  const status = await releBoard.setState(1, 0);
  console.log(status);
};

Getstate();
Getstates();
setState();



const releBoard2 = new Denkovi({ model: "smartden", ip: "192.168.0.52" });

const Getstate2 = async () => {
  const status = await releBoard2.getState(1);
  console.log(status);
};
const Getstates2 = async () => {
  const status = await releBoard2.getStates();
  console.log(status);
};
const setState2 = async () => {
  const status = await releBoard2.setState(1, 0);
  console.log(status);
};

Getstate2();
Getstates2();
setState2();