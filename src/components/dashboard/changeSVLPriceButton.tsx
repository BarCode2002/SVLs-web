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
};

const ChangeSVLPriceButton = ({ previewSVLsInfo, setPreviewSVLsInfo, index }: ChangeSVLPriceButtonProps): JSX.Element => { 

  const { t } = useTranslation();

  const contractAddress = getsmartContractAddress();
  const [Tezos, setTezos] = useState<TezosToolkit | undefined>(undefined);
  const [step, setStep] = useState(0);
  const [initialPrice, setInitialPrice] = useState<number>(0);

  useEffect(() => {
    const initializedTezos = getTezos();
    setTezos(initializedTezos);
    setInitialPrice(previewSVLsInfo[index].price);
  }, []);
  
  const handleChangeSVLPrice = async () => { 
    if (step == 0) setStep(1)
    else {
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
            <div className={styles.price}>
              {previewSVLsInfo[index].price} tezos
            </div>
          )}
          <div className={styles.buttonsContainer}>
            {step == 0 ? (
              <button 
                className={styles.button}
                onClick={handleChangeSVLPrice}>
                {t('Dashboard.Labels.change')}
              </button>
            ) : (
              <div className={styles.confirmCancelButtonContainer}>
                <button 
                  className={styles.button}
                  onClick={handleChangeSVLPrice}>
                  {t('Dashboard.Labels.confirm')}
                </button>
                <button 
                  className={styles.button}
                  onClick={handleCancel}>
                  {t('Dashboard.Labels.cancel')}
                </button>
              </div>
            )}
          </div>
        </div>
        ) : (
          <div className={styles.price}>
           {t('Dashboard.Labels.price')} {previewSVLsInfo[index].price} tezos
          </div>
        )}
    </div>
  );
};

export default ChangeSVLPriceButton;