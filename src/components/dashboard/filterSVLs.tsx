import styles from '../../styles/components/dashboard/filterSVLs.module.css';
import { useTranslation } from "react-i18next";

type FilterSVLsProps = {
  setFilterSVLs: React.Dispatch<number>;
  VIN: string;
  setVIN: React.Dispatch<string>;
  placeholder: string
};

const FilterSVLs = ({ setFilterSVLs, VIN, setVIN, placeholder }: FilterSVLsProps): JSX.Element => {

  const { t } = useTranslation();

  const handleBrowseSVLByVIN = (event: { key: string; }) => {
    if (event.key === "Enter") {
      setFilterSVLs(2);
      console.log("hola");
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