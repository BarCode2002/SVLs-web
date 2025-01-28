import styles from '../../styles/components/topNavBar/topNavBarButtons.module.css';

const DownloadJSONButton = (): JSX.Element => {

  return (
    <div>
      <button
        className={styles.button}>
        Download JSON
      </button>
    </div>
  );
}

export default DownloadJSONButton;