import { SetStateAction } from 'react';
import styles from '../../styles/components/dataSVL/generalInformationSVL.module.css';
import { GeneralInformation } from '../../utils/interfaces/dataSVL.ts';
import InputField from './fields/inputField.tsx';
import DropdownMenu from './fields/dropdownMenu.tsx';
import InputTextField from './fields/inputTextField.tsx';

type GeneralInformationSVLProps = {
  selectedOwner: number;
  generalInformation: GeneralInformation[];
  setGeneralInformation: React.Dispatch<SetStateAction<GeneralInformation[]>>;
};

const GeneralInformationSVL = ({ selectedOwner, generalInformation, setGeneralInformation }: GeneralInformationSVLProps): JSX.Element => {

  return (
    <div className={styles.generalInformationSVLContainer}>
      <div className={styles.title}>
        General information
      </div>
      <InputField fieldLabel={'VIN:'} placeholder={'VIN'} selectedOwner={selectedOwner} 
        dataSVL={generalInformation} value={generalInformation[selectedOwner].VIN} 
        setDataSVL={setGeneralInformation} formType={'VIN'} id={-1}
      />
      <DropdownMenu fieldLabel={'Brand:'} selectedOwner={selectedOwner} 
        dataSVL={generalInformation} value={generalInformation[selectedOwner].brand} 
        setDataSVL={setGeneralInformation} formType={'brand'} id={-1}
      />
      <DropdownMenu fieldLabel={'Model:'} selectedOwner={selectedOwner} 
        dataSVL={generalInformation} value={generalInformation[selectedOwner].model} 
        setDataSVL={setGeneralInformation} formType={'model'} id={-1}
      />
      <InputField fieldLabel={'Year:'} placeholder={'Year'} selectedOwner={selectedOwner} 
        dataSVL={generalInformation} value={generalInformation[selectedOwner].year} 
        setDataSVL={setGeneralInformation} formType={'year'} id={-1}
      />       
      <InputField fieldLabel={'Kilometers:'} placeholder={'Kilometers'} selectedOwner={selectedOwner} 
        dataSVL={generalInformation} value={generalInformation[selectedOwner].kilometers} 
        setDataSVL={setGeneralInformation} formType={'kilometers'} id={-1}
      /> 
      <DropdownMenu fieldLabel={'State:'} selectedOwner={selectedOwner} 
        dataSVL={generalInformation} value={generalInformation[selectedOwner].state} 
        setDataSVL={setGeneralInformation} formType={'state'} id={-1}
      />
      <InputField fieldLabel={'Weight:'} placeholder={'Weight'} selectedOwner={selectedOwner} 
        dataSVL={generalInformation} value={generalInformation[selectedOwner].weight} 
        setDataSVL={setGeneralInformation} formType={'weight'} id={-1}
      /> 
      <InputField fieldLabel={'Color:'} placeholder={'Color'} selectedOwner={selectedOwner} 
        dataSVL={generalInformation} value={generalInformation[selectedOwner].color} 
        setDataSVL={setGeneralInformation} formType={'color'} id={-1}
      /> 
      <InputField fieldLabel={'Engine:'} placeholder={'Engine'} selectedOwner={selectedOwner} 
        dataSVL={generalInformation} value={generalInformation[selectedOwner].engine} 
        setDataSVL={setGeneralInformation} formType={'engine'} id={-1}
      /> 
      <InputField fieldLabel={'Power:'} placeholder={'Power'} selectedOwner={selectedOwner} 
        dataSVL={generalInformation} value={generalInformation[selectedOwner].power} 
        setDataSVL={setGeneralInformation} formType={'power'} id={-1}
      /> 
      <InputField fieldLabel={'Autonomy:'} placeholder={'Autonomy'} selectedOwner={selectedOwner} 
        dataSVL={generalInformation} value={generalInformation[selectedOwner].autonomy} 
        setDataSVL={setGeneralInformation} formType={'autonomy'} id={-1}
      /> 
      <DropdownMenu fieldLabel={'Climate:'} selectedOwner={selectedOwner} 
        dataSVL={generalInformation} value={generalInformation[selectedOwner].climate} 
        setDataSVL={setGeneralInformation} formType={'climate'} id={-1}
      />
      <DropdownMenu fieldLabel={'Usage:'} selectedOwner={selectedOwner} 
        dataSVL={generalInformation} value={generalInformation[selectedOwner].usage} 
        setDataSVL={setGeneralInformation} formType={'usage'} id={-1}
      />
      <DropdownMenu fieldLabel={'Storage:'} selectedOwner={selectedOwner} 
        dataSVL={generalInformation} value={generalInformation[selectedOwner].storage} 
        setDataSVL={setGeneralInformation} formType={'storage'} id={-1}
      />
      <InputTextField fieldLabel={'Comments:'} placeholder={'General comments about the vehicle'} selectedOwner={selectedOwner} 
        dataSVL={generalInformation} value={generalInformation[selectedOwner].comments} 
        setDataSVL={setGeneralInformation} formType={'comments'} id={-1}
      />
    </div>
  );
}

export default GeneralInformationSVL;