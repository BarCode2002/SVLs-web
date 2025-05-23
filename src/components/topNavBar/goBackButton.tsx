import styles from '../../styles/components/topNavBar/topNavBarButtons.module.css';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";

const GoBackButton = (): JSX.Element => {

  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleRouteDashboard = async () => {
    navigate('/'); 
  };

  return (
    <div>
      <button
        className={styles.button}
        onClick={handleRouteDashboard}>
        {t('DataSVL.TopBar.dashboard')}
      </button>
    </div>
  );
}

export default GoBackButton;