import styles from '../../styles/components/dataSVL/typeSVL.module.css';
import { Repairs } from '../../utils/interfaces.ts';
import TextContainer from './readOnlyFields/textContainer.tsx';
import ImageContainer from './readOnlyFields/imageContainer.tsx';
import ResponsibleContainer from './readOnlyFields/responsibleContainer.tsx';
import ComponentsContainer from './readOnlyFields/componentsContainer.tsx';
import DefectsRepairedContainer from './readOnlyFields/defectsRepairedContainer.tsx';
import ToggleVisibilityButton from './buttons/toggleVisibilityButton.tsx';
import ToggleVisibilityRDButton from './readOnlyFields/toggleVisibilityRDButton.tsx';
import { useTranslation } from "react-i18next";
import { SetStateAction } from 'react';

type SummaryViewRepairsProps = {
  prevOwnersRepairs: any;
  repairs: Repairs[];
  setRepairs: React.Dispatch<SetStateAction<Repairs[]>>;
  shrinked: any;
  setShrinked: any;
  numPreviousOwners: number;
  totalOwners: number;
};

const SummaryViewRepairs = ({ prevOwnersRepairs, repairs, setRepairs, shrinked, setShrinked, numPreviousOwners, totalOwners }: SummaryViewRepairsProps): JSX.Element => {

  const { t } = useTranslation();

  const renderListPreviousRepairs = (groupIndex: number, selectedOwner: number) => {

    const listPreviousRepairs = Array.from({length: prevOwnersRepairs[selectedOwner].repairs[groupIndex].type.length}, (_, typeIndex) => (
      <div key={typeIndex} className={styles.typeContainer} >
        <div className={styles.groupType}>
          <div className={styles.groupTypeTopPart}>
            # {typeIndex + 1}
            <ToggleVisibilityRDButton shrinked={shrinked} setShrinked={setShrinked} selectedOwner={selectedOwner} selectedGroup={groupIndex} selectedGroupType={typeIndex} />
          </div>
          {shrinked[selectedOwner][groupIndex].type[typeIndex] == false &&
            <div className={styles.groupTypeBottomPart}>
              <TextContainer fieldLabel={t('DataSVL.Labels.name')} text={prevOwnersRepairs[selectedOwner].repairs[groupIndex].type[typeIndex].name} />
              <ComponentsContainer fieldLabel={t('DataSVL.Labels.components')} components={prevOwnersRepairs[selectedOwner].repairs[groupIndex].type[typeIndex].components} />
              <ImageContainer fieldLabel={t('DataSVL.Labels.preImages')} images={prevOwnersRepairs[selectedOwner].repairs[groupIndex].type[typeIndex].pre} />
              <ImageContainer fieldLabel={t('DataSVL.Labels.postImages')} images={prevOwnersRepairs[selectedOwner].repairs[groupIndex].type[typeIndex].post} />
              <TextContainer fieldLabel={t('DataSVL.Labels.comments')} text={prevOwnersRepairs[selectedOwner].repairs[groupIndex].type[typeIndex].comments} />
            </div>
          }
        </div>
      </div>
    ));

    return (
      <div className={styles.typesContainer}>
        {listPreviousRepairs}
      </div> 
    );
  };
  
  const listPreviousGroupRepairs = (selectedOwner: number) => {

    const listPreviousGroupRepairs = Array.from({length: prevOwnersRepairs[selectedOwner].repairs.length }, (_, groupIndex) => (
      <div key={groupIndex}>
        <div className={styles.groupContainer}>
          <div className={styles.topPart}>
            <div className={styles.toggleVisibilityRemoveGroup}>
              # {groupIndex + 1}
              <ToggleVisibilityRDButton shrinked={shrinked} setShrinked={setShrinked} selectedOwner={selectedOwner} selectedGroup={groupIndex} selectedGroupType={-1} />
            </div>
            {shrinked[selectedOwner][groupIndex].group == false &&
              <div className={styles.topBottomPart}>
                <TextContainer fieldLabel={t('DataSVL.Labels.kilometers')} text={prevOwnersRepairs[selectedOwner].repairs[groupIndex].kilometers} />
                <TextContainer fieldLabel={t('DataSVL.Labels.name')} text={prevOwnersRepairs[selectedOwner].repairs[groupIndex].name} />
                <ResponsibleContainer fieldLabel={t('DataSVL.Labels.responsible')} responsible={prevOwnersRepairs[selectedOwner].repairs[groupIndex].responsible} />
                <TextContainer fieldLabel={t('DataSVL.Labels.date')} text={prevOwnersRepairs[selectedOwner].repairs[groupIndex].date} />
                <DefectsRepairedContainer fieldLabel={t('DataSVL.Labels.defectsRepaired')} numDefectsRepaired={prevOwnersRepairs[selectedOwner].repairs[groupIndex].numDefectsRepaired} defectsRepaired={prevOwnersRepairs[selectedOwner].repairs[groupIndex].defectsRepaired} />
                <ImageContainer fieldLabel={t('DataSVL.Labels.preImages')} images={prevOwnersRepairs[selectedOwner].repairs[groupIndex].pre} />
                <ImageContainer fieldLabel={t('DataSVL.Labels.postImages')} images={prevOwnersRepairs[selectedOwner].repairs[groupIndex].post} />
              </div>
            }
          </div>
          {shrinked[selectedOwner][groupIndex].group == false &&
            <div>
              {renderListPreviousRepairs(groupIndex, selectedOwner)}
            </div>
          }
        </div>
      </div>
    ));

    return (
      <div className={styles.summaryContainer}>
        <div className={styles.owner}>
          {t('DataSVL.Placeholders.owner')} {selectedOwner+1}
        </div>
        {listPreviousGroupRepairs}
      </div> 
    );
  };

  const renderListActualRepairs = (groupIndex: number, selectedOwner: number) => {

    const listActualRepairs = Array.from({length: repairs[selectedOwner-numPreviousOwners].group[groupIndex].type.length}, (_, typeIndex) => (
      <div key={typeIndex} className={styles.typeContainer} >
        <div className={styles.groupType}>
          <div className={styles.groupTypeTopPart}>
            # {typeIndex + 1}
            <ToggleVisibilityButton dataSVL={repairs} setDataSVL={setRepairs} selectedOwner={selectedOwner-numPreviousOwners} 
              selectedGroup={groupIndex} selectedGroupType={typeIndex}
            />
          </div>
          {repairs[selectedOwner-numPreviousOwners].group[groupIndex].type[typeIndex].shrinked == false &&
            <div className={styles.groupTypeBottomPart}>
              <TextContainer fieldLabel={t('DataSVL.Labels.name')} text={repairs[selectedOwner-numPreviousOwners].group[groupIndex].type[typeIndex].name} />
              <ComponentsContainer fieldLabel={t('DataSVL.Labels.components')} components={repairs[selectedOwner-numPreviousOwners].group[groupIndex].type[typeIndex].components} />
              <ImageContainer fieldLabel={t('DataSVL.Labels.preImages')} images={repairs[selectedOwner-numPreviousOwners].group[groupIndex].type[typeIndex].pre} />
              <ImageContainer fieldLabel={t('DataSVL.Labels.postImages')} images={repairs[selectedOwner-numPreviousOwners].group[groupIndex].type[typeIndex].post} />
              <TextContainer fieldLabel={t('DataSVL.Labels.comments')} text={repairs[selectedOwner-numPreviousOwners].group[groupIndex].type[typeIndex].comments} />
            </div>
          }
        </div>
      </div>
    ));

    return (
      <div className={styles.typesContainer}>
        {listActualRepairs}
      </div> 
    );
  };

  const listActualGroupRepairs = (selectedOwner: number) => {

    const listActualGroupRepairs = Array.from({length: repairs[selectedOwner-numPreviousOwners].group.length }, (_, groupIndex) => (
      <div key={groupIndex}>
        <div className={styles.groupContainer}>
          <div className={styles.topPart}>
            <div className={styles.toggleVisibilityRemoveGroup}>
              # {groupIndex + 1}
              <ToggleVisibilityButton dataSVL={repairs} setDataSVL={setRepairs} selectedOwner={selectedOwner-numPreviousOwners} 
                selectedGroup={groupIndex} selectedGroupType={-1}
              />
            </div>
            {repairs[selectedOwner-numPreviousOwners].group[groupIndex].shrinked == false &&
              <div className={styles.topBottomPart}>
                <TextContainer fieldLabel={t('DataSVL.Labels.kilometers')} text={repairs[selectedOwner-numPreviousOwners].group[groupIndex].kilometers} />
                <TextContainer fieldLabel={t('DataSVL.Labels.name')} text={repairs[selectedOwner-numPreviousOwners].group[groupIndex].name} />
                <ResponsibleContainer fieldLabel={t('DataSVL.Labels.responsible')} responsible={repairs[selectedOwner-numPreviousOwners].group[groupIndex].responsible} />
                <TextContainer fieldLabel={t('DataSVL.Labels.date')} text={repairs[selectedOwner-numPreviousOwners].group[groupIndex].date} />
                <DefectsRepairedContainer fieldLabel={t('DataSVL.Labels.defectsRepaired')} numDefectsRepaired={repairs[selectedOwner-numPreviousOwners].group[groupIndex].numDefectsRepaired} defectsRepaired={repairs[selectedOwner-numPreviousOwners].group[groupIndex].defectsRepaired} />
                <ImageContainer fieldLabel={t('DataSVL.Labels.preImages')} images={repairs[selectedOwner-numPreviousOwners].group[groupIndex].pre} />
                <ImageContainer fieldLabel={t('DataSVL.Labels.postImages')} images={repairs[selectedOwner-numPreviousOwners].group[groupIndex].post} />
              </div>
            }
          </div>
          {repairs[selectedOwner-numPreviousOwners].group[groupIndex].shrinked == false &&
            <div>
              {renderListActualRepairs(groupIndex, selectedOwner)}
            </div>
          }
        </div>
      </div>
    ));

    return (
      <div className={styles.summaryContainer}>
        <div className={styles.owner}>
          {t('DataSVL.Placeholders.owner')} {selectedOwner+1}
        </div>
        {listActualGroupRepairs}
      </div> 
    );
  };

  const listRepairs = Array.from({length: totalOwners }, (_, selectedOwner) => (
    <div key={selectedOwner}>
      {selectedOwner < numPreviousOwners ? (
        <div>          
          {listPreviousGroupRepairs(selectedOwner)}
        </div>
      ) : (
        <div>          
          {listActualGroupRepairs(selectedOwner)}
        </div>
      )}
    </div>
  ));

  return (
    <div className={styles.typeSVLContainer}>
      <div className={styles.title}>
        {t('DataSVL.Labels.repairs')}
      </div>
      {listRepairs}
    </div>
  );
}

export default SummaryViewRepairs;