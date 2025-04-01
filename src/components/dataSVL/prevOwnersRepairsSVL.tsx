import styles from '../../styles/components/dataSVL/typeSVL.module.css';
import TextContainer from './readOnlyFields/textContainer.tsx';
import ImageContainer from './readOnlyFields/imageContainer.tsx';
import ResponsibleContainer from './readOnlyFields/responsibleContainer.tsx';
import DefectsRepairedContainer from './readOnlyFields/defectsRepairedContainer.tsx';
import ComponentsContainer from './readOnlyFields/componentsContainer.tsx';
import ToggleVisibilityRDButton from './readOnlyFields/toggleVisibilityRDButton.tsx';
import { useTranslation } from "react-i18next";
import { PossibleRepairsJsonVersions } from '../../utils/commonTypes.ts';
import { isRepairsBase } from '../../utils/checkBaseType.ts';
import { isRepairsBaseSimple } from '../../utils/checkBaseSimpleType.ts';

type PrevOwnersRepairsSVLProps = {
  selectedOwner: number;
  shrinked: any;
  setShrinked: any;
  prevOwnersRepairs: PossibleRepairsJsonVersions[];
};

const PrevOwnersRepairsSVL = ({ selectedOwner, shrinked, setShrinked, prevOwnersRepairs }: PrevOwnersRepairsSVLProps): JSX.Element => {

  const { t } = useTranslation();

  const renderlistRepairs = (groupIndex: number) => {

    const listRepairs = Array.from({length: prevOwnersRepairs[selectedOwner].group[groupIndex].element.length}, (_, typeIndex) => (
      <div key={typeIndex} className={styles.typeContainer} >
        <div className={styles.groupType}>
          <div className={styles.groupTypeTopPart}>
            # {typeIndex + 1}
            <ToggleVisibilityRDButton shrinked={shrinked} setShrinked={setShrinked} selectedOwner={selectedOwner} selectedGroup={groupIndex} selectedGroupType={typeIndex} />
          </div>
          {shrinked[selectedOwner][groupIndex].element[typeIndex] == false &&
            <div className={styles.groupTypeBottomPart}>
              <TextContainer fieldLabel={t('DataSVL.Labels.name')} text={prevOwnersRepairs[selectedOwner].group[groupIndex].element[typeIndex].name} />
              {isRepairsBase(prevOwnersRepairs[selectedOwner], groupIndex, typeIndex) &&
                <ComponentsContainer fieldLabel={t('DataSVL.Labels.components')} components={prevOwnersRepairs[selectedOwner].group[groupIndex].element[typeIndex].components} />
              }
              {isRepairsBase(prevOwnersRepairs[selectedOwner], groupIndex, typeIndex) &&
                <ImageContainer fieldLabel={t('DataSVL.Labels.preImages')} images={prevOwnersRepairs[selectedOwner].group[groupIndex].element[typeIndex].pre} />
              }
              {isRepairsBase(prevOwnersRepairs[selectedOwner], groupIndex, typeIndex) &&
                <ImageContainer fieldLabel={t('DataSVL.Labels.postImages')} images={prevOwnersRepairs[selectedOwner].group[groupIndex].element[typeIndex].post} />
              }
              {isRepairsBaseSimple(prevOwnersRepairs[selectedOwner], groupIndex, typeIndex) &&
                <ImageContainer fieldLabel={t('DataSVL.Labels.images')} images={prevOwnersRepairs[selectedOwner].group[groupIndex].element[typeIndex].images} />
              }
              <TextContainer fieldLabel={t('DataSVL.Labels.comments')} text={prevOwnersRepairs[selectedOwner].group[groupIndex].element[typeIndex].comments} />
            </div>
          }
        </div>
      </div>
    ));

    return (
      <div className={styles.typesContainer}>
        {listRepairs}
      </div> 
    );
  };

  const listGroupRepairs = Array.from({length: prevOwnersRepairs[selectedOwner].group.length }, (_, groupIndex) => (
    <div key={groupIndex}>
      <div className={styles.groupContainerPrevOwners}>
        <div className={styles.topPart}>
          <div className={styles.toggleVisibilityRemoveGroup}>
            # {groupIndex + 1}
            <ToggleVisibilityRDButton shrinked={shrinked} setShrinked={setShrinked} selectedOwner={selectedOwner} selectedGroup={groupIndex} selectedGroupType={-1} />
          </div>
          {shrinked[selectedOwner][groupIndex].group == false &&
            <div className={styles.topBottomPart}>
              <TextContainer fieldLabel={t('DataSVL.Labels.kilometers')} text={prevOwnersRepairs[selectedOwner].group[groupIndex].kilometers} />
              <TextContainer fieldLabel={t('DataSVL.Labels.name')} text={prevOwnersRepairs[selectedOwner].group[groupIndex].name} />
              <ResponsibleContainer fieldLabel={t('DataSVL.Labels.responsible')} responsible={prevOwnersRepairs[selectedOwner].group[groupIndex].responsible} />
              <TextContainer fieldLabel={t('DataSVL.Labels.date')} text={prevOwnersRepairs[selectedOwner].group[groupIndex].date} />
              <DefectsRepairedContainer fieldLabel={t('DataSVL.Labels.defectsRepaired')} numDefectsRepaired={prevOwnersRepairs[selectedOwner].group[groupIndex].numDefectsRepaired} defectsRepaired={prevOwnersRepairs[selectedOwner].group[groupIndex].defectsRepaired} />
              {isRepairsBase(prevOwnersRepairs[selectedOwner], groupIndex) &&
                <ImageContainer fieldLabel={t('DataSVL.Labels.preImages')} images={prevOwnersRepairs[selectedOwner].group[groupIndex].pre} />
              }
              {isRepairsBase(prevOwnersRepairs[selectedOwner], groupIndex) &&
                <ImageContainer fieldLabel={t('DataSVL.Labels.postImages')} images={prevOwnersRepairs[selectedOwner].group[groupIndex].post} />
              }
              {isRepairsBaseSimple(prevOwnersRepairs[selectedOwner], groupIndex) &&
                <ImageContainer fieldLabel={t('DataSVL.Labels.images')} images={prevOwnersRepairs[selectedOwner].group[groupIndex].images} />
              }
            </div>
          }
        </div>
        {shrinked[selectedOwner][groupIndex].group == false &&
          <div>
            {renderlistRepairs(groupIndex)}
          </div>
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
    </div>
  );
}

export default PrevOwnersRepairsSVL;