import { useTranslation } from 'react-i18next';
import styles from '../../styles/components/dashboard/filterSVLs.module.css';
import { FilterSVLsInterface } from '../../utils/interfaces';
import DropdownMenuFilter from './dropdownMenuFilter';
import { useEffect } from 'react';

type FilterSVLsProps = {
  setFilterSVLs: React.Dispatch<number>;
  appliedFiltersSVL: FilterSVLsInterface;
  setAppliedFiltersSVL: React.Dispatch<FilterSVLsInterface>;
  search: boolean;
  setSearch: React.Dispatch<boolean>;
};

const FilterSVLs = ({ setFilterSVLs, search, appliedFiltersSVL, setAppliedFiltersSVL, setSearch }: FilterSVLsProps): JSX.Element => {

  const { t } = useTranslation();

  useEffect(() => {
    localStorage.setItem('appliedFiltersSVL', JSON.stringify(appliedFiltersSVL));
  }, [appliedFiltersSVL]);

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
      if (value == '' || re.test(value)) {
        setAppliedFiltersSVL((prevAppliedFiltersSVL: FilterSVLsInterface) => ({
          ...prevAppliedFiltersSVL,
          [type]: value,
        }));
      }
    }
    else if (type == 'kilometers' || type == 'power' || type == 'autonomy' || type == 'weight') {
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

  const handleResetFilters = () => {
    const defaultState: FilterSVLsInterface = {
      numOwners: ['0', ''],
      numMaintenances: ['0', ''],
      numModifications: ['0', ''],
      defects: {
        cosmetic: [false, '0', ''],
        minor: [false, '0', ''],
        moderate: [false, '0', ''],
        important: [false, '0', ''],
        critical: [false, '0', '']
      },
      numRepairs: ['0', ''],
      vin: '',
      brand: 'Dashboard.Placeholders.brand',
      model: 'Dashboard.Placeholders.model',
      year: ['0', ''],
      kilometers: ['0', '', 'km'],
      state: ['Dashboard.Placeholders.state', '', '', '', '', '', ''],
      weight: ['0', '', 'kg'],
      power: ['0', '', 'cv'],
      shift: ['Dashboard.Placeholders.shift', ''],
      fuel: ['Dashboard.Placeholders.fuel', '', '', '', '', '', ''],
      autonomy: ['0', '', 'km'],
      climate: ['Dashboard.Placeholders.climate', '', '', '', '', '', ''],
      usage: ['Dashboard.Placeholders.usage', '', '', ''],
      storage: ['Dashboard.Placeholders.storage', '', '', '', '', '', '']
    }
    setAppliedFiltersSVL(defaultState);
    localStorage.setItem('appliedFiltersSVL', JSON.stringify(defaultState));
  }

  const handleSearch = () => {
    if (search) setSearch(false);
    else setSearch(true);
    setFilterSVLs(2);
    localStorage.setItem('filterSVLs', '2');
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
      <div className={styles.filterLabel1}>
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
      <div className={styles.filterLabel1}>
        {t('Dashboard.Placeholders.numModifications')}
      </div>
      <div className={styles.inputFieldContainer}>
        <input
          className={styles.inputFieldLeft} 
          type="text"
          value={appliedFiltersSVL.numModifications[0]}
          onChange={(e) => updateFilter(e.target.value, 'numModifications', 0)}
          placeholder={t('Dashboard.Placeholders.since')}
        />
        <div className={styles.horizontalSeparator}></div>
        <input
          className={styles.inputFieldRight}
          type="text"
          value={appliedFiltersSVL.numModifications[1]}
          onChange={(e) => updateFilter(e.target.value, 'numModifications', 1)}
          placeholder={t('Dashboard.Placeholders.until')}
        />
      </div>
      <DropdownMenuFilter appliedFiltersSVL={appliedFiltersSVL} setAppliedFiltersSVL={setAppliedFiltersSVL} type={'defects'} 
        defectList={['cosmetic', 'minor', 'moderate', 'important', 'critical']}
      />
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
      <DropdownMenuFilter appliedFiltersSVL={appliedFiltersSVL} setAppliedFiltersSVL={setAppliedFiltersSVL} type={'brand'} defectList={[]} />
      <DropdownMenuFilter appliedFiltersSVL={appliedFiltersSVL} setAppliedFiltersSVL={setAppliedFiltersSVL} type={'model'} defectList={[]} />
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
      <DropdownMenuFilter appliedFiltersSVL={appliedFiltersSVL} setAppliedFiltersSVL={setAppliedFiltersSVL} type={'state'} defectList={[]} />
      <div className={styles.labelContainer}>
        <div className={styles.filterLabel}>
          {t('Dashboard.Placeholders.weight')}
        </div>
        <button
          className={appliedFiltersSVL.weight[2] != 'kg' ? styles.leftButton : styles.leftButtonSelected}
          onClick={() => updateFilter('kg', 'weight', 2)}>
          kg
        </button>
        <button
          className={appliedFiltersSVL.weight[2] != 'lb' ? styles.rightButton : styles.rightButtonSelected}
          onClick={() => updateFilter('lb', 'weight', 2)}>
          lb
        </button>
      </div>
      <div className={styles.inputFieldContainer}>
        <input
          className={styles.inputFieldLeft} 
          type="text"
          value={appliedFiltersSVL.weight[0]}
          onChange={(e) => updateFilter(e.target.value, 'weight', 0)}
          placeholder={t('Dashboard.Placeholders.since')}
        />
        <div className={styles.horizontalSeparator}></div>
        <input
          className={styles.inputFieldRight}
          type="text"
          value={appliedFiltersSVL.weight[1]}
          onChange={(e) => updateFilter(e.target.value, 'weight', 1)}
          placeholder={t('Dashboard.Placeholders.until')}
        />
      </div>
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
      <DropdownMenuFilter appliedFiltersSVL={appliedFiltersSVL} setAppliedFiltersSVL={setAppliedFiltersSVL} type={'shift'} defectList={[]} />
      <DropdownMenuFilter appliedFiltersSVL={appliedFiltersSVL} setAppliedFiltersSVL={setAppliedFiltersSVL} type={'fuel'} defectList={[]} />
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
      <DropdownMenuFilter appliedFiltersSVL={appliedFiltersSVL} setAppliedFiltersSVL={setAppliedFiltersSVL} type={'climate'} defectList={[]} />
      <DropdownMenuFilter appliedFiltersSVL={appliedFiltersSVL} setAppliedFiltersSVL={setAppliedFiltersSVL} type={'usage'} defectList={[]} />
      <DropdownMenuFilter appliedFiltersSVL={appliedFiltersSVL} setAppliedFiltersSVL={setAppliedFiltersSVL} type={'storage'} defectList={[]} />
      <div className={styles.bottomButtons}>
        <button
          className={styles.button}
          onClick={handleResetFilters}>
          {t('Dashboard.Labels.reset')}
        </button>
        <button
          className={styles.button}
          onClick={handleSearch}>
          {t('Dashboard.Labels.search')}
        </button>
      </div>
    </div>
  );
}

export default FilterSVLs;