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
  const updateFilter = (value: string, type: string, index: number) => {
    if (type == 'numOwners' || type == 'numMaintenances' || type == 'numRepairs' || type == 'year') {
      let re: RegExp;
      re = /^(0|[1-9]\d*)$/;
      if (value == '' || re.test(value)) {
        setAppliedFiltersSVL((prevAppliedFiltersSVL: FilterSVLsInterface) => ({
          ...prevAppliedFiltersSVL,
          [type]: prevAppliedFiltersSVL[type].map((item, i) => (index == i ? value : item)),
        }));
      }
    }
    else if (type == 'vin') {
      let re: RegExp;
      re = /^[A-Z0-9-]+$/;
      if (re.test(value)) {
        setAppliedFiltersSVL((prevAppliedFiltersSVL: FilterSVLsInterface) => ({
          ...prevAppliedFiltersSVL,
          [type]: value,
        }));
      }
    }
    else if (type == 'kilometers' || type == 'power' || type == 'autonomy') {
      let re: RegExp;
      re = /^(0|[1-9]\d*)$/;
      if (index == 2) re = /.*/;
      if (value == '' || re.test(value)) {
        setAppliedFiltersSVL((prevAppliedFiltersSVL: FilterSVLsInterface) => ({
          ...prevAppliedFiltersSVL,
          [type]: prevAppliedFiltersSVL[type].map((item, i) => (index == i ? value : item)),
        }));
      }
    }
  }

  const handleSearch = () => {
    if (search) setSearch(false);
    else setSearch(true);
    setFilterSVLs(2);
  }

  return (
    <div className={styles.filterContainer}>
      <div className={styles.filterLabel}>
        {t('Dashboard.Placeholders.numOwners')}
      </div>
      <div className={styles.inputFieldContainer}>
        <input
          className={styles.inputFieldLeft} 
          type="text"
          value={appliedFiltersSVL.numOwners[0]}
          onChange={(e) => updateFilter(e.target.value, 'numOwners', 0)}
          placeholder={t('Dashboard.Placeholders.since')}
        />
        <div className={styles.horizontalSeparator}></div>
        <input
          className={styles.inputFieldRight}
          type="text"
          value={appliedFiltersSVL.numOwners[1]}
          onChange={(e) => updateFilter(e.target.value, 'numOwners', 1)}
          placeholder={t('Dashboard.Placeholders.until')}
        />
      </div>
      <div className={styles.filterLabel}>
        {t('Dashboard.Placeholders.numMaintenances')}
      </div>
      <div className={styles.inputFieldContainer}>
        <input
          className={styles.inputFieldLeft} 
          type="text"
          value={appliedFiltersSVL.numMaintenances[0]}
          onChange={(e) => updateFilter(e.target.value, 'numMaintenances', 0)}
          placeholder={t('Dashboard.Placeholders.since')}
        />
        <div className={styles.horizontalSeparator}></div>
        <input
          className={styles.inputFieldRight}
          type="text"
          value={appliedFiltersSVL.numMaintenances[1]}
          onChange={(e) => updateFilter(e.target.value, 'numMaintenances', 1)}
          placeholder={t('Dashboard.Placeholders.until')}
        />
      </div>
      <DropdownMenuFilter appliedFiltersSVL={appliedFiltersSVL} setAppliedFiltersSVL={setAppliedFiltersSVL} type={'defects'} />
      <div className={styles.filterLabel}>
        {t('Dashboard.Placeholders.numRepairs')}
      </div>
      <div className={styles.inputFieldContainer}>
        <input
          className={styles.inputFieldLeft} 
          type="text"
          value={appliedFiltersSVL.numRepairs[0]}
          onChange={(e) => updateFilter(e.target.value, 'numRepairs', 0)}
          placeholder={t('Dashboard.Placeholders.since')}
        />
        <div className={styles.horizontalSeparator}></div>
        <input
          className={styles.inputFieldRight}
          type="text"
          value={appliedFiltersSVL.numRepairs[1]}
          onChange={(e) => updateFilter(e.target.value, 'numRepairs', 1)}
          placeholder={t('Dashboard.Placeholders.until')}
        />
      </div>
      <input
        className={styles.inputField} 
        type="text"
        value={appliedFiltersSVL.vin}
        onChange={(e) => updateFilter(e.target.value, 'vin', -1)}
        placeholder={t('Dashboard.Placeholders.vin')}
      />
      <DropdownMenuFilter appliedFiltersSVL={appliedFiltersSVL} setAppliedFiltersSVL={setAppliedFiltersSVL} type={'brand'} />
      <DropdownMenuFilter appliedFiltersSVL={appliedFiltersSVL} setAppliedFiltersSVL={setAppliedFiltersSVL} type={'model'} />
      <div className={styles.filterLabel}>
        {t('Dashboard.Placeholders.year')}
      </div>
      <div className={styles.inputFieldContainer}>
        <input
          className={styles.inputFieldLeft} 
          type="text"
          value={appliedFiltersSVL.year[0]}
          onChange={(e) => updateFilter(e.target.value, 'year', 0)}
          placeholder={t('Dashboard.Placeholders.since')}
        />
        <div className={styles.horizontalSeparator}></div>
        <input
          className={styles.inputFieldRight}
          type="text"
          value={appliedFiltersSVL.year[1]}
          onChange={(e) => updateFilter(e.target.value, 'year', 1)}
          placeholder={t('Dashboard.Placeholders.until')}
        />
      </div>
      <div className={styles.labelContainer}>
        <div className={styles.filterLabel}>
          {t('Dashboard.Placeholders.kilometers')}
        </div>
        <button
          className={appliedFiltersSVL.kilometers[2] != 'km' ? styles.leftButton : styles.leftButtonSelected}
          onClick={() => updateFilter('km', 'kilometers', 2)}>
          km
        </button>
        <button
          className={appliedFiltersSVL.kilometers[2] != 'mi' ? styles.rightButton : styles.rightButtonSelected}
          onClick={() => updateFilter('mi', 'kilometers', 2)}>
          mi
        </button>
      </div>
      <div className={styles.inputFieldContainer}>
        <input
          className={styles.inputFieldLeft} 
          type="text"
          value={appliedFiltersSVL.kilometers[0]}
          onChange={(e) => updateFilter(e.target.value, 'kilometers', 0)}
          placeholder={t('Dashboard.Placeholders.since')}
        />
        <div className={styles.horizontalSeparator}></div>
        <input
          className={styles.inputFieldRight}
          type="text"
          value={appliedFiltersSVL.kilometers[1]}
          onChange={(e) => updateFilter(e.target.value, 'kilometers', 1)}
          placeholder={t('Dashboard.Placeholders.until')}
        />
      </div>
      <DropdownMenuFilter appliedFiltersSVL={appliedFiltersSVL} setAppliedFiltersSVL={setAppliedFiltersSVL} type={'state'} />
      <div className={styles.labelContainer}>
        <div className={styles.filterLabel}>
          {t('Dashboard.Placeholders.power')}
        </div>
        <button
          className={appliedFiltersSVL.power[2] != 'cv' ? styles.leftButton : styles.leftButtonSelected}
          onClick={() => updateFilter('cv', 'power', 2)}>
          cv
        </button>
        <button
          className={appliedFiltersSVL.power[2] != 'kW' ? styles.rightButton : styles.rightButtonSelected}
          onClick={() => updateFilter('kW', 'power', 2)}>
          kW
        </button>
      </div>
      <div className={styles.inputFieldContainer}>
        <input
          className={styles.inputFieldLeft} 
          type="text"
          value={appliedFiltersSVL.power[0]}
          onChange={(e) => updateFilter(e.target.value, 'power', 0)}
          placeholder={t('Dashboard.Placeholders.since')}
        />
        <div className={styles.horizontalSeparator}></div>
        <input
          className={styles.inputFieldRight}
          type="text"
          value={appliedFiltersSVL.power[1]}
          onChange={(e) => updateFilter(e.target.value, 'power', 1)}
          placeholder={t('Dashboard.Placeholders.until')}
        />
      </div>
      <DropdownMenuFilter appliedFiltersSVL={appliedFiltersSVL} setAppliedFiltersSVL={setAppliedFiltersSVL} type={'shift'} />
      <DropdownMenuFilter appliedFiltersSVL={appliedFiltersSVL} setAppliedFiltersSVL={setAppliedFiltersSVL} type={'fuel'} />
      <div className={styles.labelContainer}>
        <div className={styles.filterLabel}>
          {t('Dashboard.Placeholders.autonomy')}
        </div>
        <button
          className={appliedFiltersSVL.autonomy[2] != 'km' ? styles.leftButton : styles.leftButtonSelected}
          onClick={() => updateFilter('km', 'autonomy', 2)}>
          km
        </button>
        <button
          className={appliedFiltersSVL.autonomy[2] != 'mi' ? styles.rightButton : styles.rightButtonSelected}
          onClick={() => updateFilter('mi', 'autonomy', 2)}>
          mi
        </button>
      </div>
      <div className={styles.inputFieldContainer}>
        <input
          className={styles.inputFieldLeft} 
          type="text"
          value={appliedFiltersSVL.autonomy[0]}
          onChange={(e) => updateFilter(e.target.value, 'autonomy', 0)}
          placeholder={t('Dashboard.Placeholders.since')}
        />
        <div className={styles.horizontalSeparator}></div>
        <input
          className={styles.inputFieldRight}
          type="text"
          value={appliedFiltersSVL.autonomy[1]}
          onChange={(e) => updateFilter(e.target.value, 'autonomy', 1)}
          placeholder={t('Dashboard.Placeholders.until')}
        />
      </div>
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