import { SetStateAction } from 'react';
import styles from '../../styles/components/dataSVL/generalInformationSVL.module.css';
import { GeneralInformation } from '../../utils/interfaces/dataSVL.ts';
import InputField from './fields/inputField.tsx';
import DropdownMenu from './fields/dropdownMenu.tsx';
import ImagesField from './fields/imagesField.tsx';
import InputTextField from './fields/inputTextField.tsx';
import { useTranslation } from "react-i18next";

type GeneralInformationSVLProps = {
  selectedOwner: number;
  generalInformation: GeneralInformation[];
  setGeneralInformation: React.Dispatch<SetStateAction<GeneralInformation[]>>;
};

const GeneralInformationSVL = ({ selectedOwner, generalInformation, setGeneralInformation }: GeneralInformationSVLProps): JSX.Element => {

  const { t } = useTranslation();

  return (
    <div className={styles.generalInformationSVLContainer}>
      <div className={styles.title}>
        {t('DataSVL.Labels.generalInformation')}
      </div>
      <div className={styles.dataWrapper}>
        <div className={styles.data}>
          <InputField fieldLabel={t('DataSVL.Labels.vin')} placeholder={t('DataSVL.Placeholders.vin')} selectedOwner={selectedOwner} 
            selectedGroup={-1} selectedGroupType={-1} dataSVL={generalInformation} value={generalInformation[selectedOwner].VIN} 
            setDataSVL={setGeneralInformation} type={'VIN'} typeSVL={''}
          />
          <DropdownMenu fieldLabel={t('DataSVL.Labels.brand')} selectedOwner={selectedOwner} 
            dataSVL={generalInformation} value={generalInformation[selectedOwner].brand} 
            setDataSVL={setGeneralInformation} type={'brand'}
          />
          <DropdownMenu fieldLabel={t('DataSVL.Labels.model')} selectedOwner={selectedOwner} 
            dataSVL={generalInformation} value={generalInformation[selectedOwner].model} 
            setDataSVL={setGeneralInformation} type={'model'}
          />
          <InputField fieldLabel={t('DataSVL.Labels.year')} placeholder={t('DataSVL.Placeholders.year')} selectedOwner={selectedOwner} 
            selectedGroup={-1} selectedGroupType={-1} dataSVL={generalInformation} value={generalInformation[selectedOwner].year} 
            setDataSVL={setGeneralInformation} type={'year'} typeSVL={''}
          />       
          <InputField fieldLabel={t('DataSVL.Labels.kilometers')} placeholder={t('DataSVL.Placeholders.kilometers')} selectedOwner={selectedOwner} 
            selectedGroup={-1} selectedGroupType={-1} dataSVL={generalInformation} value={generalInformation[selectedOwner].kilometers} 
            setDataSVL={setGeneralInformation} type={'kilometers'} typeSVL={''}
          /> 
          <ImagesField fieldLabel={t('DataSVL.Labels.mainImage')} placeholder={t('DataSVL.Placeholders.mainImage')} selectedOwner={selectedOwner} 
            selectedGroup={-1} selectedGroupType={-1} dataSVL={generalInformation} selectedImages={[generalInformation[selectedOwner].mainPhotograph]} 
            setDataSVL={setGeneralInformation} type={'mainPhotograph'} typeSVL={''} allowMultipleImages={false}
          />
          <ImagesField fieldLabel={t('DataSVL.Labels.images')} placeholder={t('DataSVL.Placeholders.images')} selectedOwner={selectedOwner} 
            selectedGroup={-1} selectedGroupType={-1} dataSVL={generalInformation} selectedImages={generalInformation[selectedOwner].photographs} 
            setDataSVL={setGeneralInformation} type={'photographs'} typeSVL={''} allowMultipleImages={true}
          />        
          <DropdownMenu fieldLabel={t('DataSVL.Labels.state')} selectedOwner={selectedOwner} 
            dataSVL={generalInformation} value={generalInformation[selectedOwner].state} 
            setDataSVL={setGeneralInformation} type={'state'}
          />
          <InputField fieldLabel={t('DataSVL.Labels.weight')} placeholder={t('DataSVL.Placeholders.weight')} selectedOwner={selectedOwner} 
            selectedGroup={-1} selectedGroupType={-1} dataSVL={generalInformation} value={generalInformation[selectedOwner].weight} 
            setDataSVL={setGeneralInformation} type={'weight'} typeSVL={''}
          /> 
          <InputField fieldLabel={t('DataSVL.Labels.color')} placeholder={t('DataSVL.Placeholders.color')} selectedOwner={selectedOwner} 
            selectedGroup={-1} selectedGroupType={-1} dataSVL={generalInformation} value={generalInformation[selectedOwner].color} 
            setDataSVL={setGeneralInformation} type={'color'} typeSVL={''}
          /> 
          <InputField fieldLabel={t('DataSVL.Labels.engine')} placeholder={t('DataSVL.Placeholders.engine')} selectedOwner={selectedOwner} 
            selectedGroup={-1} selectedGroupType={-1} dataSVL={generalInformation} value={generalInformation[selectedOwner].engine} 
            setDataSVL={setGeneralInformation} type={'engine'} typeSVL={''}
          /> 
          <InputField fieldLabel={t('DataSVL.Labels.power')} placeholder={t('DataSVL.Placeholders.power')} selectedOwner={selectedOwner} 
            selectedGroup={-1} selectedGroupType={-1} dataSVL={generalInformation} value={generalInformation[selectedOwner].power} 
            setDataSVL={setGeneralInformation} type={'power'} typeSVL={''}
          /> 
          <InputField fieldLabel={t('DataSVL.Labels.autonomy')} placeholder={t('DataSVL.Placeholders.autonomy')} selectedOwner={selectedOwner} 
            selectedGroup={-1} selectedGroupType={-1} dataSVL={generalInformation} value={generalInformation[selectedOwner].autonomy} 
            setDataSVL={setGeneralInformation} type={'autonomy'} typeSVL={''}
          /> 
          <DropdownMenu fieldLabel={t('DataSVL.Labels.climate')} selectedOwner={selectedOwner} 
            dataSVL={generalInformation} value={generalInformation[selectedOwner].climate} 
            setDataSVL={setGeneralInformation} type={'climate'} 
          />
          <DropdownMenu fieldLabel={t('DataSVL.Labels.usage')} selectedOwner={selectedOwner} 
            dataSVL={generalInformation} value={generalInformation[selectedOwner].usage} 
            setDataSVL={setGeneralInformation} type={'usage'}
          />
          <DropdownMenu fieldLabel={t('DataSVL.Labels.storage')} selectedOwner={selectedOwner} 
            dataSVL={generalInformation} value={generalInformation[selectedOwner].storage} 
            setDataSVL={setGeneralInformation} type={'storage'}
          />
          <InputTextField fieldLabel={t('DataSVL.Labels.comments')} placeholder={t('DataSVL.Placeholders.comments')} selectedOwner={selectedOwner} 
            selectedGroup={-1} selectedGroupType={-1} dataSVL={generalInformation} 
            value={generalInformation[selectedOwner].comments} setDataSVL={setGeneralInformation} type={'comments'} typeSVL={''}
          />
        </div>
      </div>
    </div>
  );
}

export default GeneralInformationSVL;