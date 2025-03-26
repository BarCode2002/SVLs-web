import { useEffect, useState } from 'react';
import styles from '../../../styles/components/dataSVL/readOnlyFields/repairedDefectByContainer.module.css';
import { DEFECTS_REPAIRED_SIZE } from '../../../utils/constants';
import { useTranslation } from "react-i18next";
import { PossibleRepairsJsonVersions } from '../../../utils/commonTypes';

type RepairedDefectsByContainerProps = {
  fieldLabel: string;
  repairs: PossibleRepairsJsonVersions[];
  prevOwnersRepairs?: PossibleRepairsJsonVersions[];
  selectedOwner: number;
  selectedGroup: number;
  numPreviousOwners: number;
  totalOwners: number;
  mySVL: boolean;
  view: string;
}

const RepairedDefectsByContainer = ({ fieldLabel, repairs, prevOwnersRepairs, selectedOwner, selectedGroup, numPreviousOwners, totalOwners, mySVL, view }: RepairedDefectsByContainerProps) => {

  const [defectsRepaired, setDefectsRepaired] = useState<string[]>(Array(DEFECTS_REPAIRED_SIZE).fill(''));

  const { t } = useTranslation();

  useEffect(() => {
    const updatedDR = Array(DEFECTS_REPAIRED_SIZE).fill('');
    let numDR = 0;
    
    for (let i = selectedOwner; i < totalOwners; i++) { 
      if (prevOwnersRepairs) {
        if (!mySVL || i < numPreviousOwners) {
          for (let j = 0; j < prevOwnersRepairs[i].group.length; j++) {
            for (let l = 0; l < prevOwnersRepairs[i].group[j].numDefectsRepaired; l++) {
              if (prevOwnersRepairs[i].group[j].defectsRepaired[l][0] == selectedOwner && 
                prevOwnersRepairs[i].group[j].defectsRepaired[l][1] == selectedGroup &&
                prevOwnersRepairs[i].group[j].defectsRepaired[l][2] == -2) {
                updatedDR[numDR] = `${t('DataSVL.Placeholders.owner')} ${i+1} ${t('DataSVL.Labels.allDefectsRepaired')} ${t('DataSVL.Labels.inTheRepair')} ${j+1}`;
                ++numDR;
              }
              else if (prevOwnersRepairs[i].group[j].defectsRepaired[l][0] == selectedOwner && 
                prevOwnersRepairs[i].group[j].defectsRepaired[l][1] == selectedGroup && prevOwnersRepairs[i].group[j].defectsRepaired[l][2] >= 0) {
                updatedDR[numDR] = `${t('DataSVL.Placeholders.owner')} ${i+1} ${t('DataSVL.Labels.defectRepaired')} ${prevOwnersRepairs[i].group[j].defectsRepaired[l][2]+1} ${t('DataSVL.Labels.inTheRepair')} ${j+1}`;
                ++numDR;
              }
            }
          }
        }
      }
      else {
        for (let j = 0; j < repairs[i-numPreviousOwners].group.length; j++) {
          for (let l = 0; l < repairs[i-numPreviousOwners].group[j].numDefectsRepaired; l++) {
            if (repairs[i-numPreviousOwners].group[j].defectsRepaired[l][0] == selectedOwner && 
              repairs[i-numPreviousOwners].group[j].defectsRepaired[l][1] == selectedGroup &&
              repairs[i-numPreviousOwners].group[j].defectsRepaired[l][2] == -2) {
              updatedDR[numDR] = `${t('DataSVL.Placeholders.owner')} ${i+1} ${t('DataSVL.Labels.allDefectsRepaired')} ${t('DataSVL.Labels.inTheRepair')} ${j+1}`;
              ++numDR;
            }
            else if (repairs[i-numPreviousOwners].group[j].defectsRepaired[l][0] == selectedOwner && 
              repairs[i-numPreviousOwners].group[j].defectsRepaired[l][1] == selectedGroup && repairs[i-numPreviousOwners].group[j].defectsRepaired[l][2] >= 0) {
              updatedDR[numDR] = `${t('DataSVL.Placeholders.owner')} ${i+1} ${t('DataSVL.Labels.defectRepaired')} ${repairs[i-numPreviousOwners].group[j].defectsRepaired[l][2]+1} ${t('DataSVL.Labels.inTheRepair')} ${j+1}`;
              ++numDR;
            }
          }
        }
      }
    }
    setDefectsRepaired(updatedDR);
  }, [selectedOwner]);

  if (view == 'ownerView') {
    return (
      <div className={styles.repairedDefectByContainer}>
        <div className={styles.fieldLabel}>
          {fieldLabel}
        </div>
        <div className={styles.repairedDefects}>
          {defectsRepaired.filter(repairedDefect => repairedDefect != '').map((repairedDefect, index) => (
            <div key={`${repairedDefect}-${index}`}>
              <div>{repairedDefect}</div>
            </div>
          ))}
          {defectsRepaired.filter(repairedDefect => repairedDefect != '').length == 0 &&
            <div>-</div>
          }
        </div>
      </div>
    );
  }
  else if (defectsRepaired.filter(repairedDefect => repairedDefect != '').length > 0) {
    return (
      <div className={styles.repairedDefectByContainer}>
        <div className={styles.fieldLabel}>
          {fieldLabel}
        </div>
        <div className={styles.repairedDefects}>
          {defectsRepaired.filter(repairedDefect => repairedDefect != '').map((repairedDefect, index) => (
            <div key={`${repairedDefect}-${index}`}>
              <div>{repairedDefect}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }
};

export default RepairedDefectsByContainer;


