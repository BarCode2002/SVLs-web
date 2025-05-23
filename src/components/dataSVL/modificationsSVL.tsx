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
import { isModificationsBaseSimple } from '../../utils/checkBaseSimpleType.ts';
import { isModificationsBase } from '../../utils/checkBaseType.ts';
import { PossibleModificationsJsonVersions } from '../../utils/commonTypes.ts';

type ModificationsSVLProps = {
  selectedOwner: number;
  modifications: PossibleModificationsJsonVersions[];
  setModifications: React.Dispatch<SetStateAction<PossibleModificationsJsonVersions[]>>;
  editMode: boolean;
  jsonUploaded: boolean;
  jsonVersion: string[];
  numPreviousOwners: number;
};

const ModificationsSVL = ({ selectedOwner, modifications, setModifications, editMode, jsonUploaded, jsonVersion, numPreviousOwners }: ModificationsSVLProps): JSX.Element => {

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
      const updatedMainteances = [...modifications];
      if (groupIndex == groupIndexDragged) {
        if (typeIndexDragged > typeIndex) {
          const draggedMaintenance = modifications[selectedOwner].group[groupIndex].element[typeIndexDragged];
          for (let i = typeIndexDragged; i > typeIndex; i--) {
            updatedMainteances[selectedOwner].group[groupIndex].element[i] = modifications[selectedOwner].group[groupIndex].element[i-1];
          }
          updatedMainteances[selectedOwner].group[groupIndex].element[typeIndex] = draggedMaintenance;
        }
        else if (typeIndexDragged < typeIndex) {
          const draggedMaintenance = modifications[selectedOwner].group[groupIndex].element[typeIndexDragged];
          for (let i = typeIndexDragged; i < typeIndex ; i++) {
            updatedMainteances[selectedOwner].group[groupIndex].element[i] = modifications[selectedOwner].group[groupIndex].element[i+1];
          }
          updatedMainteances[selectedOwner].group[groupIndex].element[typeIndex] = draggedMaintenance;
        }
      }
      setModifications(updatedMainteances);
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  }

  const renderlistModifications = (groupIndex: number) => {

    const listMaintenances = Array.from({length: modifications[selectedOwner].group[groupIndex].element.length}, (_, typeIndex) => (
      <div key={typeIndex} className={styles.typeContainer} 
        draggable={draggable} onDragStart={(e) => handleOnDrag(e, groupIndex, typeIndex)} 
        onDrop={(e) => handleOnDrop(e, groupIndex, typeIndex)} onDragOver={(e) => handleDragOver(e)} >
        <div className={styles.groupType}>
          <div className={styles.groupTypeTopPart}>
            # {typeIndex + 1}
            <ToggleVisibilityButton dataSVL={modifications} setDataSVL={setModifications} selectedOwner={selectedOwner} 
              selectedGroup={groupIndex} selectedGroupType={typeIndex}
            />
            {modifications[selectedOwner].group[groupIndex].element.length > 1 &&
              <DragGroupGroupTypeButton setDraggable={setDraggable} editMode={editMode} />
            }
            {modifications[selectedOwner].group[groupIndex].element.length > 1 &&
              <RemoveGroupTypeButton setDataSVL={setModifications} selectedOwner={selectedOwner} 
                selectedGroup={groupIndex} selectedGroupType={typeIndex} editMode={editMode}
              />
            }
          </div>
          {modifications[selectedOwner].group[groupIndex].element[typeIndex].shrinked == false &&
            <div className={styles.groupTypeBottomPart}>
              <InputField fieldLabel={''} placeholder={t('DataSVL.Placeholders.nameModification')} selectedOwner={selectedOwner} 
                selectedGroup={groupIndex} selectedGroupType={typeIndex} dataSVL={modifications} 
                value={modifications[selectedOwner].group[groupIndex].element[typeIndex].name} 
                setDataSVL={setModifications} type={'name'} editMode={editMode}
              />
              {isModificationsBase(modifications[selectedOwner], groupIndex, typeIndex) &&
                <ComponentsField placeholder={t('DataSVL.Placeholders.component')} selectedOwner={selectedOwner} selectedGroup={groupIndex} 
                  selectedGroupType={typeIndex} dataSVL={modifications} 
                  selectedComponents={modifications[selectedOwner].group[groupIndex].element[typeIndex].components} 
                  setDataSVL={setModifications} type={'components'} editMode={editMode}
                />
              }
              {isModificationsBase(modifications[selectedOwner], groupIndex, typeIndex) &&
                <ImagesField fieldLabel={''} placeholder={t('DataSVL.Placeholders.preImages')} selectedOwner={selectedOwner} 
                  selectedGroup={groupIndex} selectedGroupType={typeIndex} dataSVL={modifications} 
                  selectedImages={modifications[selectedOwner].group[groupIndex].element[typeIndex].pre} 
                  setDataSVL={setModifications} type={'pre'} allowMultipleImages={true} editMode={editMode} jsonUploaded={jsonUploaded}
                />
              }
              {isModificationsBase(modifications[selectedOwner], groupIndex, typeIndex) &&
                <ImagesField fieldLabel={''} placeholder={t('DataSVL.Placeholders.postImages')} selectedOwner={selectedOwner} 
                  selectedGroup={groupIndex} selectedGroupType={typeIndex} dataSVL={modifications} 
                  selectedImages={modifications[selectedOwner].group[groupIndex].element[typeIndex].post} 
                  setDataSVL={setModifications} type={'post'} allowMultipleImages={true} editMode={editMode} jsonUploaded={jsonUploaded}
                />
              }
              {isModificationsBaseSimple(modifications[selectedOwner], groupIndex, typeIndex) &&
                <ImagesField fieldLabel={''} placeholder={t('DataSVL.Placeholders.images')} selectedOwner={selectedOwner} 
                  selectedGroup={groupIndex} selectedGroupType={typeIndex} dataSVL={modifications} 
                  selectedImages={modifications[selectedOwner].group[groupIndex].element[typeIndex].images} 
                  setDataSVL={setModifications} type={'images'} allowMultipleImages={true} editMode={editMode} jsonUploaded={jsonUploaded}
                />
              }
              <InputTextField fieldLabel={''} placeholder={t('DataSVL.Placeholders.commentsModifications')} selectedOwner={selectedOwner} 
                selectedGroup={groupIndex} selectedGroupType={typeIndex} dataSVL={modifications} 
                value={modifications[selectedOwner].group[groupIndex].element[typeIndex].comments} 
                setDataSVL={setModifications} type={'comments'} editMode={editMode}
              />
            </div>
          }
        </div>
        <div className={styles.addType}>
          {modifications[selectedOwner].group[groupIndex].element.length - 1 == typeIndex &&
            <AddGroupTypeButton setDataSVL={setModifications} selectedOwner={selectedOwner} 
              selectedGroup={groupIndex} type={'modifications'} editMode={editMode} jsonVersion={jsonVersion[selectedOwner+numPreviousOwners]}
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

  const listGroupModifications = Array.from({length: modifications[selectedOwner].group.length}, (_, groupIndex) => (
    <div key={groupIndex}>
      <div className={styles.groupContainer}>
        <div className={styles.topPart}>
          <div className={styles.toggleVisibilityRemoveGroup}>
            # {groupIndex + 1}
            <ToggleVisibilityButton dataSVL={modifications} setDataSVL={setModifications} selectedOwner={selectedOwner} 
              selectedGroup={groupIndex} selectedGroupType={-1}
            />
            <RemoveGroupButton setDataSVL={setModifications} selectedOwner={selectedOwner} selectedGroup={groupIndex} editMode={editMode} />
          </div>
          {modifications[selectedOwner].group[groupIndex].shrinked == false &&
            <div className={styles.topBottomPart}>
              <InputField fieldLabel={t('DataSVL.Labels.kilometers')} placeholder={t('DataSVL.Placeholders.kilometers')} selectedOwner={selectedOwner} selectedGroup={groupIndex} 
                selectedGroupType={-1} dataSVL={modifications} value={modifications[selectedOwner].group[groupIndex].kilometers} 
                setDataSVL={setModifications} type={'kilometers'} editMode={editMode}
              />
              <InputField fieldLabel={t('DataSVL.Labels.name')} placeholder={t('DataSVL.Placeholders.nameGroupModifications')} selectedOwner={selectedOwner} selectedGroup={groupIndex} 
                selectedGroupType={-1} dataSVL={modifications} value={modifications[selectedOwner].group[groupIndex].name} 
                setDataSVL={setModifications} type={'name'} editMode={editMode}
              />
              <ResponsibleField fieldLabel={t('DataSVL.Labels.responsible')} selectedOwner={selectedOwner} selectedGroup={groupIndex} 
                dataSVL={modifications} value={modifications[selectedOwner].group[groupIndex].responsible} 
                setDataSVL={setModifications} type={'modifications'} editMode={editMode} jsonUploaded={jsonUploaded}
              />
              <DateField fieldLabel={t('DataSVL.Labels.date')} placeholder={t('DataSVL.Placeholders.date')} selectedOwner={selectedOwner} 
                selectedGroup={groupIndex} dataSVL={modifications} setDataSVL={setModifications} type={'date'} editMode={editMode}
              />
              {isModificationsBase(modifications[selectedOwner], groupIndex) &&
                <ImagesField fieldLabel={t('DataSVL.Labels.preImages')} placeholder={t('DataSVL.Placeholders.preImages')} selectedOwner={selectedOwner} 
                  selectedGroup={groupIndex} selectedGroupType={-1} dataSVL={modifications} selectedImages={modifications[selectedOwner].group[groupIndex].pre} 
                  setDataSVL={setModifications} type={'pre'} allowMultipleImages={true} editMode={editMode} jsonUploaded={jsonUploaded}
                />
              }
              {isModificationsBase(modifications[selectedOwner], groupIndex) &&
                <ImagesField fieldLabel={t('DataSVL.Labels.postImages')} placeholder={t('DataSVL.Placeholders.postImages')} selectedOwner={selectedOwner} 
                  selectedGroup={groupIndex} selectedGroupType={-1} dataSVL={modifications} selectedImages={modifications[selectedOwner].group[groupIndex].post} 
                  setDataSVL={setModifications} type={'post'} allowMultipleImages={true} editMode={editMode} jsonUploaded={jsonUploaded}
                />
              }
              {isModificationsBaseSimple(modifications[selectedOwner], groupIndex) &&
                <ImagesField fieldLabel={t('DataSVL.Labels.images')} placeholder={t('DataSVL.Placeholders.images')} selectedOwner={selectedOwner} 
                  selectedGroup={groupIndex} selectedGroupType={-1} dataSVL={modifications} selectedImages={modifications[selectedOwner].group[groupIndex].images} 
                  setDataSVL={setModifications} type={'images'} allowMultipleImages={true} editMode={editMode} jsonUploaded={jsonUploaded}
                />
              }
            </div>
          }
        </div>
        {modifications[selectedOwner].group[groupIndex].shrinked == false &&
          <div>
            {renderlistModifications(groupIndex)}
          </div>
        }
      </div>
      <div className={styles.addGroupButton}>
        {modifications[selectedOwner].group.length - 1 == groupIndex &&
          <AddGroupButton setDataSVL={setModifications} selectedOwner={selectedOwner} type={'modifications'} editMode={editMode} 
            jsonVersion={jsonVersion[selectedOwner+numPreviousOwners]}
          />
        }
      </div>
    </div>
  ));

  return (
    <div className={styles.typeSVLContainer}>
      <div className={styles.title}>
        {t('DataSVL.Labels.modifications')}
      </div>
      {listGroupModifications}
      <div className={styles.addGroupButton}>
        {modifications[selectedOwner].group.length == 0 &&
          <AddGroupButton setDataSVL={setModifications} selectedOwner={selectedOwner} type={'modifications'} editMode={editMode} 
            jsonVersion={jsonVersion[selectedOwner+numPreviousOwners]}
          />
        }
      </div>
    </div>
  );
}

export default ModificationsSVL;