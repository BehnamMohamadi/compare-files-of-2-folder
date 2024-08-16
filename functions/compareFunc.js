const {
  readdir,
  readFile
} = require("node:fs/promises");
const path = require("node:path");
const readLine = require("node:readline")

const folder1Path = path.join(__dirname, "folder1");
const folder2Path = path.join(__dirname, "folder2");

const deepCompare = async (folder1, folder2) => {

  try {
    const files1 = await readdir(folder1);
    const files2 = await readdir(folder2);

    if (files1.length !== files2.length) {
      return console.log("files number in each folder are not equal.");
    }

    files1.sort();
    files2.sort();
    for (let i = 0; i < files1.length; i++) {
      if (files1[i] !== files2[i]) {
        return console.log(`Files differ: ${files1[i]} vs ${files2[i]}`);
      }

      const file1Path = path.join(folder1, files1[i]);
      const file2Path = path.join(folder2, files2[i]);

      const content1 = await readFile(file1Path, 'utf8');
      const content2 = await readFile(file2Path, 'utf8');

      if (content1 !== content2) {
        return console.log(`the contents of 2 folder are different: ${files1[i]}`);
      }
    }



    console.log("The folders contain the same files and contents.");
  } catch (error) {
    console.log(error)
  }
}

const shallowCompare = async (folder1, folder2) => {
  const files1 = await readdir(folder1);
  const files2 = await readdir(folder2);

  if (files1.length !== files2.length) {
    return console.log("The folders length are different.");
  }

  files1.sort();
  files2.sort();
  for (let i = 0; i < files1.length; i++) {
    if (files1[i] !== files2[i]) {
      return console.log(`Files differ: ${files1[i]} vs ${files2[i]}`);
    }
  }

  console.log("The folders contain the same files if you want to compare the contents of each file you should choose deep comparing.");
}

module.exports = {
  shallowCompare,
  deepCompare
}