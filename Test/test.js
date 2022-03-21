const func2 = require("./test2")

const funcs = require('./test3')



const func = async (f) => {
  const result = await f("BAS_random", {
    a: 1,
    b: 100,
  })

  const result2 = await func2(f)

  await f("BAS_log", {
    message: func2.toString(),
  })

  await f("BAS_log", {
    message: result2,
  })

  await f("BAS_log", {
    message: result,
  })

  await f("BAS_log", {
    message: result + result2,
  })

  // return result + (await func2(f))
}

module.exports = func
