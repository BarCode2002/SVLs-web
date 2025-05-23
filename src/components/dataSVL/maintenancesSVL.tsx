import { SetStateAction, useState } from 'react';
import styles from '../../styles/components/dataSVL/typeSVL.module.css';
import AddGroupButton from './buttons/addGroupButton.tsx';
import AddGroupTypeButton from './buttons/addGroupTypeButton.tsx';
import RemoveGroupButton from './buttons/removeGroupButton.tsx';
import RemoveGroupTypeButton from './buttons/removeGroupTypeButton.tsx';
import ToggleVisibilityButton from './buttons/toggleVisibilityButton.tsx';
import InputField from './fields/inputField.tsx';
import ImagesField from './fields/imagesField.tsx';
import DateField from './fields/dateField.tsx';
import InputTextField from './fields/inputTextField.tsx';
import ResponsibleField from './fields/responsibleField.tsx';
import ComponentsField from './fields/componentsField.tsx';
import DragGroupGroupTypeButton from './buttons/dragGroupGroupTypeButton.tsx';
import { useTranslation } from "react-i18next";
import { PossibleMaintenancesJsonVersions } from '../../utils/commonTypes.ts';
import { isMaintenancesBaseSimple } from '../../utils/checkBaseSimpleType.ts';
import { isMaintenancesBase } from '../../utils/checkBaseType.ts';

type MainteancesSVLProps = {
  selectedOwner: number;
  maintenances: PossibleMaintenancesJsonVersions[];
  setMaintenances: React.Dispatch<SetStateAction<PossibleMaintenancesJsonVersions[]>>;
  editMode: boolean;
  jsonUploaded: boolean;
  jsonVersion: string[];
  numPreviousOwners: number;
};

const MaintenancesSVL = ({ selectedOwner, maintenances, setMaintenances, editMode, jsonUploaded, jsonVersion, numPreviousOwners }: MainteancesSVLProps): JSX.Element => {

  const { t } = useTranslation();

  const [draggable, setDraggable] = useState(false);

  const handleOnDrag = (e: React.DragEvent, groupIndex: number, typeIndex: number) => {
    e.dataTransfer.setData("groupIndex", groupIndex.toString());
    e.dataTransfer.setData("typeIndex", typeIndex.toString());
  }

  const handleOnDrop = (e: React.DragEvent, groupIndex: number, typeIndex: number) => {
    if (draggable) {
      const groupIndexDragged = parseInt(e.dataTransfer.getData("groupIndex"));
      const typeIndexDragged = parseInt(e.dataTransfer.getData("typeIndex"));
      const updatedMainteances = [...maintenances];
      if (groupIndex == groupIndexDragged) {
        if (typeIndexDragged > typeIndex) {
          const draggedMaintenance = maintenances[selectedOwner].group[groupIndex].element[typeIndexDragged];
          for (let i = typeIndexDragged; i > typeIndex; i--) {
            updatedMainteances[selectedOwner].group[groupIndex].element[i] = maintenances[selectedOwner].group[groupIndex].element[i-1];
          }
          updatedMainteances[selectedOwner].group[groupIndex].element[typeIndex] = draggedMaintenance;
        }
        else if (typeIndexDragged < typeIndex) {
          const draggedMaintenance = maintenances[selectedOwner].group[groupIndex].element[typeIndexDragged];
          for (let i = typeIndexDragged; i < typeIndex ; i++) {
            updatedMainteances[selectedOwner].group[groupIndex].element[i] = maintenances[selectedOwner].group[groupIndex].element[i+1];
          }
          updatedMainteances[selectedOwner].group[groupIndex].element[typeIndex] = draggedMaintenance;
        }
      }
      setMaintenances(updatedMainteances);
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  }

  const renderlistMaintenances = (groupIndex: number) => {

    const listMaintenances = Array.from({length: maintenances[selectedOwner].group[groupIndex].element.length}, (_, typeIndex) => (
      <div key={typeIndex} className={styles.typeContainer} 
        draggable={draggable} onDragStart={(e) => handleOnDrag(e, groupIndex, typeIndex)} 
        onDrop={(e) => handleOnDrop(e, groupIndex, typeIndex)} onDragOver={(e) => handleDragOver(e)} >
        <div className={styles.groupType}>
          <div className={styles.groupTypeTopPart}>
            # {typeIndex + 1} {draggable ? 'hola' : 'adios'}
            <ToggleVisibilityButton dataSVL={maintenances} setDataSVL={setMaintenances} selectedOwner={selectedOwner} 
              selectedGroup={groupIndex} selectedGroupType={typeIndex}
            />
            {maintenances[selectedOwner].group[groupIndex].element.length > 1 &&
              <DragGroupGroupTypeButton setDraggable={setDraggable} editMode={editMode} />
            }
            {maintenances[selectedOwner].group[groupIndex].element.length > 1 &&
              <RemoveGroupTypeButton setDataSVL={setMaintenances} selectedOwner={selectedOwner} 
                selectedGroup={groupIndex} selectedGroupType={typeIndex} editMode={editMode}
              />
            }
          </div>
          {maintenances[selectedOwner].group[groupIndex].element[typeIndex].shrinked == false &&
            <div className={styles.groupTypeBottomPart}>
              <InputField fieldLabel={''} placeholder={t('DataSVL.Placeholders.nameMaintenance')} selectedOwner={selectedOwner} 
                selectedGroup={groupIndex} selectedGroupType={typeIndex} dataSVL={maintenances} 
                value={maintenances[selectedOwner].group[groupIndex].element[typeIndex].name} 
                setDataSVL={setMaintenances} type={'name'} editMode={editMode}
              />
              {isMaintenancesBase(maintenances[selectedOwner], groupIndex, typeIndex) &&
                <ComponentsField placeholder={t('DataSVL.Placeholders.component')} selectedOwner={selectedOwner} selectedGroup={groupIndex} 
                  selectedGroupType={typeIndex} dataSVL={maintenances} 
                  selectedComponents={maintenances[selectedOwner].group[groupIndex].element[typeIndex].components} 
                  setDataSVL={setMaintenances} type={'components'} editMode={editMode}
                />
              }
              {isMaintenancesBase(maintenances[selectedOwner], groupIndex, typeIndex) &&
                <ImagesField fieldLabel={''} placeholder={t('DataSVL.Placeholders.preImages')} selectedOwner={selectedOwner} 
                  selectedGroup={groupIndex} selectedGroupType={typeIndex} dataSVL={maintenances} 
                  selectedImages={maintenances[selectedOwner].group[groupIndex].element[typeIndex].pre} 
                  setDataSVL={setMaintenances} type={'pre'} allowMultipleImages={true} editMode={editMode} jsonUploaded={jsonUploaded}
                />
              }
              {isMaintenancesBase(maintenances[selectedOwner], groupIndex, typeIndex) &&
                <ImagesField fieldLabel={''} placeholder={t('DataSVL.Placeholders.postImages')} selectedOwner={selectedOwner} 
                  selectedGroup={groupIndex} selectedGroupType={typeIndex} dataSVL={maintenances} 
                  selectedImages={maintenances[selectedOwner].group[groupIndex].element[typeIndex].post} 
                  setDataSVL={setMaintenances} type={'post'} allowMultipleImages={true} editMode={editMode} jsonUploaded={jsonUploaded}
                />
              }
              {isMaintenancesBaseSimple(maintenances[selectedOwner], groupIndex, typeIndex) &&
                <ImagesField fieldLabel={''} placeholder={t('DataSVL.Placeholders.images')} selectedOwner={selectedOwner} 
                  selectedGroup={groupIndex} selectedGroupType={typeIndex} dataSVL={maintenances} 
                  selectedImages={maintenances[selectedOwner].group[groupIndex].element[typeIndex].images} 
                  setDataSVL={setMaintenances} type={'images'} allowMultipleImages={true} editMode={editMode} jsonUploaded={jsonUploaded}
                />
              }
              <InputTextField fieldLabel={''} placeholder={t('DataSVL.Placeholders.commentsMaintenance')} selectedOwner={selectedOwner} 
                selectedGroup={groupIndex} selectedGroupType={typeIndex} dataSVL={maintenances} 
                value={maintenances[selectedOwner].group[groupIndex].element[typeIndex].comments} 
                setDataSVL={setMaintenances} type={'comments'} editMode={editMode}
              />
            </div>
          }
        </div>
        <div className={styles.addType}>
          {maintenances[selectedOwner].group[groupIndex].element.length - 1 == typeIndex &&
            <AddGroupTypeButton setDataSVL={setMaintenances} selectedOwner={selectedOwner} 
              selectedGroup={groupIndex} type={'maintenance'} editMode={editMode} jsonVersion={jsonVersion[selectedOwner+numPreviousOwners]}
            />
          }
        </div>
      </div>
    ));

    return (
      <div className={styles.typesContainer}>
        {listMaintenances}
      </div> 
    );
  };
  
  const listGroupMaintenances = Array.from({length: maintenances[selectedOwner].group.length}, (_, groupIndex) => (
    <div key={groupIndex}>
      <div className={styles.groupContainer}>
        <div className={styles.topPart}>
          <div className={styles.toggleVisibilityRemoveGroup}>
            # {groupIndex + 1}
            <ToggleVisibilityButton dataSVL={maintenances} setDataSVL={setMaintenances} selectedOwner={selectedOwner} 
              selectedGroup={groupIndex} selectedGroupType={-1}
            />
            <RemoveGroupButton setDataSVL={setMaintenances} selectedOwner={selectedOwner} selectedGroup={groupIndex} editMode={editMode} />
          </div>
          {maintenances[selectedOwner].group[groupIndex].shrinked == false &&
            <div className={styles.topBottomPart}>
              <InputField fieldLabel={t('DataSVL.Labels.kilometers')} placeholder={t('DataSVL.Placeholders.kilometers')} selectedOwner={selectedOwner} selectedGroup={groupIndex} 
                selectedGroupType={-1} dataSVL={maintenances} value={maintenances[selectedOwner].group[groupIndex].kilometers} 
                setDataSVL={setMaintenances} type={'kilometers'} editMode={editMode}
              />
              <InputField fieldLabel={t('DataSVL.Labels.name')} placeholder={t('DataSVL.Placeholders.nameGroupMaintenance')} selectedOwner={selectedOwner} selectedGroup={groupIndex} 
                selectedGroupType={-1} dataSVL={maintenances} value={maintenances[selectedOwner].group[groupIndex].name} 
                setDataSVL={setMaintenances} type={'name'} editMode={editMode}
              />
              <ResponsibleField fieldLabel={t('DataSVL.Labels.responsible')} selectedOwner={selectedOwner} selectedGroup={groupIndex} 
                dataSVL={maintenances} value={maintenances[selectedOwner].group[groupIndex].responsible} 
                setDataSVL={setMaintenances} type={'maintenances'} editMode={editMode} jsonUploaded={jsonUploaded}
              />
              <DateField fieldLabel={t('DataSVL.Labels.date')} placeholder={t('DataSVL.Placeholders.date')} selectedOwner={selectedOwner} 
                selectedGroup={groupIndex} dataSVL={maintenances} setDataSVL={setMaintenances} type={'date'} editMode={editMode}
              />
              {isMaintenancesBase(maintenances[selectedOwner], groupIndex) &&
                <ImagesField fieldLabel={t('DataSVL.Labels.preImages')} placeholder={t('DataSVL.Placeholders.preImages')} selectedOwner={selectedOwner} 
                  selectedGroup={groupIndex} selectedGroupType={-1} dataSVL={maintenances} selectedImages={maintenances[selectedOwner].group[groupIndex].pre} 
                  setDataSVL={setMaintenances} type={'pre'} allowMultipleImages={true} editMode={editMode} jsonUploaded={jsonUploaded}
                />
              }
              {isMaintenancesBase(maintenances[selectedOwner], groupIndex) &&
                <ImagesField fieldLabel={t('DataSVL.Labels.postImages')} placeholder={t('DataSVL.Placeholders.postImages')} selectedOwner={selectedOwner} 
                  selectedGroup={groupIndex} selectedGroupType={-1} dataSVL={maintenances} selectedImages={maintenances[selectedOwner].group[groupIndex].post} 
                  setDataSVL={setMaintenances} type={'post'} allowMultipleImages={true} editMode={editMode} jsonUploaded={jsonUploaded}
                /> 
              }
              {isMaintenancesBaseSimple(maintenances[selectedOwner], groupIndex) &&
                <ImagesField fieldLabel={t('DataSVL.Labels.images')} placeholder={t('DataSVL.Placeholders.images')} selectedOwner={selectedOwner} 
                  selectedGroup={groupIndex} selectedGroupType={-1} dataSVL={maintenances} selectedImages={maintenances[selectedOwner].group[groupIndex].images} 
                  setDataSVL={setMaintenances} type={'images'} allowMultipleImages={true} editMode={editMode} jsonUploaded={jsonUploaded}
                /> 
              }
            </div>
          }
        </div>
        {maintenances[selectedOwner].group[groupIndex].shrinked == false &&
          <div>
            {renderlistMaintenances(groupIndex)}
          </div>
        }
      </div>
      <div className={styles.addGroupButton}>
        {maintenances[selectedOwner].group.length - 1 == groupIndex &&
          <AddGroupButton setDataSVL={setMaintenances} selectedOwner={selectedOwner} type={'maintenances'} editMode={editMode}
            jsonVersion={jsonVersion[selectedOwner+numPreviousOwners]}
          />
        }
      </div>
    </div>
  ));

  return (
    <div className={styles.typeSVLContainer}>
      <div className={styles.title}>
        {t('DataSVL.Labels.maintenances')}
      </div>
      {listGroupMaintenances}
      <div className={styles.addGroupButton}>
        {maintenances[selectedOwner].group.length == 0 &&
          <AddGroupButton setDataSVL={setMaintenances} selectedOwner={selectedOwner} type={'maintenances'} editMode={editMode} 
            jsonVersion={jsonVersion[selectedOwner+numPreviousOwners]}
          />
        }
      </div>
    </div>
  );
}

export default MaintenancesSVL;