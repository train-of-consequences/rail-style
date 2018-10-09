import * as fragments from "@rail-style/fragments"

const trainCategory = {
  trainCategory: fragments.enumOptional({
    "OL": `londonUndergroundOrMetroService`,
    "OU": `unadvertisedOrdinaryPassenger`,
    "OO": `ordinaryPassenger`,
    "OS": `staffTrain`,
    "OW": `mixed`,
    "XC": `channelTunnel`,
    "XD": `sleeperEuropeNightServices`,
    "XI": `international`,
    "XR": `motorail`,
    "XU": `unadvertisedExpress`,
    "XX": `expressPassenger`,
    "XZ": `sleeperDomestic`,
    "BR": `replacementBus`,
    "BS": `busWtt`,
    "SS": `ship`,
    "EE": `emptyCoachingStock`,
    "EL": `emptyCoachingStockLondonUndergroundOrMetroService`,
    "ES": `emptyCoachingStockAndStaff`,
    "JJ": `postal`,
    "PM": `postOfficeControlledParcels`,
    "PP": `parcels`,
    "PV": `emptyNpccs`,
    "DD": `departmental`,
    "DH": `civilEngineer`,
    "DI": `mechanicalAndElectricalEngineer`,
    "DQ": `stores`,
    "DT": `test`,
    "DY": `signalAndTelecommunicationsEngineer`,
    "ZB": `locomotiveAndBrakeVan`,
    "ZZ": `lightLocomotive`,
    "J2": `railfreightDistributionAutomotiveComponents`,
    "H2": `railfreightDistributionAutomotiveVehicles`,
    "J3": `railfreightDistributionEdibleProductsUkContracts`,
    "J4": `railfreightDistributionIndustrialMineralsUkContracts`,
    "J5": `railfreightDistributionChemicalsUkContracts`,
    "J6": `railfreightDistributionBuildingMaterialsUkContracts`,
    "J8": `railfreightDistributionGeneralMerchandiseUkContracts`,
    "H8": `railfreightDistributionEuropean`,
    "J9": `railfreightDistributionFreightlinerContracts`,
    "H9": `railfreightDistributionFreightlinerOther`,
    "A0": `coalDistributive`,
    "E0": `coalElectricityMgr`,
    "B0": `coalOtherAndNuclear`,
    "B1": `metals`,
    "B4": `aggregates`,
    "B5": `domesticAndIndustrialWaste`,
    "B6": `buildingMaterialsTlf`,
    "B7": `petroleumProducts`,
    "H0": `railfreightDistributionEuropeanChannelTunnelMixedBusiness`,
    "H1": `railfreightDistributionEuropeanChannelTunnelIntermodal`,
    "H3": `railfreightDistributionEuropeanChannelTunnelAutomotive`,
    "H4": `railfreightDistributionEuropeanChannelTunnelContractServices`,
    "H5": `railfreightDistributionEuropeanChannelTunnelHaulmark`,
    "H6": `railfreightDistributionEuropeanChannelTunnelJointVenture`
  })
}

const powerType = {
  powerType: fragments.enumOptional({
    "D  ": `dieselOrSteam`,
    "DEM": `dieselElectricMultipleUnit`,
    "DMU": `dieselMechanicalMultipleUnit`,
    "E  ": `electric`,
    "ED ": `electroDiesel`,
    "EML": `electricMultipleUnitPlusLocomotive`,
    "EMU": `electricMultipleUnit`,
    "HST": `highSpeedTrain`
  })
}

const sleepers = {
  sleepers: fragments.enumRequired({
    " ": [],
    "B": [`standardClass`, `firstClass`],
    "F": [`firstClass`],
    "S": [`standardClass`]
  })
}

const reservations = {
  reservations: fragments.enumOptional({
    "A": `seatsCompulsory`,
    "R": `seatsRecommended`,
    "S": `seatsPossibleFromAnyStation`,
    "E": `bicyclesEssential`
  })
}

const cateringCode = {
  cateringCode: fragments.flags(4, {
    "C": `buffetService`,
    "F": `resturauntCarAvailableForFirstClassPassengers`,
    "H": `hotFoodAvailable`,
    "M": `mealIncludedForFirstClassPassengers`,
    "P": `wheelchairOnlyReservations`,
    "R": `resturaunt`,
    "T": `trolleyService`
  })
}

export default {
  headerRecord: [
    { recordIdentity: fragments.constantRequired(`HD`) },
    { fileIdentity: fragments.stringRequired(20) },
    { dateTimeOfExtract: fragments.ddmmyyhhmmRequired },
    { currentFileReference: fragments.stringRequired(7) },
    { lastFileReference: fragments.stringOptional(7) },
    {
      updateIndicator: fragments.enumRequired({
        "U": `update`,
        "F": `full`
      })
    },
    { version: fragments.stringRequired(1) },
    { extractStartDate: fragments.ddmmyyRequired },
    { extractEndDate: fragments.ddmmyyRequired },
    { spare: fragments.stringOptional(20) }
  ],
  basicSchedule: [
    { recordIdentity: fragments.constantRequired(`BS`) },
    {
      transactionType: fragments.enumRequired({
        "N": `new`,
        "D": `delete`,
        "R": `revise`
      })
    },
    { trainUid: fragments.stringRequired(6) },
    { dateRunsFrom: fragments.yymmddRequired },
    { dateRunsTo: fragments.yymmddOptional },
    {
      daysRunMonday: fragments.enumOptional({
        "1": true,
        "0": false
      })
    },
    {
      daysRunTuesday: fragments.enumOptional({
        "1": true,
        "0": false
      })
    },
    {
      daysRunWednesday: fragments.enumOptional({
        "1": true,
        "0": false
      })
    },
    {
      daysRunThursday: fragments.enumOptional({
        "1": true,
        "0": false
      })
    },
    {
      daysRunFriday: fragments.enumOptional({
        "1": true,
        "0": false
      })
    },
    {
      daysRunSaturday: fragments.enumOptional({
        "1": true,
        "0": false
      })
    },
    {
      daysRunSunday: fragments.enumOptional({
        "1": true,
        "0": false
      })
    },
    {
      bankHolidayRunning: fragments.enumOptional({
        "X": `doesNotRunOnBankHolidayMondays`,
        "G": `doesNotRunOnGlasgowBankHolidays`
      })
    },
    {
      trainStatus: fragments.enumOptional({
        "B": `permanentBus`,
        "F": `permanentFreight`,
        "P": `permanentPassengerAndParcels`,
        "S": `permanentShip`,
        "T": `permanentTrip`,
        "1": `shortTermPlanPassengerAndParcels`,
        "2": `shortTermPlanFreight`,
        "3": `shortTermPlanTrip`,
        "4": `shortTermPlanShip`,
        "5": `shortTermPlanBus`
      })
    },
    trainCategory,
    { trainIdentity: fragments.stringOptional(4) },
    { headcode: fragments.stringOptional(4) },
    { courseIndicator: fragments.constantRequired(`1`) },
    { profitCentreCodeTrainServiceCode: fragments.unsignedOptional(8) },
    { businessSector: fragments.stringOptional(1) },
    powerType,
    { timingLoad: fragments.stringOptional(4) },
    { speed: fragments.unsignedOptional(3) },
    { operatingChars: fragments.stringOptional(6) },
    { trainClass: fragments.stringOptional(1) },
    sleepers,
    reservations,
    { connectIndicator: fragments.stringOptional(1) },
    cateringCode,
    { serviceBranding: fragments.stringOptional(4) },
    { spare: fragments.stringOptional(1) },
    {
      stpIndicator: fragments.enumRequired({
        "C": `cancellation`,
        "N": `new`,
        "O": `overlay`,
        "P": `permanent`
      })
    }
  ],
  basicScheduleExtra: [
    { recordIdentity: fragments.constantRequired(`BX`) },
    { tractionClass: fragments.stringOptional(4) },
    { uicCode: fragments.alphanumericOptional(4) },
    { uicCodeSpare: fragments.stringOptional(1) },
    { atocCode: fragments.stringRequired(2) },
    { applicableTimetableCode: fragments.constantRequired(`Y`) },
    { retailServiceId: fragments.stringOptional(8) },
    { source: fragments.stringOptional(1) },
    { spare: fragments.stringOptional(57) }
  ],
  originLocation: [
    { recordIdentity: fragments.constantRequired(`LO`) },
    { location: fragments.stringRequired(8) },
    { scheduledDepartureTime: fragments.hhmmRequired },
    { scheduledDepartureTimeSpare: fragments.stringOptional(1) },
    { publicDepartureTime: fragments.hhmmRequired },
    { platform: fragments.stringOptional(3) },
    { line: fragments.stringOptional(3) },
    { engineeringAllowance: fragments.stringOptional(2) },
    { pathingAllowance: fragments.stringOptional(2) },
    { activity: fragments.stringOptional(12) },
    { performanceAllowance: fragments.stringOptional(2) },
    { spare: fragments.stringOptional(37) }
  ],
  intermediateLocation: [
    { recordIdentity: fragments.constantRequired(`LI`) },
    { location: fragments.stringRequired(8) },
    { scheduledArrivalTime: fragments.hhmmOptional },
    { scheduledArrivalTimeSpare: fragments.stringOptional(1) },
    { scheduledDepartureTime: fragments.hhmmOptional },
    { scheduledDepartureTimeSpare: fragments.stringOptional(1) },
    { scheduledPass: fragments.hhmmOptional },
    { scheduledPassSpare: fragments.stringOptional(1) },
    { publicArrival: fragments.hhmmRequired },
    { publicDeparture: fragments.hhmmRequired },
    { platform: fragments.stringOptional(3) },
    { line: fragments.stringOptional(3) },
    { path: fragments.stringOptional(3) },
    { activity: fragments.stringOptional(12) },
    { engineeringAllowance: fragments.stringOptional(2) },
    { pathingAllowance: fragments.stringOptional(2) },
    { performanceAllowance: fragments.stringOptional(2) },
    { spare: fragments.stringOptional(20) }
  ],
  changesEnRoute: [
    { recordIdentity: fragments.constantRequired(`CR`) },
    { location: fragments.stringRequired(8) },
    trainCategory,
    { trainIdentity: fragments.stringOptional(4) },
    { headcode: fragments.stringOptional(4) },
    { courseIndicator: fragments.constantRequired(`1`) },
    { profitCentreCodeTrainServiceCode: fragments.unsignedOptional(8) },
    { businessSector: fragments.stringOptional(1) },
    powerType,
    { timingLoad: fragments.stringOptional(4) },
    { speed: fragments.unsignedOptional(3) },
    { operatingChars: fragments.stringOptional(6) },
    { trainClass: fragments.stringOptional(1) },
    sleepers,
    reservations,
    { connectIndicator: fragments.stringOptional(1) },
    cateringCode,
    { serviceBranding: fragments.stringOptional(4) },
    { tractionClass: fragments.stringOptional(4) },
    { uicCode: fragments.stringOptional(5) },
    { retailServiceId: fragments.stringOptional(8) },
    { spare: fragments.stringOptional(5) }
  ],
  terminatingLocation: [
    { recordIdentity: fragments.constantRequired(`LT`) },
    { location: fragments.stringRequired(8) },
    { scheduledArrivalTime: fragments.hhmmRequired },
    { scheduledArrivalTimeSpare: fragments.stringOptional(1) },
    { publicArrivalTime: fragments.hhmmRequired },
    { platform: fragments.stringOptional(3) },
    { path: fragments.stringOptional(3) },
    { activity: fragments.stringOptional(12) },
    { spare: fragments.stringOptional(43) }
  ],
  association: [
    { recordIdentity: fragments.constantRequired(`AA`) },
    {
      transactionType: fragments.enumRequired({
        "N": `new`,
        "D": `delete`,
        "R": `revise`
      })
    },
    { baseUid: fragments.alphanumericRequired(6) },
    { assocUid: fragments.alphanumericRequired(6) },
    { assocStartDate: fragments.yymmddRequired },
    { assocEndDate: fragments.yymmddRequired },
    {
      assocDaysMonday: fragments.enumOptional({
        "1": true,
        "0": false
      })
    },
    {
      assocDaysTuesday: fragments.enumOptional({
        "1": true,
        "0": false
      })
    },
    {
      assocDaysWednesday: fragments.enumOptional({
        "1": true,
        "0": false
      })
    },
    {
      assocDaysThursday: fragments.enumOptional({
        "1": true,
        "0": false
      })
    },
    {
      assocDaysFriday: fragments.enumOptional({
        "1": true,
        "0": false
      })
    },
    {
      assocDaysSaturday: fragments.enumOptional({
        "1": true,
        "0": false
      })
    },
    {
      assocDaysSunday: fragments.enumOptional({
        "1": true,
        "0": false
      })
    },
    { assocCat: fragments.stringOptional(2) },
    {
      assocDateInd: fragments.enumOptional({
        "S": `standard`,
        "N": `overNextMidnight`,
        "P": `overPreviousMidnight`
      })
    },
    { assocLocation: fragments.stringRequired(7) },
    { baseLocationSuffix: fragments.constantOptional(`2`) },
    { assocLocationSuffix: fragments.constantOptional(`2`) },
    { diagramType: fragments.constantRequired(`T`) },
    {
      associationType: fragments.enumOptional({
        "P": `passenger`,
        "O": `operating`
      })
    },
    { filler: fragments.stringOptional(31) },
    {
      stpIndicator: fragments.enumRequired({
        "C": `cancellation`,
        "N": `new`,
        "O": `overlay`,
        "P": `permanent`
      })
    }
  ],
  tiplocInsert: [
    { recordIdentity: fragments.constantRequired(`TI`) },
    { tiplocCode: fragments.stringRequired(7) },
    { capitals: fragments.unsignedRequired(2) },
    { nalco: fragments.unsignedRequired(6) },
    { nlcCheckCharacter: fragments.stringRequired(1) },
    { tpsDescription: fragments.stringOptional(26) },
    { stanox: fragments.unsignedRequired(5) },
    { poMcpCode: fragments.unsignedOptional(4) },
    { crsCode: fragments.alphanumericOptional(3) },
    { description: fragments.stringOptional(16) },
    { spare: fragments.stringOptional(8) }
  ],
  tiplocAmend: [
    { recordIdentity: fragments.constantRequired(`TA`) },
    { tiplocCode: fragments.stringRequired(7) },
    { capitals: fragments.unsignedOptional(2) },
    { nalco: fragments.unsignedOptional(6) },
    { nlcCheckCharacter: fragments.stringOptional(1) },
    { tpsDescription: fragments.stringOptional(26) },
    { stanox: fragments.unsignedOptional(5) },
    { poMcpCode: fragments.unsignedOptional(4) },
    { crsCode: fragments.alphanumericOptional(3) },
    { description: fragments.stringOptional(16) },
    { newTiploc: fragments.stringOptional(7) },
    { spare: fragments.stringOptional(1) }
  ],
  tiplocDelete: [
    { recordIdentity: fragments.constantRequired(`TD`) },
    { tiplocCode: fragments.stringRequired(7) },
    { spare: fragments.stringOptional(71) }
  ],
  trailerRecord: [
    { recordIdentity: fragments.constantRequired(`ZZ`) },
    { spare: fragments.stringOptional(78) }
  ]
}
