const func = async (f) => {
  return await f('BAS_random', {
    a: 1,
    b: 100
  })
}

module.exports = func