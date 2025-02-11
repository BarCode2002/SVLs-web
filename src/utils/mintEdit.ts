import { GeneralInformation, Maintenances, Modifications, Defects, Repairs } from "./interfaces";
import { PHOTOGRAPHS_SIZE } from "./constants";

export const checksBeforeMintSVL = (totalOwners: number, generalInformation: GeneralInformation[], maintenances: Maintenances[], modifications: Modifications[], defects: Defects[], repairs: Repairs[], defaultBrand: string, defaultModel: string) => {
  for (let i = 0; i < totalOwners; i++) { 
    if (generalInformation[i].VIN == '') {
      console.log(`Owner ${i+1} has not set the VIN field in General information`);
      return false;
    }
    else if (generalInformation[i].brand == defaultBrand) {
      console.log(`Owner ${i+1} has not set the brand field in General information`);
      return false;
    }
    else if (generalInformation[i].model == defaultModel) {
      console.log(`Owner ${i+1} has not set the model field in General information`);
      return false;
    }
    else if (generalInformation[i].year == '') {
      console.log(`Owner ${i+1} has not set the year field in General information`);
      return false;
    }
    else if (generalInformation[i].mainPhotograph == '') {
      console.log(`Owner ${i+1} has not set the main image field in General information`);
      return false;
    }
    else if (generalInformation[i].mainPhotograph[4] == ':') {
      console.log(`Owner ${i+1} has not saved the main image field in General information`);
      return false;
    }
    for (let j = 0; j < PHOTOGRAPHS_SIZE; j++) {
      if (generalInformation[i].photographs[j][4] == ':') {
        console.log(`Owner ${i+1} has not saved the images field in General information`);
        return false;
      }
    }
    for (let j = 0; j < maintenances[i].group.length; j++) {
      if (maintenances[i].group[j].responsible[3][4] == ':') {
        console.log(`Owner ${i+1} has not saved the proof in responsible field for group ${j+1} in Maintenances`);
        return false;
      }
      for (let k = 0; k < PHOTOGRAPHS_SIZE; k++) {
        if (maintenances[i].group[j].pre[k][4] == ':') {
          console.log(`Owner ${i+1} has not saved the previous images field for group ${j+1} in Maintenances`);
          return false;
        } 
        if (maintenances[i].group[j].post[k][4] == ':') {
          console.log(`Owner ${i+1} has not saved the posterior images field for group ${j+1} in Maintenances`);
          return false;
        }
      }

      for (let l = 0; l < maintenances[i].group[j].type.length; l++) {
        for (let z = 0; z < PHOTOGRAPHS_SIZE; z++) {
          if (maintenances[i].group[j].type[l].pre[z][4] == ':') {
            console.log(`Owner ${i+1} has not saved the previous images field for group ${j+1} and type ${l+1} in Maintenances`);
            return false;
          }
          if (maintenances[i].group[j].type[l].post[z][4] == ':') {
            console.log(`Owner ${i+1} has not saved the posterior images field for group ${j+1} and type ${l+1} in Maintenances`);
            return false;
          }
        }
      }
    }
    for (let j = 0; j < modifications[i].group.length; j++) {
      if (modifications[i].group[j].responsible[3][4] == ':') {
        console.log(`Owner ${i+1} has not saved the proof in responsible field for group ${j+1} in Modifications`);
        return false;
      }
      for (let k = 0; k < PHOTOGRAPHS_SIZE; k++) {
        if (modifications[i].group[j].pre[k][4] == ':') {
          console.log(`Owner ${i+1} has not saved the previous images field for group ${j+1} in Modifications`);
          return false;
        }
        if (modifications[i].group[j].post[k][4] == ':') {
          console.log(`Owner ${i+1} has not saved the posterior images field for group ${j+1} in Modifications`);
          return false;
        }
      }
      for (let l = 0; l < modifications[i].group[j].type.length; l++) {
        for (let z = 0; z < PHOTOGRAPHS_SIZE; z++) {
          if (modifications[i].group[j].type[l].pre[z][4] == ':') {
            console.log(`Owner ${i+1} has not saved the previous images field for group ${j+1} and type ${l+1} in Modifications`);
            return false;
          }
          if (modifications[i].group[j].type[l].post[z][4] == ':') {
            console.log(`Owner ${i+1} has not saved the posterior images field for group ${j+1} and type ${l+1} in Modifications`);
            return false;
          }
        }
      }
    }
    for (let j = 0; j < defects[i].group.length; j++) {
      for (let l = 0; l < defects[i].group[j].type.length; l++) {
        for (let z = 0; z < PHOTOGRAPHS_SIZE; z++) {
          if (defects[i].group[j].type[l].photographs[z][4] == ':') {
            console.log(`Owner ${i+1} has not saved the images field for group ${j+1} and type ${l+1} in Defects`);
            return false;
          }
        }
      }
    }
    for (let j = 0; j < repairs[i].group.length; j++) {
      if (repairs[i].group[j].responsible[3][4] == ':') {
        console.log(`Owner ${i+1} has not saved the proof in responsible field for group ${j+1} in Repairs`);
        return false;
      }
      for (let k = 0; k < PHOTOGRAPHS_SIZE; k++) {
        if (repairs[i].group[j].pre[k][4] == ':') {
          console.log(`Owner ${i+1} has not saved the previous images field for group ${j+1} in Repairs`);
          return false;
        } else if (repairs[i].group[j].post[k][4] == ':') {
          console.log(`Owner ${i+1} has not saved the posterior images field for group ${j+1} in Repairs`);
          return false;
        }
      }
      for (let l = 0; l < repairs[i].group[j].type.length; l++) {
        for (let z = 0; z < PHOTOGRAPHS_SIZE; z++) {
          if (repairs[i].group[j].type[l].pre[z][4] == ':') {
            console.log(`Owner ${i+1} has not saved the previous images field for group ${j+1} and type ${l+1} in Repairs`);
            return false;
          }
          if (repairs[i].group[j].type[l].post[z][4] == ':') {
            console.log(`Owner ${i+1} has not saved the posterior images field for group ${j+1} and type ${l+1} in Repairs`);
            return false;
          }
        }
      }
    }
  }
  return true;
};