import styles from '../../styles/components/topNavBar/topNavBarButtons.module.css';

const GoBackButton = (): JSX.Element => {

  return (
    <div>
      <button
        className={styles.button}>
        {'<'}
      </button>
    </div>
  );
}

export default GoBackButton;