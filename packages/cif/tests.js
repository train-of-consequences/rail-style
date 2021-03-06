import moment from "moment-timezone"
import "jasmine-expect-moment"
import cif from "./index.coverage"
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
    parser(cif, null, handlers, () => { })(line)
  })
  it(`matches`, () => expect(matched).toBeTruthy())
  it(`is parsed`, () => verifyParsed(parsed))
})

const runTrainCategory = (lineName, fragmentName, lineFactory) => {
  run(
    lineName, fragmentName, lineFactory(`  `),
    trainCategory => expect(trainCategory).toBeNull()
  )
  const runTrainRecordMapping = (from, to) => run(
    lineName, fragmentName, lineFactory(from),
    trainCategory => expect(trainCategory).toEqual(to)
  )
  runTrainRecordMapping(`OL`, `londonUndergroundOrMetroService`)
  runTrainRecordMapping(`OU`, `unadvertisedOrdinaryPassenger`)
  runTrainRecordMapping(`OO`, `ordinaryPassenger`)
  runTrainRecordMapping(`OS`, `staffTrain`)
  runTrainRecordMapping(`OW`, `mixed`)
  runTrainRecordMapping(`XC`, `channelTunnel`)
  runTrainRecordMapping(`XD`, `sleeperEuropeNightServices`)
  runTrainRecordMapping(`XI`, `international`)
  runTrainRecordMapping(`XR`, `motorail`)
  runTrainRecordMapping(`XU`, `unadvertisedExpress`)
  runTrainRecordMapping(`XX`, `expressPassenger`)
  runTrainRecordMapping(`XZ`, `sleeperDomestic`)
  runTrainRecordMapping(`BR`, `replacementBus`)
  runTrainRecordMapping(`BS`, `busWtt`)
  runTrainRecordMapping(`SS`, `ship`)
  runTrainRecordMapping(`EE`, `emptyCoachingStock`)
  runTrainRecordMapping(`EL`, `emptyCoachingStockLondonUndergroundOrMetroService`)
  runTrainRecordMapping(`ES`, `emptyCoachingStockAndStaff`)
  runTrainRecordMapping(`JJ`, `postal`)
  runTrainRecordMapping(`PM`, `postOfficeControlledParcels`)
  runTrainRecordMapping(`PP`, `parcels`)
  runTrainRecordMapping(`PV`, `emptyNpccs`)
  runTrainRecordMapping(`DD`, `departmental`)
  runTrainRecordMapping(`DH`, `civilEngineer`)
  runTrainRecordMapping(`DI`, `mechanicalAndElectricalEngineer`)
  runTrainRecordMapping(`DQ`, `stores`)
  runTrainRecordMapping(`DT`, `test`)
  runTrainRecordMapping(`DY`, `signalAndTelecommunicationsEngineer`)
  runTrainRecordMapping(`ZB`, `locomotiveAndBrakeVan`)
  runTrainRecordMapping(`ZZ`, `lightLocomotive`)
  runTrainRecordMapping(`J2`, `railfreightDistributionAutomotiveComponents`)
  runTrainRecordMapping(`H2`, `railfreightDistributionAutomotiveVehicles`)
  runTrainRecordMapping(`J3`, `railfreightDistributionEdibleProductsUkContracts`)
  runTrainRecordMapping(`J4`, `railfreightDistributionIndustrialMineralsUkContracts`)
  runTrainRecordMapping(`J5`, `railfreightDistributionChemicalsUkContracts`)
  runTrainRecordMapping(`J6`, `railfreightDistributionBuildingMaterialsUkContracts`)
  runTrainRecordMapping(`J8`, `railfreightDistributionGeneralMerchandiseUkContracts`)
  runTrainRecordMapping(`H8`, `railfreightDistributionEuropean`)
  runTrainRecordMapping(`J9`, `railfreightDistributionFreightlinerContracts`)
  runTrainRecordMapping(`H9`, `railfreightDistributionFreightlinerOther`)
  runTrainRecordMapping(`A0`, `coalDistributive`)
  runTrainRecordMapping(`E0`, `coalElectricityMgr`)
  runTrainRecordMapping(`B0`, `coalOtherAndNuclear`)
  runTrainRecordMapping(`B1`, `metals`)
  runTrainRecordMapping(`B4`, `aggregates`)
  runTrainRecordMapping(`B5`, `domesticAndIndustrialWaste`)
  runTrainRecordMapping(`B6`, `buildingMaterialsTlf`)
  runTrainRecordMapping(`B7`, `petroleumProducts`)
  runTrainRecordMapping(`H0`, `railfreightDistributionEuropeanChannelTunnelMixedBusiness`)
  runTrainRecordMapping(`H1`, `railfreightDistributionEuropeanChannelTunnelIntermodal`)
  runTrainRecordMapping(`H3`, `railfreightDistributionEuropeanChannelTunnelAutomotive`)
  runTrainRecordMapping(`H4`, `railfreightDistributionEuropeanChannelTunnelContractServices`)
  runTrainRecordMapping(`H5`, `railfreightDistributionEuropeanChannelTunnelHaulmark`)
  runTrainRecordMapping(`H6`, `railfreightDistributionEuropeanChannelTunnelJointVenture`)
}

const runPowerType = (lineName, fragmentName, lineFactory) => {
  run(
    lineName, fragmentName, lineFactory(`   `),
    powerType => expect(powerType).toBeNull()
  )
  const runPowerTypeMapping = (from, to) => run(
    lineName, fragmentName, lineFactory(from),
    powerType => expect(powerType).toEqual(to)
  )
  runPowerTypeMapping(`D  `, `dieselOrSteam`)
  runPowerTypeMapping(`DEM`, `dieselElectricMultipleUnit`)
  runPowerTypeMapping(`DMU`, `dieselMechanicalMultipleUnit`)
  runPowerTypeMapping(`E  `, `electric`)
  runPowerTypeMapping(`ED `, `electroDiesel`)
  runPowerTypeMapping(`EML`, `electricMultipleUnitPlusLocomotive`)
  runPowerTypeMapping(`EMU`, `electricMultipleUnit`)
  runPowerTypeMapping(`HST`, `highSpeedTrain`)
}

const runTrainClass = (lineName, fragmentName, lineFactory) => {
  const runTrainClass = (from, to) => run(
    lineName, fragmentName, lineFactory(from),
    trainClass => expect(trainClass).toEqual(to)
  )
  runTrainClass(` `, [`standardClass`, `firstClass`])
  runTrainClass(`B`, [`standardClass`, `firstClass`])
  runTrainClass(`S`, [`standardClass`])
}

const runSleepers = (lineName, fragmentName, lineFactory) => {
  run(
    lineName, fragmentName, lineFactory(` `),
    sleepers => expect(sleepers).toEqual([])
  )
  run(
    lineName, fragmentName, lineFactory(`F`),
    sleepers => expect(sleepers).toEqual([`firstClass`])
  )
  run(
    lineName, fragmentName, lineFactory(`S`),
    sleepers => expect(sleepers).toEqual([`standardClass`])
  )
  run(
    lineName, fragmentName, lineFactory(`B`),
    sleepers => expect(sleepers).toEqual([`standardClass`, `firstClass`])
  )
}

const runReservations = (lineName, fragmentName, lineFactory) => {
  run(
    lineName, fragmentName, lineFactory(` `),
    reservations => expect(reservations).toBeNull()
  )
  const runReservation = (from, to) => run(
    lineName, fragmentName, lineFactory(from),
    reservations => expect(reservations).toEqual(to)
  )
  runReservation(`A`, `seatsCompulsory`)
  runReservation(`R`, `seatsRecommended`)
  runReservation(`S`, `seatsPossibleFromAnyStation`)
  runReservation(`E`, `bicyclesEssential`)
}

const runCateringCode = (lineName, fragmentName, lineFactory) => {
  run(
    lineName, fragmentName, lineFactory(`    `),
    cateringCode => expect(cateringCode).toEqual([])
  )
  const runCateringCode = (from, to) => {
    run(
      lineName, fragmentName, lineFactory(`${from}   `),
      cateringCode => expect(cateringCode).toEqual([to])
    )
    run(
      lineName, fragmentName, lineFactory(`   ${from}`),
      cateringCode => expect(cateringCode).toEqual([to])
    )
  }
  runCateringCode(`C`, `buffetService`)
  runCateringCode(`F`, `resturauntCarAvailableForFirstClassPassengers`)
  runCateringCode(`H`, `hotFoodAvailable`)
  runCateringCode(`M`, `mealIncludedForFirstClassPassengers`)
  runCateringCode(`P`, `wheelchairOnlyReservations`)
  runCateringCode(`R`, `resturaunt`)
  runCateringCode(`T`, `trolleyService`)
}

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
  `BSNTTRUID180620                         1                                      C`,
  recordIdentity => expect(recordIdentity).toEqual(`BS`)
)

run(
  `basicSchedule`, `transactionType`,
  `BSNTTRUID180620                         1                                      C`,
  transactionType => expect(transactionType).toEqual(`new`)
)

run(
  `basicSchedule`, `transactionType`,
  `BSDTTRUID180620                         1                                      C`,
  transactionType => expect(transactionType).toEqual(`delete`)
)

run(
  `basicSchedule`, `transactionType`,
  `BSRTTRUID180620                         1                                      C`,
  transactionType => expect(transactionType).toEqual(`revise`)
)

run(
  `basicSchedule`, `trainUid`,
  `BSNTTRUID180620                         1                                      C`,
  trainUid => expect(trainUid).toEqual(`TTRUID`)
)

run(
  `basicSchedule`, `dateRunsFrom`,
  `BSNTTRUID180620                         1                                      C`,
  dateRunsFrom => expect(dateRunsFrom).toBeSameMoment(moment(`2018-06-20T00:00:00+01:00`))
)

run(
  `basicSchedule`, `dateRunsTo`,
  `BSNTTRUID180620                         1                                      C`,
  dateRunsTo => expect(dateRunsTo).toBeNull()
)

run(
  `basicSchedule`, `dateRunsTo`,
  `BSNTTRUID180620180910                   1                                      C`,
  dateRunsTo => expect(dateRunsTo).toBeSameMoment(moment(`2018-09-10T00:00:00+01:00`))
)

run(
  `basicSchedule`, `daysRunMonday`,
  `BSNTTRUID180620                         1                                      C`,
  daysRunMonday => expect(daysRunMonday).toBeNull()
)

run(
  `basicSchedule`, `daysRunMonday`,
  `BSNTTRUID180620      0                  1                                      C`,
  daysRunMonday => expect(daysRunMonday).toBe(false)
)

run(
  `basicSchedule`, `daysRunMonday`,
  `BSNTTRUID180620      1                  1                                      C`,
  daysRunMonday => expect(daysRunMonday).toBe(true)
)

run(
  `basicSchedule`, `daysRunTuesday`,
  `BSNTTRUID180620                         1                                      C`,
  daysRunTuesday => expect(daysRunTuesday).toBeNull()
)

run(
  `basicSchedule`, `daysRunTuesday`,
  `BSNTTRUID180620       0                 1                                      C`,
  daysRunTuesday => expect(daysRunTuesday).toBe(false)
)

run(
  `basicSchedule`, `daysRunTuesday`,
  `BSNTTRUID180620       1                 1                                      C`,
  daysRunTuesday => expect(daysRunTuesday).toBe(true)
)

run(
  `basicSchedule`, `daysRunWednesday`,
  `BSNTTRUID180620                         1                                      C`,
  daysRunWednesday => expect(daysRunWednesday).toBeNull()
)

run(
  `basicSchedule`, `daysRunWednesday`,
  `BSNTTRUID180620        0                1                                      C`,
  daysRunWednesday => expect(daysRunWednesday).toBe(false)
)

run(
  `basicSchedule`, `daysRunWednesday`,
  `BSNTTRUID180620        1                1                                      C`,
  daysRunWednesday => expect(daysRunWednesday).toBe(true)
)

run(
  `basicSchedule`, `daysRunThursday`,
  `BSNTTRUID180620                         1                                      C`,
  daysRunThursday => expect(daysRunThursday).toBeNull()
)

run(
  `basicSchedule`, `daysRunThursday`,
  `BSNTTRUID180620         0               1                                      C`,
  daysRunThursday => expect(daysRunThursday).toBe(false)
)

run(
  `basicSchedule`, `daysRunThursday`,
  `BSNTTRUID180620         1               1                                      C`,
  daysRunThursday => expect(daysRunThursday).toBe(true)
)

run(
  `basicSchedule`, `daysRunFriday`,
  `BSNTTRUID180620                         1                                      C`,
  daysRunFriday => expect(daysRunFriday).toBeNull()
)

run(
  `basicSchedule`, `daysRunFriday`,
  `BSNTTRUID180620          0              1                                      C`,
  daysRunFriday => expect(daysRunFriday).toBe(false)
)

run(
  `basicSchedule`, `daysRunFriday`,
  `BSNTTRUID180620          1              1                                      C`,
  daysRunFriday => expect(daysRunFriday).toBe(true)
)

run(
  `basicSchedule`, `daysRunSaturday`,
  `BSNTTRUID180620                         1                                      C`,
  daysRunSaturday => expect(daysRunSaturday).toBeNull()
)

run(
  `basicSchedule`, `daysRunSaturday`,
  `BSNTTRUID180620           0             1                                      C`,
  daysRunSaturday => expect(daysRunSaturday).toBe(false)
)

run(
  `basicSchedule`, `daysRunSaturday`,
  `BSNTTRUID180620           1             1                                      C`,
  daysRunSaturday => expect(daysRunSaturday).toBe(true)
)

run(
  `basicSchedule`, `daysRunSunday`,
  `BSNTTRUID180620                         1                                      C`,
  daysRunSunday => expect(daysRunSunday).toBeNull()
)

run(
  `basicSchedule`, `daysRunSunday`,
  `BSNTTRUID180620            0            1                                      C`,
  daysRunSunday => expect(daysRunSunday).toBe(false)
)

run(
  `basicSchedule`, `daysRunSunday`,
  `BSNTTRUID180620            1            1                                      C`,
  daysRunSunday => expect(daysRunSunday).toBe(true)
)

run(
  `basicSchedule`, `bankHolidayRunning`,
  `BSNTTRUID180620                         1                                      C`,
  bankHolidayRunning => expect(bankHolidayRunning).toBeNull()
)

run(
  `basicSchedule`, `bankHolidayRunning`,
  `BSNTTRUID180620             X           1                                      C`,
  bankHolidayRunning => expect(bankHolidayRunning).toEqual(`doesNotRunOnBankHolidayMondays`)
)

run(
  `basicSchedule`, `bankHolidayRunning`,
  `BSNTTRUID180620             G           1                                      C`,
  bankHolidayRunning => expect(bankHolidayRunning).toEqual(`doesNotRunOnGlasgowBankHolidays`)
)

run(
  `basicSchedule`, `trainStatus`,
  `BSNTTRUID180620                         1                                      C`,
  trainStatus => expect(trainStatus).toBeNull()
)

run(
  `basicSchedule`, `trainStatus`,
  `BSNTTRUID180620              B          1                                      C`,
  trainStatus => expect(trainStatus).toEqual(`permanentBus`)
)

run(
  `basicSchedule`, `trainStatus`,
  `BSNTTRUID180620              F          1                                      C`,
  trainStatus => expect(trainStatus).toEqual(`permanentFreight`)
)

run(
  `basicSchedule`, `trainStatus`,
  `BSNTTRUID180620              P          1                                      C`,
  trainStatus => expect(trainStatus).toEqual(`permanentPassengerAndParcels`)
)

run(
  `basicSchedule`, `trainStatus`,
  `BSNTTRUID180620              S          1                                      C`,
  trainStatus => expect(trainStatus).toEqual(`permanentShip`)
)

run(
  `basicSchedule`, `trainStatus`,
  `BSNTTRUID180620              T          1                                      C`,
  trainStatus => expect(trainStatus).toEqual(`permanentTrip`)
)

run(
  `basicSchedule`, `trainStatus`,
  `BSNTTRUID180620              1          1                                      C`,
  trainStatus => expect(trainStatus).toEqual(`shortTermPlanPassengerAndParcels`)
)

run(
  `basicSchedule`, `trainStatus`,
  `BSNTTRUID180620              2          1                                      C`,
  trainStatus => expect(trainStatus).toEqual(`shortTermPlanFreight`)
)

run(
  `basicSchedule`, `trainStatus`,
  `BSNTTRUID180620              3          1                                      C`,
  trainStatus => expect(trainStatus).toEqual(`shortTermPlanTrip`)
)

run(
  `basicSchedule`, `trainStatus`,
  `BSNTTRUID180620              4          1                                      C`,
  trainStatus => expect(trainStatus).toEqual(`shortTermPlanShip`)
)

run(
  `basicSchedule`, `trainStatus`,
  `BSNTTRUID180620              5          1                                      C`,
  trainStatus => expect(trainStatus).toEqual(`shortTermPlanBus`)
)

runTrainCategory(
  `basicSchedule`,
  `trainCategory`,
  code => `BSNTTRUID180620               ${code}        1                                      C`
)

run(
  `basicSchedule`, `trainIdentity`,
  `BSNTTRUID180620                         1                                      C`,
  trainIdentity => expect(trainIdentity).toBeNull()
)

run(
  `basicSchedule`, `trainIdentity`,
  `BSNTTRUID180620                 QREB    1                                      C`,
  trainIdentity => expect(trainIdentity).toEqual(`QREB`)
)

run(
  `basicSchedule`, `headcode`,
  `BSNTTRUID180620                         1                                      C`,
  headcode => expect(headcode).toBeNull()
)

run(
  `basicSchedule`, `headcode`,
  `BSNTTRUID180620                     QREB1                                      C`,
  headcode => expect(headcode).toEqual(`QREB`)
)

run(
  `basicSchedule`, `courseIndicator`,
  `BSNTTRUID180620                         1                                      C`,
  courseIndicator => expect(courseIndicator).toEqual(`1`)
)

run(
  `basicSchedule`, `profitCentreCodeTrainServiceCode`,
  `BSNTTRUID180620                         173628191                              C`,
  profitCentreCodeTrainServiceCode => expect(profitCentreCodeTrainServiceCode).toEqual(73628191)
)

run(
  `basicSchedule`, `businessSector`,
  `BSNTTRUID180620                         1                                      C`,
  businessSector => expect(businessSector).toBeNull()
)

run(
  `basicSchedule`, `businessSector`,
  `BSNTTRUID180620                         1        Q                             C`,
  businessSector => expect(businessSector).toEqual(`Q`)
)

runPowerType(
  `basicSchedule`, `powerType`,
  code => `BSNTTRUID180620                         1         ${code}                          C`
)

run(
  `basicSchedule`, `timingLoad`,
  `BSNTTRUID180620                         1                                      C`,
  timingLoad => expect(timingLoad).toBeNull()
)

run(
  `basicSchedule`, `timingLoad`,
  `BSNTTRUID180620                         1            QBRE                      C`,
  timingLoad => expect(timingLoad).toEqual(`QBRE`)
)

run(
  `basicSchedule`, `speed`,
  `BSNTTRUID180620                         1                                      C`,
  speed => expect(speed).toBeNull()
)

run(
  `basicSchedule`, `speed`,
  `BSNTTRUID180620                         1                731                   C`,
  speed => expect(speed).toEqual(731)
)

run(
  `basicSchedule`, `operatingChars`,
  `BSNTTRUID180620                         1                                      C`,
  operatingChars => expect(operatingChars).toBeNull()
)

run(
  `basicSchedule`, `operatingChars`,
  `BSNTTRUID180620                         1                   TESTOC             C`,
  operatingChars => expect(operatingChars).toEqual(`TESTOC`)
)

runTrainClass(
  `basicSchedule`, `trainClass`,
  code => `BSNTTRUID180620                         1                         ${code}            C`
)

runSleepers(
  `basicSchedule`, `sleepers`,
  code => `BSNTTRUID180620                         1                          ${code}           C`
)

runReservations(
  `basicSchedule`, `reservations`,
  code => `BSNTTRUID180620                         1                           ${code}          C`,
)

run(
  `basicSchedule`, `connectIndicator`,
  `BSNTTRUID180620                         1                                      C`,
  connectIndicator => expect(connectIndicator).toBeNull()
)

run(
  `basicSchedule`, `connectIndicator`,
  `BSNTTRUID180620                         1                            Q         C`,
  connectIndicator => expect(connectIndicator).toEqual(`Q`)
)

runCateringCode(
  `basicSchedule`, `cateringCode`,
  code => `BSNTTRUID180620                         1                             ${code}     C`,
)

run(
  `basicSchedule`, `serviceBranding`,
  `BSNTTRUID180620                         1                                      C`,
  serviceBranding => expect(serviceBranding).toBeNull()
)

run(
  `basicSchedule`, `serviceBranding`,
  `BSNTTRUID180620                         1                                 QBER C`,
  serviceBranding => expect(serviceBranding).toEqual(`QBER`)
)

run(
  `basicSchedule`, `spare`,
  `BSNTTRUID180620                         1                                      C`,
  spare => expect(spare).toBeNull()
)

run(
  `basicSchedule`, `spare`,
  `BSNTTRUID180620                         1                                     QC`,
  spare => expect(spare).toEqual(`Q`)
)

run(
  `basicSchedule`, `stpIndicator`,
  `BSNTTRUID180620                         1                                      C`,
  stpIndicator => expect(stpIndicator).toEqual(`cancellation`)
)

run(
  `basicSchedule`, `stpIndicator`,
  `BSNTTRUID180620                         1                                      N`,
  stpIndicator => expect(stpIndicator).toEqual(`new`)
)

run(
  `basicSchedule`, `stpIndicator`,
  `BSNTTRUID180620                         1                                      O`,
  stpIndicator => expect(stpIndicator).toEqual(`overlay`)
)

run(
  `basicSchedule`, `stpIndicator`,
  `BSNTTRUID180620                         1                                      P`,
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
  `CRLOCATION          1                                                           `,
  recordIdentity => expect(recordIdentity).toEqual(`CR`)
)

run(
  `changesEnRoute`, `location`,
  `CRLOCATION          1                                                           `,
  location => expect(location).toEqual(`LOCATION`)
)

runTrainCategory(
  `changesEnRoute`,
  `trainCategory`,
  code => `CRLOCATION${code}        1                                                           `
)

run(
  `changesEnRoute`, `trainIdentity`,
  `CRLOCATION          1                                                           `,
  trainIdentity => expect(trainIdentity).toBeNull()
)

run(
  `changesEnRoute`, `trainIdentity`,
  `CRLOCATION  TRID    1                                                           `,
  trainIdentity => expect(trainIdentity).toEqual(`TRID`)
)

run(
  `changesEnRoute`, `headcode`,
  `CRLOCATION          1                                                           `,
  headcode => expect(headcode).toBeNull()
)

run(
  `changesEnRoute`, `headcode`,
  `CRLOCATION      HDCD1                                                           `,
  headcode => expect(headcode).toEqual(`HDCD`)
)

run(
  `changesEnRoute`, `courseIndicator`,
  `CRLOCATION          1                                                           `,
  courseIndicator => expect(courseIndicator).toEqual(`1`)
)

run(
  `changesEnRoute`, `profitCentreCodeTrainServiceCode`,
  `CRLOCATION          1                                                           `,
  profitCentreCodeTrainServiceCode => expect(profitCentreCodeTrainServiceCode).toBeNull()
)

run(
  `changesEnRoute`, `profitCentreCodeTrainServiceCode`,
  `CRLOCATION          183749632                                                   `,
  profitCentreCodeTrainServiceCode => expect(profitCentreCodeTrainServiceCode).toEqual(83749632)
)

run(
  `changesEnRoute`, `businessSector`,
  `CRLOCATION          1                                                           `,
  businessSector => expect(businessSector).toBeNull()
)

run(
  `changesEnRoute`, `businessSector`,
  `CRLOCATION          1        Q                                                  `,
  businessSector => expect(businessSector).toEqual(`Q`)
)

runPowerType(
  `changesEnRoute`, `powerType`,
  code => `CRLOCATION          1         ${code}                                               `
)

run(
  `changesEnRoute`, `timingLoad`,
  `CRLOCATION          1                                                           `,
  timingLoad => expect(timingLoad).toBeNull()
)

run(
  `changesEnRoute`, `timingLoad`,
  `CRLOCATION          1            TILD                                           `,
  timingLoad => expect(timingLoad).toEqual(`TILD`)
)

run(
  `changesEnRoute`, `speed`,
  `CRLOCATION          1                                                           `,
  speed => expect(speed).toBeNull()
)

run(
  `changesEnRoute`, `speed`,
  `CRLOCATION          1                381                                        `,
  speed => expect(speed).toEqual(381)
)

run(
  `changesEnRoute`, `operatingChars`,
  `CRLOCATION          1                                                           `,
  operatingChars => expect(operatingChars).toBeNull()
)

run(
  `changesEnRoute`, `operatingChars`,
  `CRLOCATION          1                   OPERAT                                  `,
  operatingChars => expect(operatingChars).toEqual(`OPERAT`)
)

runTrainClass(
  `changesEnRoute`, `trainClass`,
  code => `CRLOCATION          1                         ${code}                                 `
)

runSleepers(
  `changesEnRoute`, `sleepers`,
  code => `CRLOCATION          1                          ${code}                                `
)

run(
  `changesEnRoute`, `reservations`,
  `CRLOCATION          1                                                           `,
  reservations => expect(reservations).toBeNull()
)

runReservations(
  `changesEnRoute`, `reservations`,
  code => `CRLOCATION          1                           ${code}                               `
)

run(
  `changesEnRoute`, `connectIndicator`,
  `CRLOCATION          1                                                           `,
  connectIndicator => expect(connectIndicator).toBeNull()
)

run(
  `changesEnRoute`, `connectIndicator`,
  `CRLOCATION          1                            Q                              `,
  connectIndicator => expect(connectIndicator).toEqual(`Q`)
)

runCateringCode(
  `changesEnRoute`, `cateringCode`,
  code => `CRLOCATION          1                             ${code}                          `
)

run(
  `changesEnRoute`, `serviceBranding`,
  `CRLOCATION          1                                                           `,
  serviceBranding => expect(serviceBranding).toBeNull()
)

run(
  `changesEnRoute`, `serviceBranding`,
  `CRLOCATION          1                                 SVBR                      `,
  serviceBranding => expect(serviceBranding).toEqual(`SVBR`)
)

run(
  `changesEnRoute`, `tractionClass`,
  `CRLOCATION          1                                                           `,
  tractionClass => expect(tractionClass).toBeNull()
)

run(
  `changesEnRoute`, `tractionClass`,
  `CRLOCATION          1                                     TRCL                  `,
  tractionClass => expect(tractionClass).toEqual(`TRCL`)
)

run(
  `changesEnRoute`, `uicCode`,
  `CRLOCATION          1                                                           `,
  uicCode => expect(uicCode).toBeNull()
)

run(
  `changesEnRoute`, `uicCode`,
  `CRLOCATION          1                                         UICCO             `,
  uicCode => expect(uicCode).toEqual(`UICCO`)
)

run(
  `changesEnRoute`, `retailServiceId`,
  `CRLOCATION          1                                                           `,
  retailServiceId => expect(retailServiceId).toBeNull()
)

run(
  `changesEnRoute`, `retailServiceId`,
  `CRLOCATION          1                                              HQ826410     `,
  retailServiceId => expect(retailServiceId).toEqual(`HQ826410`)
)

run(
  `changesEnRoute`, `spare`,
  `CRLOCATION          1                                                           `,
  spare => expect(spare).toBeNull()
)

run(
  `changesEnRoute`, `spare`,
  `CRLOCATION          1                                                      SPARE`,
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
  `AANBASEUIASSOUI071224150322          LOCATIO  T                                C`,
  recordIdentity => expect(recordIdentity).toEqual(`AA`)
)

run(
  `association`, `transactionType`,
  `AANBASEUIASSOUI071224150322          LOCATIO  T                                C`,
  transactionType => expect(transactionType).toEqual(`new`)
)

run(
  `association`, `transactionType`,
  `AADBASEUIASSOUI071224150322          LOCATIO  T                                C`,
  transactionType => expect(transactionType).toEqual(`delete`)
)

run(
  `association`, `transactionType`,
  `AARBASEUIASSOUI071224150322          LOCATIO  T                                C`,
  transactionType => expect(transactionType).toEqual(`revise`)
)

run(
  `association`, `baseUid`,
  `AANBASEUIASSOUI071224150322          LOCATIO  T                                C`,
  baseUid => expect(baseUid).toEqual(`BASEUI`)
)

run(
  `association`, `assocUid`,
  `AANBASEUIASSOUI071224150322          LOCATIO  T                                C`,
  assocUid => expect(assocUid).toEqual(`ASSOUI`)
)

run(
  `association`, `assocStartDate`,
  `AANBASEUIASSOUI071224150322          LOCATIO  T                                C`,
  assocStartDate => expect(assocStartDate).toBeSameMoment(moment(`2007-12-24T00:00:00+00:00`))
)

run(
  `association`, `assocEndDate`,
  `AANBASEUIASSOUI071224150322          LOCATIO  T                                C`,
  assocEndDate => expect(assocEndDate).toBeSameMoment(moment(`2015-03-22T00:00:00+00:00`))
)

run(
  `association`, `assocDaysMonday`,
  `AANBASEUIASSOUI071224150322          LOCATIO  T                                C`,
  assocDaysMonday => expect(assocDaysMonday).toBeNull()
)

run(
  `association`, `assocDaysMonday`,
  `AANBASEUIASSOUI0712241503220         LOCATIO  T                                C`,
  assocDaysMonday => expect(assocDaysMonday).toBe(false)
)

run(
  `association`, `assocDaysMonday`,
  `AANBASEUIASSOUI0712241503221         LOCATIO  T                                C`,
  assocDaysMonday => expect(assocDaysMonday).toBe(true)
)

run(
  `association`, `assocDaysTuesday`,
  `AANBASEUIASSOUI071224150322          LOCATIO  T                                C`,
  assocDaysTuesday => expect(assocDaysTuesday).toBeNull()
)

run(
  `association`, `assocDaysTuesday`,
  `AANBASEUIASSOUI071224150322 0        LOCATIO  T                                C`,
  assocDaysTuesday => expect(assocDaysTuesday).toBe(false)
)

run(
  `association`, `assocDaysTuesday`,
  `AANBASEUIASSOUI071224150322 1        LOCATIO  T                                C`,
  assocDaysTuesday => expect(assocDaysTuesday).toBe(true)
)

run(
  `association`, `assocDaysWednesday`,
  `AANBASEUIASSOUI071224150322          LOCATIO  T                                C`,
  assocDaysWednesday => expect(assocDaysWednesday).toBeNull()
)

run(
  `association`, `assocDaysWednesday`,
  `AANBASEUIASSOUI071224150322  0       LOCATIO  T                                C`,
  assocDaysWednesday => expect(assocDaysWednesday).toBe(false)
)

run(
  `association`, `assocDaysWednesday`,
  `AANBASEUIASSOUI071224150322  1       LOCATIO  T                                C`,
  assocDaysWednesday => expect(assocDaysWednesday).toBe(true)
)

run(
  `association`, `assocDaysThursday`,
  `AANBASEUIASSOUI071224150322          LOCATIO  T                                C`,
  assocDaysThursday => expect(assocDaysThursday).toBeNull()
)

run(
  `association`, `assocDaysThursday`,
  `AANBASEUIASSOUI071224150322   0      LOCATIO  T                                C`,
  assocDaysThursday => expect(assocDaysThursday).toBe(false)
)

run(
  `association`, `assocDaysThursday`,
  `AANBASEUIASSOUI071224150322   1      LOCATIO  T                                C`,
  assocDaysThursday => expect(assocDaysThursday).toBe(true)
)

run(
  `association`, `assocDaysFriday`,
  `AANBASEUIASSOUI071224150322          LOCATIO  T                                C`,
  assocDaysFriday => expect(assocDaysFriday).toBeNull()
)

run(
  `association`, `assocDaysFriday`,
  `AANBASEUIASSOUI071224150322    0     LOCATIO  T                                C`,
  assocDaysFriday => expect(assocDaysFriday).toBe(false)
)

run(
  `association`, `assocDaysFriday`,
  `AANBASEUIASSOUI071224150322    1     LOCATIO  T                                C`,
  assocDaysFriday => expect(assocDaysFriday).toBe(true)
)

run(
  `association`, `assocDaysSaturday`,
  `AANBASEUIASSOUI071224150322          LOCATIO  T                                C`,
  assocDaysSaturday => expect(assocDaysSaturday).toBeNull()
)

run(
  `association`, `assocDaysSaturday`,
  `AANBASEUIASSOUI071224150322     0    LOCATIO  T                                C`,
  assocDaysSaturday => expect(assocDaysSaturday).toBe(false)
)

run(
  `association`, `assocDaysSaturday`,
  `AANBASEUIASSOUI071224150322     1    LOCATIO  T                                C`,
  assocDaysSaturday => expect(assocDaysSaturday).toBe(true)
)

run(
  `association`, `assocDaysSunday`,
  `AANBASEUIASSOUI071224150322          LOCATIO  T                                C`,
  assocDaysSunday => expect(assocDaysSunday).toBeNull()
)

run(
  `association`, `assocDaysSunday`,
  `AANBASEUIASSOUI071224150322      0   LOCATIO  T                                C`,
  assocDaysSunday => expect(assocDaysSunday).toBe(false)
)

run(
  `association`, `assocDaysSunday`,
  `AANBASEUIASSOUI071224150322      1   LOCATIO  T                                C`,
  assocDaysSunday => expect(assocDaysSunday).toBe(true)
)

run(
  `association`, `assocCat`,
  `AANBASEUIASSOUI071224150322          LOCATIO  T                                C`,
  assocCat => expect(assocCat).toBeNull()
)

run(
  `association`, `assocCat`,
  `AANBASEUIASSOUI071224150322       AC LOCATIO  T                                C`,
  assocCat => expect(assocCat).toEqual(`AC`)
)

run(
  `association`, `assocDateInd`,
  `AANBASEUIASSOUI071224150322          LOCATIO  T                                C`,
  assocDateInd => expect(assocDateInd).toBeNull()
)

run(
  `association`, `assocDateInd`,
  `AANBASEUIASSOUI071224150322         SLOCATIO  T                                C`,
  assocDateInd => expect(assocDateInd).toEqual(`standard`)
)

run(
  `association`, `assocDateInd`,
  `AANBASEUIASSOUI071224150322         NLOCATIO  T                                C`,
  assocDateInd => expect(assocDateInd).toEqual(`overNextMidnight`)
)

run(
  `association`, `assocDateInd`,
  `AANBASEUIASSOUI071224150322         PLOCATIO  T                                C`,
  assocDateInd => expect(assocDateInd).toEqual(`overPreviousMidnight`)
)

run(
  `association`, `assocLocation`,
  `AANBASEUIASSOUI071224150322          LOCATIO  T                                C`,
  assocLocation => expect(assocLocation).toEqual(`LOCATIO`)
)

run(
  `association`, `baseLocationSuffix`,
  `AANBASEUIASSOUI071224150322          LOCATIO  T                                C`,
  baseLocationSuffix => expect(baseLocationSuffix).toBeNull()
)

run(
  `association`, `baseLocationSuffix`,
  `AANBASEUIASSOUI071224150322          LOCATIO2 T                                C`,
  baseLocationSuffix => expect(baseLocationSuffix).toEqual(`2`)
)

run(
  `association`, `assocLocationSuffix`,
  `AANBASEUIASSOUI071224150322          LOCATIO  T                                C`,
  assocLocationSuffix => expect(assocLocationSuffix).toBeNull()
)

run(
  `association`, `assocLocationSuffix`,
  `AANBASEUIASSOUI071224150322          LOCATIO 2T                                C`,
  assocLocationSuffix => expect(assocLocationSuffix).toEqual(`2`)
)

run(
  `association`, `diagramType`,
  `AANBASEUIASSOUI071224150322          LOCATIO  T                                C`,
  diagramType => expect(diagramType).toEqual(`T`)
)

run(
  `association`, `associationType`,
  `AANBASEUIASSOUI071224150322          LOCATIO  T                                C`,
  associationType => expect(associationType).toBeNull()
)

run(
  `association`, `associationType`,
  `AANBASEUIASSOUI071224150322          LOCATIO  TP                               C`,
  associationType => expect(associationType).toEqual(`passenger`)
)

run(
  `association`, `associationType`,
  `AANBASEUIASSOUI071224150322          LOCATIO  TO                               C`,
  associationType => expect(associationType).toEqual(`operating`)
)

run(
  `association`, `filler`,
  `AANBASEUIASSOUI071224150322          LOCATIO  T                                C`,
  filler => expect(filler).toBeNull()
)

run(
  `association`, `filler`,
  `AANBASEUIASSOUI071224150322          LOCATIO  T Test Filler Characters Go Here.C`,
  filler => expect(filler).toEqual(`Test Filler Characters Go Here.`)
)

run(
  `association`, `stpIndicator`,
  `AANBASEUIASSOUI071224150322          LOCATIO  T                                C`,
  stpIndicator => expect(stpIndicator).toEqual(`cancellation`)
)

run(
  `association`, `stpIndicator`,
  `AANBASEUIASSOUI071224150322          LOCATIO  T                                N`,
  stpIndicator => expect(stpIndicator).toEqual(`new`)
)

run(
  `association`, `stpIndicator`,
  `AANBASEUIASSOUI071224150322          LOCATIO  T                                O`,
  stpIndicator => expect(stpIndicator).toEqual(`overlay`)
)

run(
  `association`, `stpIndicator`,
  `AANBASEUIASSOUI071224150322          LOCATIO  T                                P`,
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
