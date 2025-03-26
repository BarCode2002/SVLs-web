import { SetStateAction, useState } from 'react';
import styles from '../../../styles/components/dataSVL/buttons/changeJsonVersion.module.css';
import { DetectClickOutsideComponent } from '../../varied/detectClickOutsideComponent';
import { TopArrow, BottomArrowBlack, BottomArrowWhite } from '../../../assets/directionArrows';
import { t } from 'i18next';

type ChangeJsonVersionProps = {
  selectedOwner: number;
  jsonVersion: string[];
  setJsonVersion: React.Dispatch<SetStateAction<string[]>>;
  editMode: boolean;
  numPreviousOwners: number;
};

const ChangeJsonVersion = ({ selectedOwner, jsonVersion, setJsonVersion, editMode, numPreviousOwners }: ChangeJsonVersionProps): JSX.Element => {
 
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const list = ['base', 'baseSimple'];
  const cancelButtonText = t('DataSVL.Placeholders.cancel');
  const searchBarPlaceholder = t('DataSVL.Placeholders.search');
  const [isHovered, setIsHovered] = useState(false);
  const [warningChangeVersion, setWarningChangeVersion] = useState(false);
  const [selectedJsonVersion, setSelectedJsonVersion] = useState('');

  const hadleOpenDropdownMenu = () => {
    if (isOpen) setIsOpen(false);
    else {
      setSearchQuery('');
      setIsOpen(true);
    }
  }

  const handleChangeJsonVersion = ()=> {
    const updatedJsonVersion = [...jsonVersion]
    updatedJsonVersion[selectedOwner] = selectedJsonVersion;
    setJsonVersion(updatedJsonVersion);
    setIsOpen(false);
    setWarningChangeVersion(false);
  }
  
  const refClickOutside = DetectClickOutsideComponent(() => { 
    if (isOpen) setIsOpen(false); 
  });

  const handleOpenWarning = (selectedJsonVersion: string) => {
    setWarningChangeVersion(true);
    setSelectedJsonVersion(selectedJsonVersion);
  }

  const handleCloseWarning = () => {
    setWarningChangeVersion(false);
  }

  const handleIsHovered = () => {
    if (isHovered && editMode) setIsHovered(false);
    else if (!isHovered && editMode) setIsHovered(true);
  }

  return (
    <div>
      <div ref={refClickOutside} className={styles.dropdownMenuContainer}>
        <div className={styles.dropDownPosition}>
          <button
            onMouseEnter={handleIsHovered}
            onMouseLeave={handleIsHovered}
            className={isOpen ? styles.selectedOpen : styles.selected}
            onClick={hadleOpenDropdownMenu}
            disabled={!editMode || selectedOwner < numPreviousOwners}>
            {(selectedOwner < numPreviousOwners || !editMode) && 
              <span>{t('jsonVersion.version')} {t(`jsonVersion.${jsonVersion[selectedOwner]}`)}</span>
            }
            {selectedOwner >= numPreviousOwners && editMode && 
              <span>{t(`jsonVersion.${jsonVersion[selectedOwner]}`)}</span>
            }
            {selectedOwner >= numPreviousOwners && editMode && 
              <span>{(isOpen) ? <TopArrow /> : isHovered ? <BottomArrowBlack /> : <BottomArrowWhite />}</span>
            }
          </button>
          {isOpen && (
            <div className={styles.dropdownMenu}>
              <input
                className={styles.searchInput}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(t(e.target.value))}
                placeholder={searchBarPlaceholder}
              />
              <div className={styles.dropdownList}>
                {list.length ? list.filter(jsonVersion => t(`jsonVersion.${jsonVersion}`).toLocaleLowerCase().includes(searchQuery.toLowerCase())).map((jsonVersion) => (
                  <div key={jsonVersion}>   
                    <button
                      className={styles.dropdownItem}
                      onClick={() => (handleOpenWarning(jsonVersion))}>
                      {t(`jsonVersion.${jsonVersion}`)}
                    </button>
                  </div>
                )) : null}
              </div>
              <button 
                className={styles.cancelButton} 
                onClick={() => setIsOpen(false)}>
                {cancelButtonText}
              </button>
            </div>
          )}
        </div>
      </div>
      {warningChangeVersion &&
        <div className={styles.warningChangeVersionContainer}>
          <div className={styles.warningChangeVersion}>
            <div className={styles.text}>
              {t('DataSVL.Placeholders.warningChangeVersion')}
            </div>
            <div className={styles.confirmCloseButtonContainer}>
              <button
                className={styles.confirmCloseButton}
                onClick={() => handleChangeJsonVersion()}>
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
};

export default ChangeJsonVersion;