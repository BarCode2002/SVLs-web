import { SetStateAction, useRef } from 'react';
import styles from '../../styles/components/bottomNavBar/bottomNavBar.module.css';
import ChooseDataSVLButtons from './chooseDataSVLButtons.tsx';
import AddOwnerButton from './addOwnerButton.tsx';
import OwnerButton from './ownerButton.tsx';
import { PossibleGeneralInformationJsonVersions, PossibleMaintenancesJsonVersions, PossibleModificationsJsonVersions, PossibleDefectsJsonVersions, PossibleRepairsJsonVersions } from '../../utils/commonTypes.ts';

type BottomNavBarProps = {
  selectedSVLData: number;
  setSelectedSVLData: React.Dispatch<SetStateAction<number>>;
  selectedOwner: number;
  setSelectedOwner: React.Dispatch<SetStateAction<number>>;
  numPreviousOwners: number;
  setGeneralInformation: React.Dispatch<SetStateAction<PossibleGeneralInformationJsonVersions[]>>;
  setMaintenances: React.Dispatch<SetStateAction<PossibleMaintenancesJsonVersions[]>>;
  setModifications: React.Dispatch<SetStateAction<PossibleModificationsJsonVersions[]>>;
  setDefects: React.Dispatch<SetStateAction<PossibleDefectsJsonVersions[]>>;
  setRepairs: React.Dispatch<SetStateAction<PossibleRepairsJsonVersions[]>>;
  totalOwners: number;
  setTotalOwners: React.Dispatch<SetStateAction<number>>;
  editMode: boolean;
  viewType: number;
  prevOwnersGeneralInformation: PossibleGeneralInformationJsonVersions[];
  mySVL: boolean;
  jsonVersion: string[];
  setJsonVersion: React.Dispatch<SetStateAction<string[]>>;
};

const BottomNavBar = ({ selectedSVLData, setSelectedSVLData, selectedOwner, setSelectedOwner, numPreviousOwners, setGeneralInformation, setMaintenances, setModifications, setDefects, setRepairs,  totalOwners, setTotalOwners, editMode, viewType, prevOwnersGeneralInformation, mySVL, jsonVersion, setJsonVersion }: BottomNavBarProps): JSX.Element => {

  const ownersContainerRef = useRef(null);

  const ownerSelector = Array.from({length: totalOwners}, (_, index) => (
    <div key={index}>
      <OwnerButton index={index} ownersContainerRef={ownersContainerRef.current} 
        setGeneralInformation={setGeneralInformation} setMaintenances={setMaintenances}
        setModifications={setModifications} setDefects={setDefects} setRepairs={setRepairs} 
        selectedOwner={selectedOwner} setSelectedOwner={setSelectedOwner} numPreviousOwners={numPreviousOwners}
        totalOwners={totalOwners} setTotalOwners={setTotalOwners} editMode={editMode} mySVL={mySVL}
      />
    </div>
  ));

  return (
    <div className={styles.bottomNavBarContainer}>
      <div className={styles.topPart}>
        <ChooseDataSVLButtons selectedSVLData={selectedSVLData} setSelectedSVLData={setSelectedSVLData} />
      </div>
      {viewType == 0 &&
        <div>
          <div className={styles.separator}></div>
          <div className={styles.bottomPart}>
            <div ref={ownersContainerRef} className={styles.ownersContainer}>
              {ownerSelector}
            </div>
            {mySVL &&
              <div className={styles.addOwnerButton}>
                <AddOwnerButton setGeneralInformation={setGeneralInformation} setMaintenances={setMaintenances}
                  setModifications={setModifications} setDefects={setDefects} setRepairs={setRepairs}
                  setSelectedOwner={setSelectedOwner} totalOwners={totalOwners} setTotalOwners={setTotalOwners} 
                  numPreviousOwners={numPreviousOwners} editMode={editMode} prevOwnersGeneralInformation={prevOwnersGeneralInformation}
                  jsonVersion={jsonVersion} selectedJsonVersion={jsonVersion[selectedOwner]} setJsonVersion={setJsonVersion}
                />
              </div>
            }
          </div>
        </div>
      }
    </div>
  );
}

export default BottomNavBar;