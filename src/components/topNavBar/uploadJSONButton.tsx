import styles from '../../styles/components/topNavBar/topNavBarButtons.module.css';

const UploadJSONButton = (): JSX.Element => {

  return (
    <div>
      <button
        className={styles.button}>
        Upload JSON
      </button>
    </div>
  );
}

export default UploadJSONButton;