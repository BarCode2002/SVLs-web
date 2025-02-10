import styles from '../../styles/components/dashboard/filterSVLs.module.css';
import { useTranslation } from "react-i18next";

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