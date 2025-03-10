import { TezosToolkit, WalletContract } from '@taquito/taquito';
import { useState, useEffect } from 'react';
import styles from '../../styles/components/topNavBar/topNavBarButtons.module.css';
import { useTranslation } from "react-i18next";
import { getsmartContractAddress, getTezos } from '../../utils/wallet';
import axios from "axios";
import { mongoSmartContract } from '../../utils/ip';
import { TezosLogo } from '../../assets/tezos';

type RequestSVLButtonProps = {
  svl_pk: string;
  state: number;
};

const RequestSVLButton = ({ svl_pk, state }: RequestSVLButtonProps): JSX.Element => {

  const { t } = useTranslation();
  const contractAddress = getsmartContractAddress();
  const [Tezos, setTezos] = useState<TezosToolkit | undefined>(undefined);
  const [requestFee, setRequestFee] = useState(0);
  
  useEffect(() => {
    const initializedTezos = getTezos();
    setTezos(initializedTezos);
    const getRequestFee = async () => {
      try {
        const response = await axios.get(mongoSmartContract);
        const requestFee = response.data.requestFee;
        setRequestFee(requestFee);
      } catch (error) {
        console.error("Upload failed:", error);
      }
    }
    getRequestFee()
  }, []);

  const handleRequestorUnrequestSVL = async () => { 
    let requestFee;
    if (state == 0) {
      try {
        const contract: WalletContract = await Tezos!.wallet.at(contractAddress);
        const op = await contract.methodsObject.requestTransfer(svl_pk).send({amount: requestFee});
        await op.confirmation();
      } catch (error) {
        console.log('error:', error);
      }  
    }
    else if (state == 1) {
      try {
        const contract: WalletContract = await Tezos!.wallet.at(contractAddress);
        const op = await contract.methodsObject.requesterClearTransferRequest(svl_pk).send();
        await op.confirmation();
      } catch (error) {
        console.log('error:', error);
      }  
    }
  };

  return (
    <div className={styles.actionContainer}>
      {state == 0 &&
        <button 
          className={styles.button}
          onClick={handleRequestorUnrequestSVL}>
          {t('Dashboard.Labels.request')}
        </button>
      }
      {state == 0 &&
        <div className={styles.priceContainer}>
          <div className={styles.price}>{requestFee}</div>
          <div className={styles.tezosLogo}><TezosLogo /></div>
        </div>
      }
      {state == 1 &&
        <button 
          className={styles.button}
          onClick={handleRequestorUnrequestSVL}>
          {t('Dashboard.Labels.unrequest')}
        </button>
      }
      {state == 2 &&
        <div className={styles.blocked}>
          {t('Dashboard.Labels.blocked')}
        </div>
      }
    </div>
  );
}

export default RequestSVLButton;