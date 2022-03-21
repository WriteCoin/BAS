const func = () => {
  const a = 1
  const b = 2
  const c = 3
  return { a, b, c }
}
// const a = 1
// const b = 2
// const c = 3
// const obj = { a, b, c }

const { a } = func()

console.log(a)

// const result = await BAS_FUNCTION("BAS_random", {
//   a: 1,
//   b: 100,
// })

// module.exports = result