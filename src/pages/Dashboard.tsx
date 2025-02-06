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

const Dashboard = (): JSX.Element => {

  const [myAddress, setMyAddress] = useState<string | undefined>(undefined);
  const [wallet, setWallet] = useState<BeaconWallet | undefined>(undefined);
  const [filterSVLs, setFilterSVLs] = useState(0);
  const [VIN, setVIN] = useState('');

  useEffect(() => {
    const initializedwallet = getWallet();
    setWallet(initializedwallet);
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
          <Welcome myAddress={myAddress} setMyAddress={setMyAddress} />
        </div>
      ) : (
        <div className={styles.mainContainer}>
          
            <TopNavBar page={'Dashboard'} myAddress={myAddress} setMyAddress={setMyAddress} />

          <div className={styles.dashboardInformation}>
            <div className={styles.filterContainer}>
              <MySVLsButton filterSVLs={filterSVLs} setFilterSVLs={setFilterSVLs} />
              <RequestedSVLsButton filterSVLs={filterSVLs} setFilterSVLs={setFilterSVLs} />
              <FilterSVLs setFilterSVLs={setFilterSVLs} VIN={VIN} setVIN={setVIN} placeholder={'VIN'} />
            </div>
            
              <PreviewSVLs />
            
          </div>
        </div>
      )}   
    </div>
  );
}

export default Dashboard;