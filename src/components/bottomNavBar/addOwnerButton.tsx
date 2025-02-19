import { SetStateAction } from 'react';
import styles from '../../styles/components/bottomNavBar/manageOwnerButtons.module.css';
import { GeneralInformation, Maintenances, Modifications, Defects, Repairs } from '../../utils/interfaces.ts';
import { addGeneralInformationPrev, addGeneralInformation, addMaintenances, addModifications, addDefects, addRepairs } from '../../utils/addOwners.ts';

type AddOwnerButtonProps = {
  setGeneralInformation: React.Dispatch<SetStateAction<GeneralInformation[]>>;
  setMaintenances: React.Dispatch<SetStateAction<Maintenances[]>>;
  setModifications: React.Dispatch<SetStateAction<Modifications[]>>;
  setDefects: React.Dispatch<SetStateAction<Defects[]>>;
  setRepairs: React.Dispatch<SetStateAction<Repairs[]>>;
  setSelectedOwner: React.Dispatch<React.SetStateAction<number>>;
  totalOwners: number;
  setTotalOwners: React.Dispatch<React.SetStateAction<number>>;
  numPreviousOwners: number;
  editMode: boolean;
  prevOwnersGeneralInformation: GeneralInformation[];
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