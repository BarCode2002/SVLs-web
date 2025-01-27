import styles from '../../styles/components/bottomNavBar/bottomNavBarButtons.module.css';

const OwnerButton = (): JSX.Element => {

  return (
    <div>
      <button
        className={styles.button}>
        Owner
      </button>
    </div>
  );
}

export default OwnerButton;