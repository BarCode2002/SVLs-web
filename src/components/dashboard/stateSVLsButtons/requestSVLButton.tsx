import styles from '../../../styles/components/dashboard/stateSVLButtons/stateSVLButtons.module.css';
import { useTranslation } from 'react-i18next';
import { PreviewSVLsInfo } from '../../../utils/interfaces.ts';
import { TezosToolkit, WalletContract } from '@taquito/taquito';
import { getsmartContractAddress, getTezos } from '../../../utils/wallet.ts';
import { useEffect, useState } from 'react';
import axios from "axios";
import { mongoSmartContract } from '../../../utils/ip.ts';

type RequestSVLButtonProps = {
  requested: boolean;
  previewSVLsInfo: PreviewSVLsInfo[];
  setPreviewSVLsInfo: React.Dispatch<React.SetStateAction<PreviewSVLsInfo[]>>;
  index: number;
};

const RequestSVLButton = ({ requested, previewSVLsInfo, setPreviewSVLsInfo, index }: RequestSVLButtonProps): JSX.Element => {

  const { t } = useTranslation();
  const contractAddress = getsmartContractAddress();
  const [Tezos, setTezos] = useState<TezosToolkit | undefined>(undefined);

  useEffect(() => {
    const initializedTezos = getTezos();
    setTezos(initializedTezos);
  }, []);

  const handleRequestorUnrequestSVL = async () => { 
    const updatedPreviewSVLsInfo= [...previewSVLsInfo];
    const svl_pk = previewSVLsInfo[index].pk;
    let requestFee;
    if (!requested) {
      try {
        const response = await axios.get(mongoSmartContract);
        requestFee = response.data.requestFee;
      } catch (error) {
        console.error("Upload failed:", error);
      }
      try {
        const contract: WalletContract = await Tezos!.wallet.at(contractAddress);
        const op = await contract.methodsObject.requestTransfer(svl_pk).send({amount: requestFee});
        await op.confirmation();
        const ownerAddress = updatedPreviewSVLsInfo[index].stateNotMySVL[1];
        updatedPreviewSVLsInfo[index].stateNotMySVL = [true, ownerAddress, localStorage.getItem('address')!, false, false];
      } catch (error) {
        console.log('error:', error);
      }  
    }
    else {
      try {
        const contract: WalletContract = await Tezos!.wallet.at(contractAddress);
        const op = await contract.methodsObject.requesterClearTransferRequest(svl_pk).send();
        await op.confirmation();
        const ownerAddress = updatedPreviewSVLsInfo[index].stateNotMySVL[1];
        updatedPreviewSVLsInfo[index].stateNotMySVL = [false, ownerAddress, '', false, false];
      } catch (error) {
        console.log('error:', error);
      }  
    }
    setPreviewSVLsInfo(updatedPreviewSVLsInfo);
  };

  return (
    <div>
      <button 
        className={previewSVLsInfo[index].stateNotMySVL[3] == true ? styles.buttonRight : styles.buttonFull}
        onClick={handleRequestorUnrequestSVL}>
        {requested ? t('Dashboard.Labels.unrequest') : t('Dashboard.Labels.request')}
      </button>
    </div>
  );
};

export default RequestSVLButton;