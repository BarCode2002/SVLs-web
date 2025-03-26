import styles from '../../styles/components/dataSVL/typeSVL.module.css';
import TextContainer from './readOnlyFields/textContainer.tsx';
import ImageContainer from './readOnlyFields/imageContainer.tsx';
import ResponsibleContainer from './readOnlyFields/responsibleContainer.tsx';
import ComponentsContainer from './readOnlyFields/componentsContainer.tsx';
import ToggleVisibilityRDButton from './readOnlyFields/toggleVisibilityRDButton.tsx';
import { useTranslation } from "react-i18next";
import { PossibleModificationsJsonVersions } from '../../utils/commonTypes.ts';
import { isModificationsBase } from '../../utils/checkBaseType.ts';
import { isModificationsBaseSimple } from '../../utils/checkBaseSimpleType.ts';

type PrevOwnersModificationsSVLProps = {
  selectedOwner: number;
  shrinked: any;
  setShrinked: any;
  prevOwnersModifications: PossibleModificationsJsonVersions[];
};

const PrevOwnersModificationsSVL = ({ selectedOwner, shrinked, setShrinked ,prevOwnersModifications }: PrevOwnersModificationsSVLProps): JSX.Element => {

  const { t } = useTranslation();

  const renderlistModifications = (groupIndex: number) => {

    const listModifications = Array.from({length: prevOwnersModifications[selectedOwner].group[groupIndex].type.length}, (_, typeIndex) => (
      <div key={typeIndex} className={styles.typeContainer} >
        <div className={styles.groupType}>
          <div className={styles.groupTypeTopPart}>
            # {typeIndex + 1}
            <ToggleVisibilityRDButton shrinked={shrinked} setShrinked={setShrinked} selectedOwner={selectedOwner} selectedGroup={groupIndex} selectedGroupType={typeIndex} />
          </div>
            {shrinked[selectedOwner][groupIndex].type[typeIndex] == false &&
            <div className={styles.groupTypeBottomPart}>
              <TextContainer fieldLabel={t('DataSVL.Labels.name')} text={prevOwnersModifications[selectedOwner].group[groupIndex].type[typeIndex].name} />
              {isModificationsBase(prevOwnersModifications[selectedOwner], groupIndex, typeIndex) &&
                <ComponentsContainer fieldLabel={t('DataSVL.Labels.components')} components={prevOwnersModifications[selectedOwner].group[groupIndex].type[typeIndex].components} />
              }
              {isModificationsBase(prevOwnersModifications[selectedOwner], groupIndex, typeIndex) &&
                <ImageContainer fieldLabel={t('DataSVL.Labels.preImages')} images={prevOwnersModifications[selectedOwner].group[groupIndex].type[typeIndex].pre} />
              }
              {isModificationsBase(prevOwnersModifications[selectedOwner], groupIndex, typeIndex) &&
                <ImageContainer fieldLabel={t('DataSVL.Labels.postImages')} images={prevOwnersModifications[selectedOwner].group[groupIndex].type[typeIndex].post} />
              }
              {isModificationsBaseSimple(prevOwnersModifications[selectedOwner], groupIndex, typeIndex) &&
                <ImageContainer fieldLabel={t('DataSVL.Labels.images')} images={prevOwnersModifications[selectedOwner].group[groupIndex].type[typeIndex].images} />
              }
              <TextContainer fieldLabel={t('DataSVL.Labels.comments')} text={prevOwnersModifications[selectedOwner].group[groupIndex].type[typeIndex].comments} />
            </div>
          }
        </div>
      </div>
    ));

    return (
      <div className={styles.typesContainer}>
        {listModifications}
      </div> 
    );
  };

  const listGroupModifications = Array.from({length: prevOwnersModifications[selectedOwner].group.length }, (_, groupIndex) => (
    <div key={groupIndex}>
      <div className={styles.groupContainerPrevOwners}>
        <div className={styles.topPart}>
          <div className={styles.toggleVisibilityRemoveGroup}>
            # {groupIndex + 1}
            <ToggleVisibilityRDButton shrinked={shrinked} setShrinked={setShrinked} selectedOwner={selectedOwner} selectedGroup={groupIndex} selectedGroupType={-1} />
          </div>
          {shrinked[selectedOwner][groupIndex].group == false &&
            <div className={styles.topBottomPart}>
              <TextContainer fieldLabel={t('DataSVL.Labels.kilometers')} text={prevOwnersModifications[selectedOwner].group[groupIndex].kilometers} />
              <TextContainer fieldLabel={t('DataSVL.Labels.name')} text={prevOwnersModifications[selectedOwner].group[groupIndex].name} />
              <ResponsibleContainer fieldLabel={t('DataSVL.Labels.responsible')} responsible={prevOwnersModifications[selectedOwner].group[groupIndex].responsible} />
              <TextContainer fieldLabel={t('DataSVL.Labels.date')} text={prevOwnersModifications[selectedOwner].group[groupIndex].date} />
              {isModificationsBase(prevOwnersModifications[selectedOwner], groupIndex) &&
                <ImageContainer fieldLabel={t('DataSVL.Labels.preImages')} images={prevOwnersModifications[selectedOwner].group[groupIndex].pre} />
              }
              {isModificationsBase(prevOwnersModifications[selectedOwner], groupIndex) &&
                <ImageContainer fieldLabel={t('DataSVL.Labels.postImages')} images={prevOwnersModifications[selectedOwner].group[groupIndex].post} />
              }
              {isModificationsBaseSimple(prevOwnersModifications[selectedOwner], groupIndex) &&
                <ImageContainer fieldLabel={t('DataSVL.Labels.images')} images={prevOwnersModifications[selectedOwner].group[groupIndex].images} />
              }
            </div>
          }
        </div>
        {shrinked[selectedOwner][groupIndex].group == false &&
          <div>
            {renderlistModifications(groupIndex)}
          </div>
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
    </div>
  );
}

export default PrevOwnersModificationsSVL;