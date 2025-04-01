import styles from '../../styles/components/dataSVL/typeSVL.module.css';
import TextContainer from './readOnlyFields/textContainer.tsx';
import ImageContainer from './readOnlyFields/imageContainer.tsx';
import ResponsibleContainer from './readOnlyFields/responsibleContainer.tsx';
import ComponentsContainer from './readOnlyFields/componentsContainer.tsx';
import ToggleVisibilityRDButton from './readOnlyFields/toggleVisibilityRDButton.tsx';
import { useTranslation } from "react-i18next";
import { isMaintenancesBase } from '../../utils/checkBaseType.ts';
import { PossibleMaintenancesJsonVersions } from '../../utils/commonTypes.ts';
import { isMaintenancesBaseSimple } from '../../utils/checkBaseSimpleType.ts';

type PrevOwnersMainteancesSVLProps = {
  selectedOwner: number;
  shrinked: any;
  setShrinked: any;
  prevOwnersMaintenances: PossibleMaintenancesJsonVersions[];
};

const PrevOwnersMaintenancesSVL = ({ selectedOwner, shrinked, setShrinked, prevOwnersMaintenances }: PrevOwnersMainteancesSVLProps): JSX.Element => {

  const { t } = useTranslation();

  const renderlistMaintenances = (groupIndex: number) => {

    const listMaintenances = Array.from({length: prevOwnersMaintenances[selectedOwner].group[groupIndex].element.length}, (_, typeIndex) => (
      <div key={typeIndex} className={styles.typeContainer} >
        <div className={styles.groupType}>
          <div className={styles.groupTypeTopPart}>
            # {typeIndex + 1}
            <ToggleVisibilityRDButton shrinked={shrinked} setShrinked={setShrinked} selectedOwner={selectedOwner} selectedGroup={groupIndex} selectedGroupType={typeIndex} />
          </div>
          {shrinked[selectedOwner][groupIndex].element[typeIndex] == false &&
            <div className={styles.groupTypeBottomPart}>
              <TextContainer fieldLabel={t('DataSVL.Labels.name')} text={prevOwnersMaintenances[selectedOwner].group[groupIndex].element[typeIndex].name} />
              {isMaintenancesBase(prevOwnersMaintenances[selectedOwner], groupIndex, typeIndex) &&
                <ComponentsContainer fieldLabel={t('DataSVL.Labels.components')} components={prevOwnersMaintenances[selectedOwner].group[groupIndex].element[typeIndex].components} />
              }
              {isMaintenancesBase(prevOwnersMaintenances[selectedOwner], groupIndex, typeIndex) &&
                <ImageContainer fieldLabel={t('DataSVL.Labels.preImages')} images={prevOwnersMaintenances[selectedOwner].group[groupIndex].element[typeIndex].pre} />
              }
              {isMaintenancesBase(prevOwnersMaintenances[selectedOwner], groupIndex, typeIndex) &&
                <ImageContainer fieldLabel={t('DataSVL.Labels.postImages')} images={prevOwnersMaintenances[selectedOwner].group[groupIndex].element[typeIndex].post} />
              }
              {isMaintenancesBaseSimple(prevOwnersMaintenances[selectedOwner], groupIndex, typeIndex) &&
                <ImageContainer fieldLabel={t('DataSVL.Labels.images')} images={prevOwnersMaintenances[selectedOwner].group[groupIndex].element[typeIndex].images} />
              }
              <TextContainer fieldLabel={t('DataSVL.Labels.comments')} text={prevOwnersMaintenances[selectedOwner].group[groupIndex].element[typeIndex].comments} />
            </div>
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

  const listGroupMaintenances = Array.from({length: prevOwnersMaintenances[selectedOwner].group.length }, (_, groupIndex) => (
    <div key={groupIndex}>
      <div className={styles.groupContainerPrevOwners}>
        <div className={styles.topPart}>
          <div className={styles.toggleVisibilityRemoveGroup}>
            # {groupIndex + 1}
            <ToggleVisibilityRDButton shrinked={shrinked} setShrinked={setShrinked} selectedOwner={selectedOwner} selectedGroup={groupIndex} selectedGroupType={-1} />
          </div>
          {shrinked[selectedOwner][groupIndex].group == false &&
          <div className={styles.topBottomPart}>
            <TextContainer fieldLabel={t('DataSVL.Labels.kilometers')} text={prevOwnersMaintenances[selectedOwner].group[groupIndex].kilometers} />
            <TextContainer fieldLabel={t('DataSVL.Labels.name')} text={prevOwnersMaintenances[selectedOwner].group[groupIndex].name} />
            <ResponsibleContainer fieldLabel={t('DataSVL.Labels.responsible')} responsible={prevOwnersMaintenances[selectedOwner].group[groupIndex].responsible} />
            <TextContainer fieldLabel={t('DataSVL.Labels.date')} text={prevOwnersMaintenances[selectedOwner].group[groupIndex].date} />
            {isMaintenancesBase(prevOwnersMaintenances[selectedOwner], groupIndex) &&
              <ImageContainer fieldLabel={t('DataSVL.Labels.preImages')} images={prevOwnersMaintenances[selectedOwner].group[groupIndex].pre} />
            }
            {isMaintenancesBase(prevOwnersMaintenances[selectedOwner], groupIndex) &&
              <ImageContainer fieldLabel={t('DataSVL.Labels.postImages')} images={prevOwnersMaintenances[selectedOwner].group[groupIndex].post} />
            }
            {isMaintenancesBaseSimple(prevOwnersMaintenances[selectedOwner], groupIndex) &&
              <ImageContainer fieldLabel={t('DataSVL.Labels.images')} images={prevOwnersMaintenances[selectedOwner].group[groupIndex].images} />
            }
          </div>
          }
        </div>
        {shrinked[selectedOwner][groupIndex].group == false &&
          <div>
            {renderlistMaintenances(groupIndex)}
          </div>
        }
      </div>
    </div>
  ));

  return (
    <div className={styles.typeSVLContainer}>
      <div className={styles.title}>
        {t('DataSVL.Labels.maintenances')}
      </div>
      {listGroupMaintenances}
    </div>
  );
}

export default PrevOwnersMaintenancesSVL;