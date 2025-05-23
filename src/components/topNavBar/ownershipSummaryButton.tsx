import { useRef, useState } from 'react';
import styles from '../../styles/components/topNavBar/ownershipSummaryButton.module.css';
import { DetectClickOutsideComponent } from '../varied/detectClickOutsideComponent';
import { OwnershipSummary } from '../../utils/commonTypes';
import { useTranslation } from "react-i18next";

type OwnershipSummaryButtonProps = {
  ownershipSummary: OwnershipSummary[];
}

const OwnershipSummaryButton = ({ ownershipSummary }: OwnershipSummaryButtonProps) => {

  const { t } = useTranslation();
  const [showInfo, setShowInfo] = useState(false);
  const [position, setPosition] = useState({ left: 0, top: 0 });
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef(null);
  
  const handleOwnershipSummary = () => {
    if (showInfo) setShowInfo(false);
    else {
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        const panelWidth = 400;
        const screenWidth = window.innerWidth;
        let newX = rect.left;
        if (newX + panelWidth > screenWidth) {
          newX = screenWidth - panelWidth;
        }
        setPosition({ left: newX, top: rect.bottom });
        setShowInfo(true);
      }
    }
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
        ref={buttonRef}
        className={styles.button}
        onClick={handleOwnershipSummary}>
        {t('DataSVL.TopBar.ownershipSummary')}
      </button>
      {showInfo == true &&
        <div ref={panelRef} className={styles.ownershipSummaryContainer} style={{ left: position.left, top: position.top }}>
          <div className={styles.ownershipSummaryInformationContainer}>
            {ownershipSummary.map((owner, index) => (
              <div key={index} className={styles.ownershipInformation}>
                <div>{owner.transferDate}</div>
                <div>{owner.ownerAddress}</div>
                <div className={styles.ownersContainer}>
                  {owner.owners.map((ownerI, i) => (
                    <div key={i}>
                      {ownerI}
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div className={styles.closeButtonContainer}>
              <button
                className={styles.closeButton}
                onClick={closeOwnershipSummary}>
                {t('DataSVL.TopBar.close')}
              </button>
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default OwnershipSummaryButton;


