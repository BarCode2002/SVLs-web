import { DefectsBase, GeneralInformationBase, MaintenancesBase, ModificationsBase, RepairsBase } from "./baseTypes";
import { COMPONENTS_SIZE, DEFECTS_REPAIRED_SIZE, PHOTOGRAPHS_SIZE } from "./constants";

export const defaultBaseGeneralInformation: GeneralInformationBase = {
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

export const defaultBaseMaintenances: MaintenancesBase = {
  group: Array.from({ length: 1 }, () => ({
    date: "",
    kilometers: ['', 'km'],
    name: "",
    responsible: [null, "", null, ""],
    pre: Array.from({ length: PHOTOGRAPHS_SIZE }, () => ''),
    post: Array.from({ length: PHOTOGRAPHS_SIZE }, () => ''),
    element: Array.from({ length: 1 }, () => ({
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
    element: Array.from({ length: 1 }, () => ({
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
    element: Array.from({ length: 1 }, () => ({
      level: '',
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
    element: Array.from({ length: 1 }, () => ({
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