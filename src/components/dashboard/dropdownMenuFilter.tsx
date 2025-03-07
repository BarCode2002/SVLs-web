import { useState, useEffect, useRef } from 'react';
import styles from '../../styles/components/dashboard/dropdownMenuFilter.module.css';
import axios, { AxiosError } from "axios";
import { useTranslation } from "react-i18next";
import { DetectClickOutsideComponent } from '../varied/detectClickOutsideComponent';
import { mongoBrand, mongoList } from '../../utils/ip';
import { FilterSVLsInterface } from '../../utils/interfaces';
import { createPortal } from "react-dom";

type DropdownMenuFilterProps = {
  appliedFiltersSVL: FilterSVLsInterface;
  setAppliedFiltersSVL: React.Dispatch<FilterSVLsInterface>;
  type: string;
  defectList: string[];
};

const DropdownMenuFilter = ({ appliedFiltersSVL, setAppliedFiltersSVL, type, defectList }: DropdownMenuFilterProps) => {
  
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [noMatchShown, setNoMatchShown] = useState(false);
  const [list, setList] = useState<string[]>([]);
  const [prevBrand, setPrevBrand] = useState('');
  const [position, setPosition] = useState(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

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

  useEffect(() => {
    localStorage.setItem('appliedFiltersSVL', JSON.stringify(appliedFiltersSVL));
  }, [appliedFiltersSVL]);

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

  const updateValueDefects = (checked: boolean, value: string, defectIndex: number, typeDefectIndex: number) => {
    //va el error es solo de typescript y no se como quitarlo
    if (typeDefectIndex == 0) {
      setAppliedFiltersSVL((prevAppliedFiltersSVL: FilterSVLsInterface) => ({
        ...prevAppliedFiltersSVL,
        defects: {
          ...prevAppliedFiltersSVL.defects,
          [defectList[defectIndex]]: prevAppliedFiltersSVL.defects[defectList[defectIndex]].map((item, i) => (i === typeDefectIndex ? checked : item))
        }
      }));
      localStorage.setItem('appliedFiltersSVL', JSON.stringify(appliedFiltersSVL));
    }
    else {
      let re: RegExp;
      re = /^(0|[1-9]\d*)$/;
      if (value == '' || re.test(value)) {
        //va el error es solo de typescript y no se como quitarlo
        setAppliedFiltersSVL((prevAppliedFiltersSVL: FilterSVLsInterface) => ({
          ...prevAppliedFiltersSVL,
          defects: {
            ...prevAppliedFiltersSVL.defects,
            [defectList[defectIndex]]: prevAppliedFiltersSVL.defects[defectList[defectIndex]].map((item, i) => (i === typeDefectIndex ? value : item))
          }
        }));
       
      }
    }
  }

  const hadleOpenDropdownMenu = (action: boolean) => {
    if (!isOpen) setIsOpen(true);
    else setIsOpen(false);
    //if (!isOpen) setIsOpen(true);
    //else setIsOpen(false);
  }

  const refScrollIntoView = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && refScrollIntoView.current) {
      refScrollIntoView.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY,
        left: rect.right + window.scrollX,
      });
    }
  }, [isOpen]);

  const defaultValue = () => {
    //va el error es solo de typescript y no se como quitarlo
    if (type == 'brand') {
      setAppliedFiltersSVL((prevAppliedFiltersSVL: FilterSVLsInterface) => ({
        ...prevAppliedFiltersSVL,
        [type]: 'Dashboard.Placeholders.brand',
      }));
    }
    else if (type == 'model') {
      setAppliedFiltersSVL((prevAppliedFiltersSVL: FilterSVLsInterface) => ({
        ...prevAppliedFiltersSVL,
        [type]: 'Dashboard.Placeholders.model',
      }));
    }
    else if (type == 'state') {
      setAppliedFiltersSVL((prevAppliedFiltersSVL: FilterSVLsInterface) => ({
        ...prevAppliedFiltersSVL,
        [type]: ['Dashboard.Placeholders.state', '', '', '', '', '', ''],
      }))
    }
    else if (type == 'shift') {
      setAppliedFiltersSVL((prevAppliedFiltersSVL: FilterSVLsInterface) => ({
        ...prevAppliedFiltersSVL,
        [type]: ['Dashboard.Placeholders.shift', ''],
      }));
    }
    else if (type == 'fuel') {
      setAppliedFiltersSVL((prevAppliedFiltersSVL: FilterSVLsInterface) => ({
        ...prevAppliedFiltersSVL,
        [type]: ['Dashboard.Placeholders.fuel', '', '', '', '', '', ''],
      }));
    }
    else if (type == 'climate') {
      setAppliedFiltersSVL((prevAppliedFiltersSVL: FilterSVLsInterface) => ({
        ...prevAppliedFiltersSVL,
        [type]: ['Dashboard.Placeholders.climate', '', '', '', '', '', ''],
      }));
    }
    else if (type == 'usage') {
      setAppliedFiltersSVL((prevAppliedFiltersSVL: FilterSVLsInterface) => ({
        ...prevAppliedFiltersSVL,
        [type]: ['Dashboard.Placeholders.usage', '', '', ''],
      }));
    }
    else {
      setAppliedFiltersSVL((prevAppliedFiltersSVL: FilterSVLsInterface) => ({
        ...prevAppliedFiltersSVL,
        [type]: ['Dashboard.Placeholders.storage', '', '', '', '', '', ''],
      }));
    }
  }

  const ref = DetectClickOutsideComponent(() => { 
    setIsOpen(false);
  });

  return (
    <div className={styles.dropdownMenuContainer}>
      <div className={styles.dropDownPosition}>
        <div className={styles.selectedAndOptionalContainer}>
          <button
            ref={buttonRef}
            className={styles.selected}
            onClick={() => hadleOpenDropdownMenu(isOpen)}>
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
        {isOpen && position && createPortal (
          <div ref={ref} style={{ top: position.top, left: position.left }} className={styles.dropdownMenu}>
            {(type == 'brand' || type == 'model') &&
              <input
                className={styles.searchInput}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(t(e.target.value))}
                placeholder={t('DataSVL.Placeholders.search')}
              />
            }
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
              <div className={styles.dropdownListDefects}>
                {list.length ? list.filter(value => t(value).toLowerCase().includes(searchQuery.toLowerCase())).map((value, index) => (
                  <div key={index}>   
                    <div className={styles.dropdownItemContainerDefects}>
                      <button
                        className={styles.dropdownItem}
                        onClick={() => updateValueDefects(!appliedFiltersSVL[type][defectList[index]][0], value, index, 0)}>
                        {t(value)} 
                      </button>
                      <div className={styles.inputFieldsContainer}>
                        <input
                          className={styles.inputFieldLeft} 
                          type="text"
                          value={appliedFiltersSVL[type][defectList[index]][1]}
                          onChange={(e) => updateValueDefects(true, e.target.value, index, 1)}
                          placeholder={t('Dashboard.Placeholders.since')}
                        />
                        <div className={styles.horizontalSeparator}></div>
                        <input
                          className={styles.inputFieldRight}
                          type="text"
                          value={appliedFiltersSVL[type][defectList[index]][2]}
                          onChange={(e) => updateValueDefects(true, e.target.value, index, 2)}
                          placeholder={t('Dashboard.Placeholders.until')}
                        />                        
                        <input
                          type="checkbox"
                          id="checkbox"
                          checked={appliedFiltersSVL[type][defectList[index]][0]}
                          onChange={(e) => updateValueDefects(e.target.checked, '', index, 0)}
                        />
                      </div>
                    </div>
                  </div>
                )) : null}
                {!noMatchShown ? (
                  <span className={styles.noMatch}>{t('DataSVL.Placeholders.noMatch')}</span>
                ) : null}
              </div>
            )}
            <div className={styles.confirmCancelContainer}>
              {/*<button 
                className={styles.cancelConfirmButton} 
                onClick={() => setIsOpen(false)}>
                {t('DataSVL.Placeholders.confirm')}
              </button>*/}
              <button 
                className={styles.cancelConfirmButton} 
                onClick={defaultValue}>
                {t('DataSVL.Placeholders.reset')}
              </button>
              <button 
                className={styles.cancelConfirmButton} 
                onClick={() => setIsOpen(false)}>
                {t('DataSVL.Placeholders.close')}
              </button>
            </div>
          </div>,
          document.body
        )}
      </div>
    </div>
  );
};

export default DropdownMenuFilter;