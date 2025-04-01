import styles from '../../styles/components/dataSVL/typeSVL.module.css';
import TextContainer from './readOnlyFields/textContainer.tsx';
import ImageContainer from './readOnlyFields/imageContainer.tsx';
import ResponsibleContainer from './readOnlyFields/responsibleContainer.tsx';
import ComponentsContainer from './readOnlyFields/componentsContainer.tsx';
import ToggleVisibilityButton from './buttons/toggleVisibilityButton.tsx';
import ToggleVisibilityRDButton from './readOnlyFields/toggleVisibilityRDButton.tsx';
import { NoDataMaintenances } from '../../assets/noData.tsx';
import { useTranslation } from "react-i18next";
import { SetStateAction } from 'react';
import { isMaintenancesBase } from '../../utils/checkBaseType.ts';
import { isMaintenancesBaseSimple } from '../../utils/checkBaseSimpleType.ts';
import { PossibleMaintenancesJsonVersions } from '../../utils/commonTypes.ts';

type SummaryViewMaintenancesProps = {
  prevOwnersMaintenances: PossibleMaintenancesJsonVersions[];
  maintenances: PossibleMaintenancesJsonVersions[];
  setMaintenances: React.Dispatch<SetStateAction<PossibleMaintenancesJsonVersions[]>>;
  shrinked: any;
  setShrinked: any;
  numPreviousOwners: number;
  totalOwners: number;
  mySVL: boolean
};

const SummaryViewMaintenances = ({ prevOwnersMaintenances, maintenances, setMaintenances, shrinked, setShrinked, numPreviousOwners, totalOwners, mySVL }: SummaryViewMaintenancesProps): JSX.Element => {

  const { t } = useTranslation();

  const checkIfSomeDataInType = (selectedOwner: number, groupIndex: number, typeIndex: number, actual: boolean) => {
    const currentSelOwner = selectedOwner - numPreviousOwners;
    if (actual) {
      if (isMaintenancesBase(maintenances[currentSelOwner], groupIndex, typeIndex)) {
        if (maintenances[currentSelOwner].group[groupIndex].element[typeIndex].numComponents > 0 ||
          maintenances[currentSelOwner].group[groupIndex].element[typeIndex].pre.filter(image => image != '').length > 0 ||
          maintenances[currentSelOwner].group[groupIndex].element[typeIndex].post.filter(image => image != '').length > 0 ||
          maintenances[currentSelOwner].group[groupIndex].element[typeIndex].comments != '') return true;
        else return false;
      }
      else if (isMaintenancesBaseSimple(maintenances[currentSelOwner], groupIndex, typeIndex)) {
        if (maintenances[currentSelOwner].group[groupIndex].element[typeIndex].images.filter(image => image != '').length > 0 ||
            maintenances[currentSelOwner].group[groupIndex].element[typeIndex].comments != '') return true;
        else return false;
      }
    }
    else {
      if (isMaintenancesBase(prevOwnersMaintenances[selectedOwner], groupIndex, typeIndex)) {
        if (prevOwnersMaintenances[selectedOwner].group[groupIndex].element[typeIndex].numComponents > 0 ||
          prevOwnersMaintenances[selectedOwner].group[groupIndex].element[typeIndex].pre.filter((image: string) => image != '').length > 0 ||
          prevOwnersMaintenances[selectedOwner].group[groupIndex].element[typeIndex].post.filter((image: string) => image != '').length > 0 ||
          prevOwnersMaintenances[selectedOwner].group[groupIndex].element[typeIndex].comments != '') return true;
        else return false;
      }
      else if (isMaintenancesBaseSimple(prevOwnersMaintenances[selectedOwner], groupIndex, typeIndex)) {
        if (prevOwnersMaintenances[selectedOwner].group[groupIndex].element[typeIndex].images.filter(image => image != '').length > 0 ||
        prevOwnersMaintenances[selectedOwner].group[groupIndex].element[typeIndex].comments != '') return true;
        else return false;
      }
    }
  };

  const renderListPreviousMaintenances = (groupIndex: number, selectedOwner: number) => {

    const listPreviousMaintenances = Array.from({length: prevOwnersMaintenances[selectedOwner].group[groupIndex].element.length}, (_, typeIndex) => (
      <div key={typeIndex} className={styles.typeContainer} >
        <div className={styles.groupType}>
          <div className={styles.groupTypeTopPart}>
            # {typeIndex + 1}
            {prevOwnersMaintenances[selectedOwner].group[groupIndex].element[typeIndex].name != '' ? (
              <div>{prevOwnersMaintenances[selectedOwner].group[groupIndex].element[typeIndex].name}</div>
            ) : (
              <div>{t('DataSVL.Placeholders.noNameSelected')}</div>
            )}
            <ToggleVisibilityRDButton shrinked={shrinked} setShrinked={setShrinked} selectedOwner={selectedOwner} selectedGroup={groupIndex} selectedGroupType={typeIndex} />
          </div>
          {!shrinked[selectedOwner][groupIndex].element[typeIndex] && checkIfSomeDataInType(selectedOwner, groupIndex, typeIndex, false) &&
            <div className={styles.groupTypeBottomPart}>
              {isMaintenancesBase(prevOwnersMaintenances[selectedOwner], groupIndex, typeIndex) && prevOwnersMaintenances[selectedOwner].group[groupIndex].element[typeIndex].numComponents > 0 &&
                <ComponentsContainer fieldLabel={t('DataSVL.Labels.components')} components={prevOwnersMaintenances[selectedOwner].group[groupIndex].element[typeIndex].components} />
              }
              {isMaintenancesBase(prevOwnersMaintenances[selectedOwner], groupIndex, typeIndex) && prevOwnersMaintenances[selectedOwner].group[groupIndex].element[typeIndex].pre.filter((image: string) => image != '').length > 0 &&
                <ImageContainer fieldLabel={t('DataSVL.Labels.preImages')} images={prevOwnersMaintenances[selectedOwner].group[groupIndex].element[typeIndex].pre} />
              }
              {isMaintenancesBase(prevOwnersMaintenances[selectedOwner], groupIndex, typeIndex) && prevOwnersMaintenances[selectedOwner].group[groupIndex].element[typeIndex].post.filter((image: string) => image != '').length > 0 &&
                <ImageContainer fieldLabel={t('DataSVL.Labels.postImages')} images={prevOwnersMaintenances[selectedOwner].group[groupIndex].element[typeIndex].post} />
              }
              {isMaintenancesBaseSimple(prevOwnersMaintenances[selectedOwner], groupIndex, typeIndex) && prevOwnersMaintenances[selectedOwner].group[groupIndex].element[typeIndex].images.filter((image: string) => image != '').length > 0 &&
                <ImageContainer fieldLabel={t('DataSVL.Labels.images')} images={prevOwnersMaintenances[selectedOwner].group[groupIndex].element[typeIndex].images} />
              }
              {prevOwnersMaintenances[selectedOwner].group[groupIndex].element[typeIndex].comments != '' &&
                <TextContainer fieldLabel={t('DataSVL.Labels.comments')} text={prevOwnersMaintenances[selectedOwner].group[groupIndex].element[typeIndex].comments} />
              }
            </div>
          }
        </div>
      </div>
    ));

    return (
      <div className={styles.typesContainer}>
        {listPreviousMaintenances}
      </div> 
    );
  };
  
  const listPreviousGroupMaintenances = (selectedOwner: number) => {

    const listPreviousGroupMaintenances = Array.from({length: prevOwnersMaintenances[selectedOwner].group.length }, (_, groupIndex) => (
      <div key={groupIndex}>
        <div className={styles.groupContainerPrevOwners}>
          <div className={styles.topPart}>
            <div className={styles.toggleVisibilityRemoveGroup}>
              # {groupIndex + 1}
              {prevOwnersMaintenances[selectedOwner].group[groupIndex].name != '' ? (
                <div>{prevOwnersMaintenances[selectedOwner].group[groupIndex].name}</div>
              ) : (
                <div>{t('DataSVL.Placeholders.noNameSelected')}</div>
              )}
              <ToggleVisibilityRDButton shrinked={shrinked} setShrinked={setShrinked} selectedOwner={selectedOwner} selectedGroup={groupIndex} selectedGroupType={-1} />
            </div>
            {!shrinked[selectedOwner][groupIndex].group &&
              <div className={styles.topBottomPart}>
                {prevOwnersMaintenances[selectedOwner].group[groupIndex].kilometers[0] != '' &&
                  <TextContainer fieldLabel={t('DataSVL.Labels.kilometers')} text={prevOwnersMaintenances[selectedOwner].group[groupIndex].kilometers} />
                }
                <ResponsibleContainer fieldLabel={t('DataSVL.Labels.responsible')} responsible={prevOwnersMaintenances[selectedOwner].group[groupIndex].responsible} />
                {prevOwnersMaintenances[selectedOwner].group[groupIndex].date != '' &&
                  <TextContainer fieldLabel={t('DataSVL.Labels.date')} text={prevOwnersMaintenances[selectedOwner].group[groupIndex].date} />
                }
                {isMaintenancesBase(prevOwnersMaintenances[selectedOwner], groupIndex) && prevOwnersMaintenances[selectedOwner].group[groupIndex].pre.filter((image: string) => image != '').length > 0 &&
                  <ImageContainer fieldLabel={t('DataSVL.Labels.preImages')} images={prevOwnersMaintenances[selectedOwner].group[groupIndex].pre} />
                }
                {isMaintenancesBase(prevOwnersMaintenances[selectedOwner], groupIndex) && prevOwnersMaintenances[selectedOwner].group[groupIndex].post.filter((image: string) => image != '').length > 0 &&
                  <ImageContainer fieldLabel={t('DataSVL.Labels.postImages')} images={prevOwnersMaintenances[selectedOwner].group[groupIndex].post} />
                }
                {isMaintenancesBaseSimple(prevOwnersMaintenances[selectedOwner], groupIndex) && prevOwnersMaintenances[selectedOwner].group[groupIndex].images.filter((image: string) => image != '').length > 0 &&
                  <ImageContainer fieldLabel={t('DataSVL.Labels.images')} images={prevOwnersMaintenances[selectedOwner].group[groupIndex].images} />
                }
              </div>
            }
          </div>
          {!shrinked[selectedOwner][groupIndex].group &&
            <div>
              {renderListPreviousMaintenances(groupIndex, selectedOwner)}
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
        {listPreviousGroupMaintenances}
      </div> 
    );
  };

  const renderListActualMaintenances = (groupIndex: number, currentSelOwner: number) => {

    const listActualMaintenances = Array.from({length: maintenances[currentSelOwner].group[groupIndex].element.length}, (_, typeIndex) => (
      <div key={typeIndex} className={styles.typeContainer} >
        <div className={styles.groupType}>
          <div className={styles.groupTypeTopPart}>
            # {typeIndex + 1}
            {maintenances[currentSelOwner].group[groupIndex].element[typeIndex].name != '' ? (
              <div>{maintenances[currentSelOwner].group[groupIndex].element[typeIndex].name}</div>
            ) : (
              <div>{t('DataSVL.Placeholders.noNameSelected')}</div>
            )}
            <ToggleVisibilityButton dataSVL={maintenances} setDataSVL={setMaintenances} selectedOwner={currentSelOwner} 
              selectedGroup={groupIndex} selectedGroupType={typeIndex}
            />
          </div>
          {!maintenances[currentSelOwner].group[groupIndex].element[typeIndex].shrinked && checkIfSomeDataInType(currentSelOwner+numPreviousOwners, groupIndex, typeIndex, true) &&
            <div className={styles.groupTypeBottomPart}>
              {isMaintenancesBase(maintenances[currentSelOwner], groupIndex, typeIndex) && maintenances[currentSelOwner].group[groupIndex].element[typeIndex].numComponents > 0 &&
                <ComponentsContainer fieldLabel={t('DataSVL.Labels.components')} components={maintenances[currentSelOwner].group[groupIndex].element[typeIndex].components} />
              }
              {isMaintenancesBase(maintenances[currentSelOwner], groupIndex, typeIndex) && maintenances[currentSelOwner].group[groupIndex].element[typeIndex].pre.filter(image => image != '').length > 0 &&
                <ImageContainer fieldLabel={t('DataSVL.Labels.preImages')} images={maintenances[currentSelOwner].group[groupIndex].element[typeIndex].pre} />
              }
              {isMaintenancesBase(maintenances[currentSelOwner], groupIndex, typeIndex) && maintenances[currentSelOwner].group[groupIndex].element[typeIndex].post.filter(image => image != '').length > 0 &&
                <ImageContainer fieldLabel={t('DataSVL.Labels.postImages')} images={maintenances[currentSelOwner].group[groupIndex].element[typeIndex].post} />
              }
              {isMaintenancesBaseSimple(maintenances[currentSelOwner], groupIndex, typeIndex) && maintenances[currentSelOwner].group[groupIndex].element[typeIndex].images.filter(image => image != '').length > 0 &&
                <ImageContainer fieldLabel={t('DataSVL.Labels.images')} images={maintenances[currentSelOwner].group[groupIndex].element[typeIndex].images} />
              }
              {maintenances[currentSelOwner].group[groupIndex].element[typeIndex].comments != '' &&
                <TextContainer fieldLabel={t('DataSVL.Labels.comments')} text={maintenances[currentSelOwner].group[groupIndex].element[typeIndex].comments} />
              }
            </div>
          }
        </div>
      </div>
    ));

    return (
      <div className={styles.typesContainer}>
        {listActualMaintenances}
      </div> 
    );
  };

  const listActualGroupMaintenances = (currentSelOwner: number) => {

    const listActualGroupMaintenances = Array.from({length: maintenances[currentSelOwner].group.length }, (_, groupIndex) => (
      <div key={groupIndex}>
        <div className={styles.groupContainer}>
          <div className={styles.topPart}>
            <div className={styles.toggleVisibilityRemoveGroup}>
              # {groupIndex + 1}
              {maintenances[currentSelOwner].group[groupIndex].name != '' ? (
                <div>{maintenances[currentSelOwner].group[groupIndex].name}</div>
              ) : (
                <div>{t('DataSVL.Placeholders.noNameSelected')}</div>
              )}
              <ToggleVisibilityButton dataSVL={maintenances} setDataSVL={setMaintenances} selectedOwner={currentSelOwner} 
                selectedGroup={groupIndex} selectedGroupType={-1}
              />
            </div>
            {!maintenances[currentSelOwner].group[groupIndex].shrinked &&
              <div className={styles.topBottomPart}>
                {maintenances[currentSelOwner].group[groupIndex].kilometers[0] != '' &&
                  <TextContainer fieldLabel={t('DataSVL.Labels.kilometers')} text={maintenances[currentSelOwner].group[groupIndex].kilometers} />
                }
                <ResponsibleContainer fieldLabel={t('DataSVL.Labels.responsible')} responsible={maintenances[currentSelOwner].group[groupIndex].responsible} />
                {maintenances[currentSelOwner].group[groupIndex].date != '' &&
                  <TextContainer fieldLabel={t('DataSVL.Labels.date')} text={maintenances[currentSelOwner].group[groupIndex].date} />
                }
                {isMaintenancesBase(maintenances[currentSelOwner], groupIndex) && maintenances[currentSelOwner].group[groupIndex].pre.filter(image => image != '').length > 0 &&
                  <ImageContainer fieldLabel={t('DataSVL.Labels.preImages')} images={maintenances[currentSelOwner].group[groupIndex].pre} />
                }
                {isMaintenancesBase(maintenances[currentSelOwner], groupIndex) && maintenances[currentSelOwner].group[groupIndex].post.filter(image => image != '').length > 0 &&
                  <ImageContainer fieldLabel={t('DataSVL.Labels.postImages')} images={maintenances[currentSelOwner].group[groupIndex].post} />
                }
                {isMaintenancesBaseSimple(maintenances[currentSelOwner], groupIndex) && maintenances[currentSelOwner].group[groupIndex].images.filter(image => image != '').length > 0 &&
                  <ImageContainer fieldLabel={t('DataSVL.Labels.images')} images={maintenances[currentSelOwner].group[groupIndex].images} />
                }
              </div>
            }
          </div>
          {!maintenances[currentSelOwner].group[groupIndex].shrinked &&
            <div>
              {renderListActualMaintenances(groupIndex, currentSelOwner)}
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
        {listActualGroupMaintenances}
      </div> 
    );
  };

  const listMaintenances = Array.from({length: totalOwners }, (_, selectedOwner) => (
    <div key={selectedOwner}>
      {!mySVL || selectedOwner < numPreviousOwners ? (
        <div>     
          {prevOwnersMaintenances[selectedOwner].group.length > 0 ? (    
            <div>{listPreviousGroupMaintenances(selectedOwner)}</div>
          ) : (
            <div className={styles.noData}>
              {t('DataSVL.Placeholders.owner')} {selectedOwner+1} - <NoDataMaintenances />
            </div>
          )}
        </div>
      ) : (
        <div>    
          {maintenances[selectedOwner-numPreviousOwners].group.length > 0 ? (          
            <div>{listActualGroupMaintenances(selectedOwner-numPreviousOwners)}</div>
          ) : (
            <div className={styles.noData}>
              {t('DataSVL.Placeholders.owner')} {selectedOwner+1} - <NoDataMaintenances />
            </div>
          )}
        </div>
      )}
    </div>
  ));

  return (
    <div className={styles.typeSVLContainer}>
      <div className={styles.title}>
        {t('DataSVL.Labels.maintenances')}
      </div>
      {listMaintenances}
    </div>
  );
}

export default SummaryViewMaintenances;