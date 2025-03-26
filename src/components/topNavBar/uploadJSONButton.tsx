import { SetStateAction } from 'react';
import styles from '../../styles/components/topNavBar/topNavBarButtons.module.css';
import { addAndSetMaintenanceGroup, addAndSetMaintenanceGroupType, setOwnerSVLDataToEmpty } from '../../utils/uploadJSON';
import { addAndSetModificationGroup, addAndSetModificationGroupType } from '../../utils/uploadJSON';
import { addAndSetDefectGroup, addAndSetDefectGroupType } from '../../utils/uploadJSON';
import { addAndSetRepairGroup, addAndSetRepairGroupType } from '../../utils/uploadJSON';
import { useTranslation } from "react-i18next";
import { PossibleDefectsJsonVersions, PossibleGeneralInformationJsonVersions, PossibleMaintenancesJsonVersions, PossibleModificationsJsonVersions, PossibleRepairsJsonVersions } from '../../utils/commonTypes';

type UploadSONButtonProps = {
  selectedOwner: number;
  numPreviousOwners: number;
  generalInformation: PossibleGeneralInformationJsonVersions[];
  setGeneralInformation: React.Dispatch<SetStateAction<PossibleGeneralInformationJsonVersions[]>>;
  setMaintenances: React.Dispatch<SetStateAction<PossibleMaintenancesJsonVersions[]>>;
  setModifications: React.Dispatch<SetStateAction<PossibleModificationsJsonVersions[]>>;
  setDefects: React.Dispatch<SetStateAction<PossibleDefectsJsonVersions[]>>;
  setRepairs: React.Dispatch<SetStateAction<PossibleRepairsJsonVersions[]>>;
  jsonUploaded?: boolean;
  setJsonUploaded?: React.Dispatch<boolean>;
  jsonVersion: string[];
  setJsonVersion: React.Dispatch<SetStateAction<string[]>>;
};

const UploadJSONButton = ({ selectedOwner, numPreviousOwners, generalInformation, setGeneralInformation, setMaintenances, setModifications, setDefects, setRepairs, jsonUploaded, setJsonUploaded, jsonVersion, setJsonVersion }: UploadSONButtonProps): JSX.Element => {

  const { t } = useTranslation();

  const handleJSONUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const result = e.target?.result;
          if (typeof result == "string") {
            const ownerSVLData = JSON.parse(result);
            const uploadedJsonVersion = ownerSVLData[5].version;
            const updatedJsonVersion = [...jsonVersion];
            updatedJsonVersion[selectedOwner] = uploadedJsonVersion;
            setJsonVersion(updatedJsonVersion);

            const updatedGeneralInformation = [...generalInformation];
            updatedGeneralInformation[selectedOwner-numPreviousOwners] = ownerSVLData[0];
            setGeneralInformation(updatedGeneralInformation);

            setOwnerSVLDataToEmpty(selectedOwner-numPreviousOwners, setMaintenances);
            for (let i = 0; i < ownerSVLData[1].group.length; i++) {
              addAndSetMaintenanceGroup(setMaintenances, selectedOwner-numPreviousOwners, ownerSVLData[1].group[i], jsonVersion[selectedOwner]);
              for (let j = 1; j < ownerSVLData[1].group[i].type.length; j++) {
                addAndSetMaintenanceGroupType(setMaintenances, selectedOwner-numPreviousOwners, i, ownerSVLData[1].group[i].type[j], jsonVersion[selectedOwner]);
              }
            }

            setOwnerSVLDataToEmpty(selectedOwner-numPreviousOwners, setModifications);
            for (let i = 0; i < ownerSVLData[2].group.length; i++) {
              addAndSetModificationGroup(setModifications, selectedOwner-numPreviousOwners, ownerSVLData[2].group[i], jsonVersion[selectedOwner]);
              for (let j = 1; j < ownerSVLData[2].group[i].type.length; j++) {
                addAndSetModificationGroupType(setModifications, selectedOwner-numPreviousOwners, i, ownerSVLData[2].group[i].type[j], jsonVersion[selectedOwner]);
              }
            }
            
            setOwnerSVLDataToEmpty(selectedOwner-numPreviousOwners, setDefects);
            for (let i = 0; i < ownerSVLData[3].group.length; i++) {
              addAndSetDefectGroup(setDefects, selectedOwner-numPreviousOwners, ownerSVLData[3].group[i]);
              for (let j = 1; j < ownerSVLData[3].group[i].type.length; ++j) {
                addAndSetDefectGroupType(setDefects, selectedOwner-numPreviousOwners, i, ownerSVLData[3].group[i].type[j]);
              }
            }

            setOwnerSVLDataToEmpty(selectedOwner-numPreviousOwners, setRepairs);
            for (let i = 0; i < ownerSVLData[4].group.length; i++) {
              addAndSetRepairGroup(setRepairs, selectedOwner-numPreviousOwners, ownerSVLData[4].group[i], jsonVersion[selectedOwner]);
              for (let j = 1; j < ownerSVLData[4].group[i].type.length; j++) {
                addAndSetRepairGroupType(setRepairs, selectedOwner-numPreviousOwners, i, ownerSVLData[4].group[i].type[j], jsonVersion[selectedOwner]);
              }
            }
            if (jsonUploaded) setJsonUploaded!(false);
            else setJsonUploaded!(true);
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