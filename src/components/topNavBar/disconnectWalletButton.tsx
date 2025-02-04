import styles from '../../styles/components/topNavBar/topNavBarButtons.module.css';
import { getWallet, disconnectWallet } from '../../utils/wallet';
import { useTranslation } from "react-i18next";

type DisconnectWalletButtonProps = {
  setMyAddress: React.Dispatch<React.SetStateAction<string | undefined>>;
};

const DisconnectWalletButton = ({ setMyAddress }: DisconnectWalletButtonProps): JSX.Element => {

  const { t } = useTranslation();

  const handleDisconnectWallet = async () => {
    const wallet = getWallet();
    await disconnectWallet(wallet, setMyAddress);
  };

  return (
    <div>
      <button
        className={styles.button}
        onClick={handleDisconnectWallet}>
        {t('DataSVL.TopBar.disconnectWallet')}
      </button>
    </div>
  );
}

export default DisconnectWalletButton;