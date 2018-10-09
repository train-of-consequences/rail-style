const charCodeA = `A`.charCodeAt(0)
const charCode0 = `0`.charCodeAt(0)

export const tiploc = tiploc => {
  if (!tiploc) {
    return null
  }

  let output = ``

  tiploc--
  for (let i = 0; i < 7; i++) {
    const thisCharacter = tiploc % 27
    tiploc = (tiploc - thisCharacter) / 27
    if (thisCharacter) {
      output = String.fromCharCode(thisCharacter + charCodeA - 1) + output
    } else {
      output = ` ` + output
    }
  }

  return output
}

export const crs = crs => {
  if (!crs) {
    return null
  }

  let output = ``

  crs--

  for (let i = 0; i < 3; i++) {
    const thisCharacter = crs % 36
    crs = (crs - thisCharacter) / 36
    if (thisCharacter > 25) {
      output = String.fromCharCode(thisCharacter + charCode0 - 26) + output
    } else {
      output = String.fromCharCode(thisCharacter + charCodeA) + output
    }
  }

  return output
}
