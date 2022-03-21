const fs = require("fs")
const Path = require("path")
const { scripts } = require("./BAS_scripts")

const testKeysOrder = (scripts) => {
  scripts.forEach((script) => {
    console.log(script)
  })

  console.log()

  const objFiles = {}
  scripts.forEach((file) => {
    objFiles[file] = file
  })

  console.log(objFiles)

  console.log()

  Object.entries(objFiles).forEach((entry) => {
    console.log(`${entry[0]} = ${entry[1]}`)
  })
}

const getFunctions = (scripts, dir) => {
  const functions = {}
  if (!fs.existsSync(dir)) return functions
  const commentsExp = /\/\*[\s\S]*?\*\/|([^:]|^)\/\/.*$/gim
  const funcExp = /}\s{2,}function /gm
  scripts.forEach((script) => {
    const filepath = dir + "/" + script + ".js"
    if (!fs.existsSync(filepath)) return
    const scriptContent = fs.readFileSync(filepath, "utf8")

    const comments = scriptContent.match(commentsExp)
    // console.log(comments)
    // console.log(comments.length)

    const scriptContentWithoutComments = scriptContent.replace(commentsExp, "")

    const funcScripts = scriptContentWithoutComments.split(funcExp)

    // console.log(funcScripts)
    // console.log(funcScripts.length)

    const funcPat = "function "
    const fixedFuncScripts = funcScripts.map((funcScript, index, arr) => {
      if (funcScript.charAt(0) === "\r" || funcScript.charAt(0) === "\n") {
        funcScript = funcScript.substring(1, funcScript.length)
      } else {
        funcScript = funcPat + funcScript
      }
      if (index !== arr.length - 1) {
        funcScript = funcScript + "}"
      }
      return funcScript
    })

    // console.log(fixedFuncScripts)
    // console.log(fixedFuncScripts.length)

    const funcNames = fixedFuncScripts.map((funcScript) => {
      const funcName = funcScript.substring(
        funcPat.length,
        funcScript.indexOf("(", 1)
      )
      return funcName
    })

    // console.log(funcNames)
    // console.log(funcNames.length)

    const funcParams = fixedFuncScripts.map((funcScript) => {
      return funcScript.substring(
        funcScript.indexOf("(", 1) + 1,
        funcScript.indexOf(")", 1)
      )
    })

    // console.log(funcParams)
    // console.log(funcParams.length)

    const funcParamsFixed = funcParams.map((params) => {
      const paramsFixed = params.split(",").map((paramFixed) => {
        return paramFixed.charAt(0) === " "
          ? paramFixed.substring(1, paramFixed.length)
          : paramFixed
      })
      return paramsFixed[0] === "" ? [] : paramsFixed
    })

    // console.log(funcParamsFixed)
    // console.log(funcParamsFixed.length)

    const condLength = (arr) => {
      if (arr === comments) {
        return (
          arr.length === fixedFuncScripts.length &&
          arr.length === funcNames.length &&
          arr.length === funcParamsFixed.length
        )
      } else if (arr === fixedFuncScripts) {
        return (
          arr.length === comments.length &&
          arr.length === funcNames.length &&
          arr.length === funcParamsFixed.length
        )
      } else if (arr === funcNames) {
        return (
          arr.length === comments.length &&
          arr.length === fixedFuncScripts.length &&
          arr.length === funcParamsFixed.length
        )
      } else if (arr === funcParamsFixed) {
        return (
          arr.length === comments.length &&
          arr.length === funcNames.length &&
          arr.length === fixedFuncScripts.length
        )
      }
    }

    const cond =
      condLength(comments) &&
      condLength(fixedFuncScripts) &&
      condLength(funcNames) &&
      condLength(funcParamsFixed)

    // if (script === "inactivity_emulation") {
    //   console.log(cond)
    //   console.log(comments)
    //   console.log(fixedFuncScripts)
    // }

    if (cond) {
      functions[script] = {}
      comments.forEach((comment, index) => {
        const funcName = funcNames[index]
        const funcScript = fixedFuncScripts[index]
        const funcParams = funcParamsFixed[index]
        functions[script][funcName] = {
          comment,
          funcScript,
          funcParams,
        }
      })
    } else {
      functions[script] = {}
    }

    // if (script === "inactivity_emulation") {
    //   console.log(functions.inactivity_emulation)
    // }
    // console.log(functions)
  })
  return functions
}

const getAsyncFuncName = (name) => `get_${name.replace("-", "_")}_functions`

const replaceSlash = (path) =>
  path.split("\\").reduce((acc, part, index, arr) => {
    return acc + part + (index === arr.length - 1 ? "" : "/")
  }, "")

// console.log(replaceSlash(Path.resolve("./API ForNode/api")))

const nodeGenFiles = (functions, dir) => {
  if (fs.existsSync(dir)) {
    fs.rmdirSync(dir, { recursive: true, force: true })
  }
  fs.mkdirSync(dir)

  // console.log(functions)

  Object.entries(functions).forEach((entry) => {
    const script = entry[0]
    const funcs = entry[1]
    const filepath = dir + "/" + script + ".js"

    // console.log(script)
    // console.log(funcs)

    const nameAsyncFunc = getAsyncFuncName(script)
    const paramFuncName = "f"
    const nodeScript =
      Object.entries(funcs).reduce((acc, funcEntry, index, arr) => {
        // console.log(funcEntry)
        const funcName = funcEntry[0]
        const func = funcEntry[1]
        // console.log(funcName)
        const comment = func.comment
        const params = func.funcParams.reduce((acc, param, index, arr) => {
          // console.log("acc: ", acc)
          // console.log("param: ", param)
          // console.log("index: ", index)
          // console.log("arr: ", arr)
          // const condSep = index > 0 && index < arr.length - 1
          const condSep = index > 0
          return acc + (condSep ? ", " : "") + param
        }, "")
        // console.log()
        const paramsFixed = params === "" ? "params" : params
        const assemblyFunc = `\t${comment}\nconst ${funcName} = async (${paramsFixed}) => await ${paramFuncName}("${funcName}", ${
          paramsFixed === "params" ? paramsFixed : `{ ${paramsFixed} }`
        })\n\n${
          index === arr.length - 1
            ? `${
                Object.keys(funcs).reduce((acc, funcName, index, arr) => {
                  return acc + `\t${funcName},\n`
                }, "return {") + "}\n"
              }`
            : ""
        }`
        return acc + assemblyFunc
      }, `const ${nameAsyncFunc} = (${paramFuncName}) => {\n`) + "}\n\n"

    // const moduleExports =
    //   Object.keys(funcs).reduce((acc, funcName, index, arr) => {
    //     return acc + `\t${funcName},\n`
    //   }, "module.exports = {\n") + "}"
    const moduleExports = `module.exports = ${nameAsyncFunc}`

    // console.log(nodeScript)
    // console.log(moduleExports)

    const result = nodeScript + moduleExports

    // console.log(result)

    fs.writeFileSync(filepath, result)
  })
}

const nodeGenRequire = (functions, filepath, apiDir) => {
  const exists = fs.existsSync(filepath)
  const fileScript = exists ? fs.readFileSync(filepath, "utf8") : ""

  const requires = Object.entries(functions).reduce((acc, entry, index) => {
    const script = entry[0]
    const funcs = entry[1]

    const path = replaceSlash(Path.resolve(apiDir + "/" + script))

    const nameAsyncFunc = getAsyncFuncName(script)
    const assemblyFuncs =
      Object.keys(funcs).reduce((acc, funcName, index, arr) => {
        return (
          acc + "\t" + funcName + (index !== arr.length - 1 ? "," : "") + "\n"
        )
      }, `const ${nameAsyncFunc} = require("${path}")\nconst {\n`) +
      `} = ${nameAsyncFunc}(BAS_FUNCTION)\n`
    return acc + assemblyFuncs
  }, "")

  // console.log(requires)

  fs.writeFileSync(filepath, requires + fileScript)
}

const functions = getFunctions(scripts, "./API Parsed")

// console.log(functions.inactivity_emulation)

nodeGenFiles(functions, "./API ForNode")

nodeGenRequire(functions, "./nodeAPIRequire.js", "./API ForNode")

// console.log(Path.resolve("./API ForNode/api").replace('.[\]', "/"))
