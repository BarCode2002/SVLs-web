import styles from '../../styles/components/dataSVL/typeSVL.module.css';
import { Defects, Repairs } from '../../utils/interfaces.ts';
import TextContainer from './readOnlyFields/textContainer.tsx';
import ImageContainer from './readOnlyFields/imageContainer.tsx';
import RepairedDefectsByContainer from './readOnlyFields/repairedDefectByContainer.tsx';
import ToggleVisibilityButton from './buttons/toggleVisibilityButton.tsx';
import ToggleVisibilityRDButton from './readOnlyFields/toggleVisibilityRDButton.tsx';
import { useTranslation } from "react-i18next";
import { SetStateAction } from 'react';
import { NoDataDefects } from '../../assets/noData.tsx';

type SummaryViewDefectsProps = {
  prevOwnersDefects: any;
  defects: Defects[];
  repairs: Repairs[];
  prevOwnersRepairs: any;
  setDefects: React.Dispatch<SetStateAction<Defects[]>>;
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
      if (defects[selectedOwner-numPreviousOwners].group[groupIndex].type[typeIndex].level != 'DataSVL.Forms.level' ||
        defects[selectedOwner-numPreviousOwners].group[groupIndex].type[typeIndex].photographs.filter(image => image != '').length > 0 ||
        defects[selectedOwner-numPreviousOwners].group[groupIndex].type[typeIndex].description != '') return true;
      else return false;
    }
    else {
      if (prevOwnersDefects[selectedOwner].defects[groupIndex].type[typeIndex].level == 'DataSVL.Forms.level' ||
        prevOwnersDefects[selectedOwner].defects[groupIndex].type[typeIndex].photographs.filter((image: string) => image != '').length > 0 ||
        prevOwnersDefects[selectedOwner].defects[groupIndex].type[typeIndex].description != '') return true;
      else return false;
    }
  };

  const renderListPreviousDefects = (groupIndex: number, selectedOwner: number) => {

    const listPreviousDefects = Array.from({length: prevOwnersDefects[selectedOwner].defects[groupIndex].type.length}, (_, typeIndex) => (
      <div key={typeIndex} className={styles.typeContainer} >
        <div className={styles.groupType}>
          <div className={styles.groupTypeTopPart}>
            # {typeIndex + 1}
            {prevOwnersDefects[selectedOwner].defects[groupIndex].type[typeIndex].level != 'DataSVL.Forms.level' ? (
              <div>{t(prevOwnersDefects[selectedOwner].defects[groupIndex].type[typeIndex].level)}</div>
            ) : (
              <div>{t('DataSVL.Placeholders.noDefectLevelSelected')}</div>
            )}
            <ToggleVisibilityRDButton shrinked={shrinked} setShrinked={setShrinked} selectedOwner={selectedOwner} selectedGroup={groupIndex} selectedGroupType={typeIndex} />
          </div>
          {!shrinked[selectedOwner][groupIndex].type[typeIndex] && checkIfSomeDataInType(selectedOwner, groupIndex, typeIndex, false) &&
            <div className={styles.groupTypeBottomPart}>
              {prevOwnersDefects[selectedOwner].defects[groupIndex].type[typeIndex].photographs.filter((image: string) => image != '').length > 0 &&
                <ImageContainer fieldLabel={t('DataSVL.Labels.images')} images={prevOwnersDefects[selectedOwner].defects[groupIndex].type[typeIndex].photographs} />
              }
              {prevOwnersDefects[selectedOwner].defects[groupIndex].type[typeIndex].description != '' &&
                <TextContainer fieldLabel={t('DataSVL.Labels.description')} text={prevOwnersDefects[selectedOwner].defects[groupIndex].type[typeIndex].description} />
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

    const listPreviousGroupDefects = Array.from({length: prevOwnersDefects[selectedOwner].defects.length }, (_, groupIndex) => (
      <div key={groupIndex}>
        <div className={styles.groupContainerPrevOwners}>
          <div className={styles.topPart}>
            <div className={styles.toggleVisibilityRemoveGroup}>
              # {groupIndex + 1}
              {prevOwnersDefects[selectedOwner].defects[groupIndex].date != '' ? (
                <div>{new Date(prevOwnersDefects[selectedOwner].defects[groupIndex].date).toLocaleDateString("en-GB")}</div>
              ) : (
                <div>{t('DataSVL.Placeholders.noDateSelected')}</div>
              )}
              <ToggleVisibilityRDButton shrinked={shrinked} setShrinked={setShrinked} selectedOwner={selectedOwner} selectedGroup={groupIndex} selectedGroupType={-1} />
            </div>
            {!shrinked[selectedOwner][groupIndex].group &&
              <div className={styles.topBottomPart}>
                {prevOwnersDefects[selectedOwner].defects[groupIndex].kilometers != '' &&
                  <TextContainer fieldLabel={t('DataSVL.Labels.kilometers')} text={prevOwnersDefects[selectedOwner].defects[groupIndex].kilometers} />
                }
                {prevOwnersDefects[selectedOwner].defects[groupIndex].cause != '' &&
                  <TextContainer fieldLabel={t('DataSVL.Labels.cause')} text={prevOwnersDefects[selectedOwner].defects[groupIndex].cause} />
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

  const renderListActualDefects = (groupIndex: number, selectedOwner: number) => {

    const listActualDefects = Array.from({length: defects[selectedOwner-numPreviousOwners].group[groupIndex].type.length}, (_, typeIndex) => (
      <div key={typeIndex} className={styles.typeContainer} >
        <div className={styles.groupType}>
          <div className={styles.groupTypeTopPart}>
            # {typeIndex + 1}
            {defects[selectedOwner-numPreviousOwners].group[groupIndex].type[typeIndex].level != 'DataSVL.Forms.level' ? (
              <div>{t(defects[selectedOwner-numPreviousOwners].group[groupIndex].type[typeIndex].level)}</div>
            ) : (
              <div>{t('DataSVL.Placeholders.noDefectLevelSelected')}</div>
            )}
            <ToggleVisibilityButton dataSVL={defects} setDataSVL={setDefects} selectedOwner={selectedOwner-numPreviousOwners} 
              selectedGroup={groupIndex} selectedGroupType={typeIndex}
            />
          </div>
          {!defects[selectedOwner-numPreviousOwners].group[groupIndex].type[typeIndex].shrinked && checkIfSomeDataInType(selectedOwner, groupIndex, typeIndex, true) &&
            <div className={styles.groupTypeBottomPart}>
              {defects[selectedOwner-numPreviousOwners].group[groupIndex].type[typeIndex].photographs.filter(image => image != '').length > 0 &&
                <ImageContainer fieldLabel={t('DataSVL.Labels.images')} images={defects[selectedOwner-numPreviousOwners].group[groupIndex].type[typeIndex].photographs} />
              }
              {defects[selectedOwner-numPreviousOwners].group[groupIndex].type[typeIndex].description != '' &&
                <TextContainer fieldLabel={t('DataSVL.Labels.description')} text={defects[selectedOwner-numPreviousOwners].group[groupIndex].type[typeIndex].description} />
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

  const listActualGroupDefects = (selectedOwner: number) => {

    const listActualGroupDefects = Array.from({length: defects[selectedOwner-numPreviousOwners].group.length }, (_, groupIndex) => (
      <div key={groupIndex}>
        <div className={styles.groupContainer}>
          <div className={styles.topPart}>
            <div className={styles.toggleVisibilityRemoveGroup}>
              # {groupIndex + 1}
              {defects[selectedOwner-numPreviousOwners].group[groupIndex].date != '' ? (
                <div>{new Date(defects[selectedOwner-numPreviousOwners].group[groupIndex].date).toLocaleDateString("en-GB")}</div>
              ) : (
                <div>{t('DataSVL.Placeholders.noDateSelected')}</div>
              )}
              <ToggleVisibilityButton dataSVL={defects} setDataSVL={setDefects} selectedOwner={selectedOwner-numPreviousOwners} 
                selectedGroup={groupIndex} selectedGroupType={-1}
              />
            </div>
            {!defects[selectedOwner-numPreviousOwners].group[groupIndex].shrinked &&
              <div className={styles.topBottomPart}>
                {defects[selectedOwner-numPreviousOwners].group[groupIndex].kilometers[0] != '' &&
                  <TextContainer fieldLabel={t('DataSVL.Labels.kilometers')} text={defects[selectedOwner-numPreviousOwners].group[groupIndex].kilometers} />
                }
                <TextContainer fieldLabel={t('DataSVL.Labels.cause')} text={defects[selectedOwner-numPreviousOwners].group[groupIndex].cause} />
                <RepairedDefectsByContainer fieldLabel={t('DataSVL.Labels.repairsL')} repairs={repairs} selectedOwner={selectedOwner} 
                  selectedGroup={groupIndex} numPreviousOwners={numPreviousOwners} totalOwners={totalOwners} mySVL={mySVL} view={'summaryView'}
                />
              </div>
            }
          </div>
          {!defects[selectedOwner-numPreviousOwners].group[groupIndex].shrinked &&
            <div>
              {renderListActualDefects(groupIndex, selectedOwner)}
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
        {listActualGroupDefects}
      </div> 
    );
  };

  const listDefects = Array.from({length: totalOwners }, (_, selectedOwner) => (
    <div key={selectedOwner}>
      {!mySVL || selectedOwner < numPreviousOwners ? (
        <div>        
          {prevOwnersDefects[selectedOwner].defects.length > 0 ? (        
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
            <div>{listActualGroupDefects(selectedOwner)}</div>
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