import styles from '../../styles/components/topNavBar/topNavBarButtons.module.css';
import { useTranslation } from "react-i18next";
import { GeneralInformation, Maintenances, Modifications, Defects, Repairs } from '../../utils/interfaces.ts';
import { TezosToolkit, WalletContract } from "@taquito/taquito";
import { getTezos, getsmartContractAddress } from '../../utils/wallet.ts'
import { createJSON } from '../../utils/createJSON.ts';
import { format } from 'date-fns';
import axios from "axios";
import { useEffect, useState } from 'react';

type MintSVLButtonProps = {
  totalOwners: number;
  generalInformation: GeneralInformation[];
  maintenances: Maintenances[];
  modifications: Modifications[];
  defects: Defects[];
  repairs: Repairs[];
};

const MintSVLButton = ({ totalOwners, generalInformation, maintenances, modifications, defects, repairs }: MintSVLButtonProps): JSX.Element => {

  const { t } = useTranslation();

  const [contractAddress, setContractAddress] = useState<string | undefined>();
  const [Tezos, setTezos] = useState<TezosToolkit | undefined>(undefined);
  
  useEffect(() => {
    const initializedContractAddress = getsmartContractAddress();
    const initializedTezos = getTezos();
    setContractAddress(initializedContractAddress);
    setTezos(initializedTezos);
  }, []);

  const checksBeforeMintSVL = () => {
    for (let i = 0; i < totalOwners; i++) {
      if (generalInformation[i].VIN == '') console.log(`Owner ${i+1} has not set the VIN`);
      else if (generalInformation[i].brand == t('DataSVL.Forms.brand')) console.log(`Owner ${i+1} has not set the brand`);
      else if (generalInformation[i].model == t('DataSVL.Forms.model')) console.log(`Owner ${i+1} has not set the model`);
      else if (generalInformation[i].year == '') console.log(`Owner ${i+1} has not set the year`);
      else if (generalInformation[i].mainPhotograph == '') console.log(`Owner ${i+1} has not set the main image`);
      else if (generalInformation[i].mainPhotograph[4] == ':') console.log(`Owner ${i+1} has not saved the main image`);
      for (let j = 0; j < generalInformation[i].photographs.length; j++) {
        if (generalInformation[i].photographs[j][4] == ':') {
          console.log(`Owner ${i+1} has not saved the images`);
          break;
        }
      }
      //lo mismo para las fotos de los mantenimientos, modificaciones y defectos
    }
  };

  const handleMintSVL = async () => {
    checksBeforeMintSVL();
    const formData = new FormData();
    let cids = [];
    for (let i = 0; i < totalOwners; i++) {
      const json = createJSON(i, generalInformation, maintenances, modifications, defects, repairs);
      const blob = new Blob([json], { type: "application/json" });
      formData.append("file", blob);
    }
    try {
      const response = await axios.post("http://127.0.0.1:3000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Upload successful:", response.data.cids);
      cids = response.data.cids;
    } catch (error) {
      console.error("Upload failed:", error);
    }
    /*try {
      const time = format(new Date(), 'dd MM yyyy HH:mm:ss');
      const svl_key = `${time} ${localStorage.getItem('address')}`;
      const contract: WalletContract = await Tezos!.wallet.at(contractAddress!);
      const op = await contract.methodsObject.mintSVL({
        svl_key: svl_key, 
        VIN: generalInformation[0].VIN,
        brand: generalInformation[0].brand,
        model: generalInformation[0].model,
        year: generalInformation[0].year,
        curr_owner_info: cids
      }).send();
      await op.confirmation();
    } catch (error) {
      console.log('error:', error);
    }*/
  };

  return (
    <div>
      <button
        className={styles.button}
        onClick={handleMintSVL}>
        {t('DataSVL.TopBar.mintSVL')}
      </button>
    </div>
  );
}

export default MintSVLButton;