import { SetStateAction } from 'react';
import styles from '../../styles/components/topNavBar/topNavBarButtons.module.css';
import { GeneralInformation, Maintenances, Modifications, Defects, Repairs } from '../../utils/dataSVL';
import { useTranslation } from "react-i18next";

type UploadSONButtonProps = {
  selectedOwner: number;
  generalInformation: GeneralInformation[];
  setGeneralInformation: React.Dispatch<SetStateAction<GeneralInformation[]>>;
  maintenances: Maintenances[];
  setMaintenances: React.Dispatch<SetStateAction<Maintenances[]>>;
  modifications: Modifications[];
  setModifications: React.Dispatch<SetStateAction<Modifications[]>>;
  defects: Defects[];
  setDefects: React.Dispatch<SetStateAction<Defects[]>>;
  repairs: Repairs[];
  setRepairs: React.Dispatch<SetStateAction<Repairs[]>>;
};

const UploadJSONButton = ({ selectedOwner, generalInformation, setGeneralInformation, maintenances, setMaintenances, modifications, setModifications, defects, setDefects, repairs, setRepairs }: UploadSONButtonProps): JSX.Element => {

  const { t } = useTranslation();

    const handleJSONUpload = () => {
      
    };

  return (
    <div>
      <button 
        className={styles.button} 
        onClick={() => document.getElementById('json-upload')!.click()}>
        {t('DataSVL.TopBar.uploadJSON')}
      </button>
      <input 
        type="file" 
        multiple={false}
        onChange={handleJSONUpload}
        id='json-upload'
        style={{ display: 'none' }}
      />
    </div>
  );
}

export default UploadJSONButton;