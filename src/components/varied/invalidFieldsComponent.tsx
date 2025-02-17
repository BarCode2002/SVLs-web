import styles from '../../styles/components/varied/invalidFieldsComponents.module.css';
import { useTranslation } from "react-i18next";

type InvalidFieldsComponentProps = {
  invalidFields: string[];
  setInvalidFieldsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const InvalidFieldsComponent = ({ invalidFields, setInvalidFieldsVisible }: InvalidFieldsComponentProps) => {

  const { t } = useTranslation();

  const closeInvalidFieldsComponent = () => {
    setInvalidFieldsVisible(false);
  }
  
  return (
    <div className={styles.invalidFieldsContainer}>
      <div className={styles.invalidFields}>
        {invalidFields.map((field, index) => (
          <div key={index} className={styles.invalidField}>
            <div>{field}</div>
          </div>
        ))}
        <div className={styles.closeButtonContainer}>
          <button
            className={styles.closeButton}
            onClick={closeInvalidFieldsComponent}>
            {t('DataSVL.TopBar.close')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvalidFieldsComponent;