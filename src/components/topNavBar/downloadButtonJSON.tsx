import styles from '../../styles/components/topNavBar/topNavBarButtons.module.css';
import { useTranslation } from "react-i18next";

const DownloadJSONButton = (): JSX.Element => {

  const { t } = useTranslation();

  return (
    <div>
      <button
        className={styles.button}>
        {t('DataSVL.TopBar.downloadJSON')}
      </button>
    </div>
  );
}

export default DownloadJSONButton;