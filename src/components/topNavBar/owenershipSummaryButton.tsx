import { useState } from 'react';
import styles from '../../styles/components/topNavBar/ownershipSummaryButton.module.css';
import { DetectClickOutsideComponent } from '../varied/detectClickOutsideComponent';
import { OwnershipSummary } from '../../utils/interfaces';
import { useTranslation } from "react-i18next";

type OwnershipSummaryButtonProps = {
  ownershipSummary: OwnershipSummary[];
}

const OwnershipSummaryButton = ({ ownershipSummary }: OwnershipSummaryButtonProps) => {

  const { t } = useTranslation();
  const [showInfo, setShowInfo] = useState(false);
  
  const handleOwnershipSummary = () => {
    if (showInfo) setShowInfo(false);
    else setShowInfo(true);
  }

  const closeOwnershipSummary = () => {
    setShowInfo(false);
  }

  const refClickOutside = DetectClickOutsideComponent(() => { 
    if (showInfo) setShowInfo(false); 
  });

  return (
    <div ref={refClickOutside}>
      <button
        className={styles.button}
        onClick={handleOwnershipSummary}>
        {t('DataSVL.TopBar.ownershipSummary')}
      </button>
      {showInfo == true &&
        <div className={styles.ownershipSummaryContainer}>
          {ownershipSummary.map((owner, index) => (
            <div key={index} className={styles.ownershipInformation}>
              {owner.ownerAddress}
              {Array(owner.owners).map((ownerI, i) => (
                <div key={i}>
                  {ownerI}
                </div>
              ))}
            </div>
          ))}
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


