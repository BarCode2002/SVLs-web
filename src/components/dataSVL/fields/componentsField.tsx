import { SetStateAction } from 'react';
import styles from '../../../styles/components/dataSVL/fields/componentsField.module.css';

type ComponentsFieldProps = {
  placeholder: string;
  selectedOwner: number;
  selectedGroup: number;
  selectedGroupType: number;
  dataSVL: any;
  value: [boolean, string, boolean, string];
  setDataSVL: React.Dispatch<SetStateAction<any>>;
  type: string;
}

const ComponentsField = ({ placeholder, selectedOwner, selectedGroup, selectedGroupType, dataSVL, value, setDataSVL, type }: ComponentsFieldProps) => {

  const updateValue = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const updateSVLdata = [...dataSVL];
    setDataSVL(updateSVLdata);
  }

  return (
    <div className={styles.componentsFieldContainer}>
      <textarea
        className={styles.textField} 
        placeholder={placeholder}
        rows={5}
        value={value}
        onChange={updateValue}
      />
    </div>
  );
};

export default ComponentsField;