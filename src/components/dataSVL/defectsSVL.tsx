import { SetStateAction, useState } from 'react';
import styles from '../../styles/components/dataSVL/typeSVL.module.css';
import { Defects, Repairs } from '../../utils/interfaces.ts';
import AddGroupButton from './buttons/addGroupButton.tsx';
import AddGroupTypeButton from './buttons/addGroupTypeButton.tsx';
import RemoveGroupButton from './buttons/removeGroupButton.tsx';
import RemoveGroupTypeButton from './buttons/removeGroupTypeButton.tsx';
import ToggleVisibilityButton from './buttons/toggleVisibilityButton.tsx';
import InputField from './fields/inputField.tsx';
import ImagesField from './fields/imagesField.tsx';
import DateField from './fields/dateField.tsx';
import InputTextField from './fields/inputTextField.tsx';
import DropdownMenu from './fields/dropdownMenu.tsx';
import DragGroupGroupTypeButton from './buttons/dragGroupGroupTypeButton.tsx';
import RepairedDefectsByContainer from './readOnlyFields/repairedDefectByContainer.tsx';
import { useTranslation } from "react-i18next";

type DefectsSVLProps = {
  selectedOwner: number;
  totalOwners: number;
  numPreviousOwners: number;
  defects: Defects[];
  setDefects: React.Dispatch<SetStateAction<Defects[]>>;
  repairs: Repairs[];
  editMode: boolean;
};

const DefectsSVL = ({ selectedOwner, totalOwners, numPreviousOwners, defects, setDefects, repairs, editMode }: DefectsSVLProps): JSX.Element => {

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
      const updatedDefects = [...defects];
      if (groupIndex == groupIndexDragged) {
        if (typeIndexDragged > typeIndex) {
          const draggedMaintenance = defects[selectedOwner].group[groupIndex].type[typeIndexDragged];
          for (let i = typeIndexDragged; i > typeIndex; i--) {
            updatedDefects[selectedOwner].group[groupIndex].type[i] = defects[selectedOwner].group[groupIndex].type[i-1];
          }
          updatedDefects[selectedOwner].group[groupIndex].type[typeIndex] = draggedMaintenance;
        }
        else if (typeIndexDragged < typeIndex) {
          const draggedMaintenance = defects[selectedOwner].group[groupIndex].type[typeIndexDragged];
          for (let i = typeIndexDragged; i < typeIndex ; i++) {
            updatedDefects[selectedOwner].group[groupIndex].type[i] = defects[selectedOwner].group[groupIndex].type[i+1];
          }
          updatedDefects[selectedOwner].group[groupIndex].type[typeIndex] = draggedMaintenance;
        }
      }
      setDefects(updatedDefects);
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  }

  const renderlistDefects = (groupIndex: number) => {

    const listDefects = Array.from({length: defects[selectedOwner].group[groupIndex].type.length}, (_, typeIndex) => (
      <div key={typeIndex} className={styles.typeContainer} 
        draggable={draggable} onDragStart={(e) => handleOnDrag(e, groupIndex, typeIndex)} 
        onDrop={(e) => handleOnDrop(e, groupIndex, typeIndex)} onDragOver={(e) => handleDragOver(e)} >
        <div className={styles.groupType}>
          <div className={styles.groupTypeTopPart}>
            # {typeIndex + 1}
            <ToggleVisibilityButton dataSVL={defects} setDataSVL={setDefects} selectedOwner={selectedOwner} 
              selectedGroup={groupIndex} selectedGroupType={typeIndex}
            />
            <DragGroupGroupTypeButton setDraggable={setDraggable} editMode={editMode} />
            {defects[selectedOwner].group[groupIndex].type.length > 1 &&
              <RemoveGroupTypeButton setDataSVL={setDefects} selectedOwner={selectedOwner} 
                selectedGroup={groupIndex} selectedGroupType={typeIndex} editMode={editMode}
              />
            }
          </div>
          {defects[selectedOwner].group[groupIndex].type[typeIndex].shrinked == false &&
            <div className={styles.groupTypeBottomPart}>
              <DropdownMenu fieldLabel={''} selectedOwner={selectedOwner} selectedGroup={groupIndex} 
                selectedGroupType={typeIndex} dataSVL={defects} value={defects[selectedOwner].group[groupIndex].type[typeIndex].level} 
                setDataSVL={setDefects} type={'level'} editMode={editMode}
              />
              <ImagesField fieldLabel={''} placeholder={t('DataSVL.Placeholders.images')} selectedOwner={selectedOwner} 
                selectedGroup={groupIndex} selectedGroupType={typeIndex} dataSVL={defects} 
                selectedImages={defects[selectedOwner].group[groupIndex].type[typeIndex].photographs} 
                setDataSVL={setDefects} type={'photographs'} allowMultipleImages={true} editMode={editMode}
              />
              <InputTextField fieldLabel={''} placeholder={t('DataSVL.Placeholders.descriptionDefect')} selectedOwner={selectedOwner} 
                selectedGroup={groupIndex} selectedGroupType={typeIndex} dataSVL={typeIndex} 
                value={defects[selectedOwner].group[groupIndex].type[typeIndex].description} 
                setDataSVL={setDefects} type={'description'} editMode={editMode}
              />
            </div>
          }
        </div>
        <div className={styles.addType}>
          {defects[selectedOwner].group[groupIndex].type.length - 1 == typeIndex &&
            <AddGroupTypeButton setDataSVL={setDefects} selectedOwner={selectedOwner} 
              selectedGroup={groupIndex} type={'defect'} editMode={editMode}
            />
          }
        </div>
      </div>
    ));

    return (
      <div className={styles.typesContainer}>
        {listDefects}
      </div> 
    );
  };

  const listGroupDefects = Array.from({length: defects[selectedOwner].group.length}, (_, groupIndex) => (
    <div key={groupIndex}>
      <div className={styles.groupContainer}>
        <div className={styles.topPart}>
          <div className={styles.toggleVisibilityRemoveGroup}>
            # {groupIndex + 1}
            <ToggleVisibilityButton dataSVL={defects} setDataSVL={setDefects} selectedOwner={selectedOwner} 
              selectedGroup={groupIndex} selectedGroupType={-1}
            />
            <RemoveGroupButton setDataSVL={setDefects} selectedOwner={selectedOwner} selectedGroup={groupIndex} editMode={editMode} />
          </div>
          {defects[selectedOwner].group[groupIndex].shrinked == false &&
            <div className={styles.topBottomPart}>
              <DateField fieldLabel={t('DataSVL.Labels.date')} placeholder={t('DataSVL.Placeholders.date')} selectedOwner={selectedOwner} 
                selectedGroup={groupIndex} dataSVL={defects} setDataSVL={setDefects} type={'date'} editMode={editMode}
              />
              <InputField fieldLabel={t('DataSVL.Labels.kilometers')} placeholder={t('DataSVL.Placeholders.kilometers')} 
                selectedOwner={selectedOwner} selectedGroup={groupIndex} selectedGroupType={-1} dataSVL={defects} 
                value={defects[selectedOwner].group[groupIndex].kilometers} setDataSVL={setDefects} type={'kilometers'} editMode={editMode}
              />
              <InputTextField fieldLabel={t('DataSVL.Labels.cause')} placeholder={t('DataSVL.Placeholders.causeDefect')} selectedOwner={selectedOwner} 
                selectedGroup={groupIndex} selectedGroupType={-1} dataSVL={defects} value={defects[selectedOwner].group[groupIndex].cause} 
                setDataSVL={setDefects} type={'cause'} editMode={editMode}
              />
              <RepairedDefectsByContainer fieldLabel={t('DataSVL.Labels.repairs')} repairs={repairs} selectedOwner={selectedOwner+numPreviousOwners} 
                selectedGroup={groupIndex} numPreviousOwners={numPreviousOwners} totalOwners={totalOwners}
              />
            </div>
          }
        </div>
        {defects[selectedOwner].group[groupIndex].shrinked == false &&
          <div>
            {renderlistDefects(groupIndex)}
          </div>
        }
      </div>
      <div className={styles.addGroupButton}>
        {defects[selectedOwner].group.length - 1 == groupIndex &&
          <AddGroupButton setDataSVL={setDefects} selectedOwner={selectedOwner} type={'defects'} editMode={editMode} />
        }
      </div>
    </div>
  ));

  return (
    <div className={styles.typeSVLContainer}>
      <div className={styles.title}>
        {t('DataSVL.Labels.defects')}
      </div>
      {listGroupDefects}
      <div className={styles.addGroupButton}>
        {defects[selectedOwner].group.length == 0 &&
          <AddGroupButton setDataSVL={setDefects} selectedOwner={selectedOwner} type={'defects'} editMode={editMode} />
        }
      </div>
    </div>
  );
}

export default DefectsSVL;