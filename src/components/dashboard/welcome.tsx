import styles from '../../styles/components/dashboard/welcome.module.css';
import { useTranslation } from 'react-i18next';
import ConnectWalletButton from '../dashboard/connectWalletButton';
import LanguageSelector from '../varied/languageSelector';
import HelpButton from '../topNavBar/helpButton';

type WelcomeProps = {
  setMyAddress: React.Dispatch<React.SetStateAction<string | undefined>>;
};

const Welcome = ({ setMyAddress }: WelcomeProps): JSX.Element => {

  const { t } = useTranslation();

  return (
    <div className={styles.welcomeContainer}>
      <div className={styles.languageSelectorContainer}>
        <LanguageSelector />
      </div>
      <div className={styles.helpContainer}>
        <HelpButton />
      </div>
      <div className={styles.textContainer}>
        <div className={styles.title}>
          Secure Vehicle Logbook
        </div>
        <div className={styles.introduction}>
          {t('Dashboard.Labels.sloganFirstPart')}
        </div>
      </div>
      <div className={styles.connectWallet}>
        <ConnectWalletButton setMyAddress={setMyAddress} />
      </div>
    </div>
  );
}

export default Welcome;

//Timeless vehicle records
//for timeless vehicles