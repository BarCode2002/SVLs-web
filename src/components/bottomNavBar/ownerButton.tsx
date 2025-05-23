import { SetStateAction, useState } from 'react';
import styles from '../../styles/components/bottomNavBar/manageOwnerButtons.module.css';
import { TrashIconWhite, TrashIconDarkBronco } from '../../assets/trash';
import { useTranslation } from "react-i18next";
import { PossibleDefectsJsonVersions, PossibleGeneralInformationJsonVersions, PossibleMaintenancesJsonVersions, PossibleModificationsJsonVersions, PossibleRepairsJsonVersions } from '../../utils/commonTypes';

type OwnerButtonProps = {
  index: number;
  ownersContainerRef: any;
  setGeneralInformation: React.Dispatch<SetStateAction<PossibleGeneralInformationJsonVersions[]>>;
  setMaintenances: React.Dispatch<SetStateAction<PossibleMaintenancesJsonVersions[]>>;
  setModifications: React.Dispatch<SetStateAction<PossibleModificationsJsonVersions[]>>;
  setDefects: React.Dispatch<SetStateAction<PossibleDefectsJsonVersions[]>>;
  setRepairs: React.Dispatch<SetStateAction<PossibleRepairsJsonVersions[]>>;
  selectedOwner: number;
  setSelectedOwner: React.Dispatch<SetStateAction<number>>;
  numPreviousOwners: number;
  totalOwners: number;
  setTotalOwners: React.Dispatch<React.SetStateAction<number>>;
  editMode: boolean;
  mySVL: boolean;
};

const OwnerButton = ({ index, ownersContainerRef, setGeneralInformation, setMaintenances, setModifications, setDefects, setRepairs, selectedOwner, setSelectedOwner, numPreviousOwners, totalOwners, setTotalOwners, editMode, mySVL }: OwnerButtonProps): JSX.Element => {

  const { t } = useTranslation();
  const [warnignRemoveOwner, setWarningRemoveOwner] = useState(false);
  const [trashHovered, setTrashHovered] = useState(false);

  const handleOwnerChange = (event: any) => {
    if (ownersContainerRef) {
      const containerRect = ownersContainerRef.getBoundingClientRect();
      const button = event.target;
      const buttonRect = button.getBoundingClientRect();
      const offset = buttonRect.left - containerRect.left; 
      const scrollTo = ownersContainerRef.scrollLeft + offset - containerRect.width / 2 + buttonRect.width / 2;
      ownersContainerRef.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
    setSelectedOwner(index);
  };
  
  const removeGeneralInformation = () => {
    setGeneralInformation((prevGeneralInformation: PossibleGeneralInformationJsonVersions[]) => prevGeneralInformation.filter((_, i) => i != index-numPreviousOwners));
  }

  const removeMaintenances = () => {
    setMaintenances((prevMaintenances: PossibleMaintenancesJsonVersions[]) => prevMaintenances.filter((_, i) => i != index-numPreviousOwners));
  }

  const removeModifications = () => {
    setModifications((prevModifications: PossibleModificationsJsonVersions[]) => prevModifications.filter((_, i) => i != index-numPreviousOwners));
  }

  const removeDefects = () => {
    setDefects((prevDefects: PossibleDefectsJsonVersions[]) => prevDefects.filter((_, i) => i != index-numPreviousOwners));
  }

  const removeRepairs = () => {
    setRepairs((prevRepairs: PossibleRepairsJsonVersions[]) => prevRepairs.filter((_, i) => i != index-numPreviousOwners));
  }
  
  const handleOwnerRemoval = () => {
    removeGeneralInformation();
    removeMaintenances();
    removeModifications();
    removeDefects();
    removeRepairs();
    if (selectedOwner > 0 && selectedOwner == index) setSelectedOwner(selectedOwner-1);
    else if (selectedOwner > index) setSelectedOwner(selectedOwner-1);
    setTotalOwners(totalOwners-1);
    setWarningRemoveOwner(false);
  }

  const handleOpenWarning = () => {
    setWarningRemoveOwner(true);
  }

  const handleCloseWarning = () => {
    setWarningRemoveOwner(false);
  }

  return (
    <div className={styles.ownerContainer}>
      <button
        className={index == selectedOwner ? styles.ownerButtonSelected : styles.ownerButton }
        onClick={handleOwnerChange}>
        {`${t('DataSVL.BottomBar.owner')} ${index+1}`}
      </button>
      {mySVL && index >= numPreviousOwners &&
        <button
          onMouseEnter={() => setTrashHovered(true)}
          onMouseLeave={() => setTrashHovered(false)}
          className={styles.removeOwnerButton}
          onClick={handleOpenWarning}
          disabled={!editMode || totalOwners == 1}>
          {trashHovered ? <TrashIconDarkBronco /> : <TrashIconWhite />}
        </button>
      }  
      {warnignRemoveOwner &&
        <div className={styles.warnignRemoveOwnerContainer}>
          <div className={styles.warnignRemoveOwner}>
            <div className={styles.text}>
              {t('DataSVL.Labels.warningRemoveOwner')} {index+1}? {t('DataSVL.Labels.warningRemoveOwnerLostData')}
            </div>
            <div className={styles.confirmCloseButtonContainer}>
              <button
                className={styles.confirmCloseButton}
                onClick={handleOwnerRemoval}>
                {t('DataSVL.Placeholders.confirm')}
              </button>
              <button
                className={styles.confirmCloseButton}
                onClick={handleCloseWarning}>
                {t('DataSVL.Placeholders.cancel')}
              </button>
            </div>
          </div>
        </div>
      }
    </div>
  );
}

export default OwnerButton;