import { SetStateAction } from 'react';
import styles from '../../../styles/components/dataSVL/fields/inputTextField.module.css';

type InputTextFieldProps = {
  fieldLabel: string;
  placeholder: string;
  selectedOwner: number;
  dataSVL: any;
  value: string;
  setDataSVL: React.Dispatch<SetStateAction<any>>;
  formType: string;
  id: number;
}

const InputTextField = ({ fieldLabel, placeholder, selectedOwner, dataSVL, value, setDataSVL, formType, id }: InputTextFieldProps) => {

  const updateValue = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const updateSVLdata = [...dataSVL];
    if (id != -1) {
      updateSVLdata[selectedOwner][formType][id] = e.target.value;
    } else {
      updateSVLdata[selectedOwner][formType] = e.target.value;
    }
    setDataSVL(updateSVLdata);
  }

  return (
    <div className={styles.textFieldContainer}>
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

export default InputTextField;