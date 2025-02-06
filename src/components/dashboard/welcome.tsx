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
      <div className={styles.title}>
        Secure Vehicle Logbook
      </div>
      <div className={styles.introduction}>
        <div>Digitalización del libro de mantenimiento de un vehículo</div>
        <div>Permite crear, actualizar y transferir SVLs</div>
        <div>Para propietarios y compradores de vehículos</div>
      </div>
      <ConnectWalletButton myAddress={myAddress} setMyAddress={setMyAddress} />
    </div>
  );
}

export default Welcome;