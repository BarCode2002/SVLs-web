import { SetStateAction } from "react";
import { GeneralInformation, Maintenances, Modifications, Defects, Repairs } from "./interfaces";
import { PHOTOGRAPHS_SIZE, COMPONENTS_SIZE, DEFECTS_REPAIRED_SIZE } from "./constants";

export const addGeneralInformationPrev = (setGeneralInformation: React.Dispatch<SetStateAction<GeneralInformation[]>>, prevOwnersGeneralInformation: GeneralInformation[], numPreviousOwners: number) => {
  setGeneralInformation((prevGeneralInformation: GeneralInformation[]) => [
    ...prevGeneralInformation,
    {
      VIN: prevOwnersGeneralInformation[numPreviousOwners-1].VIN,
      brand: prevOwnersGeneralInformation[numPreviousOwners-1].brand,
      model: prevOwnersGeneralInformation[numPreviousOwners-1].model,
      year: prevOwnersGeneralInformation[numPreviousOwners-1].year,
      kilometers: [...prevOwnersGeneralInformation[numPreviousOwners-1].kilometers],
      mainPhotograph: prevOwnersGeneralInformation[numPreviousOwners-1].mainPhotograph,
      state: prevOwnersGeneralInformation[numPreviousOwners-1].state,
      photographs: [...(prevOwnersGeneralInformation[numPreviousOwners-1].photographs)],
      weight: [...prevOwnersGeneralInformation[numPreviousOwners-1].weight],
      color: prevOwnersGeneralInformation[numPreviousOwners-1].color,
      engine: prevOwnersGeneralInformation[numPreviousOwners-1].engine,
      power: [...prevOwnersGeneralInformation[numPreviousOwners-1].power],
      shift: prevOwnersGeneralInformation[numPreviousOwners-1].shift,
      fuel: prevOwnersGeneralInformation[numPreviousOwners-1].fuel,
      autonomy: [...prevOwnersGeneralInformation[numPreviousOwners-1].autonomy],
      climate: prevOwnersGeneralInformation[numPreviousOwners-1].climate,
      usage: prevOwnersGeneralInformation[numPreviousOwners-1].usage,
      storage: prevOwnersGeneralInformation[numPreviousOwners-1].storage,
      comments: prevOwnersGeneralInformation[numPreviousOwners-1].comments,
    },
  ]);
}

export const addGeneralInformation = (setGeneralInformation: React.Dispatch<SetStateAction<GeneralInformation[]>>) => {
  setGeneralInformation((prevGeneralInformation: GeneralInformation[]) => [
    ...prevGeneralInformation,
    {
      VIN: prevGeneralInformation[prevGeneralInformation.length-1].VIN,
      brand: prevGeneralInformation[prevGeneralInformation.length-1].brand,
      model: prevGeneralInformation[prevGeneralInformation.length-1].model,
      year: prevGeneralInformation[prevGeneralInformation.length-1].year,
      kilometers:  [...prevGeneralInformation[prevGeneralInformation.length-1].kilometers],
      mainPhotograph: prevGeneralInformation[prevGeneralInformation.length-1].mainPhotograph,
      state: prevGeneralInformation[prevGeneralInformation.length-1].state,
      photographs: [...(prevGeneralInformation[prevGeneralInformation.length-1].photographs)],
      weight:  [...prevGeneralInformation[prevGeneralInformation.length-1].weight],
      color: prevGeneralInformation[prevGeneralInformation.length-1].color,
      engine: prevGeneralInformation[prevGeneralInformation.length-1].engine,
      power:  [...prevGeneralInformation[prevGeneralInformation.length-1].power],
      shift: prevGeneralInformation[prevGeneralInformation.length-1].shift,
      fuel: prevGeneralInformation[prevGeneralInformation.length-1].fuel,
      autonomy:  [...prevGeneralInformation[prevGeneralInformation.length-1].autonomy],
      climate: prevGeneralInformation[prevGeneralInformation.length-1].climate,
      usage: prevGeneralInformation[prevGeneralInformation.length-1].usage,
      storage: prevGeneralInformation[prevGeneralInformation.length-1].storage,
      comments: prevGeneralInformation[prevGeneralInformation.length-1].comments,
    },
  ]);
}

export const addGeneralInformationDefault = (setGeneralInformation: React.Dispatch<SetStateAction<GeneralInformation[]>>) => {
  setGeneralInformation((prevGeneralInformation: GeneralInformation[]) => [
    ...prevGeneralInformation,
    {
      VIN: '',
      brand: 'DataSVL.Forms.brand',
      model: 'DataSVL.Forms.model',
      year: '',
      kilometers: ['', 'km'],
      mainPhotograph: '',
      state: 'DataSVL.Forms.state',
      photographs: Array.from({ length: PHOTOGRAPHS_SIZE }, () => ''),
      weight: ['', 'kg'],
      color: '',
      engine: '',
      power: ['', 'cv'],
      shift: 'DataSVL.Forms.shift',
      fuel: 'DataSVL.Forms.fuel',
      autonomy: ['', 'km'],
      climate: 'DataSVL.Forms.climate',
      usage: 'DataSVL.Forms.usage',
      storage: 'DataSVL.Forms.storage',
      comments: '',
    },
  ]);
}

export const addMaintenances = (setMaintenances: React.Dispatch<SetStateAction<Maintenances[]>>) => {
  setMaintenances((prevMaintenances: Maintenances[]) => [
    ...prevMaintenances,
    {
      group: Array.from({ length: 1 }, () => ({
        date: "",
        kilometers: ['', 'km'],
        name: "",
        responsible: [null, "", null, ""],
        pre: Array.from({ length: PHOTOGRAPHS_SIZE }, () => ''),
        post: Array.from({ length: PHOTOGRAPHS_SIZE }, () => ''),
        type: Array.from({ length: 1 }, () => ({
          name: "",
          components: Array.from({ length: COMPONENTS_SIZE }, () => ''),
          numComponents: 1,
          pre: Array.from({ length: PHOTOGRAPHS_SIZE }, () => ''),
          post: Array.from({ length: PHOTOGRAPHS_SIZE }, () => ''),
          comments: "",
          shrinked: false,
        })),
        shrinked: false,
      }))
    },
  ]);
}

export const addModifications = (setModifications: React.Dispatch<SetStateAction<Modifications[]>>) => {
  setModifications((prevModifications: Modifications[]) => [
    ...prevModifications,
    {
      group: Array.from({ length: 1 }, () => ({
        date: "",
        kilometers: ['', 'km'],
        name: "",
        responsible: [null, "", null, ""],
        pre: Array.from({ length: PHOTOGRAPHS_SIZE }, () => ''),
        post: Array.from({ length: PHOTOGRAPHS_SIZE }, () => ''),
        type: Array.from({ length: 1 }, () => ({
          name: "",
          components: Array.from({ length: COMPONENTS_SIZE }, () => ''),
          numComponents: 1,
          pre: Array.from({ length: PHOTOGRAPHS_SIZE }, () => ''),
          post: Array.from({ length: PHOTOGRAPHS_SIZE }, () => ''),
          comments: "",
          shrinked: false,
        })),
        shrinked: false,
      }))
    },
  ]);
}

export const addDefects = (setDefects: React.Dispatch<SetStateAction<Defects[]>>) => {
  setDefects((prevDefects: Defects[]) => [
    ...prevDefects,
    {
      group: Array.from({ length: 1 }, () => ({
        date: "",
        kilometers: ['', 'km'],
        cause: "",
        type: Array.from({ length: 1 }, () => ({
          level: 'DataSVL.Forms.level',
          components: Array.from({ length: COMPONENTS_SIZE }, () => ''),
          photographs: Array.from({ length: PHOTOGRAPHS_SIZE }, () => ''),
          description: "",
          shrinked: false,
        })),
        shrinked: false,
      }))
    },
  ]);
}

export const addRepairs = (setRepairs: React.Dispatch<SetStateAction<Repairs[]>>) => {
  setRepairs((prevRepairs: Repairs[]) => [
    ...prevRepairs,
    {
      group: Array.from({ length: 1 }, () => ({
        date: "",
        kilometers: ['', 'km'],
        name: "",
        responsible: [null, "", null, ""],
        pre: Array.from({ length: PHOTOGRAPHS_SIZE }, () => ''),
        post: Array.from({ length: PHOTOGRAPHS_SIZE }, () => ''),
        defectsRepaired: Array.from({ length: DEFECTS_REPAIRED_SIZE }, () => ([-1, -1, -1 ])),
        numDefectsRepaired: 0,
        type: Array.from({ length: 1 }, () => ({
          name: "",
          components: Array.from({ length: COMPONENTS_SIZE }, () => ''),
          numComponents: 1,
          pre: Array.from({ length: PHOTOGRAPHS_SIZE }, () => ''),
          post: Array.from({ length: PHOTOGRAPHS_SIZE }, () => ''),
          comments: "",
          shrinked: false,
        })),
        shrinked: false,
      }))
    },
  ]);
}