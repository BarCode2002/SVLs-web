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

  return (
    <div>
      <input
        className={styles.inputField} 
        type="text"
        value={VIN}
        onChange={updateValue}
        onKeyDown={handleBrowseSVLByVIN}
        placeholder={placeholder}
      />
    </div>
  );
}

export default FilterSVLs;