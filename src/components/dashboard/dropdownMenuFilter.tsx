import { useState, useEffect, SetStateAction, useRef } from 'react';
import styles from '../../styles/components/dashboard/dropdownMenuFilter.module.css';
import axios, { AxiosError } from "axios";
import { useTranslation } from "react-i18next";
import { DetectClickOutsideComponent } from '../varied/detectClickOutsideComponent';
import { mongoBrand, mongoList } from '../../utils/ip';
import { FilterSVLsInterface } from '../../utils/interfaces';

type DropdownMenuFilterProps = {
  appliedFiltersSVL: FilterSVLsInterface;
  setAppliedFiltersSVL: React.Dispatch<FilterSVLsInterface>;
  type: string;
};

const DropdownMenuFilter = ({ appliedFiltersSVL, setAppliedFiltersSVL, type }: DropdownMenuFilterProps) => {
  
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [noMatchShown, setNoMatchShown] = useState(false);
  const [list, setList] = useState<string[]>([]);
  const cancelButtonText = t('DataSVL.Placeholders.cancel');
  const searchBarPlaceholder = t('DataSVL.Placeholders.search');
  const [prevBrand, setPrevBrand] = useState('');

  useEffect(() => {
    const getList = async () => {
      try {
        if (prevBrand != '' && prevBrand != appliedFiltersSVL.brand) {
          //va el error es solo de typescript y no se como quitarlo
          setAppliedFiltersSVL((prevAppliedFiltersSVL: FilterSVLsInterface) => ({
            ...prevAppliedFiltersSVL,
            model: 'Dashboard.Placeholders.model',
          }));
        }
        else setPrevBrand(appliedFiltersSVL.brand);
        if (type == 'model') {
          if (appliedFiltersSVL.brand != 'Dashboard.Placeholders.brand') {
            const responseMongo = await axios.get(`${mongoBrand}${appliedFiltersSVL.brand}`);
            setList(responseMongo.data);
          }
        }
        else {
          let typeQuery = type;
          if (type == 'defectChoosenLevel') typeQuery = 'defectLevel';
          const responseMongo = await axios.get(`${mongoList}${typeQuery}`);
          setList(responseMongo.data);
        }
      } catch (error: any | AxiosError) {
        console.error("Unexpected error:", error);
      }
    }
    getList();
  }, [appliedFiltersSVL.brand]);
  
  useEffect(() => {
    if (list.length > 0) {
      if (list.some(value => t(value).toLowerCase().includes(searchQuery.toLowerCase()))) setNoMatchShown(true);
      else setNoMatchShown(false);
    }
  }, [list, searchQuery]);

  const updateValue = (value: string) => {
    //va el error es solo de typescript y no se como quitarlo
    setAppliedFiltersSVL((prevAppliedFiltersSVL: FilterSVLsInterface) => ({
      ...prevAppliedFiltersSVL,
      [type]: value,
    }));
    setIsOpen(false);
  }

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

  const refScrollIntoView = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && refScrollIntoView.current) {
      refScrollIntoView.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [isOpen]);

  return (
    <div ref={refClickOutside} className={styles.dropdownMenuContainer}>
      <div className={styles.dropDownPosition}>
        <div className={styles.selectedAndOptionalContainer}>
          <button
            className={styles.selected}
            onClick={hadleOpenDropdownMenu}>
            <span>{t(appliedFiltersSVL[type])}</span>
            <span>{(isOpen) ? '←' : '→'}</span>
          </button>
        </div>
        {isOpen && (
          <div ref={refScrollIntoView} className={styles.dropdownMenu}>
            <input
              className={styles.searchInput}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(t(e.target.value))}
              placeholder={searchBarPlaceholder}
            />
            <div className={styles.dropdownList}>
              {list.length ? list.filter(value => t(value).toLowerCase().includes(searchQuery.toLowerCase())).map((value) => (
                <div key={value} className={styles.dropdownItemContainer}>   
                  <button
                    className={styles.dropdownItem}
                    onClick={() => updateValue(value)}>
                    {t(value)} 
                  </button>
                  <button
                    className={styles.dropdownItemSelected}>
                    X
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

export default DropdownMenuFilter;