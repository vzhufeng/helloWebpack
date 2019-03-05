const inq = require("inquirer");

const confirm = ({ message, name, cb }) => {
  inq
    .prompt([
      {
        type: "confirm",
        message,
        name
      }
    ])
    .then(cb);
};

const list = ({ message, name, choices, cb }) => {
  inq
    .prompt([
      {
        type: "list",
        message,
        name,
        choices,
        filter: val => val.toLowerCase() // 将回答变为小写
      }
    ])
    .then(cb);
};

const withProm = (cb, args) => {
  return new Promise((res, rej) => {
    cb(res, rej, args);
  });
};

module.exports = {
  confirm,
  list,
  withProm
};
