import styles from '../styles/pages/Dashboard.module.css';
import { useEffect, useState } from 'react';
import { getWallet, setWalletConnection } from '../utils/wallet';
import { BeaconWallet } from '@taquito/beacon-wallet';
import TopNavBar from '../components/topNavBar/topNavBar';
import Welcome from '../components/dashboard/welcome';
import MySVLsButton from '../components/dashboard/mySVLsButton';
import RequestedSVLsButton from '../components/dashboard/requestedSVLsButton';
import FilterSVLs from '../components/dashboard/filterSVLs';
import PreviewSVLs from '../components/dashboard/previewSVLs';
import { FilterSVLsInterface } from '../utils/interfaces';
import { useTranslation } from 'react-i18next';

const Dashboard = (): JSX.Element => {

  const { t } = useTranslation();

  const [myAddress, setMyAddress] = useState<string | undefined>(undefined);
  const [wallet, setWallet] = useState<BeaconWallet | undefined>(undefined);
  const [search, setSearch] = useState(false);
  const [filterSVLs, setFilterSVLs] = useState(0);
  const [appliedFiltersSVL, setAppliedFiltersSVL] = useState<FilterSVLsInterface>(() => {
    const savedFilters = localStorage.getItem("appliedFiltersSVL");
    return savedFilters ? JSON.parse(savedFilters) : {
      numOwners: ['0', ''],
      numMaintenances: ['0', ''],
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
      power: ['0', '', 'cv'],
      shift: ['Dashboard.Placeholders.shift', ''],
      fuel: ['Dashboard.Placeholders.fuel', '', '', '', '', '', ''],
      autonomy: ['0', '', 'km'],
      climate: ['Dashboard.Placeholders.climate', '', '', '', '', '', ''],
      usage: ['Dashboard.Placeholders.usage', '', '', ''],
      storage: ['Dashboard.Placeholders.storage', '', '', '', '', '', ''],
    }
  });
  const [appliedFiltersSVLShrinked, setAppliedFiltersSVLShrinked] = useState(() => {
    const savedShrinkedFilters = localStorage.getItem("fullFilterShrinked");
    return savedShrinkedFilters ? JSON.parse(savedShrinkedFilters) : true
  });

  useEffect(() => {
    const initializedwallet = getWallet();
    setWallet(initializedwallet);
    const filterSVLs = localStorage.getItem('filterSVLs');
    setFilterSVLs(parseInt(filterSVLs!));    
  }, []);

  useEffect(() => {
    if (wallet) setWalletConnection(wallet, setMyAddress);
  }, [wallet]);

  const updateViewportHeight = () => {
    const newHeight = window.innerHeight;
    document.documentElement.style.setProperty('--vh', `${newHeight}px`);
  }
  window.addEventListener('resize', updateViewportHeight);

  const updatFullFilterSVL = () => {
    if (appliedFiltersSVLShrinked) {
      setAppliedFiltersSVLShrinked(false);
      localStorage.setItem('fullFilterShrinked', JSON.stringify(false));
    }
    else {
      setAppliedFiltersSVLShrinked(true);
      localStorage.setItem('fullFilterShrinked', JSON.stringify(true));

    }
  }

  return (
    <div>
      {myAddress == undefined ? (
        <div className={styles.mainContainer}>
          <Welcome setMyAddress={setMyAddress} />
        </div>
      ) : (
        <div className={styles.mainContainer}>
          <TopNavBar page={'Dashboard'} myAddress={myAddress} setMyAddress={setMyAddress} />
          <div className={styles.dashboardInformation}>
            <div className={styles.filterContainer}>
              <MySVLsButton filterSVLs={filterSVLs} setFilterSVLs={setFilterSVLs} setSearch={setSearch} />
              <RequestedSVLsButton filterSVLs={filterSVLs} setFilterSVLs={setFilterSVLs} setSearch={setSearch} />
              <div className={styles.fullFiltersToggleContainer}>
                <div className={styles.toggleText}>
                  {t('Dashboard.Labels.showDetailedFilters')}
                </div>
                <button
                  className={styles.toggleFullFilters}
                  onClick={updatFullFilterSVL}>
                  {appliedFiltersSVLShrinked == false ? '⬆' : '⬇'}
                </button>
              </div>
              {appliedFiltersSVLShrinked == false &&
                <FilterSVLs filterSVLs={filterSVLs} setFilterSVLs={setFilterSVLs} appliedFiltersSVL={appliedFiltersSVL} setAppliedFiltersSVL={setAppliedFiltersSVL} search={search} setSearch={setSearch} />
              }
            </div>
            <PreviewSVLs myAddress={myAddress} filterSVL={filterSVLs} appliedFiltersSVL={appliedFiltersSVL} search={search} />
          </div>
        </div>
      )}   
    </div>
  );
}

export default Dashboard;