/** @format */

const fs = require("fs");
const argv = process.argv;
var path = argv[2];

function cat(path) {
  fs.readFile(path, "utf-8", (err, data) => {
    if (err) {
      console.log("ERROR:", err);
      process.kill(1);
    }
    console.log(data);
  });
}

cat(path);
