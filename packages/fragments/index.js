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
