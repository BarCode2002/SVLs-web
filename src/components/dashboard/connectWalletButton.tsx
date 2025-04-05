import styles from '../../styles/components/dashboard/connectWalletButton.module.css';
import { useTranslation } from "react-i18next";
import { WalletConnect, NetworkType, PermissionScopeMethods } from "@taquito/wallet-connect";


type ConnectWalletButtonProps = {
  setMyAddress: React.Dispatch<React.SetStateAction<string | undefined>>;
};

const ConnectWalletButton = ({ setMyAddress }: ConnectWalletButtonProps): JSX.Element => {

  const { t } = useTranslation();

  const handleConnectWallet = async () => {
    //const wallet = getWallet();
    //await connectWallet(wallet, setMyAddress);

    const walletConnect = await WalletConnect.init({
      projectId: "36686df3446a08edac4d4f3925beb311",
      metadata: {
        name: "YOUR_DAPP_NAME",
        description: "YOUR_DAPP_DESCRIPTION",
        icons: ["ICON_URL"],
        url: "DAPP_URL",
      },
    });
    await walletConnect.requestPermissions({
      permissionScope: {
        networks: [NetworkType.GHOSTNET],
        methods: [
          PermissionScopeMethods.TEZOS_SEND,
          PermissionScopeMethods.TEZOS_SIGN,
          PermissionScopeMethods.TEZOS_GET_ACCOUNTS
        ],
      },
      registryUrl: `https://explorer-api.walletconnect.com/v3/wallets?projectId=36686df3446a08edac4d4f3925beb311`,  
    });
    const pkh = await walletConnect.getPKH();
    console.log(pkh);

  };
  

  return (
    <div>
      <button
        className={styles.button}
        onClick={handleConnectWallet}>
        {t('Dashboard.Labels.discoverSVLs')}
      </button>
    </div>
  );
}

export default ConnectWalletButton;