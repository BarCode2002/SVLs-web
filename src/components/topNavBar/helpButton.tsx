import styles from '../../styles/components/topNavBar/topNavBarButtons.module.css';

const HelpButton = (): JSX.Element => {

  const handleOpenHelp = async () => {
    window.open('/help', '_blank');
  };

  return (
    <div>
      <button
        className={styles.button}
        onClick={handleOpenHelp}>
        Ayuda
      </button>
    </div>
  );
}

export default HelpButton;