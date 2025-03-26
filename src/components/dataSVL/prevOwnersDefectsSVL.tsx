import styles from '../../styles/components/dataSVL/typeSVL.module.css';
import TextContainer from './readOnlyFields/textContainer.tsx';
import ImageContainer from './readOnlyFields/imageContainer.tsx';
import RepairedDefectsByContainer from './readOnlyFields/repairedDefectByContainer.tsx';
import ToggleVisibilityRDButton from './readOnlyFields/toggleVisibilityRDButton.tsx';
import { useTranslation } from "react-i18next";
import { PossibleDefectsJsonVersions, PossibleRepairsJsonVersions } from '../../utils/commonTypes.ts';

type PrevOwnersDefectsSVLProps = {
  selectedOwner: number;
  numPreviousOwners: number;
  totalOwners: number,
  shrinked: any;
  setShrinked: any;
  prevOwnersDefects: PossibleDefectsJsonVersions[];
  prevOwnersRepairs: PossibleRepairsJsonVersions[];
  repairs: PossibleRepairsJsonVersions[];
  mySVL: boolean;
};

const PrevOwnersDefectsSVL = ({ selectedOwner, numPreviousOwners, totalOwners, shrinked, setShrinked, prevOwnersDefects, prevOwnersRepairs, repairs, mySVL }: PrevOwnersDefectsSVLProps): JSX.Element => {

  const { t } = useTranslation();

  const renderlistDefects = (groupIndex: number) => {

    const listDefects = Array.from({length: prevOwnersDefects[selectedOwner].group[groupIndex].type.length}, (_, typeIndex) => (
      <div key={typeIndex} className={styles.typeContainer} >
        <div className={styles.groupType}>
          <div className={styles.groupTypeTopPart}>
            # {typeIndex + 1}
            <ToggleVisibilityRDButton shrinked={shrinked} setShrinked={setShrinked} selectedOwner={selectedOwner} selectedGroup={groupIndex} selectedGroupType={typeIndex} />
          </div>
          {shrinked[selectedOwner][groupIndex].type[typeIndex] == false &&
            <div className={styles.groupTypeBottomPart}>
              <TextContainer fieldLabel={t('DataSVL.Labels.level')} text={prevOwnersDefects[selectedOwner].group[groupIndex].type[typeIndex].level} />
              <ImageContainer fieldLabel={t('DataSVL.Labels.images')} images={prevOwnersDefects[selectedOwner].group[groupIndex].type[typeIndex].images} />
              <TextContainer fieldLabel={t('DataSVL.Labels.description')} text={prevOwnersDefects[selectedOwner].group[groupIndex].type[typeIndex].description} />
            </div>
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

  const listGroupDefects = Array.from({length: prevOwnersDefects[selectedOwner].group.length }, (_, groupIndex) => (
    <div key={groupIndex}>
      <div className={styles.groupContainerPrevOwners}>
        <div className={styles.topPart}>
          <div className={styles.toggleVisibilityRemoveGroup}>
            # {groupIndex + 1}
            <ToggleVisibilityRDButton shrinked={shrinked} setShrinked={setShrinked} selectedOwner={selectedOwner} selectedGroup={groupIndex} selectedGroupType={-1} />
          </div>
          {shrinked[selectedOwner][groupIndex].group == false &&
            <div className={styles.topBottomPart}>
              <TextContainer fieldLabel={t('DataSVL.Labels.date')} text={prevOwnersDefects[selectedOwner].group[groupIndex].date} />
              <TextContainer fieldLabel={t('DataSVL.Labels.kilometers')} text={prevOwnersDefects[selectedOwner].group[groupIndex].kilometers} />
              <TextContainer fieldLabel={t('DataSVL.Labels.cause')} text={prevOwnersDefects[selectedOwner].group[groupIndex].cause} />
              <RepairedDefectsByContainer fieldLabel={t('DataSVL.Labels.repairsL')} repairs={repairs} prevOwnersRepairs={prevOwnersRepairs} 
                selectedOwner={selectedOwner} selectedGroup={groupIndex} numPreviousOwners={numPreviousOwners} totalOwners={totalOwners}
                mySVL={mySVL} view={'ownerView'}
              />
            </div>
          }
        </div>
        {shrinked[selectedOwner][groupIndex].group == false &&
          <div>
            {renderlistDefects(groupIndex)}
          </div>
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
    </div>
  );
}

export default PrevOwnersDefectsSVL;