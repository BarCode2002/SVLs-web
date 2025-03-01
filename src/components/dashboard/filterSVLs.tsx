import { useTranslation } from 'react-i18next';
import styles from '../../styles/components/dashboard/filterSVLs.module.css';
import { FilterSVLsInterface } from '../../utils/interfaces';
import DropdownMenuFilter from './dropdownMenuFilter';

type FilterSVLsProps = {
  filterSVLs: number;
  setFilterSVLs: React.Dispatch<number>;
  appliedFiltersSVL: FilterSVLsInterface;
  setAppliedFiltersSVL: React.Dispatch<FilterSVLsInterface>;
  search: boolean;
  setSearch: React.Dispatch<boolean>;
};

const FilterSVLs = ({ filterSVLs, setFilterSVLs, search, appliedFiltersSVL, setAppliedFiltersSVL, setSearch }: FilterSVLsProps): JSX.Element => {

  const { t } = useTranslation();

  //va el error es solo de typescript y no se como quitarlo
  const updateFilter = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    setAppliedFiltersSVL((prevAppliedFiltersSVL: FilterSVLsInterface) => ({
      ...prevAppliedFiltersSVL,
      [type]: e.target.value,
    }));
  }

  const handleSearch = () => {
    if (search) setSearch(false);
    else setSearch(true);
    setFilterSVLs(2);
  }

  return (
    <div className={styles.filterContainer}>
      <div className={styles.inputFieldContainer}>
        <input
          className={styles.inputField} 
          type="text"
          value={appliedFiltersSVL.numOwners}
          onChange={(e) => updateFilter(e, 'numOwners')}
          placeholder={t('Dashboard.Placeholders.numOwners')}
        />
        <input
          className={styles.inputField} 
          type="text"
          value={appliedFiltersSVL.numOwners}
          onChange={(e) => updateFilter(e, 'numOwners')}
          placeholder={t('Dashboard.Placeholders.numOwners')}
        />
      </div>
      <input
        className={styles.inputField} 
        type="text"
        value={appliedFiltersSVL.numMaintenances}
        onChange={(e) => updateFilter(e, 'numMaintenances')}
        placeholder={t('Dashboard.Placeholders.numMaintenances')}
      />
      <input
        className={styles.inputField} 
        type="text"
        value={appliedFiltersSVL.numDefects}
        onChange={(e) => updateFilter(e, 'numDefects')}
        placeholder={t('Dashboard.Placeholders.numDefects')}
      />
      <DropdownMenuFilter appliedFiltersSVL={appliedFiltersSVL} setAppliedFiltersSVL={setAppliedFiltersSVL} type={'defectChoosenLevel'} />
      <input
        className={styles.inputField} 
        type="text"
        value={appliedFiltersSVL.numRepairs}
        onChange={(e) => updateFilter(e, 'numRepairs')}
        placeholder={t('Dashboard.Placeholders.numRepairs')}
      />
      <input
        className={styles.inputField} 
        type="text"
        value={appliedFiltersSVL.vin}
        onChange={(e) => updateFilter(e, 'vin')}
        placeholder={t('Dashboard.Placeholders.vin')}
      />
      <DropdownMenuFilter appliedFiltersSVL={appliedFiltersSVL} setAppliedFiltersSVL={setAppliedFiltersSVL} type={'brand'} />
      <DropdownMenuFilter appliedFiltersSVL={appliedFiltersSVL} setAppliedFiltersSVL={setAppliedFiltersSVL} type={'model'} />
      <input
        className={styles.inputField} 
        type="text"
        value={appliedFiltersSVL.year}
        onChange={(e) => updateFilter(e, 'year')}
        placeholder={t('Dashboard.Placeholders.year')}
      />
      <input
        className={styles.inputField} 
        type="text"
        value={appliedFiltersSVL.kilometers}
        onChange={(e) => updateFilter(e, 'kilometers')}
        placeholder={t('Dashboard.Placeholders.kilometers')}
      />
      <DropdownMenuFilter appliedFiltersSVL={appliedFiltersSVL} setAppliedFiltersSVL={setAppliedFiltersSVL} type={'state'} />
      <input
        className={styles.inputField} 
        type="text"
        value={appliedFiltersSVL.power}
        onChange={(e) => updateFilter(e, 'power')}
        placeholder={t('Dashboard.Placeholders.power')}
      />
      <DropdownMenuFilter appliedFiltersSVL={appliedFiltersSVL} setAppliedFiltersSVL={setAppliedFiltersSVL} type={'shift'} />
      <DropdownMenuFilter appliedFiltersSVL={appliedFiltersSVL} setAppliedFiltersSVL={setAppliedFiltersSVL} type={'fuel'} />
      <input
        className={styles.inputField} 
        type="text"
        value={appliedFiltersSVL.autonomy}
        onChange={(e) => updateFilter(e, 'autonomy')}
        placeholder={t('Dashboard.Placeholders.autonomy')}
      />
      <DropdownMenuFilter appliedFiltersSVL={appliedFiltersSVL} setAppliedFiltersSVL={setAppliedFiltersSVL} type={'climate'} />
      <DropdownMenuFilter appliedFiltersSVL={appliedFiltersSVL} setAppliedFiltersSVL={setAppliedFiltersSVL} type={'usage'} />
      <DropdownMenuFilter appliedFiltersSVL={appliedFiltersSVL} setAppliedFiltersSVL={setAppliedFiltersSVL} type={'storage'} />
      <button
        className={filterSVLs == 2 ? styles.buttonSelected : styles.button}
        onClick={handleSearch}>
        {t('Dashboard.Labels.search')}
      </button>
    </div>
  );
}

export default FilterSVLs;