import styles from '../../styles/components/topNavBar/topNavBarButtons.module.css';
import { GeneralInformation, Maintenances, Modifications, Defects, Repairs } from '../../utils/dataSVL';
import { createJSON } from '../../utils/createJSON';
import { useTranslation } from "react-i18next";

type DownloadJSONButtonProps = {
  selectedOwner: number;
  generalInformation: GeneralInformation[];
  maintenances: Maintenances[];
  modifications: Modifications[];
  defects: Defects[];
  repairs: Repairs[];
};

const DownloadJSONButton = ({ selectedOwner, generalInformation, maintenances, modifications, defects, repairs }: DownloadJSONButtonProps): JSX.Element => {

  const { t } = useTranslation();

  const handleDownloadJSON = () => {
    const json = createJSON(selectedOwner, generalInformation, maintenances, modifications, defects, repairs);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "myJSON.json";
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
    </div>
  );
}

export default DownloadJSONButton;