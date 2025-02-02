import styles from '../../styles/components/topNavBar/topNavBarButtons.module.css';
import { useTranslation } from "react-i18next";

const GoBackButton = (): JSX.Element => {

  const { t } = useTranslation();

  return (
    <div>
      <button
        className={styles.button}>
        {t('DataSVL.TopBar.dashboard')}
      </button>
    </div>
  );
}

export default GoBackButton;