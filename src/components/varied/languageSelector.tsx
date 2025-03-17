import { useState, useEffect } from 'react';
import styles from '../../styles/components/varied/languageSelector.module.css';
import { useTranslation } from 'react-i18next';
import axios, { AxiosError } from "axios";
import { DetectClickOutsideComponent } from './detectClickOutsideComponent';
import { mongoList } from '../../utils/ip';
import { BottomArrowWhite, BottomArrowBlack, TopArrow } from '../../assets/directionArrows';

const LanguageSelector = (): JSX.Element => {

  const { t, i18n } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [list, setList] = useState<string[]>([]);
  const cancelButtonText = t('DataSVL.Placeholders.cancel');
  const searchBarPlaceholder = t('DataSVL.Placeholders.search');
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const getLanguageList = async () => {
      try {
        const responseMongo = await axios.get(`${mongoList}language`);
        setList(responseMongo.data);
      } catch (error: any | AxiosError) {
        console.error("Unexpected error:", error);
      }
    }
    getLanguageList();
  }, []);

  const handleLanguageChange = (newLanguage: string) => {
    i18n.changeLanguage(newLanguage.split(".").pop());
    localStorage.setItem('language', newLanguage);
    setIsOpen(false);
  };

  const hadleOpenDropdownMenu = () => {
      if (isOpen) setIsOpen(false);
      else {
        setSearchQuery('');
        setIsOpen(true);
      }
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
          <span>{t(localStorage.getItem('language') || 'Lists.Language.es')}</span>
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
              {list.length ? list.filter(language => t(language).toLowerCase().includes(searchQuery.toLowerCase())).map((language) => (
                <div key={language}>   
                  <button
                    className={styles.dropdownItem}
                    onClick={() => handleLanguageChange(language)}>
                    {t(language)}
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

export default LanguageSelector;
