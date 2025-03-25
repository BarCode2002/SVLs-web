import { SetStateAction, useEffect, useState } from 'react';
import styles from '../../styles/components/dataSVL/dataSVL.module.css';
import GeneralInformationSVL from './generalInformationSVL.tsx';
import PrevOwnersGeneralInformationSVL from './prevOwnersGeneralInformationSVL.tsx';
import MaintenancesSVL from './maintenancesSVL.tsx';
import PrevOwnersMaintenancesSVL from './prevOwnersMaintenancesSVL.tsx';
import ModificationsSVL from './modificationsSVL.tsx';
import PrevOwnersModificationsSVL from './prevOwnersModificationsSVL.tsx';
import DefectsSVL from './defectsSVL.tsx';
import PrevOwnersDefectsSVL from './prevOwnersDefectsSVL.tsx';
import RepairsSVL from './repairsSVL.tsx';
import PrevOwnersRepairsSVL from './prevOwnersRepairsSVL.tsx';
import SummaryViewGeneralInformation from './summaryViewGeneralInformation.tsx';
import SummaryViewMaintenances from './summaryViewMaintenances.tsx';
import SummaryViewModifications from './summaryViewModifications.tsx';
import SummaryViewDefects from './summaryViewDefects.tsx';
import SummaryViewRepairs from './summaryViewRepairs.tsx';
import { EnterFullScreenIcon, ExitFullScreenIcon } from '../../assets/fullScreen.tsx';
import ChangeJsonVersion from './buttons/changeJsonVersion.tsx';
import { PossibleDefectsJsonVersions, PossibleGeneralInformationJsonVersions, PossibleMaintenancesJsonVersions, PossibleModificationsJsonVersions, PossibleRepairsJsonVersions } from '../../utils/commonTypes.ts';

type ShrinkedType = {
  group: boolean;
  type: boolean[];
};

type MainShrinkedType = ShrinkedType[];

type DataSVLProps = {
  selectedOwner: number;
  selectedSVLData: number;
  generalInformation: PossibleGeneralInformationJsonVersions[];
  setGeneralInformation: React.Dispatch<SetStateAction<PossibleGeneralInformationJsonVersions[]>>;
  prevOwnersGeneralInformation: PossibleGeneralInformationJsonVersions[];
  maintenances: PossibleMaintenancesJsonVersions[];
  setMaintenances: React.Dispatch<SetStateAction<PossibleMaintenancesJsonVersions[]>>;
  prevOwnersMaintenances: PossibleMaintenancesJsonVersions[];
  modifications: PossibleModificationsJsonVersions[];
  setModifications: React.Dispatch<SetStateAction<PossibleModificationsJsonVersions[]>>;
  prevOwnersModifications: PossibleModificationsJsonVersions[];
  defects: PossibleDefectsJsonVersions[];
  setDefects: React.Dispatch<SetStateAction<PossibleDefectsJsonVersions[]>>;
  prevOwnersDefects: PossibleDefectsJsonVersions[];
  repairs: PossibleRepairsJsonVersions[];
  setRepairs: React.Dispatch<SetStateAction<PossibleRepairsJsonVersions[]>>;
  prevOwnersRepairs: PossibleRepairsJsonVersions[];
  totalOwners: number;
  editMode: boolean;
  numPreviousOwners: number;
  mySVL: boolean;
  viewType: number;
  jsonUploaded: boolean;
  fullScreen: number;
  setFullScreen: React.Dispatch<SetStateAction<number>>;
  jsonVersion: string[];
  setJsonVersion: React.Dispatch<SetStateAction<string[]>>;
};

const DataSVL = ({ selectedOwner, selectedSVLData, generalInformation, setGeneralInformation, prevOwnersGeneralInformation, maintenances, setMaintenances, prevOwnersMaintenances, modifications, setModifications, prevOwnersModifications, defects, setDefects, prevOwnersDefects, repairs, setRepairs, prevOwnersRepairs, totalOwners, editMode, numPreviousOwners, mySVL, viewType, jsonUploaded, fullScreen, setFullScreen, jsonVersion, setJsonVersion }: DataSVLProps): JSX.Element => {

  const [prevMaintenancesShrinked, setPrevMaintenancesShrinked] = useState<MainShrinkedType[]>([]);
  const [prevModificationsShrinked, setPrevModificationsShrinked] = useState<MainShrinkedType[]>([]);
  const [prevDefectsShrinked, setPrevDefectsShrinked] = useState<MainShrinkedType[]>([]);
  const [prevRepairsShrinked, setPrevRepairsShrinked] = useState<MainShrinkedType[]>([]);
  const [shrinkedReady, setShrinkedReady] = useState(false);
  const [weird, setWeird] = useState(0);

  useEffect(() => {
    const numGroupsMaintenances: any[] = [];
    const numTypesMaintenances: any[] = [];
    const numGroupsModifications: any[] = [];
    const numTypesModifications: any[] = [];
    const numGroupsDefects: any[] = [];
    const numTypesDefects: any[] = [];
    const numGroupsRepairs: any[] = [];
    const numTypesRepairs: any[] = [];
    let limit;
    if (mySVL == true) limit = numPreviousOwners;
    else limit = totalOwners;
    for (let i = 0; i < limit; i++) {
      const numTypesMain: number[] = [];
      for (let j = 0; j < prevOwnersMaintenances[i].group.length; j++) {
        numTypesMain.push(prevOwnersMaintenances[i].group[j].type.length);
      }
      numGroupsMaintenances.push(prevOwnersMaintenances[i].group.length);
      numTypesMaintenances.push(numTypesMain);

      const numTypesMod: number[] = [];
      for (let j = 0; j < prevOwnersModifications[i].group.length; j++) {
        numTypesMod.push(prevOwnersModifications[i].group[j].type.length);
      }  
      numGroupsModifications.push(prevOwnersModifications[i].group.length);
      numTypesModifications.push(numTypesMod);

      const numTypesDef: number[] = [];
      for (let j = 0; j < prevOwnersDefects[i].group.length; j++) {
        numTypesDef.push(prevOwnersDefects[i].group[j].type.length);
      }  
      numGroupsDefects.push(prevOwnersDefects[i].group.length);
      numTypesDefects.push(numTypesDef);

      const numTypesRep: number[] = [];
      for (let j = 0; j < prevOwnersRepairs[i].group.length; j++) {
        numTypesRep.push(prevOwnersRepairs[i].group[j].type.length);
      }  
      numGroupsRepairs.push(prevOwnersRepairs[i].group.length);
      numTypesRepairs.push(numTypesRep);
    }
    const updatedShrinkedMaintenances: MainShrinkedType[] = Array.from({ length: limit }, (_, groupIndex) =>
      Array.from({ length: numGroupsMaintenances[groupIndex] }, (_, typeIndex) => ({
        group: false,
        type: Array(numTypesMaintenances[groupIndex][typeIndex]).fill(false),
      }))
    );
    setPrevMaintenancesShrinked(updatedShrinkedMaintenances);

    const updatedShrinkedModifications: MainShrinkedType[] = Array.from({ length: limit }, (_, groupIndex) =>
      Array.from({ length: numGroupsModifications[groupIndex] }, (_, typeIndex) => ({
        group: false,
        type: Array(numTypesModifications[groupIndex][typeIndex]).fill(false),
      }))
    );
    setPrevModificationsShrinked(updatedShrinkedModifications);

    const updatedShrinkedDefectss: MainShrinkedType[] = Array.from({ length: limit }, (_, groupIndex) =>
      Array.from({ length: numGroupsDefects[groupIndex] }, (_, typeIndex) => ({
        group: false,
        type: Array(numTypesDefects[groupIndex][typeIndex]).fill(false),
      }))
    );
    setPrevDefectsShrinked(updatedShrinkedDefectss);

    const updatedShrinkedRepairs: MainShrinkedType[] = Array.from({ length: limit }, (_, groupIndex) =>
      Array.from({ length: numGroupsRepairs[groupIndex] }, (_, typeIndex) => ({
        group: false,
        type: Array(numTypesRepairs[groupIndex][typeIndex]).fill(false),
      }))
    );
    setPrevRepairsShrinked(updatedShrinkedRepairs);
    if (!mySVL) setWeird(totalOwners);
    else setWeird(numPreviousOwners);
    setShrinkedReady(true);
  }, []);

  const toggleFullScreen = () => {
    if (fullScreen == 0) {
      setFullScreen(1);
      localStorage.setItem('fullScreen', '1')
    }
    else {
      setFullScreen(0);
      localStorage.setItem('fullScreen', '0')
    }
  }

  return (
    <div className={styles.dataSVLContainer}>
      <button 
        className={styles.fullScreenIcon}
        onClick={toggleFullScreen}>
        {fullScreen == 0 ? <EnterFullScreenIcon /> : <ExitFullScreenIcon />}
      </button>
      {viewType == 0 && selectedOwner >= weird &&
        <div className={styles.changeJsonVersion}>
          <ChangeJsonVersion selectedOwner={selectedOwner} jsonVersion={jsonVersion} setJsonVersion={setJsonVersion} />
        </div>
      }
      {viewType == 0 ? (
        <div>
          {selectedSVLData == 0 && selectedOwner < weird &&
            <PrevOwnersGeneralInformationSVL selectedOwner={selectedOwner} prevOwnersGeneralInformation={prevOwnersGeneralInformation} />
          }
          {selectedSVLData == 0 && selectedOwner >= weird &&
            <GeneralInformationSVL selectedOwner={selectedOwner-numPreviousOwners} generalInformation={generalInformation} setGeneralInformation={setGeneralInformation} editMode={editMode} jsonUploaded={jsonUploaded} />
          }
          {shrinkedReady && selectedSVLData == 1 && selectedOwner < weird &&
            <PrevOwnersMaintenancesSVL selectedOwner={selectedOwner} shrinked={prevMaintenancesShrinked} setShrinked={setPrevMaintenancesShrinked} prevOwnersMaintenances={prevOwnersMaintenances} />
          }
          {selectedSVLData == 1 && selectedOwner >= weird &&
            <MaintenancesSVL selectedOwner={selectedOwner-numPreviousOwners} maintenances={maintenances} setMaintenances={setMaintenances} editMode={editMode} jsonUploaded={jsonUploaded} jsonVersion={jsonVersion} />
          }
          {shrinkedReady && selectedSVLData == 2 && selectedOwner < weird &&
            <PrevOwnersModificationsSVL selectedOwner={selectedOwner} shrinked={prevModificationsShrinked} setShrinked={setPrevModificationsShrinked} prevOwnersModifications={prevOwnersModifications} />
          }
          {selectedSVLData == 2 && selectedOwner >= weird &&
            <ModificationsSVL selectedOwner={selectedOwner-numPreviousOwners} modifications={modifications} setModifications={setModifications} editMode={editMode} jsonUploaded={jsonUploaded} jsonVersion={jsonVersion} />
          }
          {shrinkedReady && selectedSVLData == 3 && selectedOwner < weird &&
            <PrevOwnersDefectsSVL selectedOwner={selectedOwner} numPreviousOwners={numPreviousOwners} totalOwners={totalOwners} shrinked={prevDefectsShrinked} setShrinked={setPrevDefectsShrinked}  prevOwnersDefects={prevOwnersDefects} prevOwnersRepairs={prevOwnersRepairs} repairs={repairs} mySVL={mySVL} />
          }
          {selectedSVLData == 3 && selectedOwner >= weird &&
            <DefectsSVL selectedOwner={selectedOwner-numPreviousOwners} totalOwners={totalOwners} numPreviousOwners={numPreviousOwners} defects={defects} setDefects={setDefects} repairs={repairs} editMode={editMode} mySVL={mySVL} jsonUploaded={jsonUploaded} jsonVersion={jsonVersion} />
          }
          {shrinkedReady && selectedSVLData == 4 && selectedOwner < weird &&
            <PrevOwnersRepairsSVL selectedOwner={selectedOwner} shrinked={prevRepairsShrinked} setShrinked={setPrevRepairsShrinked}  prevOwnersRepairs={prevOwnersRepairs} />
          }
          {selectedSVLData == 4 && selectedOwner >= weird &&
            <RepairsSVL selectedOwner={selectedOwner-numPreviousOwners} numPreviousOwners={numPreviousOwners} repairs={repairs} setRepairs={setRepairs} defects={defects} prevOwnersDefects={prevOwnersDefects} editMode={editMode} jsonUploaded={jsonUploaded} totalOwners={totalOwners} jsonVersion={jsonVersion} />
          }
        </div>
      ) : (
        <div>
          {selectedSVLData == 0 && <SummaryViewGeneralInformation prevOwnersGeneralInformation={prevOwnersGeneralInformation} generalInformation={generalInformation} numPreviousOwners={numPreviousOwners} totalOwners={totalOwners} mySVL={mySVL} />}
          {selectedSVLData == 1 && <SummaryViewMaintenances prevOwnersMaintenances={prevOwnersMaintenances} maintenances={maintenances} setMaintenances={setMaintenances} shrinked={prevMaintenancesShrinked} setShrinked={setPrevMaintenancesShrinked} numPreviousOwners={numPreviousOwners} totalOwners={totalOwners} mySVL={mySVL} />}
          {selectedSVLData == 2 && <SummaryViewModifications prevOwnersModifications={prevOwnersModifications} modifications={modifications} setModifications={setModifications} shrinked={prevModificationsShrinked} setShrinked={setPrevModificationsShrinked} numPreviousOwners={numPreviousOwners} totalOwners={totalOwners} mySVL={mySVL} />}
          {selectedSVLData == 3 && <SummaryViewDefects prevOwnersDefects={prevOwnersDefects} defects={defects} repairs={repairs} prevOwnersRepairs={prevOwnersRepairs} setDefects={setDefects} shrinked={prevDefectsShrinked} setShrinked={setPrevDefectsShrinked} numPreviousOwners={numPreviousOwners} totalOwners={totalOwners} mySVL={mySVL} />}
          {selectedSVLData == 4 && <SummaryViewRepairs prevOwnersRepairs={prevOwnersRepairs} repairs={repairs} setRepairs={setRepairs} shrinked={prevRepairsShrinked} setShrinked={setPrevRepairsShrinked} numPreviousOwners={numPreviousOwners} totalOwners={totalOwners} mySVL={mySVL} />}
        </div>
      )}
    </div>
  );
}

export default DataSVL;