import { SetStateAction } from 'react';
import styles from '../../styles/components/bottomNavBar/manageOwnerButtons.module.css';
import { GeneralInformationBase, MaintenancesBase, ModificationsBase, DefectsBase, RepairsBase } from '../../utils/baseTypes.ts';
import { addGeneralInformationPrev, addGeneralInformation, addMaintenances, addModifications, addDefects, addRepairs } from '../../utils/addOwners.ts';

type AddOwnerButtonProps = {
  setGeneralInformation: React.Dispatch<SetStateAction<GeneralInformationBase[]>>;
  setMaintenances: React.Dispatch<SetStateAction<MaintenancesBase[]>>;
  setModifications: React.Dispatch<SetStateAction<ModificationsBase[]>>;
  setDefects: React.Dispatch<SetStateAction<DefectsBase[]>>;
  setRepairs: React.Dispatch<SetStateAction<RepairsBase[]>>;
  setSelectedOwner: React.Dispatch<React.SetStateAction<number>>;
  totalOwners: number;
  setTotalOwners: React.Dispatch<React.SetStateAction<number>>;
  numPreviousOwners: number;
  editMode: boolean;
  prevOwnersGeneralInformation: GeneralInformationBase[];
};

const AddOwnerButton = ({ setGeneralInformation, setMaintenances, setModifications, setDefects, setRepairs, setSelectedOwner, totalOwners, setTotalOwners, numPreviousOwners, editMode, prevOwnersGeneralInformation }: AddOwnerButtonProps): JSX.Element => {

  const handleOwnerAddition = () => {
    if (numPreviousOwners == totalOwners) {
      addGeneralInformationPrev(setGeneralInformation, prevOwnersGeneralInformation, numPreviousOwners);
    }
    else addGeneralInformation(setGeneralInformation);
    addMaintenances(setMaintenances);
    addModifications(setModifications);
    addDefects(setDefects);
    addRepairs(setRepairs);
    setSelectedOwner(totalOwners);
    setTotalOwners(totalOwners+1);
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