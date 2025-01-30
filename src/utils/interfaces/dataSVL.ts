export interface GeneralInformation {
  VIN: string;
  brand: string;
  model: string;
  year: string;
  kilometers: string;
  mainPhotograph: string;
  state: string;
  photographs: string[];
  weight: string;
  color: string;
  engine: string;
  power: string;
  shift: string;
  fuel: string;
  autonomy: string,
  climate: string;
  usage: string;
  storage: string;
  comments: string;
}

interface Maintenance {
  name: string;
  components: string[];
  pre: string[],
  post: string[],
  comments: string;
  shrinked: boolean;
}

export interface Maintenances {
  group: {
    date: string;
    kilometers: string;
    name: string;
    doneBy: [boolean, string, boolean, string];
    pre: string[],
    post: string[],
    maintenance: Maintenance[];
    shrinked: boolean;
    numMaintenances: number;
  }[];
  numGroups: number;
}

interface Modification {
  name: string;
  components: string[];
  pre: string[],
  post: string[],
  comments: string;
  shrinked: boolean;
}

export interface Modifications {
  group: {
    date: string;
    kilometers: string;
    name: string;
    doneBy: [string, string, boolean, string];
    pre: string[],
    post: string[],
    modification: Modification[];
    shrinked: boolean;
    numModifications: number;
  }[];
  numGroups: number;
}

interface Defect {
  level: string;
  photographs: string[],
  description: string;
  cause: string;
  shrinked: boolean;
}

export interface Defects {
  group: {
    date: string;
    kilometers: string;
    defect: Defect[];
    shrinked: boolean;
    numDefects: number;
  }[];
  numGroups: number;
}

interface Repair {
  name: string;
  components: string[];
  pre: string[],
  post: string[],
  comments: string;
  shrinked: boolean;
}

export interface Repairs {
  group: {
    date: string;
    kilometers: string;
    name: string;
    doneBy: [string, string, boolean, string];
    pre: string[],
    post: string[],
    defectsRepaired: [boolean, number, number, number][];
    repair: Repair[];
    shrinked: boolean;
    numRepairs: number;
  }[];
  numGroups: number;
}