import styles from '../../../styles/components/dataSVL/fields/defectsRepairedField.module.css';
import { DEFECTS_REPAIRED_SIZE } from '../../../utils/constants';
import { DetectClickOutsideComponent } from '../../varied/detectClickOutsideComponent';
import { SetStateAction, useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';

type DefectsRepairedFieldProps = {
  fieldLabel: string;
  totalOwners: number;
  selectedOwner: number;
  selectedGroup: number;
  repairs: any;
  setRepairs: React.Dispatch<SetStateAction<any>>;
  defects: any;
};

const DefectsRepairedField = ({ fieldLabel, totalOwners, selectedOwner, selectedGroup, repairs, setRepairs, defects }: DefectsRepairedFieldProps): JSX.Element => {
  
  const { t } = useTranslation();

  const [commonStep, setCommonStep] = useState(0);
  const [step, setStep] = useState<number[]>(Array(DEFECTS_REPAIRED_SIZE).fill(1));
  const [isOpen, setIsOpen] = useState<boolean[][]>( Array.from({ length: DEFECTS_REPAIRED_SIZE }, () => [false, false, false]));
  const [searchQuery, setSearchQuery] = useState<string[][]>( Array.from({ length: DEFECTS_REPAIRED_SIZE }, () => ["", "", ""]));
  const [ownersWithDefects, setOwnersWithDefects] = useState<string[]>([]);
  const [defectGroupsOwner, setDefectGroupsOwner] = useState<string[]>([]);
  const [defectGroupTypesOwner, setDefectGroupTypesOwner] = useState<string[]>([]);

  useEffect(() => {
    const updatedOwnersWithDefects = [];
    for (let i = 0; i < totalOwners; i++) {
      if (i < selectedOwner && defects[i].numGroups > 0) updatedOwnersWithDefects.push(`${t('DataSVL.Placeholders.owner')} ${i+1}`); 
    }
    setOwnersWithDefects(updatedOwnersWithDefects);
  }, [selectedOwner]);

  const handleRepairDefect = () => { 
    const updatedRepairs = [...repairs];
    if (updatedRepairs[selectedOwner].group[selectedGroup].numDefectsRepaired == 0) {
      updatedRepairs[selectedOwner].group[selectedGroup].numDefectsRepaired = 1;
      setCommonStep(1)
    }
    else {
      for (let i = 0; i < updatedRepairs[selectedOwner].group[selectedGroup].numDefectsRepaired; i++) {
        updatedRepairs[selectedOwner].group[selectedGroup].defectsRepaired[i] = [-1, -1, -1];
      }
      updatedRepairs[selectedOwner].group[selectedGroup].numDefectsRepaired = 0;
      setCommonStep(0);
      const updatedSearchQuery = [...searchQuery];
      const updatedIsOpen = [...isOpen];
      const updatedStep = [...step];
      for (let i = 0; i < DEFECTS_REPAIRED_SIZE; i++) {
        updatedSearchQuery[i] = ['','',''];
        updatedIsOpen[i] = [false, false, false];
        updatedStep[i] = 1;
      }
      setSearchQuery(updatedSearchQuery);
      setIsOpen(updatedIsOpen);
      setStep(updatedStep);
    }
    setRepairs(updatedRepairs);
  };

  const handleNewRepairedDefect = () => { 
    const updatedRepairs = [...repairs];
    updatedRepairs[selectedOwner].group[selectedGroup].numDefectsRepaired += 1;  
    setRepairs(updatedRepairs);
  }

  const handleOwnerInputChange = (event: React.ChangeEvent<HTMLInputElement>, i: number) => {
    const updatedIsOpen = [...isOpen];
    const updatedSearchQuery = [...searchQuery];
    if (event.target.value != '') {
      updatedIsOpen[i][0] = true;
      updatedSearchQuery[i][0] = event.target.value;
      setIsOpen(updatedIsOpen);
      setSearchQuery(updatedSearchQuery);
    }
    else {
      updatedSearchQuery[i][0] = '';
      updatedSearchQuery[i][1] = '';
      updatedSearchQuery[i][2] = '';
      const updatedStep = [...step];
      updatedStep[i] = 1;
      setStep(updatedStep);
      setSearchQuery(updatedSearchQuery);
    }
  }

  const handleGroupInputChange = (event: React.ChangeEvent<HTMLInputElement>, i: number) => {
    const updatedIsOpen = [...isOpen];
    const updatedSearchQuery = [...searchQuery];
    if (event.target.value != '') {
      updatedIsOpen[i][1] = true;
      updatedSearchQuery[i][1] = event.target.value;
      setIsOpen(updatedIsOpen);
      setSearchQuery(updatedSearchQuery);
    }
    else {
      updatedSearchQuery[i][1] = '';
      updatedSearchQuery[i][2] = '';
      const updatedStep = [...step];
      updatedStep[i] = 2;
      setStep(updatedStep);
      setSearchQuery(updatedSearchQuery);
    }
  }

  const handleTypeInputChange = (event: React.ChangeEvent<HTMLInputElement>, i: number) => {
    const updatedIsOpen = [...isOpen];
    const updatedSearchQuery = [...searchQuery];
    if (event.target.value != '') {
      updatedIsOpen[i][2] = true;
      updatedSearchQuery[i][2] = event.target.value;
      setIsOpen(updatedIsOpen);
      setSearchQuery(updatedSearchQuery);
    }
    else {
      updatedSearchQuery[i][2] = '';
      const updatedStep = [...step];
      updatedStep[i] = 3;
      setStep(updatedStep);
      setSearchQuery(updatedSearchQuery);
    }
  }

  const handleOwnerSelected = (owner: string, i: number) => {
    const ownerNum = owner.match(/\d+/);
    const ownerNumber = parseInt(ownerNum![0]);
    const updatedRepairs = [...repairs];
    updatedRepairs[selectedOwner].group[selectedGroup].defectsRepaired[i][0] = ownerNumber-1;
    setRepairs(updatedRepairs);
    const updatedDefectGroupsOwner = [];
    for (let i = 0; i < defects[ownerNumber-1].numGroups; ++i) {
      updatedDefectGroupsOwner.push(`${t('DataSVL.Placeholders.groupDefect')} ${i+1}`); 
    }
    setDefectGroupsOwner(updatedDefectGroupsOwner);
    const updatedIsOpen = [...isOpen];
    const updatedSearchQuery = [...searchQuery];
    updatedIsOpen[i][0] = false;
    updatedSearchQuery[i][0] = owner;
    setSearchQuery(updatedSearchQuery);
    setIsOpen(updatedIsOpen);
    const updatedStep = [...step];
    updatedStep[i] = 2;
    setStep(updatedStep);
  }

  const handleGroupSelected = (group: string, i: number) => {
    const ownerNum = searchQuery[i][0].match(/\d+/);
    const ownerNumber = parseInt(ownerNum![0]);
    const groupNum = group.match(/\d+/);
    const groupNumber = parseInt(groupNum![0]);
    const updatedDefectGroupTypesOwner = [];
    updatedDefectGroupTypesOwner.push(t('DataSVL.Placeholders.allDefects')); 
    for (let i = 0; i < defects[ownerNumber-1].group[groupNumber-1].numTypes; ++i) {
      updatedDefectGroupTypesOwner.push(`${t('DataSVL.Placeholders.defect')} ${i+1}`); 
    }
    setDefectGroupTypesOwner(updatedDefectGroupTypesOwner);
    const updatedRepairs = [...repairs];
    updatedRepairs[selectedOwner].group[selectedGroup].defectsRepaired[i][1] = groupNumber-1;
    setRepairs(updatedRepairs);
    const updatedIsOpen = [...isOpen];
    const updatedSearchQuery = [...searchQuery];
    updatedIsOpen[i][1] = false;
    updatedSearchQuery[i][1] = group;
    setSearchQuery(updatedSearchQuery);
    setIsOpen(updatedIsOpen);
    const updatedStep = [...step];
    updatedStep[i] = 3;
    setStep(updatedStep);
  }

  const handleTypeSelected = (type: string, i: number) => {
    const updatedRepairs = [...repairs];
    if (type != t('DataSVL.Placeholders.allDefects')) {
      const typeNum = type.match(/\d+/);
      const typeNumber = parseInt(typeNum![0]);
      updatedRepairs[selectedOwner].group[selectedGroup].defectsRepaired[i][2] = typeNumber-1;
    }
    else updatedRepairs[selectedOwner].group[selectedGroup].defectsRepaired[i] = -2;
    setRepairs(updatedRepairs);
    const updatedIsOpen = [...isOpen];
    const updatedSearchQuery = [...searchQuery];
    updatedIsOpen[i][2] = false;
    updatedSearchQuery[i][2] = type;
    setSearchQuery(updatedSearchQuery);
    setIsOpen(updatedIsOpen);
    const updatedStep = [...step];
    updatedStep[i] = 4;
    setStep(updatedStep);
  }

  const handleSelected = (itemList: string, i: number, j: number) => {
    if (j == 0) handleOwnerSelected(itemList, i);
    else if (j == 1) handleGroupSelected(itemList, i);
    else handleTypeSelected(itemList, i);
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, i: number, j: number) => {
    if (j == 0) handleOwnerInputChange(e, i);
    else if (j == 1) handleGroupInputChange(e, i);
    else handleTypeInputChange(e, i);
  }

  const handleRemoveRepairedDefect = (defectRepairedIndex: number) => { 
    const updatedRepairs = [...repairs];
    const updatedSearchQuery = [...searchQuery];
    const updatedIsOpen = [...isOpen];
    const updatedStep = [...step];
    const numDefectsRepaired = updatedRepairs[selectedOwner].group[selectedGroup].numDefectsRepaired;
    if (numDefectsRepaired == 1) {
      updatedRepairs[selectedOwner].group[selectedGroup].defectsRepaired[defectRepairedIndex] = [-1, -1, -1];
      updatedSearchQuery[defectRepairedIndex] = ['', '', ''];
      updatedIsOpen[defectRepairedIndex] = [false, false, false];
      updatedStep[defectRepairedIndex] = 1;
    }
    else {
      for (let i = defectRepairedIndex; i < numDefectsRepaired-1; i++) {
        updatedRepairs[selectedOwner].group[selectedGroup].defectsRepaired[i] = updatedRepairs[selectedOwner].group[selectedGroup].defectsRepaired[i+1];
        updatedSearchQuery[i] = updatedSearchQuery[i+1];
        updatedIsOpen[i] = updatedIsOpen[i+1];
        updatedStep[i] = updatedStep[i+1];
      }
      updatedRepairs[selectedOwner].group[selectedGroup].defectsRepaired[numDefectsRepaired-1] = [-1, -1, -1];
      updatedSearchQuery[numDefectsRepaired-1] = ['', '', ''];
      updatedIsOpen[numDefectsRepaired-1] = [false, false, false];
      updatedStep[numDefectsRepaired-1] = 1;
    }
    updatedRepairs[selectedOwner].group[selectedGroup].numDefectsRepaired -= 1;  
    setRepairs(updatedRepairs);
    setSearchQuery(updatedSearchQuery);
    setIsOpen(updatedIsOpen);
    setStep(updatedStep);
  }

  const ref = DetectClickOutsideComponent(() => { 
    const updatedIsOpen = [...isOpen];
    for (let i = 0; i < DEFECTS_REPAIRED_SIZE; i++) {
      updatedIsOpen[i] = [false, false, false];
    }
    setIsOpen(updatedIsOpen);
  });

  const renderInputFieldAndList = (i: number, j: number, placeholder: string, list: string[]) => {

    return (
      <div>
        <input
          className={styles.inputField}
          placeholder={placeholder}
          value={searchQuery[i][j]}
          onChange={(e) => handleInputChange(e, i, j)}
        />
        {isOpen[i][j] && searchQuery[i][j] != '' &&
          <div ref={ref} className={styles.listWrapper}>
            <div className={styles.list}>
              {list.filter(itemList => itemList.toLowerCase().includes(searchQuery[i][j].toLowerCase())).map((itemList, index) => (
                <button
                  key={index}
                  className={styles.itemList}
                  onClick={() => handleSelected(itemList, i, j)}>
                  {itemList}
                </button>
              ))}
            </div>
          </div>
        }
      </div>
    );
  };

  return (
    <div className={styles.defectRepairedContainer}>
      <div className={styles.fieldLabel}>
        {fieldLabel}
      </div>   
      <div className={styles.strucutureContainer}>
        <div className={styles.manangeDefectRepairedsOrNot}>
          <button
            className={styles.button} 
            onClick={handleRepairDefect}>
            {commonStep == 0 ? t('DataSVL.Labels.add') : t('DataSVL.Labels.eraseAll')}
          </button>
          {commonStep >= 1 &&  
            <button
              className={styles.button} 
              onClick={handleNewRepairedDefect}>
              +
            </button>
          }
        </div>
        <div className={styles.selectedDefectRepairedContainer}>
          {Array.from({ length: repairs[selectedOwner].group[selectedGroup].numDefectsRepaired }).map((_, defectRepairedIndex) => (
            <div key={defectRepairedIndex} className={styles.selectedDefectRepaired} >
              {step[defectRepairedIndex] >= 1 && renderInputFieldAndList(defectRepairedIndex, 0, t('DataSVL.Placeholders.owner'), ownersWithDefects)}
              {step[defectRepairedIndex] >= 2 && renderInputFieldAndList(defectRepairedIndex, 1, t('DataSVL.Placeholders.groupDefect'), defectGroupsOwner)} 
              {step[defectRepairedIndex] >= 3 && renderInputFieldAndList(defectRepairedIndex, 2, t('DataSVL.Placeholders.defect'), defectGroupTypesOwner)}
              {step[defectRepairedIndex] >= 1 && 
                <button
                  className={styles.button} 
                  onClick={() => handleRemoveRepairedDefect(defectRepairedIndex)}>
                  -
                </button>
              }
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DefectsRepairedField;