import { SetStateAction } from 'react';
import styles from '../../styles/components/bottomNavBar/manageOwnerButtons.module.css';
import { GeneralInformation, Maintenances, Modifications, Defects, Repairs } from '../../utils/interfaces/dataSVL';

type RemoveOwnerButtonProps = {
  setGeneralInformation: React.Dispatch<SetStateAction<GeneralInformation[]>>;
  setMaintenances: React.Dispatch<SetStateAction<Maintenances[]>>;
  setModifications: React.Dispatch<SetStateAction<Modifications[]>>;
  setDefects: React.Dispatch<SetStateAction<Defects[]>>;
  setRepairs: React.Dispatch<SetStateAction<Repairs[]>>;
  selectedOwner: number;
  setSelectedOwner: React.Dispatch<SetStateAction<number>>;
  totalOwners: number;
  setTotalOwners: React.Dispatch<React.SetStateAction<number>>;
};

const RemoveOwnerButton = ({ setGeneralInformation, setMaintenances, setModifications, setDefects, setRepairs, selectedOwner, setSelectedOwner, totalOwners, setTotalOwners }: RemoveOwnerButtonProps): JSX.Element => {

  const removeGeneralInformation = async () => {
    setGeneralInformation((prevGeneralInformation: GeneralInformation[]) => prevGeneralInformation.filter((_, index) => index !== selectedOwner));
  }

  const removeMaintenances = async () => {
    setMaintenances((prevMaintenances: Maintenances[]) => prevMaintenances.filter((_, index) => index !== selectedOwner));
  }

  const removeModifications = async () => {
    setModifications((prevModifications: Modifications[]) => prevModifications.filter((_, index) => index !== selectedOwner));
  }

  const removeDefects = async () => {
    setDefects((prevDefects: Defects[]) => prevDefects.filter((_, index) => index !== selectedOwner));
  }

  const removeRepairs = async () => {
    setRepairs((prevRepairs: Repairs[]) => prevRepairs.filter((_, index) => index !== selectedOwner));
  }
  
  const handleOwnerRemoval = async () => {

    removeGeneralInformation();
    removeMaintenances();
    removeModifications();
    removeDefects();
    removeRepairs();
    if (selectedOwner > 0) setSelectedOwner(selectedOwner-1);
    setTotalOwners(totalOwners-1);
  }

  return (
    <div>
      <button
        className={styles.removeOwnerButton}
        onClick={handleOwnerRemoval}>
        -
      </button>
    </div>
  );
}

export default RemoveOwnerButton;