const fs = require("fs")
const { exec } = require("child_process")
const lineReader = require("line-reader")
const readLine = require("readline")

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
const files = [
  // 'general.d.ts',
  "api",
  "browser_api",
  // 'browser.d.ts',
  "network",
  // 'network.d.ts',
  "waiting",
  // 'waiting.d.ts',
  "email",
  // 'email.d.ts',
  "http-client",
  // 'http-client.d.ts',
  "date_and_time",
  // 'date_and_time.d.ts',
  "filesystem",
  "fingersprint",
  // 'async.d.ts',
  "async",
  "inactivity_emulation",
  "image",
  "json",
  "array",
  // 'path.d.ts',
  "path",
  "phone_confirm",
  "process_manage",
  "profile",
  "regular_expressions",
  "resources",
  // 'script_statistics.d.ts',
  "smtp_settings",
  // 'smtp_settings.d.ts',
  "string",
  // 'string.d.ts',
  "telegram",
  "timezone",
  "url",
  // 'url.d.ts',
  "user_interaction",
  // 'user_interaction.d.ts',
  "xpath",
  "html_element",
  // 'html_element.d.ts'
]

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

const getScripts = (dir, files) => {
  const scripts = {}
  files.forEach((file) => {
    let fileContent = fs.readFileSync("../" + dir + "/" + file + ".js", "utf8")

    fileContent = stripComments(fileContent)
    fileContent = fileContent.replace(/\'/g, '"')
    // fileContent = fileContent.replace(/\r/ {2,}/g, " ")
    // fileContent = fileContent.replace(/^ +| +$|( ) +/g, "$1")
    // fileContent = fileContent.replace(/\n/g, ";")
    scripts[file] = fileContent
  })
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
  fs.writeFileSync(path, newProjectContent, (error) => {
    if (error) throw error
  })
}

const scriptMinimize = (fileIn, fileOut) => {
  readFileToArr(fileIn, function (lines) {
    let script = ""
    lines.forEach((line) => {
      script = script + line + ";"
    })
    script = script.replace(/\'/g, '"')
    script = script.replace(/\s{2,}/g, " ")

    fs.writeFileSync(fileOut, script, (error) => {
      if (error) throw error
    })
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

// const script = getScript(dir, [files[0]])

// console.log(script)

const scripts = getScripts(dir, files)

writeScripts(scripts)

Object.keys(scripts).forEach((path) => {
  const formattedPath = getFormattedPath(path)
  scriptMinimize(formattedPath, formattedPath)
})

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
