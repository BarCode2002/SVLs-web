import styles from '../../../styles/components/dataSVL/fields/defectsRepairedField.module.css';
import { DEFECTS_REPAIRED_SIZE } from '../../../utils/constants';
import { DetectClickOutsideComponent } from '../../varied/detectClickOutsideComponent';
import { SetStateAction, useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';

type DefectsRepairedFieldProps = {
  fieldLabel: string;
  numPreviousOwners: number;
  selectedOwner: number;
  selectedGroup: number;
  repairs: any;
  setRepairs: React.Dispatch<SetStateAction<any>>;
  defects: any;
  prevOwnersDefects: any;
  editMode: boolean;
  jsonUploaded: boolean;
  totalOwners: number;
};

const DefectsRepairedField = ({ fieldLabel, numPreviousOwners, selectedOwner, selectedGroup, repairs, setRepairs, defects, prevOwnersDefects, editMode, jsonUploaded, totalOwners }: DefectsRepairedFieldProps): JSX.Element => {
  
  const { t } = useTranslation();

  const [step, setStep] = useState<number[]>(Array(DEFECTS_REPAIRED_SIZE).fill(1));
  const [isOpen, setIsOpen] = useState<boolean[][]>( Array.from({ length: DEFECTS_REPAIRED_SIZE }, () => [false, false, false]));
  const [searchQuery, setSearchQuery] = useState<string[][]>( Array.from({ length: DEFECTS_REPAIRED_SIZE }, () => ["", "", ""]));
  const [ownersWithDefects, setOwnersWithDefects] = useState<string[]>([]);
  const [defectGroupsOwner, setDefectGroupsOwner] = useState<string[]>([]);
  const [defectGroupTypesOwner, setDefectGroupTypesOwner] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const updatedOwnersWithDefects = [];
    for (let i = 0; i < selectedOwner+numPreviousOwners+1; i++) {
      if (i < numPreviousOwners) {
        if (prevOwnersDefects[i].defects.length > 0) updatedOwnersWithDefects.push(`${t('DataSVL.Placeholders.owner')} ${i+1}`); 
      }
      else {
        if (defects[i-numPreviousOwners].group.length > 0) updatedOwnersWithDefects.push(`${t('DataSVL.Placeholders.owner')} ${i+1}`); 
      }
    }
    setOwnersWithDefects(updatedOwnersWithDefects);
    if (repairs[selectedOwner].group[selectedGroup].numDefectsRepaired > 0) {
      const updatedSearchQuery = [...searchQuery];
      const updatedStep = [...step];
      for (let i = 0; i < DEFECTS_REPAIRED_SIZE; i++) {
        if (i < repairs[selectedOwner].group[selectedGroup].numDefectsRepaired) {
          if (repairs[selectedOwner].group[selectedGroup].defectsRepaired[i][0] != -1) {
            updatedSearchQuery[i][0] = `${t('DataSVL.Placeholders.owner')} ${repairs[selectedOwner].group[selectedGroup].defectsRepaired[i][0]+1}`;

            const updatedDefectGroupsOwner = [];
            if (repairs[selectedOwner].group[selectedGroup].defectsRepaired[i][0]+1-numPreviousOwners < numPreviousOwners) {
              const defectOwner = repairs[selectedOwner].group[selectedGroup].defectsRepaired[i][0];
              for (let i = 0; i < prevOwnersDefects[defectOwner].defects.length; ++i) {
                updatedDefectGroupsOwner.push(`${t('DataSVL.Placeholders.groupDefect')} ${i+1}`); 
              }
            }
            else {
              const defectOwner = repairs[selectedOwner].group[selectedGroup].defectsRepaired[i][0]-numPreviousOwners;
              if (defectOwner < totalOwners) {
                for (let i = 0; i < defects[defectOwner].group.length; ++i) {
                  updatedDefectGroupsOwner.push(`${t('DataSVL.Placeholders.groupDefect')} ${i+1}`); 
                }
              }
            }
            setDefectGroupsOwner(updatedDefectGroupsOwner);

            if (repairs[selectedOwner].group[selectedGroup].defectsRepaired[i][1] != -1) {
              updatedSearchQuery[i][1] = `${t('DataSVL.Placeholders.groupDefect')} ${repairs[selectedOwner].group[selectedGroup].defectsRepaired[i][1]+1}`;
              updatedStep[i] = 2;

              const updatedDefectGroupTypesOwner = [];
              const groupDefect = repairs[selectedOwner].group[selectedGroup].defectsRepaired[i][1];
              if (repairs[selectedOwner].group[selectedGroup].defectsRepaired[i][0]+1-numPreviousOwners < numPreviousOwners) {
                const defectOwner = repairs[selectedOwner].group[selectedGroup].defectsRepaired[i][0];
                for (let i = 0; i < prevOwnersDefects[defectOwner].defects[groupDefect].type.length; ++i) {
                  updatedDefectGroupTypesOwner.push(`${t('DataSVL.Placeholders.defect')} ${i+1}`); 
                }
              }
              else {
                const defectOwner = repairs[selectedOwner].group[selectedGroup].defectsRepaired[i][0]-numPreviousOwners;
                if (defectOwner < totalOwners) {
                  if (defects[defectOwner].length > 0) {
                    for (let i = 0; i < defects[defectOwner].group[groupDefect].type.length; ++i) {
                      updatedDefectGroupTypesOwner.push(`${t('DataSVL.Placeholders.defect')} ${i+1}`); 
                    }
                  }
                }
              }
              updatedDefectGroupTypesOwner.push(t('DataSVL.Placeholders.allDefects')); 
              setDefectGroupTypesOwner(updatedDefectGroupTypesOwner);
              
              if (repairs[selectedOwner].group[selectedGroup].defectsRepaired[i][2] == -2) {
                updatedSearchQuery[i][2] = `${t('DataSVL.Placeholders.allDefects')}`;
                updatedStep[i] = 3;
              }
              else if (repairs[selectedOwner].group[selectedGroup].defectsRepaired[i][2] == -1) {
                updatedSearchQuery[i][2] = '';
                updatedStep[i] = 2;
              }
              else {
                updatedSearchQuery[i][2] = `${t('DataSVL.Placeholders.defect')} ${repairs[selectedOwner].group[selectedGroup].defectsRepaired[i][2]+1}`;
                updatedStep[i] = 3;
              }
            }
            else {
              updatedSearchQuery[i][1] = '';
              updatedSearchQuery[i][2] = '';
              updatedStep[i] = 1;
            }
          }
          else {
            updatedSearchQuery[i] = ['', '', ''];
            updatedStep[i] = 1;
          }
        }
        else {
          updatedSearchQuery[i] = ['', '', ''];
          updatedStep[i] = 1;
        }
      }
      setStep(updatedStep);
      setSearchQuery(updatedSearchQuery);
    }
    else { 
      const updatedSearchQuery = [...searchQuery];
      const updatedStep = [...step];
      for (let i = 0; i < DEFECTS_REPAIRED_SIZE-1; i++) {
        updatedSearchQuery[i] = ['', '', ''];
        updatedStep[i] = 1;
      }
      setSearchQuery(updatedSearchQuery);
      setStep(updatedStep);
    }
    setReady(true);
  }, [selectedOwner, jsonUploaded]);

  const handleRepairDefect = () => { 
    const updatedRepairs = [...repairs];
    if (repairs[selectedOwner].group[selectedGroup].numDefectsRepaired == 0) {
      updatedRepairs[selectedOwner].group[selectedGroup].numDefectsRepaired = 1;
    }
    else {
      for (let i = 0; i < updatedRepairs[selectedOwner].group[selectedGroup].numDefectsRepaired; i++) {
        updatedRepairs[selectedOwner].group[selectedGroup].defectsRepaired[i] = [-1, -1, -1];
      }
      updatedRepairs[selectedOwner].group[selectedGroup].numDefectsRepaired = 0;
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
      updatedSearchQuery[i][1] = '';
      updatedSearchQuery[i][2] = '';
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
      updatedSearchQuery[i][2] = '';
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
    if (ownerNumber-numPreviousOwners < numPreviousOwners) {
      for (let i = 0; i < prevOwnersDefects[ownerNumber-1].defects.length; ++i) {
        updatedDefectGroupsOwner.push(`${t('DataSVL.Placeholders.groupDefect')} ${i+1}`); 
      }
    }
    else {
      for (let i = 0; i < defects[ownerNumber-numPreviousOwners-1].group.length; ++i) {
        updatedDefectGroupsOwner.push(`${t('DataSVL.Placeholders.groupDefect')} ${i+1}`); 
      }
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
    if (ownerNumber-numPreviousOwners < numPreviousOwners) {
      for (let i = 0; i < prevOwnersDefects[ownerNumber-1].defects[groupNumber-1].type.length; ++i) {
        updatedDefectGroupTypesOwner.push(`${t('DataSVL.Placeholders.defect')} ${i+1}`); 
      }
    }
    else {
      for (let i = 0; i < defects[ownerNumber-numPreviousOwners-1].group[groupNumber-1].type.length; ++i) {
        updatedDefectGroupTypesOwner.push(`${t('DataSVL.Placeholders.defect')} ${i+1}`); 
      }
    }
    updatedDefectGroupTypesOwner.push(t('DataSVL.Placeholders.allDefects')); 
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
    else updatedRepairs[selectedOwner].group[selectedGroup].defectsRepaired[i][2] = -2;
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
          key={`${i}${j}`}
          className={styles.inputField}
          placeholder={placeholder}
          value={searchQuery[i][j]}
          onChange={(e) => handleInputChange(e, i, j)}
          disabled={!editMode}
        />
        {isOpen[i][j] && searchQuery[i][j] != '' &&
          <div ref={ref} className={styles.listWrapper}>
            <div className={styles.list}>
              {list.filter(itemList => itemList.toLowerCase().includes(searchQuery[i][j].toLowerCase())).map((itemList, index) => (
                <button
                  key={`${i}${j}${index}`}
                  className={styles.itemList}
                  onClick={() => handleSelected(itemList, i, j)}
                  disabled={!editMode}>
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
    <div>
      {ready &&
        <div className={styles.defectRepairedContainer}>
          <div className={styles.fieldLabel}>
            {fieldLabel}
          </div>   
          <div className={styles.strucutureContainer}>
            <div className={styles.manangeDefectRepairedsOrNot}>
              <button
                className={styles.button} 
                onClick={handleRepairDefect}
                disabled={!editMode}>
                {repairs[selectedOwner].group[selectedGroup].numDefectsRepaired == 0 ? t('DataSVL.Labels.add') : t('DataSVL.Labels.eraseAll')}
              </button>
              {repairs[selectedOwner].group[selectedGroup].numDefectsRepaired >= 1 &&  
                <button
                  className={styles.button} 
                  onClick={handleNewRepairedDefect}
                  disabled={!editMode || repairs[selectedOwner].group[selectedGroup].numDefectsRepaired == DEFECTS_REPAIRED_SIZE}>
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
                      onClick={() => handleRemoveRepairedDefect(defectRepairedIndex)}
                      disabled={!editMode}>
                      -
                    </button>
                  }
                </div>
              ))}
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default DefectsRepairedField;