import { GeneralInformation, Maintenances, Modifications, Defects, Repairs } from "./interfaces";
import { PHOTOGRAPHS_SIZE } from "./constants";
import i18n from 'i18next'; 

export const checksBeforeMintOrUpdateSVL = (numPreviousOwners: number, totalOwners: number, generalInformation: GeneralInformation[], maintenances: Maintenances[], modifications: Modifications[], defects: Defects[], repairs: Repairs[]) => {
  const invalidFields: string[] = [];
  for (let i = 0; i < totalOwners-numPreviousOwners; i++) { 
    if (generalInformation[i].VIN == '') {
      invalidFields.push(`${i18n.t('InvalidFields.owner')} ${numPreviousOwners+i+1} ${i18n.t('InvalidFields.VIN')}`);
    }
    if (generalInformation[i].brand == i18n.t('DataSVL.Forms.brand')) {
      invalidFields.push(`${i18n.t('InvalidFields.owner')} ${numPreviousOwners+i+1} ${i18n.t('InvalidFields.brand')}`);
    }
    if (generalInformation[i].model == i18n.t('DataSVL.Forms.model')) {
      invalidFields.push(`${i18n.t('InvalidFields.owner')} ${numPreviousOwners+i+1} ${i18n.t('InvalidFields.model')}`);
    }
    if (generalInformation[i].year == '') {
      invalidFields.push(`${i18n.t('InvalidFields.owner')} ${numPreviousOwners+i+1} ${i18n.t('InvalidFields.year')}`);    }
    if (generalInformation[i].mainPhotograph == '') {
      invalidFields.push(`${i18n.t('InvalidFields.owner')} ${numPreviousOwners+i+1} ${i18n.t('InvalidFields.mainPhotograph')}`);    }
    if (generalInformation[i].mainPhotograph[4] == ':') {
      invalidFields.push(`${i18n.t('InvalidFields.owner')} ${numPreviousOwners+i+1} ${i18n.t('InvalidFields.mainPhotographNotSaved')}`);      
    }
    let foundNotSaved = false;
    for (let j = 0; j < PHOTOGRAPHS_SIZE; j++) {
      if (generalInformation[i].photographs[j][4] == ':' && !foundNotSaved) {
        foundNotSaved = true;
        invalidFields.push(`${i18n.t('InvalidFields.owner')} ${numPreviousOwners+i+1} ${i18n.t('InvalidFields.photographsNotSaved')}`);        
      }
    }
    for (let j = 0; j < maintenances[i].group.length; j++) {
      if (maintenances[i].group[j].responsible[0] == null) {
        console.log(`Owner ${numPreviousOwners+i+1} has not set the responsible field for group ${j+1} in Maintenances`);
        
      }
      if (maintenances[i].group[j].responsible[3][4] == ':') {
        console.log(`Owner ${numPreviousOwners+i+1} has not saved the proof in responsible field for group ${j+1} in Maintenances`);
        
      }
      for (let k = 0; k < PHOTOGRAPHS_SIZE; k++) {
        if (maintenances[i].group[j].pre[k][4] == ':') {
          console.log(`Owner ${numPreviousOwners+i+1} has not saved the previous images field for group ${j+1} in Maintenances`);
          
        } 
        if (maintenances[i].group[j].post[k][4] == ':') {
          console.log(`Owner ${numPreviousOwners+i+1} has not saved the posterior images field for group ${j+1} in Maintenances`);
          
        }
      }
      for (let l = 0; l < maintenances[i].group[j].type.length; l++) {
        for (let z = 0; z < PHOTOGRAPHS_SIZE; z++) {
          if (maintenances[i].group[j].type[l].pre[z][4] == ':') {
            console.log(`Owner ${numPreviousOwners+i+1} has not saved the previous images field for group ${j+1} and type ${l+1} in Maintenances`);
            ;
          }
          if (maintenances[i].group[j].type[l].post[z][4] == ':') {
            console.log(`Owner ${numPreviousOwners+i+1} has not saved the posterior images field for group ${j+1} and type ${l+1} in Maintenances`);
            ;
          }
        }
      }
    }
    for (let j = 0; j < modifications[i].group.length; j++) {
      if (modifications[i].group[j].responsible[0] == null) {
        console.log(`Owner ${numPreviousOwners+i+1} has not set the responsible field for group ${j+1} in Modifications`);
        ;
      }
      if (modifications[i].group[j].responsible[3][4] == ':') {
        console.log(`Owner ${numPreviousOwners+i+1} has not saved the proof in responsible field for group ${j+1} in Modifications`);
        ;
      }
      for (let k = 0; k < PHOTOGRAPHS_SIZE; k++) {
        if (modifications[i].group[j].pre[k][4] == ':') {
          console.log(`Owner ${numPreviousOwners+i+1} has not saved the previous images field for group ${j+1} in Modifications`);
          
        }
        if (modifications[i].group[j].post[k][4] == ':') {
          console.log(`Owner ${numPreviousOwners+i+1} has not saved the posterior images field for group ${j+1} in Modifications`);
          
        }
      }
      for (let l = 0; l < modifications[i].group[j].type.length; l++) {
        for (let z = 0; z < PHOTOGRAPHS_SIZE; z++) {
          if (modifications[i].group[j].type[l].pre[z][4] == ':') {
            console.log(`Owner ${numPreviousOwners+i+1} has not saved the previous images field for group ${j+1} and type ${l+1} in Modifications`);
            
          }
          if (modifications[i].group[j].type[l].post[z][4] == ':') {
            console.log(`Owner ${numPreviousOwners+i+1} has not saved the posterior images field for group ${j+1} and type ${l+1} in Modifications`);
            
          }
        }
      }
    }
    for (let j = 0; j < defects[i].group.length; j++) {
      for (let l = 0; l < defects[i].group[j].type.length; l++) {
        for (let z = 0; z < PHOTOGRAPHS_SIZE; z++) {
          if (defects[i].group[j].type[l].photographs[z][4] == ':') {
            console.log(`Owner ${numPreviousOwners+i+1} has not saved the images field for group ${j+1} and type ${l+1} in Defects`);
            
          }
        }
      }
    }
    for (let j = 0; j < repairs[i].group.length; j++) {
      if (repairs[i].group[j].responsible[3][4] == ':') {
        console.log(`Owner ${numPreviousOwners+i+1} has not saved the proof in responsible field for group ${j+1} in Repairs`);
        
      }
      if (repairs[i].group[j].responsible[0] == null) {
        console.log(`Owner ${numPreviousOwners+i+1} has not set the responsible field for group ${j+1} in Repairs`);
        
      }
      for (let k = 0; k < PHOTOGRAPHS_SIZE; k++) {
        if (repairs[i].group[j].pre[k][4] == ':') {
          console.log(`Owner ${numPreviousOwners+i+1} has not saved the previous images field for group ${j+1} in Repairs`);
          
        } else if (repairs[i].group[j].post[k][4] == ':') {
          console.log(`Owner ${numPreviousOwners+i+1} has not saved the posterior images field for group ${j+1} in Repairs`);
          
        }
      }
      for (let l = 0; l < repairs[i].group[j].type.length; l++) {
        for (let z = 0; z < PHOTOGRAPHS_SIZE; z++) {
          if (repairs[i].group[j].type[l].pre[z][4] == ':') {
            console.log(`Owner ${numPreviousOwners+i+1} has not saved the previous images field for group ${j+1} and type ${l+1} in Repairs`);
            
          }
          if (repairs[i].group[j].type[l].post[z][4] == ':') {
            console.log(`Owner ${numPreviousOwners+i+1} has not saved the posterior images field for group ${j+1} and type ${l+1} in Repairs`);
            
          }
        }
      }
    }
  }
  return invalidFields;
};