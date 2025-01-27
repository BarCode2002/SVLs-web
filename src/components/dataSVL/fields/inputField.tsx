import { SetStateAction } from 'react';
import styles from '../../../styles/components/dataSVL/fields/inputField.module.css';
import { GeneralInformation, Modifications, Maintenances, Defects, Repairs } from '../../../utils/interfaces/dataSVL.ts';

type InputFieldProps = {
  fieldLabel: string;
  placeholder: string;
  selectedOwner: number;
  form: GeneralInformation[] | Modifications[] | Maintenances[] | Defects[] | Repairs[];
  value: string;
  setForm: React.Dispatch<SetStateAction<GeneralInformation[] | Modifications[] | Maintenances[] | Defects[] | Repairs[]>>;
  formType: string;
  id: number;
}

const InputField = ({ fieldLabel, placeholder, selectedOwner, form, value, setForm, formType, id }: InputFieldProps) => {
  
  const validateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      const updatedForm = [...form];
      if (id !== -1) updatedForm[selectedOwner][formType][id] = e.target.value;
      else updatedForm[selectedOwner][formType] = e.target.value;
      setForm(updatedForm);
    }
  };

  return (
    <div className={styles.fieldContainer}>
      <div className={styles.fieldLabel}>
        {fieldLabel}
      </div>
      <input
        className={styles.inputField} 
        placeholder={placeholder}
        value={value}
        onChange={validateInput}
      />
    </div>
  );
};

export default InputField;