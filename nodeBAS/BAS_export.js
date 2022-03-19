const fs = require("fs")
const { scripts, ids } = require("./BAS_scripts")

const path = "../Test/Test2.xml"

const xml = fs.readFileSync(path, "utf8")

const getEntry = (file) =>
  `section_start(\"\\u007b\\u0022n\\u0022:\\u0022${file}\\u0022\\u007d\", `
const getEntryPos = (file) =>
  xml.indexOf(getEntry(file)) + getEntry(file).length + 11

const fillScripts = (scripts) => {
  const dataScripts = []
  scripts.forEach((file, index) => {
    // const exp = new RegExp(
    //   // `section_start(\"\u007b\u0022n\u0022:\u0022${file}\u0022\u007d\", d{9,})!`
    //   `section_start(\"\\u007b\\u0022n\\u0022:\\u0022${file}\\u0022\\u007d\",`
    // )

    // const exp = new RegExp(
    //   'section_start\("\\u007b\\u0022n\\u0022:\\u0022' + file,
    //   // file +
    //   // '\\u0022\\u007d", ddddddddd)!',
    //   "gm"
    // )

    // const exp = /section_start\(\"\\u007b\\u0022n\\u0022:\\u0022/

    // console.log(exp)

    // const entry = exp.test(xml)

    // console.log(entry)

    // console.log(getEntry(file))

    // const endScripts = "section_end()!\n\n})!"
    // const endScript = "section_end()!\n\n " + getEntry(scripts[index + 1])
    // const endScript = "section_end()!\n"
    // const endScript = getEntry(scripts[index + 1])
    // console.log(endScript)

    const pos1 = getEntryPos(file)
    const pos2 =
      index === scripts.length - 1
        ? xml.length
        : xml.indexOf(getEntry(scripts[index + 1]))

    // const pos2 =
    //   index === scripts.length - 1
    //     ? xml.indexOf(endScripts)
    //     : xml.indexOf(endScript)
    // console.log(pos1, pos2)
    // console.log(xml.length)

    // console.log(xml.substring(pos1, pos2))
    // console.log(xml.substring(pos1, pos2).indexOf("section_end()!"))

    const finalPosEnd =
      pos1 + xml.substring(pos1, pos2).indexOf("section_end()!")
    const finalPosStart =
      pos1 + xml.substring(pos1, finalPosEnd).indexOf("/**\n")
    // console.log(file)
    // console.log(finalPosStart, finalPosEnd)
    const script = xml.substring(finalPosStart, finalPosEnd)
    // if (file === "http-client") {
    //   console.log(pos1, pos2)
    // }

    dataScripts.push([file, script.replace(/ {2,}/g, "")])
  })
  return dataScripts
}

const writeScripts = (dataScripts) => {
  dataScripts.forEach((entry) => {
    const file = entry[0]
    const script = entry[1]
    const dir = "./API Parsed"
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir)
    }
    // console.log(dir + "/" + file + ".js")
    fs.writeFileSync(dir + "/" + file + ".js", script)
  })
}

const dataScripts = fillScripts(scripts)

writeScripts(dataScripts)
