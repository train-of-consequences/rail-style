const charCodeA = `A`.charCodeAt(0)
const charCodeZ = `Z`.charCodeAt(0)
const charCode0 = `0`.charCodeAt(0)
const charCodeSpace = ` `.charCodeAt(0)

export const tiploc = tiploc => {
  if (tiploc == null) {
    return 0
  } else {
    let output = 0
    for (let i = 0; i < 7; i++) {
      output *= 27
      const charCode = tiploc.charCodeAt(i)
      if (charCode != charCodeSpace) {
        output += 1 + charCode - charCodeA
      }
    }
    return output + 1
  }
}

export const crs = crs => {
  if (crs == null) {
    return 0
  } else {
    let output = 0
    for (let i = 0; i < 3; i++) {
      output *= 36
      const charCode = crs.charCodeAt(i)
      if (charCode >= charCodeA && charCode <= charCodeZ) {
        output += charCode - charCodeA
      } else {
        output += 26 + charCode - charCode0
      }
    }
    return output + 1
  }
}
