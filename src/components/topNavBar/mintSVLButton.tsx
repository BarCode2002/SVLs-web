import styles from '../../styles/components/topNavBar/topNavBarButtons.module.css';
import { useTranslation } from "react-i18next";
import { GeneralInformation, Maintenances, Modifications, Defects, Repairs } from '../../utils/interfaces.ts';
import { TezosToolkit, WalletContract } from "@taquito/taquito";
import { getTezos, getsmartContractAddress } from '../../utils/wallet.ts'
import { createJSON } from '../../utils/createJSON.ts';
import { format } from 'date-fns';
import axios from "axios";
import { useEffect, useState } from 'react';
import { checks } from '../../utils/checks.ts';
import InvalidFieldsComponent from '../varied/invalidFieldsComponent.tsx';
import { ipfsUpload, mongoSmartContract } from '../../utils/ip.ts';

type MintSVLButtonProps = {
  numPreviousOwners: number;
  totalOwners: number;
  generalInformation: GeneralInformation[];
  maintenances: Maintenances[];
  modifications: Modifications[];
  defects: Defects[];
  repairs: Repairs[];
};

const MintSVLButton = ({ numPreviousOwners, totalOwners, generalInformation, maintenances, modifications, defects, repairs }: MintSVLButtonProps): JSX.Element => {

  const { t } = useTranslation();

  const [contractAddress, setContractAddress] = useState<string | undefined>();
  const [Tezos, setTezos] = useState<TezosToolkit | undefined>(undefined);
  const [invalidFieldsVisible, setInvalidFieldsVisible] = useState(false);
  const [invalidFields, setInvalidFields] = useState<string[]>([]);
  
  useEffect(() => {
    const initializedContractAddress = getsmartContractAddress();
    const initializedTezos = getTezos();
    setContractAddress(initializedContractAddress);
    setTezos(initializedTezos);
  }, []);

  const handleMintSVL = async () => {
    const updatedInvalidFields = await checks(0, totalOwners-numPreviousOwners, numPreviousOwners, generalInformation, maintenances, modifications, defects, repairs); 
    if (updatedInvalidFields.length > 0) {
      setInvalidFields(updatedInvalidFields);
      setInvalidFieldsVisible(true);
      return;
    }
    const formData = new FormData();
    let cids = [];
    let mintPrice;
    for (let i = 0; i < totalOwners; i++) {
      const json = createJSON(i, generalInformation, maintenances, modifications, defects, repairs);
      const blob = new Blob([json], { type: "application/json" });
      formData.append("file", blob);
    }
    try {
      const response = await axios.post(ipfsUpload, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      cids = response.data.cids;
    } catch (error) {
      console.error("Upload failed:", error);
    }
    console.log(cids);
    try {
      const response = await axios.get(mongoSmartContract);
      mintPrice = response.data.mintPrice;
    } catch (error) {
      console.error("Upload failed:", error);
    }
    try {
      const time = format(new Date(), 'dd MM yyyy HH:mm:ss');
      const svl_key = `${time} ${localStorage.getItem('address')}`;
      const contract: WalletContract = await Tezos!.wallet.at(contractAddress!);
      const op = await contract.methodsObject.mint({
        svl_key: svl_key, 
        VIN: generalInformation[0].VIN,
        curr_owner_info: cids,
      }).send({amount: mintPrice});
      await op.confirmation();   
    } catch (error) {
      console.log('error:', error);
    }
    
  };

  return (
    <div>
      <button
        className={styles.button}
        onClick={handleMintSVL}>
        {t('DataSVL.TopBar.mintSVL')}
      </button>
      {invalidFieldsVisible &&
        <InvalidFieldsComponent invalidFields={invalidFields} setInvalidFieldsVisible={setInvalidFieldsVisible} />
      }
    </div>
  );
}

export default MintSVLButton;