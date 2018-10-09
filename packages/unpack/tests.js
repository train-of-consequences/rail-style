import * as unpack from "./index.coverage"

const run = (description, func, input, output) => it(
  description,
  () => expect(func(input)).toEqual(output)
)

run(`tiploc null`, unpack.tiploc, 0, null)
run(`tiploc minimum`, unpack.tiploc, 1, `       `)
run(`tiploc maximum`, unpack.tiploc, 10460353203, `ZZZZZZZ`)
run(`tiploc random`, unpack.tiploc, 6042237046, `OPBNL F`)

run(`crs null`, unpack.crs, 0, null)
run(`crs minimum`, unpack.crs, 1, `AAA`)
run(`crs maximum`, unpack.crs, 46656, `999`)
run(`crs random`, unpack.crs, 45484, `9DP`)

run(`trainUid null`, unpack.trainUid, 0, null)
run(`trainUid minimum`, unpack.trainUid, 1, `A00000`)
run(`trainUid minimum`, unpack.trainUid, 2600000, `Z99999`)
run(`trainUid random`, unpack.trainUid, 227936, `C27935`)
