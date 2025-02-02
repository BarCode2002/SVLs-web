import { SetStateAction } from 'react';
import styles from '../../../styles/components/dataSVL/fields/componentsField.module.css';
import { COMPONENTS_SIZE } from '../../../utils/constants/constants';

type ComponentsFieldProps = {
  placeholder: string;
  selectedOwner: number;
  selectedGroup: number;
  selectedGroupType: number;
  dataSVL: any;
  selectedComponents: string[]
  setDataSVL: React.Dispatch<SetStateAction<any>>;
  type: string;
  typeSVL: string;
}

const ComponentsField = ({ placeholder, selectedOwner, selectedGroup, selectedGroupType, dataSVL, selectedComponents, setDataSVL, type, typeSVL }: ComponentsFieldProps) => {


  const updateValue = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const updateSVLdata = [...dataSVL];
    updateSVLdata[selectedOwner].group[selectedGroup][typeSVL][selectedGroupType][type][index] = e.target.value;
    setDataSVL(updateSVLdata);
  }

  const addComponent = () => {
    if (dataSVL[selectedOwner].group[selectedGroup][typeSVL][selectedGroupType].numComponents < COMPONENTS_SIZE) {
      const updateSVLdata = [...dataSVL];
      updateSVLdata[selectedOwner].group[selectedGroup][typeSVL][selectedGroupType].numComponents = dataSVL[selectedOwner].group[selectedGroup][typeSVL][selectedGroupType].numComponents + 1;
      setDataSVL(updateSVLdata);
    }
  }

  const removeComponent = (indexComponent: number) => {
    const updateSVLdata = [...dataSVL];
    for (let i = indexComponent; i < dataSVL[selectedOwner].group[selectedGroup][typeSVL][selectedGroupType].numComponents; i++) {
      updateSVLdata[selectedOwner].group[selectedGroup][typeSVL][selectedGroupType][type][i] = updateSVLdata[selectedOwner].group[selectedGroup][typeSVL][selectedGroupType][type][i+1];
    }
    if (dataSVL[selectedOwner].group[selectedGroup][typeSVL][selectedGroupType].numComponents > 1) {
      const updateSVLdata = [...dataSVL];
      updateSVLdata[selectedOwner].group[selectedGroup][typeSVL][selectedGroupType].numComponents = dataSVL[selectedOwner].group[selectedGroup][typeSVL][selectedGroupType].numComponents - 1;
      setDataSVL(updateSVLdata);
    }
    setDataSVL(updateSVLdata);
  }

  const listComponents = Array.from({length: dataSVL[selectedOwner].group[selectedGroup][typeSVL][selectedGroupType].numComponents }, (_, index) => (
    <div key={index} className={styles.componentsFieldContainer}>
      <input
        className={styles.inputField} 
        placeholder={`${placeholder} #${index+1}`}
        value={selectedComponents[index]}
        onChange={(e) => updateValue(e, index)}
      />
      {dataSVL[selectedOwner].group[selectedGroup][typeSVL][selectedGroupType].numComponents > 1 &&
        <div className={styles.removeComponentButtonWrapper}>
          <button
            className={styles.removeComponentButton}
            onClick={() => removeComponent(index)}>
            -
          </button>
        </div>
      }
      {index+1 == dataSVL[selectedOwner].group[selectedGroup][typeSVL][selectedGroupType].numComponents &&
        <button
          className={styles.addComponentButton}
          onClick={addComponent}>
          +
        </button>
      }
    </div>
  ));

  return (
    <div className={styles.componentsFieldContainer}>
      {listComponents}
    </div>
  );
};

export default ComponentsField;