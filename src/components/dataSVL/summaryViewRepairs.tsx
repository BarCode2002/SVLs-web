import styles from '../../styles/components/dataSVL/typeSVL.module.css';
import TextContainer from './readOnlyFields/textContainer.tsx';
import ImageContainer from './readOnlyFields/imageContainer.tsx';
import ResponsibleContainer from './readOnlyFields/responsibleContainer.tsx';
import ComponentsContainer from './readOnlyFields/componentsContainer.tsx';
import DefectsRepairedContainer from './readOnlyFields/defectsRepairedContainer.tsx';
import ToggleVisibilityButton from './buttons/toggleVisibilityButton.tsx';
import ToggleVisibilityRDButton from './readOnlyFields/toggleVisibilityRDButton.tsx';
import { useTranslation } from "react-i18next";
import { SetStateAction } from 'react';
import { NoDataRepairs } from '../../assets/noData.tsx';
import { isRepairsBase } from '../../utils/checkBaseType.ts';
import { isRepairsBaseSimple } from '../../utils/checkBaseSimpleType.ts';
import { PossibleRepairsJsonVersions } from '../../utils/commonTypes.ts';

type SummaryViewRepairsProps = {
  prevOwnersRepairs: PossibleRepairsJsonVersions[];
  repairs: PossibleRepairsJsonVersions[];
  setRepairs: React.Dispatch<SetStateAction<PossibleRepairsJsonVersions[]>>;
  shrinked: any;
  setShrinked: any;
  numPreviousOwners: number;
  totalOwners: number;
  mySVL: boolean;
};

const SummaryViewRepairs = ({ prevOwnersRepairs, repairs, setRepairs, shrinked, setShrinked, numPreviousOwners, totalOwners, mySVL }: SummaryViewRepairsProps): JSX.Element => {

  const { t } = useTranslation();

  const checkIfSomeDataInType = (selectedOwner: number, groupIndex: number, typeIndex: number, actual: boolean) => {
    if (actual) {
      const currentSelOwner = selectedOwner - numPreviousOwners;
      if (isRepairsBase(repairs[currentSelOwner], groupIndex, typeIndex)) {
        if (repairs[currentSelOwner].group[groupIndex].element[typeIndex].numComponents > 0 ||
          repairs[currentSelOwner].group[groupIndex].element[typeIndex].pre.filter(image => image != '').length > 0 ||
          repairs[currentSelOwner].group[groupIndex].element[typeIndex].post.filter(image => image != '').length > 0 ||
          repairs[currentSelOwner].group[groupIndex].element[typeIndex].comments != '') return true;
        else return false;
      }
      else if (isRepairsBaseSimple(repairs[currentSelOwner], groupIndex, typeIndex)) {
        if (repairs[currentSelOwner].group[groupIndex].element[typeIndex].images.filter(image => image != '').length > 0 ||
          repairs[currentSelOwner].group[groupIndex].element[typeIndex].comments != '') return true;
        else return false;
      }
    }
    else {
      if (isRepairsBase(prevOwnersRepairs[selectedOwner], groupIndex, typeIndex)) {
        if (prevOwnersRepairs[selectedOwner].group[groupIndex].element[typeIndex].numComponents > 0 ||
          prevOwnersRepairs[selectedOwner].group[groupIndex].element[typeIndex].pre.filter((image: string) => image != '').length > 0 ||
          prevOwnersRepairs[selectedOwner].group[groupIndex].element[typeIndex].post.filter((image: string) => image != '').length > 0 ||
          prevOwnersRepairs[selectedOwner].group[groupIndex].element[typeIndex].comments != '') return true;
        else return false;
      }
      else if (isRepairsBaseSimple(prevOwnersRepairs[selectedOwner], groupIndex, typeIndex)) {
        if (prevOwnersRepairs[selectedOwner].group[groupIndex].element[typeIndex].images.filter(image => image != '').length > 0 ||
        prevOwnersRepairs[selectedOwner].group[groupIndex].element[typeIndex].comments != '') return true;
        else return false;
      }
    }
  };

  const renderListPreviousRepairs = (groupIndex: number, selectedOwner: number) => {

    const listPreviousRepairs = Array.from({length: prevOwnersRepairs[selectedOwner].group[groupIndex].element.length}, (_, typeIndex) => (
      <div key={typeIndex} className={styles.typeContainer} >
        <div className={styles.groupType}>
          <div className={styles.groupTypeTopPart}>
            # {typeIndex + 1}
            {prevOwnersRepairs[selectedOwner].group[groupIndex].element[typeIndex].name ? (
              <div>{prevOwnersRepairs[selectedOwner].group[groupIndex].element[typeIndex].name}</div>
            ) : (
              <div>{t('DataSVL.Placeholders.noNameSelected')}</div>
            )}
            <ToggleVisibilityRDButton shrinked={shrinked} setShrinked={setShrinked} selectedOwner={selectedOwner} selectedGroup={groupIndex} selectedGroupType={typeIndex} />
          </div>
          {!shrinked[selectedOwner][groupIndex].element[typeIndex] && checkIfSomeDataInType(selectedOwner, groupIndex, typeIndex, false) &&
            <div className={styles.groupTypeBottomPart}>
              {isRepairsBase(prevOwnersRepairs[selectedOwner], groupIndex, typeIndex) && prevOwnersRepairs[selectedOwner].group[groupIndex].element[typeIndex].numComponents > 0 &&
                <ComponentsContainer fieldLabel={t('DataSVL.Labels.components')} components={prevOwnersRepairs[selectedOwner].group[groupIndex].element[typeIndex].components} />
              }
              {isRepairsBase(prevOwnersRepairs[selectedOwner], groupIndex, typeIndex) && prevOwnersRepairs[selectedOwner].group[groupIndex].element[typeIndex].pre.filter((image: string) => image != '').length > 0 &&
                <ImageContainer fieldLabel={t('DataSVL.Labels.preImages')} images={prevOwnersRepairs[selectedOwner].group[groupIndex].element[typeIndex].pre} />
              }
              {isRepairsBase(prevOwnersRepairs[selectedOwner], groupIndex, typeIndex) && prevOwnersRepairs[selectedOwner].group[groupIndex].element[typeIndex].post.filter((image: string) => image != '').length > 0 &&
                <ImageContainer fieldLabel={t('DataSVL.Labels.postImages')} images={prevOwnersRepairs[selectedOwner].group[groupIndex].element[typeIndex].post} />
              }
              {isRepairsBaseSimple(prevOwnersRepairs[selectedOwner], groupIndex, typeIndex) && prevOwnersRepairs[selectedOwner].group[groupIndex].element[typeIndex].images.filter((image: string) => image != '').length > 0 &&
                <ImageContainer fieldLabel={t('DataSVL.Labels.images')} images={prevOwnersRepairs[selectedOwner].group[groupIndex].element[typeIndex].images} />
              }
              {prevOwnersRepairs[selectedOwner].group[groupIndex].element[typeIndex].comments != '' &&
                <TextContainer fieldLabel={t('DataSVL.Labels.comments')} text={prevOwnersRepairs[selectedOwner].group[groupIndex].element[typeIndex].comments} />
              }
            </div>
          }
        </div>
      </div>
    ));

    return (
      <div className={styles.typesContainer}>
        {listPreviousRepairs}
      </div> 
    );
  };
  
  const listPreviousGroupRepairs = (selectedOwner: number) => {

    const listPreviousGroupRepairs = Array.from({length: prevOwnersRepairs[selectedOwner].group.length }, (_, groupIndex) => (
      <div key={groupIndex}>
        <div className={styles.groupContainer}>
          <div className={styles.topPart}>
            <div className={styles.toggleVisibilityRemoveGroup}>
              # {groupIndex + 1}
              {prevOwnersRepairs[selectedOwner].group[groupIndex].name != '' ? (
                <div>{prevOwnersRepairs[selectedOwner].group[groupIndex].name}</div>
              ) : (
                <div>{t('DataSVL.Placeholders.noNameSelected')}</div>
              )}
              <ToggleVisibilityRDButton shrinked={shrinked} setShrinked={setShrinked} selectedOwner={selectedOwner} selectedGroup={groupIndex} selectedGroupType={-1} />
            </div>
            {!shrinked[selectedOwner][groupIndex].group &&
              <div className={styles.topBottomPart}>
                {prevOwnersRepairs[selectedOwner].group[groupIndex].kilometers[0] != '' &&
                  <TextContainer fieldLabel={t('DataSVL.Labels.kilometers')} text={prevOwnersRepairs[selectedOwner].group[groupIndex].kilometers} />
                }
                <ResponsibleContainer fieldLabel={t('DataSVL.Labels.responsible')} responsible={prevOwnersRepairs[selectedOwner].group[groupIndex].responsible} />
                {prevOwnersRepairs[selectedOwner].group[groupIndex].date != '' &&
                  <TextContainer fieldLabel={t('DataSVL.Labels.date')} text={prevOwnersRepairs[selectedOwner].group[groupIndex].date} />
                }
                {prevOwnersRepairs[selectedOwner].group[groupIndex].numDefectsRepaired > 0 &&
                  <DefectsRepairedContainer fieldLabel={t('DataSVL.Labels.defectsRepaired')} numDefectsRepaired={prevOwnersRepairs[selectedOwner].group[groupIndex].numDefectsRepaired} 
                    defectsRepaired={prevOwnersRepairs[selectedOwner].group[groupIndex].defectsRepaired} 
                  />
                }
                {isRepairsBase(prevOwnersRepairs[selectedOwner], groupIndex) && prevOwnersRepairs[selectedOwner].group[groupIndex].pre.filter((image: string) => image != '').length > 0 &&
                  <ImageContainer fieldLabel={t('DataSVL.Labels.preImages')} images={prevOwnersRepairs[selectedOwner].group[groupIndex].pre} />
                }
                {isRepairsBase(prevOwnersRepairs[selectedOwner], groupIndex) && prevOwnersRepairs[selectedOwner].group[groupIndex].post.filter((image: string) => image != '').length > 0 &&
                  <ImageContainer fieldLabel={t('DataSVL.Labels.postImages')} images={prevOwnersRepairs[selectedOwner].group[groupIndex].post} />
                }
                {isRepairsBaseSimple(prevOwnersRepairs[selectedOwner], groupIndex) && prevOwnersRepairs[selectedOwner].group[groupIndex].images.filter((image: string) => image != '').length > 0 &&
                  <ImageContainer fieldLabel={t('DataSVL.Labels.images')} images={prevOwnersRepairs[selectedOwner].group[groupIndex].images} />
                }
              </div>
            }
          </div>
          {!shrinked[selectedOwner][groupIndex].group &&
            <div>
              {renderListPreviousRepairs(groupIndex, selectedOwner)}
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
        {listPreviousGroupRepairs}
      </div> 
    );
  };

  const renderListActualRepairs = (groupIndex: number, currentSelOwner: number) => {

    const listActualRepairs = Array.from({length: repairs[currentSelOwner].group[groupIndex].element.length}, (_, typeIndex) => (
      <div key={typeIndex} className={styles.typeContainer} >
        <div className={styles.groupType}>
          <div className={styles.groupTypeTopPart}>
            # {typeIndex + 1}
            {repairs[currentSelOwner].group[groupIndex].element[typeIndex].name != '' ? (
              <div>{repairs[currentSelOwner].group[groupIndex].element[typeIndex].name}</div>
            ) : (
              <div>{t('DataSVL.Placeholders.noNameSelected')}</div>
            )}
            <ToggleVisibilityButton dataSVL={repairs} setDataSVL={setRepairs} selectedOwner={currentSelOwner} 
              selectedGroup={groupIndex} selectedGroupType={typeIndex}
            />
          </div>
          {!repairs[currentSelOwner].group[groupIndex].element[typeIndex].shrinked && checkIfSomeDataInType(currentSelOwner+numPreviousOwners, groupIndex, typeIndex, true) &&
            <div className={styles.groupTypeBottomPart}>
              {isRepairsBase(repairs[currentSelOwner], groupIndex, typeIndex) && repairs[currentSelOwner].group[groupIndex].element[typeIndex].numComponents > 0 &&
                <ComponentsContainer fieldLabel={t('DataSVL.Labels.components')} components={repairs[currentSelOwner].group[groupIndex].element[typeIndex].components} />
              }
              {isRepairsBase(repairs[currentSelOwner], groupIndex, typeIndex) && repairs[currentSelOwner].group[groupIndex].element[typeIndex].pre.filter(image => image != '').length > 0 &&
                <ImageContainer fieldLabel={t('DataSVL.Labels.preImages')} images={repairs[currentSelOwner].group[groupIndex].element[typeIndex].pre} />
              }
              {isRepairsBase(repairs[currentSelOwner], groupIndex, typeIndex) && repairs[currentSelOwner].group[groupIndex].element[typeIndex].post.filter(image => image != '').length > 0 &&
                <ImageContainer fieldLabel={t('DataSVL.Labels.postImages')} images={repairs[currentSelOwner].group[groupIndex].element[typeIndex].post} />
              }
              {isRepairsBaseSimple(repairs[currentSelOwner], groupIndex, typeIndex) && repairs[currentSelOwner].group[groupIndex].element[typeIndex].images.filter(image => image != '').length > 0 &&
                <ImageContainer fieldLabel={t('DataSVL.Labels.images')} images={repairs[currentSelOwner].group[groupIndex].element[typeIndex].images} />
              }
              {repairs[currentSelOwner].group[groupIndex].element[typeIndex].comments != '' &&
                <TextContainer fieldLabel={t('DataSVL.Labels.comments')} text={repairs[currentSelOwner].group[groupIndex].element[typeIndex].comments} />
              }
            </div>
          }
        </div>
      </div>
    ));

    return (
      <div className={styles.typesContainer}>
        {listActualRepairs}
      </div> 
    );
  };

  const listActualGroupRepairs = (currentSelOwner: number) => {

    const listActualGroupRepairs = Array.from({length: repairs[currentSelOwner].group.length }, (_, groupIndex) => (
      <div key={groupIndex}>
        <div className={styles.groupContainer}>
          <div className={styles.topPart}>
            <div className={styles.toggleVisibilityRemoveGroup}>
              # {groupIndex + 1}
              {repairs[currentSelOwner].group[groupIndex].name != '' ? (
                <div>{repairs[currentSelOwner].group[groupIndex].name}</div>
              ) : (
                <div>{t('DataSVL.Placeholders.noNameSelected')}</div>
              )}
              <ToggleVisibilityButton dataSVL={repairs} setDataSVL={setRepairs} selectedOwner={currentSelOwner} 
                selectedGroup={groupIndex} selectedGroupType={-1}
              />
            </div>
            {!repairs[currentSelOwner].group[groupIndex].shrinked &&
              <div className={styles.topBottomPart}>
                {repairs[currentSelOwner].group[groupIndex].kilometers[0] != '' &&
                  <TextContainer fieldLabel={t('DataSVL.Labels.kilometers')} text={repairs[currentSelOwner].group[groupIndex].kilometers} />
                }
                <ResponsibleContainer fieldLabel={t('DataSVL.Labels.responsible')} responsible={repairs[currentSelOwner].group[groupIndex].responsible} />
                {repairs[currentSelOwner].group[groupIndex].date != '' &&
                  <TextContainer fieldLabel={t('DataSVL.Labels.date')} text={repairs[currentSelOwner].group[groupIndex].date} />
                }
                {repairs[currentSelOwner].group[groupIndex].numDefectsRepaired > 0 &&
                  <DefectsRepairedContainer fieldLabel={t('DataSVL.Labels.defectsRepaired')} numDefectsRepaired={repairs[currentSelOwner].group[groupIndex].numDefectsRepaired} 
                    defectsRepaired={repairs[currentSelOwner].group[groupIndex].defectsRepaired} 
                  />
                }
                {isRepairsBase(repairs[currentSelOwner], groupIndex) && repairs[currentSelOwner].group[groupIndex].pre.filter(image => image != '').length > 0 &&
                  <ImageContainer fieldLabel={t('DataSVL.Labels.preImages')} images={repairs[currentSelOwner].group[groupIndex].pre} />
                }
                {isRepairsBase(repairs[currentSelOwner], groupIndex) && repairs[currentSelOwner].group[groupIndex].post.filter(image => image != '').length > 0 &&
                  <ImageContainer fieldLabel={t('DataSVL.Labels.postImages')} images={repairs[currentSelOwner].group[groupIndex].post} />
                }
                {isRepairsBaseSimple(repairs[currentSelOwner], groupIndex) && repairs[currentSelOwner].group[groupIndex].images.filter(image => image != '').length > 0 &&
                  <ImageContainer fieldLabel={t('DataSVL.Labels.images')} images={repairs[currentSelOwner].group[groupIndex].images} />
                }
              </div>
            }
          </div>
          {!repairs[currentSelOwner].group[groupIndex].shrinked &&
            <div>
              {renderListActualRepairs(groupIndex, currentSelOwner)}
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
        {listActualGroupRepairs}
      </div> 
    );
  };

  const listRepairs = Array.from({length: totalOwners }, (_, selectedOwner) => (
    <div key={selectedOwner}>
      {!mySVL || selectedOwner < numPreviousOwners ? (
        <div>          
          {prevOwnersRepairs[selectedOwner].group.length > 0 ? (      
            <div>{listPreviousGroupRepairs(selectedOwner)}</div>
          ) : (
            <div className={styles.noData}>
              {t('DataSVL.Placeholders.owner')} {selectedOwner+1} - <NoDataRepairs />
            </div>
          )}
        </div>
      ) : (
        <div>          
          {repairs[selectedOwner-numPreviousOwners].group.length > 0 ? (      
            <div>{listActualGroupRepairs(selectedOwner-numPreviousOwners)}</div>
          ) : (
            <div className={styles.noData}>
              {t('DataSVL.Placeholders.owner')} {selectedOwner+1} - <NoDataRepairs />
            </div>
          )}
        </div>
      )}
    </div>
  ));

  return (
    <div className={styles.typeSVLContainer}>
      <div className={styles.title}>
        {t('DataSVL.Labels.repairs')}
      </div>
      {listRepairs}
    </div>
  );
}

export default SummaryViewRepairs;