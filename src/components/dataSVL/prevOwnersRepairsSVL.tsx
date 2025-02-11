import styles from '../../styles/components/dataSVL/typeSVL.module.css';
//import { Repairs } from '../../utils/interfaces.ts';
import TextContainer from './readOnlyFields/textContainer.tsx';
import ImageContainer from './readOnlyFields/imageContainer.tsx';
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
            {/*<TextContainer fieldLabel={t('DataSVL.Labels.name')} text={prevOwnersMaintenances[selectedOwner].maintenances[groupIndex].name} />*/}
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
            {/*<TextContainer fieldLabel={t('DataSVL.Labels.responsible')} text={prevOwnersMaintenances[selectedOwner].maintenances[groupIndex].responsible} />*/}
            <TextContainer fieldLabel={t('DataSVL.Labels.date')} text={prevOwnersRepairs[selectedOwner].repairs[groupIndex].date} />
            {/*<TextContainer fieldLabel={t('DataSVL.Labels.defectsRepaired')} text={prevOwnersMaintenances[selectedOwner].maintenances[groupIndex].responsible} />*/}
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