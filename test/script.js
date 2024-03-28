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
  const status = await releBoard.setOut(1, 1);
  console.log(status);
};

Getstate();
Getstates();
setState();