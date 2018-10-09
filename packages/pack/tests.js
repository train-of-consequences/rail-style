import * as pack from "./index.coverage"

const run = (description, func, input, output) => it(
  description,
  () => expect(func(input)).toEqual(output)
)

run(`tiploc null`, pack.tiploc, null, 0)
run(`tiploc minimum`, pack.tiploc, `       `, 1)
run(`tiploc maximum`, pack.tiploc, `ZZZZZZZ`, 10460353203)
run(`tiploc random`, pack.tiploc, `OPBNL F`, 6042237046)

run(`crs null`, pack.crs, null, 0)
run(`crs minimum`, pack.crs, `AAA`, 1)
run(`crs maximum`, pack.crs, `999`, 46656)
run(`crs random`, pack.crs, `9DP`, 45484)
