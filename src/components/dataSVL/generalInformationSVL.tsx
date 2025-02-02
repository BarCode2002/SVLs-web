import { SetStateAction } from 'react';
import styles from '../../styles/components/dataSVL/generalInformationSVL.module.css';
import { GeneralInformation } from '../../utils/interfaces/dataSVL.ts';
import InputField from './fields/inputField.tsx';
import DropdownMenu from './fields/dropdownMenu.tsx';
import ImagesField from './fields/imagesField.tsx';
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
      <div className={styles.dataWrapper}>
        <div className={styles.data}>
          <InputField fieldLabel={'VIN:'} placeholder={'VIN'} selectedOwner={selectedOwner} 
            selectedGroup={-1} selectedGroupType={-1} dataSVL={generalInformation} value={generalInformation[selectedOwner].VIN} 
            setDataSVL={setGeneralInformation} type={'VIN'} typeSVL={''}
          />
          <DropdownMenu fieldLabel={'Brand:'} selectedOwner={selectedOwner} 
            dataSVL={generalInformation} value={generalInformation[selectedOwner].brand} 
            setDataSVL={setGeneralInformation} type={'brand'}
          />
          <DropdownMenu fieldLabel={'Model:'} selectedOwner={selectedOwner} 
            dataSVL={generalInformation} value={generalInformation[selectedOwner].model} 
            setDataSVL={setGeneralInformation} type={'model'}
          />
          <InputField fieldLabel={'Year:'} placeholder={'Year'} selectedOwner={selectedOwner} 
            selectedGroup={-1} selectedGroupType={-1} dataSVL={generalInformation} value={generalInformation[selectedOwner].year} 
            setDataSVL={setGeneralInformation} type={'year'} typeSVL={''}
          />       
          <InputField fieldLabel={'Kilometers:'} placeholder={'Kilometers'} selectedOwner={selectedOwner} 
            selectedGroup={-1} selectedGroupType={-1} dataSVL={generalInformation} value={generalInformation[selectedOwner].kilometers} 
            setDataSVL={setGeneralInformation} type={'kilometers'} typeSVL={''}
          /> 
          <ImagesField fieldLabel={'Main image:'} placeholder={'Select main image'} selectedOwner={selectedOwner} 
            selectedGroup={-1} selectedGroupType={-1} dataSVL={generalInformation} selectedImages={[generalInformation[selectedOwner].mainPhotograph]} 
            setDataSVL={setGeneralInformation} type={'mainPhotograph'} typeSVL={''} allowMultipleImages={false}
          />
          <ImagesField fieldLabel={'Images:'} placeholder={'Select general images'} selectedOwner={selectedOwner} 
            selectedGroup={-1} selectedGroupType={-1} dataSVL={generalInformation} selectedImages={generalInformation[selectedOwner].photographs} 
            setDataSVL={setGeneralInformation} type={'photographs'} typeSVL={''} allowMultipleImages={true}
          />        
          <DropdownMenu fieldLabel={'State:'} selectedOwner={selectedOwner} 
            dataSVL={generalInformation} value={generalInformation[selectedOwner].state} 
            setDataSVL={setGeneralInformation} type={'state'}
          />
          <InputField fieldLabel={'Weight:'} placeholder={'Weight'} selectedOwner={selectedOwner} 
            selectedGroup={-1} selectedGroupType={-1} dataSVL={generalInformation} value={generalInformation[selectedOwner].weight} 
            setDataSVL={setGeneralInformation} type={'weight'} typeSVL={''}
          /> 
          <InputField fieldLabel={'Color:'} placeholder={'Color'} selectedOwner={selectedOwner} 
            selectedGroup={-1} selectedGroupType={-1} dataSVL={generalInformation} value={generalInformation[selectedOwner].color} 
            setDataSVL={setGeneralInformation} type={'color'} typeSVL={''}
          /> 
          <InputField fieldLabel={'Engine:'} placeholder={'Engine'} selectedOwner={selectedOwner} 
            selectedGroup={-1} selectedGroupType={-1} dataSVL={generalInformation} value={generalInformation[selectedOwner].engine} 
            setDataSVL={setGeneralInformation} type={'engine'} typeSVL={''}
          /> 
          <InputField fieldLabel={'Power:'} placeholder={'Power'} selectedOwner={selectedOwner} 
            selectedGroup={-1} selectedGroupType={-1} dataSVL={generalInformation} value={generalInformation[selectedOwner].power} 
            setDataSVL={setGeneralInformation} type={'power'} typeSVL={''}
          /> 
          <InputField fieldLabel={'Autonomy:'} placeholder={'Autonomy'} selectedOwner={selectedOwner} 
            selectedGroup={-1} selectedGroupType={-1} dataSVL={generalInformation} value={generalInformation[selectedOwner].autonomy} 
            setDataSVL={setGeneralInformation} type={'autonomy'} typeSVL={''}
          /> 
          <DropdownMenu fieldLabel={'Climate:'} selectedOwner={selectedOwner} 
            dataSVL={generalInformation} value={generalInformation[selectedOwner].climate} 
            setDataSVL={setGeneralInformation} type={'climate'} 
          />
          <DropdownMenu fieldLabel={'Usage:'} selectedOwner={selectedOwner} 
            dataSVL={generalInformation} value={generalInformation[selectedOwner].usage} 
            setDataSVL={setGeneralInformation} type={'usage'}
          />
          <DropdownMenu fieldLabel={'Storage:'} selectedOwner={selectedOwner} 
            dataSVL={generalInformation} value={generalInformation[selectedOwner].storage} 
            setDataSVL={setGeneralInformation} type={'storage'}
          />
          <InputTextField fieldLabel={'Comments:'} placeholder={'General comments about the vehicle'} selectedOwner={selectedOwner} 
            selectedGroup={-1} selectedGroupType={-1} dataSVL={generalInformation} 
            value={generalInformation[selectedOwner].comments} setDataSVL={setGeneralInformation} type={'comments'} typeSVL={''}
          />
        </div>
      </div>
    </div>
  );
}

export default GeneralInformationSVL;