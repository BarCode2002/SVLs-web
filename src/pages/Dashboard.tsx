import styles from '../styles/pages/Dashboard.module.css';
import { useEffect, useState } from 'react';
import { getWallet, setWalletConnection } from '../utils/wallet';
import { BeaconWallet } from '@taquito/beacon-wallet';
import TopNavBar from '../components/topNavBar/topNavBar';
import Welcome from '../components/dashboard/welcome';
import FilterSVLs from '../components/dashboard/filterSVLs';

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
          <div className={styles.filterContainer}>
            <FilterSVLs setFilterSVLs={setFilterSVLs} VIN={VIN} setVIN={setVIN} placeholder={'VIN'} />
            <FilterSVLs setFilterSVLs={setFilterSVLs} VIN={VIN} setVIN={setVIN} placeholder={'VIN'} />
            <FilterSVLs setFilterSVLs={setFilterSVLs} VIN={VIN} setVIN={setVIN} placeholder={'VIN'} />
          </div>
        </div>
      )}   
    </div>
  );
}

export default Dashboard;