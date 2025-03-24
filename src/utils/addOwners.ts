import { SetStateAction } from "react";
import { GeneralInformationBase } from "./baseTypes";
import { PHOTOGRAPHS_SIZE, COMPONENTS_SIZE, DEFECTS_REPAIRED_SIZE } from "./constants";
import { PossibleDefectsJsonVersions, PossibleGeneralInformationJsonVersions, PossibleMaintenancesJsonVersions, PossibleModificationsJsonVersions, PossibleRepairsJsonVersions } from "./commonTypes";
import { defaultBaseGeneralInformation } from './defaultBase';
import { cloneDeep } from 'lodash';

export const addGeneralInformationPrev = (setGeneralInformation: React.Dispatch<SetStateAction<PossibleGeneralInformationJsonVersions[]>>, prevOwnersGeneralInformation: GeneralInformationBase[], numPreviousOwners: number) => {
  setGeneralInformation((prevGeneralInformation: GeneralInformationBase[]) => [
    ...prevGeneralInformation,
    {
      VIN: prevOwnersGeneralInformation[numPreviousOwners-1].VIN,
      brand: prevOwnersGeneralInformation[numPreviousOwners-1].brand,
      model: prevOwnersGeneralInformation[numPreviousOwners-1].model,
      year: prevOwnersGeneralInformation[numPreviousOwners-1].year,
      transferDate: '',
      kilometers: ['', 'km'],
      mainPhotograph: prevOwnersGeneralInformation[numPreviousOwners-1].mainPhotograph,
      state: 'DataSVL.Forms.state',
      photographs: [...(prevOwnersGeneralInformation[numPreviousOwners-1].photographs)],
      weight: ['', 'kg'],
      color: prevOwnersGeneralInformation[numPreviousOwners-1].color,
      engine: prevOwnersGeneralInformation[numPreviousOwners-1].engine,
      power: ['', 'cv'],
      shift: prevOwnersGeneralInformation[numPreviousOwners-1].shift,
      fuel: prevOwnersGeneralInformation[numPreviousOwners-1].fuel,
      autonomy: [...prevOwnersGeneralInformation[numPreviousOwners-1].autonomy],
      climate: 'DataSVL.Forms.climate',
      usage: 'DataSVL.Forms.usage',
      storage: 'DataSVL.Forms.storage',
      comments: '',
    },
  ]);
}

export const addGeneralInformation = (setGeneralInformation: React.Dispatch<SetStateAction<PossibleGeneralInformationJsonVersions[]>>) => {
  setGeneralInformation((prevGeneralInformation: GeneralInformationBase[]) => [
    ...prevGeneralInformation,
    {
      VIN: prevGeneralInformation[prevGeneralInformation.length-1].VIN,
      brand: prevGeneralInformation[prevGeneralInformation.length-1].brand,
      model: prevGeneralInformation[prevGeneralInformation.length-1].model,
      year: prevGeneralInformation[prevGeneralInformation.length-1].year,
      transferDate: '',
      kilometers: ['', 'km'],
      mainPhotograph: prevGeneralInformation[prevGeneralInformation.length-1].mainPhotograph,
      state: 'DataSVL.Forms.state',
      photographs: [...(prevGeneralInformation[prevGeneralInformation.length-1].photographs)],
      weight: prevGeneralInformation[prevGeneralInformation.length-1].weight,
      color: prevGeneralInformation[prevGeneralInformation.length-1].color,
      engine: prevGeneralInformation[prevGeneralInformation.length-1].engine,
      power: prevGeneralInformation[prevGeneralInformation.length-1].power,
      shift: prevGeneralInformation[prevGeneralInformation.length-1].shift,
      fuel: prevGeneralInformation[prevGeneralInformation.length-1].fuel,
      autonomy:  [...prevGeneralInformation[prevGeneralInformation.length-1].autonomy],
      climate: 'DataSVL.Forms.climate',
      usage: 'DataSVL.Forms.usage',
      storage: 'DataSVL.Forms.storage',
      comments: '',
    },
  ]);
}

export const addGeneralInformationDefault = (setGeneralInformation: React.Dispatch<SetStateAction<PossibleGeneralInformationJsonVersions[]>>) => {
  setGeneralInformation((prevGeneralInformation: GeneralInformationBase[]) => [
    ...prevGeneralInformation,
    cloneDeep(defaultBaseGeneralInformation)
  ]);
}

export const addMaintenances = (setMaintenances: React.Dispatch<SetStateAction<PossibleMaintenancesJsonVersions[]>>, jsonVersion: string) => {
  if (jsonVersion == 'base') {
    setMaintenances((prevMaintenances: PossibleMaintenancesJsonVersions[]) => [
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
            numComponents: 0,
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
  else if (jsonVersion == 'baseSimple') {
    setMaintenances((prevMaintenances: PossibleMaintenancesJsonVersions[]) => [
      ...prevMaintenances,
      {
        group: Array.from({ length: 1 }, () => ({
          date: "",
          kilometers: ['', 'km'],
          name: "",
          responsible: [null, "", null, ""],
          images: Array.from({ length: PHOTOGRAPHS_SIZE }, () => ''),
          type: Array.from({ length: 1 }, () => ({
            name: "",
            images: Array.from({ length: PHOTOGRAPHS_SIZE }, () => ''),
            comments: "",
            shrinked: false,
          })),
          shrinked: false,
        }))
      },
    ]);
  }
}

export const addModifications = (setModifications: React.Dispatch<SetStateAction<PossibleModificationsJsonVersions[]>>, jsonVersion: string) => {
  if (jsonVersion == 'base') {
    setModifications((prevModifications: PossibleModificationsJsonVersions[]) => [
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
            numComponents: 0,
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
  else if (jsonVersion == 'baseSimple') {
    setModifications((prevModifications: PossibleModificationsJsonVersions[]) => [
      ...prevModifications,
      {
        group: Array.from({ length: 1 }, () => ({
          date: "",
          kilometers: ['', 'km'],
          name: "",
          responsible: [null, "", null, ""],
          images: Array.from({ length: PHOTOGRAPHS_SIZE }, () => ''),
          type: Array.from({ length: 1 }, () => ({
            name: "",
            images: Array.from({ length: PHOTOGRAPHS_SIZE }, () => ''),
            comments: "",
            shrinked: false,
          })),
          shrinked: false,
        }))
      },
    ]);
  }
}

export const addDefects = (setDefects: React.Dispatch<SetStateAction<PossibleDefectsJsonVersions[]>>) => {
  setDefects((prevDefects: PossibleDefectsJsonVersions[]) => [
    ...prevDefects,
    {
      group: Array.from({ length: 1 }, () => ({
        date: "",
        kilometers: ['', 'km'],
        cause: "",
        type: Array.from({ length: 1 }, () => ({
          level: 'DataSVL.Forms.level',
          images: Array.from({ length: PHOTOGRAPHS_SIZE }, () => ''),
          description: "",
          shrinked: false,
        })),
        shrinked: false,
      }))
    },
  ]);
}

export const addRepairs = (setRepairs: React.Dispatch<SetStateAction<PossibleRepairsJsonVersions[]>>, jsonVersion: string) => {
  if (jsonVersion == 'base') {
    setRepairs((prevRepairs: PossibleRepairsJsonVersions[]) => [
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
            numComponents: 0,
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
  else if (jsonVersion == 'baseSimple') {
    setRepairs((prevRepairs: PossibleRepairsJsonVersions[]) => [
      ...prevRepairs,
      {
        group: Array.from({ length: 1 }, () => ({
          date: "",
          kilometers: ['', 'km'],
          name: "",
          responsible: [null, "", null, ""],
          images: Array.from({ length: PHOTOGRAPHS_SIZE }, () => ''),
          defectsRepaired: Array.from({ length: DEFECTS_REPAIRED_SIZE }, () => ([-1, -1, -1 ])),
          numDefectsRepaired: 0,
          type: Array.from({ length: 1 }, () => ({
            name: "",
            images: Array.from({ length: PHOTOGRAPHS_SIZE }, () => ''),
            comments: "",
            shrinked: false,
          })),
          shrinked: false,
        }))
      },
    ]);
  }
}