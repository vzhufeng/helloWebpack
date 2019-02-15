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

const withProm = (cb, args) => {
  return new Promise((res, rej) => {
    cb(res, rej, args);
  });
};

module.exports = {
  confirm,
  withProm
};
