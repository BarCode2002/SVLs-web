import styles from '../../styles/components/topNavBar/topNavBarButtons.module.css';
import { useTranslation } from "react-i18next";
import { GeneralInformation, Maintenances, Modifications, Defects, Repairs } from '../../utils/interfaces';
import { createJSON } from '../../utils/createJSON';
import axios from "axios";

type MintSVLButtonProps = {
  selectedOwner: number;
  generalInformation: GeneralInformation[];
  maintenances: Maintenances[];
  modifications: Modifications[];
  defects: Defects[];
  repairs: Repairs[];
};

const MintSVLButton = ({ selectedOwner, generalInformation, maintenances, modifications, defects, repairs }: MintSVLButtonProps): JSX.Element => {

  const { t } = useTranslation();

    const handleMintSVL = async () => {
      const json = createJSON(selectedOwner, generalInformation, maintenances, modifications, defects, repairs);
      const blob = new Blob([json], { type: "application/json" });
      const formData = new FormData();
      formData.append("file", blob);
      try {
        const response = await axios.post("http://127.0.0.1:3000/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log("Upload successful:", response.data);
      } catch (error) {
        console.error("Upload failed:", error);
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