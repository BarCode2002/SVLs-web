import { SetStateAction, useState } from 'react';
import styles from '../../../styles/components/dataSVL/buttons/changeJsonVersion.module.css';
import { DetectClickOutsideComponent } from '../../varied/detectClickOutsideComponent';
import { TopArrow, BottomArrowBlack, BottomArrowWhite } from '../../../assets/directionArrows';
import { t } from 'i18next';

type ChangeJsonVersionProps = {
  selectedOwner: number;
  jsonVersion: string[];
  setJsonVersion: React.Dispatch<SetStateAction<string[]>>;
};

const ChangeJsonVersion = ({ selectedOwner, jsonVersion, setJsonVersion }: ChangeJsonVersionProps): JSX.Element => {
 
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

  return (
    <div>
      <div ref={refClickOutside} className={styles.dropdownMenuContainer}>
        <div className={styles.dropDownPosition}>
          <button
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={isOpen ? styles.selectedOpen : styles.selected}
            onClick={hadleOpenDropdownMenu}>
            <span>{jsonVersion[selectedOwner]}</span>
            <span>{(isOpen) ? <TopArrow /> : isHovered ? <BottomArrowBlack /> : <BottomArrowWhite />}</span>
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
                {list.length ? list.filter(jsonVersion => jsonVersion.toLocaleLowerCase().includes(searchQuery.toLowerCase())).map((jsonVersion) => (
                  <div key={jsonVersion}>   
                    <button
                      className={styles.dropdownItem}
                      onClick={() => (handleOpenWarning(jsonVersion))}>
                      {jsonVersion}
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
              ¿Estas seguro que quieres cambiar de version? Se perdera la informacion de los campos
              que no conincidan en ambas versiones
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
