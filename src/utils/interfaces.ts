export interface GeneralInformation {
  VIN: string;
  brand: string;
  model: string;
  year: string;
  kilometers: [string, string];
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

interface Maintenance {
  name: string;
  components: string[];
  numComponents: number;
  pre: string[],
  post: string[],
  comments: string;
  shrinked: boolean;
}

export interface Maintenances {
  group: {
    date: string;
    kilometers: [string, string];
    name: string;
    responsible: [number | null, string, boolean | null, string];
    pre: string[],
    post: string[],
    type: Maintenance[];
    shrinked: boolean;
  }[];
}

interface Modification {
  name: string;
  components: string[];
  numComponents: number;
  pre: string[],
  post: string[],
  comments: string;
  shrinked: boolean;
}

export interface Modifications {
  group: {
    date: string;
    kilometers: [string, string];
    name: string;
    responsible: [number | null, string, boolean | null, string];
    pre: string[],
    post: string[],
    type: Modification[];
    shrinked: boolean;
  }[];
}

interface Defect {
  level: string;
  photographs: string[],
  description: string;
  shrinked: boolean;
}

export interface Defects {
  group: {
    date: string;
    kilometers: [string, string];
    cause: string;
    type: Defect[];
    shrinked: boolean;
  }[];
}

interface Repair {
  name: string;
  components: string[];
  numComponents: number;
  pre: string[],
  post: string[],
  comments: string;
  shrinked: boolean;
}

export interface Repairs {
  group: {
    date: string;
    kilometers: [string, string];
    name: string;
    responsible: [number | null, string, boolean | null, string];
    pre: string[],
    post: string[],
    defectsRepaired: [number, number, number][];
    numDefectsRepaired: number;
    type: Repair[];
    shrinked: boolean;
  }[];
}

export interface PreviewSVLsInfo {
  pk: string;
  price: number;
  mySVL: boolean | null;
  mainPhotograph: string;
  brand: string;
  model: string;
  year: string;
  stateMySVL: [boolean | null, string, boolean | null];
  //requested or not / requester address / request accepted or not
  stateNotMySVL: [boolean | null, string, string, boolean | null];
  //requested or not / owner address / requester address / request accepted or not
}

export interface OwnershipSummary {
  ownerAddress: string;
  owners: string[];
  transferDate: string;
}

export interface FilterSVLsInterface {
  numOwners: string[];
  numMaintenances: string[]; 
  defects: {
    cosmetic: [boolean, string, string],
    minor: [boolean, string, string],
    moderate: [boolean, string, string],
    important: [boolean, string, string],
    critical: [boolean, string, string]
  };
  numRepairs: string[];
  vin: string;
  brand: string;
  model: string;
  year: string[];
  kilometers: string[];
  state: string[];
  power: string[];
  shift: string[];
  fuel: string[];
  autonomy: string[];
  climate: string[];
  usage: string[];
  storage: string[];
}