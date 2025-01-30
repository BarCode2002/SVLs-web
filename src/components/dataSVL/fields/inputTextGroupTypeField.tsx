import { SetStateAction } from 'react';
import styles from '../../../styles/components/dataSVL/fields/inputTextField.module.css';

type InputTextGroupTypeFieldProps = {
  placeholder: string;
  selectedOwner: number;
  dataSVL: any;
  value: string;
  setDataSVL: React.Dispatch<SetStateAction<any>>;
  formType: string;
  id: number;
}

const InputTextGroupTypeField = ({ placeholder, selectedOwner, dataSVL, value, setDataSVL, formType, id }: InputTextGroupTypeFieldProps) => {

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
      <textarea
        className={styles.textFieldGroupType} 
        placeholder={placeholder}
        rows={5}
        value={value}
        onChange={updateValue}
      />
    </div>
  );
};

export default InputTextGroupTypeField;