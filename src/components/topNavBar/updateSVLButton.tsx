import { useEffect, useState } from 'react';
import styles from '../../styles/components/topNavBar/topNavBarButtons.module.css';
import { checksBeforeMintOrUpdateSVL } from '../../utils/mintUpdate.ts';
import { useTranslation } from "react-i18next";
import { TezosToolkit, WalletContract } from '@taquito/taquito';
import { getsmartContractAddress, getTezos } from '../../utils/wallet.ts';
import { GeneralInformation, Maintenances, Modifications, Defects, Repairs } from '../../utils/interfaces.ts';
import { createJSON } from '../../utils/createJSON.ts';
import axios from "axios";

type UpdateSVLButtonProps = {
  numPreviousOwners: number;
  totalOwners: number;
  generalInformation: GeneralInformation[];
  maintenances: Maintenances[];
  modifications: Modifications[];
  defects: Defects[];
  repairs: Repairs[];
  svl_pk: string;
};

const UpdateSVLButton = ({ numPreviousOwners, totalOwners, generalInformation, maintenances, modifications, defects, repairs, svl_pk }: UpdateSVLButtonProps): JSX.Element => {

  const { t } = useTranslation();

  const [contractAddress, setContractAddress] = useState<string | undefined>();
  const [Tezos, setTezos] = useState<TezosToolkit | undefined>(undefined);
  
  useEffect(() => {
    const initializedContractAddress = getsmartContractAddress();
    const initializedTezos = getTezos();
    setContractAddress(initializedContractAddress);
    setTezos(initializedTezos);
  }, []);

  const handleUpdateSVL = async () => {
    if (checksBeforeMintOrUpdateSVL(numPreviousOwners, totalOwners, generalInformation, maintenances, modifications, defects, repairs, t('DataSVL.Forms.brand'), t('DataSVL.Forms.model'))) {
      const formData = new FormData();
      let cids = []; 
      for (let i = numPreviousOwners; i < totalOwners; i++) {
        const json = createJSON(i-numPreviousOwners, generalInformation, maintenances, modifications, defects, repairs);
        const blob = new Blob([json], { type: "application/json" });
        formData.append("file", blob);
      }
      try {
        const response = await axios.post("http://127.0.0.1:3000/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        //console.log("Upload successful:", response.data.cids);
        cids = response.data.cids;
      } catch (error) {
        console.error("Upload failed:", error);
      }
      try {
        const contract: WalletContract = await Tezos!.wallet.at(contractAddress!);
        const op = await contract.methodsObject.update({
          svl_key: svl_pk, 
          VIN: generalInformation[0].VIN,
          curr_owner_info: cids,
        }).send();
        await op.confirmation();   
      } catch (error) {
        console.log('error:', error);
      }
    }
  };

  return (
    <div>
      <button
        className={styles.button}
        onClick={handleUpdateSVL}>
        {t('DataSVL.TopBar.editSVL')}
      </button>
    </div>
  );
}

export default UpdateSVLButton;