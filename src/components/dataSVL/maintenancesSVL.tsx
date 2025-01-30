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
import InputTextField from './fields/inputTextField.tsx';
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
          <InputField fieldLabel={''} placeholder={'Name'} selectedOwner={selectedOwner} 
            selectedGroup={groupIndex} selectedGroupType={maintenanceIndex} dataSVL={maintenances} 
            value={maintenances[selectedOwner].group[groupIndex].maintenance[maintenanceIndex].name} 
            setDataSVL={setMaintenances} type={'name'} typeSVL={'maintenance'}
          />
          <ImagesGroupTypeField placeholder={'Select pre images'} selectedOwner={selectedOwner} 
            dataSVL={maintenances} selectedImages={maintenances[selectedOwner].group[groupIndex].maintenance[maintenanceIndex].pre} 
            setDataSVL={setMaintenances} formType={'post'} id={-1} allowMultipleImages={true}
          />
          <ImagesGroupTypeField placeholder={'Select post images'} selectedOwner={selectedOwner} 
            dataSVL={maintenances} selectedImages={maintenances[selectedOwner].group[groupIndex].maintenance[maintenanceIndex].post} 
            setDataSVL={setMaintenances} formType={'post'} id={-1} allowMultipleImages={true}
          />
          <InputTextField fieldLabel={''} placeholder={'General comments about the vehicle'} selectedOwner={selectedOwner} 
            selectedGroup={groupIndex} selectedGroupType={maintenanceIndex} dataSVL={maintenances} 
            value={maintenances[selectedOwner].group[groupIndex].maintenance[maintenanceIndex].comments} 
            setDataSVL={setMaintenances} type={'comments'} typeSVL={'maintenance'}
          />
        </div>
        <div className={styles.addRemoveMaintenance}>
          {maintenances[selectedOwner].group[groupIndex].numMaintenances - 1 == maintenanceIndex &&
            <AddGroupTypeButton dataSVL={maintenances} setDataSVL={setMaintenances} 
              selectedOwner={selectedOwner} selectedGroup={groupIndex} type={'numMaintenances'}
            />
          }
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
  
  const listGroupMaintenances = Array.from({length: maintenances[selectedOwner].numGroups}, (_, groupIndex) => (
    <div key={groupIndex}>
      <div className={styles.groupContainer}>
        <div className={styles.topPart}>
          <div className={styles.toggleGroupVisibilityButton}>
            <ToggleGroupVisibilityButton dataSVL={maintenances} setDataSVL={setMaintenances} 
              selectedOwner={selectedOwner} selectedGroup={groupIndex} 
            />
          </div>
          {maintenances[selectedOwner].group[groupIndex].shrinked == false ? (
            <div className={styles.topBottomPart}>
              <InputField fieldLabel={'Kilometers:'} placeholder={'Kilometers'} selectedOwner={selectedOwner} selectedGroup={groupIndex} 
                selectedGroupType={-1} dataSVL={maintenances} value={maintenances[selectedOwner].group[groupIndex].kilometers} 
                setDataSVL={setMaintenances} type={'kilometers'} typeSVL={''}
              />
              <InputField fieldLabel={'Name:'} placeholder={'Name'} selectedOwner={selectedOwner} selectedGroup={groupIndex} 
                selectedGroupType={-1} dataSVL={maintenances} value={maintenances[selectedOwner].group[groupIndex].name} 
                setDataSVL={setMaintenances} type={'name'} typeSVL={''}
              />
              <DateField fieldLabel={'Date:'} placeholder={'Date'} selectedOwner={selectedOwner} 
                selectedGroup={groupIndex} dataSVL={maintenances} setDataSVL={setMaintenances} type={'date'}
              />
              <ImagesField fieldLabel={'Pre images:'} placeholder={'Select pre images'} selectedOwner={selectedOwner} 
                selectedGroup={groupIndex} dataSVL={maintenances} selectedImages={maintenances[selectedOwner].group[groupIndex].pre} 
                setDataSVL={setMaintenances} type={'pre'} allowMultipleImages={true}
              />
              <ImagesField fieldLabel={'Post images:'} placeholder={'Select post images'} selectedOwner={selectedOwner} 
                selectedGroup={groupIndex} dataSVL={maintenances} selectedImages={maintenances[selectedOwner].group[groupIndex].post} 
                setDataSVL={setMaintenances} type={'post'} allowMultipleImages={true}
              />
            </div>
          ) : ('')}
        </div>
        {maintenances[selectedOwner].group[groupIndex].shrinked == false ? (
          <div>
            {renderlistMaintenances(groupIndex)}
          </div>
        ) : ('')}
      </div>
      <div className={styles.addRemoveGroupButton}>
        {maintenances[selectedOwner].numGroups - 1 == groupIndex &&
          <AddGroupButton setDataSVL={setMaintenances} selectedOwner={selectedOwner} type={'maintenances'} />
        }
        <RemoveGroupButton setDataSVL={setMaintenances} selectedOwner={selectedOwner} selectedGroup={groupIndex} type={'maintenances'} />
      </div>
    </div>
  ));

  return (
    <div className={styles.maintenancesSVLContainer}>
      <div className={styles.title}>
        Maintenances
      </div>
      {listGroupMaintenances}
      <div className={styles.addRemoveGroupButton}>
        {maintenances[selectedOwner].numGroups == 0 &&
          <AddGroupButton setDataSVL={setMaintenances} selectedOwner={selectedOwner} type={'maintenances'} />
        }
      </div>
    </div>
  );
}

export default MaintenancesSVL;