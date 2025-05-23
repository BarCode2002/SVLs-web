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
import DefectsRepairedField from './fields/defectsRepairedField.tsx';
import { useTranslation } from "react-i18next";
import { isRepairsBase } from '../../utils/checkBaseType.ts';
import { isRepairsBaseSimple } from '../../utils/checkBaseSimpleType.ts';
import { PossibleDefectsJsonVersions, PossibleRepairsJsonVersions } from '../../utils/commonTypes.ts';

type RepairsSVLProps = {
  selectedOwner: number;
  numPreviousOwners: number;
  repairs: PossibleRepairsJsonVersions[];
  setRepairs: React.Dispatch<SetStateAction<PossibleRepairsJsonVersions[]>>;
  defects: PossibleDefectsJsonVersions[];
  prevOwnersDefects: PossibleDefectsJsonVersions[];
  editMode: boolean;
  jsonUploaded: boolean;
  totalOwners: number;
  jsonVersion: string[];
};

const RepairsSVL = ({ selectedOwner, numPreviousOwners, repairs, setRepairs, defects, prevOwnersDefects, editMode, jsonUploaded, totalOwners, jsonVersion }: RepairsSVLProps): JSX.Element => {

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
      const updatedMainteances = [...repairs];
      if (groupIndex == groupIndexDragged) {
        if (typeIndexDragged > typeIndex) {
          const draggedMaintenance = repairs[selectedOwner].group[groupIndex].element[typeIndexDragged];
          for (let i = typeIndexDragged; i > typeIndex; i--) {
            updatedMainteances[selectedOwner].group[groupIndex].element[i] = repairs[selectedOwner].group[groupIndex].element[i-1];
          }
          updatedMainteances[selectedOwner].group[groupIndex].element[typeIndex] = draggedMaintenance;
        }
        else if (typeIndexDragged < typeIndex) {
          const draggedMaintenance = repairs[selectedOwner].group[groupIndex].element[typeIndexDragged];
          for (let i = typeIndexDragged; i < typeIndex ; i++) {
            updatedMainteances[selectedOwner].group[groupIndex].element[i] = repairs[selectedOwner].group[groupIndex].element[i+1];
          }
          updatedMainteances[selectedOwner].group[groupIndex].element[typeIndex] = draggedMaintenance;
        }
      }
      setRepairs(updatedMainteances);
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  }

  const renderlistRepairs = (groupIndex: number) => {

    const listMaintenances = Array.from({length: repairs[selectedOwner].group[groupIndex].element.length}, (_, typeIndex) => (
      <div key={typeIndex} className={styles.typeContainer} 
        draggable={draggable} onDragStart={(e) => handleOnDrag(e, groupIndex, typeIndex)} 
        onDrop={(e) => handleOnDrop(e, groupIndex, typeIndex)} onDragOver={(e) => handleDragOver(e)} >
        <div className={styles.groupType}>
          <div className={styles.groupTypeTopPart}>
            # {typeIndex + 1}
            <ToggleVisibilityButton dataSVL={repairs} setDataSVL={setRepairs} selectedOwner={selectedOwner} 
              selectedGroup={groupIndex} selectedGroupType={typeIndex}
            />
            {repairs[selectedOwner].group[groupIndex].element.length > 1 &&
              <DragGroupGroupTypeButton setDraggable={setDraggable} editMode={editMode} />
            }
            {repairs[selectedOwner].group[groupIndex].element.length > 1 &&
              <RemoveGroupTypeButton setDataSVL={setRepairs} selectedOwner={selectedOwner} 
                selectedGroup={groupIndex} selectedGroupType={typeIndex} editMode={editMode}
              />
            }
          </div>
          {repairs[selectedOwner].group[groupIndex].element[typeIndex].shrinked == false &&
            <div className={styles.groupTypeBottomPart}>
              <InputField fieldLabel={''} placeholder={t('DataSVL.Placeholders.nameRepair')} selectedOwner={selectedOwner} 
                selectedGroup={groupIndex} selectedGroupType={typeIndex} dataSVL={repairs} 
                value={repairs[selectedOwner].group[groupIndex].element[typeIndex].name} 
                setDataSVL={setRepairs} type={'name'} editMode={editMode}
              />
              {isRepairsBase(repairs[selectedOwner], groupIndex, typeIndex) &&
                <ComponentsField placeholder={t('DataSVL.Placeholders.component')} selectedOwner={selectedOwner} selectedGroup={groupIndex} 
                  selectedGroupType={typeIndex} dataSVL={repairs} 
                  selectedComponents={repairs[selectedOwner].group[groupIndex].element[typeIndex].components} 
                  setDataSVL={setRepairs} type={'components'} editMode={editMode}
                />
              }
              {isRepairsBase(repairs[selectedOwner], groupIndex, typeIndex) &&
                <ImagesField fieldLabel={''} placeholder={t('DataSVL.Placeholders.preImages')} selectedOwner={selectedOwner} 
                  selectedGroup={groupIndex} selectedGroupType={typeIndex} dataSVL={repairs} 
                  selectedImages={repairs[selectedOwner].group[groupIndex].element[typeIndex].pre} 
                  setDataSVL={setRepairs} type={'pre'} allowMultipleImages={true} editMode={editMode} jsonUploaded={jsonUploaded}
                />
              }
              {isRepairsBase(repairs[selectedOwner], groupIndex, typeIndex) &&
                <ImagesField fieldLabel={''} placeholder={t('DataSVL.Placeholders.postImages')} selectedOwner={selectedOwner} 
                  selectedGroup={groupIndex} selectedGroupType={typeIndex} dataSVL={repairs} 
                  selectedImages={repairs[selectedOwner].group[groupIndex].element[typeIndex].post} 
                  setDataSVL={setRepairs} type={'post'} allowMultipleImages={true} editMode={editMode} jsonUploaded={jsonUploaded}
                />
              }
              {isRepairsBaseSimple(repairs[selectedOwner], groupIndex, typeIndex) &&
                <ImagesField fieldLabel={''} placeholder={t('DataSVL.Placeholders.images')} selectedOwner={selectedOwner} 
                  selectedGroup={groupIndex} selectedGroupType={typeIndex} dataSVL={repairs} 
                  selectedImages={repairs[selectedOwner].group[groupIndex].element[typeIndex].images} 
                  setDataSVL={setRepairs} type={'images'} allowMultipleImages={true} editMode={editMode} jsonUploaded={jsonUploaded}
                />
              }
              <InputTextField fieldLabel={''} placeholder={t('DataSVL.Placeholders.commentsRepair')} selectedOwner={selectedOwner} 
                selectedGroup={groupIndex} selectedGroupType={typeIndex} dataSVL={repairs} 
                value={repairs[selectedOwner].group[groupIndex].element[typeIndex].comments} 
                setDataSVL={setRepairs} type={'comments'} editMode={editMode}
              />
            </div>
          }
        </div>
        <div className={styles.addType}>
          {repairs[selectedOwner].group[groupIndex].element.length - 1 == typeIndex &&
            <AddGroupTypeButton setDataSVL={setRepairs} selectedOwner={selectedOwner} 
              selectedGroup={groupIndex} type={'repairs'} editMode={editMode} jsonVersion={jsonVersion[selectedOwner+numPreviousOwners]}
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

  const listGroupRepairs = Array.from({length: repairs[selectedOwner].group.length}, (_, groupIndex) => (
    <div key={groupIndex}>
      <div className={styles.groupContainer}>
        <div className={styles.topPart}>
          <div className={styles.toggleVisibilityRemoveGroup}>
            # {groupIndex + 1}
            <ToggleVisibilityButton dataSVL={repairs} setDataSVL={setRepairs} selectedOwner={selectedOwner} 
              selectedGroup={groupIndex} selectedGroupType={-1}
            />
            <RemoveGroupButton setDataSVL={setRepairs} selectedOwner={selectedOwner} selectedGroup={groupIndex} editMode={editMode} />
          </div>
          {repairs[selectedOwner].group[groupIndex].shrinked == false &&
            <div className={styles.topBottomPart}>
              <InputField fieldLabel={t('DataSVL.Labels.kilometers')} placeholder={t('DataSVL.Placeholders.kilometers')} 
                selectedOwner={selectedOwner} selectedGroup={groupIndex} selectedGroupType={-1} dataSVL={repairs} 
                value={repairs[selectedOwner].group[groupIndex].kilometers} setDataSVL={setRepairs} type={'kilometers'} editMode={editMode}
              />
              <InputField fieldLabel={t('DataSVL.Labels.name')} placeholder={t('DataSVL.Placeholders.nameGroupRepair')} 
                selectedOwner={selectedOwner} selectedGroup={groupIndex} selectedGroupType={-1} dataSVL={repairs} 
                value={repairs[selectedOwner].group[groupIndex].name} setDataSVL={setRepairs} type={'name'} editMode={editMode}
              />
              <ResponsibleField fieldLabel={t('DataSVL.Labels.responsible')} selectedOwner={selectedOwner} selectedGroup={groupIndex} 
                dataSVL={repairs} value={repairs[selectedOwner].group[groupIndex].responsible} 
                setDataSVL={setRepairs} type={'repairs'} editMode={editMode}
              />
              <DateField fieldLabel={t('DataSVL.Labels.date')} placeholder={t('DataSVL.Placeholders.date')} selectedOwner={selectedOwner} 
                selectedGroup={groupIndex} dataSVL={repairs} setDataSVL={setRepairs} type={'date'} editMode={editMode}
              />
              <DefectsRepairedField numPreviousOwners={numPreviousOwners} fieldLabel={t('DataSVL.Labels.defectsRepaired')} 
                selectedOwner={selectedOwner} selectedGroup={groupIndex} repairs={repairs} setRepairs={setRepairs} defects={defects} 
                prevOwnersDefects={prevOwnersDefects} editMode={editMode} jsonUploaded={jsonUploaded} totalOwners={totalOwners}
              />
              {isRepairsBase(repairs[selectedOwner], groupIndex) &&
                <ImagesField fieldLabel={t('DataSVL.Labels.preImages')} placeholder={t('DataSVL.Placeholders.preImages')} selectedOwner={selectedOwner} 
                  selectedGroup={groupIndex} selectedGroupType={-1} dataSVL={repairs} selectedImages={repairs[selectedOwner].group[groupIndex].pre} 
                  setDataSVL={setRepairs} type={'pre'} allowMultipleImages={true} editMode={editMode} jsonUploaded={jsonUploaded}
                />
              }
              {isRepairsBase(repairs[selectedOwner], groupIndex) &&
                <ImagesField fieldLabel={t('DataSVL.Labels.postImages')} placeholder={t('DataSVL.Placeholders.postImages')} selectedOwner={selectedOwner} 
                  selectedGroup={groupIndex} selectedGroupType={-1} dataSVL={repairs} selectedImages={repairs[selectedOwner].group[groupIndex].post} 
                  setDataSVL={setRepairs} type={'post'} allowMultipleImages={true} editMode={editMode} jsonUploaded={jsonUploaded}
                />
              }
              {isRepairsBaseSimple(repairs[selectedOwner], groupIndex) &&
                <ImagesField fieldLabel={t('DataSVL.Labels.images')} placeholder={t('DataSVL.Placeholders.postImages')} selectedOwner={selectedOwner} 
                  selectedGroup={groupIndex} selectedGroupType={-1} dataSVL={repairs} selectedImages={repairs[selectedOwner].group[groupIndex].images} 
                  setDataSVL={setRepairs} type={'images'} allowMultipleImages={true} editMode={editMode} jsonUploaded={jsonUploaded}
                />
              }
            </div>
          }
        </div>
        {repairs[selectedOwner].group[groupIndex].shrinked == false &&
          <div>
            {renderlistRepairs(groupIndex)}
          </div>
        }
      </div>
      <div className={styles.addGroupButton}>
        {repairs[selectedOwner].group.length - 1 == groupIndex &&
          <AddGroupButton setDataSVL={setRepairs} selectedOwner={selectedOwner} type={'repairs'} editMode={editMode} 
            jsonVersion={jsonVersion[selectedOwner+numPreviousOwners]}
          />
        }
      </div>
    </div>
  ));

  return (
    <div className={styles.typeSVLContainer}>
      <div className={styles.title}>
        {t('DataSVL.Labels.repairs')}
      </div>
      {listGroupRepairs}
      <div className={styles.addGroupButton}>
        {repairs[selectedOwner].group.length == 0 &&
          <AddGroupButton setDataSVL={setRepairs} selectedOwner={selectedOwner} type={'repairs'} editMode={editMode} 
            jsonVersion={jsonVersion[selectedOwner+numPreviousOwners]}
          />
        }
      </div>
    </div>
  );
}

export default RepairsSVL;