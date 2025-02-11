import styles from '../../styles/components/dataSVL/typeSVL.module.css';
//import { Modifications } from '../../utils/interfaces.ts';
import TextContainer from './readOnlyFields/textContainer.tsx';
import ImageContainer from './readOnlyFields/imageContainer.tsx';
import { useTranslation } from "react-i18next";

type PrevOwnersModificationsSVLProps = {
  selectedOwner: number;
  prevOwnersModifications: any;
};

const PrevOwnersModificationsSVL = ({ selectedOwner, prevOwnersModifications }: PrevOwnersModificationsSVLProps): JSX.Element => {

  const { t } = useTranslation();

  const renderlistModifications = (groupIndex: number) => {

    const listModifications = Array.from({length: prevOwnersModifications[selectedOwner].modifications[groupIndex].type.length}, (_, typeIndex) => (
      <div key={typeIndex} className={styles.typeContainer} >
        <div className={styles.groupType}>
          <div className={styles.groupTypeTopPart}>
            # {typeIndex + 1}
          </div>
          <div className={styles.groupTypeBottomPart}>
            <TextContainer fieldLabel={t('DataSVL.Labels.name')} text={prevOwnersModifications[selectedOwner].modifications[groupIndex].type[typeIndex].name} />
            {/*<TextContainer fieldLabel={t('DataSVL.Labels.name')} text={prevOwnersMaintenances[selectedOwner].maintenances[groupIndex].name} />*/}
            <ImageContainer fieldLabel={t('DataSVL.Labels.preImages')} images={prevOwnersModifications[selectedOwner].modifications[groupIndex].type[typeIndex].pre} />
            <ImageContainer fieldLabel={t('DataSVL.Labels.postImages')} images={prevOwnersModifications[selectedOwner].modifications[groupIndex].type[typeIndex].post} />
            <TextContainer fieldLabel={t('DataSVL.Labels.comments')} text={prevOwnersModifications[selectedOwner].modifications[groupIndex].type[typeIndex].comments} />
          </div>
        </div>
      </div>
    ));

    return (
      <div className={styles.typesContainer}>
        {listModifications}
      </div> 
    );
  };

  const listGroupModifications = Array.from({length: prevOwnersModifications[selectedOwner].modifications.length }, (_, groupIndex) => (
    <div key={groupIndex}>
      <div className={styles.groupContainer}>
        <div className={styles.topPart}>
          <div className={styles.toggleVisibilityRemoveGroup}>
            # {groupIndex + 1}
          </div>
          <div className={styles.topBottomPart}>
            <TextContainer fieldLabel={t('DataSVL.Labels.kilometers')} text={prevOwnersModifications[selectedOwner].modifications[groupIndex].kilometers} />
            <TextContainer fieldLabel={t('DataSVL.Labels.name')} text={prevOwnersModifications[selectedOwner].modifications[groupIndex].name} />
            {/*<TextContainer fieldLabel={t('DataSVL.Labels.responsible')} text={prevOwnersMaintenances[selectedOwner].maintenances[groupIndex].responsible} />*/}
            <TextContainer fieldLabel={t('DataSVL.Labels.date')} text={prevOwnersModifications[selectedOwner].modifications[groupIndex].date} />
            <ImageContainer fieldLabel={t('DataSVL.Labels.preImages')} images={prevOwnersModifications[selectedOwner].modifications[groupIndex].pre} />
            <ImageContainer fieldLabel={t('DataSVL.Labels.postImages')} images={prevOwnersModifications[selectedOwner].modifications[groupIndex].post} />
          </div>
        </div>
        <div>
          {renderlistModifications(groupIndex)}
        </div>
      </div>
    </div>
  ));

  return (
    <div className={styles.typeSVLContainer}>
      <div className={styles.title}>
        {t('DataSVL.Labels.modifications')}
        {prevOwnersModifications[selectedOwner].modifications.length}
        {prevOwnersModifications[selectedOwner].modifications[0].type.length}
      </div>
      {listGroupModifications}
    </div>
  );
}

export default PrevOwnersModificationsSVL;