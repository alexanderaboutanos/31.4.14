/** @format */

const fs = require("fs");
const axios = require("axios");
const argv = process.argv;

if (argv[2] == "--out") {
  action = "write";
  writeTo = argv[3];
  readFrom = argv[4];
} else {
  action = "read";
  readFrom = argv[2];
}

if (readFrom.slice(0, 4) === "http") {
  webCat(readFrom);
} else {
  cat(readFrom);
}

function cat(readFrom) {
  fs.readFile(readFrom, "utf-8", (err, data) => {
    if (err) {
      console.log("ERROR:", err);
      process.kill(1);
    } else {
      if (action == "read") {
        console.log(data, action);
      } else {
        fs.writeFile(writeTo, data, "utf8", function (err) {
          if (err) {
            console.error(err);
            process.exit(1);
          }
          console.log("Successfully wrote to file!");
        });
      }
    }
  });
}

async function webCat(url) {
  try {
    res = await axios.get(url);
    if (action == "read") {
      console.log(res.data);
    } else {
      fs.writeFile(writeTo, res.data, "utf8", function (err) {
        if (err) {
          console.error(err);
          process.exit(1);
        }
        console.log("Successfully wrote to file!");
      });
    }
  } catch (err) {
    console.log(err);
  }
}
