import styles from '../../styles/components/topNavBar/topNavBarButtons.module.css';

const GoBackButton = (): JSX.Element => {

  return (
    <div>
      <button
        className={styles.button}>
        Dashboard
      </button>
    </div>
  );
}

export default GoBackButton;