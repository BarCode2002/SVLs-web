import styles from '../../styles/components/dataSVL/typeSVL.module.css';
import { /*Defects*/ Repairs } from '../../utils/interfaces.ts';
import TextContainer from './readOnlyFields/textContainer.tsx';
import ImageContainer from './readOnlyFields/imageContainer.tsx';
import ToggleVisibilityRDButton from './readOnlyFields/toggleVisibilityRDButton.tsx';
import { useTranslation } from "react-i18next";

type PrevOwnersDefectsSVLProps = {
  selectedOwner: number;
  shrinked: any;
  setShrinked: any;
  prevOwnersDefects: any;
  prevOwnersRepairs: any;
  repairs: Repairs[];
};

const PrevOwnersDefectsSVL = ({ selectedOwner, shrinked, setShrinked, prevOwnersDefects, prevOwnersRepairs, repairs }: PrevOwnersDefectsSVLProps): JSX.Element => {

  const { t } = useTranslation();

  const renderlistDefects = (groupIndex: number) => {

    const listDefects = Array.from({length: prevOwnersDefects[selectedOwner].defects[groupIndex].type.length}, (_, typeIndex) => (
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
        {listDefects}
      </div> 
    );
  };

  const listGroupDefects = Array.from({length: prevOwnersDefects[selectedOwner].defects.length }, (_, groupIndex) => (
    <div key={groupIndex}>
      <div className={styles.groupContainer}>
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