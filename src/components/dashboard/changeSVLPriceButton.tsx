import styles from '../../styles/components/dashboard/changeSVLPriceButton.module.css';
import { useTranslation } from 'react-i18next';
import { PreviewSVLsInfo } from '../../utils/interfaces';
import { getsmartContractAddress, getTezos } from '../../utils/wallet';
import { TezosToolkit, WalletContract } from '@taquito/taquito';
import { useEffect, useState } from 'react';

type ChangeSVLPriceButtonProps = {
  previewSVLsInfo: PreviewSVLsInfo[];
  setPreviewSVLsInfo: React.Dispatch<React.SetStateAction<PreviewSVLsInfo[]>>;
  index: number;
  price: string;
};

const ChangeSVLPriceButton = ({ previewSVLsInfo, setPreviewSVLsInfo, index, price }: ChangeSVLPriceButtonProps): JSX.Element => { 

  const { t } = useTranslation();

  const contractAddress = getsmartContractAddress();
  const [Tezos, setTezos] = useState<TezosToolkit | undefined>(undefined);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const initializedTezos = getTezos();
    setTezos(initializedTezos);
  }, []);
  
  const handleChangeSVLPrice = async () => { 
    const updatedPreviewSVLsInfo = [...previewSVLsInfo];
    const svl_pk = updatedPreviewSVLsInfo[index].pk;
    try {
      const contract: WalletContract = await Tezos!.wallet.at(contractAddress);
      const op = await contract.methodsObject.changeTransferPrice({
        svl_key: svl_pk, 
        price: 600000000,
      }).send();
      await op.confirmation();
      updatedPreviewSVLsInfo[index].price = price;
    } catch (error) {
      console.log('error:', error);
    }  
    setPreviewSVLsInfo(updatedPreviewSVLsInfo);
  };

  return (
    <div>
      <div>
        {t('Dashboard.Labels.price')}
      </div>
      <input
        className={styles.inputField} 
        placeholder={t('Dashboard.Labels.priceSVL')}
        value={previewSVLsInfo[index].price}
        onChange={handleChangeSVLPrice}
        disabled={step == 0}
      />
      <button 
        className={styles.buttonRight}
        onClick={handleChangeSVLPrice}>
        {step == 0 ? t('Dashboard.Labels.change') : t('Dashboard.Labels.confirm')}
      </button>
    </div>
  );
};

export default ChangeSVLPriceButton;