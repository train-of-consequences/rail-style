import * as fragments from "@rail-style/fragments"
import parser from "./index.coverage"

const handledCallback = jasmine.createSpy(`handledCallback`)
const onUnknown = jasmine.createSpy(`onUnknown`)

afterEach(() => {
  handledCallback.calls.reset()
  onUnknown.calls.reset()
})

const instance = parser({
  unhandled: [
    { identifier: fragments.constantRequired(`UNHANDLED`) },
    { a: fragments.unsignedRequired(2) },
    { b: fragments.unsignedRequired(2) },
    { c: fragments.unsignedRequired(2) },
    { d: fragments.unsignedRequired(2) },
    { e: fragments.unsignedRequired(2) }
  ],
  handled: [
    { identifier: fragments.constantRequired(`HANDLED`) },
    { a: fragments.unsignedRequired(2) },
    { b: fragments.unsignedRequired(2) },
    { c: fragments.unsignedRequired(2) },
    { d: fragments.unsignedRequired(2) },
    { e: fragments.unsignedRequired(2) }
  ]
}, `Test Context`, {
    handled: {
      fragments: [`d`, `b`],
      callback: handledCallback
    }
  }, onUnknown)

const runDoesNothing = (description, input) => describe(description, () => {
  beforeEach(() => instance(input))
  it(`does not handle the line`, () => expect(handledCallback).not.toHaveBeenCalled())
  it(`does not report the line as unknown`, () => expect(onUnknown).not.toHaveBeenCalled())
})

const runUnknown = (description, input) => describe(description, () => {
  beforeEach(() => instance(input))
  it(`does not handle the line`, () => expect(handledCallback).not.toHaveBeenCalled())
  it(`reports the line as unknown once`, () => expect(onUnknown).toHaveBeenCalledTimes(1))
  it(`reports the line as unknown using the context`, () => expect(onUnknown).toHaveBeenCalledWith(`Test Context`, jasmine.anything()))
  it(`reports the line as unknown`, () => expect(onUnknown).toHaveBeenCalledWith(jasmine.anything(), input))
})

runDoesNothing(`when an empty line is given`, ``)
runDoesNothing(
  `when a line containing only white space is given`,
  `  \n  \t  \r   `
)

runUnknown(
  `when a line which would match but has leading spaces is given`,
  ` HANDLED3928467319`
)

runUnknown(
  `when a line which would match but has leading characters is given`,
  `qHANDLED3928467319`
)

runUnknown(
  `when a line which would match but has trailing spaces is given`,
  `HANDLED3928467319 `
)

runUnknown(
  `when a line which would match but has trailing characters is given`,
  `HANDLED3928467319q`
)

runUnknown(
  `when a line which matches everywhere but an unused fragment is given`,
  `HANDLED3q28467319`
)

runUnknown(
  `when a line which matches everywhere but a used fragment is given`,
  `HANDLED39q8467319`
)

describe(`when a line which matches is given`, () => {
  beforeEach(() => instance(`HANDLED3928467319`))
  it(`does not handles the line once`, () => expect(handledCallback).toHaveBeenCalledTimes(1))
  it(`handles the line with the context`, () => expect(handledCallback).toHaveBeenCalledWith(`Test Context`, jasmine.anything(), jasmine.anything()))
  it(`does not handles the line with the fragments`, () => expect(handledCallback).toHaveBeenCalledWith(jasmine.anything(), `73`, `28`))
  it(`does not report the line as unknown`, () => expect(onUnknown).not.toHaveBeenCalled())
})

runUnknown(
  `when a line which would match something unhandled but has leading spaces is given`,
  ` UNHANDLED3928467319`
)

runUnknown(
  `when a line which would match something unhandled but has leading characters is given`,
  `UNHANDLED3928467319 `
)

runUnknown(
  `when a line which would match something unhandled but has trailing spaces is given`,
  `qUNHANDLED3928467319`
)

runUnknown(
  `when a line which would match something unhandled but has trailing characters is given`,
  `UNHANDLED3928467319q`
)

runUnknown(
  `when a line which matches something unhandled partway through is given`,
  `UNHANDLED392q467319`
)

describe(`when a line which matches something unhandled is given`, () => {
  beforeEach(() => instance(`UNHANDLED3928467319`))
  it(`does not handle the line`, () => expect(handledCallback).not.toHaveBeenCalled())
  it(`does not report the line as unknown`, () => expect(onUnknown).not.toHaveBeenCalled())
})
