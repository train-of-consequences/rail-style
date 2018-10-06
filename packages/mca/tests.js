import moment from "moment-timezone"
import "jasmine-expect-moment"
import mca from "./index.coverage"
import parser from "@rail-style/parser"

const run = (lineName, fragmentName, line, verifyParsed) => describe(`${lineName} ${fragmentName}`, () => {
  let matched
  let parsed
  beforeEach(() => {
    matched = false
    parsed = null
    const handlers = {}
    handlers[lineName] = {
      fragments: [fragmentName],
      callback: (context, fragment) => {
        matched = true
        parsed = fragment
      }
    }
    parser(mca, null, handlers, () => { })(line)
  })
  it(`matches`, () => expect(matched).toBeTruthy())
  it(`is parsed`, () => verifyParsed(parsed))
})

run(
  `headerRecord`, `recordIdentity`,
  `HDTest  File  Identity2308161627T  F  R       FO190217240726                    `,
  recordIdentity => expect(recordIdentity).toEqual(`HD`)
)

run(
  `headerRecord`, `fileIdentity`,
  `HDTest  File  Identity2308161627T  F  R       FO190217240726                    `,
  fileIdentity => expect(fileIdentity).toEqual(`Test  File  Identity`)
)

run(
  `headerRecord`, `dateTimeOfExtract`,
  `HDTest  File  Identity2308161627T  F  R       FO190217240726                    `,
  fileIdentity => expect(fileIdentity).toBeSameMoment(moment(`2016-08-23T16:27:00+01:00`))
)

run(
  `headerRecord`, `currentFileReference`,
  `HDTest  File  Identity2308161627T  F  R       FO190217240726                    `,
  currentFileReference => expect(currentFileReference).toEqual(`T  F  R`)
)

run(
  `headerRecord`, `lastFileReference`,
  `HDTest  File  Identity2308161627T  F  R       FO190217240726                    `,
  lastFileReference => expect(lastFileReference).toBeNull()
)

run(
  `headerRecord`, `lastFileReference`,
  `HDTest  File  Identity2308161627T  F  RT L F RFO190217240726                    `,
  lastFileReference => expect(lastFileReference).toEqual(`T L F R`)
)

run(
  `headerRecord`, `updateIndicator`,
  `HDTest  File  Identity2308161627T  F  R       UO190217240726                    `,
  updateIndicator => expect(updateIndicator).toEqual(`update`)
)

run(
  `headerRecord`, `updateIndicator`,
  `HDTest  File  Identity2308161627T  F  R       FO190217240726                    `,
  updateIndicator => expect(updateIndicator).toEqual(`full`)
)

run(
  `headerRecord`, `updateIndicator`,
  `HDTest  File  Identity2308161627T  F  R       FO190217240726                    `,
  updateIndicator => expect(updateIndicator).toEqual(`full`)
)

run(
  `headerRecord`, `version`,
  `HDTest  File  Identity2308161627T  F  R       FO190217240726                    `,
  version => expect(version).toEqual(`O`)
)

run(
  `headerRecord`, `extractStartDate`,
  `HDTest  File  Identity2308161627T  F  R       FO190217240726                    `,
  extractStartDate => expect(extractStartDate).toBeSameMoment(moment(`2017-02-19T00:00:00+00:00`))
)

run(
  `headerRecord`, `extractEndDate`,
  `HDTest  File  Identity2308161627T  F  R       FO190217240726                    `,
  extractEndDate => expect(extractEndDate).toBeSameMoment(moment(`2026-07-24T00:00:00+01:00`))
)

run(
  `headerRecord`, `spare`,
  `HDTest  File  Identity2308161627T  F  R       FO190217240726                    `,
  spare => expect(spare).toBeNull()
)

run(
  `headerRecord`, `spare`,
  `HDTest  File  Identity2308161627T  F  R       FO190217240726Test SpareCharacters`,
  spare => expect(spare).toEqual(`Test SpareCharacters`)
)

run(
  `basicSchedule`, `recordIdentity`,
  `BSNTTRUID1806201809101011011            C                                      C`,
  recordIdentity => expect(recordIdentity).toEqual(`BS`)
)

run(
  `basicSchedule`, `transactionType`,
  `BSNTTRUID1806201809101011011            C                                      C`,
  transactionType => expect(transactionType).toEqual(`new`)
)

run(
  `basicSchedule`, `transactionType`,
  `BSDTTRUID1806201809101011011            C                                      C`,
  transactionType => expect(transactionType).toEqual(`delete`)
)

run(
  `basicSchedule`, `transactionType`,
  `BSRTTRUID1806201809101011011            C                                      C`,
  transactionType => expect(transactionType).toEqual(`revise`)
)

run(
  `basicSchedule`, `trainUid`,
  `BSNTTRUID1806201809101011011            C                                      C`,
  trainUid => expect(trainUid).toEqual(`TTRUID`)
)

run(
  `basicSchedule`, `dateRunsFrom`,
  `BSNTTRUID1806201809101011011            C                                      C`,
  dateRunsFrom => expect(dateRunsFrom).toBeSameMoment(moment(`2018-06-20T00:00:00+01:00`))
)

run(
  `basicSchedule`, `dateRunsTo`,
  `BSNTTRUID1806201809101011011            C                                      C`,
  dateRunsTo => expect(dateRunsTo).toBeSameMoment(moment(`2018-09-10T00:00:00+01:00`))
)

run(
  `basicSchedule`, `daysRun`,
  `BSNTTRUID1806201809101011011            C                                      C`,
  daysRun => expect(daysRun).toEqual(`1011011`)
)

run(
  `basicSchedule`, `bankHolidayRunning`,
  `BSNTTRUID1806201809101011011            C                                      C`,
  bankHolidayRunning => expect(bankHolidayRunning).toBeNull()
)

run(
  `basicSchedule`, `bankHolidayRunning`,
  `BSNTTRUID1806201809101011011X           C                                      C`,
  bankHolidayRunning => expect(bankHolidayRunning).toEqual(`X`)
)

run(
  `basicSchedule`, `trainStatus`,
  `BSNTTRUID1806201809101011011            C                                      C`,
  trainStatus => expect(trainStatus).toBeNull()
)

run(
  `basicSchedule`, `trainStatus`,
  `BSNTTRUID1806201809101011011 Q          C                                      C`,
  trainStatus => expect(trainStatus).toEqual(`Q`)
)

run(
  `basicSchedule`, `trainCategory`,
  `BSNTTRUID1806201809101011011            C                                      C`,
  trainCategory => expect(trainCategory).toBeNull()
)

run(
  `basicSchedule`, `trainCategory`,
  `BSNTTRUID1806201809101011011  QR        C                                      C`,
  trainCategory => expect(trainCategory).toEqual(`QR`)
)

run(
  `basicSchedule`, `trainIdentity`,
  `BSNTTRUID1806201809101011011            C                                      C`,
  trainIdentity => expect(trainIdentity).toBeNull()
)

run(
  `basicSchedule`, `trainIdentity`,
  `BSNTTRUID1806201809101011011    QREB    C                                      C`,
  trainIdentity => expect(trainIdentity).toEqual(`QREB`)
)

run(
  `basicSchedule`, `headcode`,
  `BSNTTRUID1806201809101011011            C                                      C`,
  headcode => expect(headcode).toBeNull()
)

run(
  `basicSchedule`, `headcode`,
  `BSNTTRUID1806201809101011011        QREBC                                      C`,
  headcode => expect(headcode).toEqual(`QREB`)
)

run(
  `basicSchedule`, `courseIndicator`,
  `BSNTTRUID1806201809101011011            C                                      C`,
  courseIndicator => expect(courseIndicator).toEqual(`C`)
)

run(
  `basicSchedule`, `profitCentreCodeTrainServiceCode`,
  `BSNTTRUID1806201809101011011            C73628191                              C`,
  profitCentreCodeTrainServiceCode => expect(profitCentreCodeTrainServiceCode).toEqual(73628191)
)

run(
  `basicSchedule`, `businessSector`,
  `BSNTTRUID1806201809101011011            C                                      C`,
  businessSector => expect(businessSector).toBeNull()
)

run(
  `basicSchedule`, `businessSector`,
  `BSNTTRUID1806201809101011011            C        Q                             C`,
  businessSector => expect(businessSector).toEqual(`Q`)
)

run(
  `basicSchedule`, `powerType`,
  `BSNTTRUID1806201809101011011            C                                      C`,
  powerType => expect(powerType).toBeNull()
)

run(
  `basicSchedule`, `powerType`,
  `BSNTTRUID1806201809101011011            C         QBE                          C`,
  powerType => expect(powerType).toEqual(`QBE`)
)

run(
  `basicSchedule`, `timingLoad`,
  `BSNTTRUID1806201809101011011            C                                      C`,
  timingLoad => expect(timingLoad).toBeNull()
)

run(
  `basicSchedule`, `timingLoad`,
  `BSNTTRUID1806201809101011011            C            QBRE                      C`,
  timingLoad => expect(timingLoad).toEqual(`QBRE`)
)

run(
  `basicSchedule`, `speed`,
  `BSNTTRUID1806201809101011011            C                                      C`,
  speed => expect(speed).toBeNull()
)

run(
  `basicSchedule`, `speed`,
  `BSNTTRUID1806201809101011011            C                731                   C`,
  speed => expect(speed).toEqual(731)
)

run(
  `basicSchedule`, `operatingChars`,
  `BSNTTRUID1806201809101011011            C                                      C`,
  operatingChars => expect(operatingChars).toBeNull()
)

run(
  `basicSchedule`, `operatingChars`,
  `BSNTTRUID1806201809101011011            C                   TESTOC             C`,
  operatingChars => expect(operatingChars).toEqual(`TESTOC`)
)

run(
  `basicSchedule`, `trainClass`,
  `BSNTTRUID1806201809101011011            C                                      C`,
  trainClass => expect(trainClass).toBeNull()
)

run(
  `basicSchedule`, `trainClass`,
  `BSNTTRUID1806201809101011011            C                         Q            C`,
  trainClass => expect(trainClass).toEqual(`Q`)
)

run(
  `basicSchedule`, `sleepers`,
  `BSNTTRUID1806201809101011011            C                                      C`,
  sleepers => expect(sleepers).toBeNull()
)

run(
  `basicSchedule`, `sleepers`,
  `BSNTTRUID1806201809101011011            C                          Q           C`,
  sleepers => expect(sleepers).toEqual(`Q`)
)

run(
  `basicSchedule`, `reservations`,
  `BSNTTRUID1806201809101011011            C                                      C`,
  reservations => expect(reservations).toBeNull()
)

run(
  `basicSchedule`, `reservations`,
  `BSNTTRUID1806201809101011011            C                           Q          C`,
  reservations => expect(reservations).toEqual(`Q`)
)

run(
  `basicSchedule`, `connectIndicator`,
  `BSNTTRUID1806201809101011011            C                                      C`,
  connectIndicator => expect(connectIndicator).toBeNull()
)

run(
  `basicSchedule`, `connectIndicator`,
  `BSNTTRUID1806201809101011011            C                            Q         C`,
  connectIndicator => expect(connectIndicator).toEqual(`Q`)
)

run(
  `basicSchedule`, `cateringCode`,
  `BSNTTRUID1806201809101011011            C                                      C`,
  cateringCode => expect(cateringCode).toBeNull()
)

run(
  `basicSchedule`, `cateringCode`,
  `BSNTTRUID1806201809101011011            C                             QBER     C`,
  cateringCode => expect(cateringCode).toEqual(`QBER`)
)

run(
  `basicSchedule`, `serviceBranding`,
  `BSNTTRUID1806201809101011011            C                                      C`,
  serviceBranding => expect(serviceBranding).toBeNull()
)

run(
  `basicSchedule`, `serviceBranding`,
  `BSNTTRUID1806201809101011011            C                                 QBER C`,
  serviceBranding => expect(serviceBranding).toEqual(`QBER`)
)

run(
  `basicSchedule`, `spare`,
  `BSNTTRUID1806201809101011011            C                                      C`,
  spare => expect(spare).toBeNull()
)

run(
  `basicSchedule`, `spare`,
  `BSNTTRUID1806201809101011011            C                                     QC`,
  spare => expect(spare).toEqual(`Q`)
)

run(
  `basicSchedule`, `stpIndicator`,
  `BSNTTRUID1806201809101011011            C                                      C`,
  stpIndicator => expect(stpIndicator).toEqual(`cancellation`)
)

run(
  `basicSchedule`, `stpIndicator`,
  `BSNTTRUID1806201809101011011            C                                      N`,
  stpIndicator => expect(stpIndicator).toEqual(`new`)
)

run(
  `basicSchedule`, `stpIndicator`,
  `BSNTTRUID1806201809101011011            C                                      O`,
  stpIndicator => expect(stpIndicator).toEqual(`overlay`)
)

run(
  `basicSchedule`, `stpIndicator`,
  `BSNTTRUID1806201809101011011            C                                      P`,
  stpIndicator => expect(stpIndicator).toEqual(`permanent`)
)

run(
  `basicScheduleExtra`, `recordIdentity`,
  `BX         HQY                                                                  `,
  recordIdentity => expect(recordIdentity).toEqual(`BX`)
)

run(
  `basicScheduleExtra`, `tractionClass`,
  `BX         HQY                                                                  `,
  tractionClass => expect(tractionClass).toBeNull()
)

run(
  `basicScheduleExtra`, `tractionClass`,
  `BXTTRC     HQY                                                                  `,
  tractionClass => expect(tractionClass).toEqual(`TTRC`)
)

run(
  `basicScheduleExtra`, `uicCode`,
  `BX         HQY                                                                  `,
  uicCode => expect(uicCode).toBeNull()
)

run(
  `basicScheduleExtra`, `uicCode`,
  `BX    3HA9 HQY                                                                  `,
  uicCode => expect(uicCode).toEqual(`3HA9`)
)

run(
  `basicScheduleExtra`, `uicCodeSpare`,
  `BX         HQY                                                                  `,
  uicCodeSpare => expect(uicCodeSpare).toBeNull()
)

run(
  `basicScheduleExtra`, `uicCodeSpare`,
  `BX        QHQY                                                                  `,
  uicCodeSpare => expect(uicCodeSpare).toEqual(`Q`)
)

run(
  `basicScheduleExtra`, `atocCode`,
  `BX         HQY                                                                  `,
  atocCode => expect(atocCode).toEqual(`HQ`)
)

run(
  `basicScheduleExtra`, `applicableTimetableCode`,
  `BX         HQY                                                                  `,
  applicableTimetableCode => expect(applicableTimetableCode).toEqual(`Y`)
)

run(
  `basicScheduleExtra`, `retailServiceId`,
  `BX         HQY                                                                  `,
  retailServiceId => expect(retailServiceId).toBeNull()
)

run(
  `basicScheduleExtra`, `retailServiceId`,
  `BX         HQYAX837291                                                          `,
  retailServiceId => expect(retailServiceId).toEqual(`AX837291`)
)

run(
  `basicScheduleExtra`, `source`,
  `BX         HQY                                                                  `,
  source => expect(source).toBeNull()
)

run(
  `basicScheduleExtra`, `source`,
  `BX         HQY        Q                                                         `,
  source => expect(source).toEqual(`Q`)
)

run(
  `basicScheduleExtra`, `spare`,
  `BX         HQY                                                                  `,
  spare => expect(spare).toBeNull()
)

run(
  `basicScheduleExtra`, `spare`,
  `BX         HQY         Test Spare Character Content Which Fills The Remainder...`,
  spare => expect(spare).toEqual(`Test Spare Character Content Which Fills The Remainder...`)
)

run(
  `originLocation`, `recordIdentity`,
  `LOLOCATION1523 1841                                                             `,
  recordIdentity => expect(recordIdentity).toEqual(`LO`)
)

run(
  `originLocation`, `location`,
  `LOLOCATION1523 1841                                                             `,
  location => expect(location).toEqual(`LOCATION`)
)

run(
  `originLocation`, `scheduledDepartureTime`,
  `LOLOCATION1523 1841                                                             `,
  scheduledDepartureTime => expect(scheduledDepartureTime).toBeSameMoment(moment(`0001-01-01T15:23:00+00:00`))
)

run(
  `originLocation`, `scheduledDepartureTimeSpare`,
  `LOLOCATION1523 1841                                                             `,
  scheduledDepartureTimeSpare => expect(scheduledDepartureTimeSpare).toBeNull()
)

run(
  `originLocation`, `scheduledDepartureTimeSpare`,
  `LOLOCATION1523Q1841                                                             `,
  scheduledDepartureTimeSpare => expect(scheduledDepartureTimeSpare).toEqual(`Q`)
)

run(
  `originLocation`, `publicDepartureTime`,
  `LOLOCATION1523 1841                                                             `,
  publicDepartureTime => expect(publicDepartureTime).toBeSameMoment(moment(`0001-01-01T18:41:00+00:00`))
)

run(
  `originLocation`, `platform`,
  `LOLOCATION1523 1841                                                             `,
  platform => expect(platform).toBeNull()
)

run(
  `originLocation`, `platform`,
  `LOLOCATION1523 1841PLT                                                          `,
  platform => expect(platform).toEqual(`PLT`)
)

run(
  `originLocation`, `line`,
  `LOLOCATION1523 1841                                                             `,
  line => expect(line).toBeNull()
)

run(
  `originLocation`, `line`,
  `LOLOCATION1523 1841   LNE                                                       `,
  line => expect(line).toEqual(`LNE`)
)

run(
  `originLocation`, `engineeringAllowance`,
  `LOLOCATION1523 1841                                                             `,
  engineeringAllowance => expect(engineeringAllowance).toBeNull()
)

run(
  `originLocation`, `engineeringAllowance`,
  `LOLOCATION1523 1841      EA                                                     `,
  engineeringAllowance => expect(engineeringAllowance).toEqual(`EA`)
)

run(
  `originLocation`, `pathingAllowance`,
  `LOLOCATION1523 1841                                                             `,
  pathingAllowance => expect(pathingAllowance).toBeNull()
)

run(
  `originLocation`, `pathingAllowance`,
  `LOLOCATION1523 1841        PA                                                   `,
  pathingAllowance => expect(pathingAllowance).toEqual(`PA`)
)

run(
  `originLocation`, `pathingAllowance`,
  `LOLOCATION1523 1841                                                             `,
  pathingAllowance => expect(pathingAllowance).toBeNull()
)

run(
  `originLocation`, `activity`,
  `LOLOCATION1523 1841          TESTACTIVITY                                       `,
  activity => expect(activity).toEqual(`TESTACTIVITY`)
)

run(
  `originLocation`, `performanceAllowance`,
  `LOLOCATION1523 1841                                                             `,
  performanceAllowance => expect(performanceAllowance).toBeNull()
)

run(
  `originLocation`, `performanceAllowance`,
  `LOLOCATION1523 1841                      PA                                     `,
  performanceAllowance => expect(performanceAllowance).toEqual(`PA`)
)

run(
  `originLocation`, `spare`,
  `LOLOCATION1523 1841                                                             `,
  spare => expect(spare).toBeNull()
)

run(
  `originLocation`, `spare`,
  `LOLOCATION1523 1841                        Test Spare Characters Filling TheRest`,
  spare => expect(spare).toEqual(`Test Spare Characters Filling TheRest`)
)

run(
  `intermediateLocation`, `recordIdentity`,
  `LILOCATION               14251718                                               `,
  recordIdentity => expect(recordIdentity).toEqual(`LI`)
)

run(
  `intermediateLocation`, `location`,
  `LILOCATION               14251718                                               `,
  location => expect(location).toEqual(`LOCATION`)
)

run(
  `intermediateLocation`, `scheduledArrivalTime`,
  `LILOCATION               14251718                                               `,
  scheduledArrivalTime => expect(scheduledArrivalTime).toBeNull()
)

run(
  `intermediateLocation`, `scheduledArrivalTime`,
  `LILOCATION0845           14251718                                               `,
  scheduledArrivalTime => expect(scheduledArrivalTime).toBeSameMoment(moment(`0001-01-01T08:45:00+00:00`))
)

run(
  `intermediateLocation`, `scheduledArrivalTimeSpare`,
  `LILOCATION               14251718                                               `,
  scheduledArrivalTimeSpare => expect(scheduledArrivalTimeSpare).toBeNull()
)

run(
  `intermediateLocation`, `scheduledArrivalTimeSpare`,
  `LILOCATION    Q          14251718                                               `,
  scheduledArrivalTimeSpare => expect(scheduledArrivalTimeSpare).toEqual(`Q`)
)

run(
  `intermediateLocation`, `scheduledDepartureTime`,
  `LILOCATION               14251718                                               `,
  scheduledDepartureTime => expect(scheduledDepartureTime).toBeNull()
)

run(
  `intermediateLocation`, `scheduledDepartureTime`,
  `LILOCATION     0845      14251718                                               `,
  scheduledDepartureTime => expect(scheduledDepartureTime).toBeSameMoment(moment(`0001-01-01T08:45:00+00:00`))
)

run(
  `intermediateLocation`, `scheduledDepartureTimeSpare`,
  `LILOCATION               14251718                                               `,
  scheduledDepartureTimeSpare => expect(scheduledDepartureTimeSpare).toBeNull()
)

run(
  `intermediateLocation`, `scheduledDepartureTimeSpare`,
  `LILOCATION         Q     14251718                                               `,
  scheduledDepartureTimeSpare => expect(scheduledDepartureTimeSpare).toEqual(`Q`)
)

run(
  `intermediateLocation`, `scheduledPass`,
  `LILOCATION               14251718                                               `,
  scheduledPass => expect(scheduledPass).toBeNull()
)

run(
  `intermediateLocation`, `scheduledPass`,
  `LILOCATION          0845 14251718                                               `,
  scheduledPass => expect(scheduledPass).toBeSameMoment(moment(`0001-01-01T08:45:00+00:00`))
)

run(
  `intermediateLocation`, `scheduledPassSpare`,
  `LILOCATION               14251718                                               `,
  scheduledPassSpare => expect(scheduledPassSpare).toBeNull()
)

run(
  `intermediateLocation`, `scheduledPassSpare`,
  `LILOCATION              Q14251718                                               `,
  scheduledPassSpare => expect(scheduledPassSpare).toEqual(`Q`)
)

run(
  `intermediateLocation`, `publicArrival`,
  `LILOCATION               14251718                                               `,
  publicArrival => expect(publicArrival).toBeSameMoment(moment(`0001-01-01T14:25:00+00:00`))
)

run(
  `intermediateLocation`, `publicDeparture`,
  `LILOCATION               14251718                                               `,
  publicDeparture => expect(publicDeparture).toBeSameMoment(moment(`0001-01-01T17:18:00+00:00`))
)

run(
  `intermediateLocation`, `platform`,
  `LILOCATION               14251718                                               `,
  platform => expect(platform).toBeNull()
)

run(
  `intermediateLocation`, `platform`,
  `LILOCATION               14251718PLT                                            `,
  platform => expect(platform).toEqual(`PLT`)
)

run(
  `intermediateLocation`, `line`,
  `LILOCATION               14251718                                               `,
  line => expect(line).toBeNull()
)

run(
  `intermediateLocation`, `line`,
  `LILOCATION               14251718   LNE                                         `,
  line => expect(line).toEqual(`LNE`)
)

run(
  `intermediateLocation`, `path`,
  `LILOCATION               14251718                                               `,
  path => expect(path).toBeNull()
)

run(
  `intermediateLocation`, `path`,
  `LILOCATION               14251718      PTH                                      `,
  path => expect(path).toEqual(`PTH`)
)

run(
  `intermediateLocation`, `activity`,
  `LILOCATION               14251718                                               `,
  activity => expect(activity).toBeNull()
)

run(
  `intermediateLocation`, `activity`,
  `LILOCATION               14251718         TESTACTIVITY                          `,
  activity => expect(activity).toEqual(`TESTACTIVITY`)
)

run(
  `intermediateLocation`, `engineeringAllowance`,
  `LILOCATION               14251718                                               `,
  engineeringAllowance => expect(engineeringAllowance).toBeNull()
)

run(
  `intermediateLocation`, `engineeringAllowance`,
  `LILOCATION               14251718                     EA                        `,
  engineeringAllowance => expect(engineeringAllowance).toEqual(`EA`)
)

run(
  `intermediateLocation`, `pathingAllowance`,
  `LILOCATION               14251718                                               `,
  pathingAllowance => expect(pathingAllowance).toBeNull()
)

run(
  `intermediateLocation`, `pathingAllowance`,
  `LILOCATION               14251718                       PA                      `,
  pathingAllowance => expect(pathingAllowance).toEqual(`PA`)
)

run(
  `intermediateLocation`, `performanceAllowance`,
  `LILOCATION               14251718                                               `,
  performanceAllowance => expect(performanceAllowance).toBeNull()
)

run(
  `intermediateLocation`, `performanceAllowance`,
  `LILOCATION               14251718                         PA                    `,
  performanceAllowance => expect(performanceAllowance).toEqual(`PA`)
)

run(
  `intermediateLocation`, `spare`,
  `LILOCATION               14251718                                               `,
  spare => expect(spare).toBeNull()
)

run(
  `intermediateLocation`, `spare`,
  `LILOCATION               14251718                           Test SpareCharacters`,
  spare => expect(spare).toEqual(`Test SpareCharacters`)
)


run(
  `changesEnRoute`, `recordIdentity`,
  `CRLOCATION          C                                                           `,
  recordIdentity => expect(recordIdentity).toEqual(`CR`)
)

run(
  `changesEnRoute`, `location`,
  `CRLOCATION          C                                                           `,
  location => expect(location).toEqual(`LOCATION`)
)

run(
  `changesEnRoute`, `trainCategory`,
  `CRLOCATION          C                                                           `,
  trainCategory => expect(trainCategory).toBeNull()
)

run(
  `changesEnRoute`, `trainCategory`,
  `CRLOCATIONTC        C                                                           `,
  trainCategory => expect(trainCategory).toEqual(`TC`)
)

run(
  `changesEnRoute`, `trainIdentity`,
  `CRLOCATION          C                                                           `,
  trainIdentity => expect(trainIdentity).toBeNull()
)

run(
  `changesEnRoute`, `trainIdentity`,
  `CRLOCATION  TRID    C                                                           `,
  trainIdentity => expect(trainIdentity).toEqual(`TRID`)
)

run(
  `changesEnRoute`, `headcode`,
  `CRLOCATION          C                                                           `,
  headcode => expect(headcode).toBeNull()
)

run(
  `changesEnRoute`, `headcode`,
  `CRLOCATION      HDCDC                                                           `,
  headcode => expect(headcode).toEqual(`HDCD`)
)

run(
  `changesEnRoute`, `courseIndicator`,
  `CRLOCATION          C                                                           `,
  courseIndicator => expect(courseIndicator).toEqual(`C`)
)

run(
  `changesEnRoute`, `profitCentreCodeTrainServiceCode`,
  `CRLOCATION          C                                                           `,
  profitCentreCodeTrainServiceCode => expect(profitCentreCodeTrainServiceCode).toBeNull()
)

run(
  `changesEnRoute`, `profitCentreCodeTrainServiceCode`,
  `CRLOCATION          C83749632                                                   `,
  profitCentreCodeTrainServiceCode => expect(profitCentreCodeTrainServiceCode).toEqual(83749632)
)

run(
  `changesEnRoute`, `businessSector`,
  `CRLOCATION          C                                                           `,
  businessSector => expect(businessSector).toBeNull()
)

run(
  `changesEnRoute`, `businessSector`,
  `CRLOCATION          C        Q                                                  `,
  businessSector => expect(businessSector).toEqual(`Q`)
)

run(
  `changesEnRoute`, `powerType`,
  `CRLOCATION          C                                                           `,
  powerType => expect(powerType).toBeNull()
)

run(
  `changesEnRoute`, `powerType`,
  `CRLOCATION          C         QBE                                               `,
  powerType => expect(powerType).toEqual(`QBE`)
)

run(
  `changesEnRoute`, `timingLoad`,
  `CRLOCATION          C                                                           `,
  timingLoad => expect(timingLoad).toBeNull()
)

run(
  `changesEnRoute`, `timingLoad`,
  `CRLOCATION          C            TILD                                           `,
  timingLoad => expect(timingLoad).toEqual(`TILD`)
)

run(
  `changesEnRoute`, `speed`,
  `CRLOCATION          C                                                           `,
  speed => expect(speed).toBeNull()
)

run(
  `changesEnRoute`, `speed`,
  `CRLOCATION          C                381                                        `,
  speed => expect(speed).toEqual(381)
)

run(
  `changesEnRoute`, `operatingChars`,
  `CRLOCATION          C                                                           `,
  operatingChars => expect(operatingChars).toBeNull()
)

run(
  `changesEnRoute`, `operatingChars`,
  `CRLOCATION          C                   OPERAT                                  `,
  operatingChars => expect(operatingChars).toEqual(`OPERAT`)
)

run(
  `changesEnRoute`, `trainClass`,
  `CRLOCATION          C                                                           `,
  trainClass => expect(trainClass).toBeNull()
)

run(
  `changesEnRoute`, `trainClass`,
  `CRLOCATION          C                         Q                                 `,
  trainClass => expect(trainClass).toEqual(`Q`)
)

run(
  `changesEnRoute`, `trainClass`,
  `CRLOCATION          C                                                           `,
  trainClass => expect(trainClass).toBeNull()
)

run(
  `changesEnRoute`, `sleepers`,
  `CRLOCATION          C                                                           `,
  sleepers => expect(sleepers).toBeNull()
)

run(
  `changesEnRoute`, `sleepers`,
  `CRLOCATION          C                          Q                                `,
  sleepers => expect(sleepers).toEqual(`Q`)
)

run(
  `changesEnRoute`, `reservations`,
  `CRLOCATION          C                                                           `,
  reservations => expect(reservations).toBeNull()
)

run(
  `changesEnRoute`, `reservations`,
  `CRLOCATION          C                           Q                               `,
  reservations => expect(reservations).toEqual(`Q`)
)

run(
  `changesEnRoute`, `connectIndicator`,
  `CRLOCATION          C                                                           `,
  connectIndicator => expect(connectIndicator).toBeNull()
)

run(
  `changesEnRoute`, `connectIndicator`,
  `CRLOCATION          C                            Q                              `,
  connectIndicator => expect(connectIndicator).toEqual(`Q`)
)

run(
  `changesEnRoute`, `cateringCode`,
  `CRLOCATION          C                                                           `,
  cateringCode => expect(cateringCode).toBeNull()
)

run(
  `changesEnRoute`, `cateringCode`,
  `CRLOCATION          C                             CATE                          `,
  cateringCode => expect(cateringCode).toEqual(`CATE`)
)

run(
  `changesEnRoute`, `serviceBranding`,
  `CRLOCATION          C                                                           `,
  serviceBranding => expect(serviceBranding).toBeNull()
)

run(
  `changesEnRoute`, `serviceBranding`,
  `CRLOCATION          C                                 SVBR                      `,
  serviceBranding => expect(serviceBranding).toEqual(`SVBR`)
)

run(
  `changesEnRoute`, `tractionClass`,
  `CRLOCATION          C                                                           `,
  tractionClass => expect(tractionClass).toBeNull()
)

run(
  `changesEnRoute`, `tractionClass`,
  `CRLOCATION          C                                     TRCL                  `,
  tractionClass => expect(tractionClass).toEqual(`TRCL`)
)

run(
  `changesEnRoute`, `uicCode`,
  `CRLOCATION          C                                                           `,
  uicCode => expect(uicCode).toBeNull()
)

run(
  `changesEnRoute`, `uicCode`,
  `CRLOCATION          C                                         UICCO             `,
  uicCode => expect(uicCode).toEqual(`UICCO`)
)

run(
  `changesEnRoute`, `retailServiceId`,
  `CRLOCATION          C                                                           `,
  retailServiceId => expect(retailServiceId).toBeNull()
)

run(
  `changesEnRoute`, `retailServiceId`,
  `CRLOCATION          C                                              HQ826410     `,
  retailServiceId => expect(retailServiceId).toEqual(`HQ826410`)
)

run(
  `changesEnRoute`, `spare`,
  `CRLOCATION          C                                                           `,
  spare => expect(spare).toBeNull()
)

run(
  `changesEnRoute`, `spare`,
  `CRLOCATION          C                                                      SPARE`,
  spare => expect(spare).toEqual(`SPARE`)
)

run(
  `terminatingLocation`, `recordIdentity`,
  `LTLOCATION0824 1627                                                             `,
  recordIdentity => expect(recordIdentity).toEqual(`LT`)
)

run(
  `terminatingLocation`, `location`,
  `LTLOCATION0824 1627                                                             `,
  location => expect(location).toEqual(`LOCATION`)
)

run(
  `terminatingLocation`, `scheduledArrivalTime`,
  `LTLOCATION0824 1627                                                             `,
  scheduledArrivalTime => expect(scheduledArrivalTime).toBeSameMoment(moment(`0001-01-01T08:24:00+00:00`))
)

run(
  `terminatingLocation`, `scheduledArrivalTimeSpare`,
  `LTLOCATION0824 1627                                                             `,
  scheduledArrivalTimeSpare => expect(scheduledArrivalTimeSpare).toBeNull()
)

run(
  `terminatingLocation`, `scheduledArrivalTimeSpare`,
  `LTLOCATION0824Q1627                                                             `,
  scheduledArrivalTimeSpare => expect(scheduledArrivalTimeSpare).toEqual(`Q`)
)

run(
  `terminatingLocation`, `publicArrivalTime`,
  `LTLOCATION0824 1637                                                             `,
  publicArrivalTime => expect(publicArrivalTime).toBeSameMoment(moment(`0001-01-01T16:37:00+00:00`))
)

run(
  `terminatingLocation`, `platform`,
  `LTLOCATION0824 1637                                                             `,
  platform => expect(platform).toBeNull()
)

run(
  `terminatingLocation`, `platform`,
  `LTLOCATION0824 1637PLA                                                          `,
  platform => expect(platform).toEqual(`PLA`)
)

run(
  `terminatingLocation`, `path`,
  `LTLOCATION0824 1637                                                             `,
  path => expect(path).toBeNull()
)

run(
  `terminatingLocation`, `path`,
  `LTLOCATION0824 1637   PTH                                                       `,
  path => expect(path).toEqual(`PTH`)
)

run(
  `terminatingLocation`, `activity`,
  `LTLOCATION0824 1637                                                             `,
  activity => expect(activity).toBeNull()
)

run(
  `terminatingLocation`, `activity`,
  `LTLOCATION0824 1637      TESTACTIVITY                                           `,
  activity => expect(activity).toEqual(`TESTACTIVITY`)
)

run(
  `terminatingLocation`, `spare`,
  `LTLOCATION0824 1637                                                             `,
  spare => expect(spare).toBeNull()
)

run(
  `terminatingLocation`, `spare`,
  `LTLOCATION0824 1637                   Spare Characters Which Fill The Remainder.`,
  spare => expect(spare).toEqual(`Spare Characters Which Fill The Remainder.`)
)

run(
  `association`, `recordIdentity`,
  `AANBASEUIASSOUI0712241503221011011   LOCATIO  T                                C`,
  recordIdentity => expect(recordIdentity).toEqual(`AA`)
)

run(
  `association`, `transactionType`,
  `AANBASEUIASSOUI0712241503221011011   LOCATIO  T                                C`,
  transactionType => expect(transactionType).toEqual(`new`)
)

run(
  `association`, `transactionType`,
  `AADBASEUIASSOUI0712241503221011011   LOCATIO  T                                C`,
  transactionType => expect(transactionType).toEqual(`delete`)
)

run(
  `association`, `transactionType`,
  `AARBASEUIASSOUI0712241503221011011   LOCATIO  T                                C`,
  transactionType => expect(transactionType).toEqual(`revise`)
)

run(
  `association`, `baseUid`,
  `AANBASEUIASSOUI0712241503221011011   LOCATIO  T                                C`,
  baseUid => expect(baseUid).toEqual(`BASEUI`)
)

run(
  `association`, `assocUid`,
  `AANBASEUIASSOUI0712241503221011011   LOCATIO  T                                C`,
  assocUid => expect(assocUid).toEqual(`ASSOUI`)
)

run(
  `association`, `assocStartDate`,
  `AANBASEUIASSOUI0712241503221011011   LOCATIO  T                                C`,
  assocStartDate => expect(assocStartDate).toBeSameMoment(moment(`2007-12-24T00:00:00+00:00`))
)

run(
  `association`, `assocEndDate`,
  `AANBASEUIASSOUI0712241503221011011   LOCATIO  T                                C`,
  assocEndDate => expect(assocEndDate).toBeSameMoment(moment(`2015-03-22T00:00:00+00:00`))
)

run(
  `association`, `assocDays`,
  `AANBASEUIASSOUI0712241503221011011   LOCATIO  T                                C`,
  assocDays => expect(assocDays).toEqual(`1011011`)
)

run(
  `association`, `assocCat`,
  `AANBASEUIASSOUI0712241503221011011   LOCATIO  T                                C`,
  assocCat => expect(assocCat).toBeNull()
)

run(
  `association`, `assocCat`,
  `AANBASEUIASSOUI0712241503221011011AC LOCATIO  T                                C`,
  assocCat => expect(assocCat).toEqual(`AC`)
)

run(
  `association`, `assocDateInd`,
  `AANBASEUIASSOUI0712241503221011011   LOCATIO  T                                C`,
  assocDateInd => expect(assocDateInd).toBeNull()
)

run(
  `association`, `assocDateInd`,
  `AANBASEUIASSOUI0712241503221011011  SLOCATIO  T                                C`,
  assocDateInd => expect(assocDateInd).toEqual(`standard`)
)

run(
  `association`, `assocDateInd`,
  `AANBASEUIASSOUI0712241503221011011  NLOCATIO  T                                C`,
  assocDateInd => expect(assocDateInd).toEqual(`overNextMidnight`)
)

run(
  `association`, `assocDateInd`,
  `AANBASEUIASSOUI0712241503221011011  PLOCATIO  T                                C`,
  assocDateInd => expect(assocDateInd).toEqual(`overPreviousMidnight`)
)

run(
  `association`, `assocLocation`,
  `AANBASEUIASSOUI0712241503221011011   LOCATIO  T                                C`,
  assocLocation => expect(assocLocation).toEqual(`LOCATIO`)
)

run(
  `association`, `baseLocationSuffix`,
  `AANBASEUIASSOUI0712241503221011011   LOCATIO  T                                C`,
  baseLocationSuffix => expect(baseLocationSuffix).toBeNull()
)

run(
  `association`, `baseLocationSuffix`,
  `AANBASEUIASSOUI0712241503221011011   LOCATIO2 T                                C`,
  baseLocationSuffix => expect(baseLocationSuffix).toEqual(`2`)
)

run(
  `association`, `assocLocationSuffix`,
  `AANBASEUIASSOUI0712241503221011011   LOCATIO  T                                C`,
  assocLocationSuffix => expect(assocLocationSuffix).toBeNull()
)

run(
  `association`, `assocLocationSuffix`,
  `AANBASEUIASSOUI0712241503221011011   LOCATIO 2T                                C`,
  assocLocationSuffix => expect(assocLocationSuffix).toEqual(`2`)
)

run(
  `association`, `diagramType`,
  `AANBASEUIASSOUI0712241503221011011   LOCATIO  T                                C`,
  diagramType => expect(diagramType).toEqual(`T`)
)

run(
  `association`, `associationType`,
  `AANBASEUIASSOUI0712241503221011011   LOCATIO  T                                C`,
  associationType => expect(associationType).toBeNull()
)

run(
  `association`, `associationType`,
  `AANBASEUIASSOUI0712241503221011011   LOCATIO  TP                               C`,
  associationType => expect(associationType).toEqual(`passenger`)
)

run(
  `association`, `associationType`,
  `AANBASEUIASSOUI0712241503221011011   LOCATIO  TO                               C`,
  associationType => expect(associationType).toEqual(`operating`)
)

run(
  `association`, `filler`,
  `AANBASEUIASSOUI0712241503221011011   LOCATIO  T                                C`,
  filler => expect(filler).toBeNull()
)

run(
  `association`, `filler`,
  `AANBASEUIASSOUI0712241503221011011   LOCATIO  T Test Filler Characters Go Here.C`,
  filler => expect(filler).toEqual(`Test Filler Characters Go Here.`)
)

run(
  `association`, `stpIndicator`,
  `AANBASEUIASSOUI0712241503221011011   LOCATIO  T                                C`,
  stpIndicator => expect(stpIndicator).toEqual(`cancellation`)
)

run(
  `association`, `stpIndicator`,
  `AANBASEUIASSOUI0712241503221011011   LOCATIO  T                                N`,
  stpIndicator => expect(stpIndicator).toEqual(`new`)
)

run(
  `association`, `stpIndicator`,
  `AANBASEUIASSOUI0712241503221011011   LOCATIO  T                                O`,
  stpIndicator => expect(stpIndicator).toEqual(`overlay`)
)

run(
  `association`, `stpIndicator`,
  `AANBASEUIASSOUI0712241503221011011   LOCATIO  T                                P`,
  stpIndicator => expect(stpIndicator).toEqual(`permanent`)
)

run(
  `tiplocInsert`, `recordIdentity`,
  `TITIPLOCC83273918Q                          83726                               `,
  recordIdentity => expect(recordIdentity).toEqual(`TI`)
)

run(
  `tiplocInsert`, `tiplocCode`,
  `TITIPLOCC83273918Q                          83726                               `,
  tiplocCode => expect(tiplocCode).toEqual(`TIPLOCC`)
)

run(
  `tiplocInsert`, `capitals`,
  `TITIPLOCC83273918Q                          83726                               `,
  capitals => expect(capitals).toEqual(83)
)

run(
  `tiplocInsert`, `nalco`,
  `TITIPLOCC83273918Q                          83726                               `,
  nalco => expect(nalco).toEqual(273918)
)

run(
  `tiplocInsert`, `nlcCheckCharacter`,
  `TITIPLOCC83273918Q                          83726                               `,
  nlcCheckCharacter => expect(nlcCheckCharacter).toEqual(`Q`)
)

run(
  `tiplocInsert`, `tpsDescription`,
  `TITIPLOCC83273918Q                          83726                               `,
  tpsDescription => expect(tpsDescription).toBeNull()
)

run(
  `tiplocInsert`, `tpsDescription`,
  `TITIPLOCC83273918QTest TPS Description Value83726                               `,
  tpsDescription => expect(tpsDescription).toEqual(`Test TPS Description Value`)
)

run(
  `tiplocInsert`, `stanox`,
  `TITIPLOCC83273918Q                          83726                               `,
  stanox => expect(stanox).toEqual(83726)
)

run(
  `tiplocInsert`, `poMcpCode`,
  `TITIPLOCC83273918Q                          83726                               `,
  poMcpCode => expect(poMcpCode).toBeNull()
)

run(
  `tiplocInsert`, `poMcpCode`,
  `TITIPLOCC83273918Q                          837269291                           `,
  poMcpCode => expect(poMcpCode).toEqual(9291)
)

run(
  `tiplocInsert`, `crsCode`,
  `TITIPLOCC83273918Q                          83726                               `,
  crsCode => expect(crsCode).toBeNull()
)

run(
  `tiplocInsert`, `crsCode`,
  `TITIPLOCC83273918Q                          83726    E4Q                        `,
  crsCode => expect(crsCode).toEqual(`E4Q`)
)

run(
  `tiplocInsert`, `description`,
  `TITIPLOCC83273918Q                          83726                               `,
  description => expect(description).toBeNull()
)

run(
  `tiplocInsert`, `description`,
  `TITIPLOCC83273918Q                          83726       Test Description        `,
  description => expect(description).toEqual(`Test Description`)
)

run(
  `tiplocInsert`, `spare`,
  `TITIPLOCC83273918Q                          83726                               `,
  spare => expect(spare).toBeNull()
)

run(
  `tiplocInsert`, `spare`,
  `TITIPLOCC83273918Q                          83726                       TstSpare`,
  spare => expect(spare).toEqual(`TstSpare`)
)

run(
  `tiplocAmend`, `recordIdentity`,
  `TATIPLOCC                                                                       `,
  recordIdentity => expect(recordIdentity).toEqual(`TA`)
)

run(
  `tiplocAmend`, `tiplocCode`,
  `TATIPLOCC                                                                       `,
  tiplocCode => expect(tiplocCode).toEqual(`TIPLOCC`)
)

run(
  `tiplocAmend`, `capitals`,
  `TATIPLOCC                                                                       `,
  capitals => expect(capitals).toBeNull()
)

run(
  `tiplocAmend`, `capitals`,
  `TATIPLOCC83                                                                     `,
  capitals => expect(capitals).toEqual(83)
)

run(
  `tiplocAmend`, `nalco`,
  `TATIPLOCC                                                                       `,
  nalco => expect(nalco).toBeNull()
)

run(
  `tiplocAmend`, `nalco`,
  `TATIPLOCC  273918                                                               `,
  nalco => expect(nalco).toEqual(273918)
)

run(
  `tiplocAmend`, `nlcCheckCharacter`,
  `TATIPLOCC                                                                       `,
  nlcCheckCharacter => expect(nlcCheckCharacter).toBeNull()
)

run(
  `tiplocAmend`, `nlcCheckCharacter`,
  `TATIPLOCC        Q                                                              `,
  nlcCheckCharacter => expect(nlcCheckCharacter).toEqual(`Q`)
)

run(
  `tiplocAmend`, `tpsDescription`,
  `TATIPLOCC                                                                       `,
  tpsDescription => expect(tpsDescription).toBeNull()
)

run(
  `tiplocAmend`, `tpsDescription`,
  `TATIPLOCC         Test TPS Description Value                                    `,
  tpsDescription => expect(tpsDescription).toEqual(`Test TPS Description Value`)
)

run(
  `tiplocAmend`, `stanox`,
  `TATIPLOCC                                                                       `,
  stanox => expect(stanox).toBeNull()
)

run(
  `tiplocAmend`, `stanox`,
  `TATIPLOCC                                   83726                               `,
  stanox => expect(stanox).toEqual(83726)
)

run(
  `tiplocAmend`, `poMcpCode`,
  `TATIPLOCC                                                                       `,
  poMcpCode => expect(poMcpCode).toBeNull()
)

run(
  `tiplocAmend`, `poMcpCode`,
  `TATIPLOCC                                        9291                           `,
  poMcpCode => expect(poMcpCode).toEqual(9291)
)

run(
  `tiplocAmend`, `crsCode`,
  `TATIPLOCC                                                                       `,
  crsCode => expect(crsCode).toBeNull()
)

run(
  `tiplocAmend`, `crsCode`,
  `TATIPLOCC                                            E4Q                        `,
  crsCode => expect(crsCode).toEqual(`E4Q`)
)

run(
  `tiplocAmend`, `description`,
  `TATIPLOCC                                                                       `,
  description => expect(description).toBeNull()
)

run(
  `tiplocAmend`, `description`,
  `TATIPLOCC                                               Test Description        `,
  description => expect(description).toEqual(`Test Description`)
)

run(
  `tiplocAmend`, `newTiploc`,
  `TATIPLOCC                                                                       `,
  newTiploc => expect(newTiploc).toBeNull()
)

run(
  `tiplocAmend`, `newTiploc`,
  `TATIPLOCC                                                               NTIPLOC `,
  newTiploc => expect(newTiploc).toEqual(`NTIPLOC`)
)

run(
  `tiplocAmend`, `spare`,
  `TATIPLOCC                                                                       `,
  spare => expect(spare).toBeNull()
)

run(
  `tiplocAmend`, `spare`,
  `TATIPLOCC                                                                      Q`,
  spare => expect(spare).toEqual(`Q`)
)

run(
  `tiplocDelete`, `recordIdentity`,
  `TDTIPLOCC                                                                       `,
  recordIdentity => expect(recordIdentity).toEqual(`TD`)
)

run(
  `tiplocDelete`, `tiplocCode`,
  `TDTIPLOCC                                                                       `,
  tiplocCode => expect(tiplocCode).toEqual(`TIPLOCC`)
)

run(
  `tiplocDelete`, `spare`,
  `TDTIPLOCC                                                                       `,
  spare => expect(spare).toBeNull()
)

run(
  `tiplocDelete`, `spare`,
  `TDTIPLOCCTest Spare Characters Which Fill All Of The Remaining Space On The Line`,
  spare => expect(spare).toEqual(`Test Spare Characters Which Fill All Of The Remaining Space On The Line`)
)

run(
  `trailerRecord`, `recordIdentity`,
  `ZZ                                                                              `,
  recordIdentity => expect(recordIdentity).toEqual(`ZZ`)
)

run(
  `trailerRecord`, `spare`,
  `ZZ                                                                              `,
  spare => expect(spare).toBeNull()
)

run(
  `trailerRecord`, `spare`,
  `ZZTest Spare Characters Which Fill Every Last Column Of The Remaining SpaceFound`,
  spare => expect(spare).toEqual(`Test Spare Characters Which Fill Every Last Column Of The Remaining SpaceFound`)
)
