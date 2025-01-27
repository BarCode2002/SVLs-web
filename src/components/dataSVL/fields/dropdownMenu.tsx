import { useState, useEffect, SetStateAction } from 'react';
import styles from '../../../styles/components/dataSVL/fields/dropdownMenu.module.css';

type DropdownMenuProps = {
  fieldLabel: string;
  selectedOwner: number;
  dataSVL: any;
  value: string;
  setDataSVL: React.Dispatch<SetStateAction<any>>;
  formType: string;
  id: number;
};

const DropdownMenu = ({ fieldLabel, selectedOwner, dataSVL, value, setDataSVL, formType, id }: DropdownMenuProps) => {
  
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [noMatchShown, setNoMatchShown] = useState(false);
  const list = ['hola', 'adios', 'faf', 'fewf', 'reyt', 'fewfew', 'afeff0', 'fewfewafewfefwf', 'aaa'];
  const cancelButtonText = 'Cancel';
  const searchBarPlaceholder = 'Search...';
  
  useEffect(() => {
    if (list.some(value => value.toLowerCase().includes(searchQuery.toLowerCase()))) setNoMatchShown(true);
    else setNoMatchShown(false);
  }, [list, searchQuery]);

  const updateValue = (value: string) => {
    const updateSVLdata = [...dataSVL];
    if (id != -1) updateSVLdata[selectedOwner][formType][id] = value;
    else updateSVLdata[selectedOwner][formType] = value;
    setDataSVL(updateSVLdata);
    setIsOpen(false);
  }

  const hadleOpenDropdownMenu = () => {
    if (isOpen) setIsOpen(false);
    else setIsOpen(true);
  }

  return (
    <div className={styles.dropdownMenuContainer}>
      <div className={styles.fieldLabel}>
        {fieldLabel}
      </div>
      <div className={styles.dropDownPosition}>
        <button
          className={styles.selected}
          onClick={hadleOpenDropdownMenu}>
          <span>{value}</span>
          <span>{(isOpen) ? '<' : '>'}</span>
        </button>
        {isOpen && (
          <div className={styles.dropdownMenu}>
            <input
              className={styles.searchInput}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={searchBarPlaceholder}
            />
            <hr className={styles.separator} />
            <div className={styles.dropdownList}>
              {list.length ? list.map((value) => (
                <div key={value}>
                  {value.toLowerCase().includes(searchQuery.toLowerCase()) ? (
                    <button
                      className={styles.dropdownItem}
                      onClick={() => updateValue(value)}>
                      {value}
                    </button>
                  ) : null}
                </div>
              )) : null}
              {!noMatchShown ? (
                <span className={styles.noMatch}>No match</span>
              ) : null}
            </div>
            <hr className={styles.separator} />
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