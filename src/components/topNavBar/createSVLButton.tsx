import styles from '../../styles/components/topNavBar/topNavBarButtons.module.css';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";

const CreateSVLButton = (): JSX.Element => {

  const navigate = useNavigate();
  const { t } = useTranslation(); 

  const handleRouteSVLData = async () => {
    navigate('/data'); 
  };

  return (
    <div>
      <button
        className={styles.button}
        onClick={handleRouteSVLData}>
        {t('DataSVL.TopBar.createSVL')}
      </button>
    </div>
  );
}

export default CreateSVLButton;