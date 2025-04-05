import { GeneralInformationBaseSimple, MaintenancesBaseSimple, ModificationsBaseSimple, DefectsBaseSimple, RepairsBaseSimple } from "./baseSimpleTypes";
import { DEFECTS_REPAIRED_SIZE, PHOTOGRAPHS_SIZE } from "./constants";

export const defaultBaseSimpleGeneralInformation: GeneralInformationBaseSimple = {
  VIN: '',
  brand: '',
  model: '',
  year: '',
  kilometers: ['', 'km'],
  transferDate: '',
  state: '',
  images: Array.from({ length: PHOTOGRAPHS_SIZE }, () => ''),
  weight: ['', 'kg'],
  color: '',
  engine: '',
  power: ['', 'cv'],
  shift: '',
  fuel: '',
  autonomy: ['', 'km'],
  climate: '',
  usage: '',
  storage: '',
  comments: '',
}

export const defaultBaseSimpleMaintenances: MaintenancesBaseSimple = {
  group: Array.from({ length: 1 }, () => ({
    date: "",
    kilometers: ['', 'km'],
    name: "",
    responsible: [null, "", null, ""],
    images: Array.from({ length: PHOTOGRAPHS_SIZE }, () => ''),
    element: Array.from({ length: 1 }, () => ({
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
    element: Array.from({ length: 1 }, () => ({
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
    element: Array.from({ length: 1 }, () => ({
      level: '',
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
    element: Array.from({ length: 1 }, () => ({
      name: "",
      images: Array.from({ length: PHOTOGRAPHS_SIZE }, () => ''),
      comments: "",
      shrinked: false,
    })),
    shrinked: false,
  }))
}