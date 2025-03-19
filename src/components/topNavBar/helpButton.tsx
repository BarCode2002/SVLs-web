import { t } from 'i18next';
import styles from '../../styles/components/topNavBar/topNavBarButtons.module.css';
import { NewTabIcon, NewTabIconHovered } from '../../assets/newTab';
import { useState } from 'react';

const HelpButton = (): JSX.Element => {

  const [hovered, isHovered] = useState(false);

  const handleOpenHelp = async () => {
    let language = localStorage.getItem('language');
    if (language != null) language = language.split(".").pop()!;
    else language = 'es';
    window.open(`/help/${language}`, '_blank');
  };

  return (
    <div>
      <button
        onMouseEnter={() => isHovered(true)}
        onMouseLeave={() => isHovered(false)}
        className={styles.button}
        onClick={handleOpenHelp}>
        {t('DataSVL.TopBar.help')} {hovered ? <NewTabIconHovered /> : <NewTabIcon />}
      </button>
    </div>
  );
}

export default HelpButton;