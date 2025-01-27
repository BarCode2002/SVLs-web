import styles from '../../styles/components/topNavBar/topNavBarButtons.module.css';

const MintSVLButton = (): JSX.Element => {

  return (
    <div>
      <button
        className={styles.button}>
        Mint SVL
      </button>
    </div>
  );
}

export default MintSVLButton;