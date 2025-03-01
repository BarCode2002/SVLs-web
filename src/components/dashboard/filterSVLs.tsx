import { useTranslation } from 'react-i18next';
import styles from '../../styles/components/dashboard/filterSVLs.module.css';

type FilterSVLsProps = {
  setFilterSVLs: React.Dispatch<number>;
  VIN: string;
  setVIN: React.Dispatch<string>;
  placeholder: string
  search: boolean;
  setSearch: React.Dispatch<boolean>;
};

const FilterSVLs = ({ setFilterSVLs, VIN, setVIN, placeholder, search, setSearch }: FilterSVLsProps): JSX.Element => {

  const { t } = useTranslation();

  const handleBrowseSVLByVIN = (event: { key: string; }) => {
    if (event.key === "Enter") {
      setFilterSVLs(2);
      localStorage.setItem('filterSVLs', '2');
      localStorage.setItem('VIN', VIN);
      if (search == true) setSearch(false);
      else setSearch(true);
    }
  }

  const updateValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVIN(e.target.value);
  }

  const handleSearch = () => {
    
  }

  return (
    <div className={styles.filterInputFieldsContainer}>
      <input
        className={styles.inputField} 
        type="text"
        value={'numMaintenances'}
        onChange={updateValue}
        onKeyDown={handleBrowseSVLByVIN}
        placeholder={placeholder}
      />
      <input
        className={styles.inputField} 
        type="text"
        value={'numDefects'}
        onChange={updateValue}
        onKeyDown={handleBrowseSVLByVIN}
        placeholder={placeholder}
      />
      <input
        className={styles.inputField} 
        type="text"
        value={'numRepairs'}
        onChange={updateValue}
        onKeyDown={handleBrowseSVLByVIN}
        placeholder={placeholder}
      />
      <input
        className={styles.inputField} 
        type="text"
        value={VIN}
        onChange={updateValue}
        onKeyDown={handleBrowseSVLByVIN}
        placeholder={placeholder}
      />
      <input
        className={styles.inputField} 
        type="text"
        value={'brand'}
        onChange={updateValue}
        onKeyDown={handleBrowseSVLByVIN}
        placeholder={placeholder}
      />
      <input
        className={styles.inputField} 
        type="text"
        value={'model'}
        onChange={updateValue}
        onKeyDown={handleBrowseSVLByVIN}
        placeholder={placeholder}
      />
      <input
        className={styles.inputField} 
        type="text"
        value={'year'}
        onChange={updateValue}
        onKeyDown={handleBrowseSVLByVIN}
        placeholder={placeholder}
      />
      <input
        className={styles.inputField} 
        type="text"
        value={'kilometers'}
        onChange={updateValue}
        onKeyDown={handleBrowseSVLByVIN}
        placeholder={placeholder}
      />
      <input
        className={styles.inputField} 
        type="text"
        value={'state'}
        onChange={updateValue}
        onKeyDown={handleBrowseSVLByVIN}
        placeholder={placeholder}
      />
      <input
        className={styles.inputField} 
        type="text"
        value={'color'}
        onChange={updateValue}
        onKeyDown={handleBrowseSVLByVIN}
        placeholder={placeholder}
      />
      <input
        className={styles.inputField} 
        type="text"
        value={'power'}
        onChange={updateValue}
        onKeyDown={handleBrowseSVLByVIN}
        placeholder={placeholder}
      />
      <input
        className={styles.inputField} 
        type="text"
        value={'shift'}
        onChange={updateValue}
        onKeyDown={handleBrowseSVLByVIN}
        placeholder={placeholder}
      />
      <input
        className={styles.inputField} 
        type="text"
        value={'fuel'}
        onChange={updateValue}
        onKeyDown={handleBrowseSVLByVIN}
        placeholder={placeholder}
      />
      <input
        className={styles.inputField} 
        type="text"
        value={'autonomy'}
        onChange={updateValue}
        onKeyDown={handleBrowseSVLByVIN}
        placeholder={placeholder}
      />
      <input
        className={styles.inputField} 
        type="text"
        value={'climate'}
        onChange={updateValue}
        onKeyDown={handleBrowseSVLByVIN}
        placeholder={placeholder}
      />
      <input
        className={styles.inputField} 
        type="text"
        value={'usage'}
        onChange={updateValue}
        onKeyDown={handleBrowseSVLByVIN}
        placeholder={placeholder}
      />
      <input
        className={styles.inputField} 
        type="text"
        value={'storage'}
        onChange={updateValue}
        onKeyDown={handleBrowseSVLByVIN}
        placeholder={placeholder}
      />
      <button
        className={styles.button}
        onClick={handleSearch}>
        {t('Dashboard.Labels.search')}
      </button>
    </div>
  );
}

export default FilterSVLs;