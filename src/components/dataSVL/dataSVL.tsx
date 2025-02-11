import { SetStateAction } from 'react';
import styles from '../../styles/components/dataSVL/dataSVL.module.css';
import { GeneralInformation, Maintenances, Modifications, Defects, Repairs } from '../../utils/interfaces.ts';
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

type DataSVLProps = {
  selectedOwner: number;
  selectedSVLData: number;
  generalInformation: GeneralInformation[];
  setGeneralInformation: React.Dispatch<SetStateAction<GeneralInformation[]>>;
  prevOwnersGeneralInformation: any;
  maintenances: Maintenances[];
  setMaintenances: React.Dispatch<SetStateAction<Maintenances[]>>;
  prevOwnersMaintenances: any;
  modifications: Modifications[];
  setModifications: React.Dispatch<SetStateAction<Modifications[]>>;
  prevOwnersModifications: any;
  defects: Defects[];
  setDefects: React.Dispatch<SetStateAction<Defects[]>>;
  prevOwnersDefects: any;
  repairs: Repairs[];
  setRepairs: React.Dispatch<SetStateAction<Repairs[]>>;
  prevOwnersRepairs: any;
  totalOwners: number;
  editMode: boolean;
  numPreviousOwners: number;
};

const DataSVL = ({ selectedOwner, selectedSVLData, generalInformation, setGeneralInformation, prevOwnersGeneralInformation, maintenances, setMaintenances, prevOwnersMaintenances, modifications, setModifications, prevOwnersModifications, defects, setDefects, prevOwnersDefects, repairs, setRepairs, prevOwnersRepairs, totalOwners, editMode, numPreviousOwners }: DataSVLProps): JSX.Element => {

  return (
    <div className={styles.dataSVLContainer}>
      {selectedSVLData == 0 && selectedOwner < numPreviousOwners &&
        <PrevOwnersGeneralInformationSVL selectedOwner={selectedOwner} prevOwnersGeneralInformation={prevOwnersGeneralInformation} />
      }
      {selectedSVLData == 0 && selectedOwner >= numPreviousOwners &&
        <GeneralInformationSVL selectedOwner={selectedOwner-numPreviousOwners} generalInformation={generalInformation} setGeneralInformation={setGeneralInformation} editMode={editMode} />
      }
      {selectedSVLData == 1 && selectedOwner < numPreviousOwners &&
        <PrevOwnersMaintenancesSVL selectedOwner={selectedOwner} prevOwnersMaintenances={prevOwnersMaintenances} />
      }
      {selectedSVLData == 1 && selectedOwner >= numPreviousOwners &&
        <MaintenancesSVL selectedOwner={selectedOwner-numPreviousOwners} maintenances={maintenances} setMaintenances={setMaintenances} editMode={editMode} />
      }
      {selectedSVLData == 2 && selectedOwner < numPreviousOwners &&
        <PrevOwnersModificationsSVL selectedOwner={selectedOwner} prevOwnersModifications={prevOwnersModifications} />
      }
      {selectedSVLData == 2 && selectedOwner >= numPreviousOwners &&
        <ModificationsSVL selectedOwner={selectedOwner-numPreviousOwners} modifications={modifications} setModifications={setModifications} editMode={editMode} />
      }
      {selectedSVLData == 3 && selectedOwner < numPreviousOwners &&
        <PrevOwnersDefectsSVL selectedOwner={selectedOwner} prevOwnersDefects={prevOwnersDefects} prevOwnersRepairs={prevOwnersRepairs} repairs={repairs} />
      }
      {selectedSVLData == 3 && selectedOwner >= numPreviousOwners &&
        <DefectsSVL selectedOwner={selectedOwner-numPreviousOwners} defects={defects} setDefects={setDefects} editMode={editMode} />
      }
      {selectedSVLData == 4 && selectedOwner < numPreviousOwners &&
        <PrevOwnersRepairsSVL selectedOwner={selectedOwner} prevOwnersRepairs={prevOwnersRepairs} />
      }
      {selectedSVLData == 4 && selectedOwner >= numPreviousOwners &&
        <RepairsSVL selectedOwner={selectedOwner-numPreviousOwners} repairs={repairs} setRepairs={setRepairs} totalOwners={totalOwners} defects={defects} editMode={editMode} />
      }
    </div>
  );
}

export default DataSVL;