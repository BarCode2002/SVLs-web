import styles from '../../../styles/components/dataSVL/fields/defectsRepairedField.module.css';
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

  const [step, setStep] = useState(0);
  const [isOpen, setIsOpen] = useState<boolean[]>([false, false, false]);
  const [searchQuery, setSearchQuery] = useState<string[]>(["", "", ""]);
  const [ownersWithDefects, setOwnersWithDefects] = useState<string[]>([]);
  const [defectGroupsOwner, setDefectGroupsOwner] = useState<string[]>([]);
  const [defectGroupTypesOwner, setDefectGroupTypesOwner] = useState<string[]>([]);

  useEffect(() => {
    const updatedOwnersWithDefects = [];
    for (let i = 0; i < totalOwners; i++) {
      if (i < selectedOwner && defects[i].numGroups > 0) updatedOwnersWithDefects.push(`Owner ${i+1}`); 
    }
    setOwnersWithDefects(updatedOwnersWithDefects);
  }, [selectedOwner]);

  const handleRepairDefect = async () => { 
    const updatedDataSVL = [...repairs];
    if (updatedDataSVL[selectedOwner].group[selectedGroup].defectsRepaired[0][0] == false) {
      updatedDataSVL[selectedOwner].group[selectedGroup].defectsRepaired[0][0] = true;
      updatedDataSVL[selectedOwner].group[selectedGroup].numDefectsRepaired = 1;
      setStep(1);
    }
    else {
      for (let i = 0; i < updatedDataSVL[selectedOwner].group[selectedGroup].numDefectsRepaired; i++) {
        updatedDataSVL[selectedOwner].group[selectedGroup].defectsRepaired[i] = [false, -1, -1, -1];
      }
      updatedDataSVL[selectedOwner].group[selectedGroup].numDefectsRepaired = 0;
      setStep(0);
      setSearchQuery(['', '', '']);
    }
    setRepairs(updatedDataSVL);
  };

  const handleNewRepairedDefect = async () => { 
    const updatedDataSVL = [...repairs];
    updatedDataSVL[selectedOwner].group[selectedGroup].numDefectsRepaired += 1;  
    setRepairs(updatedDataSVL);
  }

  const handleOwnerInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedIsOpen = [...isOpen];
    const updatedSearchQuery = [...searchQuery];
    if (event.target.value != '') {
      updatedIsOpen[0] = true;
      updatedSearchQuery[0] = event.target.value;
      setIsOpen(updatedIsOpen);
      setSearchQuery(updatedSearchQuery);
    }
    else {
      updatedSearchQuery[0] = '';
      updatedSearchQuery[1] = '';
      updatedSearchQuery[2] = '';
      setStep(1);
      setSearchQuery(updatedSearchQuery);
    }
  }

  const handleGroupInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedIsOpen = [...isOpen];
    const updatedSearchQuery = [...searchQuery];
    if (event.target.value != '') {
      updatedIsOpen[1] = true;
      updatedSearchQuery[1] = event.target.value;
      setIsOpen(updatedIsOpen);
      setSearchQuery(updatedSearchQuery);
    }
    else {
      updatedSearchQuery[1] = '';
      updatedSearchQuery[2] = '';
      setStep(2);
      setSearchQuery(updatedSearchQuery);
    }
  }

  const handleTypeInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedIsOpen = [...isOpen];
    const updatedSearchQuery = [...searchQuery];
    if (event.target.value != '') {
      updatedIsOpen[2] = true;
      updatedSearchQuery[2] = event.target.value;
      setIsOpen(updatedIsOpen);
      setSearchQuery(updatedSearchQuery);
    }
    else {
      updatedSearchQuery[2] = '';
      setStep(3);
      setSearchQuery(updatedSearchQuery);
    }
  }

  const handleOwnerSelected = (owner: string) => {
    const ownerNum = owner.match(/\d+/);
    const ownerNumber = parseInt(ownerNum![0]);
    const updatedDefectGroupsOwner = [];
    for (let i = 0; i < defects[ownerNumber-1].numGroups; ++i) {
      updatedDefectGroupsOwner.push(`Group ${i+1}`); 
    }
    setDefectGroupsOwner(updatedDefectGroupsOwner);
    const updatedIsOpen = [...isOpen];
    const updatedSearchQuery = [...searchQuery];
    updatedIsOpen[0] = false;
    updatedSearchQuery[0] = owner;
    setSearchQuery(updatedSearchQuery);
    setIsOpen(updatedIsOpen);
    setStep(2);
  }

  const handleGroupSelected = (group: string) => {
    const ownerNum = searchQuery[0].match(/\d+/);
    const ownerNumber = parseInt(ownerNum![0]);
    const groupNum = group.match(/\d+/);
    const groupNumber = parseInt(groupNum![0]);
    const updatedDefectGroupTypesOwner = [];
    updatedDefectGroupTypesOwner.push('All types'); 
    for (let i = 0; i < defects[ownerNumber-1].group[groupNumber-1].numTypes; ++i) {
      updatedDefectGroupTypesOwner.push(`Type ${i+1}`); 
    }
    setDefectGroupTypesOwner(updatedDefectGroupTypesOwner);
    const updatedIsOpen = [...isOpen];
    const updatedSearchQuery = [...searchQuery];
    updatedIsOpen[1] = false;
    updatedSearchQuery[1] = group;
    setSearchQuery(updatedSearchQuery);
    setIsOpen(updatedIsOpen);
    setStep(3);
  }

  const handleTypeSelected = (type: string) => {
    const ownerNum = searchQuery[0].match(/\d+/);
    const ownerNumber = parseInt(ownerNum![0]);
    const groupNum = searchQuery[1].match(/\d+/);
    const groupNumber = parseInt(groupNum![0]);
    const typeNum = type.match(/\d+/);
    const typeNumber = parseInt(typeNum![0]);

    const updatedRepairs = [...repairs];
    //const numDefectsRepaired = repairs[selectedOwner].group[selectedGroup].numDefectsRepaired;
    updatedRepairs[selectedOwner].group[selectedGroup].defectsRepaired[0] = [true, ownerNumber-1, groupNumber-1, typeNumber-1]
    const updatedIsOpen = [...isOpen];

    const updatedSearchQuery = [...searchQuery];
    updatedIsOpen[2] = false;
    updatedSearchQuery[2] = type;
    setSearchQuery(updatedSearchQuery);
    setIsOpen(updatedIsOpen);
    setStep(4);
  }
  
  return (
    <div className={styles.defectRepairedContainer}>
      <div className={styles.fieldLabel}>
        {fieldLabel}
      </div>   
      <div className={styles.dataContainer}>
        <button
          className={styles.addDefectsRepairedButton} 
          onClick={handleRepairDefect}>
          {step == 0 ? "Add" : "Erase all"}
        </button>
        {step >= 1 &&
          <div>
            <button
              className={styles.newDefectRepairedButton} 
              onClick={handleNewRepairedDefect}>
              +
            </button>
            <div className={styles.infoDefectRepairedContainer}>
              <input
                className={styles.inputField}
                placeholder={'Owner'}
                value={searchQuery[0]}
                onChange={handleOwnerInputChange}
              />
              {isOpen[0] && searchQuery[0] != '' &&
                <div className={styles.ownersDefectsListWrapper}>
                  <div className={styles.ownersDefectsList}>
                    {ownersWithDefects.filter(ownerDefect => ownerDefect.toLowerCase().includes(searchQuery[0].toLowerCase())).map((ownerDefect, index) => (
                      <button
                        key={index}
                        className={styles.ownerDefect}
                        onClick={() => handleOwnerSelected(ownerDefect)}>
                        {ownerDefect}
                      </button>
                    ))}
                  </div>
                </div>
              }
            </div>
          </div>
        }
        {step >= 2 &&
          <div>
            <div className={styles.infoDefectRepairedContainer}>
              <input
                className={styles.inputField}
                placeholder={'Group'}
                value={searchQuery[1]}
                onChange={handleGroupInputChange}
              />
              {isOpen[1] && searchQuery[1] != '' &&
                <div className={styles.ownersDefectsListWrapper}>
                  <div className={styles.ownersDefectsList}>
                    {defectGroupsOwner.filter(groupDefect => groupDefect.toLowerCase().includes(searchQuery[1].toLowerCase())).map((groupDefect, index) => (
                      <button
                        key={index}
                        className={styles.ownerDefect}
                        onClick={() => handleGroupSelected(groupDefect)}>
                        {groupDefect}
                      </button>
                    ))}
                  </div>
                </div>
              }
            </div>
          </div>
        }
        {step >= 3 &&
          <div>
            <div className={styles.infoDefectRepairedContainer}>
              <input
                className={styles.inputField}
                placeholder={'Type'}
                value={searchQuery[2]}
                onChange={handleTypeInputChange}
              />
              {isOpen[2] && searchQuery[2] != '' &&
                <div className={styles.ownersDefectsListWrapper}>
                  <div className={styles.ownersDefectsList}>
                    {defectGroupTypesOwner.filter(typeDefect => typeDefect.toLowerCase().includes(searchQuery[2].toLowerCase())).map((typeDefect, index) => (
                      <button
                        key={index}
                        className={styles.ownerDefect}
                        onClick={() => handleTypeSelected(typeDefect)}>
                        {typeDefect}
                      </button>
                    ))}
                  </div>
                </div>
              }
            </div>
          </div>
        }
      </div>
    </div>
  );
};

export default DefectsRepairedField;