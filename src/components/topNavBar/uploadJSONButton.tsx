import { SetStateAction } from 'react';
import styles from '../../styles/components/topNavBar/topNavBarButtons.module.css';
import { GeneralInformation, Maintenances, Modifications, Defects, Repairs } from '../../utils/interfaces';
import { addAndSetMaintenanceGroup, addAndSetMaintenanceGroupType, setOwnerSVLDataToEmpty } from '../../utils/uploadJSON';
import { addAndSetModificationGroup, addAndSetModificationGroupType } from '../../utils/uploadJSON';
import { addAndSetDefectGroup, addAndSetDefectGroupType } from '../../utils/uploadJSON';
import { addAndSetRepairGroup, addAndSetRepairGroupType } from '../../utils/uploadJSON';
import { useTranslation } from "react-i18next";

type UploadSONButtonProps = {
  selectedOwner: number;
  generalInformation: GeneralInformation[];
  setGeneralInformation: React.Dispatch<SetStateAction<GeneralInformation[]>>;
  setMaintenances: React.Dispatch<SetStateAction<Maintenances[]>>;
  setModifications: React.Dispatch<SetStateAction<Modifications[]>>;
  setDefects: React.Dispatch<SetStateAction<Defects[]>>;
  setRepairs: React.Dispatch<SetStateAction<Repairs[]>>;
};

const UploadJSONButton = ({ selectedOwner, generalInformation, setGeneralInformation, setMaintenances, setModifications, setDefects, setRepairs }: UploadSONButtonProps): JSX.Element => {

  const { t } = useTranslation();

  const handleJSONUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const result = e.target?.result;
          if (typeof result == "string") {
            const ownerSVLData = JSON.parse(result);

            const updatedGeneralInformation = [...generalInformation];
            updatedGeneralInformation[selectedOwner] = ownerSVLData[0];
            setGeneralInformation(updatedGeneralInformation);

            setOwnerSVLDataToEmpty(selectedOwner, setMaintenances);
            for (let i = 0; i < ownerSVLData[1].numGroups; i++) {
              addAndSetMaintenanceGroup(setMaintenances, selectedOwner, ownerSVLData[1].maintenances[i].date, ownerSVLData[1].maintenances[i].kilometers, ownerSVLData[1].maintenances[i].name,
                ownerSVLData[1].maintenances[i].responsible, ownerSVLData[1].maintenances[i].pre, ownerSVLData[1].maintenances[i].post, 
                ownerSVLData[1].maintenances[i].type[0].name, ownerSVLData[1].maintenances[i].type[0].components, ownerSVLData[1].maintenances[i].type[0].numComponents,
                ownerSVLData[1].maintenances[i].type[0].pre, ownerSVLData[1].maintenances[i].type[0].post, ownerSVLData[1].maintenances[i].type[0].comments,
                ownerSVLData[1].maintenances[i].type[0].shrinked, ownerSVLData[1].maintenances[i].shrinked
              );
              for (let j = 1; j < ownerSVLData[1].maintenances[i].numTypes; j++) {
                addAndSetMaintenanceGroupType(setMaintenances, selectedOwner, i, ownerSVLData[1].maintenances[i].type[j].name, ownerSVLData[1].maintenances[i].type[j].components, 
                  ownerSVLData[1].maintenances[i].type[j].numComponents, ownerSVLData[1].maintenances[i].type[j].pre, ownerSVLData[1].maintenances[i].type[j].post, 
                  ownerSVLData[1].maintenances[i].type[j].comments, ownerSVLData[1].maintenances[i].type[j].shrinked
                );
              }
            }

            setOwnerSVLDataToEmpty(selectedOwner, setModifications);
            for (let i = 0; i < ownerSVLData[2].numGroups; i++) {
              addAndSetModificationGroup(setModifications, selectedOwner, ownerSVLData[2].modifications[i].date, ownerSVLData[2].modifications[i].kilometers, ownerSVLData[2].modifications[i].name,
                ownerSVLData[2].modifications[i].responsible, ownerSVLData[2].modifications[i].pre, ownerSVLData[2].modifications[i].post, 
                ownerSVLData[2].modifications[i].type[0].name, ownerSVLData[2].modifications[i].type[0].components, ownerSVLData[2].modifications[i].type[0].numComponents,
                ownerSVLData[2].modifications[i].type[0].pre, ownerSVLData[2].modifications[i].type[0].post, ownerSVLData[2].modifications[i].type[0].comments,
                ownerSVLData[2].modifications[i].type[0].shrinked, ownerSVLData[2].modifications[i].shrinked
              );
              for (let j = 1; j < ownerSVLData[2].modifications[i].numTypes; j++) {
                addAndSetModificationGroupType(setModifications, selectedOwner, i, ownerSVLData[2].modifications[i].type[j].name, ownerSVLData[2].modifications[i].type[j].components, 
                  ownerSVLData[2].modifications[i].type[j].numComponents, ownerSVLData[2].modifications[i].type[j].pre, ownerSVLData[2].modifications[i].type[j].post, 
                  ownerSVLData[2].modifications[i].type[j].comments, ownerSVLData[2].modifications[i].type[j].shrinked
                );
              }
            }
            
            setOwnerSVLDataToEmpty(selectedOwner, setDefects);
            for (let i = 0; i < ownerSVLData[3].numGroups; i++) {
              addAndSetDefectGroup(setDefects, selectedOwner, ownerSVLData[3].defects[i].date, ownerSVLData[3].defects[i].kilometers,
                ownerSVLData[3].defects[i].cause, ownerSVLData[3].defects[i].type[0].level, ownerSVLData[3].defects[i].type[0].photographs,
                ownerSVLData[3].defects[i].type[0].description, ownerSVLData[3].defects[i].type[0].shrinked, ownerSVLData[3].defects[i].shrinked
              );
              for (let j = 1; j < ownerSVLData[3].defects[i].numTypes; ++j) {
                addAndSetDefectGroupType(setDefects, selectedOwner, i,ownerSVLData[3].defects[i].type[0].level, ownerSVLData[3].defects[i].type[0].photographs,
                  ownerSVLData[3].defects[i].type[0].description, ownerSVLData[3].defects[i].type[0].shrinked,
                );
              }
            }

            setOwnerSVLDataToEmpty(selectedOwner, setRepairs);
            for (let i = 0; i < ownerSVLData[4].numGroups; i++) {
              addAndSetRepairGroup(setRepairs, selectedOwner, ownerSVLData[4].repairs[i].date, ownerSVLData[4].repairs[i].kilometers, ownerSVLData[4].repairs[i].name,
                ownerSVLData[4].repairs[i].responsible, ownerSVLData[4].repairs[i].pre, ownerSVLData[4].repairs[i].post, ownerSVLData[4].repairs[i].defectsRepaired, 
                ownerSVLData[4].repairs[i].numDefectsRepaired, ownerSVLData[4].repairs[i].type[0].name, ownerSVLData[4].repairs[i].type[0].components, 
                ownerSVLData[4].repairs[i].type[0].numComponents, ownerSVLData[4].repairs[i].type[0].pre, ownerSVLData[4].repairs[i].type[0].post, 
                ownerSVLData[4].repairs[i].type[0].comments, ownerSVLData[4].repairs[i].type[0].shrinked, ownerSVLData[4].repairs[i].shrinked
              );
              for (let j = 1; j < ownerSVLData[4].repairs[i].numTypes; j++) {
                addAndSetRepairGroupType(setRepairs, selectedOwner, i, ownerSVLData[4].repairs[i].type[j].name, ownerSVLData[4].repairs[i].type[j].components, 
                  ownerSVLData[4].repairs[i].type[j].numComponents, ownerSVLData[4].repairs[i].type[j].pre, ownerSVLData[4].repairs[i].type[j].post, 
                  ownerSVLData[4].repairs[i].type[j].comments, ownerSVLData[4].repairs[i].type[j].shrinked
                );
              }
            }
  
          }
        } catch(error) {
          console.error(error);
        }
      }
      reader.readAsText(event.target.files[0]);
    }
    event.target.value = '';
  };

  return (
    <div>
      <button 
        className={styles.button} 
        onClick={() => document.getElementById('json-upload')!.click()}>
        {t('DataSVL.TopBar.uploadJSON')}
      </button>
      <input 
        type="file" 
        multiple={false}
        onChange={handleJSONUpload}
        id='json-upload'
        style={{ display: 'none' }}
      />
    </div>
  );
}

export default UploadJSONButton;