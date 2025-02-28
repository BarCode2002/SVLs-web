import { useState, useEffect, SetStateAction, useRef } from 'react';
import styles from '../../../styles/components/dataSVL/fields/dropdownMenu.module.css';
import { DetectClickOutsideComponent } from '../../varied/detectClickOutsideComponent';
import axios, { AxiosError } from "axios";
import { useTranslation } from "react-i18next";
import { mongoBrand, mongoList } from '../../../utils/ip';

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
  numPreviousOwners?: number;
  totalOwners?: number;
};

const DropdownMenu = ({ fieldLabel, selectedOwner, selectedGroup, selectedGroupType, dataSVL, value, setDataSVL, type, editMode, numPreviousOwners, totalOwners }: DropdownMenuProps) => {
  
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [noMatchShown, setNoMatchShown] = useState(false);
  const [list, setList] = useState<string[]>([]);
  const cancelButtonText = t('DataSVL.Placeholders.cancel');
  const searchBarPlaceholder = t('DataSVL.Placeholders.search');
  const [prevBrand, setPrevBrand] = useState('');

  //tendre que actualizarlo para cuando haya previous owners. 
  if (selectedGroup == -1 && selectedGroupType == -1 && numPreviousOwners == 0 && (type == 'brand' || type == 'model')) {
    useEffect(() => {
      const updateSVLdata = [...dataSVL];
      for (let i = 1; i < totalOwners!; i++) {
        updateSVLdata[i][type] = updateSVLdata[0][type];
      }
      setDataSVL(updateSVLdata);
    }, [dataSVL[0].brand, dataSVL[0].model]);
  }

  useEffect(() => {
    const getList = async () => {
      try {
        if (prevBrand != '' && prevBrand != dataSVL[selectedOwner].brand) {
          const updatedDataSVL = [...dataSVL];
          updatedDataSVL[selectedOwner].model = 'DataSVL.Forms.model';
          setDataSVL(updatedDataSVL);
        }
        else setPrevBrand(dataSVL[selectedOwner].brand);
        if (type == 'model') {
          if (dataSVL[selectedOwner].brand != 'DataSVL.Forms.brand') {
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
  
  useEffect(() => {
    if (list.length > 0) {
      if (list.some(value => t(value).toLowerCase().includes(searchQuery.toLowerCase()))) setNoMatchShown(true);
      else setNoMatchShown(false);
    }
  }, [list, searchQuery]);

  const updateValue = (value: string) => {
    const updateSVLdata = [...dataSVL];
    if (selectedGroup == -1 && selectedGroupType == -1) {
      updateSVLdata[selectedOwner][type] = value;
    }
    else {
      updateSVLdata[selectedOwner].group[selectedGroup].type[selectedGroupType][type] = value;
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
          <button
            className={styles.selected}
            onClick={hadleOpenDropdownMenu}
            disabled={!editMode || ((type == 'brand' || type == 'model') && selectedOwner > 0)}>
            <span>{t(value)}</span>
            <span>{(isOpen) ? '←' : '→'}</span>
          </button>
          {numPreviousOwners == 0 && selectedOwner == 0 && (type == 'brand' || type == 'model') &&
            <div>Solo puede introducirlo el primer propietario, asegurate que este bien</div> 
          }
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
                <div key={value}>   
                  <button
                    className={styles.dropdownItem}
                    onClick={() => updateValue(value)}>
                    {t(value)}
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

export default DropdownMenu;