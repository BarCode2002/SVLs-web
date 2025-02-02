import styles from '../../styles/components/topNavBar/topNavBarButtons.module.css';
import { useTranslation } from "react-i18next";

const UploadJSONButton = (): JSX.Element => {

  const { t } = useTranslation();

  return (
    <div>
      <button
        className={styles.button}>
        {t('DataSVL.TopBar.uploadJSON')}
      </button>
    </div>
  );
}

export default UploadJSONButton;