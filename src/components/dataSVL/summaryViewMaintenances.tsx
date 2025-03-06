import styles from '../../styles/components/dataSVL/typeSVL.module.css';
import { Maintenances } from '../../utils/interfaces.ts';
import TextContainer from './readOnlyFields/textContainer.tsx';
import ImageContainer from './readOnlyFields/imageContainer.tsx';
import ResponsibleContainer from './readOnlyFields/responsibleContainer.tsx';
import ComponentsContainer from './readOnlyFields/componentsContainer.tsx';
import ToggleVisibilityButton from './buttons/toggleVisibilityButton.tsx';
import ToggleVisibilityRDButton from './readOnlyFields/toggleVisibilityRDButton.tsx';
import { NoDataMaintenances } from '../../assets/noData.tsx';
import { useTranslation } from "react-i18next";
import { SetStateAction } from 'react';

type SummaryViewMaintenancesProps = {
  prevOwnersMaintenances: any;
  maintenances: Maintenances[];
  setMaintenances: React.Dispatch<SetStateAction<Maintenances[]>>;
  shrinked: any;
  setShrinked: any;
  numPreviousOwners: number;
  totalOwners: number;
  mySVL: boolean
};

const SummaryViewMaintenances = ({ prevOwnersMaintenances, maintenances, setMaintenances, shrinked, setShrinked, numPreviousOwners, totalOwners, mySVL }: SummaryViewMaintenancesProps): JSX.Element => {

  const { t } = useTranslation();

  const checkIfSomeDataInType = (selectedOwner: number, groupIndex: number, typeIndex: number, actual: boolean) => {
    if (actual) {
      if (maintenances[selectedOwner-numPreviousOwners].group[groupIndex].type[typeIndex].numComponents > 0 ||
        maintenances[selectedOwner-numPreviousOwners].group[groupIndex].type[typeIndex].pre.filter(image => image != '').length > 0 ||
        maintenances[selectedOwner-numPreviousOwners].group[groupIndex].type[typeIndex].post.filter(image => image != '').length > 0 ||
        maintenances[selectedOwner-numPreviousOwners].group[groupIndex].type[typeIndex].comments != '') return true;
      else return false;
    }
    else {
      if (prevOwnersMaintenances[selectedOwner].maintenances[groupIndex].type[typeIndex].numComponents > 0 ||
        prevOwnersMaintenances[selectedOwner].maintenances[groupIndex].type[typeIndex].pre.filter((image: string) => image != '').length > 0 ||
        prevOwnersMaintenances[selectedOwner].maintenances[groupIndex].type[typeIndex].post.filter((image: string) => image != '').length > 0 ||
        prevOwnersMaintenances[selectedOwner].maintenances[groupIndex].type[typeIndex].comments != '') return true;
      else return false;
    }
  };

  const renderListPreviousMaintenances = (groupIndex: number, selectedOwner: number) => {

    const listPreviousMaintenances = Array.from({length: prevOwnersMaintenances[selectedOwner].maintenances[groupIndex].type.length}, (_, typeIndex) => (
      <div key={typeIndex} className={styles.typeContainer} >
        <div className={styles.groupType}>
          <div className={styles.groupTypeTopPart}>
            # {typeIndex + 1}
            {prevOwnersMaintenances[selectedOwner].maintenances[groupIndex].type[typeIndex].name != '' ? (
              <div>{prevOwnersMaintenances[selectedOwner].maintenances[groupIndex].type[typeIndex].name}</div>
            ) : (
              <div>{t('DataSVL.Placeholders.noNameSelected')}</div>
            )}
            <ToggleVisibilityRDButton shrinked={shrinked} setShrinked={setShrinked} selectedOwner={selectedOwner} selectedGroup={groupIndex} selectedGroupType={typeIndex} />
          </div>
          {!shrinked[selectedOwner][groupIndex].type[typeIndex] && checkIfSomeDataInType(selectedOwner, groupIndex, typeIndex, false) &&
            <div className={styles.groupTypeBottomPart}>
              {prevOwnersMaintenances[selectedOwner].maintenances[groupIndex].type[typeIndex].numComponents > 0 &&
                <ComponentsContainer fieldLabel={t('DataSVL.Labels.components')} components={prevOwnersMaintenances[selectedOwner].maintenances[groupIndex].type[typeIndex].components} />
              }
              {prevOwnersMaintenances[selectedOwner].maintenances[groupIndex].type[typeIndex].pre.filter((image: string) => image != '').length > 0 &&
                <ImageContainer fieldLabel={t('DataSVL.Labels.preImages')} images={prevOwnersMaintenances[selectedOwner].maintenances[groupIndex].type[typeIndex].pre} />
              }
              {prevOwnersMaintenances[selectedOwner].maintenances[groupIndex].type[typeIndex].post.filter((image: string) => image != '').length > 0 &&
                <ImageContainer fieldLabel={t('DataSVL.Labels.postImages')} images={prevOwnersMaintenances[selectedOwner].maintenances[groupIndex].type[typeIndex].post} />
              }
              {prevOwnersMaintenances[selectedOwner].maintenances[groupIndex].type[typeIndex].comments != '' &&
                <TextContainer fieldLabel={t('DataSVL.Labels.comments')} text={prevOwnersMaintenances[selectedOwner].maintenances[groupIndex].type[typeIndex].comments} />
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

    const listPreviousGroupMaintenances = Array.from({length: prevOwnersMaintenances[selectedOwner].maintenances.length }, (_, groupIndex) => (
      <div key={groupIndex}>
        <div className={styles.groupContainerPrevOwners}>
          <div className={styles.topPart}>
            <div className={styles.toggleVisibilityRemoveGroup}>
              # {groupIndex + 1}
              {prevOwnersMaintenances[selectedOwner].maintenances[groupIndex].name != '' ? (
                <div>{prevOwnersMaintenances[selectedOwner].maintenances[groupIndex].name}</div>
              ) : (
                <div>{t('DataSVL.Placeholders.noNameSelected')}</div>
              )}
              <ToggleVisibilityRDButton shrinked={shrinked} setShrinked={setShrinked} selectedOwner={selectedOwner} selectedGroup={groupIndex} selectedGroupType={-1} />
            </div>
            {!shrinked[selectedOwner][groupIndex].group &&
              <div className={styles.topBottomPart}>
                {prevOwnersMaintenances[selectedOwner].maintenances[groupIndex].kilometers != '' &&
                  <TextContainer fieldLabel={t('DataSVL.Labels.kilometers')} text={prevOwnersMaintenances[selectedOwner].maintenances[groupIndex].kilometers} />
                }
                <ResponsibleContainer fieldLabel={t('DataSVL.Labels.responsible')} responsible={prevOwnersMaintenances[selectedOwner].maintenances[groupIndex].responsible} />
                {prevOwnersMaintenances[selectedOwner].maintenances[groupIndex].date != '' &&
                  <TextContainer fieldLabel={t('DataSVL.Labels.date')} text={prevOwnersMaintenances[selectedOwner].maintenances[groupIndex].date} />
                }
                {prevOwnersMaintenances[selectedOwner].maintenances[groupIndex].pre.filter((image: string) => image != '').length > 0 &&
                  <ImageContainer fieldLabel={t('DataSVL.Labels.preImages')} images={prevOwnersMaintenances[selectedOwner].maintenances[groupIndex].pre} />
                }
                {prevOwnersMaintenances[selectedOwner].maintenances[groupIndex].post.filter((image: string) => image != '').length > 0 &&
                  <ImageContainer fieldLabel={t('DataSVL.Labels.postImages')} images={prevOwnersMaintenances[selectedOwner].maintenances[groupIndex].post} />
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

  const renderListActualMaintenances = (groupIndex: number, selectedOwner: number) => {

    const listActualMaintenances = Array.from({length: maintenances[selectedOwner-numPreviousOwners].group[groupIndex].type.length}, (_, typeIndex) => (
      <div key={typeIndex} className={styles.typeContainer} >
        <div className={styles.groupType}>
          <div className={styles.groupTypeTopPart}>
            # {typeIndex + 1}
            {maintenances[selectedOwner-numPreviousOwners].group[groupIndex].type[typeIndex].name != '' ? (
              <div>{maintenances[selectedOwner-numPreviousOwners].group[groupIndex].type[typeIndex].name}</div>
            ) : (
              <div>{t('DataSVL.Placeholders.noNameSelected')}</div>
            )}
            <ToggleVisibilityButton dataSVL={maintenances} setDataSVL={setMaintenances} selectedOwner={selectedOwner-numPreviousOwners} 
              selectedGroup={groupIndex} selectedGroupType={typeIndex}
            />
            {checkIfSomeDataInType(selectedOwner, groupIndex, typeIndex, true)}
          </div>
          {!maintenances[selectedOwner-numPreviousOwners].group[groupIndex].type[typeIndex].shrinked && checkIfSomeDataInType(selectedOwner, groupIndex, typeIndex, true) &&
            <div className={styles.groupTypeBottomPart}>
              {maintenances[selectedOwner-numPreviousOwners].group[groupIndex].type[typeIndex].numComponents > 0 &&
                <ComponentsContainer fieldLabel={t('DataSVL.Labels.components')} components={maintenances[selectedOwner-numPreviousOwners].group[groupIndex].type[typeIndex].components} />
              }
              {maintenances[selectedOwner-numPreviousOwners].group[groupIndex].type[typeIndex].pre.filter(image => image != '').length > 0 &&
                <ImageContainer fieldLabel={t('DataSVL.Labels.preImages')} images={maintenances[selectedOwner-numPreviousOwners].group[groupIndex].type[typeIndex].pre} />
              }
              {maintenances[selectedOwner-numPreviousOwners].group[groupIndex].type[typeIndex].post.filter(image => image != '').length > 0 &&
                <ImageContainer fieldLabel={t('DataSVL.Labels.postImages')} images={maintenances[selectedOwner-numPreviousOwners].group[groupIndex].type[typeIndex].post} />
              }
              {maintenances[selectedOwner-numPreviousOwners].group[groupIndex].type[typeIndex].comments != '' &&
                <TextContainer fieldLabel={t('DataSVL.Labels.comments')} text={maintenances[selectedOwner-numPreviousOwners].group[groupIndex].type[typeIndex].comments} />
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

  const listActualGroupMaintenances = (selectedOwner: number) => {

    const listActualGroupMaintenances = Array.from({length: maintenances[selectedOwner-numPreviousOwners].group.length }, (_, groupIndex) => (
      <div key={groupIndex}>
        <div className={styles.groupContainer}>
          <div className={styles.topPart}>
            <div className={styles.toggleVisibilityRemoveGroup}>
              # {groupIndex + 1}
              {maintenances[selectedOwner-numPreviousOwners].group[groupIndex].name != '' ? (
                <div>{maintenances[selectedOwner-numPreviousOwners].group[groupIndex].name}</div>
              ) : (
                <div>{t('DataSVL.Placeholders.noNameSelected')}</div>
              )}
              <ToggleVisibilityButton dataSVL={maintenances} setDataSVL={setMaintenances} selectedOwner={selectedOwner-numPreviousOwners} 
                selectedGroup={groupIndex} selectedGroupType={-1}
              />
            </div>
            {!maintenances[selectedOwner-numPreviousOwners].group[groupIndex].shrinked &&
              <div className={styles.topBottomPart}>
                {maintenances[selectedOwner-numPreviousOwners].group[groupIndex].kilometers[0] != '' &&
                  <TextContainer fieldLabel={t('DataSVL.Labels.kilometers')} text={maintenances[selectedOwner-numPreviousOwners].group[groupIndex].kilometers} />
                }
                <ResponsibleContainer fieldLabel={t('DataSVL.Labels.responsible')} responsible={maintenances[selectedOwner-numPreviousOwners].group[groupIndex].responsible} />
                {maintenances[selectedOwner-numPreviousOwners].group[groupIndex].date != '' &&
                  <TextContainer fieldLabel={t('DataSVL.Labels.date')} text={maintenances[selectedOwner-numPreviousOwners].group[groupIndex].date} />
                }
                {maintenances[selectedOwner-numPreviousOwners].group[groupIndex].pre.filter(image => image != '').length > 0 &&
                  <ImageContainer fieldLabel={t('DataSVL.Labels.preImages')} images={maintenances[selectedOwner-numPreviousOwners].group[groupIndex].pre} />
                }
                {maintenances[selectedOwner-numPreviousOwners].group[groupIndex].post.filter(image => image != '').length > 0 &&
                  <ImageContainer fieldLabel={t('DataSVL.Labels.postImages')} images={maintenances[selectedOwner-numPreviousOwners].group[groupIndex].post} />
                }
              </div>
            }
          </div>
          {!maintenances[selectedOwner-numPreviousOwners].group[groupIndex].shrinked &&
            <div>
              {renderListActualMaintenances(groupIndex, selectedOwner)}
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
        {listActualGroupMaintenances}
      </div> 
    );
  };

  const listMaintenances = Array.from({length: totalOwners }, (_, selectedOwner) => (
    <div key={selectedOwner}>
      {!mySVL || selectedOwner < numPreviousOwners ? (
        <div>     
          {prevOwnersMaintenances[selectedOwner].maintenances.length > 0 ? (    
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
            <div>{listActualGroupMaintenances(selectedOwner)}</div>
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