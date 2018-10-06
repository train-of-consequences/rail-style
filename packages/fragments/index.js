import escapeStringRegexp from "escape-string-regexp"
import { tz as momentTz } from "moment-timezone"

export const ddmmyyOptional = {
  regex: `[0-9]{6}|\\s{6}`,
  parse: text => text != `      `
    ? momentTz(text, `DDMMYY`, `Europe/London`)
    : null
}

export const ddmmyyRequired = {
  regex: `[0-9]{6}`,
  parse: text => momentTz(text, `DDMMYY`, `Europe/London`)
}

export const ddmmyyyyOptional = {
  regex: `[0-9]{8}|\\s{8}`,
  parse: text => text != `        `
    ? momentTz(text, `DDMMYYYY`, `Europe/London`)
    : null
}

export const ddmmyyyyRequired = {
  regex: `[0-9]{8}`,
  parse: text => momentTz(text, `DDMMYYYY`, `Europe/London`)
}

export const yymmddOptional = {
  regex: `[0-9]{6}|\\s{6}`,
  parse: text => text != `      `
    ? momentTz(text, `YYMMDD`, `Europe/London`)
    : null
}

export const yymmddRequired = {
  regex: `[0-9]{6}`,
  parse: text => momentTz(text, `YYMMDD`, `Europe/London`)
}

export const yyyymmddOptional = {
  regex: `[0-9]{8}|\\s{8}`,
  parse: text => text != `        `
    ? momentTz(text, `YYYYMMDD`, `Europe/London`)
    : null
}

export const yyyymmddRequired = {
  regex: `[0-9]{8}`,
  parse: text => momentTz(text, `YYYYMMDD`, `Europe/London`)
}

export const ddmmyyhhmmOptional = {
  regex: `[0-9]{10}|\\s{10}`,
  parse: text => text != `          `
    ? momentTz(text, `DDMMYYhhmm`, `Europe/London`)
    : null
}

export const ddmmyyhhmmRequired = {
  regex: `[0-9]{10}`,
  parse: text => momentTz(text, `DDMMYYhhmm`, `Europe/London`)
}

export const ddmmyyyyhhmmOptional = {
  regex: `[0-9]{12}|\\s{12}`,
  parse: text => text != `            `
    ? momentTz(text, `DDMMYYYYhhmm`, `Europe/London`)
    : null
}

export const ddmmyyyyhhmmRequired = {
  regex: `[0-9]{12}`,
  parse: text => momentTz(text, `DDMMYYYYhhmm`, `Europe/London`)
}

export const yymmddhhmmOptional = {
  regex: `[0-9]{10}|\\s{10}`,
  parse: text => text != `          `
    ? momentTz(text, `YYMMDDhhmm`, `Europe/London`)
    : null
}

export const yymmddhhmmRequired = {
  regex: `[0-9]{10}`,
  parse: text => momentTz(text, `YYMMDDhhmm`, `Europe/London`)
}

export const yyyymmddhhmmOptional = {
  regex: `[0-9]{12}|\\s{12}`,
  parse: text => text != `            `
    ? momentTz(text, `YYYYMMDDhhmm`, `Europe/London`)
    : null
}

export const yyyymmddhhmmRequired = {
  regex: `[0-9]{12}`,
  parse: text => momentTz(text, `YYYYMMDDhhmm`, `Europe/London`)
}

const convertHhmm = text => momentTz(`00010101${text}`, `YYYYMMDDhhmm`, `Europe/London`)

export const hhmmOptional = {
  regex: `[0-9]{4}|\\s{4}`,
  parse: text => text != `    `
    ? convertHhmm(text)
    : null
}

export const hhmmRequired = {
  regex: `[0-9]{4}`,
  parse: convertHhmm
}

export const constantOptional = constant => ({
  regex: `${escapeStringRegexp(constant)}|\\s{${constant.length}}`,
  parse: text => text.trim() || null
})

export const constantRequired = constant => ({
  regex: escapeStringRegexp(constant),
  parse: text => text
})

export const enumOptional = values => ({
  regex: Object
    .keys(values)
    .map(escapeStringRegexp)
    .concat(`\\s{${Object.keys(values)[0].length}}`)
    .join(`|`),
  parse: text => text.trim()
    ? values[text]
    : null
})

export const enumRequired = values => ({
  regex: Object
    .keys(values)
    .map(escapeStringRegexp)
    .join(`|`),
  parse: text => values[text]
})

export const stringOptional = length => ({
  regex: `.{${length}}`,
  parse: text => text.trim() || null
})

export const stringRequired = length => ({
  regex: `\\S.{${length - 1}}`,
  parse: text => text.trim()
})

export const alphanumericOptional = length => ({
  regex: `[A-Z0-9]{${length}}|\\s{${length}}`,
  parse: text => text.trim()
    ? text
    : null
})

export const alphanumericRequired = length => ({
  regex: `[A-Z0-9]{${length}}`,
  parse: text => text
})

export const unsignedOptional = length => {
  let regex = `\\d{${length}}`
  for (let i = 1; i < length; i++) {
    regex += `|\\d{${i}}\\s{${length - i}}`
    regex += `|\\s{${length - i}}\\d{${i}}`
  }
  regex += `|\\s{${length}}`
  return {
    regex,
    parse: text => text.trim()
      ? parseInt(text)
      : null
  }
}

export const unsignedRequired = length => {
  let regex = `\\d{${length}}`
  for (let i = 1; i < length; i++) {
    regex += `|\\d{${i}}\\s{${length - i}}`
    regex += `|\\s{${length - i}}\\d{${i}}`
  }
  return {
    regex,
    parse: parseInt
  }
}
