import { PossibleDefectsJsonVersions, PossibleGeneralInformationJsonVersions, PossibleMaintenancesJsonVersions, PossibleModificationsJsonVersions, PossibleRepairsJsonVersions } from "./commonTypes";

export const createJSON = (selectedOwner: number, generalInformation: PossibleGeneralInformationJsonVersions[], maintenances: PossibleMaintenancesJsonVersions[], modifications: PossibleModificationsJsonVersions[], defects: PossibleDefectsJsonVersions[], repairs: PossibleRepairsJsonVersions[], jsonVersion: string): any => {

  const dataSVL = [ 
    ...generalInformation.slice(selectedOwner, selectedOwner+1).map((item) => ({
      VIN: item.VIN,
      brand: item.brand,
      model: item.model,
      year: item.year,
      transferDate: item.transferDate,
      kilometers: item.kilometers,
      state: item.state,
      images: item.images,
      weight: item.weight,
      color: item.color,
      engine: item.engine,
      power: item.power,
      shift: item.shift,
      fuel: item.fuel,
      autonomy: item.autonomy,
      climate: item.climate,
      usage: item.usage,
      storage: item.storage,
      comments: item.comments
    })),
    ...maintenances.slice(selectedOwner, selectedOwner+1).map((item) => ({
      group: item.group,
    })),
    ...modifications.slice(selectedOwner, selectedOwner+1).map((item) => ({
      group: item.group,
    })),
    ...defects.slice(selectedOwner, selectedOwner+1).map((item) => ({
      group: item.group,
    })),
    ...repairs.slice(selectedOwner, selectedOwner+1).map((item) => ({
      group: item.group,
    })),
    {
      version: jsonVersion
    }
  ];
  return JSON.stringify(dataSVL, null, 2);  
}