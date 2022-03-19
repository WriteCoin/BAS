const fs = require("fs")

const getPath = (file) => "./API Formatted/" + file

const file1 = getPath("api/BAS_api01.js")
const file2 = getPath("api/BAS_api01.bas.js")

// const bytes1 = fs.readFileSync(file1)
// const bytes2 = fs.readFileSync(file2)

// console.log(bytes1.length)
// console.log(bytes2.length)

// console.log(bytes1.toString())
// console.log(bytes2.toString())

// console.log(bytes1.toString() === bytes2.toString())

const file1Content = fs.readFileSync(file1, "utf8")
console.log(file1Content.length)
// const file2Content = fs.readFileSync(file2, "utf8")

// let file1ContentFixed = ""
// for (let i = 0; i < file1Content.length; i++) {
//   const char = file1Content.charAt(i)
//   file1ContentFixed = file1ContentFixed + char + "\n"
// }

// fs.writeFileSync(getPath("api/BAS_api01.node.js"), file1ContentFixed)

// const file1ContentReaded = fs.readFileSync(
//   getPath("api/BAS_api01.node.js"),
//   "utf8"
// )

// console.log(file1ContentReaded === file2Content)
