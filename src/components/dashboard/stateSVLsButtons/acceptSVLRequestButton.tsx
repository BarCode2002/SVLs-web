import styles from '../../../styles/components/dashboard/stateSVLButtons/stateSVLButtons.module.css';
import { useTranslation } from 'react-i18next';
import { PreviewSVLsInfo } from '../../../utils/commonTypes';
import { getsmartContractAddress, getTezos } from '../../../utils/wallet';
import { TezosToolkit, WalletContract } from '@taquito/taquito';
import { useEffect, useState } from 'react';

type AcceptSVLRequestButtonProps = {
  previewSVLsInfo: PreviewSVLsInfo[];
  setPreviewSVLsInfo: React.Dispatch<React.SetStateAction<PreviewSVLsInfo[]>>;
  index: number;
};

const AcceptSVLRequestButton = ({ previewSVLsInfo, setPreviewSVLsInfo, index }: AcceptSVLRequestButtonProps): JSX.Element => { 

  const { t } = useTranslation();

  const contractAddress = getsmartContractAddress();
    const [Tezos, setTezos] = useState<TezosToolkit | undefined>(undefined);
  
    useEffect(() => {
      const initializedTezos = getTezos();
      setTezos(initializedTezos);
    }, []);

  const handleAcceptSVLRequest = async () => { 
    const updatedPreviewSVLsInfo = [...previewSVLsInfo];
    const svl_pk = updatedPreviewSVLsInfo[index].pk;
    try {
      const contract: WalletContract = await Tezos!.wallet.at(contractAddress);
      const op = await contract.methodsObject.ownerAcceptTransferRequest(svl_pk).send();
      await op.confirmation();
      const requesterAddress = updatedPreviewSVLsInfo[index].stateMySVL[1];
      updatedPreviewSVLsInfo[index].stateMySVL = [true, requesterAddress, true];
    } catch (error) {
      console.log('error:', error);
    }  
    setPreviewSVLsInfo(updatedPreviewSVLsInfo);
  };

  return (
    <div>
      <button 
        className={styles.buttonLeft}
        onClick={handleAcceptSVLRequest}>
        {t('Dashboard.Labels.acceptRequest')}
      </button>
    </div>
  );
};

export default AcceptSVLRequestButton;