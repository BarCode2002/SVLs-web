import { GeneralInformationBase, MaintenancesBase, ModificationsBase, DefectsBase, RepairsBase } from "./baseTypes";

export const createJSON = (selectedOwner: number, generalInformation: GeneralInformationBase[], maintenances: MaintenancesBase[], modifications: ModificationsBase[], defects: DefectsBase[], repairs: RepairsBase[]): any => {

  const dataSVL = [ 
    ...generalInformation.slice(selectedOwner, selectedOwner+1).map((item) => ({
      VIN: item.VIN,
      brand: item.brand,
      model: item.model,
      year: item.year,
      transferDate: item.transferDate,
      kilometers: item.kilometers,
      mainPhotograph: item.mainPhotograph,
      state: item.state,
      photographs: item.photographs,
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
      maintenances: item.group,
    })),
    ...modifications.slice(selectedOwner, selectedOwner+1).map((item) => ({
      modifications: item.group,
    })),
    ...defects.slice(selectedOwner, selectedOwner+1).map((item) => ({
      defects: item.group,
    })),
    ...repairs.slice(selectedOwner, selectedOwner+1).map((item) => ({
      repairs: item.group,
    })),
    {
      version: "base"
    }
  ];
  return JSON.stringify(dataSVL, null, 2);  
}