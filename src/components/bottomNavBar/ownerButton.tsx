import { SetStateAction } from 'react';
import styles from '../../styles/components/bottomNavBar/manageOwnerButtons.module.css';
import { GeneralInformation, Maintenances, Modifications, Defects, Repairs } from '../../utils/interfaces';
import { useTranslation } from "react-i18next";

type OwnerButtonProps = {
  index: number;
  ownersContainerRef: any;
  setGeneralInformation: React.Dispatch<SetStateAction<GeneralInformation[]>>;
  setMaintenances: React.Dispatch<SetStateAction<Maintenances[]>>;
  setModifications: React.Dispatch<SetStateAction<Modifications[]>>;
  setDefects: React.Dispatch<SetStateAction<Defects[]>>;
  setRepairs: React.Dispatch<SetStateAction<Repairs[]>>;
  selectedOwner: number;
  setSelectedOwner: React.Dispatch<SetStateAction<number>>;
  numPreviousOwners: number;
  totalOwners: number;
  setTotalOwners: React.Dispatch<React.SetStateAction<number>>;
  editMode: boolean;
};

const OwnerButton = ({ index, ownersContainerRef, setGeneralInformation, setMaintenances, setModifications, setDefects, setRepairs, selectedOwner, setSelectedOwner, numPreviousOwners, totalOwners, setTotalOwners, editMode  }: OwnerButtonProps): JSX.Element => {

  const { t } = useTranslation();
  const owner = `${t('DataSVL.BottomBar.owner')} ${index+1}`;

  const handleOwnerChange = (event: any) => {
    const button = event.target;
    if (ownersContainerRef) {
      const containerRect = ownersContainerRef.getBoundingClientRect();
      const buttonRect = button.getBoundingClientRect();
      const offset = buttonRect.left - containerRect.left; 
      const scrollTo = ownersContainerRef.scrollLeft + offset - containerRect.width / 2 + buttonRect.width / 2;
      ownersContainerRef.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
    setSelectedOwner(index);
  };
  
  const removeGeneralInformation = () => {
    setGeneralInformation((prevGeneralInformation: GeneralInformation[]) => prevGeneralInformation.filter((_, index) => index != selectedOwner));
  }

  const removeMaintenances = () => {
    setMaintenances((prevMaintenances: Maintenances[]) => prevMaintenances.filter((_, index) => index != selectedOwner));
  }

  const removeModifications = () => {
    setModifications((prevModifications: Modifications[]) => prevModifications.filter((_, index) => index != selectedOwner));
  }

  const removeDefects = () => {
    setDefects((prevDefects: Defects[]) => prevDefects.filter((_, index) => index != selectedOwner));
  }

  const removeRepairs = () => {
    setRepairs((prevRepairs: Repairs[]) => prevRepairs.filter((_, index) => index != selectedOwner));
  }
  
  const handleOwnerRemoval = () => {
    removeGeneralInformation();
    removeMaintenances();
    removeModifications();
    removeDefects();
    removeRepairs();
    if (selectedOwner+numPreviousOwners > 0) setSelectedOwner(selectedOwner+numPreviousOwners-1);
    setTotalOwners(totalOwners-1);
  }

  return (
    <div className={styles.ownerContainer}>
      <button
        className={styles.removeOwnerButton}
        onClick={handleOwnerRemoval}
        disabled={!editMode}>
        -
      </button>
      <button
        className={index == selectedOwner ? styles.ownerButtonSelected : styles.ownerButton }
        onClick={handleOwnerChange}>
        {owner}
      </button>
    </div>
  );
}

export default OwnerButton;