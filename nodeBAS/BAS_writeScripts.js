const fs = require("fs")
const { exec } = require("child_process")
const lineReader = require("line-reader")
const readLine = require("readline")
const files = require('./BAS_scripts')

function stripComments(s) {
  return s.replace(/\/\*[\s\S]*?\*\/|([^:]|^)\/\/.*$/gim, "")
}

function readFileToArr(fReadName, cb) {
  const arr = []
  const readObj = readLine.createInterface({
    input: fs.createReadStream(fReadName),
  })

  readObj.on("line", function (line) {
    arr.push(line)
  })
  readObj.on("close", function () {
    console.log("readLine close....")
    cb(arr)
  })
}

const dir = "API Documentation"


const getScript = (dir, files) => {
  let script = ""
  files.forEach((file) => {
    const fileContent = fs.readFileSync(
      "../" + dir + "/" + file + ".js",
      "utf8"
    )
    script = script + "\n\n" + stripComments(fileContent)
    // script = script.replace(/\s{2,}/g, " ")
  })

  return script
}

const getScripts = async (dir, files) => {
  const scripts = {}
  for (const file of files) {
    let fileContent = fs.readFileSync("../" + dir + "/" + file + ".js", "utf8")

    fileContent = stripComments(fileContent)
    fileContent = fileContent.replace(/\'/g, '"')
    // fileContent = fileContent.replace(/\r/ {2,}/g, " ")
    // fileContent = fileContent.replace(/^ +| +$|( ) +/g, "$1")
    // fileContent = fileContent.replace(/\n/g, ";")
    const functions = fileContent.split(/}\s{2,}function /gm)
    const funcPat = "function "
    const fixedFunctions = functions.map((funcStr, index, arr) => {
      if (funcStr.charAt(0) === "\r") {
        funcStr = funcStr.substring(1, funcStr.length)
        if (funcStr.charAt(0) === "\n") {
          funcStr = funcStr.substring(1, funcStr.length)
        }
      } else {
        funcStr = funcPat + funcStr
      }
      if (index !== arr.length - 1) {
        funcStr = funcStr + "}"
      }
      return funcStr
    })
    const result = fixedFunctions.map((funcStr) => {
      return [
        funcStr,
        funcStr.substring(funcPat.length, funcStr.indexOf("(", 1)),
      ]
    })
    scripts[file] = result
  }
  return scripts
}

const addScriptProject = (path, script, entry) => {
  const projectContent = fs.readFileSync(path, "utf8")
  // const entry = "_call(_on_start, null)!"
  const pos = projectContent.indexOf(entry) + entry.length + 1
  const part1 = projectContent.substring(0, pos + 1)
  const part2 = script
  const part3 = projectContent.substring(pos, projectContent.length + 1)
  const newProjectContent = part1 + part2 + "\n" + part3
  // console.log(newProjectContent)
  fs.writeFileSync(path, newProjectContent)
}

const scriptMinimize = async (fileIn, fileOut) => {
  await readFileToArr(fileIn, function (lines) {
    let script = ""
    lines.forEach((line) => {
      const lastChar = line[line.length - 1]
      if (
        lastChar !== "{" &&
        lastChar !== "," &&
        lastChar !== "(" &&
        lastChar !== ";"
      ) {
        script = script + line + ";"
      } else {
        script = script + line
      }
    })
    // script = script.replace(/\'/g, '"')
    script = script.replace(/\s{2,}/g, " ")

    fs.writeFileSync(fileOut, script)
    // const stat = fs.statSync(fileOut)
    // if (stat.size) {
    //   fs.appendFileSync(fileOut, script)
    // } else {
    //   fs.writeFileSync(fileOut, script)
    // }
  })
}

const getAPIPath = (file) => "../API Documentation/" + file + ".js"
const getFormattedPath = (file) => "./API Formatted/" + file + ".js"

const writeScripts = (scripts) =>
  Object.entries(scripts).forEach((entry) => {
    const path = getFormattedPath(entry[0])
    fs.writeFileSync(path, entry[1], (error) => {
      if (error) throw error
    })
  })

const writeScriptsSepFuncs = async (scripts) => {
  for (const entry of Object.entries(scripts)) {
    const dir = entry[0]
    const script = entry[1]
    const path = "./API Formatted/" + dir
    fs.rmdirSync(path, { recursive: true, force: true })
    fs.mkdirSync(path)
    let index = 0
    for (const tuple of script) {
      const funcStr = tuple[0]
      const funcName = tuple[1]
      index++
      const counter = index < 10 ? "0" + index : index
      const filepath = path + "/BAS_" + dir + counter + ".js"
      fs.writeFileSync(filepath, funcStr)
      await scriptMinimize(filepath, filepath)
    }
  }
}

const getHtmlFromScripts = async (scripts) => {
  let htmlStr =
    '<!DOCTYPE html><html lang="ru"><head><meta charset="UTF-8"><title>BAS скрипты</title></head><body>'
  Object.entries(scripts).forEach((entry) => {
    const dir = entry[0]
    const script = entry[1]
    const path = "./API Formatted/" + dir
    if (fs.existsSync(path)) {
      htmlStr = htmlStr + `<div class=${dir}>`
      script.forEach((tuple, index) => {
        const funcStr = tuple[0]
        const funcName = tuple[1]
        index++
        const counter = index < 10 ? "0" + index : index
        const filepath = path + "/BAS_" + dir + counter + ".js"
        if (fs.existsSync(filepath)) {
          const scriptContent = fs.readFileSync(filepath, "utf8")
          htmlStr =
            htmlStr + `<span class=${dir + counter}>${scriptContent}</span>`
        }
      })
      htmlStr = htmlStr + "</div>"
    }
  })
  htmlStr = htmlStr + "</body></html>"
  return htmlStr
}

// const script = getScript(dir, [files[0]])

// console.log(script)

const start = async () => {
  const scripts = await getScripts(dir, files)
  await writeScriptsSepFuncs(scripts)
  const html = await getHtmlFromScripts([scripts[0]])
  console.log(html)
}

start()

// console.log(scripts.api)

// writeScripts(scripts)

// Object.keys(scripts).forEach((path) => {
//   const formattedPath = getFormattedPath(path)
//   scriptMinimize(formattedPath, formattedPath)
// })

// scriptMinimize(getFormattedPath("api"))
// scriptMinimize(getAPIPath('api'), getFormattedPath('api'))

// console.log(scripts.api)

// console.log(scripts.api)

// writeScripts(scripts)

// Object.keys(scripts)
//   .filter((path) => path === "api")
//   .forEach((path) => {
//     const fixedPath = "./API Formatted/" + path + ".js"
//     readFileToArr(fixedPath, function (lines) {
//       let newScript = ""
//       lines.forEach((line) => {
//         let addes = ""
//         if (line.includes(")!")) {
//           addes =
//             line.substring(0, line.indexOf(")!") + 1) +
//             line.substring(line.indexOf(")!") + 2, line.length)
//         } else {
//           addes = line
//         }
//         newScript = newScript + addes + "\n"
//       })

//       fs.writeFileSync(fixedPath, newScript, (error) => {
//         if (error) throw error
//       })
//     })
//   })

// console.log(scripts.api)

// for (const [path, oldScript] of Object.entries(scripts).filter(
//   (_, i) => i === 0
// )) {
//   const fixedPath = "./API Formatted/" + path + ".js"
//   const lines = []
//   lineReader.eachLine(fixedPath, (line) => {
//     // console.log(line)
//     let addes = ""
//     // console.log(line)
//     // console.log(line.indexOf(")!") !== -1)
//     // console.log(line.includes(")!"))
//     if (line.includes(")!")) {
//       addes =
//         line.substring(0, line.indexOf(")!") + 1) +
//         line.substring(line.indexOf(")!") + 2, line.length)
//       // console.log(addes)
//     } else {
//       addes = line
//     }
//     lines.push(addes)
//     // console.log(lines[lines.length - 1])
//   })
//   console.log(lines.length)
//   // console.log(newScript)
//   let newScript = ""
//   lines.forEach((line) => {
//     // console.log(line)
//     newScript = newScript + line
//   })
//   scripts[path] = newScript
//   console.log(scripts[path])
// }

// console.log(scripts.api)

// lineReader.eachLine("./API Formatted/api.js", (line) => {
//   console.log(line)
// })

// addScriptProject(
//   "../Test/Test2.xml",
//   script,
//   "/*Dat:eyJzIjoiY3VzdG9tIiwidiI6MSwiZiI6W10sInV3IjoiMCIsInV0IjoiMCIsInV0byI6IjAiLCJ1bSI6IjAiLCJkIjpbeyJpZCI6IkNvZGUiLCJ0eXBlIjoiY29uc3RyIiwiZGF0YSI6IlxyXG4iLCJjbGFzcyI6ImV4cHJlc3Npb24ifV19*/"
// )

// fs.writeFileSync("./script.js", script, (error) => {
//   if (error) throw error
// })
