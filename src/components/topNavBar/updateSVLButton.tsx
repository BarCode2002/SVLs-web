import { useEffect, useState } from 'react';
import styles from '../../styles/components/topNavBar/topNavBarButtons.module.css';
import { checks } from '../../utils/checks.ts';
import { useTranslation } from "react-i18next";
import { TezosToolkit, WalletContract } from '@taquito/taquito';
import { getsmartContractAddress, getTezos } from '../../utils/wallet.ts';
import { createJSON } from '../../utils/createJSON.ts';
import axios from "axios";
import InvalidFieldsComponent from '../varied/invalidFieldsComponent.tsx';
import { ipfsUpload } from '../../utils/ip.ts';
import { PossibleDefectsJsonVersions, PossibleGeneralInformationJsonVersions, PossibleMaintenancesJsonVersions, PossibleModificationsJsonVersions, PossibleRepairsJsonVersions } from '../../utils/commonTypes.ts';

type UpdateSVLButtonProps = {
  numPreviousOwners: number;
  totalOwners: number;
  generalInformation: PossibleGeneralInformationJsonVersions[];
  maintenances: PossibleMaintenancesJsonVersions[];
  modifications: PossibleModificationsJsonVersions[];
  defects: PossibleDefectsJsonVersions[];
  repairs: PossibleRepairsJsonVersions[];
  svl_pk: string;
  jsonVersion: string[];
};

const UpdateSVLButton = ({ numPreviousOwners, totalOwners, generalInformation, maintenances, modifications, defects, repairs, svl_pk, jsonVersion }: UpdateSVLButtonProps): JSX.Element => {

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

  const handleUpdateSVL = async () => {
    const updatedInvalidFields = await checks(0, totalOwners-numPreviousOwners, numPreviousOwners, generalInformation, maintenances, modifications, defects, repairs); 
    if (updatedInvalidFields.length > 0) {
      setInvalidFields(updatedInvalidFields);
      setInvalidFieldsVisible(true);
      return;
    }
    const formData = new FormData();
    let cids = []; 
    let noCids = true;
    for (let i = numPreviousOwners; i < totalOwners; i++) {
      const json = createJSON(i-numPreviousOwners, generalInformation, maintenances, modifications, defects, repairs, jsonVersion[i]);
      const blob = new Blob([json], { type: "application/json" });
      formData.append("file", blob);
      noCids = false;
    }
    if (!noCids) {
      try {
        const response = await axios.post(ipfsUpload, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        cids = response.data.cids;
        if (cids.length > 0) {
          try {
            const contract: WalletContract = await Tezos!.wallet.at(contractAddress!);
            const op = await contract.methodsObject.update({
              svl_key: svl_pk, 
              curr_owner_info: cids,
            }).send();
            await op.confirmation();   
          } catch (error) {
            console.log('error:', error);
          }
        }
      } catch (error) {
        console.error("Upload failed:", error);
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
      {invalidFieldsVisible &&
        <InvalidFieldsComponent invalidFields={invalidFields} setInvalidFieldsVisible={setInvalidFieldsVisible} />
      }
    </div>
  );
}

export default UpdateSVLButton;