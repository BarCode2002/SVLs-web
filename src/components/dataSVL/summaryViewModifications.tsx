import styles from '../../styles/components/dataSVL/typeSVL.module.css';
import { Modifications } from '../../utils/interfaces.ts';
import TextContainer from './readOnlyFields/textContainer.tsx';
import ImageContainer from './readOnlyFields/imageContainer.tsx';
import ResponsibleContainer from './readOnlyFields/responsibleContainer.tsx';
import ComponentsContainer from './readOnlyFields/componentsContainer.tsx';
import ToggleVisibilityButton from './buttons/toggleVisibilityButton.tsx';
import ToggleVisibilityRDButton from './readOnlyFields/toggleVisibilityRDButton.tsx';
import { NoDataModifications } from '../../assets/noData.tsx';
import { useTranslation } from "react-i18next";
import { SetStateAction } from 'react';

type SummaryViewModificationsProps = {
  prevOwnersModifications: any;
  modifications: Modifications[];
  setModifications: React.Dispatch<SetStateAction<Modifications[]>>;
  shrinked: any;
  setShrinked: any;
  numPreviousOwners: number;
  totalOwners: number;
  mySVL: boolean;
};

const SummaryViewModifications = ({ prevOwnersModifications, modifications, setModifications, shrinked, setShrinked, numPreviousOwners, totalOwners, mySVL }: SummaryViewModificationsProps): JSX.Element => {

  const { t } = useTranslation();

  const checkIfSomeDataInType = (selectedOwner: number, groupIndex: number, typeIndex: number, actual: boolean) => {
    if (actual) {
      if (modifications[selectedOwner-numPreviousOwners].group[groupIndex].type[typeIndex].numComponents > 0 ||
        modifications[selectedOwner-numPreviousOwners].group[groupIndex].type[typeIndex].pre.filter(image => image != '').length > 0 ||
        modifications[selectedOwner-numPreviousOwners].group[groupIndex].type[typeIndex].post.filter(image => image != '').length > 0 ||
        modifications[selectedOwner-numPreviousOwners].group[groupIndex].type[typeIndex].comments != '') return true;
      else return false;
    }
    else {
      if (prevOwnersModifications[selectedOwner].modifications[groupIndex].type[typeIndex].numComponents > 0 ||
        prevOwnersModifications[selectedOwner].modifications[groupIndex].type[typeIndex].pre.filter((image: string) => image != '').length > 0 ||
        prevOwnersModifications[selectedOwner].modifications[groupIndex].type[typeIndex].post.filter((image: string) => image != '').length > 0 ||
        prevOwnersModifications[selectedOwner].modifications[groupIndex].type[typeIndex].comments != '') return true;
      else return false;
    }
  };

  const renderListPreviousModifications = (groupIndex: number, selectedOwner: number) => {

    const listPreviousModifications = Array.from({length: prevOwnersModifications[selectedOwner].modifications[groupIndex].type.length}, (_, typeIndex) => (
      <div key={typeIndex} className={styles.typeContainer} >
        <div className={styles.groupType}>
          <div className={styles.groupTypeTopPart}>
            # {typeIndex + 1}
            {prevOwnersModifications[selectedOwner].modifications[groupIndex].type[typeIndex].name != '' ? (
              <div>{prevOwnersModifications[selectedOwner].modifications[groupIndex].type[typeIndex].name}</div>
            ) : (
              <div>{t('DataSVL.Placeholders.noNameSelected')}</div>
            )}
            <ToggleVisibilityRDButton shrinked={shrinked} setShrinked={setShrinked} selectedOwner={selectedOwner} selectedGroup={groupIndex} selectedGroupType={typeIndex} />
          </div>
          {!shrinked[selectedOwner][groupIndex].type[typeIndex] && checkIfSomeDataInType(selectedOwner, groupIndex, typeIndex, false) &&
            <div className={styles.groupTypeBottomPart}>
              {prevOwnersModifications[selectedOwner].modifications[groupIndex].type[typeIndex].numComponents > 0 &&
                <ComponentsContainer fieldLabel={t('DataSVL.Labels.components')} components={prevOwnersModifications[selectedOwner].modifications[groupIndex].type[typeIndex].components} />
              }
              {prevOwnersModifications[selectedOwner].modifications[groupIndex].type[typeIndex].pre.filter((image: string) => image != '').length > 0 &&
                <ImageContainer fieldLabel={t('DataSVL.Labels.preImages')} images={prevOwnersModifications[selectedOwner].modifications[groupIndex].type[typeIndex].pre} />
              }
              {prevOwnersModifications[selectedOwner].modifications[groupIndex].type[typeIndex].post.filter((image: string) => image != '').length > 0 &&
                <ImageContainer fieldLabel={t('DataSVL.Labels.postImages')} images={prevOwnersModifications[selectedOwner].modifications[groupIndex].type[typeIndex].post} />
              }
              {prevOwnersModifications[selectedOwner].modifications[groupIndex].type[typeIndex].comments != '' &&
                <TextContainer fieldLabel={t('DataSVL.Labels.comments')} text={prevOwnersModifications[selectedOwner].modifications[groupIndex].type[typeIndex].comments} />
              }
            </div>
          }
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
              {prevOwnersModifications[selectedOwner].modifications[groupIndex].name != '' ? (
                <div>{prevOwnersModifications[selectedOwner].modifications[groupIndex].name}</div>
              ) : (
                <div>{t('DataSVL.Placeholders.noNameSelected')}</div>
              )}
              <ToggleVisibilityRDButton shrinked={shrinked} setShrinked={setShrinked} selectedOwner={selectedOwner} selectedGroup={groupIndex} selectedGroupType={-1} />
            </div>
            {!shrinked[selectedOwner][groupIndex].group &&
              <div className={styles.topBottomPart}>
                {prevOwnersModifications[selectedOwner].modifications[groupIndex].kilometers[0] != '' &&
                  <TextContainer fieldLabel={t('DataSVL.Labels.kilometers')} text={prevOwnersModifications[selectedOwner].modifications[groupIndex].kilometers} />
                }
                <ResponsibleContainer fieldLabel={t('DataSVL.Labels.responsible')} responsible={prevOwnersModifications[selectedOwner].modifications[groupIndex].responsible} />
                {prevOwnersModifications[selectedOwner].modifications[groupIndex].date != '' &&
                  <TextContainer fieldLabel={t('DataSVL.Labels.date')} text={prevOwnersModifications[selectedOwner].modifications[groupIndex].date} />
                }
                {prevOwnersModifications[selectedOwner].modifications[groupIndex].pre.filter((image: string) => image != '').length > 0 &&
                  <ImageContainer fieldLabel={t('DataSVL.Labels.preImages')} images={prevOwnersModifications[selectedOwner].modifications[groupIndex].pre} />
                }
                {prevOwnersModifications[selectedOwner].modifications[groupIndex].post.filter((image: string) => image != '').length > 0 &&
                  <ImageContainer fieldLabel={t('DataSVL.Labels.postImages')} images={prevOwnersModifications[selectedOwner].modifications[groupIndex].post} />
                }
              </div>
            }
          </div>
          {!shrinked[selectedOwner][groupIndex].group &&
            <div>
              {renderListPreviousModifications(groupIndex, selectedOwner)}
            </div>
          }
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
            {modifications[selectedOwner-numPreviousOwners].group[groupIndex].type[typeIndex].name != '' ? (
              <div>{modifications[selectedOwner-numPreviousOwners].group[groupIndex].type[typeIndex].name}</div>
            ) : (
              <div>{t('DataSVL.Placeholders.noNameSelected')}</div>
            )}
            <ToggleVisibilityButton dataSVL={modifications} setDataSVL={setModifications} selectedOwner={selectedOwner-numPreviousOwners} 
              selectedGroup={groupIndex} selectedGroupType={typeIndex}
            />
          </div>
          {!modifications[selectedOwner-numPreviousOwners].group[groupIndex].type[typeIndex].shrinked && checkIfSomeDataInType(selectedOwner, groupIndex, typeIndex, true) &&
            <div className={styles.groupTypeBottomPart}>
              {modifications[selectedOwner-numPreviousOwners].group[groupIndex].type[typeIndex].numComponents > 0 &&
                <ComponentsContainer fieldLabel={t('DataSVL.Labels.components')} components={modifications[selectedOwner-numPreviousOwners].group[groupIndex].type[typeIndex].components} />
              }
              {modifications[selectedOwner-numPreviousOwners].group[groupIndex].type[typeIndex].pre.filter(image => image != '').length > 0 &&
                <ImageContainer fieldLabel={t('DataSVL.Labels.preImages')} images={modifications[selectedOwner-numPreviousOwners].group[groupIndex].type[typeIndex].pre} />
              }
              {modifications[selectedOwner-numPreviousOwners].group[groupIndex].type[typeIndex].post.filter(image => image != '').length > 0 &&
                <ImageContainer fieldLabel={t('DataSVL.Labels.postImages')} images={modifications[selectedOwner-numPreviousOwners].group[groupIndex].type[typeIndex].post} />
              }
              {modifications[selectedOwner-numPreviousOwners].group[groupIndex].type[typeIndex].comments != '' &&
                <TextContainer fieldLabel={t('DataSVL.Labels.comments')} text={modifications[selectedOwner-numPreviousOwners].group[groupIndex].type[typeIndex].comments} />
              }
            </div>
          }
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
              {modifications[selectedOwner-numPreviousOwners].group[groupIndex].name ? (
                <div>{modifications[selectedOwner-numPreviousOwners].group[groupIndex].name}</div>
              ) : (
                <div>{t('DataSVL.Placeholders.noNameSelected')}</div>
              )}
              <ToggleVisibilityButton dataSVL={modifications} setDataSVL={setModifications} selectedOwner={selectedOwner-numPreviousOwners} 
                selectedGroup={groupIndex} selectedGroupType={-1}
              />
            </div>
            {!modifications[selectedOwner-numPreviousOwners].group[groupIndex].shrinked &&
              <div className={styles.topBottomPart}>
                {modifications[selectedOwner-numPreviousOwners].group[groupIndex].kilometers[0] != '' &&
                  <TextContainer fieldLabel={t('DataSVL.Labels.kilometers')} text={modifications[selectedOwner-numPreviousOwners].group[groupIndex].kilometers} />
                }
                <ResponsibleContainer fieldLabel={t('DataSVL.Labels.responsible')} responsible={modifications[selectedOwner-numPreviousOwners].group[groupIndex].responsible} />
                {modifications[selectedOwner-numPreviousOwners].group[groupIndex].date != '' &&
                  <TextContainer fieldLabel={t('DataSVL.Labels.date')} text={modifications[selectedOwner-numPreviousOwners].group[groupIndex].date} />
                }
                {modifications[selectedOwner-numPreviousOwners].group[groupIndex].pre.filter(image => image != '').length > 0 &&
                  <ImageContainer fieldLabel={t('DataSVL.Labels.preImages')} images={modifications[selectedOwner-numPreviousOwners].group[groupIndex].pre} />
                }
                {modifications[selectedOwner-numPreviousOwners].group[groupIndex].post.filter(image => image != '').length > 0 &&
                  <ImageContainer fieldLabel={t('DataSVL.Labels.postImages')} images={modifications[selectedOwner-numPreviousOwners].group[groupIndex].post} />
                }
              </div>
            }
          </div>
          {!modifications[selectedOwner-numPreviousOwners].group[groupIndex].shrinked &&
            <div>
              {renderListActualModifications(groupIndex, selectedOwner)}
            </div>
          }
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
      {!mySVL || selectedOwner < numPreviousOwners ? (
        <div>          
          {prevOwnersModifications[selectedOwner].modifications.length > 0 ? (       
            <div>{listPreviousGroupModifications(selectedOwner)}</div>
          ) : (
            <div className={styles.noData}>
              {t('DataSVL.Placeholders.owner')} {selectedOwner+1} - <NoDataModifications />
            </div>
          )}
        </div>
      ) : (
        <div>      
          {modifications[selectedOwner-numPreviousOwners].group.length > 0 ? (       
            <div>{listActualGroupModifications(selectedOwner)}</div>
          ) : (
            <div className={styles.noData}>
              {t('DataSVL.Placeholders.owner')} {selectedOwner+1} - <NoDataModifications />
            </div>
          )}
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