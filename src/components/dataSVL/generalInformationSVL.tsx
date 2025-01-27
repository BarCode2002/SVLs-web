import { SetStateAction } from 'react';
import styles from '../../styles/components/dataSVL/generalInformationSVL.module.css';
import { GeneralInformation } from '../../utils/interfaces/dataSVL.ts';
import InputField from './fields/inputField.tsx';

type GeneralInformationSVLProps = {
  selectedOwner: number;
  generalInformation: GeneralInformation[];
  setGeneralInformation: React.Dispatch<SetStateAction<GeneralInformation[]>>;
};

const GeneralInformationSVL = ({ selectedOwner, generalInformation, setGeneralInformation }: GeneralInformationSVLProps): JSX.Element => {

  return (
    <div className={styles.generalInformationSVLContainer}>
      <InputField fieldLabel={'VIN:'} placeholder={'VIN...'} selectedOwner={selectedOwner} 
                  form={generalInformation} value={generalInformation[selectedOwner].VIN} setForm={setGeneralInformation}  
                  formType={'VIN'} id={-1}
      />
      <InputField fieldLabel={'VIN:'} placeholder={'VIN...'} selectedOwner={selectedOwner} 
                  form={generalInformation} value={generalInformation[selectedOwner].VIN} setForm={setGeneralInformation}  
                  formType={'VIN'} id={-1}
      />
      <InputField fieldLabel={'VIN:'} placeholder={'VIN...'} selectedOwner={selectedOwner} 
                  form={generalInformation} value={generalInformation[selectedOwner].VIN} setForm={setGeneralInformation}  
                  formType={'VIN'} id={-1}
      />
    </div>
  );
}

export default GeneralInformationSVL;