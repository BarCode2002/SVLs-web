import styles from '../../styles/components/dataSVL/typeSVL.module.css';
import { Repairs } from '../../utils/interfaces.ts';
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

type SummaryViewRepairsProps = {
  prevOwnersRepairs: any;
  repairs: Repairs[];
  setRepairs: React.Dispatch<SetStateAction<Repairs[]>>;
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
      if (repairs[selectedOwner-numPreviousOwners].group[groupIndex].type[typeIndex].numComponents > 0 ||
        repairs[selectedOwner-numPreviousOwners].group[groupIndex].type[typeIndex].pre.filter(image => image != '').length > 0 ||
        repairs[selectedOwner-numPreviousOwners].group[groupIndex].type[typeIndex].post.filter(image => image != '').length > 0 ||
        repairs[selectedOwner-numPreviousOwners].group[groupIndex].type[typeIndex].comments != '') return true;
      else return false;
    }
    else {
      if (prevOwnersRepairs[selectedOwner].repairs[groupIndex].type[typeIndex].numComponents > 0 ||
        prevOwnersRepairs[selectedOwner].repairs[groupIndex].type[typeIndex].pre.filter((image: string) => image != '').length > 0 ||
        prevOwnersRepairs[selectedOwner].repairs[groupIndex].type[typeIndex].post.filter((image: string) => image != '').length > 0 ||
        prevOwnersRepairs[selectedOwner].repairs[groupIndex].type[typeIndex].comments != '') return true;
      else return false;
    }
  };

  const renderListPreviousRepairs = (groupIndex: number, selectedOwner: number) => {

    const listPreviousRepairs = Array.from({length: prevOwnersRepairs[selectedOwner].repairs[groupIndex].type.length}, (_, typeIndex) => (
      <div key={typeIndex} className={styles.typeContainer} >
        <div className={styles.groupType}>
          <div className={styles.groupTypeTopPart}>
            # {typeIndex + 1}
            {prevOwnersRepairs[selectedOwner].repairs[groupIndex].type[typeIndex].name ? (
              <div>{prevOwnersRepairs[selectedOwner].repairs[groupIndex].type[typeIndex].name}</div>
            ) : (
              <div>{t('DataSVL.Placeholders.noNameSelected')}</div>
            )}
            <ToggleVisibilityRDButton shrinked={shrinked} setShrinked={setShrinked} selectedOwner={selectedOwner} selectedGroup={groupIndex} selectedGroupType={typeIndex} />
          </div>
          {!shrinked[selectedOwner][groupIndex].type[typeIndex] && checkIfSomeDataInType(selectedOwner, groupIndex, typeIndex, false) &&
            <div className={styles.groupTypeBottomPart}>
              {prevOwnersRepairs[selectedOwner].repairs[groupIndex].type[typeIndex].numComponents > 0 &&
                <ComponentsContainer fieldLabel={t('DataSVL.Labels.components')} components={prevOwnersRepairs[selectedOwner].repairs[groupIndex].type[typeIndex].components} />
              }
              {prevOwnersRepairs[selectedOwner].repairs[groupIndex].type[typeIndex].pre.filter((image: string) => image != '').length > 0 &&
                <ImageContainer fieldLabel={t('DataSVL.Labels.preImages')} images={prevOwnersRepairs[selectedOwner].repairs[groupIndex].type[typeIndex].pre} />
              }
              {prevOwnersRepairs[selectedOwner].repairs[groupIndex].type[typeIndex].post.filter((image: string) => image != '').length > 0 &&
                <ImageContainer fieldLabel={t('DataSVL.Labels.postImages')} images={prevOwnersRepairs[selectedOwner].repairs[groupIndex].type[typeIndex].post} />
              }
              {prevOwnersRepairs[selectedOwner].repairs[groupIndex].type[typeIndex].comments != '' &&
                <TextContainer fieldLabel={t('DataSVL.Labels.comments')} text={prevOwnersRepairs[selectedOwner].repairs[groupIndex].type[typeIndex].comments} />
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

    const listPreviousGroupRepairs = Array.from({length: prevOwnersRepairs[selectedOwner].repairs.length }, (_, groupIndex) => (
      <div key={groupIndex}>
        <div className={styles.groupContainer}>
          <div className={styles.topPart}>
            <div className={styles.toggleVisibilityRemoveGroup}>
              # {groupIndex + 1}
              {prevOwnersRepairs[selectedOwner].repairs[groupIndex].name != '' ? (
                <div>{prevOwnersRepairs[selectedOwner].repairs[groupIndex].name}</div>
              ) : (
                <div>{t('DataSVL.Placeholders.noNameSelected')}</div>
              )}
              <ToggleVisibilityRDButton shrinked={shrinked} setShrinked={setShrinked} selectedOwner={selectedOwner} selectedGroup={groupIndex} selectedGroupType={-1} />
            </div>
            {!shrinked[selectedOwner][groupIndex].group &&
              <div className={styles.topBottomPart}>
                {prevOwnersRepairs[selectedOwner].repairs[groupIndex].kilometers != '' &&
                  <TextContainer fieldLabel={t('DataSVL.Labels.kilometers')} text={prevOwnersRepairs[selectedOwner].repairs[groupIndex].kilometers} />
                }
                <ResponsibleContainer fieldLabel={t('DataSVL.Labels.responsible')} responsible={prevOwnersRepairs[selectedOwner].repairs[groupIndex].responsible} />
                {prevOwnersRepairs[selectedOwner].repairs[groupIndex].date != '' &&
                  <TextContainer fieldLabel={t('DataSVL.Labels.date')} text={prevOwnersRepairs[selectedOwner].repairs[groupIndex].date} />
                }
                {prevOwnersRepairs[selectedOwner].repairs[groupIndex].numDefectsRepaired > 0 &&
                  <DefectsRepairedContainer fieldLabel={t('DataSVL.Labels.defectsRepaired')} numDefectsRepaired={prevOwnersRepairs[selectedOwner].repairs[groupIndex].numDefectsRepaired} 
                    defectsRepaired={prevOwnersRepairs[selectedOwner].repairs[groupIndex].defectsRepaired} 
                  />
                }
                {prevOwnersRepairs[selectedOwner].repairs[groupIndex].pre.filter((image: string) => image != '').length > 0 &&
                  <ImageContainer fieldLabel={t('DataSVL.Labels.preImages')} images={prevOwnersRepairs[selectedOwner].repairs[groupIndex].pre} />
                }
                {prevOwnersRepairs[selectedOwner].repairs[groupIndex].post.filter((image: string) => image != '').length > 0 &&
                  <ImageContainer fieldLabel={t('DataSVL.Labels.postImages')} images={prevOwnersRepairs[selectedOwner].repairs[groupIndex].post} />
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

  const renderListActualRepairs = (groupIndex: number, selectedOwner: number) => {

    const listActualRepairs = Array.from({length: repairs[selectedOwner-numPreviousOwners].group[groupIndex].type.length}, (_, typeIndex) => (
      <div key={typeIndex} className={styles.typeContainer} >
        <div className={styles.groupType}>
          <div className={styles.groupTypeTopPart}>
            # {typeIndex + 1}
            {repairs[selectedOwner-numPreviousOwners].group[groupIndex].type[typeIndex].name != '' ? (
              <div>{repairs[selectedOwner-numPreviousOwners].group[groupIndex].type[typeIndex].name}</div>
            ) : (
              <div>{t('DataSVL.Placeholders.noNameSelected')}</div>
            )}
            <ToggleVisibilityButton dataSVL={repairs} setDataSVL={setRepairs} selectedOwner={selectedOwner-numPreviousOwners} 
              selectedGroup={groupIndex} selectedGroupType={typeIndex}
            />
          </div>
          {!repairs[selectedOwner-numPreviousOwners].group[groupIndex].type[typeIndex].shrinked && checkIfSomeDataInType(selectedOwner, groupIndex, typeIndex, true) &&
            <div className={styles.groupTypeBottomPart}>
              {repairs[selectedOwner-numPreviousOwners].group[groupIndex].type[typeIndex].numComponents > 0 &&
                <ComponentsContainer fieldLabel={t('DataSVL.Labels.components')} components={repairs[selectedOwner-numPreviousOwners].group[groupIndex].type[typeIndex].components} />
              }
              {repairs[selectedOwner-numPreviousOwners].group[groupIndex].type[typeIndex].pre.filter(image => image != '').length > 0 &&
                <ImageContainer fieldLabel={t('DataSVL.Labels.preImages')} images={repairs[selectedOwner-numPreviousOwners].group[groupIndex].type[typeIndex].pre} />
              }
              {repairs[selectedOwner-numPreviousOwners].group[groupIndex].type[typeIndex].post.filter(image => image != '').length > 0 &&
                <ImageContainer fieldLabel={t('DataSVL.Labels.postImages')} images={repairs[selectedOwner-numPreviousOwners].group[groupIndex].type[typeIndex].post} />
              }
              {repairs[selectedOwner-numPreviousOwners].group[groupIndex].type[typeIndex].comments != '' &&
                <TextContainer fieldLabel={t('DataSVL.Labels.comments')} text={repairs[selectedOwner-numPreviousOwners].group[groupIndex].type[typeIndex].comments} />
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

  const listActualGroupRepairs = (selectedOwner: number) => {

    const listActualGroupRepairs = Array.from({length: repairs[selectedOwner-numPreviousOwners].group.length }, (_, groupIndex) => (
      <div key={groupIndex}>
        <div className={styles.groupContainer}>
          <div className={styles.topPart}>
            <div className={styles.toggleVisibilityRemoveGroup}>
              # {groupIndex + 1}
              {repairs[selectedOwner-numPreviousOwners].group[groupIndex].name != '' ? (
                <div>{repairs[selectedOwner-numPreviousOwners].group[groupIndex].name}</div>
              ) : (
                <div>{t('DataSVL.Placeholders.noNameSelected')}</div>
              )}
              <ToggleVisibilityButton dataSVL={repairs} setDataSVL={setRepairs} selectedOwner={selectedOwner-numPreviousOwners} 
                selectedGroup={groupIndex} selectedGroupType={-1}
              />
            </div>
            {!repairs[selectedOwner-numPreviousOwners].group[groupIndex].shrinked &&
              <div className={styles.topBottomPart}>
                {repairs[selectedOwner-numPreviousOwners].group[groupIndex].kilometers[0] != '' &&
                  <TextContainer fieldLabel={t('DataSVL.Labels.kilometers')} text={repairs[selectedOwner-numPreviousOwners].group[groupIndex].kilometers} />
                }
                <ResponsibleContainer fieldLabel={t('DataSVL.Labels.responsible')} responsible={repairs[selectedOwner-numPreviousOwners].group[groupIndex].responsible} />
                {repairs[selectedOwner-numPreviousOwners].group[groupIndex].date != '' &&
                  <TextContainer fieldLabel={t('DataSVL.Labels.date')} text={repairs[selectedOwner-numPreviousOwners].group[groupIndex].date} />
                }
                {repairs[selectedOwner-numPreviousOwners].group[groupIndex].numDefectsRepaired > 0 &&
                  <DefectsRepairedContainer fieldLabel={t('DataSVL.Labels.defectsRepaired')} numDefectsRepaired={repairs[selectedOwner-numPreviousOwners].group[groupIndex].numDefectsRepaired} 
                    defectsRepaired={repairs[selectedOwner-numPreviousOwners].group[groupIndex].defectsRepaired} 
                  />
                }
                {repairs[selectedOwner-numPreviousOwners].group[groupIndex].pre.filter(image => image != '').length > 0 &&
                  <ImageContainer fieldLabel={t('DataSVL.Labels.preImages')} images={repairs[selectedOwner-numPreviousOwners].group[groupIndex].pre} />
                }
                {repairs[selectedOwner-numPreviousOwners].group[groupIndex].post.filter(image => image != '').length > 0 &&
                  <ImageContainer fieldLabel={t('DataSVL.Labels.postImages')} images={repairs[selectedOwner-numPreviousOwners].group[groupIndex].post} />
                }
              </div>
            }
          </div>
          {!repairs[selectedOwner-numPreviousOwners].group[groupIndex].shrinked &&
            <div>
              {renderListActualRepairs(groupIndex, selectedOwner)}
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
        {listActualGroupRepairs}
      </div> 
    );
  };

  const listRepairs = Array.from({length: totalOwners }, (_, selectedOwner) => (
    <div key={selectedOwner}>
      {!mySVL || selectedOwner < numPreviousOwners ? (
        <div>          
          {prevOwnersRepairs[selectedOwner].repairs.length > 0 ? (      
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
            <div>{listActualGroupRepairs(selectedOwner)}</div>
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