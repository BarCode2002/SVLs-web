import { SetStateAction } from 'react';
import styles from '../../../styles/components/dataSVL/fields/componentsField.module.css';
import { COMPONENTS_SIZE } from '../../../utils/constants';
import { TrashIconBlackSmall } from '../../../assets/trash';
import { t } from 'i18next';

type ComponentsFieldProps = {
  placeholder: string;
  selectedOwner: number;
  selectedGroup: number;
  selectedGroupType: number;
  dataSVL: any;
  selectedComponents: string[]
  setDataSVL: React.Dispatch<SetStateAction<any>>;
  type: string;
  editMode: boolean;
}

const ComponentsField = ({ placeholder, selectedOwner, selectedGroup, selectedGroupType, dataSVL, selectedComponents, setDataSVL, type, editMode }: ComponentsFieldProps) => {


  const updateValue = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const updateSVLdata = [...dataSVL];
    updateSVLdata[selectedOwner].group[selectedGroup].type[selectedGroupType][type][index] = e.target.value;
    setDataSVL(updateSVLdata);
  }

  const addComponent = () => {
    if (dataSVL[selectedOwner].group[selectedGroup].type[selectedGroupType].numComponents < COMPONENTS_SIZE) {
      const updateSVLdata = [...dataSVL];
      updateSVLdata[selectedOwner].group[selectedGroup].type[selectedGroupType].numComponents = dataSVL[selectedOwner].group[selectedGroup].type[selectedGroupType].numComponents + 1;
      setDataSVL(updateSVLdata);
    }
  }

  const removeComponent = (indexComponent: number) => {
    const updateSVLdata = [...dataSVL];
    for (let i = indexComponent; i < dataSVL[selectedOwner].group[selectedGroup].type[selectedGroupType].numComponents; i++) {
      updateSVLdata[selectedOwner].group[selectedGroup].type[selectedGroupType][type][i] = updateSVLdata[selectedOwner].group[selectedGroup].type[selectedGroupType][type][i+1];
    }
    if (dataSVL[selectedOwner].group[selectedGroup].type[selectedGroupType].numComponents > 0) {
      const updateSVLdata = [...dataSVL];
      updateSVLdata[selectedOwner].group[selectedGroup].type[selectedGroupType].numComponents = dataSVL[selectedOwner].group[selectedGroup].type[selectedGroupType].numComponents - 1;
      setDataSVL(updateSVLdata);
    }
    setDataSVL(updateSVLdata);
  }

  const listComponents = Array.from({length: dataSVL[selectedOwner].group[selectedGroup].type[selectedGroupType].numComponents }, (_, index) => (
    <div key={index} className={styles.componentsFieldContainer}>
      <input
        className={styles.inputField} 
        placeholder={`${placeholder} #${index+1}`}
        value={selectedComponents[index]}
        onChange={(e) => updateValue(e, index)}
        disabled={!editMode}
      />
      <div className={styles.removeComponentButtonWrapper}>
        <button
          className={styles.removeComponentButton}
          onClick={() => removeComponent(index)}
          disabled={!editMode}>
          <TrashIconBlackSmall />
        </button>
      </div>
    </div>
  ));

  return (
    <div className={styles.componentsFieldContainer}>
      {listComponents}
      <button
        className={styles.addComponentButton}
        onClick={addComponent}
        disabled={!editMode}>
        {dataSVL[selectedOwner].group[selectedGroup].type[selectedGroupType].numComponents == 0 ? t('DataSVL.Labels.addComponent') : '+'}
      </button>
    </div>
  );
};

export default ComponentsField;