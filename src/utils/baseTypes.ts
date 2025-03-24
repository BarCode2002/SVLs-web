export type GeneralInformationBase = {
  VIN: string;
  brand: string;
  model: string;
  year: string;
  kilometers: [string, string];
  transferDate: string;
  mainPhotograph: string;
  state: string;
  photographs: string[];
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

type MaintenanceBase = {
  name: string;
  components: string[];
  numComponents: number;
  pre: string[],
  post: string[],
  comments: string;
  shrinked: boolean;
}

export type MaintenancesBase = {
  group: {
    date: string;
    kilometers: [string, string];
    name: string;
    responsible: [number | null, string, boolean | null, string];
    pre: string[],
    post: string[],
    type: MaintenanceBase[];
    shrinked: boolean;
  }[];
}

type ModificationBase = {
  name: string;
  components: string[];
  numComponents: number;
  pre: string[],
  post: string[],
  comments: string;
  shrinked: boolean;
}

export type ModificationsBase = {
  group: {
    date: string;
    kilometers: [string, string];
    name: string;
    responsible: [number | null, string, boolean | null, string];
    pre: string[],
    post: string[],
    type: ModificationBase[];
    shrinked: boolean;
  }[];
}

type DefectBase = {
  level: string;
  images: string[],
  description: string;
  shrinked: boolean;
}

export type DefectsBase = {
  group: {
    date: string;
    kilometers: [string, string];
    cause: string;
    type: DefectBase[];
    shrinked: boolean;
  }[];
}

type RepairBase = {
  name: string;
  components: string[];
  numComponents: number;
  pre: string[],
  post: string[],
  comments: string;
  shrinked: boolean;
}

export type RepairsBase = {
  group: {
    date: string;
    kilometers: [string, string];
    name: string;
    responsible: [number | null, string, boolean | null, string];
    pre: string[],
    post: string[],
    defectsRepaired: [number, number, number][];
    numDefectsRepaired: number;
    type: RepairBase[];
    shrinked: boolean;
  }[];
}