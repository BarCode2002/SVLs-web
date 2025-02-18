import styles from '../../styles/components/dataSVL/typeSVL.module.css';
import { Modifications } from '../../utils/interfaces.ts';
import TextContainer from './readOnlyFields/textContainer.tsx';
import ImageContainer from './readOnlyFields/imageContainer.tsx';
import ResponsibleContainer from './readOnlyFields/responsibleContainer.tsx';
import ComponentsContainer from './readOnlyFields/componentsContainer.tsx';
import { useTranslation } from "react-i18next";

type SummaryViewModificationsProps = {
  prevOwnersModifications: any;
  modifications: Modifications[];
  numPreviousOwners: number;
  totalOwners: number;
};

const SummaryViewModifications = ({ prevOwnersModifications, modifications, numPreviousOwners, totalOwners }: SummaryViewModificationsProps): JSX.Element => {

  const { t } = useTranslation();

  const renderListPreviousModifications = (groupIndex: number, selectedOwner: number) => {

    const listPreviousModifications = Array.from({length: prevOwnersModifications[selectedOwner].modifications[groupIndex].type.length}, (_, typeIndex) => (
      <div key={typeIndex} className={styles.typeContainer} >
        <div className={styles.groupType}>
          <div className={styles.groupTypeTopPart}>
            # {typeIndex + 1}
          </div>
          <div className={styles.groupTypeBottomPart}>
            <TextContainer fieldLabel={t('DataSVL.Labels.name')} text={prevOwnersModifications[selectedOwner].modifications[groupIndex].type[typeIndex].name} />
            <ComponentsContainer fieldLabel={t('DataSVL.Labels.components')} numComponents={prevOwnersModifications[selectedOwner].modifications[groupIndex].type[typeIndex].numComponents} components={prevOwnersModifications[selectedOwner].modifications[groupIndex].type[typeIndex].components} />
            <ImageContainer fieldLabel={t('DataSVL.Labels.preImages')} images={prevOwnersModifications[selectedOwner].modifications[groupIndex].type[typeIndex].pre} />
            <ImageContainer fieldLabel={t('DataSVL.Labels.postImages')} images={prevOwnersModifications[selectedOwner].modifications[groupIndex].type[typeIndex].post} />
            <TextContainer fieldLabel={t('DataSVL.Labels.comments')} text={prevOwnersModifications[selectedOwner].modifications[groupIndex].type[typeIndex].comments} />
          </div>
        </div>
      </div>
    ));

    return (
      <div className={styles.typesContainer}>
        {listPreviousModifications}
      </div> 
    );
  };
  
  const listPreviousGroupModifications = (selectedOwner: number) => {

    const listPreviousGroupModifications = Array.from({length: prevOwnersModifications[selectedOwner].modifications.length }, (_, groupIndex) => (
      <div key={groupIndex}>
        <div className={styles.groupContainerPrevOwners}>
          <div className={styles.topPart}>
            <div className={styles.toggleVisibilityRemoveGroup}>
              # {groupIndex + 1}
            </div>
            <div className={styles.topBottomPart}>
              <TextContainer fieldLabel={t('DataSVL.Labels.kilometers')} text={prevOwnersModifications[selectedOwner].modifications[groupIndex].kilometers} />
              <TextContainer fieldLabel={t('DataSVL.Labels.name')} text={prevOwnersModifications[selectedOwner].modifications[groupIndex].name} />
              <ResponsibleContainer fieldLabel={t('DataSVL.Labels.responsible')} responsible={prevOwnersModifications[selectedOwner].modifications[groupIndex].responsible} />
              <TextContainer fieldLabel={t('DataSVL.Labels.date')} text={prevOwnersModifications[selectedOwner].modifications[groupIndex].date} />
              <ImageContainer fieldLabel={t('DataSVL.Labels.preImages')} images={prevOwnersModifications[selectedOwner].modifications[groupIndex].pre} />
              <ImageContainer fieldLabel={t('DataSVL.Labels.postImages')} images={prevOwnersModifications[selectedOwner].modifications[groupIndex].post} />
            </div>
          </div>
          <div>
            {renderListPreviousModifications(groupIndex, selectedOwner)}
          </div>
        </div>
      </div>
    ));

    return (
      <div className={styles.summaryContainer}>
        <div className={styles.owner}>
          {t('DataSVL.Placeholders.owner')} {selectedOwner+1}
        </div>
        {listPreviousGroupModifications}
      </div> 
    );
  };

  const renderListActualModifications = (groupIndex: number, selectedOwner: number) => {

    const listActualModifications = Array.from({length: modifications[selectedOwner-numPreviousOwners].group[groupIndex].type.length}, (_, typeIndex) => (
      <div key={typeIndex} className={styles.typeContainer} >
        <div className={styles.groupType}>
          <div className={styles.groupTypeTopPart}>
            # {typeIndex + 1}
          </div>
          <div className={styles.groupTypeBottomPart}>
            <TextContainer fieldLabel={t('DataSVL.Labels.name')} text={modifications[selectedOwner-numPreviousOwners].group[groupIndex].type[typeIndex].name} />
            <ComponentsContainer fieldLabel={t('DataSVL.Labels.components')} numComponents={modifications[selectedOwner-numPreviousOwners].group[groupIndex].type[typeIndex].numComponents} components={modifications[selectedOwner-numPreviousOwners].group[groupIndex].type[typeIndex].components} />
            <ImageContainer fieldLabel={t('DataSVL.Labels.preImages')} images={modifications[selectedOwner-numPreviousOwners].group[groupIndex].type[typeIndex].pre} />
            <ImageContainer fieldLabel={t('DataSVL.Labels.postImages')} images={modifications[selectedOwner-numPreviousOwners].group[groupIndex].type[typeIndex].post} />
            <TextContainer fieldLabel={t('DataSVL.Labels.comments')} text={modifications[selectedOwner-numPreviousOwners].group[groupIndex].type[typeIndex].comments} />
          </div>
        </div>
      </div>
    ));

    return (
      <div className={styles.typesContainer}>
        {listActualModifications}
      </div> 
    );
  };

  const listActualGroupModifications = (selectedOwner: number) => {

    const listActualGroupModifications = Array.from({length: modifications[selectedOwner-numPreviousOwners].group.length }, (_, groupIndex) => (
      <div key={groupIndex}>
        <div className={styles.groupContainer}>
          <div className={styles.topPart}>
            <div className={styles.toggleVisibilityRemoveGroup}>
              # {groupIndex + 1}
            </div>
            <div className={styles.topBottomPart}>
              <TextContainer fieldLabel={t('DataSVL.Labels.kilometers')} text={modifications[selectedOwner-numPreviousOwners].group[groupIndex].kilometers} />
              <TextContainer fieldLabel={t('DataSVL.Labels.name')} text={modifications[selectedOwner-numPreviousOwners].group[groupIndex].name} />
              <ResponsibleContainer fieldLabel={t('DataSVL.Labels.responsible')} responsible={modifications[selectedOwner-numPreviousOwners].group[groupIndex].responsible} />
              <TextContainer fieldLabel={t('DataSVL.Labels.date')} text={modifications[selectedOwner-numPreviousOwners].group[groupIndex].date} />
              <ImageContainer fieldLabel={t('DataSVL.Labels.preImages')} images={modifications[selectedOwner-numPreviousOwners].group[groupIndex].pre} />
              <ImageContainer fieldLabel={t('DataSVL.Labels.postImages')} images={modifications[selectedOwner-numPreviousOwners].group[groupIndex].post} />
            </div>
          </div>
          <div>
            {renderListActualModifications(groupIndex, selectedOwner)}
          </div>
        </div>
      </div>
    ));

    return (
      <div className={styles.summaryContainer}>
        <div className={styles.owner}>
          {t('DataSVL.Placeholders.owner')} {selectedOwner+1}
        </div>
        {listActualGroupModifications}
      </div> 
    );
  };

  const listModifications = Array.from({length: totalOwners }, (_, selectedOwner) => (
    <div key={selectedOwner}>
      {selectedOwner < numPreviousOwners ? (
        <div>          
          {listPreviousGroupModifications(selectedOwner)}
        </div>
      ) : (
        <div>          
          {listActualGroupModifications(selectedOwner)}
        </div>
      )}
    </div>
  ));

  return (
    <div className={styles.typeSVLContainer}>
      <div className={styles.title}>
        {t('DataSVL.Labels.modifications')}
      </div>
      {listModifications}
    </div>
  );
}

export default SummaryViewModifications;