import styles from '../../styles/components/dashboard/connectWalletButton.module.css';
import { getWallet, connectWallet } from '../../utils/wallet';
import { useTranslation } from "react-i18next";

type ConnectWalletButtonProps = {
  setMyAddress: React.Dispatch<React.SetStateAction<string | undefined>>;
};

const ConnectWalletButton = ({ setMyAddress }: ConnectWalletButtonProps): JSX.Element => {

  const { t } = useTranslation();

  const handleConnectWallet = async () => {
    const wallet = getWallet();
    await connectWallet(wallet, setMyAddress);
  };

  return (
    <div>
      <button
        className={styles.button}
        onClick={handleConnectWallet}>
        {t('Dashboard.Labels.connectWallet')}
      </button>
    </div>
  );
}

export default ConnectWalletButton;