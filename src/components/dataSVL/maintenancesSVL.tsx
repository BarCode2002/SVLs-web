import { SetStateAction } from 'react';
import styles from '../../styles/components/dataSVL/maintenancesSVL.module.css';
import { Maintenances } from '../../utils/interfaces/dataSVL.ts';
import AddGroupButton from './buttons/addGroupButton.tsx';
import AddGroupTypeButton from './buttons/addGroupTypeButton.tsx';
import RemoveGroupButton from './buttons/removeGroupButton.tsx';
import RemoveGroupTypeButton from './buttons/removeGroupTypeButton.tsx';
import ToggleGroupVisibilityButton from './buttons/toggleGroupVisibilityButton.tsx';
import InputField from './fields/inputField.tsx';
import ImagesField from './fields/imagesField.tsx';
import DateField from './fields/dateField.tsx';
import InputGroupTypeField from './fields/inputGroupTypeField.tsx';
import ImagesGroupTypeField from './fields/imagesGroupTypeField.tsx';
import InputTextGroupTypeField from './fields/inputTextGroupTypeField.tsx';

type MainteancesSVLProps = {
  selectedOwner: number;
  maintenances: Maintenances[];
  setMaintenances: React.Dispatch<SetStateAction<Maintenances[]>>;
};

const MaintenancesSVL = ({ selectedOwner, maintenances, setMaintenances }: MainteancesSVLProps): JSX.Element => {

  const renderlistMaintenances = (groupIndex: number) => {

    const listMaintenances = Array.from({length: maintenances[selectedOwner].group[groupIndex].numMaintenances}, (_, maintenanceIndex) => (
      <div key={maintenanceIndex} className={styles.maintenanceContainer}>
        <div className={styles.groupType}>
          <InputGroupTypeField placeholder={'Name'} selectedOwner={selectedOwner} 
            dataSVL={maintenances} value={maintenances[selectedOwner].group[0].maintenance[0].name} 
            setDataSVL={setMaintenances} formType={'name'} id={-1}
          />
          <InputGroupTypeField placeholder={'Name'} selectedOwner={selectedOwner} 
            dataSVL={maintenances} value={maintenances[selectedOwner].group[0].maintenance[0].components[0]} 
            setDataSVL={setMaintenances} formType={'components'} id={-1}
          />
          <ImagesGroupTypeField placeholder={'Select post images'} selectedOwner={selectedOwner} 
            dataSVL={maintenances} selectedImages={maintenances[selectedOwner].group[0].post} 
            setDataSVL={setMaintenances} formType={'post'} id={-1} allowMultipleImages={true}
          />
          <ImagesGroupTypeField placeholder={'Select pre images'} selectedOwner={selectedOwner} 
            dataSVL={maintenances} selectedImages={maintenances[selectedOwner].group[0].post} 
            setDataSVL={setMaintenances} formType={'post'} id={-1} allowMultipleImages={true}
          />
          <InputTextGroupTypeField placeholder={'Comments about the maintenance'} selectedOwner={selectedOwner} 
            dataSVL={maintenances} value={maintenances[selectedOwner].group[0].maintenance[0].comments} 
            setDataSVL={setMaintenances} formType={'comments'} id={-1}
          />
        </div>
        <div className={styles.addRemoveMaintenance}>
          {maintenances[selectedOwner].group[groupIndex].numMaintenances-1 == maintenanceIndex ? (
            <AddGroupTypeButton dataSVL={maintenances} setDataSVL={setMaintenances} 
              selectedOwner={selectedOwner} selectedGroup={groupIndex} type={'numMaintenances'}
            />
          ) : ('')}
          <RemoveGroupTypeButton dataSVL={maintenances} setDataSVL={setMaintenances} 
            selectedOwner={selectedOwner} selectedGroup={groupIndex} type={'numMaintenances'}
          />
        </div>
      </div>
    ));

    return (
      <div className={styles.maintenancesContainer}>
        {listMaintenances}
      </div> 
    );
  };
  
  const listGroupMaintenances = Array.from({length: 1}, (_, groupIndex) => (
    <div key={groupIndex}>
      <div className={styles.groupContainer}>
        <div className={styles.topPart}>
          <div className={styles.toggleGroupVisibilityButton}>
            <ToggleGroupVisibilityButton dataSVL={maintenances} setDataSVL={setMaintenances} 
              selectedOwner={selectedOwner} selectedGroup={groupIndex} 
            />
          </div>
          {maintenances[selectedOwner].group[0].shrinked == false ? (
            <div className={styles.topBottomPart}>
              <InputField fieldLabel={'Kilometers:'} placeholder={'Kilometers'} selectedOwner={selectedOwner} 
                dataSVL={maintenances} value={maintenances[selectedOwner].group[0].kilometers} 
                setDataSVL={setMaintenances} formType={'kilometers'} id={-1}
              />
              <InputField fieldLabel={'Name:'} placeholder={'Name'} selectedOwner={selectedOwner} 
                dataSVL={maintenances} value={maintenances[selectedOwner].group[0].name} 
                setDataSVL={setMaintenances} formType={'name'} id={-1}
              />
              <DateField fieldLabel={'Date:'} placeholder={'Date'} selectedOwner={selectedOwner} 
                dataSVL={maintenances} setDataSVL={setMaintenances} formType={'date'} id={0}
              />
              <ImagesField fieldLabel={'Pre images:'} placeholder={'Select pre images'} selectedOwner={selectedOwner} 
                dataSVL={maintenances} selectedImages={maintenances[selectedOwner].group[0].pre} 
                setDataSVL={setMaintenances} formType={'pre'} id={-1} allowMultipleImages={true}
              />
              <ImagesField fieldLabel={'Post images:'} placeholder={'Select post images'} selectedOwner={selectedOwner} 
                dataSVL={maintenances} selectedImages={maintenances[selectedOwner].group[0].post} 
                setDataSVL={setMaintenances} formType={'post'} id={-1} allowMultipleImages={true}
              />
            </div>
          ) : ('')}
        </div>
        {maintenances[selectedOwner].group[0].shrinked == false ? (
          <div className={styles.bottomPart}>
            {renderlistMaintenances(groupIndex)}
          </div>
        ) : ('')}
      </div>
      <div className={styles.addRemoveGroupButton}>
        <AddGroupButton />
        <RemoveGroupButton />
      </div>
    </div>
  ));

  return (
    <div className={styles.maintenancesSVLContainer}>
      <div className={styles.title}>
        Maintenances
      </div>
      {listGroupMaintenances}
    </div>
  );
}

export default MaintenancesSVL;