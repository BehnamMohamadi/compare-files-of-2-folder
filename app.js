const {
  shallowCompare,
  deepCompare
} = require('./functions/compareFunc');
const path = require("node:path");
const readline = require('readline');

async function compareFolders() {
  try {

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    const answer1 = await rl.question('please insert type of compare --shallow or --deep and two folder  :', (input) => {
      const [compareType, folder1, folder2] = input.split(" ")
      if (compareType === "--shallow") {
        shallowCompare(folder1, folder2)
      } else if (compareType === "--deep") {
        deepCompare(folder1, folder2)
      } else {
        console.log("choose the correct type of comparing")
      }
      rl.close();
    });

  } catch (error) {
    console.log(error)
  }
}

compareFolders();