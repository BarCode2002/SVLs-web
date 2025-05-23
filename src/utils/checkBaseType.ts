import { DefectsBase, GeneralInformationBase, MaintenancesBase, ModificationsBase, RepairsBase } from "./baseTypes";
import { PossibleDefectsJsonVersions, PossibleGeneralInformationJsonVersions, PossibleMaintenancesJsonVersions, PossibleModificationsJsonVersions, PossibleRepairsJsonVersions } from "./commonTypes";

export const isGeneralInformationBase = (data: PossibleGeneralInformationJsonVersions): data is GeneralInformationBase => {
  return (data as GeneralInformationBase).VIN != undefined && 
    (data as GeneralInformationBase).brand != undefined && 
    (data as GeneralInformationBase).model != undefined && 
    (data as GeneralInformationBase).year != undefined && 
    (data as GeneralInformationBase).transferDate != undefined && 
    (data as GeneralInformationBase).kilometers != undefined && 
    (data as GeneralInformationBase).images != undefined && 
    (data as GeneralInformationBase).state != undefined && 
    (data as GeneralInformationBase).weight != undefined && 
    (data as GeneralInformationBase).color != undefined && 
    (data as GeneralInformationBase).engine != undefined && 
    (data as GeneralInformationBase).power != undefined && 
    (data as GeneralInformationBase).shift != undefined && 
    (data as GeneralInformationBase).fuel != undefined && 
    (data as GeneralInformationBase).autonomy != undefined && 
    (data as GeneralInformationBase).climate != undefined && 
    (data as GeneralInformationBase).usage != undefined && 
    (data as GeneralInformationBase).storage != undefined && 
    (data as GeneralInformationBase).comments != undefined
};

export const isMaintenancesBase = (data: PossibleMaintenancesJsonVersions, groupIndex: number, elementIndex?: number): data is MaintenancesBase => {
  if (elementIndex != undefined) {
    return (data as MaintenancesBase).group[groupIndex].element[elementIndex].name != undefined && 
      (data as MaintenancesBase).group[groupIndex].element[elementIndex].components != undefined && 
      (data as MaintenancesBase).group[groupIndex].element[elementIndex].numComponents != undefined &&
      (data as MaintenancesBase).group[groupIndex].element[elementIndex].pre != undefined &&
      (data as MaintenancesBase).group[groupIndex].element[elementIndex].post != undefined &&
      (data as MaintenancesBase).group[groupIndex].element[elementIndex].comments != undefined
  }
  else {
    return (data as MaintenancesBase).group[groupIndex].date != undefined && 
      (data as MaintenancesBase).group[groupIndex].kilometers != undefined &&
      (data as MaintenancesBase).group[groupIndex].name != undefined && 
      (data as MaintenancesBase).group[groupIndex].responsible != undefined &&
      (data as MaintenancesBase).group[groupIndex].pre != undefined && 
      (data as MaintenancesBase).group[groupIndex].post != undefined
  }
};

export const isModificationsBase = (data: PossibleModificationsJsonVersions, groupIndex: number, elementIndex?: number): data is ModificationsBase => {
  if (elementIndex != undefined) {
    return (data as ModificationsBase).group[groupIndex].element[elementIndex].name !== undefined && 
      (data as ModificationsBase).group[groupIndex].element[elementIndex].comments !== undefined && 
      (data as ModificationsBase).group[groupIndex].element[elementIndex].numComponents !== undefined &&
      (data as ModificationsBase).group[groupIndex].element[elementIndex].pre !== undefined &&
      (data as ModificationsBase).group[groupIndex].element[elementIndex].post !== undefined
  }
  else {
    return (data as ModificationsBase).group[groupIndex].date != undefined &&
      (data as ModificationsBase).group[groupIndex].kilometers != undefined &&
      (data as ModificationsBase).group[groupIndex].name != undefined && 
      (data as ModificationsBase).group[groupIndex].responsible != undefined &&
      (data as ModificationsBase).group[groupIndex].pre != undefined &&
      (data as ModificationsBase).group[groupIndex].post != undefined
  }
};

export const isDefectsBase = (data: PossibleDefectsJsonVersions, groupIndex: number, elementIndex?: number): data is DefectsBase => {
  if (elementIndex != undefined) {
    return (data as DefectsBase).group[groupIndex].element[elementIndex].level !== undefined && 
      (data as DefectsBase).group[groupIndex].element[elementIndex].images !== undefined && 
      (data as DefectsBase).group[groupIndex].element[elementIndex].description !== undefined
  }
  else {
    return (data as DefectsBase).group[groupIndex].date != undefined &&
      (data as DefectsBase).group[groupIndex].kilometers != undefined &&
      (data as DefectsBase).group[groupIndex].cause != undefined
  }
};

export const isRepairsBase = (data: PossibleRepairsJsonVersions, groupIndex: number, elementIndex?: number): data is RepairsBase => {
  if (elementIndex != undefined) {
    return (data as RepairsBase).group[groupIndex].element[elementIndex].name !== undefined && 
      (data as RepairsBase).group[groupIndex].element[elementIndex].comments !== undefined && 
      (data as RepairsBase).group[groupIndex].element[elementIndex].numComponents !== undefined && 
      (data as RepairsBase).group[groupIndex].element[elementIndex].pre !== undefined && 
      (data as RepairsBase).group[groupIndex].element[elementIndex].post !== undefined && 
      (data as RepairsBase).group[groupIndex].element[elementIndex].comments !== undefined
  }
  else {
    return (data as RepairsBase).group[groupIndex].date != undefined &&
      (data as RepairsBase).group[groupIndex].kilometers != undefined &&
      (data as RepairsBase).group[groupIndex].name != undefined && 
      (data as RepairsBase).group[groupIndex].responsible != undefined &&
      (data as RepairsBase).group[groupIndex].pre != undefined &&
      (data as RepairsBase).group[groupIndex].post != undefined &&
      (data as RepairsBase).group[groupIndex].defectsRepaired != undefined &&
      (data as RepairsBase).group[groupIndex].numDefectsRepaired != undefined
  }
};