import styles from '../../../styles/components/dashboard/stateSVLButtons/stateSVLButtons.module.css';
import { useTranslation } from 'react-i18next';
import { PreviewSVLsInfo } from '../../../utils/commonTypes';
import { getsmartContractAddress, getTezos } from '../../../utils/wallet';
import { TezosToolkit, WalletContract } from '@taquito/taquito';
import { useEffect, useState } from 'react';
import { GROUP_SIZE } from '../../../utils/constants';

type BuySVLButtonProps = {
  previewSVLsInfo: PreviewSVLsInfo[];
  setPreviewSVLsInfo: React.Dispatch<React.SetStateAction<PreviewSVLsInfo[]>>;
  index: number;
};

const BuySVLButton = ({ previewSVLsInfo, setPreviewSVLsInfo, index }: BuySVLButtonProps): JSX.Element => { 

  const { t } = useTranslation();

  const contractAddress = getsmartContractAddress();
  const [Tezos, setTezos] = useState<TezosToolkit | undefined>(undefined);

  useEffect(() => {
    const initializedTezos = getTezos();
    setTezos(initializedTezos);
  }, []);
  
  const handleBuySVL = async () => { 
    const svl_pk = previewSVLsInfo[index].pk;
    try {
      const contract: WalletContract = await Tezos!.wallet.at(contractAddress);
      const mutezPrice = previewSVLsInfo[index].price;
      const op = await contract.methodsObject.transfer(svl_pk).send({amount: mutezPrice});
      await op.confirmation();
      const updatedPreviewSVLsInfo = [...previewSVLsInfo];
      for (let i = 0; i < GROUP_SIZE-1; i++) {
        updatedPreviewSVLsInfo[i] = updatedPreviewSVLsInfo[i+1]
      }
      updatedPreviewSVLsInfo[GROUP_SIZE-1] = {
        pk: '',
        price: 0,
        mySVL: null,
        mainPhotograph: '',
        brand: '',
        model: '',
        year: '',
        stateMySVL: [null, '', null],
        stateNotMySVL: [null, '', '', null, null],
      }
      setPreviewSVLsInfo(updatedPreviewSVLsInfo);
    } catch (error) {
      console.log('error:', error);
    }  
  };

  return (
    <div>
      <button 
        className={styles.buttonLeft}
        onClick={handleBuySVL}>
        {t('Dashboard.Labels.buy')}
      </button>
    </div>
  );
};

export default BuySVLButton;