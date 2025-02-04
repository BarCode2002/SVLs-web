import { GeneralInformation, Maintenances, Modifications, Defects, Repairs } from "./dataSVL";

export const createJSON = (selectedOwner: number, generalInformation: GeneralInformation[], maintenances: Maintenances[], modifications: Modifications[], defects: Defects[], repairs: Repairs[]): any => {

  const dataSVL = [ 
    {
      totalOwners: '1', 
    },
    ...generalInformation.slice(selectedOwner, selectedOwner+1).map((item) => ({
      VIN: item.VIN,
      brand: item.brand,
      modelType: item.model,
      year: item.year,
      kilometers: item.kilometers,
      mainPhoto: item.mainPhotograph,
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
      defects: item.group
    })),
    ...repairs.slice(selectedOwner, selectedOwner+1).map((item) => ({
      repairs: item.group
    })),
  ];
  return JSON.stringify(dataSVL, null, 2);  
}