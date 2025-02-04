import styles from '../styles/pages/Dashboard.module.css';
import { useEffect, useState } from 'react';
import TopNavBar from '../components/topNavBar/topNavBar';
import { getWallet, setWalletConnection } from '../utils/wallet';
import { BeaconWallet } from '@taquito/beacon-wallet';

const Dashboard = (): JSX.Element => {

  const [, setMyAddress] = useState<string | undefined>(undefined);
  const [wallet, setWallet] = useState<BeaconWallet | undefined>(undefined);

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
    <div className={styles.mainContainer}>
      <TopNavBar page={'Dashboard'} setMyAddress={setMyAddress} />
    </div>
  );
}

export default Dashboard;