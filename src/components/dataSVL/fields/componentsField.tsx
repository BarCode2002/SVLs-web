import { SetStateAction, useEffect, useState } from 'react';
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

  const [selectedComponentsLength, setSelectedComponentsLength] = useState(1);

  useEffect(() => {
    setSelectedComponentsLength(selectedComponents.filter(component => component != '').length +1);
  }, [selectedOwner]);

  const updateValue = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const updateSVLdata = [...dataSVL];
    updateSVLdata[selectedOwner].group[selectedGroup][typeSVL][selectedGroupType][type][index] = e.target.value;
    setDataSVL(updateSVLdata);
  }

  const addComponent = () => {
    if (selectedComponentsLength < COMPONENTS_SIZE) setSelectedComponentsLength(selectedComponentsLength+1);
  }

  const removeComponent = (indexComponent: number) => {
    const updateSVLdata = [...dataSVL];
    for (let i = indexComponent; i < selectedComponentsLength; i++) {
      updateSVLdata[selectedOwner].group[selectedGroup][typeSVL][selectedGroupType][type][i] = updateSVLdata[selectedOwner].group[selectedGroup][typeSVL][selectedGroupType][type][i+1];
    }
    if (selectedComponentsLength > 1) setSelectedComponentsLength(selectedComponentsLength-1);
    setDataSVL(updateSVLdata);
  }

  const listComponents = Array.from({length: selectedComponentsLength }, (_, index) => (
    <div key={index} className={styles.componentsFieldContainer}>
      <input
        className={styles.inputField} 
        placeholder={`${placeholder} #${index+1}`}
        value={selectedComponents[index]}
        onChange={(e) => updateValue(e, index)}
      />
      <div className={styles.addRemoveComponent}>
        {index+1 == selectedComponentsLength &&
          <button
            className={styles.addComponentButton}
            onClick={addComponent}>
            +
          </button>
        }
        {selectedComponentsLength > 1 &&
          <button
            className={styles.removeComponentButton}
            onClick={() => removeComponent(index)}>
            -
          </button>
        }
      </div>
    </div>
  ));

  return (
    <div className={styles.componentsFieldContainer}>
      {listComponents}
    </div>
  );
};

export default ComponentsField;