import styles from '../../styles/components/topNavBar/topNavBarButtons.module.css';
import { createJSON } from '../../utils/createJSON';
import { useTranslation } from "react-i18next";
import { checks } from '../../utils/checks';
import InvalidFieldsComponent from '../varied/invalidFieldsComponent';
import { useState } from 'react';
import { PossibleDefectsJsonVersions, PossibleGeneralInformationJsonVersions, PossibleMaintenancesJsonVersions, PossibleModificationsJsonVersions, PossibleRepairsJsonVersions } from '../../utils/commonTypes';

type DownloadJSONButtonProps = {
  selectedOwner: number;
  numPreviousOwners: number;
  generalInformation: PossibleGeneralInformationJsonVersions[];
  maintenances: PossibleMaintenancesJsonVersions[];
  modifications: PossibleModificationsJsonVersions[];
  defects: PossibleDefectsJsonVersions[];
  repairs: PossibleRepairsJsonVersions[];
  jsonVersion: string;
};

const DownloadJSONButton = ({ selectedOwner, numPreviousOwners, generalInformation, maintenances, modifications, defects, repairs, jsonVersion }: DownloadJSONButtonProps): JSX.Element => {

  const { t } = useTranslation();
  const [invalidFieldsVisible, setInvalidFieldsVisible] = useState(false);
  const [invalidFields, setInvalidFields] = useState<string[]>([]);

  const handleDownloadJSON = async () => {
    const updatedInvalidFields = await checks(selectedOwner-numPreviousOwners, selectedOwner-numPreviousOwners+1 ,numPreviousOwners, generalInformation, maintenances, modifications, defects, repairs); 
    if (updatedInvalidFields.length > 0) {
      setInvalidFields(updatedInvalidFields);
      setInvalidFieldsVisible(true);
      return;
    }
    const json = createJSON(selectedOwner-numPreviousOwners, generalInformation, maintenances, modifications, defects, repairs, jsonVersion);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${t('DataSVL.Placeholders.owner')}_${selectedOwner+1}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <button
        className={styles.button}
        onClick={handleDownloadJSON}>
        {t('DataSVL.TopBar.downloadJSON')}
      </button>
      {invalidFieldsVisible &&
        <InvalidFieldsComponent invalidFields={invalidFields} setInvalidFieldsVisible={setInvalidFieldsVisible} />
      }
    </div>
  );
}

export default DownloadJSONButton;