import { SetStateAction } from 'react';
import styles from '../../styles/components/bottomNavBar/manageOwnerButtons.module.css';
import { GeneralInformationBase } from '../../utils/baseTypes.ts';
import { addGeneralInformationPrev, addGeneralInformation, addMaintenances, addModifications, addDefects, addRepairs } from '../../utils/addOwners.ts';
import { PossibleDefectsJsonVersions, PossibleGeneralInformationJsonVersions, PossibleMaintenancesJsonVersions, PossibleModificationsJsonVersions, PossibleRepairsJsonVersions } from '../../utils/commonTypes.ts';

type AddOwnerButtonProps = {
  setGeneralInformation: React.Dispatch<SetStateAction<PossibleGeneralInformationJsonVersions[]>>;
  setMaintenances: React.Dispatch<SetStateAction<PossibleMaintenancesJsonVersions[]>>;
  setModifications: React.Dispatch<SetStateAction<PossibleModificationsJsonVersions[]>>;
  setDefects: React.Dispatch<SetStateAction<PossibleDefectsJsonVersions[]>>;
  setRepairs: React.Dispatch<SetStateAction<PossibleRepairsJsonVersions[]>>;
  setSelectedOwner: React.Dispatch<React.SetStateAction<number>>;
  totalOwners: number;
  setTotalOwners: React.Dispatch<React.SetStateAction<number>>;
  numPreviousOwners: number;
  editMode: boolean;
  prevOwnersGeneralInformation: GeneralInformationBase[];
  selectedJsonVersion: string;
  jsonVersion: string[];
  setJsonVersion: React.Dispatch<SetStateAction<string[]>>;
};

const AddOwnerButton = ({ setGeneralInformation, setMaintenances, setModifications, setDefects, setRepairs, setSelectedOwner, totalOwners, setTotalOwners, numPreviousOwners, editMode, prevOwnersGeneralInformation, selectedJsonVersion, jsonVersion, setJsonVersion }: AddOwnerButtonProps): JSX.Element => {

  const handleOwnerAddition = () => {
    if (numPreviousOwners == totalOwners) {
      addGeneralInformationPrev(setGeneralInformation, prevOwnersGeneralInformation, numPreviousOwners);
    }
    else addGeneralInformation(setGeneralInformation);
    addMaintenances(setMaintenances, selectedJsonVersion);
    addModifications(setModifications, selectedJsonVersion);
    addDefects(setDefects);
    addRepairs(setRepairs, selectedJsonVersion);
    setSelectedOwner(totalOwners);
    setTotalOwners(totalOwners+1);
    const updatedJsonVersion = [...jsonVersion];
    updatedJsonVersion.push(selectedJsonVersion);
    setJsonVersion(updatedJsonVersion);
  }

  return (
    <div>
      <button
        className={styles.addOwnerButton}
        onClick={handleOwnerAddition}
        disabled={!editMode}>
        +
      </button>
    </div>
  );
}

export default AddOwnerButton;