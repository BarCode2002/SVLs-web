import { SetStateAction } from 'react';
import styles from '../../../styles/components/dataSVL/fields/inputField.module.css';

type InputFieldProps = {
  fieldLabel: string;
  placeholder: string;
  selectedOwner: number;
  selectedGroup: number;
  selectedGroupType: number;
  dataSVL: any;
  value: string | [string, string];
  setDataSVL: React.Dispatch<SetStateAction<any>>;
  type: string;
  editMode: boolean;
}

const InputField = ({ fieldLabel, placeholder, selectedOwner, selectedGroup, selectedGroupType, dataSVL, value, setDataSVL, type, editMode }: InputFieldProps) => {
   
  const validateInputAndUpdateValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    let re: RegExp =  /^[a-zA-Z\s-]+$/;
    if (type == 'year' || type == 'kilometers' || type == 'weight' || type == 'power' || type == 'autonomy') {
      re = /^\d*$/;
    } 
    else if (type == 'VIN') {
      re = /^[A-Z0-9-]+$/;
    }
    else if (type == 'color') {
      re = /^[A-Za-z\s]+$/;
    }
    else if (type == 'engine' || type == 'name') {
      re = /^/;
    }
    if (e.target.value == "" || re.test(e.target.value)) {
      const updateSVLdata = [...dataSVL];
      if (selectedGroup == -1 && selectedGroupType == -1) {
        if (type == 'kilometers' || type == 'autonomy' || type == 'weight' || type == 'power') {
          updateSVLdata[selectedOwner][type][0] = e.target.value;
        }
        else {
          updateSVLdata[selectedOwner][type] = e.target.value;
        }
      }
      else if (selectedGroup != -1 && selectedGroupType == -1) {
        if (type == 'kilometers') {
          updateSVLdata[selectedOwner].group[selectedGroup][type][0] = e.target.value;
        }
        else {
          updateSVLdata[selectedOwner].group[selectedGroup][type] = e.target.value;
        }
      }
      else updateSVLdata[selectedOwner].group[selectedGroup].element[selectedGroupType][type] = e.target.value;
      setDataSVL(updateSVLdata);
    }
  };

  const handleLeftButton = () => {
    const updateDataSVL = [...dataSVL];
    if (selectedGroup == -1 && selectedGroupType == -1) {
      if (type == 'kilometers' || type == 'autonomy') updateDataSVL[selectedOwner][type][1] = 'km';
      else if (type == 'weight') updateDataSVL[selectedOwner][type][1] = 'kg';
      else updateDataSVL[selectedOwner][type][1] = 'cv';
    }
    else updateDataSVL[selectedOwner].group[selectedGroup][type][1] = 'km';   
    setDataSVL(updateDataSVL);
  }

  const handleRightButton = () => {
    const updateDataSVL = [...dataSVL];
    if (selectedGroup == -1 && selectedGroupType == -1) {
      if (type == 'kilometers' || type == 'autonomy') updateDataSVL[selectedOwner][type][1] = 'mi';
      else if (type == 'weight') updateDataSVL[selectedOwner][type][1] = 'lb';
      else updateDataSVL[selectedOwner][type][1] = 'kW';
    }
    else updateDataSVL[selectedOwner].group[selectedGroup][type][1] = 'mi';   
    setDataSVL(updateDataSVL);
  }

  return (
    <div className={styles.fieldContainer}>
      {fieldLabel != '' &&
        <div className={styles.fieldLabel}>
          {fieldLabel}
        </div>
      }
      {type != 'kilometers' && type != 'autonomy' && type != 'weight' && type != 'power' &&
        <input
          className={styles.inputField} 
          placeholder={placeholder}
          value={value}
          onChange={validateInputAndUpdateValue}
          disabled={!editMode}
        />
      }
      {(type == 'kilometers' || type == 'autonomy' || type == 'weight' || type == 'power') &&
        <input
          className={styles.inputField} 
          placeholder={placeholder}
          value={value[0]}
          onChange={validateInputAndUpdateValue}
          disabled={!editMode}
        />
      }
      {(type == 'kilometers' || type == 'autonomy') &&
        <div className={styles.optionalContaier}>
          <button
            className={value[1] != 'km' ? styles.leftButton : styles.leftButtonSelected}
            onClick={handleLeftButton}
            disabled={!editMode}>
            km
          </button>
          <button
            className={value[1] != 'mi' ? styles.rightButton : styles.rightButtonSelected}
            onClick={handleRightButton}
            disabled={!editMode}>
            mi
          </button>
      </div>
      }
      {type == 'weight' && 
        <div className={styles.optionalContaier}>
        <button
          className={value[1] != 'kg' ? styles.leftButton : styles.leftButtonSelected}
          onClick={handleLeftButton}
          disabled={!editMode}>
          kg
        </button>
        <button
          className={value[1] != 'lb' ? styles.rightButton : styles.rightButtonSelected}
          onClick={handleRightButton}
          disabled={!editMode}>
          lb
        </button>
    </div>
      }
      {type == 'power' &&
        <div className={styles.optionalContaier}>
        <button
          className={value[1] != 'cv' ? styles.leftButton : styles.leftButtonSelected}
          onClick={handleLeftButton}
          disabled={!editMode}>
          cv
        </button>
        <button
          className={value[1] != 'kW' ? styles.rightButton : styles.rightButtonSelected}
          onClick={handleRightButton}
          disabled={!editMode}>
          kW
        </button>
    </div>
      }
    </div>
  );
};

export default InputField;