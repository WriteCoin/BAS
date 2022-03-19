const fs = require("fs")
const files = require("./BAS_scripts")
const path = require("path")

const getFiles = function (dir, files_) {
  files_ = files_ || []
  var files = fs.readdirSync(dir)
  for (var i in files) {
    var name = dir + "/" + files[i]
    if (fs.statSync(name).isDirectory()) {
      getFiles(name, files_)
    } else {
      files_.push(name)
    }
  }
  return files_
}

let htmlStr =
  '<!DOCTYPE html>\n<html lang="ru">\n<head>\n<meta charset="UTF-8">\n<title>BAS скрипты</title>\n</head>\n<body>\n'

for (const file of files) {
  const path = "./API Formatted/" + file
  if (fs.existsSync(path)) {
    htmlStr = htmlStr + `<div class=${file}>\n`

    const scripts = getFiles(path)
    scripts.forEach((scriptPath, index) => {
      index++
      const counter = index < 10 ? "0" + index : index
      const scriptContent = fs.readFileSync(scriptPath, "utf8")
      htmlStr =
        htmlStr + `<span class=${file + counter}>${scriptContent}</span>\n`
    })
    htmlStr = htmlStr + "</div>\n"
  }
}
htmlStr = htmlStr + "</body>\n</html>"

fs.writeFileSync("./forBAS.html", htmlStr)
