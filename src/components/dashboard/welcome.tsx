import styles from '../../styles/components/dashboard/welcome.module.css';
import { useTranslation } from 'react-i18next';
import ConnectWalletButton from '../dashboard/connectWalletButton';

type WelcomeProps = {
  myAddress: string | undefined;
  setMyAddress: React.Dispatch<React.SetStateAction<string | undefined>>;
};

const Welcome = ({ myAddress, setMyAddress }: WelcomeProps): JSX.Element => {

  const { t } = useTranslation();

  return (
    <div className={styles.welcomeContainer}>
      <ConnectWalletButton myAddress={myAddress} setMyAddress={setMyAddress} />
    </div>
  );
}

export default Welcome;