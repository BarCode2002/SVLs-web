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

const Dashboard = (): JSX.Element => {

  const [myAddress, setMyAddress] = useState<string | undefined>(undefined);
  const [wallet, setWallet] = useState<BeaconWallet | undefined>(undefined);
  const [search, setSearch] = useState(false);
  const [filterSVLs, setFilterSVLs] = useState(0);
  const [appliedFiltersSVL, setAppliedFiltersSVL] = useState<FilterSVLsInterface>({
    numOwners: '',
    numMaintenances: '',
    numDefects: '',
    defectChoosenLevel: 'Dashboard.Placeholders.defectChoosenLevel',
    numRepairs: '',
    vin: '',
    brand: 'Dashboard.Placeholders.brand',
    model: 'Dashboard.Placeholders.model',
    year: '',
    kilometers: '',
    state: 'Dashboard.Placeholders.state',
    color: '',
    power: '',
    shift: 'Dashboard.Placeholders.shift',
    fuel: 'Dashboard.Placeholders.fuel',
    autonomy: '',
    climate: 'Dashboard.Placeholders.climate',
    usage: 'Dashboard.Placeholders.usage',
    storage: 'Dashboard.Placeholders.storage',
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
              <FilterSVLs setFilterSVLs={setFilterSVLs} appliedFiltersSVL={appliedFiltersSVL} setAppliedFiltersSVL={setAppliedFiltersSVL} search={search} setSearch={setSearch} />
            </div>
            <PreviewSVLs myAddress={myAddress} filterSVL={filterSVLs} appliedFiltersSVL={appliedFiltersSVL} search={search} />
          </div>
        </div>
      )}   
    </div>
  );
}

export default Dashboard;