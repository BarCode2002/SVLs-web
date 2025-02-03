import { SetStateAction } from 'react';
import styles from '../../../styles/components/dataSVL/fields/inputField.module.css';

type InputFieldProps = {
  fieldLabel: string;
  placeholder: string;
  selectedOwner: number;
  selectedGroup: number;
  selectedGroupType: number;
  dataSVL: any;
  value: string;
  setDataSVL: React.Dispatch<SetStateAction<any>>;
  type: string;
}

const InputField = ({ fieldLabel, placeholder, selectedOwner, selectedGroup, selectedGroupType, dataSVL, value, setDataSVL, type }: InputFieldProps) => {
  
  const validateInputAndUpdateValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    let re: RegExp;
    if (type == 'year' || type == 'kilometers' || type == 'weight' || type == 'horsepower' || type == 'autonomy') {
      re = /^\d*$/;
    } 
    else if (type == 'engine' || type == 'VIN') {
      re = /^/;
    }
    else {
      re = /^[a-zA-Z\s-]+$/;
    }
    if (e.target.value == "" || re.test(e.target.value)) {
      const updateSVLdata = [...dataSVL];
      if (selectedGroup == -1 && selectedGroupType == -1) updateSVLdata[selectedOwner][type] = e.target.value;
      else if (selectedGroup != -1 && selectedGroupType == -1) updateSVLdata[selectedOwner].group[selectedGroup][type] = e.target.value;
      else updateSVLdata[selectedOwner].group[selectedGroup].type[selectedGroupType][type] = e.target.value;
      setDataSVL(updateSVLdata);
    }
  };

  return (
    <div className={styles.fieldContainer}>
      {fieldLabel != '' &&
        <div className={styles.fieldLabel}>
          {fieldLabel}
        </div>
      }
      <input
        className={styles.inputField} 
        placeholder={placeholder}
        value={value}
        onChange={validateInputAndUpdateValue}
      />
    </div>
  );
};

export default InputField;