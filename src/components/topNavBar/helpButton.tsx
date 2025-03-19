import { t } from 'i18next';
import styles from '../../styles/components/topNavBar/topNavBarButtons.module.css';
import { useState } from 'react';
import { NewTabIcon, NewTabIconHovered } from '../../assets/newTab';

const HelpButton = (): JSX.Element => {

  const [hovered, isHovered] = useState(false);

  const handleOpenHelp = async () => {
    window.open('/help', '_blank');
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