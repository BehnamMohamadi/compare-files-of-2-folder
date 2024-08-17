const {
  readdir,
  readFile
} = require("node:fs/promises");
const path = require("node:path");

const deepCompare = async (folder1, folder2) => {

  try {

    const [files1, files2] = await Promise.all([readdir(folder1), readdir(folder2)])

    if (files1.length !== files2.length) {
      return console.log("files number in each folder are not equal.");
    }

    files1.sort();
    files2.sort();

    for (let index = 0; index < files1.length; index++) {
      if (files1[index] !== files2[index]) {
        return console.log(`Files differ: ${files1[index]} vs ${files2[index]}`);
      }

      const file1Path = path.join(folder1, files1[index]);
      const file2Path = path.join(folder2, files2[index]);

      const [content1, content2] = await Promise.all([readFile(file1Path, "utf-8"), readFile(file2Path, "utf-8")])

      if (content1 !== content2) {
        return console.log(`the contents of 2 folder are different: ${files1[index]}`);
      }
    }

    console.log("The folders contain the same files and contents.");
  } catch (error) {
    console.log(error)
  }
}

const shallowCompare = async (folder1, folder2) => {

  const [files1, files2] = await Promise.all([readdir(folder1), readdir(folder2)])

  if (files1.length !== files2.length) {
    return console.log("The folders length are different.");
  }

  files1.sort();
  files2.sort();

  for (let index = 0; index < files1.length; index++) {
    if (files1[index] !== files2[index]) {
      return console.log(`Files differ: ${files1[index]} vs ${files2[index]}`);
    }
  }

  console.log("The folders contain the same files if you want to compare the contents of each file you should choose deep comparing.");
}

module.exports = {
  shallowCompare,
  deepCompare
}