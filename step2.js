/** @format */

const fs = require("fs");
const axios = require("axios");
const argv = process.argv;
var cmd_line_arg = argv[2];

if (cmd_line_arg.slice(0, 4) === "http") {
  webCat(cmd_line_arg);
} else {
  cat(cmd_line_arg);
}

function cat(path) {
  fs.readFile(path, "utf-8", (err, data) => {
    if (err) {
      console.log("ERROR:", err);
      process.kill(1);
    }
    console.log(data);
  });
}

async function webCat(url) {
  try {
    res = await axios.get(url);
    console.log(res.data);
  } catch (err) {
    console.log(err);
  }
}
