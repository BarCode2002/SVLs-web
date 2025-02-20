import { useState, useEffect, SetStateAction, useRef } from 'react';
import styles from '../../../styles/components/dataSVL/fields/dropdownMenu.module.css';
import { DetectClickOutsideComponent } from '../../varied/detectClickOutsideComponent';
import axios, { AxiosError } from "axios";
import { useTranslation } from "react-i18next";

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
};

const DropdownMenu = ({ fieldLabel, selectedOwner, selectedGroup, selectedGroupType, dataSVL, value, setDataSVL, type, editMode }: DropdownMenuProps) => {
  
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [noMatchShown, setNoMatchShown] = useState(false);
  const [list, setList] = useState<string[]>([]);
  const cancelButtonText = t('DataSVL.Placeholders.cancel');
  const searchBarPlaceholder = t('DataSVL.Placeholders.search');

  useEffect(() => {
    const getList = async () => {
      try {
        const updatedDataSVL = [...dataSVL];
        updatedDataSVL[selectedOwner].model = 'DataSVL.Forms.model';
        setDataSVL(updatedDataSVL);
        if (type == 'model') {
          if (dataSVL[selectedOwner].brand != 'DataSVL.Forms.brand') {
            const responseMongo = await axios.get(`http://127.0.0.1:3000/mongo/models?brand=${dataSVL[selectedOwner].brand}`);
            setList(responseMongo.data);
          }
        }
        else {
          let typeQuery = type;
          if (type == 'level') typeQuery = 'defectLevel';
          const responseMongo = await axios.get(`http://127.0.0.1:3000/mongo/lists?type=${typeQuery}`);
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
        <button
          className={styles.selected}
          onClick={hadleOpenDropdownMenu}
          disabled={!editMode}>
          <span>{t(value)}</span>
          <span>{(isOpen) ? '←' : '→'}</span>
        </button>
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