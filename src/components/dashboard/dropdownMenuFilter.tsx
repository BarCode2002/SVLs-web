import { useState, useEffect, useRef } from 'react';
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
          if (type == 'defects') typeQuery = 'defectLevel';
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

  const updateValue = (checked: boolean, value: string, index: number) => {
    if (type == 'state' || type == 'shift' || type == 'fuel' || type == 'climate' || type == 'usage' || type == 'storage') {
      if (checked) {
        //va el error es solo de typescript y no se como quitarlo
        setAppliedFiltersSVL((prevAppliedFiltersSVL: FilterSVLsInterface) => ({
          ...prevAppliedFiltersSVL,
          [type]: prevAppliedFiltersSVL[type].map((item, i) => (index == i ? value : item)),
        }));
      }
      else {
        //va el error es solo de typescript y no se como quitarlo
        setAppliedFiltersSVL((prevAppliedFiltersSVL: FilterSVLsInterface) => ({
          ...prevAppliedFiltersSVL,
          [type]: prevAppliedFiltersSVL[type].map((item, i) => (index == i ? '' : item)),
        }));
      }
    }
    else {
      //va el error es solo de typescript y no se como quitarlo
      setAppliedFiltersSVL((prevAppliedFiltersSVL: FilterSVLsInterface) => ({
        ...prevAppliedFiltersSVL,
        [type]: value,
      }));
      setIsOpen(false);
    }

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
            {type == 'state' &&
              <span>{t('Dashboard.Placeholders.state')}</span>
            }
            {type == 'shift' &&
              <span>{t('Dashboard.Placeholders.shift')}</span>
            }
            {type == 'fuel' &&
              <span>{t('Dashboard.Placeholders.fuel')}</span>
            }
            {type == 'climate' &&
              <span>{t('Dashboard.Placeholders.climate')}</span>
            }
            {type == 'usage' &&
              <span>{t('Dashboard.Placeholders.usage')}</span>
            }
            {type == 'storage' &&
              <span>{t('Dashboard.Placeholders.storage')}</span>
            }
            {type == 'defects' &&
              <span>{t('Dashboard.Placeholders.defectChoosenLevel')}</span>
            }
            {(type != 'state' && type != 'shift' && type != 'fuel' && type != 'climate' && type != 'usage' && type != 'storage' && type != 'defects') &&
              <span>{t(appliedFiltersSVL[type])}</span>
            }
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
            {type != 'defects' ? (
              <div className={styles.dropdownList}>
                {list.length ? list.filter(value => t(value).toLowerCase().includes(searchQuery.toLowerCase())).map((value, index) => (
                  <div key={index}>   
                    {(type == 'state' || type == 'shift' || type == 'fuel' || type == 'climate' || type == 'usage' || type == 'storage') &&
                      <div className={styles.dropdownItemContainer}>
                        <button
                          className={styles.dropdownItem}
                          onClick={() => updateValue(appliedFiltersSVL[type][index] != value, value, index)}>
                          {t(value)} 
                        </button>
                        <input
                          className={styles.dropdownItemCheckBox}
                          type="checkbox"
                          id="checkbox"
                          checked={appliedFiltersSVL[type][index] == value}
                          onChange={(e) => updateValue(e.target.checked, value, index)}
                        />
                      </div>
                    } 
                    {(type != 'state' && type != 'shift' && type != 'fuel' && type != 'climate' && type != 'usage' && type != 'storage') &&
                      <button
                        className={styles.dropdownItem}
                        onClick={() => updateValue(false, value, index)}>
                        {t(value)} 
                      </button>
                    } 
                  </div>
                )) : null}
                {!noMatchShown ? (
                  <span className={styles.noMatch}>{t('DataSVL.Placeholders.noMatch')}</span>
                ) : null}
              </div>
            ) : (
              <div className={styles.dropdownList}>
                {list.length ? list.filter(value => t(value).toLowerCase().includes(searchQuery.toLowerCase())).map((value, index) => (
                  <div key={index}>   
                    <div className={styles.dropdownItemContainer}>
                      <button
                        className={styles.dropdownItem}
                        onClick={() => updateValue(appliedFiltersSVL[type][index] != value, value, index)}>
                        {t(value)} 
                      </button>
                      <input
                        className={styles.inputFieldLeft} 
                        type="text"
                        value={appliedFiltersSVL.numRepairs[0]}
                        onChange={(e) => updateFilter(e.target.value, 'numRepairs', 0)}
                        placeholder={t('Dashboard.Placeholders.since')}
                      />
                      <div className={styles.horizontalSeparator}></div>
                      <input
                        className={styles.inputFieldRight}
                        type="text"
                        value={appliedFiltersSVL.numRepairs[1]}
                        onChange={(e) => updateFilter(e.target.value, 'numRepairs', 1)}
                        placeholder={t('Dashboard.Placeholders.until')}
                      />
                      <input
                        className={styles.dropdownItemCheckBox}
                        type="checkbox"
                        id="checkbox"
                        checked={appliedFiltersSVL[type][index] == value}
                        onChange={(e) => updateValue(e.target.checked, value, index)}
                      />
                    </div>
                  </div>
                )) : null}
                {!noMatchShown ? (
                  <span className={styles.noMatch}>{t('DataSVL.Placeholders.noMatch')}</span>
                ) : null}
              </div>
            )}
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