import { SetStateAction } from 'react';
import styles from '../../../styles/components/dataSVL/fields/inputGroupTypeField.module.css';

type InputGroupTypeFieldProps  = {
  placeholder: string;
  selectedOwner: number;
  dataSVL: any;
  value: string;
  setDataSVL: React.Dispatch<SetStateAction<any>>;
  formType: string;
  id: number;
}

const InputGroupTypeField = ({ placeholder, selectedOwner, dataSVL, value, setDataSVL, formType, id }: InputGroupTypeFieldProps) => {
  
  const validateInputAndUpdateValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    let re: RegExp;
    if (formType == 'year' || formType == 'kilometers' || formType == 'weight' || formType == 'horsepower') {
      re = /^\d*$/;
    } 
    else if (formType == 'engine' || formType == 'VIN') {
      re = /^/;
    }
    else {
      re = /^[a-zA-Z\s-]+$/;
    }
    if (e.target.value == "" || re.test(e.target.value)) {
      const updateSVLdata = [...dataSVL];
      if (id !== -1) updateSVLdata[selectedOwner][formType][id] = e.target.value;
      else updateSVLdata[selectedOwner][formType] = e.target.value;
      setDataSVL(updateSVLdata);
    }
  };

  return (
    <div className={styles.fieldContainer}>
      <input
        className={styles.inputField} 
        placeholder={placeholder}
        value={value}
        onChange={validateInputAndUpdateValue}
      />
    </div>
  );
};

export default InputGroupTypeField;