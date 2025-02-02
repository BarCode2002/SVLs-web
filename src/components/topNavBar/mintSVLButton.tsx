import styles from '../../styles/components/topNavBar/topNavBarButtons.module.css';
import { useTranslation } from "react-i18next";

const MintSVLButton = (): JSX.Element => {

  const { t } = useTranslation();

  return (
    <div>
      <button
        className={styles.button}>
        {t('DataSVL.TopBar.mintSVL')}
      </button>
    </div>
  );
}

export default MintSVLButton;