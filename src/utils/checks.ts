import { PHOTOGRAPHS_SIZE } from "./constants";
import i18n from 'i18next'; 
import axios from "axios";
import { mongoBrand, mongoList } from "./ip";
import { PossibleGeneralInformationJsonVersions } from "./commonTypes";
import { isMaintenancesBase, isModificationsBase, isRepairsBase } from "./checkBaseType";
import { isMaintenancesBaseSimple, isModificationsBaseSimple, isRepairsBaseSimple } from "./checkBaseSimpleType";


//any poque sino el typescript se queja
export const checks = async (start: number, end: number, numPreviousOwners: number, generalInformation: PossibleGeneralInformationJsonVersions[], maintenances: any, modifications: any, defects: any, repairs: any) => {
  const invalidFields: string[] = [];
  let wrongVinBrandModelYear = [false, false, false, false];
  for (let i = start+1; i < end; i++) { 
    if (wrongVinBrandModelYear[0] == false && generalInformation[i-1].VIN != generalInformation[i].VIN) {
      invalidFields.push(`${i18n.t('InvalidFields.vinNotSame')} ${start+1} ${i18n.t('InvalidFields.to')} ${end}. ${i18n.t('InvalidFields.same')}`);
      wrongVinBrandModelYear[0] = true;
    }
    if (wrongVinBrandModelYear[1] == false && generalInformation[i-1].brand != generalInformation[i].brand) {
      invalidFields.push(`${i18n.t('InvalidFields.brandNotSame')} ${start+1} ${i18n.t('InvalidFields.to')} ${end}. ${i18n.t('InvalidFields.same')}`);
      wrongVinBrandModelYear[1] = true;
    }
    if (wrongVinBrandModelYear[2] == false && generalInformation[i-1].model != generalInformation[i].model) {
      invalidFields.push(`${i18n.t('InvalidFields.modelNotSame')} ${start+1} ${i18n.t('InvalidFields.to')} ${end}. ${i18n.t('InvalidFields.same')}`);
      wrongVinBrandModelYear[2] = true;
    }
    if (wrongVinBrandModelYear[3] == false && generalInformation[i-1].year != generalInformation[i].year) {
      invalidFields.push(`${i18n.t('InvalidFields.yearNotSame')} ${start+1} ${i18n.t('InvalidFields.to')} ${end}. ${i18n.t('InvalidFields.same')}`);
      wrongVinBrandModelYear[3] = true;
    }
  }
  const responseMongo = await axios.get(`${mongoList}brand`);
  const brandList = responseMongo.data;
  if (!brandList.includes(generalInformation[0].brand)) {
    if (localStorage.getItem('language') == 'Lists.Language.en') {
      invalidFields.push(`${i18n.t('InvalidFields.invalidBrand')} ${start+1} ${i18n.t('InvalidFields.to')} ${end} ${i18n.t('InvalidFields.notValid')}`);
    }
    else {
      invalidFields.push(`${i18n.t('InvalidFields.invalidBrand')} ${start+1} ${i18n.t('InvalidFields.to')} ${end} ${i18n.t('InvalidFields.notValidF')}`);
    }
  }
  else {
    const responseMongo = await axios.get(`${mongoBrand}${generalInformation[0].brand}`);
    const modelList = responseMongo.data;
    if (!modelList.includes(generalInformation[0].model)) {
      if (localStorage.getItem('language') == 'Lists.Language.en') {
        invalidFields.push(`${i18n.t('InvalidFields.invalidModel')} ${start+1} ${i18n.t('InvalidFields.to')} ${end} ${i18n.t('InvalidFields.notValid')}`);
      }
      else {
        invalidFields.push(`${i18n.t('InvalidFields.invalidModel')} ${start+1} ${i18n.t('InvalidFields.to')} ${end} ${i18n.t('InvalidFields.notValidM')}`);
      }
    }
    
  }
  
  for (let i = start; i < end; i++) { 
    if (generalInformation[i].VIN == '') {
      invalidFields.push(`${i18n.t('InvalidFields.owner')} ${numPreviousOwners+i+1} ${i18n.t('InvalidFields.VIN')} ${i18n.t('InvalidFields.mandatoryField')}`);
    }
    if (generalInformation[i].brand == 'DataSVL.Forms.brand') {
      invalidFields.push(`${i18n.t('InvalidFields.owner')} ${numPreviousOwners+i+1} ${i18n.t('InvalidFields.brand')} ${i18n.t('InvalidFields.mandatoryField')}`);
    }
    if (generalInformation[i].model == 'DataSVL.Forms.model') {
      invalidFields.push(`${i18n.t('InvalidFields.owner')} ${numPreviousOwners+i+1} ${i18n.t('InvalidFields.model')} ${i18n.t('InvalidFields.mandatoryField')}`);
    }
    if (generalInformation[i].year == '') {
      invalidFields.push(`${i18n.t('InvalidFields.owner')} ${numPreviousOwners+i+1} ${i18n.t('InvalidFields.year')} ${i18n.t('InvalidFields.mandatoryField')}`);    
    }
    if (generalInformation[i].transferDate == '') {
      invalidFields.push(`${i18n.t('InvalidFields.owner')} ${numPreviousOwners+i+1} ${i18n.t('InvalidFields.transferDate')} ${i18n.t('InvalidFields.mandatoryField')}`);    
    }
    if (generalInformation[i].images.filter(image => image != '').length == 0) {
      invalidFields.push(`${i18n.t('InvalidFields.owner')} ${numPreviousOwners+i+1} ${i18n.t('InvalidFields.images')}`);
    }
    let foundNotSaved = false;
    for (let j = 0; j < PHOTOGRAPHS_SIZE; j++) {
      if (generalInformation[i].images[j][4] == ':' && !foundNotSaved) {
        foundNotSaved = true;
        invalidFields.push(`${i18n.t('InvalidFields.owner')} ${numPreviousOwners+i+1} ${i18n.t('InvalidFields.imagesNotSaved')}`);        
      }
    }
    for (let j = 0; j < maintenances[i].group.length; j++) {
      if (maintenances[i].group[j].responsible[0] == null || (maintenances[i].group[j].responsible[2] == null && (maintenances[i].group[j].responsible[0] == 0 || maintenances[i].group[j].responsible[0] == 2))) {
        invalidFields.push(`${i18n.t('InvalidFields.owner')} ${numPreviousOwners+i+1} ${i18n.t('InvalidFields.responsibleMaintenances')} ${j+1}. ${i18n.t('InvalidFields.mandatoryField')}`);
      }
      if (maintenances[i].group[j].responsible[3][4] == ':') {
        invalidFields.push(`${i18n.t('InvalidFields.owner')} ${numPreviousOwners+i+1} ${i18n.t('InvalidFields.proofResponsibleMaintenances')} ${j+1}.`);
      }
      let foundNotSaved1 = false;
      let foundNotSaved2 = false;
      let typeIsMaintenancesBase = isMaintenancesBase(maintenances[i], j);
      let typeIsMaintenancesBaseSimple = isMaintenancesBaseSimple(maintenances[i], j);
      for (let k = 0; k < PHOTOGRAPHS_SIZE; k++) {
        if (typeIsMaintenancesBase) {
          if (maintenances[i].group[j].pre[k][4] == ':' && !foundNotSaved1) {
            invalidFields.push(`${i18n.t('InvalidFields.owner')} ${numPreviousOwners+i+1} ${i18n.t('InvalidFields.previousImagesGroupMaintenances')} ${j+1}.`);
            foundNotSaved1 = true;
          } 
          if (maintenances[i].group[j].post[k][4] == ':'  && !foundNotSaved2) {
            invalidFields.push(`${i18n.t('InvalidFields.owner')} ${numPreviousOwners+i+1} ${i18n.t('InvalidFields.postImagesGroupMaintenances')} ${j+1}.`);
            foundNotSaved2 = true;
          }
        }
        else if (typeIsMaintenancesBaseSimple) {
          if (maintenances[i].group[j].images[k][4] == ':' && !foundNotSaved1) {
            invalidFields.push(`${i18n.t('InvalidFields.owner')} ${numPreviousOwners+i+1} ${i18n.t('InvalidFields.previousImagesGroupMaintenances')} ${j+1}.`);
            foundNotSaved1 = true;
          } 
        }
      }
      foundNotSaved1 = false;
      foundNotSaved2 = false;
      for (let l = 0; l < maintenances[i].group[j].element.length; l++) {
        typeIsMaintenancesBase = isMaintenancesBase(maintenances[i], j, l);
        typeIsMaintenancesBaseSimple = isMaintenancesBaseSimple(maintenances[i], j, l);
        for (let z = 0; z < PHOTOGRAPHS_SIZE; z++) {
          if (typeIsMaintenancesBase) {
            if (maintenances[i].group[j].element[l].pre[z][4] == ':' && !foundNotSaved1) {
              invalidFields.push(`${i18n.t('InvalidFields.owner')} ${numPreviousOwners+i+1} ${i18n.t('InvalidFields.previousImagesMaintenance')} ${l+1} ${i18n.t('InvalidFields.maintenanceGroup')} ${j+1}.`);
              foundNotSaved1 = true;
            }
            if (maintenances[i].group[j].element[l].post[z][4] == ':' && !foundNotSaved2) {
              invalidFields.push(`${i18n.t('InvalidFields.owner')} ${numPreviousOwners+i+1} ${i18n.t('InvalidFields.postImagesMaintenance')} ${l+1} ${i18n.t('InvalidFields.maintenanceGroup')} ${j+1}.`);
              foundNotSaved2 = true;
            }
          }
          else if (typeIsMaintenancesBaseSimple) {
            if (maintenances[i].group[j].element[l].images[z][4] == ':' && !foundNotSaved1) {
              invalidFields.push(`${i18n.t('InvalidFields.owner')} ${numPreviousOwners+i+1} ${i18n.t('InvalidFields.postImagesMaintenance')} ${l+1} ${i18n.t('InvalidFields.maintenanceGroup')} ${j+1}.`);
              foundNotSaved2 = true;
            }
          }
        }
      }
    }
    for (let j = 0; j < modifications[i].group.length; j++) {
      if (modifications[i].group[j].responsible[0] == null || (modifications[i].group[j].responsible[2] == null && (modifications[i].group[j].responsible[0] == 0 || modifications[i].group[j].responsible[0] == 2))) {
        invalidFields.push(`${i18n.t('InvalidFields.owner')} ${numPreviousOwners+i+1} ${i18n.t('InvalidFields.responsibleModifications')} ${j+1}. ${i18n.t('InvalidFields.mandatoryField')}`);
      }
      if (modifications[i].group[j].responsible[3][4] == ':') {
        invalidFields.push(`${i18n.t('InvalidFields.owner')} ${numPreviousOwners+i+1} ${i18n.t('InvalidFields.proofResponsibleModifications')} ${j+1}.`);
      }
      let foundNotSaved1 = false;
      let foundNotSaved2 = false;
      let typeIsModificationsBase = isModificationsBase(modifications[i], j);
      let typeIsModificationsBaseSimple = isModificationsBaseSimple(modifications[i], j);
      for (let k = 0; k < PHOTOGRAPHS_SIZE; k++) {
        if (typeIsModificationsBase) {
          if (modifications[i].group[j].pre[k][4] == ':' && !foundNotSaved1) {
            invalidFields.push(`${i18n.t('InvalidFields.owner')} ${numPreviousOwners+i+1} ${i18n.t('InvalidFields.previousImagesGroupModifications')} ${j+1}.`);
            foundNotSaved1 = true;
          }
          if (modifications[i].group[j].post[k][4] == ':' && !foundNotSaved2) {
            invalidFields.push(`${i18n.t('InvalidFields.owner')} ${numPreviousOwners+i+1} ${i18n.t('InvalidFields.postImagesGroupModifications')} ${j+1}.`);
            foundNotSaved2 = true;
          }
        }
        else if (typeIsModificationsBaseSimple) {
          if (modifications[i].group[j].images[k][4] == ':' && !foundNotSaved1) {
            invalidFields.push(`${i18n.t('InvalidFields.owner')} ${numPreviousOwners+i+1} ${i18n.t('InvalidFields.previousImagesGroupModifications')} ${j+1}.`);
            foundNotSaved1 = true;
          }
        }
      }
      foundNotSaved1 = false;
      foundNotSaved2 = false;
      for (let l = 0; l < modifications[i].group[j].element.length; l++) {
        typeIsModificationsBase = isModificationsBase(modifications[i], j, l);
        typeIsModificationsBaseSimple = isModificationsBaseSimple(modifications[i], j, l);
        for (let z = 0; z < PHOTOGRAPHS_SIZE; z++) {
          if (typeIsModificationsBase) {
            if (modifications[i].group[j].element[l].pre[z][4] == ':' && !foundNotSaved1) {
              invalidFields.push(`${i18n.t('InvalidFields.owner')} ${numPreviousOwners+i+1} ${i18n.t('InvalidFields.previousImagesModification')} ${l+1} ${i18n.t('InvalidFields.modificationGroup')} ${j+1}.`);
              foundNotSaved2 = true;
            }
            if (modifications[i].group[j].element[l].post[z][4] == ':' && !foundNotSaved2) {
              invalidFields.push(`${i18n.t('InvalidFields.owner')} ${numPreviousOwners+i+1} ${i18n.t('InvalidFields.postImagesModification')} ${l+1} ${i18n.t('InvalidFields.modificationGroup')} ${j+1}.`);
              foundNotSaved2 = true;
            }
          }
          else if (typeIsModificationsBaseSimple) {
            if (modifications[i].group[j].element[l].images[z][4] == ':' && !foundNotSaved1) {
              invalidFields.push(`${i18n.t('InvalidFields.owner')} ${numPreviousOwners+i+1} ${i18n.t('InvalidFields.postImagesModification')} ${l+1} ${i18n.t('InvalidFields.modificationGroup')} ${j+1}.`);
              foundNotSaved2 = true;
            }
          }
        }
      }
    }
    foundNotSaved = false;
    for (let j = 0; j < defects[i].group.length; j++) {
      if (defects[i].group[j].cause == '') {
        invalidFields.push(`${i18n.t('InvalidFields.owner')} ${numPreviousOwners+i+1} ${i18n.t('InvalidFields.causeDefect')} ${j+1}. ${i18n.t('InvalidFields.mandatoryField')}`);
      }
      for (let l = 0; l < defects[i].group[j].element.length; l++) {
        //nivel del defecto seria bien que fuera obligatorio, hacer llamada api, comproba que el valor esta en los posibles(el default no es de los posible)
        for (let z = 0; z < PHOTOGRAPHS_SIZE; z++) {
          if (defects[i].group[j].element[l].images[z][4] == ':' && !foundNotSaved) {
            invalidFields.push(`${i18n.t('InvalidFields.owner')} ${numPreviousOwners+i+1} ${i18n.t('InvalidFields.imagesDefect')} ${l+1} ${i18n.t('InvalidFields.defectGroup')} ${j+1}.`);
            foundNotSaved = true;
          }
        }
      }
    }
    for (let j = 0; j < repairs[i].group.length; j++) {
      if (repairs[i].group[j].responsible[0] == null || (repairs[i].group[j].responsible[2] == null && (repairs[i].group[j].responsible[0] == 0 || repairs[i].group[j].responsible[0] == 2))) {
        invalidFields.push(`${i18n.t('InvalidFields.owner')} ${numPreviousOwners+i+1} ${i18n.t('InvalidFields.responsibleRepairs')} ${j+1}. ${i18n.t('InvalidFields.mandatoryField')}`);
        
      }
      if (repairs[i].group[j].responsible[3][4] == ':') {
        invalidFields.push(`${i18n.t('InvalidFields.owner')} ${numPreviousOwners+i+1} ${i18n.t('InvalidFields.proofResponsibleRepairs')} ${j+1}.`);
        
      }
      let defectNotFinished = false
      for (let k = 0; k < repairs[i].group[j].numDefectsRepaired; k++) {
        if (!defectNotFinished && (repairs[i].group[j].defectsRepaired[k][0] == -1 || repairs[i].group[j].defectsRepaired[k][1] == -1 || repairs[i].group[j].defectsRepaired[k][2] == -1)) {
          invalidFields.push(`${i18n.t('InvalidFields.owner')} ${numPreviousOwners+i+1} ${i18n.t('InvalidFields.defectRepairedNotComplete')} ${j+1}.`);
          defectNotFinished = true;
        }
      }
      let foundNotSaved1 = false;
      let foundNotSaved2 = false;
      let typeIsRepairsBase = isRepairsBase(repairs[i], j);
      let typeIsRepairsBaseSimple = isRepairsBaseSimple(repairs[i], j);
      for (let k = 0; k < PHOTOGRAPHS_SIZE; k++) {
        if (typeIsRepairsBase) {
          if (repairs[i].group[j].pre[k][4] == ':' && !foundNotSaved1) {
            invalidFields.push(`${i18n.t('InvalidFields.owner')} ${numPreviousOwners+i+1} ${i18n.t('InvalidFields.previousImagesGroupRepairs')} ${j+1}.`);
            foundNotSaved1 = true;
          } 
          else if (repairs[i].group[j].post[k][4] == ':' && !foundNotSaved2) {
            invalidFields.push(`${i18n.t('InvalidFields.owner')} ${numPreviousOwners+i+1} ${i18n.t('InvalidFields.postImagesGroupRepairs')} ${j+1}.`);
            foundNotSaved2 = true;
          }
        }
        else if (typeIsRepairsBaseSimple) {
          if (repairs[i].group[j].images[k][4] == ':' && !foundNotSaved1) {
            invalidFields.push(`${i18n.t('InvalidFields.owner')} ${numPreviousOwners+i+1} ${i18n.t('InvalidFields.postImagesGroupRepairs')} ${j+1}.`);
            foundNotSaved2 = true;
          }
        }
      }
      foundNotSaved1 = false;
      foundNotSaved2 = false;
      for (let l = 0; l < repairs[i].group[j].element.length; l++) {
        typeIsRepairsBase = isRepairsBase(repairs[i], j, l);
        typeIsRepairsBaseSimple = isRepairsBaseSimple(repairs[i], j, l);
        for (let z = 0; z < PHOTOGRAPHS_SIZE; z++) {
          if (typeIsRepairsBase) {
            if (repairs[i].group[j].element[l].pre[z][4] == ':' && !foundNotSaved1) {
              invalidFields.push(`${i18n.t('InvalidFields.owner')} ${numPreviousOwners+i+1} ${i18n.t('InvalidFields.previousImagesRepair')} ${l+1} ${i18n.t('InvalidFields.repairGroup')} ${j+1}.`);
              foundNotSaved1 = true;
            }
            if (repairs[i].group[j].element[l].post[z][4] == ':' && !foundNotSaved2) {
              invalidFields.push(`${i18n.t('InvalidFields.owner')} ${numPreviousOwners+i+1} ${i18n.t('InvalidFields.postImagesRepair')} ${l+1} ${i18n.t('InvalidFields.repairGroup')} ${j+1}.`);
              foundNotSaved2 = true;
            }
          }
          else if (typeIsRepairsBaseSimple) {
            if (repairs[i].group[j].element[l].images[z][4] == ':' && !foundNotSaved1) {
              invalidFields.push(`${i18n.t('InvalidFields.owner')} ${numPreviousOwners+i+1} ${i18n.t('InvalidFields.previousImagesRepair')} ${l+1} ${i18n.t('InvalidFields.repairGroup')} ${j+1}.`);
              foundNotSaved1 = true;
            }
          }
        }
      }
    }
  }
  return invalidFields;
};