import { useState, useEffect, useRef } from 'react';
import styles from '../../styles/components/dashboard/dropdownMenuFilter.module.css';
import axios, { AxiosError } from "axios";
import { useTranslation } from "react-i18next";
import { DetectClickOutsideComponent } from '../varied/detectClickOutsideComponent';
import { mongoBrand, mongoList } from '../../utils/ip';
import { FilterSVLsType } from '../../utils/commonTypes';
import { createPortal } from "react-dom";
import { LeftArrow, RightArrow } from '../../assets/directionArrows';

type DropdownMenuFilterProps = {
  appliedFiltersSVL: FilterSVLsType;
  setAppliedFiltersSVL: React.Dispatch<React.SetStateAction<FilterSVLsType>>
  type: string;
  defectList: string[];
};


const DropdownMenuFilter = ({ appliedFiltersSVL, setAppliedFiltersSVL, type, defectList }: DropdownMenuFilterProps) => {
  
  const { t } = useTranslation();

  type DefectKeys = keyof typeof appliedFiltersSVL.defects;
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [list, setList] = useState<string[]>([]);
  const [prevBrand, setPrevBrand] = useState('');
  const [position, setPosition] = useState<{ top: number; left: number } | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const getList = async () => {
      try {
        if (prevBrand != '' && prevBrand != appliedFiltersSVL.brand) {
          setAppliedFiltersSVL((prevAppliedFiltersSVL: FilterSVLsType) => ({
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
    localStorage.setItem('appliedFiltersSVL', JSON.stringify(appliedFiltersSVL));
  }, [appliedFiltersSVL]);

  const updateValue = (checked: boolean, value: string, index: number) => {
    if (type == 'state' || type == 'shift' || type == 'fuel' || type == 'climate' || type == 'usage' || type == 'storage') {
      if (checked) {
        setAppliedFiltersSVL((prevAppliedFiltersSVL: FilterSVLsType): FilterSVLsType => ({ 
          ...prevAppliedFiltersSVL, 
          [type]: prevAppliedFiltersSVL[type].map((item, i) => (index === i ? value : item)) 
        }));
      }
      else {
        setAppliedFiltersSVL((prevAppliedFiltersSVL: FilterSVLsType) => ({
          ...prevAppliedFiltersSVL,
          [type]: prevAppliedFiltersSVL[type].map((item, i) => (index == i ? '' : item)),
        }));
      }
    }
    else {
      setAppliedFiltersSVL((prevAppliedFiltersSVL: FilterSVLsType) => ({
        ...prevAppliedFiltersSVL,
        [type]: value,
      }));
      setIsOpen(false);
    }
  }

  const updateValueDefects = (checked: boolean, value: string, defectIndex: number, typeDefectIndex: number) => {
    if (typeDefectIndex == 0) {
      setAppliedFiltersSVL((prevAppliedFiltersSVL: FilterSVLsType) => ({
        ...prevAppliedFiltersSVL,
        defects: {
          ...prevAppliedFiltersSVL.defects,
          [defectList[defectIndex]]: prevAppliedFiltersSVL.defects[defectList[defectIndex] as DefectKeys].map((item, i) => (i === typeDefectIndex ? checked : item))
        }
      }));
      localStorage.setItem('appliedFiltersSVL', JSON.stringify(appliedFiltersSVL));
    }
    else {
      let re: RegExp;
      re = /^(0|[1-9]\d*)$/;
      if (value == '' || re.test(value)) {
        setAppliedFiltersSVL((prevAppliedFiltersSVL: FilterSVLsType) => ({
          ...prevAppliedFiltersSVL,
          defects: {
            ...prevAppliedFiltersSVL.defects,
            [defectList[defectIndex]]: prevAppliedFiltersSVL.defects[defectList[defectIndex] as DefectKeys].map((item, i) => (i === typeDefectIndex ? value : item))
          }
        }));
        localStorage.setItem('appliedFiltersSVL', JSON.stringify(appliedFiltersSVL));
      }
    }
  }

  const hadleOpenDropdownMenu = () => {
    if (!isOpen) setIsOpen(true);
    else setIsOpen(false);
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
    if (type == 'defects') {
      setAppliedFiltersSVL((prevAppliedFiltersSVL: FilterSVLsType) => ({
        ...prevAppliedFiltersSVL,
        defects: {
          cosmetic: [false, "0", ""],
          minor: [false, "0", ""],
          moderate: [false, "0", ""],
          important: [false, "0", ""],
          critical: [false, "0", ""],
        },
      }));
    }
    else if (type == 'brand') {
      setAppliedFiltersSVL((prevAppliedFiltersSVL: FilterSVLsType) => ({
        ...prevAppliedFiltersSVL,
        [type]: 'Dashboard.Placeholders.brand',
      }));
    }
    else if (type == 'model') {
      setAppliedFiltersSVL((prevAppliedFiltersSVL: FilterSVLsType) => ({
        ...prevAppliedFiltersSVL,
        [type]: 'Dashboard.Placeholders.model',
      }));
    }
    else if (type == 'state') {
      setAppliedFiltersSVL((prevAppliedFiltersSVL: FilterSVLsType) => ({
        ...prevAppliedFiltersSVL,
        [type]: ['Dashboard.Placeholders.state', '', '', '', '', '', ''],
      }))
    }
    else if (type == 'shift') {
      setAppliedFiltersSVL((prevAppliedFiltersSVL: FilterSVLsType) => ({
        ...prevAppliedFiltersSVL,
        [type]: ['Dashboard.Placeholders.shift', ''],
      }));
    }
    else if (type == 'fuel') {
      setAppliedFiltersSVL((prevAppliedFiltersSVL: FilterSVLsType) => ({
        ...prevAppliedFiltersSVL,
        [type]: ['Dashboard.Placeholders.fuel', '', '', '', '', '', ''],
      }));
    }
    else if (type == 'climate') {
      setAppliedFiltersSVL((prevAppliedFiltersSVL: FilterSVLsType) => ({
        ...prevAppliedFiltersSVL,
        [type]: ['Dashboard.Placeholders.climate', '', '', '', '', '', ''],
      }));
    }
    else if (type == 'usage') {
      setAppliedFiltersSVL((prevAppliedFiltersSVL: FilterSVLsType) => ({
        ...prevAppliedFiltersSVL,
        [type]: ['Dashboard.Placeholders.usage', '', '', ''],
      }));
    }
    else {
      setAppliedFiltersSVL((prevAppliedFiltersSVL: FilterSVLsType) => ({
        ...prevAppliedFiltersSVL,
        [type]: ['Dashboard.Placeholders.storage', '', '', '', '', '', ''],
      }));
    }
    localStorage.setItem('appliedFiltersSVL', JSON.stringify(appliedFiltersSVL));
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
            onClick={hadleOpenDropdownMenu}
            disabled={type == 'model' && appliedFiltersSVL.brand == 'Dashboard.Placeholders.brand'}>
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
            {type == 'brand' &&
              <span>{t(appliedFiltersSVL.brand)}</span>
            }
            {type == 'model' &&
              <span>{t(appliedFiltersSVL.model)}</span>
            }
            <span>{(isOpen) ? <LeftArrow /> : <RightArrow />}</span>
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
              </div>
            ) : (
              <div className={styles.dropdownListDefects}>
                {list.length ? list.filter(value => t(value).toLowerCase().includes(searchQuery.toLowerCase())).map((value, index) => (
                  <div key={index}>   
                    <div className={styles.dropdownItemContainerDefects}>
                      <button
                        className={styles.dropdownItem}
                        onClick={() => updateValueDefects(!appliedFiltersSVL.defects[defectList[index] as DefectKeys][0], value, index, 0)}>
                        {t(value)} 
                      </button>
                      <div className={styles.inputFieldsContainer}>
                        <input
                          className={styles.inputFieldLeft} 
                          type="text"
                          value={appliedFiltersSVL.defects[defectList[index] as DefectKeys][1]}
                          onChange={(e) => updateValueDefects(true, e.target.value, index, 1)}
                          placeholder={t('Dashboard.Placeholders.since')}
                        />
                        <div className={styles.horizontalSeparator}></div>
                        <input
                          className={styles.inputFieldRight}
                          type="text"
                          value={appliedFiltersSVL.defects[defectList[index] as DefectKeys][2]}
                          onChange={(e) => updateValueDefects(true, e.target.value, index, 2)}
                          placeholder={t('Dashboard.Placeholders.until')}
                        />                        
                        <input
                          type="checkbox"
                          id="checkbox"
                          checked={appliedFiltersSVL.defects[defectList[index] as DefectKeys][0]}
                          onChange={(e) => updateValueDefects(e.target.checked, '', index, 0)}
                        />
                      </div>
                    </div>
                  </div>
                )) : null}
              </div>
            )}
            <div className={styles.confirmCancelContainer}>
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