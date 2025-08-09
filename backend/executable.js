require("@babel/register")({
  presets: [["@babel/preset-env"]],
  plugins: ["@babel/plugin-transform-runtime"],
});
const server = require("./server.js");

module.exports = server;
