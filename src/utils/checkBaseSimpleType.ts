import { DefectsBaseSimple, GeneralInformationBaseSimple, MaintenancesBaseSimple, ModificationsBaseSimple, RepairsBaseSimple } from "./baseSimpleTypes";
import { PossibleDefectsJsonVersions, PossibleGeneralInformationJsonVersions, PossibleMaintenancesJsonVersions, PossibleModificationsJsonVersions, PossibleRepairsJsonVersions } from "./commonTypes";

export const isGeneralInformationBaseSimple = (data: PossibleGeneralInformationJsonVersions): data is GeneralInformationBaseSimple => {
  return (data as GeneralInformationBaseSimple).VIN != undefined && 
    (data as GeneralInformationBaseSimple).brand != undefined && 
    (data as GeneralInformationBaseSimple).model != undefined && 
    (data as GeneralInformationBaseSimple).year != undefined && 
    (data as GeneralInformationBaseSimple).transferDate != undefined && 
    (data as GeneralInformationBaseSimple).kilometers != undefined && 
    (data as GeneralInformationBaseSimple).mainPhotograph != undefined && 
    (data as GeneralInformationBaseSimple).photographs != undefined && 
    (data as GeneralInformationBaseSimple).state != undefined && 
    (data as GeneralInformationBaseSimple).weight != undefined && 
    (data as GeneralInformationBaseSimple).color != undefined && 
    (data as GeneralInformationBaseSimple).engine != undefined && 
    (data as GeneralInformationBaseSimple).power != undefined && 
    (data as GeneralInformationBaseSimple).shift != undefined && 
    (data as GeneralInformationBaseSimple).fuel != undefined && 
    (data as GeneralInformationBaseSimple).autonomy != undefined && 
    (data as GeneralInformationBaseSimple).climate != undefined && 
    (data as GeneralInformationBaseSimple).usage != undefined && 
    (data as GeneralInformationBaseSimple).storage != undefined && 
    (data as GeneralInformationBaseSimple).comments != undefined
};

export const isMaintenancesBaseSimple = (data: PossibleMaintenancesJsonVersions, groupIndex: number, typeIndex?: number): data is MaintenancesBaseSimple => {
  if (typeIndex != undefined) {
    return (data as MaintenancesBaseSimple).group[groupIndex].type[typeIndex].name !== undefined && 
      (data as MaintenancesBaseSimple).group[groupIndex].type[typeIndex].images !== undefined && 
      (data as MaintenancesBaseSimple).group[groupIndex].type[typeIndex].comments !== undefined
  }
  else {
    return (data as MaintenancesBaseSimple).group[groupIndex].date != undefined &&
      (data as MaintenancesBaseSimple).group[groupIndex].kilometers != undefined &&
      (data as MaintenancesBaseSimple).group[groupIndex].name != undefined && 
      (data as MaintenancesBaseSimple).group[groupIndex].responsible != undefined &&
      (data as MaintenancesBaseSimple).group[groupIndex].images != undefined
  }
};

export const isModificationsBaseSimple = (data: PossibleModificationsJsonVersions, groupIndex: number, typeIndex?: number): data is ModificationsBaseSimple => {
  if (typeIndex != undefined) {
    return (data as ModificationsBaseSimple).group[groupIndex].type[typeIndex].name !== undefined && 
      (data as ModificationsBaseSimple).group[groupIndex].type[typeIndex].images !== undefined && 
      (data as ModificationsBaseSimple).group[groupIndex].type[typeIndex].comments !== undefined
  }
  else {
    return (data as ModificationsBaseSimple).group[groupIndex].date != undefined &&
      (data as ModificationsBaseSimple).group[groupIndex].kilometers != undefined &&
      (data as ModificationsBaseSimple).group[groupIndex].name != undefined && 
      (data as ModificationsBaseSimple).group[groupIndex].responsible != undefined &&
      (data as ModificationsBaseSimple).group[groupIndex].images != undefined
  }
};

export const isDefectsBaseSimple = (data: PossibleDefectsJsonVersions, groupIndex: number, typeIndex?: number): data is DefectsBaseSimple => {
  if (typeIndex != undefined) {
    return (data as DefectsBaseSimple).group[groupIndex].type[typeIndex].level !== undefined && 
      (data as DefectsBaseSimple).group[groupIndex].type[typeIndex].images !== undefined && 
      (data as DefectsBaseSimple).group[groupIndex].type[typeIndex].description !== undefined
  }
  else {
    return (data as DefectsBaseSimple).group[groupIndex].date != undefined &&
      (data as DefectsBaseSimple).group[groupIndex].kilometers != undefined &&
      (data as DefectsBaseSimple).group[groupIndex].cause != undefined
  }
};

export const isRepairsBaseSimple = (data: PossibleRepairsJsonVersions, groupIndex: number, typeIndex?: number): data is RepairsBaseSimple => {
  if (typeIndex != undefined) {
    return (data as RepairsBaseSimple).group[groupIndex].type[typeIndex].name !== undefined && 
      (data as RepairsBaseSimple).group[groupIndex].type[typeIndex].images !== undefined && 
      (data as RepairsBaseSimple).group[groupIndex].type[typeIndex].comments !== undefined
  }
  else {
    return (data as RepairsBaseSimple).group[groupIndex].date != undefined &&
      (data as RepairsBaseSimple).group[groupIndex].kilometers != undefined &&
      (data as RepairsBaseSimple).group[groupIndex].name != undefined && 
      (data as RepairsBaseSimple).group[groupIndex].responsible != undefined &&
      (data as RepairsBaseSimple).group[groupIndex].images != undefined &&
      (data as RepairsBaseSimple).group[groupIndex].defectsRepaired != undefined &&
      (data as RepairsBaseSimple).group[groupIndex].numDefectsRepaired != undefined
  }
};