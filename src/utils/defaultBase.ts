import { DefectsBase, GeneralInformationBase, MaintenancesBase, ModificationsBase, RepairsBase } from "./baseTypes";
import { COMPONENTS_SIZE, DEFECTS_REPAIRED_SIZE, PHOTOGRAPHS_SIZE } from "./constants";

export const defaultBaseGeneralInformation: GeneralInformationBase = {
  VIN: '',
  brand: 'DataSVL.Forms.brand',
  model: 'DataSVL.Forms.model',
  year: '',
  kilometers: ['', 'km'],
  transferDate: '',
  state: 'DataSVL.Forms.state',
  images: Array.from({ length: PHOTOGRAPHS_SIZE }, () => ''),
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
}

export const defaultBaseMaintenances: MaintenancesBase = {
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
}

export const defaultBaseModifications: ModificationsBase = {
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
}

export const defaultBaseDefects: DefectsBase = {
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
}

export const defaultBaseRepairs: RepairsBase = {
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
}