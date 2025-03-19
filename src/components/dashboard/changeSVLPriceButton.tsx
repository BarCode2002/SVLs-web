import styles from '../../styles/components/dashboard/changeSVLPriceButton.module.css';
import { useTranslation } from 'react-i18next';
import { PreviewSVLsInfo } from '../../utils/interfaces';
import { getsmartContractAddress, getTezos } from '../../utils/wallet';
import { TezosToolkit, WalletContract } from '@taquito/taquito';
import { useEffect, useState } from 'react';
import InvalidFieldsComponent from '../varied/invalidFieldsComponent';
import axios from "axios";
import { mongoSmartContract } from '../../utils/ip';
import { TezosLogo } from '../../assets/tezos';
import {CrossIcon, CrossIconHovered, TickIcon, TickIconHovered } from '../../assets/tickCross';

type ChangeSVLPriceButtonProps = {
  previewSVLsInfo: PreviewSVLsInfo[];
  setPreviewSVLsInfo: React.Dispatch<React.SetStateAction<PreviewSVLsInfo[]>>;
  index: number;
  split: number;
};

const ChangeSVLPriceButton = ({ previewSVLsInfo, setPreviewSVLsInfo, index, split }: ChangeSVLPriceButtonProps): JSX.Element => { 

  const { t } = useTranslation();

  const contractAddress = getsmartContractAddress();
  const [Tezos, setTezos] = useState<TezosToolkit | undefined>(undefined);
  const [step, setStep] = useState(0);
  const [initialPrice, setInitialPrice] = useState<number>(0);
  const [invalidFieldsVisible, setInvalidFieldsVisible] = useState(false);
  const [invalidFields, setInvalidFields] = useState<string[]>([]);
  const [requestFee, setRequestFee] = useState<string>('');
  const [tickHovered, setTickHovered] = useState(false);
  const [crossHovered, setCrossHovered] = useState(false);

  useEffect(() => {
    const initializedTezos = getTezos();
    setTezos(initializedTezos);
    setInitialPrice(previewSVLsInfo[index].price);
    const getRequestFee = async () => {
      try {
        const response = await axios.get(mongoSmartContract);
        const requestFee = response.data.requestFee;
        setRequestFee(requestFee);
      } catch (error) {
        console.error("Upload failed:", error);
      }

    }
    getRequestFee();
  }, []);
  
  const handleChangeSVLPrice = async () => { 
    if (step == 0) setStep(1)
    else {
      try {
        const response = await axios.get(mongoSmartContract);
        const minTransferPrice = response.data.minTransferPrice;
        if (previewSVLsInfo[index].price < parseInt(minTransferPrice)) {
          const updatedInvalidFields = [`${t('InvalidFields.minTransferPrice')} ${minTransferPrice} tezos`];
          setInvalidFields(updatedInvalidFields);
          setInvalidFieldsVisible(true);
          return;
        }
      } catch (error) {
        console.error("Upload failed:", error);
      }
      const svl_pk = previewSVLsInfo[index].pk;
      const previousPrice = previewSVLsInfo[index].price;
      const mutez = previewSVLsInfo[index].price * 1000000;
      try {
        const contract: WalletContract = await Tezos!.wallet.at(contractAddress);
        const op = await contract.methodsObject.changeTransferPrice({
          svl_key: svl_pk, 
          price: mutez,
        }).send();
        await op.confirmation();
        setStep(0);
        setInitialPrice(previousPrice);
      } catch (error) {
        console.log('error:', error);
      }  
    }
  };

  const updateSVLPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedPreviewSVLsInfo = [...previewSVLsInfo];
    if (e.target.value != "") updatedPreviewSVLsInfo[index].price = parseInt(e.target.value);
    else updatedPreviewSVLsInfo[index].price = 0;
    setPreviewSVLsInfo(updatedPreviewSVLsInfo);
  };

  const handleCancel = () => {
    setStep(0);
    const updatedPreviewSVLsInfo = [...previewSVLsInfo];
    updatedPreviewSVLsInfo[index].price = initialPrice!;
    setPreviewSVLsInfo(updatedPreviewSVLsInfo);
  };

  return (
    <div>
      
      {previewSVLsInfo[index].mySVL == true ? (
        <div className={styles.changeSVLPriceContainer}>
          <div className={styles.fieldLabel}>
            {t('Dashboard.Labels.price')}
          </div>
          {step > 0 ? (
            <input
              className={styles.inputField} 
              placeholder={t('Dashboard.Labels.priceSVL')}
              value={previewSVLsInfo[index].price}
              onChange={updateSVLPrice}
              disabled={step == 0}
            />
          ) : (
            <div className={styles.priceContainer}>
              <div className={styles.price}>
                <div>{previewSVLsInfo[index].price}</div>
                <div className={styles.tezosLogo}><TezosLogo /></div>
              </div>
              <button 
                className={styles.changeButton}
                onClick={handleChangeSVLPrice}>
                {t('Dashboard.Labels.change')}
              </button>
            </div>
          )}
          {step > 0 &&
            <div className={styles.buttonsContainer}>
              <div className={styles.confirmCancelButtonContainer}>
                <button 
                  onMouseEnter={() => setTickHovered(true)}
                  onMouseLeave={() => setTickHovered(false)}
                  className={styles.button}
                  onClick={handleChangeSVLPrice}>
                  {tickHovered ? <TickIconHovered /> : <TickIcon />}
                </button>
                <button 
                  onMouseEnter={() => setCrossHovered(true)}
                  onMouseLeave={() => setCrossHovered(false)}
                  className={styles.button}
                  onClick={handleCancel}>
                  {crossHovered ? <CrossIconHovered /> : <CrossIcon />}
                </button>
              </div>
            </div>
          }
          <div className={styles.fee}>
            <div>{t('Dashboard.Labels.fee')} {split * previewSVLsInfo[index].price}</div>
            <div className={styles.tezosLogo}><TezosLogo /></div>
          </div>
          {invalidFieldsVisible &&
            <InvalidFieldsComponent invalidFields={invalidFields} setInvalidFieldsVisible={setInvalidFieldsVisible} />
          }
        </div>
      ) : (
        <div className={styles.priceRequestFeeContainer}>
          <div className={styles.subContainer}>
            <div>{t('Dashboard.Labels.price')} {previewSVLsInfo[index].price}</div> <div className={styles.tezosLogo}><TezosLogo /></div>
          </div>
          {previewSVLsInfo[index].stateNotMySVL[0] == false &&
            <div className={styles.subContainer}>
              <div>{t('Dashboard.Labels.requestFee')} {requestFee}</div> <div className={styles.tezosLogo}><TezosLogo /></div>
            </div>
          }
        </div>
      )}  
    </div>
  );
};

export default ChangeSVLPriceButton;