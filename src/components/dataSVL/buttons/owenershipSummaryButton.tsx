import { useState } from 'react';
import styles from '../../../styles/components/dataSVL/buttons/ownershipSummaryButton.module.css';
import { DetectClickOutsideComponent } from '../../varied/detectClickOutsideComponent';
import { useTranslation } from "react-i18next";

type OwnershipSummaryButtonProps = {

}

const OwnershipSummaryButton = ({ }: OwnershipSummaryButtonProps) => {

  const { t } = useTranslation();
  const [showInfo, setShowInfo] = useState(false);
  
  const openOwnershipSummary = () => {
    setShowInfo(true)
  }

  const closeOwnershipSummary = () => {
    setShowInfo(false)
  }

  const refClickOutside = DetectClickOutsideComponent(() => { 
    if (showInfo) setShowInfo(false); 
  });

  return (
    <div>
      <button
        className={styles.button}
        onClick={openOwnershipSummary}>
        {t('DataSVL.TopBar.ownershipSummary')}
      </button>
      {showInfo == true &&
        <div ref={refClickOutside} className={styles.ownershipSummaryContainer}>
          <div className={styles.ownershipInformation}>
            <div>hola: r343gtg</div>
            <div>adios: 432423</div>
          </div>
          <div className={styles.closeButton}>
            <button
              className={styles.button}
              onClick={closeOwnershipSummary}>
              {t('DataSVL.TopBar.close')}
            </button>
          </div>
        </div>
      }
    </div>
  );
};

export default OwnershipSummaryButton;


