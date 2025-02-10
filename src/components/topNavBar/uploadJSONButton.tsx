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
            for (let i = 0; i < ownerSVLData[1].maintenances.length; i++) {
              addAndSetMaintenanceGroup(setMaintenances, selectedOwner, ownerSVLData[1].maintenances[i]);
              for (let j = 1; j < ownerSVLData[1].maintenances[i].type.length; j++) {
                addAndSetMaintenanceGroupType(setMaintenances, selectedOwner, i, ownerSVLData[1].maintenances[i].type[j]);
              }
            }

            setOwnerSVLDataToEmpty(selectedOwner, setModifications);
            for (let i = 0; i < ownerSVLData[2].modifications.length; i++) {
              addAndSetModificationGroup(setModifications, selectedOwner, ownerSVLData[2].modifications[i]);
              for (let j = 1; j < ownerSVLData[2].modifications[i].type.length; j++) {
                addAndSetModificationGroupType(setModifications, selectedOwner, i, ownerSVLData[2].modifications[i].type[j]);
              }
            }
            
            setOwnerSVLDataToEmpty(selectedOwner, setDefects);
            for (let i = 0; i < ownerSVLData[3].defects.length; i++) {
              addAndSetDefectGroup(setDefects, selectedOwner, ownerSVLData[3].defects[i]);
              for (let j = 1; j < ownerSVLData[3].defects[i].type.length; ++j) {
                addAndSetDefectGroupType(setDefects, selectedOwner, i, ownerSVLData[3].defects[i].type[j]);
              }
            }

            setOwnerSVLDataToEmpty(selectedOwner, setRepairs);
            for (let i = 0; i < ownerSVLData[4].repairs.length; i++) {
              addAndSetRepairGroup(setRepairs, selectedOwner, ownerSVLData[4].repairs[i]);
              for (let j = 1; j < ownerSVLData[4].repairs[i].type.length; j++) {
                addAndSetRepairGroupType(setRepairs, selectedOwner, i, ownerSVLData[4].repairs[i].type[j]);
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