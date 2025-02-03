import { SetStateAction } from 'react';
import styles from '../../styles/components/dataSVL/dataSVL.module.css';
import { GeneralInformation, Maintenances, Modifications, Defects, Repairs } from '../../utils/interfaces/dataSVL.ts';
import GeneralInformationSVL from './generalInformationSVL.tsx';
import MaintenancesSVL from './maintenancesSVL.tsx';
import ModificationsSVL from './modificationsSVL.tsx';
import DefectsSVL from './defectsSVL.tsx';
import RepairsSVL from './repairsSVL.tsx';

type DataSVLProps = {
  selectedOwner: number;
  selectedSVLData: number;
  generalInformation: GeneralInformation[];
  setGeneralInformation: React.Dispatch<SetStateAction<GeneralInformation[]>>;
  maintenances: Maintenances[];
  setMaintenances: React.Dispatch<SetStateAction<Maintenances[]>>;
  modifications: Modifications[];
  setModifications: React.Dispatch<SetStateAction<Modifications[]>>;
  defects: Defects[];
  setDefects: React.Dispatch<SetStateAction<Defects[]>>;
  repairs: Repairs[];
  setRepairs: React.Dispatch<SetStateAction<Repairs[]>>;
  totalOwners: number;
};

const DataSVL = ({ selectedOwner, selectedSVLData, generalInformation, setGeneralInformation, maintenances, setMaintenances, modifications, setModifications, defects, setDefects, repairs, setRepairs, totalOwners }: DataSVLProps): JSX.Element => {

  return (
    <div className={styles.dataSVLContainer}>
      {selectedSVLData == 0 && <GeneralInformationSVL selectedOwner={selectedOwner} generalInformation={generalInformation} setGeneralInformation={setGeneralInformation} />}
      {selectedSVLData == 1 && <MaintenancesSVL selectedOwner={selectedOwner} maintenances={maintenances} setMaintenances={setMaintenances} />}
      {selectedSVLData == 2 && <ModificationsSVL selectedOwner={selectedOwner} modifications={modifications} setModifications={setModifications} />}
      {selectedSVLData == 3 && <DefectsSVL selectedOwner={selectedOwner} defects={defects} setDefects={setDefects} />}
      {selectedSVLData == 4 && <RepairsSVL selectedOwner={selectedOwner} repairs={repairs} setRepairs={setRepairs} totalOwners={totalOwners} defects={defects} />}
    </div>
  );
}

export default DataSVL;