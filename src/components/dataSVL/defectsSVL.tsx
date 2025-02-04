import { SetStateAction, useState } from 'react';
import styles from '../../styles/components/dataSVL/typeSVL.module.css';
import { Defects } from '../../utils/dataSVL.ts';
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
import { useTranslation } from "react-i18next";

type DefectsSVLProps = {
  selectedOwner: number;
  defects: Defects[];
  setDefects: React.Dispatch<SetStateAction<Defects[]>>;
};

const DefectsSVL = ({ selectedOwner, defects, setDefects }: DefectsSVLProps): JSX.Element => {

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

    const listDefects = Array.from({length: defects[selectedOwner].group[groupIndex].numTypes}, (_, typeIndex) => (
      <div key={typeIndex} className={styles.typeContainer} 
        draggable={draggable} onDragStart={(e) => handleOnDrag(e, groupIndex, typeIndex)} 
        onDrop={(e) => handleOnDrop(e, groupIndex, typeIndex)} onDragOver={(e) => handleDragOver(e)} >
        <div className={styles.groupType}>
          <div className={styles.groupTypeTopPart}>
            # {typeIndex + 1}
            <ToggleVisibilityButton dataSVL={defects} setDataSVL={setDefects} selectedOwner={selectedOwner} 
              selectedGroup={groupIndex} selectedGroupType={typeIndex}
            />
            <DragGroupGroupTypeButton setDraggable={setDraggable}
            />
            {defects[selectedOwner].group[groupIndex].numTypes > 1 &&
              <RemoveGroupTypeButton setDataSVL={setDefects} selectedOwner={selectedOwner} 
                selectedGroup={groupIndex} selectedGroupType={typeIndex}
              />
            }
          </div>
          {defects[selectedOwner].group[groupIndex].type[typeIndex].shrinked == false &&
            <div className={styles.groupTypeBottomPart}>
              <DropdownMenu fieldLabel={''} selectedOwner={selectedOwner} selectedGroup={groupIndex} 
                selectedGroupType={typeIndex} dataSVL={defects} value={defects[selectedOwner].group[groupIndex].type[typeIndex].level} 
                setDataSVL={setDefects} type={'level'}
              />
              <ImagesField fieldLabel={''} placeholder={t('DataSVL.Placeholders.images')} selectedOwner={selectedOwner} 
                selectedGroup={groupIndex} selectedGroupType={typeIndex} dataSVL={defects} 
                selectedImages={defects[selectedOwner].group[groupIndex].type[typeIndex].photographs} 
                setDataSVL={setDefects} type={'photographs'} allowMultipleImages={true}
              />
              <InputTextField fieldLabel={''} placeholder={t('DataSVL.Placeholders.descriptionDefect')} selectedOwner={selectedOwner} 
                selectedGroup={groupIndex} selectedGroupType={typeIndex} dataSVL={typeIndex} 
                value={defects[selectedOwner].group[groupIndex].type[typeIndex].description} 
                setDataSVL={setDefects} type={'description'}
              />
            </div>
          }
        </div>
        <div className={styles.addType}>
          {defects[selectedOwner].group[groupIndex].numTypes - 1 == typeIndex &&
            <AddGroupTypeButton setDataSVL={setDefects} selectedOwner={selectedOwner} 
              selectedGroup={groupIndex} type={'defect'}
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

  const listGroupDefects = Array.from({length: defects[selectedOwner].numGroups}, (_, groupIndex) => (
    <div key={groupIndex}>
      <div className={styles.groupContainer}>
        <div className={styles.topPart}>
          <div className={styles.toggleVisibilityRemoveGroup}>
            # {groupIndex + 1}
            <ToggleVisibilityButton dataSVL={defects} setDataSVL={setDefects} selectedOwner={selectedOwner} 
              selectedGroup={groupIndex} selectedGroupType={-1}
            />
            <RemoveGroupButton setDataSVL={setDefects} selectedOwner={selectedOwner} selectedGroup={groupIndex} />
          </div>
          {defects[selectedOwner].group[groupIndex].shrinked == false &&
            <div className={styles.topBottomPart}>
              <DateField fieldLabel={t('DataSVL.Labels.date')} placeholder={t('DataSVL.Placeholders.date')} selectedOwner={selectedOwner} 
                selectedGroup={groupIndex} dataSVL={defects} setDataSVL={setDefects} type={'date'}
              />
              <InputField fieldLabel={t('DataSVL.Labels.kilometers')} placeholder={t('DataSVL.Placeholders.kilometers')} 
                selectedOwner={selectedOwner} selectedGroup={groupIndex} selectedGroupType={-1} dataSVL={defects} 
                value={defects[selectedOwner].group[groupIndex].kilometers} setDataSVL={setDefects} type={'kilometers'}
              />
              <InputTextField fieldLabel={t('DataSVL.Labels.cause')} placeholder={t('DataSVL.Placeholders.causeDefect')} selectedOwner={selectedOwner} 
                selectedGroup={groupIndex} selectedGroupType={-1} dataSVL={defects} value={defects[selectedOwner].group[groupIndex].cause} 
                setDataSVL={setDefects} type={'cause'}
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
        {defects[selectedOwner].numGroups - 1 == groupIndex &&
          <AddGroupButton setDataSVL={setDefects} selectedOwner={selectedOwner} type={'defects'} />
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
        {defects[selectedOwner].numGroups == 0 &&
          <AddGroupButton setDataSVL={setDefects} selectedOwner={selectedOwner} type={'defects'} />
        }
      </div>
    </div>
  );
}

export default DefectsSVL;