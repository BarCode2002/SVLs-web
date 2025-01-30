import { useState, useEffect, SetStateAction, useRef } from 'react';
import styles from '../../../styles/components/dataSVL/fields/dropdownMenu.module.css';
import { DetectClickOutsideComponent } from '../../varied/detectClickOutsideComponent';

type DropdownMenuProps = {
  fieldLabel: string;
  selectedOwner: number;
  dataSVL: any;
  value: string;
  setDataSVL: React.Dispatch<SetStateAction<any>>;
  type: string;
};

const DropdownMenu = ({ fieldLabel, selectedOwner, dataSVL, value, setDataSVL, type }: DropdownMenuProps) => {
  
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
    updateSVLdata[selectedOwner][type] = value;
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
          <div ref={refScrollIntoView} className={styles.dropdownMenu}>
            <input
              className={styles.searchInput}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={searchBarPlaceholder}
            />
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