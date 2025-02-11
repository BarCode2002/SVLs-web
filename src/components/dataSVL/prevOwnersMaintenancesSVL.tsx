import styles from '../../styles/components/dataSVL/typeSVL.module.css';
//import { Maintenances } from '../../utils/interfaces.ts';
import TextContainer from './readOnlyFields/textContainer.tsx';
import ImageContainer from './readOnlyFields/imageContainer.tsx';
import { useTranslation } from "react-i18next";

type PrevOwnersMainteancesSVLProps = {
  selectedOwner: number;
  prevOwnersMaintenances: any;
};

const PrevOwnersMaintenancesSVL = ({ selectedOwner, prevOwnersMaintenances }: PrevOwnersMainteancesSVLProps): JSX.Element => {

  const { t } = useTranslation();

  const renderlistMaintenances = (groupIndex: number) => {

    const listMaintenances = Array.from({length: prevOwnersMaintenances[selectedOwner].maintenances[groupIndex].type.length}, (_, typeIndex) => (
      <div key={typeIndex} className={styles.typeContainer} >
        <div className={styles.groupType}>
          <div className={styles.groupTypeTopPart}>
            # {typeIndex + 1}
          </div>
          <div className={styles.groupTypeBottomPart}>
            <TextContainer fieldLabel={t('DataSVL.Labels.name')} text={prevOwnersMaintenances[selectedOwner].maintenances[groupIndex].type[typeIndex].name} />
            {/*<TextContainer fieldLabel={t('DataSVL.Labels.name')} text={prevOwnersMaintenances[selectedOwner].maintenances[groupIndex].name} />*/}
            <ImageContainer fieldLabel={t('DataSVL.Labels.preImages')} images={prevOwnersMaintenances[selectedOwner].maintenances[groupIndex].type[typeIndex].pre} />
            <ImageContainer fieldLabel={t('DataSVL.Labels.postImages')} images={prevOwnersMaintenances[selectedOwner].maintenances[groupIndex].type[typeIndex].post} />
            <TextContainer fieldLabel={t('DataSVL.Labels.comments')} text={prevOwnersMaintenances[selectedOwner].maintenances[groupIndex].type[typeIndex].comments} />
          </div>
        </div>
      </div>
    ));

    return (
      <div className={styles.typesContainer}>
        {listMaintenances}
      </div> 
    );
  };

  const listGroupMaintenances = Array.from({length: prevOwnersMaintenances[selectedOwner].maintenances.length }, (_, groupIndex) => (
    <div key={groupIndex}>
      <div className={styles.groupContainer}>
        <div className={styles.topPart}>
          <div className={styles.toggleVisibilityRemoveGroup}>
            # {groupIndex + 1}
          </div>
          <div className={styles.topBottomPart}>
            <TextContainer fieldLabel={t('DataSVL.Labels.kilometers')} text={prevOwnersMaintenances[selectedOwner].maintenances[groupIndex].kilometers} />
            <TextContainer fieldLabel={t('DataSVL.Labels.name')} text={prevOwnersMaintenances[selectedOwner].maintenances[groupIndex].name} />
            {/*<TextContainer fieldLabel={t('DataSVL.Labels.responsible')} text={prevOwnersMaintenances[selectedOwner].maintenances[groupIndex].responsible} />*/}
            <TextContainer fieldLabel={t('DataSVL.Labels.date')} text={prevOwnersMaintenances[selectedOwner].maintenances[groupIndex].date} />
            <ImageContainer fieldLabel={t('DataSVL.Labels.preImages')} images={prevOwnersMaintenances[selectedOwner].maintenances[groupIndex].pre} />
            <ImageContainer fieldLabel={t('DataSVL.Labels.postImages')} images={prevOwnersMaintenances[selectedOwner].maintenances[groupIndex].post} />
          </div>
        </div>
        <div>
          {renderlistMaintenances(groupIndex)}
        </div>
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