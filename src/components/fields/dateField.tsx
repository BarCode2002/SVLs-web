import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from '../../styles/components/fields/dateField.module.css';
import { SetStateAction } from 'react';

type DateFieldProps = {
  fieldLabel: string;
  placeholder: string;
  selectedOwner: number;
  selectedGroup: number;
  dataSVL: any;
  setDataSVL: React.Dispatch<SetStateAction<any>>;
  type: string;
  editMode: boolean;
}

const DateField = ({ fieldLabel, placeholder, selectedOwner, selectedGroup, dataSVL, setDataSVL, type, editMode }: DateFieldProps) => {

  const handleDateSelected = (date: any) => {
    if (date !== null) {
      const updateSVLdata = [...dataSVL];
      updateSVLdata[selectedOwner].group[selectedGroup][type] = date;
      setDataSVL(updateSVLdata);
    }
  };

  return (
    <div className={styles.dateContainer}>
      <div className={styles.fieldLabel}>
        {fieldLabel}
      </div>
      <div>
        <DatePicker 
          portalId="react-datepicker-popper"
          className={styles.date}
          selected={dataSVL[selectedOwner].group[selectedGroup][type]} 
          onChange={handleDateSelected} 
          dateFormat="dd-MM-yyyy" 
          placeholderText={placeholder}
          disabled={!editMode}
        />
      </div>
    </div>
  );
};


export default DateField;