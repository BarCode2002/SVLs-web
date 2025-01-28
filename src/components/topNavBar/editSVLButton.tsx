import styles from '../../styles/components/topNavBar/topNavBarButtons.module.css';

const EditSVLButton = (): JSX.Element => {

  return (
    <div>
      <button
        className={styles.button}>
        Edit SVL
      </button>
    </div>
  );
}

export default EditSVLButton;