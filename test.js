const merge = require('webpack-merge');
const path = require('path');

const resolve = p => path.resolve(__dirname, '..', ...p);

console.log(resolve([]))