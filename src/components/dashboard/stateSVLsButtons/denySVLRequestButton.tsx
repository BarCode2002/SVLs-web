import styles from '../../../styles/components/dashboard/stateSVLButtons/stateSVLButtons.module.css';
import { useTranslation } from 'react-i18next';
import { PreviewSVLsInfo } from '../../../utils/interfaces';
import { getsmartContractAddress, getTezos } from '../../../utils/wallet';
import { TezosToolkit, WalletContract } from '@taquito/taquito';
import { useEffect, useState } from 'react';

type DenySVLRequestButtonProps = {
  previewSVLsInfo: PreviewSVLsInfo[];
  setPreviewSVLsInfo: React.Dispatch<React.SetStateAction<PreviewSVLsInfo[]>>;
  index: number;
};

const DenySVLRequestButton = ({ previewSVLsInfo, setPreviewSVLsInfo, index }: DenySVLRequestButtonProps): JSX.Element => { 

  const { t } = useTranslation();

  const contractAddress = getsmartContractAddress();
  const [Tezos, setTezos] = useState<TezosToolkit | undefined>(undefined);

  useEffect(() => {
    const initializedTezos = getTezos();
    setTezos(initializedTezos);
  }, []);
  
  const handleDenySVLRequest = async () => { 
    const updatedPreviewSVLsInfo = [...previewSVLsInfo];
    const svl_pk = updatedPreviewSVLsInfo[index].pk;
    try {
      const contract: WalletContract = await Tezos!.wallet.at(contractAddress);
      const op = await contract.methodsObject.ownerClearTransferRequest(svl_pk).send();
      await op.confirmation();
      updatedPreviewSVLsInfo[index].stateMySVL = [false, '', false];
    } catch (error) {
      console.log('error:', error);
    }  
    setPreviewSVLsInfo(updatedPreviewSVLsInfo);
  };

  return (
    <div>
      <button 
        className={styles.buttonRight}
        onClick={handleDenySVLRequest}>
        {t('Dashboard.Labels.denyRequest')}
      </button>
    </div>
  );
};

export default DenySVLRequestButton;