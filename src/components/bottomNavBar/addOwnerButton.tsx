import { SetStateAction } from 'react';
import styles from '../../styles/components/bottomNavBar/manageOwnerButtons.module.css';
import { GeneralInformation, Maintenances, Modifications, Defects, Repairs } from '../../utils/interfaces.ts';
import { addGeneralInformation, addMaintenances, addModifications, addDefects, addRepairs } from '../../utils/addOwners.ts';
import { useTranslation } from "react-i18next";

type AddOwnerButtonProps = {
  setGeneralInformation: React.Dispatch<SetStateAction<GeneralInformation[]>>;
  setMaintenances: React.Dispatch<SetStateAction<Maintenances[]>>;
  setModifications: React.Dispatch<SetStateAction<Modifications[]>>;
  setDefects: React.Dispatch<SetStateAction<Defects[]>>;
  setRepairs: React.Dispatch<SetStateAction<Repairs[]>>;
  setSelectedOwner: React.Dispatch<React.SetStateAction<number>>;
  totalOwners: number;
  setTotalOwners: React.Dispatch<React.SetStateAction<number>>;
  editMode: boolean;
};

const AddOwnerButton = ({ setGeneralInformation, setMaintenances, setModifications, setDefects, setRepairs, setSelectedOwner, totalOwners, setTotalOwners, editMode }: AddOwnerButtonProps): JSX.Element => {

  const { t } = useTranslation();

  const handleOwnerAddition = () => {
    addGeneralInformation(setGeneralInformation);
    addMaintenances(setMaintenances);
    addModifications(setModifications);
    addDefects(setDefects, t('DataSVL.Forms.level'));
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