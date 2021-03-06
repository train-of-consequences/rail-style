import escapeStringRegexp from "escape-string-regexp"
import { tz as momentTz } from "moment-timezone"

export const ddmmyyOptional = {
  regex: `[0-9]{6}| {6}`,
  parse: text => text != `      `
    ? momentTz(text, `DDMMYY`, `Europe/London`)
    : null
}

export const ddmmyyRequired = {
  regex: `[0-9]{6}`,
  parse: text => momentTz(text, `DDMMYY`, `Europe/London`)
}

export const ddmmyyyyOptional = {
  regex: `[0-9]{8}| {8}`,
  parse: text => text != `        `
    ? momentTz(text, `DDMMYYYY`, `Europe/London`)
    : null
}

export const ddmmyyyyRequired = {
  regex: `[0-9]{8}`,
  parse: text => momentTz(text, `DDMMYYYY`, `Europe/London`)
}

export const yymmddOptional = {
  regex: `[0-9]{6}| {6}`,
  parse: text => text != `      `
    ? momentTz(text, `YYMMDD`, `Europe/London`)
    : null
}

export const yymmddRequired = {
  regex: `[0-9]{6}`,
  parse: text => momentTz(text, `YYMMDD`, `Europe/London`)
}

export const yyyymmddOptional = {
  regex: `[0-9]{8}| {8}`,
  parse: text => text != `        `
    ? momentTz(text, `YYYYMMDD`, `Europe/London`)
    : null
}

export const yyyymmddRequired = {
  regex: `[0-9]{8}`,
  parse: text => momentTz(text, `YYYYMMDD`, `Europe/London`)
}

export const ddmmyyhhmmOptional = {
  regex: `[0-9]{10}| {10}`,
  parse: text => text != `          `
    ? momentTz(text, `DDMMYYhhmm`, `Europe/London`)
    : null
}

export const ddmmyyhhmmRequired = {
  regex: `[0-9]{10}`,
  parse: text => momentTz(text, `DDMMYYhhmm`, `Europe/London`)
}

export const ddmmyyyyhhmmOptional = {
  regex: `[0-9]{12}| {12}`,
  parse: text => text != `            `
    ? momentTz(text, `DDMMYYYYhhmm`, `Europe/London`)
    : null
}

export const ddmmyyyyhhmmRequired = {
  regex: `[0-9]{12}`,
  parse: text => momentTz(text, `DDMMYYYYhhmm`, `Europe/London`)
}

export const yymmddhhmmOptional = {
  regex: `[0-9]{10}| {10}`,
  parse: text => text != `          `
    ? momentTz(text, `YYMMDDhhmm`, `Europe/London`)
    : null
}

export const yymmddhhmmRequired = {
  regex: `[0-9]{10}`,
  parse: text => momentTz(text, `YYMMDDhhmm`, `Europe/London`)
}

export const yyyymmddhhmmOptional = {
  regex: `[0-9]{12}| {12}`,
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
  regex: `[0-9]{4}| {4}`,
  parse: text => text != `    `
    ? convertHhmm(text)
    : null
}

export const hhmmRequired = {
  regex: `[0-9]{4}`,
  parse: convertHhmm
}

const convertHhmmh = text => {
  const toOutput = convertHhmm(text.slice(0, 4))
  if (text.endsWith(`H`)) {
    return toOutput.add(30, `seconds`)
  } else {
    return toOutput
  }
}

export const hhmmhOptional = {
  regex: `[0-9]{4}[ H]| {5}`,
  parse: text => text != `     `
    ? convertHhmmh(text)
    : null
}

export const hhmmhRequired = {
  regex: `[0-9]{4}[ H]`,
  parse: convertHhmmh
}

export const constantOptional = constant => ({
  regex: `${escapeStringRegexp(constant)}| {${constant.length}}`,
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
    .concat(` {${Object.keys(values)[0].length}}`)
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

export const flags = (length, values) => ({
  regex: `[${Object.keys(values).join()} ]{${length}}`,
  parse: text => Array
    .from(text)
    .filter(character => Object.keys(values).includes(character))
    .map(character => values[character])
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
  regex: `[A-Z0-9]{${length}}| {${length}}`,
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
    regex += `|\\d{${i}} {${length - i}}`
    regex += `| {${length - i}}\\d{${i}}`
  }
  regex += `| {${length}}`
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
    regex += `|\\d{${i}} {${length - i}}`
    regex += `| {${length - i}}\\d{${i}}`
  }
  return {
    regex,
    parse: parseInt
  }
}

export const dayFlags = ({
  regex: `[01]{7}`,
  parse: text => [
    `monday`, `tuesday`, `wednesday`, `thursday`, `friday`, `saturday`, `sunday`
  ].filter((day, index) => text.charAt(index) == 1)
})
