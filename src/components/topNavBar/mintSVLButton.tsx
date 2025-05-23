import styles from '../../styles/components/topNavBar/topNavBarButtons.module.css';
import { useTranslation } from "react-i18next";
import { TezosToolkit, WalletContract } from "@taquito/taquito";
import { getTezos, getsmartContractAddress } from '../../utils/wallet.ts'
import { createJSON } from '../../utils/createJSON.ts';
import { formatInTimeZone } from 'date-fns-tz';
import axios from "axios";
import { useEffect, useState } from 'react';
import { checks } from '../../utils/checks.ts';
import InvalidFieldsComponent from '../varied/invalidFieldsComponent.tsx';
import { ipfsUpload, mongoSmartContract } from '../../utils/ip.ts';
import { PossibleDefectsJsonVersions, PossibleGeneralInformationJsonVersions, PossibleMaintenancesJsonVersions, PossibleModificationsJsonVersions, PossibleRepairsJsonVersions } from '../../utils/commonTypes.ts';

type MintSVLButtonProps = {
  numPreviousOwners: number;
  totalOwners: number;
  generalInformation: PossibleGeneralInformationJsonVersions[];
  maintenances: PossibleMaintenancesJsonVersions[];
  modifications: PossibleModificationsJsonVersions[];
  defects: PossibleDefectsJsonVersions[];
  repairs: PossibleRepairsJsonVersions[];
  jsonVersion: string[];
};

const MintSVLButton = ({ numPreviousOwners, totalOwners, generalInformation, maintenances, modifications, defects, repairs, jsonVersion }: MintSVLButtonProps): JSX.Element => {

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
      const json = createJSON(i, generalInformation, maintenances, modifications, defects, repairs, jsonVersion[i]);
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
    try {
      const response = await axios.get(mongoSmartContract);
      mintPrice = response.data.mintPrice;
    } catch (error) {
      console.error("Upload failed:", error);
    }
    if (cids.length > 0) {
      try {
        const now = new Date();
        const formattedUTC = formatInTimeZone(now, 'UTC', "dd MM yyyy HH:mm:ss");
        const svl_key = `${formattedUTC} ${localStorage.getItem('address')}`;
        const contract: WalletContract = await Tezos!.wallet.at(contractAddress!);
        const op = await contract.methodsObject.mint({
          svl_key: svl_key, 
          curr_owner_info: cids,
        }).send({amount: mintPrice});
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
      {invalidFieldsVisible &&
        <InvalidFieldsComponent invalidFields={invalidFields} setInvalidFieldsVisible={setInvalidFieldsVisible} />
      }
    </div>
  );
}

export default MintSVLButton;