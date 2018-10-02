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
  runNotMatching(`too few digits`, index.yyyymmddOptional, `20231228`)
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
