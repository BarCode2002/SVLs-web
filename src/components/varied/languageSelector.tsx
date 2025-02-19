import { useState, useEffect } from 'react';
import styles from '../../styles/components/varied/languageSelector.module.css';
import { useTranslation } from 'react-i18next';
import axios, { AxiosError } from "axios";
import { DetectClickOutsideComponent } from './detectClickOutsideComponent';

const LanguageSelector = (): JSX.Element => {

  const { t, i18n } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [noMatchShown, setNoMatchShown] = useState(false);
  const [list, setList] = useState<string[]>([]);
  const cancelButtonText = t('DataSVL.Placeholders.cancel');
  const searchBarPlaceholder = t('DataSVL.Placeholders.search');

  useEffect(() => {
    const getLanguageList = async () => {
      try {
        const responseMongo = await axios.get(`http://127.0.0.1:3000/mongo/lists?type=language`);
        setList(responseMongo.data);
      } catch (error: any | AxiosError) {
        console.error("Unexpected error:", error);
      }
    }
    getLanguageList();
  }, []);

  useEffect(() => {
    if (list.length > 0) {
      if (list.some(language => t(language).toLowerCase().includes(searchQuery.toLowerCase()))) setNoMatchShown(true);
      else setNoMatchShown(false);
    }
  }, [list, searchQuery]);

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
          className={styles.selected}
          onClick={hadleOpenDropdownMenu}>
          <span>{t(localStorage.getItem('language')!)}</span>
          <span>{(isOpen) ? '<' : '>'}</span>
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
              {!noMatchShown ? (
                <span className={styles.noMatch}>{t('DataSVL.Placeholders.noMatch')}</span>
              ) : null}
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
