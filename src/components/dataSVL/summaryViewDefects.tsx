import styles from '../../styles/components/dataSVL/typeSVL.module.css';
import TextContainer from './readOnlyFields/textContainer.tsx';
import ImageContainer from './readOnlyFields/imageContainer.tsx';
import RepairedDefectsByContainer from './readOnlyFields/repairedDefectByContainer.tsx';
import ToggleVisibilityButton from './buttons/toggleVisibilityButton.tsx';
import ToggleVisibilityRDButton from './readOnlyFields/toggleVisibilityRDButton.tsx';
import { useTranslation } from "react-i18next";
import { SetStateAction } from 'react';
import { NoDataDefects } from '../../assets/noData.tsx';
import { PossibleDefectsJsonVersions, PossibleRepairsJsonVersions } from '../../utils/commonTypes.ts';

type SummaryViewDefectsProps = {
  prevOwnersDefects: PossibleDefectsJsonVersions[];
  defects: PossibleDefectsJsonVersions[];
  repairs: PossibleRepairsJsonVersions[];
  prevOwnersRepairs: any;
  setDefects: React.Dispatch<SetStateAction<PossibleDefectsJsonVersions[]>>;
  shrinked: any;
  setShrinked: any;
  numPreviousOwners: number;
  totalOwners: number;
  mySVL: boolean;
};

const SummaryViewDefects = ({ prevOwnersDefects, defects, repairs, prevOwnersRepairs, setDefects, shrinked, setShrinked, numPreviousOwners, totalOwners, mySVL }: SummaryViewDefectsProps): JSX.Element => {

  const { t } = useTranslation();

  const checkIfSomeDataInType = (selectedOwner: number, groupIndex: number, typeIndex: number, actual: boolean) => {
    if (actual) {
      if (defects[selectedOwner-numPreviousOwners].group[groupIndex].element[typeIndex].level != 'DataSVL.Forms.level' ||
        defects[selectedOwner-numPreviousOwners].group[groupIndex].element[typeIndex].images.filter(image => image != '').length > 0 ||
        defects[selectedOwner-numPreviousOwners].group[groupIndex].element[typeIndex].description != '') return true;
      else return false;
    }
    else {
      if (prevOwnersDefects[selectedOwner].group[groupIndex].element[typeIndex].level != 'DataSVL.Forms.level' ||
        prevOwnersDefects[selectedOwner].group[groupIndex].element[typeIndex].images.filter((image: string) => image != '').length > 0 ||
        prevOwnersDefects[selectedOwner].group[groupIndex].element[typeIndex].description != '') return true;
      else return false;
    }
  };

  const renderListPreviousDefects = (groupIndex: number, selectedOwner: number) => {

    const listPreviousDefects = Array.from({length: prevOwnersDefects[selectedOwner].group[groupIndex].element.length}, (_, typeIndex) => (
      <div key={typeIndex} className={styles.typeContainer} >
        <div className={styles.groupType}>
          <div className={styles.groupTypeTopPart}>
            # {typeIndex + 1}
            {prevOwnersDefects[selectedOwner].group[groupIndex].element[typeIndex].level != 'DataSVL.Forms.level' ? (
              <div>{t(prevOwnersDefects[selectedOwner].group[groupIndex].element[typeIndex].level)}</div>
            ) : (
              <div>{t('DataSVL.Placeholders.noDefectLevelSelected')}</div>
            )}
            <ToggleVisibilityRDButton shrinked={shrinked} setShrinked={setShrinked} selectedOwner={selectedOwner} selectedGroup={groupIndex} selectedGroupType={typeIndex} />
          </div>
          {!shrinked[selectedOwner][groupIndex].element[typeIndex] && checkIfSomeDataInType(selectedOwner, groupIndex, typeIndex, false) &&
            <div className={styles.groupTypeBottomPart}>
              {prevOwnersDefects[selectedOwner].group[groupIndex].element[typeIndex].images.filter((image: string) => image != '').length > 0 &&
                <ImageContainer fieldLabel={t('DataSVL.Labels.images')} images={prevOwnersDefects[selectedOwner].group[groupIndex].element[typeIndex].images} />
              }
              {prevOwnersDefects[selectedOwner].group[groupIndex].element[typeIndex].description != '' &&
                <TextContainer fieldLabel={t('DataSVL.Labels.description')} text={prevOwnersDefects[selectedOwner].group[groupIndex].element[typeIndex].description} />
              }
            </div>
          }
        </div>
      </div>
    ));

    return (
      <div className={styles.typesContainer}>
        {listPreviousDefects}
      </div> 
    );
  };
  
  const listPreviousGroupDefects = (selectedOwner: number) => {

    const listPreviousGroupDefects = Array.from({length: prevOwnersDefects[selectedOwner].group.length }, (_, groupIndex) => (
      <div key={groupIndex}>
        <div className={styles.groupContainerPrevOwners}>
          <div className={styles.topPart}>
            <div className={styles.toggleVisibilityRemoveGroup}>
              # {groupIndex + 1}
              {prevOwnersDefects[selectedOwner].group[groupIndex].date != '' ? (
                <div>{new Date(prevOwnersDefects[selectedOwner].group[groupIndex].date).toLocaleDateString("en-GB")}</div>
              ) : (
                <div>{t('DataSVL.Placeholders.noDateSelected')}</div>
              )}
              <ToggleVisibilityRDButton shrinked={shrinked} setShrinked={setShrinked} selectedOwner={selectedOwner} selectedGroup={groupIndex} selectedGroupType={-1} />
            </div>
            {!shrinked[selectedOwner][groupIndex].group &&
              <div className={styles.topBottomPart}>
                {prevOwnersDefects[selectedOwner].group[groupIndex].kilometers[0] != '' &&
                  <TextContainer fieldLabel={t('DataSVL.Labels.kilometers')} text={prevOwnersDefects[selectedOwner].group[groupIndex].kilometers} />
                }
                {prevOwnersDefects[selectedOwner].group[groupIndex].cause != '' &&
                  <TextContainer fieldLabel={t('DataSVL.Labels.cause')} text={prevOwnersDefects[selectedOwner].group[groupIndex].cause} />
                }
                <RepairedDefectsByContainer fieldLabel={t('DataSVL.Labels.repairsL')} repairs={repairs} prevOwnersRepairs={prevOwnersRepairs}  
                  selectedOwner={selectedOwner} selectedGroup={groupIndex} numPreviousOwners={numPreviousOwners} totalOwners={totalOwners}
                  mySVL={mySVL} view={'summaryView'}
                />
              </div>
            }
          </div>
          {!shrinked[selectedOwner][groupIndex].group &&
            <div>
              {renderListPreviousDefects(groupIndex, selectedOwner)}
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
        {listPreviousGroupDefects}
      </div> 
    );
  };

  const renderListActualDefects = (groupIndex: number, currentSelOwner: number) => {

    const listActualDefects = Array.from({length: defects[currentSelOwner].group[groupIndex].element.length}, (_, typeIndex) => (
      <div key={typeIndex} className={styles.typeContainer} >
        <div className={styles.groupType}>
          <div className={styles.groupTypeTopPart}>
            # {typeIndex + 1}
            {defects[currentSelOwner].group[groupIndex].element[typeIndex].level != 'DataSVL.Forms.level' ? (
              <div>{t(defects[currentSelOwner].group[groupIndex].element[typeIndex].level)}</div>
            ) : (
              <div>{t('DataSVL.Placeholders.noDefectLevelSelected')}</div>
            )}
            <ToggleVisibilityButton dataSVL={defects} setDataSVL={setDefects} selectedOwner={currentSelOwner} 
              selectedGroup={groupIndex} selectedGroupType={typeIndex}
            />
          </div>
          {!defects[currentSelOwner].group[groupIndex].element[typeIndex].shrinked && checkIfSomeDataInType(currentSelOwner+numPreviousOwners, groupIndex, typeIndex, true) &&
            <div className={styles.groupTypeBottomPart}>
              {defects[currentSelOwner].group[groupIndex].element[typeIndex].images.filter(image => image != '').length > 0 &&
                <ImageContainer fieldLabel={t('DataSVL.Labels.images')} images={defects[currentSelOwner].group[groupIndex].element[typeIndex].images} />
              }
              {defects[currentSelOwner].group[groupIndex].element[typeIndex].description != '' &&
                <TextContainer fieldLabel={t('DataSVL.Labels.description')} text={defects[currentSelOwner].group[groupIndex].element[typeIndex].description} />
              }
            </div>
          }
        </div>
      </div>
    ));

    return (
      <div className={styles.typesContainer}>
        {listActualDefects}
      </div> 
    );
  };

  const listActualGroupDefects = (currentSelOwner: number) => {

    const listActualGroupDefects = Array.from({length: defects[currentSelOwner].group.length }, (_, groupIndex) => (
      <div key={groupIndex}>
        <div className={styles.groupContainer}>
          <div className={styles.topPart}>
            <div className={styles.toggleVisibilityRemoveGroup}>
              # {groupIndex + 1}
              {defects[currentSelOwner].group[groupIndex].date != '' ? (
                <div>{new Date(defects[currentSelOwner].group[groupIndex].date).toLocaleDateString("en-GB")}</div>
              ) : (
                <div>{t('DataSVL.Placeholders.noDateSelected')}</div>
              )}
              <ToggleVisibilityButton dataSVL={defects} setDataSVL={setDefects} selectedOwner={currentSelOwner} 
                selectedGroup={groupIndex} selectedGroupType={-1}
              />
            </div>
            {!defects[currentSelOwner].group[groupIndex].shrinked &&
              <div className={styles.topBottomPart}>
                {defects[currentSelOwner].group[groupIndex].kilometers[0] != '' &&
                  <TextContainer fieldLabel={t('DataSVL.Labels.kilometers')} text={defects[currentSelOwner].group[groupIndex].kilometers} />
                }
                <TextContainer fieldLabel={t('DataSVL.Labels.cause')} text={defects[currentSelOwner].group[groupIndex].cause} />
                <RepairedDefectsByContainer fieldLabel={t('DataSVL.Labels.repairsL')} repairs={repairs} selectedOwner={currentSelOwner+numPreviousOwners} 
                  selectedGroup={groupIndex} numPreviousOwners={numPreviousOwners} totalOwners={totalOwners} mySVL={mySVL} view={'summaryView'}
                />
              </div>
            }
          </div>
          {!defects[currentSelOwner].group[groupIndex].shrinked &&
            <div>
              {renderListActualDefects(groupIndex, currentSelOwner)}
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
        {listActualGroupDefects}
      </div> 
    );
  };

  const listDefects = Array.from({length: totalOwners }, (_, selectedOwner) => (
    <div key={selectedOwner}>
      {!mySVL || selectedOwner < numPreviousOwners ? (
        <div>        
          {prevOwnersDefects[selectedOwner].group.length > 0 ? (        
            <div>{listPreviousGroupDefects(selectedOwner)}</div>
          ) : (
            <div className={styles.noData}>
              {t('DataSVL.Placeholders.owner')} {selectedOwner+1} - <NoDataDefects />
            </div>
          )}
        </div>
      ) : (
        <div>         
          {defects[selectedOwner-numPreviousOwners].group.length > 0 ? (      
            <div>{listActualGroupDefects(selectedOwner-numPreviousOwners)}</div>
          ) : (
            <div className={styles.noData}>
              {t('DataSVL.Placeholders.owner')} {selectedOwner+1} - <NoDataDefects />
            </div>
          )}
        </div>
      )}
    </div>
  ));

  return (
    <div className={styles.typeSVLContainer}>
      <div className={styles.title}>
        {t('DataSVL.Labels.defects')}
      </div>
      {listDefects}
    </div>
  );
}

export default SummaryViewDefects;