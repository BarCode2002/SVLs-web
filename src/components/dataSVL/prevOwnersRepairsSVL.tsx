import styles from '../../styles/components/dataSVL/typeSVL.module.css';
//import { Repairs } from '../../utils/interfaces.ts';
import TextContainer from './readOnlyFields/textContainer.tsx';
import ImageContainer from './readOnlyFields/imageContainer.tsx';
import ResponsibleContainer from './readOnlyFields/responsibleContainer.tsx';
import DefectsRepairedContainer from './readOnlyFields/defectsRepairedContainer.tsx';
import ComponentsContainer from './readOnlyFields/componentsContainer.tsx';
import { useTranslation } from "react-i18next";

type PrevOwnersRepairsSVLProps = {
  selectedOwner: number;
  prevOwnersRepairs: any;
};

const PrevOwnersRepairsSVL = ({ selectedOwner, prevOwnersRepairs }: PrevOwnersRepairsSVLProps): JSX.Element => {

  const { t } = useTranslation();

  const renderlistRepairs = (groupIndex: number) => {

    const listRepairs = Array.from({length: prevOwnersRepairs[selectedOwner].repairs[groupIndex].type.length}, (_, typeIndex) => (
      <div key={typeIndex} className={styles.typeContainer} >
        <div className={styles.groupType}>
          <div className={styles.groupTypeTopPart}>
            # {typeIndex + 1}
          </div>
          <div className={styles.groupTypeBottomPart}>
            <TextContainer fieldLabel={t('DataSVL.Labels.name')} text={prevOwnersRepairs[selectedOwner].repairs[groupIndex].type[typeIndex].name} />
            <ComponentsContainer fieldLabel={t('DataSVL.Labels.components')} numComponents={prevOwnersRepairs[selectedOwner].repairs[groupIndex].numComponents} components={prevOwnersRepairs[selectedOwner].repairs[groupIndex].components} />
            <ImageContainer fieldLabel={t('DataSVL.Labels.preImages')} images={prevOwnersRepairs[selectedOwner].repairs[groupIndex].type[typeIndex].pre} />
            <ImageContainer fieldLabel={t('DataSVL.Labels.postImages')} images={prevOwnersRepairs[selectedOwner].repairs[groupIndex].type[typeIndex].post} />
            <TextContainer fieldLabel={t('DataSVL.Labels.comments')} text={prevOwnersRepairs[selectedOwner].repairs[groupIndex].type[typeIndex].comments} />
          </div>
        </div>
      </div>
    ));

    return (
      <div className={styles.typesContainer}>
        {listRepairs}
      </div> 
    );
  };

  const listGroupRepairs = Array.from({length: prevOwnersRepairs[selectedOwner].repairs.length }, (_, groupIndex) => (
    <div key={groupIndex}>
      <div className={styles.groupContainer}>
        <div className={styles.topPart}>
          <div className={styles.toggleVisibilityRemoveGroup}>
            # {groupIndex + 1}
          </div>
          <div className={styles.topBottomPart}>
            <TextContainer fieldLabel={t('DataSVL.Labels.kilometers')} text={prevOwnersRepairs[selectedOwner].repairs[groupIndex].kilometers} />
            <TextContainer fieldLabel={t('DataSVL.Labels.name')} text={prevOwnersRepairs[selectedOwner].repairs[groupIndex].name} />
            <ResponsibleContainer fieldLabel={t('DataSVL.Labels.responsible')} responsible={prevOwnersRepairs[selectedOwner].repairs[groupIndex].responsible} />
            <TextContainer fieldLabel={t('DataSVL.Labels.date')} text={prevOwnersRepairs[selectedOwner].repairs[groupIndex].date} />
            <DefectsRepairedContainer fieldLabel={t('DataSVL.Labels.defectsRepaired')} numDefectsRepaired={prevOwnersRepairs[selectedOwner].repairs[groupIndex].numDefectsRepaired} defectsRepaired={prevOwnersRepairs[selectedOwner].repairs[groupIndex].defectsRepaired} />
            <ImageContainer fieldLabel={t('DataSVL.Labels.preImages')} images={prevOwnersRepairs[selectedOwner].repairs[groupIndex].pre} />
            <ImageContainer fieldLabel={t('DataSVL.Labels.postImages')} images={prevOwnersRepairs[selectedOwner].repairs[groupIndex].post} />
          </div>
        </div>
        <div>
          {renderlistRepairs(groupIndex)}
        </div>
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