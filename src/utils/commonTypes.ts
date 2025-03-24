import { DefectsBaseSimple, GeneralInformationBaseSimple, MaintenancesBaseSimple, ModificationsBaseSimple, RepairsBaseSimple } from "./baseSimpleTypes";
import { DefectsBase, GeneralInformationBase, MaintenancesBase, ModificationsBase, RepairsBase } from "./baseTypes";

export type PossibleGeneralInformationJsonVersions = 
  GeneralInformationBase | GeneralInformationBaseSimple
;

export type PossibleMaintenancesJsonVersions = 
  MaintenancesBase | MaintenancesBaseSimple
;

export type PossibleModificationsJsonVersions = 
  ModificationsBase | ModificationsBaseSimple
;

export type PossibleDefectsJsonVersions = 
  DefectsBase | DefectsBaseSimple
;

export type PossibleRepairsJsonVersions = 
  RepairsBase | RepairsBaseSimple
;

export type PreviewSVLsInfo = {
  pk: string;
  price: number;
  mySVL: boolean | null;
  mainPhotograph: string;
  brand: string;
  model: string;
  year: string;
  stateMySVL: [boolean | null, string, boolean | null];
  //requested or not / requester address / request accepted or not
  stateNotMySVL: [boolean | null, string, string, boolean | null, boolean | null];
  //requested or not / owner address / requester address / request accepted or not / just transferred(curr_owner_info == '') or not 
}

export type OwnershipSummary = {
  ownerAddress: string;
  owners: string[];
  transferDate: string;
}

export type FilterSVLsType = {
  key: string;
  numOwners: string[];
  numMaintenances: string[]; 
  numModifications: string[]; 
  defects: {
    cosmetic: [boolean, string, string],
    minor: [boolean, string, string],
    moderate: [boolean, string, string],
    important: [boolean, string, string],
    critical: [boolean, string, string]
  };
  numRepairs: string[];
  vin: string;
  brand: string;
  model: string;
  year: string[];
  kilometers: string[];
  state: string[];
  weight: string[];
  power: string[];
  shift: string[];
  fuel: string[];
  autonomy: string[];
  climate: string[];
  usage: string[];
  storage: string[];
}