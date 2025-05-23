export type GeneralInformationBaseSimple = {
  VIN: string;
  brand: string;
  model: string;
  year: string;
  kilometers: [string, string];
  transferDate: string;
  state: string;
  images: string[];
  weight: [string, string];
  color: string;
  engine: string;
  power: [string, string];
  shift: string;
  fuel: string;
  autonomy: [string, string],
  climate: string;
  usage: string;
  storage: string;
  comments: string;
}

type MaintenanceBaseSimple = {
  name: string;
  images: string[];
  comments: string;
  shrinked: boolean;
}

export type MaintenancesBaseSimple = {
  group: {
    date: string;
    kilometers: [string, string];
    name: string;
    responsible: [number | null, string, boolean | null, string];
    images: string[];
    element: MaintenanceBaseSimple[];
    shrinked: boolean;
  }[];
}

type ModificationBaseSimple = {
  name: string;
  images: string[];
  comments: string;
  shrinked: boolean;
}

export type ModificationsBaseSimple = {
  group: {
    date: string;
    kilometers: [string, string];
    name: string;
    responsible: [number | null, string, boolean | null, string];
    images: string[];
    element: ModificationBaseSimple[];
    shrinked: boolean;
  }[];
}

type DefectBaseSimple = {
  level: string;
  images: string[],
  description: string;
  shrinked: boolean;
}

export type DefectsBaseSimple = {
  group: {
    date: string;
    kilometers: [string, string];
    cause: string;
    element: DefectBaseSimple[];
    shrinked: boolean;
  }[];
}

type RepairBaseSimple = {
  name: string;
  images: string[];
  comments: string;
  shrinked: boolean;
}

export type RepairsBaseSimple = {
  group: {
    date: string;
    kilometers: [string, string];
    name: string;
    responsible: [number | null, string, boolean | null, string];
    images: string[];
    defectsRepaired: [number, number, number][];
    numDefectsRepaired: number;
    element: RepairBaseSimple[];
    shrinked: boolean;
  }[];
}