import styles from '../../styles/components/varied/invalidFieldsComponents.module.css';

type InvalidFieldsComponentProps = {
  invalidFields: string[];
  setInvalidFieldsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const InvalidFieldsComponent = ({ invalidFields, setInvalidFieldsVisible }: InvalidFieldsComponentProps) => {

  const closeInvalidFieldsComponent = () => {
    setInvalidFieldsVisible(false);
  }
  
  return (
    <div className={styles.invalidFieldsContainer}>
      <div className={styles.closeButtonContainer}>   
        <button
          className={styles.closeButton}
          onClick={closeInvalidFieldsComponent}>
          X
        </button>
      </div>
      <div className={styles.invalidFields}>
        {invalidFields.map((field, index) => (
          <div key={index} className={styles.invalidField}>
            <div>{field}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InvalidFieldsComponent;