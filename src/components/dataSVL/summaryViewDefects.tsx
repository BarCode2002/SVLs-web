import styles from '../../styles/components/dataSVL/typeSVL.module.css';
import { Defects, Repairs } from '../../utils/interfaces.ts';
import TextContainer from './readOnlyFields/textContainer.tsx';
import ImageContainer from './readOnlyFields/imageContainer.tsx';
import RepairedDefectsByContainer from './readOnlyFields/repairedDefectByContainer.tsx';
import ToggleVisibilityButton from './buttons/toggleVisibilityButton.tsx';
import ToggleVisibilityRDButton from './readOnlyFields/toggleVisibilityRDButton.tsx';
import { useTranslation } from "react-i18next";
import { SetStateAction } from 'react';

type SummaryViewDefectsProps = {
  prevOwnersDefects: any;
  defects: Defects[];
  repairs: Repairs[];
  prevOwnersRepairs: any;
  setDefects: React.Dispatch<SetStateAction<Defects[]>>;
  shrinked: any;
  setShrinked: any;
  numPreviousOwners: number;
  totalOwners: number;
  mySVL: boolean;
};

const SummaryViewDefects = ({ prevOwnersDefects, defects, repairs, prevOwnersRepairs, setDefects, shrinked, setShrinked, numPreviousOwners, totalOwners, mySVL }: SummaryViewDefectsProps): JSX.Element => {

  const { t } = useTranslation();

  const renderListPreviousDefects = (groupIndex: number, selectedOwner: number) => {

    const listPreviousDefects = Array.from({length: prevOwnersDefects[selectedOwner].defects[groupIndex].type.length}, (_, typeIndex) => (
      <div key={typeIndex} className={styles.typeContainer} >
        <div className={styles.groupType}>
          <div className={styles.groupTypeTopPart}>
            # {typeIndex + 1}
            <ToggleVisibilityRDButton shrinked={shrinked} setShrinked={setShrinked} selectedOwner={selectedOwner} selectedGroup={groupIndex} selectedGroupType={typeIndex} />
          </div>
          {shrinked[selectedOwner][groupIndex].type[typeIndex] == false &&
            <div className={styles.groupTypeBottomPart}>
              <TextContainer fieldLabel={t('DataSVL.Labels.level')} text={prevOwnersDefects[selectedOwner].defects[groupIndex].type[typeIndex].level} />
              <ImageContainer fieldLabel={t('DataSVL.Labels.images')} images={prevOwnersDefects[selectedOwner].defects[groupIndex].type[typeIndex].photographs} />
              <TextContainer fieldLabel={t('DataSVL.Labels.description')} text={prevOwnersDefects[selectedOwner].defects[groupIndex].type[typeIndex].description} />
            </div>
          }
        </div>
      </div>
    ));

    return (
      <div className={styles.typesContainer}>
        {listPreviousDefects}
      </div> 
    );
  };
  
  const listPreviousGroupDefects = (selectedOwner: number) => {

    const listPreviousGroupDefects = Array.from({length: prevOwnersDefects[selectedOwner].defects.length }, (_, groupIndex) => (
      <div key={groupIndex}>
        <div className={styles.groupContainerPrevOwners}>
          <div className={styles.topPart}>
            <div className={styles.toggleVisibilityRemoveGroup}>
              # {groupIndex + 1}
              <ToggleVisibilityRDButton shrinked={shrinked} setShrinked={setShrinked} selectedOwner={selectedOwner} selectedGroup={groupIndex} selectedGroupType={-1} />
            </div>
            {shrinked[selectedOwner][groupIndex].group == false &&
              <div className={styles.topBottomPart}>
                <TextContainer fieldLabel={t('DataSVL.Labels.date')} text={prevOwnersDefects[selectedOwner].defects[groupIndex].date} />
                <TextContainer fieldLabel={t('DataSVL.Labels.kilometers')} text={prevOwnersDefects[selectedOwner].defects[groupIndex].kilometers} />
                <TextContainer fieldLabel={t('DataSVL.Labels.cause')} text={prevOwnersDefects[selectedOwner].defects[groupIndex].cause} />
                <RepairedDefectsByContainer fieldLabel={t('DataSVL.Labels.repairs')} repairs={repairs} prevOwnersRepairs={prevOwnersRepairs}  
                  selectedOwner={selectedOwner} selectedGroup={groupIndex} numPreviousOwners={numPreviousOwners} totalOwners={totalOwners}
                />
              </div>
            }
          </div>
          {shrinked[selectedOwner][groupIndex].group == false &&
            <div>
              {renderListPreviousDefects(groupIndex, selectedOwner)}
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
        {listPreviousGroupDefects}
      </div> 
    );
  };

  const renderListActualDefects = (groupIndex: number, selectedOwner: number) => {

    const listActualDefects = Array.from({length: defects[selectedOwner-numPreviousOwners].group[groupIndex].type.length}, (_, typeIndex) => (
      <div key={typeIndex} className={styles.typeContainer} >
        <div className={styles.groupType}>
          <div className={styles.groupTypeTopPart}>
            # {typeIndex + 1}
            <ToggleVisibilityButton dataSVL={defects} setDataSVL={setDefects} selectedOwner={selectedOwner-numPreviousOwners} 
              selectedGroup={groupIndex} selectedGroupType={typeIndex}
            />
          </div>
          {defects[selectedOwner-numPreviousOwners].group[groupIndex].type[typeIndex].shrinked == false &&
            <div className={styles.groupTypeBottomPart}>
              <TextContainer fieldLabel={t('DataSVL.Labels.level')} text={defects[selectedOwner-numPreviousOwners].group[groupIndex].type[typeIndex].level} />
              <ImageContainer fieldLabel={t('DataSVL.Labels.images')} images={defects[selectedOwner-numPreviousOwners].group[groupIndex].type[typeIndex].photographs} />
              <TextContainer fieldLabel={t('DataSVL.Labels.description')} text={defects[selectedOwner-numPreviousOwners].group[groupIndex].type[typeIndex].description} />
            </div>
          }
        </div>
      </div>
    ));

    return (
      <div className={styles.typesContainer}>
        {listActualDefects}
      </div> 
    );
  };

  const listActualGroupDefects = (selectedOwner: number) => {

    const listActualGroupDefects = Array.from({length: defects[selectedOwner-numPreviousOwners].group.length }, (_, groupIndex) => (
      <div key={groupIndex}>
        <div className={styles.groupContainer}>
          <div className={styles.topPart}>
            <div className={styles.toggleVisibilityRemoveGroup}>
              # {groupIndex + 1}
              <ToggleVisibilityButton dataSVL={defects} setDataSVL={setDefects} selectedOwner={selectedOwner-numPreviousOwners} 
                selectedGroup={groupIndex} selectedGroupType={-1}
              />
            </div>
            {defects[selectedOwner-numPreviousOwners].group[groupIndex].shrinked == false &&
              <div className={styles.topBottomPart}>
                <TextContainer fieldLabel={t('DataSVL.Labels.date')} text={defects[selectedOwner-numPreviousOwners].group[groupIndex].date} />
                <TextContainer fieldLabel={t('DataSVL.Labels.kilometers')} text={defects[selectedOwner-numPreviousOwners].group[groupIndex].kilometers} />
                <TextContainer fieldLabel={t('DataSVL.Labels.cause')} text={defects[selectedOwner-numPreviousOwners].group[groupIndex].cause} />
                <RepairedDefectsByContainer fieldLabel={t('DataSVL.Labels.repairs')} repairs={repairs} selectedOwner={selectedOwner} 
                  selectedGroup={groupIndex} numPreviousOwners={numPreviousOwners} totalOwners={totalOwners}
                />
              </div>
            }
          </div>
          {defects[selectedOwner-numPreviousOwners].group[groupIndex].shrinked == false &&
            <div>
              {renderListActualDefects(groupIndex, selectedOwner)}
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
        {listActualGroupDefects}
      </div> 
    );
  };

  const listDefects = Array.from({length: totalOwners }, (_, selectedOwner) => (
    <div key={selectedOwner}>
      {!mySVL || selectedOwner < numPreviousOwners ? (
        <div>          
          {listPreviousGroupDefects(selectedOwner)}
        </div>
      ) : (
        <div>          
          {listActualGroupDefects(selectedOwner)}
        </div>
      )}
    </div>
  ));

  return (
    <div className={styles.typeSVLContainer}>
      <div className={styles.title}>
        {t('DataSVL.Labels.defects')}
      </div>
      {listDefects}
    </div>
  );
}

export default SummaryViewDefects;