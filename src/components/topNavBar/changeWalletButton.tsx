import styles from '../../styles/components/topNavBar/topNavBarButtons.module.css';
import { getWallet, connectWallet } from '../../utils/wallet';
import { useTranslation } from "react-i18next";

type ChangeWalletButtonProps = {
  setMyAddress: React.Dispatch<React.SetStateAction<string | undefined>>;
};

const ChangeWalletButton = ({ setMyAddress }: ChangeWalletButtonProps): JSX.Element => {

  const { t } = useTranslation();

  const handleChangetWallet = async () => {
    const wallet = getWallet();
    await connectWallet(wallet, setMyAddress);
  };

  return (
    <div>
      <button
        className={styles.button}
        onClick={handleChangetWallet}>
        {t('Dashboard.TopBar.changeWallet')}
      </button>
    </div>
  );
}

export default ChangeWalletButton;