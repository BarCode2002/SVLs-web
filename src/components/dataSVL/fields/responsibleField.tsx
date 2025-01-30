import { SetStateAction } from 'react';
import styles from '../../../styles/components/dataSVL/fields/responsibleField.module.css';

type ResponsibleFieldProps = {
  fieldLabel: string;
  placeholder: string;
  selectedOwner: number;
  selectedGroup: number;
  dataSVL: any;
  value: [boolean, string, boolean, string];
  setDataSVL: React.Dispatch<SetStateAction<any>>;
  type: string;
}

const ResponsibleField = ({ fieldLabel, placeholder, selectedOwner, selectedGroup, dataSVL, value, setDataSVL, type }: ResponsibleFieldProps) => {

  const updateValue = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const updateSVLdata = [...dataSVL];
    setDataSVL(updateSVLdata);
  }

  return (
    <div className={styles.responsibleFieldContainer}>
      <div className={styles.fieldLabel}>
        {fieldLabel}
      </div>
      <textarea
        className={styles.textField} 
        placeholder={placeholder}
        rows={5}
        value={value}
        onChange={updateValue}
      />
    </div>
  );
};

export default ResponsibleField;