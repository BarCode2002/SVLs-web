import { useEffect, useState } from 'react';
import styles from '../../styles/components/topNavBar/topNavBarButtons.module.css';
import { getTezos, getsmartContractAddress } from '../../utils/wallet';
import { useTranslation } from "react-i18next";
import { TezosToolkit, WalletContract } from '@taquito/taquito';
import { indexer } from '../../utils/ip';
import axios from "axios";
import { TezosLogo } from '../../assets/tezos';

type BuySVLButtonProps = {
  svl_pk: string;
};

const BuySVLButton = ({ svl_pk }: BuySVLButtonProps): JSX.Element => {

  const { t } = useTranslation();
  
  const contractAddress = getsmartContractAddress();
  const [Tezos, setTezos] = useState<TezosToolkit | undefined>(undefined);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    const initializedTezos = getTezos();
    setTezos(initializedTezos);
    const getSVLPrice = async () => {
      try {
        const responseIndexer = await axios.get(`${indexer}holder/pk/${svl_pk}`);
        const svlPrice = responseIndexer.data[0].svl_price.slice(0, -6);
        setPrice(svlPrice);
      } catch (error) {
        console.error("Upload failed:", error);
      }
    }
    getSVLPrice()
  }, []);
  
  const handleBuySVL = async () => {     
    try {
      const contract: WalletContract = await Tezos!.wallet.at(contractAddress);
      const op = await contract.methodsObject.transfer(svl_pk).send({amount: price});
      await op.confirmation();
    } catch (error) {
      console.log('error:', error);
    }  
  };

  return (
    <div className={styles.actionContainer}>
      <button 
        className={styles.button}
        onClick={handleBuySVL}>
        {t('Dashboard.Labels.buy')}
      </button>
      <div className={styles.priceContainer}>
        <div className={styles.price}>{price}</div>
        <div className={styles.tezosLogo}><TezosLogo /></div>
      </div>
    </div>
  );
}

export default BuySVLButton;