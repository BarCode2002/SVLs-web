import { GeneralInformationBaseSimple, MaintenancesBaseSimple, ModificationsBaseSimple, DefectsBaseSimple, RepairsBaseSimple } from "./baseSimpleTypes";
import { DEFECTS_REPAIRED_SIZE, PHOTOGRAPHS_SIZE } from "./constants";

export const defaultBaseSimpleGeneralInformation: GeneralInformationBaseSimple = {
  VIN: '',
  brand: 'DataSVL.Forms.brand',
  model: 'DataSVL.Forms.model',
  year: '',
  kilometers: ['', 'km'],
  transferDate: '',
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
}

export const defaultBaseSimpleMaintenances: MaintenancesBaseSimple = {
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
}

export const defaultBaseSimpleModifications: ModificationsBaseSimple = {
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
}

export const defaultBaseSimpleDefects: DefectsBaseSimple = {
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

export const defaultBaseSimpleRepairs: RepairsBaseSimple = {
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
}