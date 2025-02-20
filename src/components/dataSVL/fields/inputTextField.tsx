import { SetStateAction } from 'react';
import styles from '../../../styles/components/dataSVL/fields/inputTextField.module.css';

type InputTextFieldProps = {
  fieldLabel: string;
  placeholder: string;
  selectedOwner: number;
  selectedGroup: number;
  selectedGroupType: number;
  dataSVL: any;
  value: string;
  setDataSVL: React.Dispatch<SetStateAction<any>>;
  type: string;
  editMode: boolean;
}

const InputTextField = ({ fieldLabel, placeholder, selectedOwner, selectedGroup, selectedGroupType, dataSVL, value, setDataSVL, type, editMode }: InputTextFieldProps) => {

  const updateValue = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const updateSVLdata = [...dataSVL];
    if (selectedGroup == -1 && selectedGroupType == -1) updateSVLdata[selectedOwner][type] = e.target.value;
    else if (selectedGroup != -1 && selectedGroupType == -1 ) updateSVLdata[selectedOwner].group[selectedGroup][type] = e.target.value;
    else updateSVLdata[selectedOwner].group[selectedGroup].type[selectedGroupType][type] = e.target.value;
    setDataSVL(updateSVLdata);
  }

  return (
    <div className={styles.textFieldContainer}>
      {fieldLabel != '' ? (
        <div className={styles.bigTextField}>
          <div className={styles.fieldLabel}>
            {fieldLabel}
          </div>
          <textarea
            className={styles.textField} 
            placeholder={placeholder}
            rows={5}
            value={value}
            onChange={updateValue}
            disabled={!editMode}
          />
        </div>
    ) : (
      <textarea
        className={styles.textFieldGroupType} 
        placeholder={placeholder}
        rows={5}
        value={value}
        onChange={updateValue}
        disabled={!editMode}
      />
    )}
    </div>
  );
};

export default InputTextField;