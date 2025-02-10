import { SetStateAction } from "react";
import { GeneralInformation, Maintenances, Modifications, Defects, Repairs } from "./interfaces";
import { PHOTOGRAPHS_SIZE, COMPONENTS_SIZE, DEFECTS_REPAIRED_SIZE } from "./constants";

export const addGeneralInformation = (setGeneralInformation: React.Dispatch<SetStateAction<GeneralInformation[]>>, brand: string, model: string, state: string, shift: string, fuel: string, climate: string, usage: string, storage: string) => {
  setGeneralInformation((prevGeneralInformation: GeneralInformation[]) => [
    ...prevGeneralInformation,
    {
      VIN: '',
      brand: brand,
      model: model,
      year: '',
      kilometers: '',
      mainPhotograph: '',
      state: state,
      photographs: Array.from({ length: PHOTOGRAPHS_SIZE }, () => ''),
      weight: '',
      color: '',
      engine: '',
      power: '',
      shift: shift,
      fuel: fuel,
      autonomy: '',
      climate: climate,
      usage: usage,
      storage: storage,
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
        kilometers: "",
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
        kilometers: "",
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
        kilometers: "",
        cause: "",
        type: Array.from({ length: 1 }, () => ({
          level: "",
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
        kilometers: "",
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