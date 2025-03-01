import { SetStateAction, useEffect } from 'react';
import styles from '../../../styles/components/dataSVL/fields/inputField.module.css';
import { useTranslation } from 'react-i18next';

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
  numPreviousOwners?: number;
  totalOwners?: number;
}

const InputField = ({ fieldLabel, placeholder, selectedOwner, selectedGroup, selectedGroupType, dataSVL, value, setDataSVL, type, editMode, numPreviousOwners, totalOwners }: InputFieldProps) => {

  const { t } = useTranslation();
  

  //tendre que actualizarlo para cuando haya previous owners. 
  if (selectedGroup == -1 && selectedGroupType == -1 && numPreviousOwners == 0 && (type == 'VIN' || type == 'year')) {
    useEffect(() => {
      const updateSVLdata = [...dataSVL];
      for (let i = 1; i < totalOwners!; i++) {
        updateSVLdata[i][type] = updateSVLdata[0][type];
      }
      setDataSVL(updateSVLdata);
    }, [dataSVL[0].VIN, dataSVL[0].year]);
  }
  
  const validateInputAndUpdateValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    let re: RegExp =  /^[a-zA-Z\s-]+$/;
    if (type == 'year' || type == 'kilometers' || type == 'weight' || type == 'power' || type == 'autonomy') {
      re = /^\d*$/;
    } 
    else if (type == 'VIN') {
      re = /^[A-Z0-9-]+$/;
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
      else updateSVLdata[selectedOwner].group[selectedGroup].type[selectedGroupType][type] = e.target.value;
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
          disabled={!editMode || ((type == 'VIN' || type == 'year') && selectedOwner > 0)}
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
      {numPreviousOwners == 0 && selectedOwner == 0 && (type == 'VIN' || type == 'year') &&
        <div className={styles.firstOwnersFields}>
          {t('DataSVL.Labels.firstOwnerFields')}
        </div> 
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