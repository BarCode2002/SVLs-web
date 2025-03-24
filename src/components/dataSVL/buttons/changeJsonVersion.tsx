import { SetStateAction, useState } from 'react';
import styles from '../../../styles/components/dataSVL/buttons/changeJsonVersion.module.css';
import { DetectClickOutsideComponent } from '../../varied/detectClickOutsideComponent';
import { TopArrow, BottomArrowBlack, BottomArrowWhite } from '../../../assets/directionArrows';
import { t } from 'i18next';

type ChangeJsonVersionProps = {
  jsonVersion: string;
  setJsonVersion: React.Dispatch<SetStateAction<string>>;
};

const ChangeJsonVersion = ({ jsonVersion, setJsonVersion }: ChangeJsonVersionProps): JSX.Element => {
 
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const list = ['base', 'baseSimple'];
  const cancelButtonText = t('DataSVL.Placeholders.cancel');
  const searchBarPlaceholder = t('DataSVL.Placeholders.search');
  const [isHovered, setIsHovered] = useState(false);

  const hadleOpenDropdownMenu = () => {
    if (isOpen) setIsOpen(false);
    else {
      setSearchQuery('');
      setIsOpen(true);
    }
  }

  const handleChangeJsonVersion = (jsonVersion: string)=> {
    setJsonVersion(jsonVersion);
    localStorage.setItem('jsonVersion', jsonVersion);
    setIsOpen(false);
  }
  
  const refClickOutside = DetectClickOutsideComponent(() => { 
    if (isOpen) setIsOpen(false); 
  });

  return (
    <div ref={refClickOutside} className={styles.dropdownMenuContainer}>
      <div className={styles.dropDownPosition}>
        <button
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={isOpen ? styles.selectedOpen : styles.selected}
          onClick={hadleOpenDropdownMenu}>
          <span>{jsonVersion}</span>
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
                    onClick={() => (handleChangeJsonVersion(jsonVersion))}>
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
  );
};

export default ChangeJsonVersion;
