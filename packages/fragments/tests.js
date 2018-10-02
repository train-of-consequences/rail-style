import moment from "moment-timezone"
import "jasmine-expect-moment"
import * as index from "./index.babel"

const runMatching = (description, fragment, text, verifyParsed) => describe(description, () => {
  let matched
  let parsed
  beforeEach(() => {
    matched = new RegExp(`^PRECEDING123!(${fragment.regex})!TRAILING456$`).exec(`PRECEDING123!${text}!TRAILING456`)
    parsed = fragment.parse(matched[1])
  })
  it(`matches`, () => expect(matched).not.toBeNull())
  it(`matches globally`, () => expect(matched[0]).toEqual(`PRECEDING123!${text}!TRAILING456`))
  it(`matches locally`, () => expect(matched[1]).toEqual(text))
  it(`does not include its own capture groups`, () => expect(matched.length).toEqual(2))
  it(`returns the expected value`, () => verifyParsed(parsed))
})

const runNotMatching = (description, fragment, text) => describe(description, () => {
  let matched
  beforeEach(() => {
    matched = new RegExp(`^PRECEDING123!(${fragment.regex})!TRAILING456$`).exec(`PRECEDING123!${text}!TRAILING456`)
  })
  it(`does not match`, () => expect(matched).toBeNull())
})

describe(`ddmmyyOptional`, () => {
  runMatching(
    `early before BST`, index.ddmmyyOptional, `030123`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-01-03T00:00:00+00:00`))
  )
  runMatching(
    `late before BST`, index.ddmmyyOptional, `220323`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-03-22T00:00:00+00:00`))
  )
  runMatching(
    `early BST`, index.ddmmyyOptional, `280323`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-03-28T00:00:00+01:00`))
  )
  runMatching(
    `late BST`, index.ddmmyyOptional, `251023`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-10-25T00:00:00+01:00`))
  )
  runMatching(
    `early after BST`, index.ddmmyyOptional, `301023`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-10-30T00:00:00+00:00`))
  )
  runMatching(
    `late after BST`, index.ddmmyyOptional, `281223`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-12-28T00:00:00+00:00`))
  )
  runNotMatching(`too few digits`, index.ddmmyyOptional, `28122`)
  runNotMatching(`extra leading digit`, index.ddmmyyOptional, `0281223`)
  runNotMatching(`extra trailing digits`, index.ddmmyyOptional, `2812230`)
  runNotMatching(`non-numeric`, index.ddmmyyOptional, `28a223`)
  runMatching(`spaces filling the same space`, index.ddmmyyOptional, `      `,
    parsed => expect(parsed).toBeNull()
  )
  runNotMatching(`too few spaces`, index.ddmmyyOptional, `     `)
  runNotMatching(`too many spaces`, index.ddmmyyOptional, `       `)
})

describe(`ddmmyyRequired`, () => {
  runMatching(
    `early before BST`, index.ddmmyyRequired, `030123`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-01-03T00:00:00+00:00`))
  )
  runMatching(
    `late before BST`, index.ddmmyyRequired, `220323`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-03-22T00:00:00+00:00`))
  )
  runMatching(
    `early BST`, index.ddmmyyRequired, `280323`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-03-28T00:00:00+01:00`))
  )
  runMatching(
    `late BST`, index.ddmmyyRequired, `251023`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-10-25T00:00:00+01:00`))
  )
  runMatching(
    `early after BST`, index.ddmmyyRequired, `301023`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-10-30T00:00:00+00:00`))
  )
  runMatching(
    `late after BST`, index.ddmmyyRequired, `281223`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-12-28T00:00:00+00:00`))
  )
  runNotMatching(`too few digits`, index.ddmmyyRequired, `28122`)
  runNotMatching(`extra leading digit`, index.ddmmyyRequired, `0281223`)
  runNotMatching(`extra trailing digits`, index.ddmmyyRequired, `2812230`)
  runNotMatching(`non-numeric`, index.ddmmyyRequired, `28a223`)
  runNotMatching(`spaces filling the same space`, index.ddmmyyRequired, `      `)
  runNotMatching(`too few spaces`, index.ddmmyyRequired, `     `)
  runNotMatching(`too many spaces`, index.ddmmyyRequired, `       `)
})

describe(`ddmmyyyyOptional`, () => {
  runMatching(
    `early before BST`, index.ddmmyyyyOptional, `03012023`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-01-03T00:00:00+00:00`))
  )
  runMatching(
    `late before BST`, index.ddmmyyyyOptional, `22032023`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-03-22T00:00:00+00:00`))
  )
  runMatching(
    `early BST`, index.ddmmyyyyOptional, `28032023`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-03-28T00:00:00+01:00`))
  )
  runMatching(
    `late BST`, index.ddmmyyyyOptional, `25102023`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-10-25T00:00:00+01:00`))
  )
  runMatching(
    `early after BST`, index.ddmmyyyyOptional, `30102023`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-10-30T00:00:00+00:00`))
  )
  runMatching(
    `late after BST`, index.ddmmyyyyOptional, `28122023`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-12-28T00:00:00+00:00`))
  )
  runNotMatching(`too few digits`, index.ddmmyyyyOptional, `2812202`)
  runNotMatching(`extra leading digit`, index.ddmmyyyyOptional, `028122023`)
  runNotMatching(`extra trailing digits`, index.ddmmyyyyOptional, `281220230`)
  runNotMatching(`non-numeric`, index.ddmmyyyyOptional, `28a22023`)
  runMatching(`spaces filling the same space`, index.ddmmyyyyOptional, `        `,
    parsed => expect(parsed).toBeNull()
  )
  runNotMatching(`too few spaces`, index.ddmmyyyyOptional, `       `)
  runNotMatching(`too many spaces`, index.ddmmyyyyOptional, `         `)
})

describe(`ddmmyyyyRequired`, () => {
  runMatching(
    `early before BST`, index.ddmmyyyyRequired, `03012023`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-01-03T00:00:00+00:00`))
  )
  runMatching(
    `late before BST`, index.ddmmyyyyRequired, `22032023`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-03-22T00:00:00+00:00`))
  )
  runMatching(
    `early BST`, index.ddmmyyyyRequired, `28032023`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-03-28T00:00:00+01:00`))
  )
  runMatching(
    `late BST`, index.ddmmyyyyRequired, `25102023`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-10-25T00:00:00+01:00`))
  )
  runMatching(
    `early after BST`, index.ddmmyyyyRequired, `30102023`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-10-30T00:00:00+00:00`))
  )
  runMatching(
    `late after BST`, index.ddmmyyyyRequired, `28122023`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-12-28T00:00:00+00:00`))
  )
  runNotMatching(`too few digits`, index.ddmmyyyyRequired, `2812202`)
  runNotMatching(`extra leading digit`, index.ddmmyyyyRequired, `028122023`)
  runNotMatching(`extra trailing digits`, index.ddmmyyyyRequired, `281220230`)
  runNotMatching(`non-numeric`, index.ddmmyyyyRequired, `28a22023`)
  runNotMatching(`spaces filling the same space`, index.ddmmyyyyRequired, `        `)
  runNotMatching(`too few spaces`, index.ddmmyyyyRequired, `       `)
  runNotMatching(`too many spaces`, index.ddmmyyyyRequired, `         `)
})

describe(`yymmddOptional`, () => {
  runMatching(
    `early before BST`, index.yymmddOptional, `230103`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-01-03T00:00:00+00:00`))
  )
  runMatching(
    `late before BST`, index.yymmddOptional, `230322`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-03-22T00:00:00+00:00`))
  )
  runMatching(
    `early BST`, index.yymmddOptional, `230328`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-03-28T00:00:00+01:00`))
  )
  runMatching(
    `late BST`, index.yymmddOptional, `231025`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-10-25T00:00:00+01:00`))
  )
  runMatching(
    `early after BST`, index.yymmddOptional, `231030`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-10-30T00:00:00+00:00`))
  )
  runMatching(
    `late after BST`, index.yymmddOptional, `231228`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-12-28T00:00:00+00:00`))
  )
  runNotMatching(`too few digits`, index.yymmddOptional, `21228`)
  runNotMatching(`extra leading digit`, index.yymmddOptional, `0231228`)
  runNotMatching(`extra trailing digits`, index.yymmddOptional, `2312280`)
  runNotMatching(`non-numeric`, index.yymmddOptional, `23a228`)
  runMatching(`spaces filling the same space`, index.yymmddOptional, `      `,
    parsed => expect(parsed).toBeNull()
  )
  runNotMatching(`too few spaces`, index.yymmddOptional, `     `)
  runNotMatching(`too many spaces`, index.yymmddOptional, `       `)
})

describe(`yymmddRequired`, () => {
  runMatching(
    `early before BST`, index.yymmddRequired, `230103`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-01-03T00:00:00+00:00`))
  )
  runMatching(
    `late before BST`, index.yymmddRequired, `230322`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-03-22T00:00:00+00:00`))
  )
  runMatching(
    `early BST`, index.yymmddRequired, `230328`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-03-28T00:00:00+01:00`))
  )
  runMatching(
    `late BST`, index.yymmddRequired, `231025`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-10-25T00:00:00+01:00`))
  )
  runMatching(
    `early after BST`, index.yymmddRequired, `231030`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-10-30T00:00:00+00:00`))
  )
  runMatching(
    `late after BST`, index.yymmddRequired, `231228`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-12-28T00:00:00+00:00`))
  )
  runNotMatching(`too few digits`, index.yymmddRequired, `23122`)
  runNotMatching(`extra leading digit`, index.yymmddRequired, `0231228`)
  runNotMatching(`extra trailing digits`, index.yymmddRequired, `2312280`)
  runNotMatching(`non-numeric`, index.yymmddRequired, `23a228`)
  runNotMatching(`spaces filling the same space`, index.yymmddRequired, `      `)
  runNotMatching(`too few spaces`, index.yymmddRequired, `     `)
  runNotMatching(`too many spaces`, index.yymmddRequired, `       `)
})

describe(`yyyymmddOptional`, () => {
  runMatching(
    `early before BST`, index.yyyymmddOptional, `20230103`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-01-03T00:00:00+00:00`))
  )
  runMatching(
    `late before BST`, index.yyyymmddOptional, `20230322`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-03-22T00:00:00+00:00`))
  )
  runMatching(
    `early BST`, index.yyyymmddOptional, `20230328`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-03-28T00:00:00+01:00`))
  )
  runMatching(
    `late BST`, index.yyyymmddOptional, `20231025`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-10-25T00:00:00+01:00`))
  )
  runMatching(
    `early after BST`, index.yyyymmddOptional, `20231030`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-10-30T00:00:00+00:00`))
  )
  runMatching(
    `late after BST`, index.yyyymmddOptional, `20231228`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-12-28T00:00:00+00:00`))
  )
  runNotMatching(`too few digits`, index.yyyymmddOptional, `2023122`)
  runNotMatching(`extra leading digit`, index.yyyymmddOptional, `020231228`)
  runNotMatching(`extra trailing digits`, index.yyyymmddOptional, `202312280`)
  runNotMatching(`non-numeric`, index.yyyymmddOptional, `2023a228`)
  runMatching(`spaces filling the same space`, index.yyyymmddOptional, `        `,
    parsed => expect(parsed).toBeNull()
  )
  runNotMatching(`too few spaces`, index.yyyymmddOptional, `       `)
  runNotMatching(`too many spaces`, index.yyyymmddOptional, `         `)
})

describe(`yyyymmddRequired`, () => {
  runMatching(
    `early before BST`, index.yyyymmddRequired, `20230103`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-01-03T00:00:00+00:00`))
  )
  runMatching(
    `late before BST`, index.yyyymmddRequired, `20230322`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-03-22T00:00:00+00:00`))
  )
  runMatching(
    `early BST`, index.yyyymmddRequired, `20230328`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-03-28T00:00:00+01:00`))
  )
  runMatching(
    `late BST`, index.yyyymmddRequired, `20231025`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-10-25T00:00:00+01:00`))
  )
  runMatching(
    `early after BST`, index.yyyymmddRequired, `20231030`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-10-30T00:00:00+00:00`))
  )
  runMatching(
    `late after BST`, index.yyyymmddRequired, `20231228`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-12-28T00:00:00+00:00`))
  )
  runNotMatching(`too few digits`, index.yyyymmddRequired, `2023122`)
  runNotMatching(`extra leading digit`, index.yyyymmddRequired, `020231228`)
  runNotMatching(`extra trailing digits`, index.yyyymmddRequired, `202312280`)
  runNotMatching(`non-numeric`, index.yyyymmddRequired, `2023a228`)
  runNotMatching(`spaces filling the same space`, index.yyyymmddRequired, `        `)
  runNotMatching(`too few spaces`, index.yyyymmddRequired, `       `)
  runNotMatching(`too many spaces`, index.yyyymmddRequired, `         `)
})

describe(`stringOptional`, () => {
  runMatching(
    `full length`, index.stringOptional(9), `World, Hi`,
    parsed => expect(parsed).toEqual(`World, Hi`)
  )
  runMatching(
    `trailing spaces filling the same space`, index.stringOptional(9),
    `Worl     `, parsed => expect(parsed).toEqual(`Worl`)
  )
  runMatching(
    `spaces filling the same space`, index.stringOptional(9), `         `,
    parsed => expect(parsed).toBeNull()
  )
  runNotMatching(
    `full length extra leading character`, index.stringOptional(9), `gWorld, Hi`
  )
  runNotMatching(
    `full length extra leading space`, index.stringOptional(9), ` World, Hi`
  )
  runNotMatching(
    `full length extra trailing character`, index.stringOptional(9),
    `World, Hig`
  )
  runNotMatching(
    `full length extra trailing space`, index.stringOptional(9), `World, Hi `
  )
  runNotMatching(
    `trailing spaces extra leading character`, index.stringOptional(9),
    `aWorl     `
  )
  runNotMatching(
    `trailing spaces extra leading space`, index.stringOptional(9),
    ` Worl     `
  )
  runNotMatching(
    `trailing spaces extra trailing character`, index.stringOptional(9),
    `Worl     a`
  )
  runNotMatching(
    `trailing spaces extra trailing space`, index.stringOptional(9),
    `Worl      `
  )
  runNotMatching(
    `spaces extra leading character`, index.stringOptional(9), `a         `
  )
  runNotMatching(
    `spaces extra trailing character`, index.stringOptional(9), `         a`
  )
  runNotMatching(`spaces extra space`, index.stringOptional(9), `          `)
  runNotMatching(
    `full length too short`, index.stringOptional(9), `World, H`
  )
  runNotMatching(
    `trailing spaces too short`, index.stringOptional(9),
    `Worl    `
  )
  runNotMatching(`spaces too short`, index.stringOptional(9), `        `)
})

describe(`stringRequired`, () => {
  runMatching(
    `full length`, index.stringRequired(9), `World, Hi`,
    parsed => expect(parsed).toEqual(`World, Hi`)
  )
  runMatching(
    `trailing spaces filling the same space`, index.stringRequired(9),
    `Worl     `, parsed => expect(parsed).toEqual(`Worl`)
  )
  runNotMatching(
    `spaces filling the same space`, index.stringRequired(9), `         `
  )
  runNotMatching(
    `full length extra leading character`, index.stringRequired(9), `gWorld, Hi`
  )
  runNotMatching(
    `full length extra leading space`, index.stringRequired(9), ` World, Hi`
  )
  runNotMatching(
    `full length extra trailing character`, index.stringRequired(9),
    `World, Hig`
  )
  runNotMatching(
    `full length extra trailing space`, index.stringRequired(9), `World, Hi `
  )
  runNotMatching(
    `trailing spaces extra leading character`, index.stringRequired(9),
    `aWorl     `
  )
  runNotMatching(
    `trailing spaces extra leading space`, index.stringRequired(9),
    ` Worl     `
  )
  runNotMatching(
    `trailing spaces extra trailing character`, index.stringRequired(9),
    `Worl     a`
  )
  runNotMatching(
    `trailing spaces extra trailing space`, index.stringRequired(9),
    `Worl      `
  )
  runNotMatching(
    `spaces extra leading character`, index.stringRequired(9), `a         `
  )
  runNotMatching(
    `spaces extra trailing character`, index.stringRequired(9), `         a`
  )
  runNotMatching(`spaces extra space`, index.stringRequired(9), `          `)
  runNotMatching(
    `full length too short`, index.stringRequired(9), `World, H`
  )
  runNotMatching(
    `trailing spaces too short`, index.stringRequired(9),
    `Worl    `
  )
  runNotMatching(`spaces too short`, index.stringRequired(9), `        `)
})

describe(`alphanumericOptional`, () => {
  runMatching(
    `populated`, index.alphanumericOptional(5), `4DU8A`,
    parsed => expect(parsed).toEqual(`4DU8A`)
  )
  runMatching(
    `populated`, index.alphanumericOptional(5), `     `,
    parsed => expect(parsed).toBeNull()
  )
  runNotMatching(`lower case`, index.alphanumericOptional(5), `4dU8A`)
  runNotMatching(`space`, index.alphanumericOptional(5), `4 U8A`)
  runNotMatching(`symbol`, index.alphanumericOptional(5), `4$U8A`)
  runNotMatching(`populated too short`, index.alphanumericOptional(5), `4DU8`)
  runNotMatching(`populated too long`, index.alphanumericOptional(5), `4DU8A5`)
  runNotMatching(`empty too short`, index.alphanumericOptional(5), `    `)
  runNotMatching(`empty too long`, index.alphanumericOptional(5), `      `)
})

describe(`alphanumericRequired`, () => {
  runMatching(
    `populated`, index.alphanumericRequired(5), `4DU8A`,
    parsed => expect(parsed).toEqual(`4DU8A`)
  )
  runNotMatching(`empty`, index.alphanumericRequired(5), `     `)
  runNotMatching(`lower case`, index.alphanumericRequired(5), `4dU8A`)
  runNotMatching(`space`, index.alphanumericRequired(5), `4 U8A`)
  runNotMatching(`symbol`, index.alphanumericRequired(5), `4$U8A`)
  runNotMatching(`populated too short`, index.alphanumericRequired(5), `4DU8`)
  runNotMatching(`populated too long`, index.alphanumericRequired(5), `4DU8A5`)
  runNotMatching(`empty too short`, index.alphanumericRequired(5), `    `)
  runNotMatching(`empty too long`, index.alphanumericRequired(5), `      `)
})

describe(`unsignedOptional`, () => {
  runMatching(
    `full length`, index.unsignedOptional(4), `7362`,
    parsed => expect(parsed).toEqual(7362)
  )
  runMatching(
    `partial length`, index.unsignedOptional(4), `73  `,
    parsed => expect(parsed).toEqual(73)
  )
  runMatching(
    `spaces`, index.unsignedOptional(4), `    `,
    parsed => expect(parsed).toBeNull()
  )
  runNotMatching(
    `full length containing letter`, index.unsignedOptional(4), `7a62`
  )
  runNotMatching(
    `full length containing space`, index.unsignedOptional(4), `7 62`
  )
  runNotMatching(
    `full length containing symbol`, index.unsignedOptional(4), `7$62`
  )
  runNotMatching(
    `partial length containing letter`, index.unsignedOptional(4), `7a6 `
  )
  runNotMatching(
    `partial length containing space`, index.unsignedOptional(4), `7 6 `
  )
  runNotMatching(
    `partial length containing symbol`, index.unsignedOptional(4), `7$6 `
  )
  runNotMatching(`too few digits`, index.unsignedOptional(4), `736`)
  runNotMatching(`too many digits`, index.unsignedOptional(4), `73628`)
  runNotMatching(`too few spaces`, index.unsignedOptional(4), `   `)
  runNotMatching(`too many spaces`, index.unsignedOptional(4), `     `)
  runNotMatching(`too few partial`, index.unsignedOptional(4), `73 `)
  runNotMatching(`too many partial`, index.unsignedOptional(4), `73   `)
})

describe(`unsignedRequired`, () => {
  runMatching(
    `full length`, index.unsignedRequired(4), `7362`,
    parsed => expect(parsed).toEqual(7362)
  )
  runMatching(
    `partial length`, index.unsignedRequired(4), `73  `,
    parsed => expect(parsed).toEqual(73)
  )
  runNotMatching(`spaces`, index.unsignedRequired(4), `    `)
  runNotMatching(
    `full length containing letter`, index.unsignedRequired(4), `7a62`
  )
  runNotMatching(
    `full length containing space`, index.unsignedRequired(4), `7 62`
  )
  runNotMatching(
    `full length containing symbol`, index.unsignedRequired(4), `7$62`
  )
  runNotMatching(
    `partial length containing letter`, index.unsignedRequired(4), `7a6 `
  )
  runNotMatching(
    `partial length containing space`, index.unsignedRequired(4), `7 6 `
  )
  runNotMatching(
    `partial length containing symbol`, index.unsignedRequired(4), `7$6 `
  )
  runNotMatching(`too few digits`, index.unsignedRequired(4), `736`)
  runNotMatching(`too many digits`, index.unsignedRequired(4), `73628`)
  runNotMatching(`too few spaces`, index.unsignedRequired(4), `   `)
  runNotMatching(`too many spaces`, index.unsignedRequired(4), `     `)
  runNotMatching(`too few partial`, index.unsignedRequired(4), `73 `)
  runNotMatching(`too many partial`, index.unsignedRequired(4), `73   `)
})
