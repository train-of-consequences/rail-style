import moment from "moment-timezone"
import "jasmine-expect-moment"
import * as fragments from "./index.coverage"

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
    `early before BST`, fragments.ddmmyyOptional, `030123`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-01-03T00:00:00+00:00`))
  )
  runMatching(
    `late before BST`, fragments.ddmmyyOptional, `220323`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-03-22T00:00:00+00:00`))
  )
  runMatching(
    `early BST`, fragments.ddmmyyOptional, `280323`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-03-28T00:00:00+01:00`))
  )
  runMatching(
    `late BST`, fragments.ddmmyyOptional, `251023`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-10-25T00:00:00+01:00`))
  )
  runMatching(
    `early after BST`, fragments.ddmmyyOptional, `301023`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-10-30T00:00:00+00:00`))
  )
  runMatching(
    `late after BST`, fragments.ddmmyyOptional, `281223`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-12-28T00:00:00+00:00`))
  )
  runNotMatching(`too few digits`, fragments.ddmmyyOptional, `28122`)
  runNotMatching(`extra leading digit`, fragments.ddmmyyOptional, `0281223`)
  runNotMatching(`extra trailing digits`, fragments.ddmmyyOptional, `2812230`)
  runNotMatching(`non-numeric`, fragments.ddmmyyOptional, `28a223`)
  runMatching(`spaces filling the same space`, fragments.ddmmyyOptional, `      `,
    parsed => expect(parsed).toBeNull()
  )
  runNotMatching(`too few spaces`, fragments.ddmmyyOptional, `     `)
  runNotMatching(`too many spaces`, fragments.ddmmyyOptional, `       `)
})

describe(`ddmmyyRequired`, () => {
  runMatching(
    `early before BST`, fragments.ddmmyyRequired, `030123`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-01-03T00:00:00+00:00`))
  )
  runMatching(
    `late before BST`, fragments.ddmmyyRequired, `220323`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-03-22T00:00:00+00:00`))
  )
  runMatching(
    `early BST`, fragments.ddmmyyRequired, `280323`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-03-28T00:00:00+01:00`))
  )
  runMatching(
    `late BST`, fragments.ddmmyyRequired, `251023`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-10-25T00:00:00+01:00`))
  )
  runMatching(
    `early after BST`, fragments.ddmmyyRequired, `301023`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-10-30T00:00:00+00:00`))
  )
  runMatching(
    `late after BST`, fragments.ddmmyyRequired, `281223`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-12-28T00:00:00+00:00`))
  )
  runNotMatching(`too few digits`, fragments.ddmmyyRequired, `28122`)
  runNotMatching(`extra leading digit`, fragments.ddmmyyRequired, `0281223`)
  runNotMatching(`extra trailing digits`, fragments.ddmmyyRequired, `2812230`)
  runNotMatching(`non-numeric`, fragments.ddmmyyRequired, `28a223`)
  runNotMatching(`spaces filling the same space`, fragments.ddmmyyRequired, `      `)
  runNotMatching(`too few spaces`, fragments.ddmmyyRequired, `     `)
  runNotMatching(`too many spaces`, fragments.ddmmyyRequired, `       `)
})

describe(`ddmmyyyyOptional`, () => {
  runMatching(
    `early before BST`, fragments.ddmmyyyyOptional, `03012023`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-01-03T00:00:00+00:00`))
  )
  runMatching(
    `late before BST`, fragments.ddmmyyyyOptional, `22032023`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-03-22T00:00:00+00:00`))
  )
  runMatching(
    `early BST`, fragments.ddmmyyyyOptional, `28032023`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-03-28T00:00:00+01:00`))
  )
  runMatching(
    `late BST`, fragments.ddmmyyyyOptional, `25102023`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-10-25T00:00:00+01:00`))
  )
  runMatching(
    `early after BST`, fragments.ddmmyyyyOptional, `30102023`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-10-30T00:00:00+00:00`))
  )
  runMatching(
    `late after BST`, fragments.ddmmyyyyOptional, `28122023`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-12-28T00:00:00+00:00`))
  )
  runNotMatching(`too few digits`, fragments.ddmmyyyyOptional, `2812202`)
  runNotMatching(`extra leading digit`, fragments.ddmmyyyyOptional, `028122023`)
  runNotMatching(`extra trailing digits`, fragments.ddmmyyyyOptional, `281220230`)
  runNotMatching(`non-numeric`, fragments.ddmmyyyyOptional, `28a22023`)
  runMatching(`spaces filling the same space`, fragments.ddmmyyyyOptional, `        `,
    parsed => expect(parsed).toBeNull()
  )
  runNotMatching(`too few spaces`, fragments.ddmmyyyyOptional, `       `)
  runNotMatching(`too many spaces`, fragments.ddmmyyyyOptional, `         `)
})

describe(`ddmmyyyyRequired`, () => {
  runMatching(
    `early before BST`, fragments.ddmmyyyyRequired, `03012023`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-01-03T00:00:00+00:00`))
  )
  runMatching(
    `late before BST`, fragments.ddmmyyyyRequired, `22032023`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-03-22T00:00:00+00:00`))
  )
  runMatching(
    `early BST`, fragments.ddmmyyyyRequired, `28032023`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-03-28T00:00:00+01:00`))
  )
  runMatching(
    `late BST`, fragments.ddmmyyyyRequired, `25102023`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-10-25T00:00:00+01:00`))
  )
  runMatching(
    `early after BST`, fragments.ddmmyyyyRequired, `30102023`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-10-30T00:00:00+00:00`))
  )
  runMatching(
    `late after BST`, fragments.ddmmyyyyRequired, `28122023`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-12-28T00:00:00+00:00`))
  )
  runNotMatching(`too few digits`, fragments.ddmmyyyyRequired, `2812202`)
  runNotMatching(`extra leading digit`, fragments.ddmmyyyyRequired, `028122023`)
  runNotMatching(`extra trailing digits`, fragments.ddmmyyyyRequired, `281220230`)
  runNotMatching(`non-numeric`, fragments.ddmmyyyyRequired, `28a22023`)
  runNotMatching(`spaces filling the same space`, fragments.ddmmyyyyRequired, `        `)
  runNotMatching(`too few spaces`, fragments.ddmmyyyyRequired, `       `)
  runNotMatching(`too many spaces`, fragments.ddmmyyyyRequired, `         `)
})

describe(`yymmddOptional`, () => {
  runMatching(
    `early before BST`, fragments.yymmddOptional, `230103`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-01-03T00:00:00+00:00`))
  )
  runMatching(
    `late before BST`, fragments.yymmddOptional, `230322`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-03-22T00:00:00+00:00`))
  )
  runMatching(
    `early BST`, fragments.yymmddOptional, `230328`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-03-28T00:00:00+01:00`))
  )
  runMatching(
    `late BST`, fragments.yymmddOptional, `231025`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-10-25T00:00:00+01:00`))
  )
  runMatching(
    `early after BST`, fragments.yymmddOptional, `231030`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-10-30T00:00:00+00:00`))
  )
  runMatching(
    `late after BST`, fragments.yymmddOptional, `231228`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-12-28T00:00:00+00:00`))
  )
  runNotMatching(`too few digits`, fragments.yymmddOptional, `21228`)
  runNotMatching(`extra leading digit`, fragments.yymmddOptional, `0231228`)
  runNotMatching(`extra trailing digits`, fragments.yymmddOptional, `2312280`)
  runNotMatching(`non-numeric`, fragments.yymmddOptional, `23a228`)
  runMatching(`spaces filling the same space`, fragments.yymmddOptional, `      `,
    parsed => expect(parsed).toBeNull()
  )
  runNotMatching(`too few spaces`, fragments.yymmddOptional, `     `)
  runNotMatching(`too many spaces`, fragments.yymmddOptional, `       `)
})

describe(`yymmddRequired`, () => {
  runMatching(
    `early before BST`, fragments.yymmddRequired, `230103`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-01-03T00:00:00+00:00`))
  )
  runMatching(
    `late before BST`, fragments.yymmddRequired, `230322`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-03-22T00:00:00+00:00`))
  )
  runMatching(
    `early BST`, fragments.yymmddRequired, `230328`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-03-28T00:00:00+01:00`))
  )
  runMatching(
    `late BST`, fragments.yymmddRequired, `231025`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-10-25T00:00:00+01:00`))
  )
  runMatching(
    `early after BST`, fragments.yymmddRequired, `231030`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-10-30T00:00:00+00:00`))
  )
  runMatching(
    `late after BST`, fragments.yymmddRequired, `231228`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-12-28T00:00:00+00:00`))
  )
  runNotMatching(`too few digits`, fragments.yymmddRequired, `23122`)
  runNotMatching(`extra leading digit`, fragments.yymmddRequired, `0231228`)
  runNotMatching(`extra trailing digits`, fragments.yymmddRequired, `2312280`)
  runNotMatching(`non-numeric`, fragments.yymmddRequired, `23a228`)
  runNotMatching(`spaces filling the same space`, fragments.yymmddRequired, `      `)
  runNotMatching(`too few spaces`, fragments.yymmddRequired, `     `)
  runNotMatching(`too many spaces`, fragments.yymmddRequired, `       `)
})

describe(`yyyymmddOptional`, () => {
  runMatching(
    `early before BST`, fragments.yyyymmddOptional, `20230103`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-01-03T00:00:00+00:00`))
  )
  runMatching(
    `late before BST`, fragments.yyyymmddOptional, `20230322`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-03-22T00:00:00+00:00`))
  )
  runMatching(
    `early BST`, fragments.yyyymmddOptional, `20230328`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-03-28T00:00:00+01:00`))
  )
  runMatching(
    `late BST`, fragments.yyyymmddOptional, `20231025`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-10-25T00:00:00+01:00`))
  )
  runMatching(
    `early after BST`, fragments.yyyymmddOptional, `20231030`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-10-30T00:00:00+00:00`))
  )
  runMatching(
    `late after BST`, fragments.yyyymmddOptional, `20231228`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-12-28T00:00:00+00:00`))
  )
  runNotMatching(`too few digits`, fragments.yyyymmddOptional, `2023122`)
  runNotMatching(`extra leading digit`, fragments.yyyymmddOptional, `020231228`)
  runNotMatching(`extra trailing digits`, fragments.yyyymmddOptional, `202312280`)
  runNotMatching(`non-numeric`, fragments.yyyymmddOptional, `2023a228`)
  runMatching(`spaces filling the same space`, fragments.yyyymmddOptional, `        `,
    parsed => expect(parsed).toBeNull()
  )
  runNotMatching(`too few spaces`, fragments.yyyymmddOptional, `       `)
  runNotMatching(`too many spaces`, fragments.yyyymmddOptional, `         `)
})

describe(`yyyymmddRequired`, () => {
  runMatching(
    `early before BST`, fragments.yyyymmddRequired, `20230103`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-01-03T00:00:00+00:00`))
  )
  runMatching(
    `late before BST`, fragments.yyyymmddRequired, `20230322`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-03-22T00:00:00+00:00`))
  )
  runMatching(
    `early BST`, fragments.yyyymmddRequired, `20230328`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-03-28T00:00:00+01:00`))
  )
  runMatching(
    `late BST`, fragments.yyyymmddRequired, `20231025`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-10-25T00:00:00+01:00`))
  )
  runMatching(
    `early after BST`, fragments.yyyymmddRequired, `20231030`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-10-30T00:00:00+00:00`))
  )
  runMatching(
    `late after BST`, fragments.yyyymmddRequired, `20231228`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-12-28T00:00:00+00:00`))
  )
  runNotMatching(`too few digits`, fragments.yyyymmddRequired, `2023122`)
  runNotMatching(`extra leading digit`, fragments.yyyymmddRequired, `020231228`)
  runNotMatching(`extra trailing digits`, fragments.yyyymmddRequired, `202312280`)
  runNotMatching(`non-numeric`, fragments.yyyymmddRequired, `2023a228`)
  runNotMatching(`spaces filling the same space`, fragments.yyyymmddRequired, `        `)
  runNotMatching(`too few spaces`, fragments.yyyymmddRequired, `       `)
  runNotMatching(`too many spaces`, fragments.yyyymmddRequired, `         `)
})

describe(`ddmmyyhhmmOptional`, () => {
  runMatching(
    `early before BST`, fragments.ddmmyyhhmmOptional, `0301231627`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-01-03T16:27:00+00:00`))
  )
  runMatching(
    `late before BST`, fragments.ddmmyyhhmmOptional, `2203231627`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-03-22T16:27:00+00:00`))
  )
  runMatching(
    `early BST`, fragments.ddmmyyhhmmOptional, `2803231627`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-03-28T16:27:00+01:00`))
  )
  runMatching(
    `late BST`, fragments.ddmmyyhhmmOptional, `2510231627`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-10-25T16:27:00+01:00`))
  )
  runMatching(
    `early after BST`, fragments.ddmmyyhhmmOptional, `3010231627`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-10-30T16:27:00+00:00`))
  )
  runMatching(
    `late after BST`, fragments.ddmmyyhhmmOptional, `2812231627`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-12-28T16:27:00+00:00`))
  )
  runNotMatching(`too few digits`, fragments.ddmmyyhhmmOptional, `281223162`)
  runNotMatching(`extra leading digit`, fragments.ddmmyyhhmmOptional, `02812231627`)
  runNotMatching(`extra trailing digits`, fragments.ddmmyyhhmmOptional, `28122316270`)
  runNotMatching(`non-numeric`, fragments.ddmmyyhhmmOptional, `28a2231627`)
  runMatching(`spaces filling the same space`, fragments.ddmmyyhhmmOptional, `          `,
    parsed => expect(parsed).toBeNull()
  )
  runNotMatching(`too few spaces`, fragments.ddmmyyhhmmOptional, `         `)
  runNotMatching(`too many spaces`, fragments.ddmmyyhhmmOptional, `           `)
})

describe(`ddmmyyhhmmRequired`, () => {
  runMatching(
    `early before BST`, fragments.ddmmyyhhmmRequired, `0301231627`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-01-03T16:27:00+00:00`))
  )
  runMatching(
    `late before BST`, fragments.ddmmyyhhmmRequired, `2203231627`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-03-22T16:27:00+00:00`))
  )
  runMatching(
    `early BST`, fragments.ddmmyyhhmmRequired, `2803231627`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-03-28T16:27:00+01:00`))
  )
  runMatching(
    `late BST`, fragments.ddmmyyhhmmRequired, `2510231627`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-10-25T16:27:00+01:00`))
  )
  runMatching(
    `early after BST`, fragments.ddmmyyhhmmRequired, `3010231627`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-10-30T16:27:00+00:00`))
  )
  runMatching(
    `late after BST`, fragments.ddmmyyhhmmRequired, `2812231627`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-12-28T16:27:00+00:00`))
  )
  runNotMatching(`too few digits`, fragments.ddmmyyhhmmRequired, `281223162`)
  runNotMatching(`extra leading digit`, fragments.ddmmyyhhmmRequired, `02812231627`)
  runNotMatching(`extra trailing digits`, fragments.ddmmyyhhmmRequired, `28122316270`)
  runNotMatching(`non-numeric`, fragments.ddmmyyhhmmRequired, `28a2231627`)
  runNotMatching(`spaces filling the same space`, fragments.ddmmyyhhmmRequired, `          `)
  runNotMatching(`too few spaces`, fragments.ddmmyyhhmmRequired, `         `)
  runNotMatching(`too many spaces`, fragments.ddmmyyhhmmRequired, `           `)
})

describe(`ddmmyyyyhhmmOptional`, () => {
  runMatching(
    `early before BST`, fragments.ddmmyyyyhhmmOptional, `030120231627`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-01-03T16:27:00+00:00`))
  )
  runMatching(
    `late before BST`, fragments.ddmmyyyyhhmmOptional, `220320231627`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-03-22T16:27:00+00:00`))
  )
  runMatching(
    `early BST`, fragments.ddmmyyyyhhmmOptional, `280320231627`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-03-28T16:27:00+01:00`))
  )
  runMatching(
    `late BST`, fragments.ddmmyyyyhhmmOptional, `251020231627`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-10-25T16:27:00+01:00`))
  )
  runMatching(
    `early after BST`, fragments.ddmmyyyyhhmmOptional, `301020231627`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-10-30T16:27:00+00:00`))
  )
  runMatching(
    `late after BST`, fragments.ddmmyyyyhhmmOptional, `281220231627`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-12-28T16:27:00+00:00`))
  )
  runNotMatching(`too few digits`, fragments.ddmmyyyyhhmmOptional, `28122023162`)
  runNotMatching(`extra leading digit`, fragments.ddmmyyyyhhmmOptional, `0281220231627`)
  runNotMatching(`extra trailing digits`, fragments.ddmmyyyyhhmmOptional, `2812202316270`)
  runNotMatching(`non-numeric`, fragments.ddmmyyyyhhmmOptional, `28a220231627`)
  runMatching(`spaces filling the same space`, fragments.ddmmyyyyhhmmOptional, `            `,
    parsed => expect(parsed).toBeNull()
  )
  runNotMatching(`too few spaces`, fragments.ddmmyyyyhhmmOptional, `           `)
  runNotMatching(`too many spaces`, fragments.ddmmyyyyhhmmOptional, `             `)
})

describe(`ddmmyyyyhhmmRequired`, () => {
  runMatching(
    `early before BST`, fragments.ddmmyyyyhhmmRequired, `030120231627`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-01-03T16:27:00+00:00`))
  )
  runMatching(
    `late before BST`, fragments.ddmmyyyyhhmmRequired, `220320231627`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-03-22T16:27:00+00:00`))
  )
  runMatching(
    `early BST`, fragments.ddmmyyyyhhmmRequired, `280320231627`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-03-28T16:27:00+01:00`))
  )
  runMatching(
    `late BST`, fragments.ddmmyyyyhhmmRequired, `251020231627`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-10-25T16:27:00+01:00`))
  )
  runMatching(
    `early after BST`, fragments.ddmmyyyyhhmmRequired, `301020231627`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-10-30T16:27:00+00:00`))
  )
  runMatching(
    `late after BST`, fragments.ddmmyyyyhhmmRequired, `281220231627`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-12-28T16:27:00+00:00`))
  )
  runNotMatching(`too few digits`, fragments.ddmmyyyyhhmmRequired, `28122023162`)
  runNotMatching(`extra leading digit`, fragments.ddmmyyyyhhmmRequired, `0281220231627`)
  runNotMatching(`extra trailing digits`, fragments.ddmmyyyyhhmmRequired, `2812202316270`)
  runNotMatching(`non-numeric`, fragments.ddmmyyyyhhmmRequired, `28a220231627`)
  runNotMatching(`spaces filling the same space`, fragments.ddmmyyyyhhmmRequired, `            `)
  runNotMatching(`too few spaces`, fragments.ddmmyyyyhhmmRequired, `           `)
  runNotMatching(`too many spaces`, fragments.ddmmyyyyhhmmRequired, `             `)
})

describe(`yymmddhhmmOptional`, () => {
  runMatching(
    `early before BST`, fragments.yymmddhhmmOptional, `2301031627`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-01-03T16:27:00+00:00`))
  )
  runMatching(
    `late before BST`, fragments.yymmddhhmmOptional, `2303221627`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-03-22T16:27:00+00:00`))
  )
  runMatching(
    `early BST`, fragments.yymmddhhmmOptional, `2303281627`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-03-28T16:27:00+01:00`))
  )
  runMatching(
    `late BST`, fragments.yymmddhhmmOptional, `2310251627`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-10-25T16:27:00+01:00`))
  )
  runMatching(
    `early after BST`, fragments.yymmddhhmmOptional, `2310301627`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-10-30T16:27:00+00:00`))
  )
  runMatching(
    `late after BST`, fragments.yymmddhhmmOptional, `2312281627`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-12-28T16:27:00+00:00`))
  )
  runNotMatching(`too few digits`, fragments.yymmddhhmmOptional, `212281627`)
  runNotMatching(`extra leading digit`, fragments.yymmddhhmmOptional, `02312281627`)
  runNotMatching(`extra trailing digits`, fragments.yymmddhhmmOptional, `23122816270`)
  runNotMatching(`non-numeric`, fragments.yymmddhhmmOptional, `23a2281627`)
  runMatching(`spaces filling the same space`, fragments.yymmddhhmmOptional, `          `,
    parsed => expect(parsed).toBeNull()
  )
  runNotMatching(`too few spaces`, fragments.yymmddhhmmOptional, `         `)
  runNotMatching(`too many spaces`, fragments.yymmddhhmmOptional, `           `)
})

describe(`yymmddhhmmRequired`, () => {
  runMatching(
    `early before BST`, fragments.yymmddhhmmRequired, `2301031627`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-01-03T16:27:00+00:00`))
  )
  runMatching(
    `late before BST`, fragments.yymmddhhmmRequired, `2303221627`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-03-22T16:27:00+00:00`))
  )
  runMatching(
    `early BST`, fragments.yymmddhhmmRequired, `2303281627`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-03-28T16:27:00+01:00`))
  )
  runMatching(
    `late BST`, fragments.yymmddhhmmRequired, `2310251627`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-10-25T16:27:00+01:00`))
  )
  runMatching(
    `early after BST`, fragments.yymmddhhmmRequired, `2310301627`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-10-30T16:27:00+00:00`))
  )
  runMatching(
    `late after BST`, fragments.yymmddhhmmRequired, `2312281627`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-12-28T16:27:00+00:00`))
  )
  runNotMatching(`too few digits`, fragments.yymmddhhmmRequired, `231228162`)
  runNotMatching(`extra leading digit`, fragments.yymmddhhmmRequired, `02312281627`)
  runNotMatching(`extra trailing digits`, fragments.yymmddhhmmRequired, `23122816270`)
  runNotMatching(`non-numeric`, fragments.yymmddhhmmRequired, `23a2281627`)
  runNotMatching(`spaces filling the same space`, fragments.yymmddhhmmRequired, `          `)
  runNotMatching(`too few spaces`, fragments.yymmddhhmmRequired, `         `)
  runNotMatching(`too many spaces`, fragments.yymmddhhmmRequired, `           `)
})

describe(`yyyymmddhhmmOptional`, () => {
  runMatching(
    `early before BST`, fragments.yyyymmddhhmmOptional, `202301031627`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-01-03T16:27:00+00:00`))
  )
  runMatching(
    `late before BST`, fragments.yyyymmddhhmmOptional, `202303221627`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-03-22T16:27:00+00:00`))
  )
  runMatching(
    `early BST`, fragments.yyyymmddhhmmOptional, `202303281627`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-03-28T16:27:00+01:00`))
  )
  runMatching(
    `late BST`, fragments.yyyymmddhhmmOptional, `202310251627`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-10-25T16:27:00+01:00`))
  )
  runMatching(
    `early after BST`, fragments.yyyymmddhhmmOptional, `202310301627`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-10-30T16:27:00+00:00`))
  )
  runMatching(
    `late after BST`, fragments.yyyymmddhhmmOptional, `202312281627`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-12-28T16:27:00+00:00`))
  )
  runNotMatching(`too few digits`, fragments.yyyymmddhhmmOptional, `20231228162`)
  runNotMatching(`extra leading digit`, fragments.yyyymmddhhmmOptional, `0202312281627`)
  runNotMatching(`extra trailing digits`, fragments.yyyymmddhhmmOptional, `2023122816270`)
  runNotMatching(`non-numeric`, fragments.yyyymmddhhmmOptional, `2023a2281627`)
  runMatching(`spaces filling the same space`, fragments.yyyymmddhhmmOptional, `            `,
    parsed => expect(parsed).toBeNull()
  )
  runNotMatching(`too few spaces`, fragments.yyyymmddhhmmOptional, `           `)
  runNotMatching(`too many spaces`, fragments.yyyymmddhhmmOptional, `             `)
})

describe(`yyyymmddhhmmRequired`, () => {
  runMatching(
    `early before BST`, fragments.yyyymmddhhmmRequired, `202301031627`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-01-03T16:27:00+00:00`))
  )
  runMatching(
    `late before BST`, fragments.yyyymmddhhmmRequired, `202303221627`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-03-22T16:27:00+00:00`))
  )
  runMatching(
    `early BST`, fragments.yyyymmddhhmmRequired, `202303281627`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-03-28T16:27:00+01:00`))
  )
  runMatching(
    `late BST`, fragments.yyyymmddhhmmRequired, `202310251627`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-10-25T16:27:00+01:00`))
  )
  runMatching(
    `early after BST`, fragments.yyyymmddhhmmRequired, `202310301627`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-10-30T16:27:00+00:00`))
  )
  runMatching(
    `late after BST`, fragments.yyyymmddhhmmRequired, `202312281627`,
    parsed => expect(parsed).toBeSameMoment(moment(`2023-12-28T16:27:00+00:00`))
  )
  runNotMatching(`too few digits`, fragments.yyyymmddhhmmRequired, `20231228162`)
  runNotMatching(`extra leading digit`, fragments.yyyymmddhhmmRequired, `0202312281627`)
  runNotMatching(`extra trailing digits`, fragments.yyyymmddhhmmRequired, `2023122816270`)
  runNotMatching(`non-numeric`, fragments.yyyymmddhhmmRequired, `2023a2281627`)
  runNotMatching(`spaces filling the same space`, fragments.yyyymmddhhmmRequired, `            `)
  runNotMatching(`too few spaces`, fragments.yyyymmddhhmmRequired, `           `)
  runNotMatching(`too many spaces`, fragments.yyyymmddhhmmRequired, `             `)
})

describe(`hhmmOptional`, () => {
  runMatching(
    `valid`, fragments.hhmmOptional, `1627`,
    parsed => expect(parsed).toBeSameMoment(moment(`0001-01-01T16:27:00+00:00`))
  )
  runNotMatching(`too few digits`, fragments.hhmmOptional, `162`)
  runNotMatching(`extra leading digit`, fragments.hhmmOptional, `01627`)
  runNotMatching(`extra trailing digits`, fragments.hhmmOptional, `16270`)
  runNotMatching(`non-numeric`, fragments.hhmmOptional, `1a27`)
  runMatching(`spaces filling the same space`, fragments.hhmmOptional, `    `,
    parsed => expect(parsed).toBeNull()
  )
  runNotMatching(`too few spaces`, fragments.hhmmOptional, `   `)
  runNotMatching(`too many spaces`, fragments.hhmmOptional, `     `)
})

describe(`hhmmRequired`, () => {
  runMatching(
    `valid`, fragments.hhmmRequired, `1627`,
    parsed => expect(parsed).toBeSameMoment(moment(`0001-01-01T16:27:00+00:00`))
  )
  runNotMatching(`too few digits`, fragments.hhmmRequired, `162`)
  runNotMatching(`extra leading digit`, fragments.hhmmRequired, `01627`)
  runNotMatching(`extra trailing digits`, fragments.hhmmRequired, `16270`)
  runNotMatching(`non-numeric`, fragments.hhmmRequired, `1a27`)
  runNotMatching(`spaces filling the same space`, fragments.hhmmRequired, `    `)
  runNotMatching(`too few spaces`, fragments.hhmmRequired, `   `)
  runNotMatching(`too many spaces`, fragments.hhmmRequired, `     `)
})

describe(`constantOptional`, () => {
  runMatching(
    `exact`, fragments.constantOptional(`teST Co$()\\.*?[]+nstant`), `teST Co$()\\.*?[]+nstant`,
    parsed => expect(parsed).toEqual(`teST Co$()\\.*?[]+nstant`)
  )
  runMatching(
    `spaces`, fragments.constantOptional(`teST Co$()\\.*?[]+nstant`),
    `                       `,
    parsed => expect(parsed).toBeNull()
  )
  runNotMatching(
    `too few spaces`, fragments.constantOptional(`teST Co$()\\.*?[]+nstant`),
    `                      `
  )
  runNotMatching(
    `too many spaces`, fragments.constantOptional(`teST Co$()\\.*?[]+nstant`),
    `                        `
  )
  runNotMatching(
    `leading space`, fragments.constantOptional(`teST Co$()\\.*?[]+nstant`),
    ` teST Co$()\\.*?[]+nstant`
  )
  runNotMatching(
    `trailing space`, fragments.constantOptional(`teST Co$()\\.*?[]+nstant`),
    `teST Co$()\\.*?[]+nstant `
  )
  runNotMatching(
    `leading character`, fragments.constantOptional(`teST Co$()\\.*?[]+nstant`),
    `FteST Co$()\\.*?[]+nstant`
  )
  runNotMatching(
    `trailing character`, fragments.constantOptional(`teST Co$()\\.*?[]+nstant`),
    `teST Co$()\\.*?[]+nstantF`
  )
  runNotMatching(
    `leading space`, fragments.constantOptional(`teST Co$()\\.*?[]+nstant`),
    ` teST Co$()\\.*?[]+nstant`
  )
  runNotMatching(
    `truncated start`, fragments.constantOptional(`teST Co$()\\.*?[]+nstant`),
    `eST Co$()\\.*?[]+nstant`
  )
  runNotMatching(
    `truncated end`, fragments.constantOptional(`teST Co$()\\.*?[]+nstant`),
    `teST Co$()\\.*?[]+nstan`
  )
  runNotMatching(
    `case mismatch`, fragments.constantOptional(`teST Co$()\\.*?[]+nstant`),
    `teST Co$()\\.*?[]+nStant`
  )
})

describe(`constantRequired`, () => {
  runMatching(
    `exact`, fragments.constantRequired(`teST Co$()\\.*?[]+nstant`),
    `teST Co$()\\.*?[]+nstant`,
    parsed => expect(parsed).toEqual(`teST Co$()\\.*?[]+nstant`)
  )
  runNotMatching(
    `spaces`, fragments.constantRequired(`teST Co$()\\.*?[]+nstant`),
    `                       `
  )
  runNotMatching(
    `too few spaces`, fragments.constantRequired(`teST Co$()\\.*?[]+nstant`),
    `                      `
  )
  runNotMatching(
    `too many spaces`, fragments.constantRequired(`teST Co$()\\.*?[]+nstant`),
    `                        `
  )
  runNotMatching(
    `leading space`, fragments.constantRequired(`teST Co$()\\.*?[]+nstant`),
    ` teST Co$()\\.*?[]+nstant`
  )
  runNotMatching(
    `trailing space`, fragments.constantRequired(`teST Co$()\\.*?[]+nstant`),
    `teST Co$()\\.*?[]+nstant `
  )
  runNotMatching(
    `leading character`, fragments.constantRequired(`teST Co$()\\.*?[]+nstant`),
    `FteST Co$()\\.*?[]+nstant`
  )
  runNotMatching(
    `trailing character`, fragments.constantRequired(`teST Co$()\\.*?[]+nstant`),
    `teST Co$()\\.*?[]+nstantF`
  )
  runNotMatching(
    `leading space`, fragments.constantRequired(`teST Co$()\\.*?[]+nstant`),
    ` teST Co$()\\.*?[]+nstant`
  )
  runNotMatching(
    `truncated start`, fragments.constantRequired(`teST Co$()\\.*?[]+nstant`),
    `eST Co$()\\.*?[]+nstant`
  )
  runNotMatching(
    `truncated end`, fragments.constantRequired(`teST Co$()\\.*?[]+nstant`),
    `teST Co$()\\.*?[]+nstan`
  )
  runNotMatching(
    `case mismatch`, fragments.constantRequired(`teST Co$()\\.*?[]+nstant`),
    `teST Co$()\\.*?[]+nStant`
  )
})

describe(`enumOptional`, () => {
  const fragment = fragments.enumOptional({
    "Another  Test  Constant": 7321,
    "teST Co$()\\.*?[]+nstant": 934234,
    "Yet Another Test Consta": 894759,
    "Final   Test   Constant": 373
  })
  runMatching(
    `exact`, fragment, `teST Co$()\\.*?[]+nstant`,
    parsed => expect(parsed).toEqual(934234)
  )
  runMatching(
    `spaces`, fragment, `                       `,
    parsed => expect(parsed).toBeNull()
  )
  runNotMatching(`too few spaces`, fragment, `                      `)
  runNotMatching(`too many spaces`, fragment, `                        `)
  runNotMatching(`leading space`, fragment, ` teST Co$()\\.*?[]+nstant`)
  runNotMatching(`trailing space`, fragment, `teST Co$()\\.*?[]+nstant `)
  runNotMatching(`leading character`, fragment, `FteST Co$()\\.*?[]+nstant`)
  runNotMatching(`trailing character`, fragment, `teST Co$()\\.*?[]+nstantF`)
  runNotMatching(`leading space`, fragment, ` teST Co$()\\.*?[]+nstant`)
  runNotMatching(`truncated start`, fragment, `eST Co$()\\.*?[]+nstant`)
  runNotMatching(`truncated end`, fragment, `teST Co$()\\.*?[]+nstan`)
  runNotMatching(`case mismatch`, fragment, `teST Co$()\\.*?[]+nStant`)
})

describe(`enumRequired`, () => {
  const fragment = fragments.enumRequired({
    "Another  Test  Constant": 7321,
    "teST Co$()\\.*?[]+nstant": 934234,
    "Yet Another Test Consta": 894759,
    "Final   Test   Constant": 373
  })
  runMatching(
    `exact`, fragment, `teST Co$()\\.*?[]+nstant`,
    parsed => expect(parsed).toEqual(934234)
  )
  runNotMatching(`spaces`, fragment, `                       `)
  runNotMatching(`too few spaces`, fragment, `                      `)
  runNotMatching(`too many spaces`, fragment, `                        `)
  runNotMatching(`leading space`, fragment, ` teST Co$()\\.*?[]+nstant`)
  runNotMatching(`trailing space`, fragment, `teST Co$()\\.*?[]+nstant `)
  runNotMatching(`leading character`, fragment, `FteST Co$()\\.*?[]+nstant`)
  runNotMatching(`trailing character`, fragment, `teST Co$()\\.*?[]+nstantF`)
  runNotMatching(`leading space`, fragment, ` teST Co$()\\.*?[]+nstant`)
  runNotMatching(`truncated start`, fragment, `eST Co$()\\.*?[]+nstant`)
  runNotMatching(`truncated end`, fragment, `teST Co$()\\.*?[]+nstan`)
  runNotMatching(`case mismatch`, fragment, `teST Co$()\\.*?[]+nStant`)
})

describe(`flags`, () => {
  const fragment = fragments.flags(6, {
    "$": 823947,
    "(": 37829,
    "[": 77648,
    "Q": 55267,
    "H": 8473,
    "O": 633,
    "N": 462,
    "V": 77238,
    "X": 55255,
    "Z": 992
  })
  runMatching(`empty`, fragment, `      `, parsed => expect(parsed).toEqual([]))
  runNotMatching(`too short`, fragment, `     `)
  runNotMatching(`too long`, fragment, `       `)
  runMatching(
    `one flag`,
    fragment,
    `  [   `,
    parsed => expect(parsed).toEqual([77648])
  )
  runMatching(
    `two flags`,
    fragment,
    `  [ $ `,
    parsed => expect(parsed).toEqual([77648, 823947])
  )
  runMatching(
    `full flags`,
    fragment,
    `N(VX$O`,
    parsed => expect(parsed).toEqual([462, 37829, 77238, 55255, 823947, 633])
  )
  runNotMatching(`too few full flags`, fragment, `N(VX$`)
  runNotMatching(`too many full flags`, fragment, `N(VX$OH`)
  runNotMatching(`unexpected flags`, fragment, `$IVOHQ`)
})

describe(`stringOptional`, () => {
  runMatching(
    `full length`, fragments.stringOptional(9), `World, Hi`,
    parsed => expect(parsed).toEqual(`World, Hi`)
  )
  runMatching(
    `trailing spaces filling the same space`, fragments.stringOptional(9),
    `Worl     `, parsed => expect(parsed).toEqual(`Worl`)
  )
  runMatching(
    `spaces filling the same space`, fragments.stringOptional(9), `         `,
    parsed => expect(parsed).toBeNull()
  )
  runNotMatching(
    `full length extra leading character`, fragments.stringOptional(9), `gWorld, Hi`
  )
  runNotMatching(
    `full length extra leading space`, fragments.stringOptional(9), ` World, Hi`
  )
  runNotMatching(
    `full length extra trailing character`, fragments.stringOptional(9),
    `World, Hig`
  )
  runNotMatching(
    `full length extra trailing space`, fragments.stringOptional(9), `World, Hi `
  )
  runNotMatching(
    `trailing spaces extra leading character`, fragments.stringOptional(9),
    `aWorl     `
  )
  runNotMatching(
    `trailing spaces extra leading space`, fragments.stringOptional(9),
    ` Worl     `
  )
  runNotMatching(
    `trailing spaces extra trailing character`, fragments.stringOptional(9),
    `Worl     a`
  )
  runNotMatching(
    `trailing spaces extra trailing space`, fragments.stringOptional(9),
    `Worl      `
  )
  runNotMatching(
    `spaces extra leading character`, fragments.stringOptional(9), `a         `
  )
  runNotMatching(
    `spaces extra trailing character`, fragments.stringOptional(9), `         a`
  )
  runNotMatching(`spaces extra space`, fragments.stringOptional(9), `          `)
  runNotMatching(
    `full length too short`, fragments.stringOptional(9), `World, H`
  )
  runNotMatching(
    `trailing spaces too short`, fragments.stringOptional(9),
    `Worl    `
  )
  runNotMatching(`spaces too short`, fragments.stringOptional(9), `        `)
})

describe(`stringRequired`, () => {
  runMatching(
    `full length`, fragments.stringRequired(9), `World, Hi`,
    parsed => expect(parsed).toEqual(`World, Hi`)
  )
  runMatching(
    `trailing spaces filling the same space`, fragments.stringRequired(9),
    `Worl     `, parsed => expect(parsed).toEqual(`Worl`)
  )
  runNotMatching(
    `spaces filling the same space`, fragments.stringRequired(9), `         `
  )
  runNotMatching(
    `full length extra leading character`, fragments.stringRequired(9), `gWorld, Hi`
  )
  runNotMatching(
    `full length extra leading space`, fragments.stringRequired(9), ` World, Hi`
  )
  runNotMatching(
    `full length extra trailing character`, fragments.stringRequired(9),
    `World, Hig`
  )
  runNotMatching(
    `full length extra trailing space`, fragments.stringRequired(9), `World, Hi `
  )
  runNotMatching(
    `trailing spaces extra leading character`, fragments.stringRequired(9),
    `aWorl     `
  )
  runNotMatching(
    `trailing spaces extra leading space`, fragments.stringRequired(9),
    ` Worl     `
  )
  runNotMatching(
    `trailing spaces extra trailing character`, fragments.stringRequired(9),
    `Worl     a`
  )
  runNotMatching(
    `trailing spaces extra trailing space`, fragments.stringRequired(9),
    `Worl      `
  )
  runNotMatching(
    `spaces extra leading character`, fragments.stringRequired(9), `a         `
  )
  runNotMatching(
    `spaces extra trailing character`, fragments.stringRequired(9), `         a`
  )
  runNotMatching(`spaces extra space`, fragments.stringRequired(9), `          `)
  runNotMatching(
    `full length too short`, fragments.stringRequired(9), `World, H`
  )
  runNotMatching(
    `trailing spaces too short`, fragments.stringRequired(9),
    `Worl    `
  )
  runNotMatching(`spaces too short`, fragments.stringRequired(9), `        `)
})

describe(`alphanumericOptional`, () => {
  runMatching(
    `populated`, fragments.alphanumericOptional(5), `4DU8A`,
    parsed => expect(parsed).toEqual(`4DU8A`)
  )
  runMatching(
    `populated`, fragments.alphanumericOptional(5), `     `,
    parsed => expect(parsed).toBeNull()
  )
  runNotMatching(`lower case`, fragments.alphanumericOptional(5), `4dU8A`)
  runNotMatching(`space`, fragments.alphanumericOptional(5), `4 U8A`)
  runNotMatching(`symbol`, fragments.alphanumericOptional(5), `4$U8A`)
  runNotMatching(`populated too short`, fragments.alphanumericOptional(5), `4DU8`)
  runNotMatching(`populated too long`, fragments.alphanumericOptional(5), `4DU8A5`)
  runNotMatching(`empty too short`, fragments.alphanumericOptional(5), `    `)
  runNotMatching(`empty too long`, fragments.alphanumericOptional(5), `      `)
})

describe(`alphanumericRequired`, () => {
  runMatching(
    `populated`, fragments.alphanumericRequired(5), `4DU8A`,
    parsed => expect(parsed).toEqual(`4DU8A`)
  )
  runNotMatching(`empty`, fragments.alphanumericRequired(5), `     `)
  runNotMatching(`lower case`, fragments.alphanumericRequired(5), `4dU8A`)
  runNotMatching(`space`, fragments.alphanumericRequired(5), `4 U8A`)
  runNotMatching(`symbol`, fragments.alphanumericRequired(5), `4$U8A`)
  runNotMatching(`populated too short`, fragments.alphanumericRequired(5), `4DU8`)
  runNotMatching(`populated too long`, fragments.alphanumericRequired(5), `4DU8A5`)
  runNotMatching(`empty too short`, fragments.alphanumericRequired(5), `    `)
  runNotMatching(`empty too long`, fragments.alphanumericRequired(5), `      `)
})

describe(`unsignedOptional`, () => {
  runMatching(
    `full length`, fragments.unsignedOptional(4), `7362`,
    parsed => expect(parsed).toEqual(7362)
  )
  runMatching(
    `partial length left`, fragments.unsignedOptional(4), `73  `,
    parsed => expect(parsed).toEqual(73)
  )
  runMatching(
    `partial length right`, fragments.unsignedOptional(4), `  73`,
    parsed => expect(parsed).toEqual(73)
  )
  runMatching(
    `spaces`, fragments.unsignedOptional(4), `    `,
    parsed => expect(parsed).toBeNull()
  )
  runNotMatching(
    `full length containing letter`, fragments.unsignedOptional(4), `7a62`
  )
  runNotMatching(
    `full length containing space`, fragments.unsignedOptional(4), `7 62`
  )
  runNotMatching(
    `full length containing symbol`, fragments.unsignedOptional(4), `7$62`
  )
  runNotMatching(
    `partial length left containing letter`, fragments.unsignedOptional(4), `7a6 `
  )
  runNotMatching(
    `partial length left containing space`, fragments.unsignedOptional(4), `7 6 `
  )
  runNotMatching(
    `partial length left containing symbol`, fragments.unsignedOptional(4), `7$6 `
  )
  runNotMatching(
    `partial length right containing letter`, fragments.unsignedOptional(4), ` 7a6`
  )
  runNotMatching(
    `partial length right containing space`, fragments.unsignedOptional(4), ` 7 6`
  )
  runNotMatching(
    `partial length right containing symbol`, fragments.unsignedOptional(4), ` 7$6`
  )
  runNotMatching(`too few digits`, fragments.unsignedOptional(4), `736`)
  runNotMatching(`too many digits`, fragments.unsignedOptional(4), `73628`)
  runNotMatching(`too few spaces`, fragments.unsignedOptional(4), `   `)
  runNotMatching(`too many spaces`, fragments.unsignedOptional(4), `     `)
  runNotMatching(`too few partial left`, fragments.unsignedOptional(4), `73 `)
  runNotMatching(`too few partial right`, fragments.unsignedOptional(4), ` 73`)
  runNotMatching(`too many partial left`, fragments.unsignedOptional(4), `73   `)
  runNotMatching(`too many partial right`, fragments.unsignedOptional(4), `   73`)
})

describe(`unsignedRequired`, () => {
  runMatching(
    `full length`, fragments.unsignedRequired(4), `7362`,
    parsed => expect(parsed).toEqual(7362)
  )
  runMatching(
    `partial length left`, fragments.unsignedRequired(4), `73  `,
    parsed => expect(parsed).toEqual(73)
  )
  runMatching(
    `partial length right`, fragments.unsignedRequired(4), `  73`,
    parsed => expect(parsed).toEqual(73)
  )
  runNotMatching(`spaces`, fragments.unsignedRequired(4), `    `)
  runNotMatching(
    `full length containing letter`, fragments.unsignedRequired(4), `7a62`
  )
  runNotMatching(
    `full length containing space`, fragments.unsignedRequired(4), `7 62`
  )
  runNotMatching(
    `full length containing symbol`, fragments.unsignedRequired(4), `7$62`
  )
  runNotMatching(
    `partial length left containing letter`, fragments.unsignedRequired(4), `7a6 `
  )
  runNotMatching(
    `partial length left containing space`, fragments.unsignedRequired(4), `7 6 `
  )
  runNotMatching(
    `partial length left containing symbol`, fragments.unsignedRequired(4), `7$6 `
  )
  runNotMatching(
    `partial length right containing letter`, fragments.unsignedRequired(4), ` 7a6`
  )
  runNotMatching(
    `partial length right containing space`, fragments.unsignedRequired(4), ` 7 6`
  )
  runNotMatching(
    `partial length right containing symbol`, fragments.unsignedRequired(4), ` 7$6`
  )
  runNotMatching(`too few digits`, fragments.unsignedRequired(4), `736`)
  runNotMatching(`too many digits`, fragments.unsignedRequired(4), `73628`)
  runNotMatching(`too few spaces`, fragments.unsignedRequired(4), `   `)
  runNotMatching(`too many spaces`, fragments.unsignedRequired(4), `     `)
  runNotMatching(`too few partial left`, fragments.unsignedRequired(4), `73 `)
  runNotMatching(`too few partial right`, fragments.unsignedRequired(4), ` 73`)
  runNotMatching(`too many partial left`, fragments.unsignedRequired(4), `73   `)
  runNotMatching(`too many partial right`, fragments.unsignedRequired(4), `   73`)
})
