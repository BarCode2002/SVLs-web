import styles from '../../styles/components/dataSVL/typeSVL.module.css';
import TextContainer from './readOnlyFields/textContainer.tsx';
import ImageContainer from './readOnlyFields/imageContainer.tsx';
import ResponsibleContainer from './readOnlyFields/responsibleContainer.tsx';
import ComponentsContainer from './readOnlyFields/componentsContainer.tsx';
import ToggleVisibilityButton from './buttons/toggleVisibilityButton.tsx';
import ToggleVisibilityRDButton from './readOnlyFields/toggleVisibilityRDButton.tsx';
import { NoDataModifications } from '../../assets/noData.tsx';
import { useTranslation } from "react-i18next";
import { SetStateAction } from 'react';
import { PossibleModificationsJsonVersions } from '../../utils/commonTypes.ts';
import { isModificationsBase } from '../../utils/checkBaseType.ts';
import { isModificationsBaseSimple } from '../../utils/checkBaseSimpleType.ts';

type SummaryViewModificationsProps = {
  prevOwnersModifications: PossibleModificationsJsonVersions[];
  modifications: PossibleModificationsJsonVersions[];
  setModifications: React.Dispatch<SetStateAction<PossibleModificationsJsonVersions[]>>;
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
      const currentSelOwner = selectedOwner - numPreviousOwners;
      if (isModificationsBase(modifications[currentSelOwner], groupIndex, typeIndex)) {
        if (modifications[currentSelOwner].group[groupIndex].type[typeIndex].numComponents > 0 ||
          modifications[currentSelOwner].group[groupIndex].type[typeIndex].pre.filter(image => image != '').length > 0 ||
          modifications[currentSelOwner].group[groupIndex].type[typeIndex].post.filter(image => image != '').length > 0 ||
          modifications[currentSelOwner].group[groupIndex].type[typeIndex].comments != '') return true;
        else return false;
      }
      else if (isModificationsBaseSimple(modifications[currentSelOwner], groupIndex, typeIndex)) {
        if (modifications[currentSelOwner].group[groupIndex].type[typeIndex].images.filter(image => image != '').length > 0 ||
          modifications[currentSelOwner].group[groupIndex].type[typeIndex].comments != '') return true;
        else return false;
      }
    }
    else {
      if (isModificationsBase(prevOwnersModifications[selectedOwner], groupIndex, typeIndex)) {
        if (prevOwnersModifications[selectedOwner].group[groupIndex].type[typeIndex].numComponents > 0 ||
          prevOwnersModifications[selectedOwner].group[groupIndex].type[typeIndex].pre.filter((image: string) => image != '').length > 0 ||
          prevOwnersModifications[selectedOwner].group[groupIndex].type[typeIndex].post.filter((image: string) => image != '').length > 0 ||
          prevOwnersModifications[selectedOwner].group[groupIndex].type[typeIndex].comments != '') return true;
        else return false;
      }
      else if (isModificationsBaseSimple(prevOwnersModifications[selectedOwner], groupIndex, typeIndex)) {
        if (prevOwnersModifications[selectedOwner].group[groupIndex].type[typeIndex].images.filter(image => image != '').length > 0 ||
        prevOwnersModifications[selectedOwner].group[groupIndex].type[typeIndex].comments != '') return true;
        else return false;
      }
    }
  };

  const renderListPreviousModifications = (groupIndex: number, selectedOwner: number) => {

    const listPreviousModifications = Array.from({length: prevOwnersModifications[selectedOwner].group[groupIndex].type.length}, (_, typeIndex) => (
      <div key={typeIndex} className={styles.typeContainer} >
        <div className={styles.groupType}>
          <div className={styles.groupTypeTopPart}>
            # {typeIndex + 1}
            {prevOwnersModifications[selectedOwner].group[groupIndex].type[typeIndex].name != '' ? (
              <div>{prevOwnersModifications[selectedOwner].group[groupIndex].type[typeIndex].name}</div>
            ) : (
              <div>{t('DataSVL.Placeholders.noNameSelected')}</div>
            )}
            <ToggleVisibilityRDButton shrinked={shrinked} setShrinked={setShrinked} selectedOwner={selectedOwner} selectedGroup={groupIndex} selectedGroupType={typeIndex} />
          </div>
          {!shrinked[selectedOwner][groupIndex].type[typeIndex] && checkIfSomeDataInType(selectedOwner, groupIndex, typeIndex, false) &&
            <div className={styles.groupTypeBottomPart}>
              {isModificationsBase(prevOwnersModifications[selectedOwner], groupIndex, typeIndex) && prevOwnersModifications[selectedOwner].group[groupIndex].type[typeIndex].numComponents > 0 &&
                <ComponentsContainer fieldLabel={t('DataSVL.Labels.components')} components={prevOwnersModifications[selectedOwner].group[groupIndex].type[typeIndex].components} />
              }
              {isModificationsBase(prevOwnersModifications[selectedOwner], groupIndex, typeIndex) && prevOwnersModifications[selectedOwner].group[groupIndex].type[typeIndex].pre.filter((image: string) => image != '').length > 0 &&
                <ImageContainer fieldLabel={t('DataSVL.Labels.preImages')} images={prevOwnersModifications[selectedOwner].group[groupIndex].type[typeIndex].pre} />
              }
              {isModificationsBase(prevOwnersModifications[selectedOwner], groupIndex, typeIndex) && prevOwnersModifications[selectedOwner].group[groupIndex].type[typeIndex].post.filter((image: string) => image != '').length > 0 &&
                <ImageContainer fieldLabel={t('DataSVL.Labels.postImages')} images={prevOwnersModifications[selectedOwner].group[groupIndex].type[typeIndex].post} />
              }
              {isModificationsBaseSimple(prevOwnersModifications[selectedOwner], groupIndex, typeIndex) && prevOwnersModifications[selectedOwner].group[groupIndex].type[typeIndex].images.filter((image: string) => image != '').length > 0 &&
                <ImageContainer fieldLabel={t('DataSVL.Labels.images')} images={prevOwnersModifications[selectedOwner].group[groupIndex].type[typeIndex].images} />
              }
              {prevOwnersModifications[selectedOwner].group[groupIndex].type[typeIndex].comments != '' &&
                <TextContainer fieldLabel={t('DataSVL.Labels.comments')} text={prevOwnersModifications[selectedOwner].group[groupIndex].type[typeIndex].comments} />
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

    const listPreviousGroupModifications = Array.from({length: prevOwnersModifications[selectedOwner].group.length }, (_, groupIndex) => (
      <div key={groupIndex}>
        <div className={styles.groupContainerPrevOwners}>
          <div className={styles.topPart}>
            <div className={styles.toggleVisibilityRemoveGroup}>
              # {groupIndex + 1}
              {prevOwnersModifications[selectedOwner].group[groupIndex].name != '' ? (
                <div>{prevOwnersModifications[selectedOwner].group[groupIndex].name}</div>
              ) : (
                <div>{t('DataSVL.Placeholders.noNameSelected')}</div>
              )}
              <ToggleVisibilityRDButton shrinked={shrinked} setShrinked={setShrinked} selectedOwner={selectedOwner} selectedGroup={groupIndex} selectedGroupType={-1} />
            </div>
            {!shrinked[selectedOwner][groupIndex].group &&
              <div className={styles.topBottomPart}>
                {prevOwnersModifications[selectedOwner].group[groupIndex].kilometers[0] != '' &&
                  <TextContainer fieldLabel={t('DataSVL.Labels.kilometers')} text={prevOwnersModifications[selectedOwner].group[groupIndex].kilometers} />
                }
                <ResponsibleContainer fieldLabel={t('DataSVL.Labels.responsible')} responsible={prevOwnersModifications[selectedOwner].group[groupIndex].responsible} />
                {prevOwnersModifications[selectedOwner].group[groupIndex].date != '' &&
                  <TextContainer fieldLabel={t('DataSVL.Labels.date')} text={prevOwnersModifications[selectedOwner].group[groupIndex].date} />
                }
                {isModificationsBase(prevOwnersModifications[selectedOwner], groupIndex) && prevOwnersModifications[selectedOwner].group[groupIndex].pre.filter((image: string) => image != '').length > 0 &&
                  <ImageContainer fieldLabel={t('DataSVL.Labels.preImages')} images={prevOwnersModifications[selectedOwner].group[groupIndex].pre} />
                }
                {isModificationsBase(prevOwnersModifications[selectedOwner], groupIndex) && prevOwnersModifications[selectedOwner].group[groupIndex].post.filter((image: string) => image != '').length > 0 &&
                  <ImageContainer fieldLabel={t('DataSVL.Labels.postImages')} images={prevOwnersModifications[selectedOwner].group[groupIndex].post} />
                }
                {isModificationsBaseSimple(prevOwnersModifications[selectedOwner], groupIndex) && prevOwnersModifications[selectedOwner].group[groupIndex].images.filter((image: string) => image != '').length > 0 &&
                  <ImageContainer fieldLabel={t('DataSVL.Labels.images')} images={prevOwnersModifications[selectedOwner].group[groupIndex].images} />
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

  const renderListActualModifications = (groupIndex: number, currentSelOwner: number) => {
    
    const listActualModifications = Array.from({length: modifications[currentSelOwner].group[groupIndex].type.length}, (_, typeIndex) => (
      <div key={typeIndex} className={styles.typeContainer} >
        <div className={styles.groupType}>
          <div className={styles.groupTypeTopPart}>
            # {typeIndex + 1}
            {modifications[currentSelOwner].group[groupIndex].type[typeIndex].name != '' ? (
              <div>{modifications[currentSelOwner].group[groupIndex].type[typeIndex].name}</div>
            ) : (
              <div>{t('DataSVL.Placeholders.noNameSelected')}</div>
            )}
            <ToggleVisibilityButton dataSVL={modifications} setDataSVL={setModifications} selectedOwner={currentSelOwner} 
              selectedGroup={groupIndex} selectedGroupType={typeIndex}
            />
          </div>
          {!modifications[currentSelOwner].group[groupIndex].type[typeIndex].shrinked && checkIfSomeDataInType(currentSelOwner+numPreviousOwners, groupIndex, typeIndex, true) &&
            <div className={styles.groupTypeBottomPart}>
              {isModificationsBase(modifications[currentSelOwner], groupIndex, typeIndex) && modifications[currentSelOwner].group[groupIndex].type[typeIndex].numComponents > 0 &&
                <ComponentsContainer fieldLabel={t('DataSVL.Labels.components')} components={modifications[currentSelOwner].group[groupIndex].type[typeIndex].components} />
              }
              {isModificationsBase(modifications[currentSelOwner], groupIndex, typeIndex) && modifications[currentSelOwner].group[groupIndex].type[typeIndex].pre.filter(image => image != '').length > 0 &&
                <ImageContainer fieldLabel={t('DataSVL.Labels.preImages')} images={modifications[currentSelOwner].group[groupIndex].type[typeIndex].pre} />
              }
              {isModificationsBase(modifications[currentSelOwner], groupIndex, typeIndex) && modifications[currentSelOwner].group[groupIndex].type[typeIndex].post.filter(image => image != '').length > 0 &&
                <ImageContainer fieldLabel={t('DataSVL.Labels.postImages')} images={modifications[currentSelOwner].group[groupIndex].type[typeIndex].post} />
              }
              {isModificationsBaseSimple(modifications[currentSelOwner], groupIndex, typeIndex) && modifications[currentSelOwner].group[groupIndex].type[typeIndex].images.filter(image => image != '').length > 0 &&
                <ImageContainer fieldLabel={t('DataSVL.Labels.images')} images={modifications[currentSelOwner].group[groupIndex].type[typeIndex].images} />
              }
              {modifications[currentSelOwner].group[groupIndex].type[typeIndex].comments != '' &&
                <TextContainer fieldLabel={t('DataSVL.Labels.comments')} text={modifications[currentSelOwner].group[groupIndex].type[typeIndex].comments} />
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

  const listActualGroupModifications = (currentSelOwner: number) => {
    const listActualGroupModifications = Array.from({length: modifications[currentSelOwner].group.length }, (_, groupIndex) => (
      <div key={groupIndex}>
        <div className={styles.groupContainer}>
          <div className={styles.topPart}>
            <div className={styles.toggleVisibilityRemoveGroup}>
              # {groupIndex + 1}
              {modifications[currentSelOwner].group[groupIndex].name ? (
                <div>{modifications[currentSelOwner].group[groupIndex].name}</div>
              ) : (
                <div>{t('DataSVL.Placeholders.noNameSelected')}</div>
              )}
              <ToggleVisibilityButton dataSVL={modifications} setDataSVL={setModifications} selectedOwner={currentSelOwner} 
                selectedGroup={groupIndex} selectedGroupType={-1}
              />
            </div>
            {!modifications[currentSelOwner].group[groupIndex].shrinked &&
              <div className={styles.topBottomPart}>
                {modifications[currentSelOwner].group[groupIndex].kilometers[0] != '' &&
                  <TextContainer fieldLabel={t('DataSVL.Labels.kilometers')} text={modifications[currentSelOwner].group[groupIndex].kilometers} />
                }
                <ResponsibleContainer fieldLabel={t('DataSVL.Labels.responsible')} responsible={modifications[currentSelOwner].group[groupIndex].responsible} />
                {modifications[currentSelOwner].group[groupIndex].date != '' &&
                  <TextContainer fieldLabel={t('DataSVL.Labels.date')} text={modifications[currentSelOwner].group[groupIndex].date} />
                }
                {isModificationsBase(modifications[currentSelOwner], groupIndex) && modifications[currentSelOwner].group[groupIndex].pre.filter(image => image != '').length > 0 &&
                  <ImageContainer fieldLabel={t('DataSVL.Labels.preImages')} images={modifications[currentSelOwner].group[groupIndex].pre} />
                }
                {isModificationsBase(modifications[currentSelOwner], groupIndex) && modifications[currentSelOwner].group[groupIndex].post.filter(image => image != '').length > 0 &&
                  <ImageContainer fieldLabel={t('DataSVL.Labels.postImages')} images={modifications[currentSelOwner].group[groupIndex].post} />
                }
                {isModificationsBaseSimple(modifications[currentSelOwner], groupIndex) && modifications[currentSelOwner].group[groupIndex].images.filter(image => image != '').length > 0 &&
                  <ImageContainer fieldLabel={t('DataSVL.Labels.images')} images={modifications[currentSelOwner].group[groupIndex].images} />
                }
              </div>
            }
          </div>
          {!modifications[currentSelOwner].group[groupIndex].shrinked &&
            <div>
              {renderListActualModifications(groupIndex, currentSelOwner)}
            </div>
          }
        </div>
      </div>
    ));

    return (
      <div className={styles.summaryContainer}>
        <div className={styles.owner}>
          {t('DataSVL.Placeholders.owner')} {currentSelOwner+numPreviousOwners+1}
        </div>
        {listActualGroupModifications}
      </div> 
    );
  };

  const listModifications = Array.from({length: totalOwners }, (_, selectedOwner) => (
    <div key={selectedOwner}>
      {!mySVL || selectedOwner < numPreviousOwners ? (
        <div>          
          {prevOwnersModifications[selectedOwner].group.length > 0 ? (       
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
            <div>{listActualGroupModifications(selectedOwner-numPreviousOwners)}</div>
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