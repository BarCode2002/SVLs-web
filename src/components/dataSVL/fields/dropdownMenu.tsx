import { useState, useEffect, SetStateAction, useRef } from 'react';
import styles from '../../../styles/components/dataSVL/fields/dropdownMenu.module.css';
import { DetectClickOutsideComponent } from '../../varied/detectClickOutsideComponent';
import axios, { AxiosError } from "axios";
import { useTranslation } from "react-i18next";
import { mongoBrand, mongoList } from '../../../utils/ip';
import { RightArrow } from '../../../assets/directionArrows';
import { LeftArrow } from '../../../assets/directionArrows';

type DropdownMenuProps = {
  fieldLabel: string;
  selectedOwner: number;
  selectedGroup: number;
  selectedGroupType: number;
  dataSVL: any;
  value: string;
  setDataSVL: React.Dispatch<SetStateAction<any>>;
  type: string;
  editMode: boolean;
  placeholder: string;
};

const DropdownMenu = ({ fieldLabel, selectedOwner, selectedGroup, selectedGroupType, dataSVL, value, setDataSVL, type, editMode, placeholder }: DropdownMenuProps) => {
  
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [list, setList] = useState<string[]>([]);
  const [prevBrand, setPrevBrand] = useState('');

  useEffect(() => {
    const getList = async () => {
      try {
        if (dataSVL[selectedOwner].brand == '') setList([]);
        if (prevBrand != '' && prevBrand != '' && prevBrand != dataSVL[selectedOwner].brand) {
          const updatedDataSVL = [...dataSVL];
          updatedDataSVL[selectedOwner].model = '';
          setDataSVL(updatedDataSVL);
          setPrevBrand(dataSVL[selectedOwner].brand);
        }
        else setPrevBrand(dataSVL[selectedOwner].brand);
        if (type == 'model') {
          if (dataSVL[selectedOwner].brand != '') {
            const responseMongo = await axios.get(`${mongoBrand}${dataSVL[selectedOwner].brand}`);
            setList(responseMongo.data);
          }
        }
        else {
          let typeQuery = type;
          if (type == 'level') typeQuery = 'defectLevel';
          const responseMongo = await axios.get(`${mongoList}${typeQuery}`);
          setList(responseMongo.data);
        }
      } catch (error: any | AxiosError) {
        console.error("Unexpected error:", error);
      }
    }
    getList();
  }, [dataSVL[selectedOwner].brand]);


  const updateValue = (value: string) => {
    const updateSVLdata = [...dataSVL];
    if (selectedGroup == -1 && selectedGroupType == -1) {
      updateSVLdata[selectedOwner][type] = value;
    }
    else {
      updateSVLdata[selectedOwner].group[selectedGroup].element[selectedGroupType][type] = value;
    }
    setDataSVL(updateSVLdata);
    setIsOpen(false);
  }

  const defaultValue = () => {
    const updateSVLdata = [...dataSVL];
    if (selectedGroup == -1 && selectedGroupType == -1) {
      updateSVLdata[selectedOwner][type] = '';
    }
    else {
      updateSVLdata[selectedOwner].group[selectedGroup].element[selectedGroupType][type] = '';
    }
    setDataSVL(updateSVLdata);
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
      {fieldLabel != '' &&
        <div className={styles.fieldLabel}>
          {fieldLabel}
        </div>
      }
      <div className={styles.dropDownPosition}>
        <div className={styles.selectedAndOptionalContainer}>
          {type == 'model' &&
            <button
              className={styles.selected}
              onClick={hadleOpenDropdownMenu}
              disabled={!editMode || dataSVL[selectedOwner].brand == ''}>
              <span>{value == '' ? t(placeholder) : t(value)}</span>
              <span>{(isOpen) ? <LeftArrow /> : <RightArrow />}</span>
            </button>
          }
          {type != 'model' &&
            <button
              className={styles.selected}
              onClick={hadleOpenDropdownMenu}
              disabled={!editMode}>
              <span>{value == '' ? t(placeholder) : t(value)}</span>
              <span>{(isOpen) ? <LeftArrow /> : <RightArrow />}</span>
            </button>
          }
        </div>
        {isOpen && (
          <div ref={refScrollIntoView} className={styles.dropdownMenu}>
            <input
              className={styles.searchInput}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(t(e.target.value))}
              placeholder={t('DataSVL.Placeholders.search')}
            />
            <div className={styles.dropdownList}>
              {list.length ? list.filter(value => t(value).toLowerCase().includes(searchQuery.toLowerCase())).map((value) => (
                <div key={value}>   
                  <button
                    className={styles.dropdownItem}
                    onClick={() => updateValue(value)}>
                    {t(value)}
                  </button>
                </div>
              )) : null}
            </div>
            <div className={styles.bottomContainer}>
              <button 
                className={styles.bottomButtons} 
                onClick={defaultValue}>
                {t('DataSVL.Placeholders.reset')}
              </button>
              <button 
                className={styles.bottomButtons} 
                onClick={() => setIsOpen(false)}>
                {t('DataSVL.Placeholders.cancel')}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DropdownMenu;