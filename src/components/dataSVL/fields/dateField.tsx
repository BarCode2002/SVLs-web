import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from '../../../styles/components/dataSVL/fields/dateField.module.css';
import { SetStateAction } from 'react';

type DateFieldProps = {
  fieldLabel: string;
  placeholder: string;
  selectedOwner: number;
  dataSVL: any;
  setDataSVL: React.Dispatch<SetStateAction<any>>;
  formType: string;
  id: number;
}

const DateField = ({ fieldLabel, placeholder, selectedOwner, dataSVL, setDataSVL, formType, id }: DateFieldProps) => {

  const handleDateSelected = (date: any) => {
    if (date !== null) {
      const updateSVLdata = [...dataSVL];
      updateSVLdata[selectedOwner][formType][id] = date;
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
          selected={dataSVL[selectedOwner].group[0][formType]} 
          onChange={handleDateSelected} 
          dateFormat="dd-MM-yyyy" 
          placeholderText={placeholder}
        />
      </div>
    </div>
  );
};


export default DateField;