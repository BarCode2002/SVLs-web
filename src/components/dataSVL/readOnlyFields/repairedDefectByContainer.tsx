import { useEffect, useState } from 'react';
import styles from '../../../styles/components/dataSVL/readOnlyFields/repairedDefectByContainer.module.css';
import { Repairs } from '../../../utils/interfaces';
import { DEFECTS_REPAIRED_SIZE } from '../../../utils/constants';

type RepairedDefectsByContainerProps = {
  fieldLabel: string;
  repairs: Repairs[];
  prevOwnersRepairs?: any;
  selectedOwner: number;
  selectedGroup: number;
  numPreviousOwners: number;
  totalOwners: number;
}

const RepairedDefectsByContainer = ({ fieldLabel, repairs, prevOwnersRepairs, selectedOwner, selectedGroup, numPreviousOwners, totalOwners }: RepairedDefectsByContainerProps) => {

  const [defectsRepaired, setDefectsRepaired] = useState<string[]>(Array(DEFECTS_REPAIRED_SIZE).fill(''));

  useEffect(() => {
    const updatedDR = Array(DEFECTS_REPAIRED_SIZE).fill('');
    let numDR = 0;
    for (let i = selectedOwner; i < totalOwners; i++) { 
      if (i < numPreviousOwners) { //comprobar que esto funciona(deberia)
        for (let j = 0; j < prevOwnersRepairs[i].repairs.length; j++) {
          for (let l = 0; l < prevOwnersRepairs[i].repairs[j].numDefectsRepaired; l++) {
            if (prevOwnersRepairs[i].repairs[j].defectsRepaired[l][0] == selectedOwner && 
              prevOwnersRepairs[i].repairs[j].defectsRepaired[l][1] == selectedGroup &&
              prevOwnersRepairs[i].repairs[j].defectsRepaired[l][2] == -2) {
              updatedDR[numDR] = `Todos los defectos de este grupo han sido reparados por el propietario ${i+1} en la reparación ${j+1}`;
              ++numDR;
            }
            else if (prevOwnersRepairs[i].repairs[j].defectsRepaired[l][0] == selectedOwner && 
              prevOwnersRepairs[i].repairs[j].defectsRepaired[l][1] == selectedGroup) {
              updatedDR[numDR] = `El defecto ${prevOwnersRepairs[i].repairs[j].defectsRepaired[l][2]+1} de este grupo ha sido reparado por el propietario ${i+1} en la reparación ${j+1}`;
              ++numDR;
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
              updatedDR[numDR] = `Todos los defectos de este grupo han sido reparados por el propietario ${i+1} en la reparación ${j+1}`;
              ++numDR;
            }
            else if (repairs[i-numPreviousOwners].group[j].defectsRepaired[l][0] == selectedOwner && 
              repairs[i-numPreviousOwners].group[j].defectsRepaired[l][1] == selectedGroup) {
              updatedDR[numDR] = `El defecto ${repairs[i-numPreviousOwners].group[j].defectsRepaired[l][2]+1} de este grupo ha sido reparado por el propietario ${i+1} en la reparación ${j+1}`;
              ++numDR;
            }
          }
        }
      }
    }
    setDefectsRepaired(updatedDR);
  }, [selectedOwner]);

  return (
    <div className={styles.repairedDefectByContainer}>
      <div className={styles.fieldLabel}>
        {fieldLabel}
      </div>
      {defectsRepaired.filter(defectRepaired => defectRepaired != '').map((defectRepaired, index) => (
        <div key={`${defectRepaired}-${index}`}>
          {defectRepaired}
        </div>
      ))}
    </div>
  );
};

export default RepairedDefectsByContainer;


