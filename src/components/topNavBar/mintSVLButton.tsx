import styles from '../../styles/components/topNavBar/topNavBarButtons.module.css';
import { useTranslation } from "react-i18next";
import { GeneralInformation, Maintenances, Modifications, Defects, Repairs } from '../../utils/interfaces.ts';
import { TezosToolkit, WalletContract } from "@taquito/taquito";
import { getTezos, getsmartContractAddress } from '../../utils/wallet.ts'
import { createJSON } from '../../utils/createJSON.ts';
import { format } from 'date-fns';
import axios from "axios";
import { useEffect, useState } from 'react';
import { PHOTOGRAPHS_SIZE } from '../../utils/constants.ts';

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
      if (generalInformation[i].VIN == '') {
        console.log(`Owner ${i+1} has not set the VIN field in General information`);
        return false;
      }
      else if (generalInformation[i].brand == t('DataSVL.Forms.brand')) {
        console.log(`Owner ${i+1} has not set the brand field in General information`);
        return false;
      }
      else if (generalInformation[i].model == t('DataSVL.Forms.model')) {
        console.log(`Owner ${i+1} has not set the model field in General information`);
        return false;
      }
      else if (generalInformation[i].year == '') {
        console.log(`Owner ${i+1} has not set the year field in General information`);
        return false;
      }
      else if (generalInformation[i].mainPhotograph == '') {
        console.log(`Owner ${i+1} has not set the main image field in General information`);
        return false;
      }
      else if (generalInformation[i].mainPhotograph[4] == ':') {
        console.log(`Owner ${i+1} has not saved the main image field in General information`);
        return false;
      }
      for (let j = 0; j < PHOTOGRAPHS_SIZE; j++) {
        if (generalInformation[i].photographs[j][4] == ':') {
          console.log(`Owner ${i+1} has not saved the images field in General information`);
          return false;
        }
      }
      for (let j = 0; j < maintenances[i].group.length; j++) {
        if (maintenances[i].group[j].responsible[3][4] == ':') {
          console.log(`Owner ${i+1} has not saved the proof in responsible field for group ${j+1} in Maintenances`);
          return false;
        }
        for (let k = 0; k < PHOTOGRAPHS_SIZE; k++) {
          if (maintenances[i].group[j].pre[k][4] == ':') {
            console.log(`Owner ${i+1} has not saved the previous images field for group ${j+1} in Maintenances`);
            return false;
          } else if (maintenances[i].group[k].post[k][4] == ':') {
            console.log(`Owner ${i+1} has not saved the posterior images field for group ${j+1} in Maintenances`);
            return false;
          }
        }
        for (let l = 0; l < maintenances[i].group[j].type.length; j++) {
          for (let z = 0; z < PHOTOGRAPHS_SIZE; z++) {
            if (maintenances[i].group[j].type[l].pre[z][4] == ':') {
              console.log(`Owner ${i+1} has not saved the previous images field for group ${j+1} and type ${l} in Maintenances`);
              return false;
            }
            if (maintenances[i].group[j].type[l].post[z][4] == ':') {
              console.log(`Owner ${i+1} has not saved the posterior images field for group ${j+1} and type ${l} in Maintenances`);
              return false;
            }
          }
        }
      }
      for (let j = 0; j < modifications[i].group.length; j++) {
        if (modifications[i].group[j].responsible[3][4] == ':') {
          console.log(`Owner ${i+1} has not saved the proof in responsible field for group ${j+1} in Modifications`);
          return false;
        }
        for (let k = 0; k < PHOTOGRAPHS_SIZE; k++) {
          if (modifications[i].group[j].pre[k][4] == ':') {
            console.log(`Owner ${i+1} has not saved the previous images field for group ${j+1} in Modifications`);
            return false;
          } else if (modifications[i].group[k].post[k][4] == ':') {
            console.log(`Owner ${i+1} has not saved the posterior images field for group ${j+1} in Modifications`);
            return false;
          }
        }
        for (let l = 0; l < modifications[i].group[j].type.length; j++) {
          for (let z = 0; z < PHOTOGRAPHS_SIZE; z++) {
            if (modifications[i].group[j].type[l].pre[z][4] == ':') {
              console.log(`Owner ${i+1} has not saved the previous images field for group ${j+1} and type ${l} in Modifications`);
              return false;
            }
            if (modifications[i].group[j].type[l].post[z][4] == ':') {
              console.log(`Owner ${i+1} has not saved the posterior images field for group ${j+1} and type ${l} in Modifications`);
              return false;
            }
          }
        }
      }
      for (let j = 0; j < defects[i].group.length; j++) {
        for (let l = 0; l < defects[i].group[j].type.length; j++) {
          for (let z = 0; z < PHOTOGRAPHS_SIZE; z++) {
            if (defects[i].group[j].type[l].photographs[z][4] == ':') {
              console.log(`Owner ${i+1} has not saved the images field for group ${j+1} and type ${l} in Defects`);
              return false;
            }
          }
        }
      }
      for (let j = 0; j < repairs[i].group.length; j++) {
        if (repairs[i].group[j].responsible[3][4] == ':') {
          console.log(`Owner ${i+1} has not saved the proof in responsible field for group ${j+1} in Repairs`);
          return false;
        }
        for (let k = 0; k < PHOTOGRAPHS_SIZE; k++) {
          if (repairs[i].group[j].pre[k][4] == ':') {
            console.log(`Owner ${i+1} has not saved the previous images field for group ${j+1} in Repairs`);
            return false;
          } else if (repairs[i].group[k].post[k][4] == ':') {
            console.log(`Owner ${i+1} has not saved the posterior images field for group ${j+1} in Repairs`);
            return false;
          }
        }
        for (let l = 0; l < repairs[i].group[j].type.length; j++) {
          for (let z = 0; z < PHOTOGRAPHS_SIZE; z++) {
            if (repairs[i].group[j].type[l].pre[z][4] == ':') {
              console.log(`Owner ${i+1} has not saved the previous images field for group ${j+1} and type ${l} in Repairs`);
              return false;
            }
            if (repairs[i].group[j].type[l].post[z][4] == ':') {
              console.log(`Owner ${i+1} has not saved the posterior images field for group ${j+1} and type ${l} in Repairs`);
              return false;
            }
          }
        }
      }
    }
    return true;
  };

  const handleMintSVL = async () => {
    if (checksBeforeMintSVL()) {
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
      try {
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
      }
    }
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