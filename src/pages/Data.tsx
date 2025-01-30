import { useState } from 'react';
import styles from '../styles/pages/Data.module.css';
import { GeneralInformation, Maintenances, Modifications, Defects, Repairs } from '../utils/interfaces/dataSVL.ts';
import TopNavBar from '../components/topNavBar/topNavBar.tsx';
import DataSVL from '../components/dataSVL/dataSVL.tsx';
import BottomNavBar from '../components/bottomNavBar/bottomNavBar.tsx';
import { MMDR_SIZE, PHOTOGRAPHS_SIZE, COMPONENTS_SIZE, DEFECTS_REPAIRED_SIZE } from '../utils/constants/constants.ts';

const Data = (): JSX.Element => {

  const [selectedSVLData, setSelectedSVLData] = useState(0);
  const [selectedOwner, setSelectedOwner] = useState(0);
  const [totalOwners, setTotalOwners] = useState(1);
  const [editMode, setEditMode] = useState(false);
  const [viewType, setViewType] = useState(0);
  const [newSVL, setNewSVL] = useState(true);

  const [generalInformation, setGeneralInformation] = useState<GeneralInformation[]>(
    Array.from({ length: 1 }, () => ({
      VIN: '',
      brand: 'Vehicle brand',
      model: 'Model brand',
      year: '',
      kilometers: '',
      mainPhotograph: '',
      state: 'State of the vehicle',
      photographs: Array.from({ length: PHOTOGRAPHS_SIZE }, () => ''),
      weight: '',
      color: '',
      engine: '',
      power: '',
      shift: 'Shift of the vehicle',
      fuel: 'Fuel of the vehicle',
      autonomy: '',
      climate: 'Climate where the vehicle was used',
      usage: 'Usage that was made to the vehicle',
      storage: 'Storage of the vehicle',
      comments: '',
    }))
  );

  const [maintenances, setMaintenances] = useState<Maintenances[]>(
    Array.from({ length: 1 }, () => ({
      group: Array.from({ length: 1 }, () => ({
        date: "",
        kilometers: "",
        name: "",
        doneBy: [false, "", false, ""],
        pre: Array.from({ length: PHOTOGRAPHS_SIZE }, () => ''),
        post: Array.from({ length: PHOTOGRAPHS_SIZE }, () => ''),
        maintenance: Array.from({ length: MMDR_SIZE }, () => ({
          name: "",
          components: Array.from({ length: COMPONENTS_SIZE }, () => ''),
          pre: Array.from({ length: PHOTOGRAPHS_SIZE }, () => ''),
          post: Array.from({ length: PHOTOGRAPHS_SIZE }, () => ''),
          comments: "",
          shrinked: false,
        })),
        shrinked: false,
        numMaintenances: 1,
      })),
      numGroups: 1,
    }))
  );

  const [modifications, setModifications] = useState<Modifications[]>(
    Array.from({ length: 1 }, () => ({
      group: Array.from({ length: 1 }, () => ({
        date: "",
        kilometers: "",
        name: "",
        doneBy: [false, "", false, ""],
        pre: Array.from({ length: PHOTOGRAPHS_SIZE }, () => ''),
        post: Array.from({ length: PHOTOGRAPHS_SIZE }, () => ''),
        modification: Array.from({ length: MMDR_SIZE }, () => ({
          name: "",
          components: Array.from({ length: COMPONENTS_SIZE }, () => ''),
          pre: Array.from({ length: PHOTOGRAPHS_SIZE }, () => ''),
          post: Array.from({ length: PHOTOGRAPHS_SIZE }, () => ''),
          comments: "",
          shrinked: false,
        })),
        shrinked: false,
        numModifications: 1,
      })),
      numGroups: 1,
    }))
  );

  const [defects, setDefects] = useState<Defects[]>(
    Array.from({ length: 1 }, () => ({
      group: Array.from({ length: 1 }, () => ({
        date: "",
        kilometers: "",
        defect: Array.from({ length: MMDR_SIZE }, () => ({
          level: "",
          photographs: Array.from({ length: PHOTOGRAPHS_SIZE }, () => ''),
          description: "",
          cause: "",
          shrinked: false,
        })),
        shrinked: false,
        numDefects: 1,
      })),
      numGroups: 1,
    }))
  );

  const [repairs, setRepairs] = useState<Repairs[]>(
    Array.from({ length: 1 }, () => ({
      group: Array.from({ length: 1 }, () => ({
        date: "",
        kilometers: "",
        name: "",
        doneBy: [false, "", false, ""],
        pre: Array.from({ length: PHOTOGRAPHS_SIZE }, () => ''),
        post: Array.from({ length: PHOTOGRAPHS_SIZE }, () => ''),
        defectsRepaired: Array.from({ length: DEFECTS_REPAIRED_SIZE }, () => ([false, -1, -1, -1 ])),
        repair: Array.from({ length: MMDR_SIZE }, () => ({
          name: "",
          components: Array.from({ length: COMPONENTS_SIZE }, () => ''),
          pre: Array.from({ length: PHOTOGRAPHS_SIZE }, () => ''),
          post: Array.from({ length: PHOTOGRAPHS_SIZE }, () => ''),
          comments: "",
          shrinked: false,
        })),
        shrinked: false,
        numRepairs: 1,
      })),
      numGroups: 1,
    }))
  );

  const updateViewportHeight = () => {
    const newHeight = window.innerHeight;
    document.documentElement.style.setProperty('--vh', `${newHeight}px`);
  }
  window.addEventListener('resize', updateViewportHeight);

  return (
    <div className={styles.mainContainer}>
        <TopNavBar newSVL={newSVL} editMode={editMode} setEditMode={setEditMode} viewType={viewType} setViewType={setViewType} />
        <DataSVL selectedOwner={selectedOwner} selectedSVLData={selectedSVLData}
          generalInformation={generalInformation} setGeneralInformation={setGeneralInformation} 
          maintenances={maintenances} setMaintenances={setMaintenances}
          modifications={modifications} setModifications={setModifications}
          defects={defects} setDefects={setDefects}
          repairs={repairs} setRepairs={setRepairs}
        />
        <BottomNavBar selectedSVLData={selectedSVLData} setSelectedSVLData={setSelectedSVLData} 
          selectedOwner={selectedOwner} setSelectedOwner={setSelectedOwner} 
          setGeneralInformation={setGeneralInformation} setMaintenances={setMaintenances}
          setModifications={setModifications} setDefects={setDefects} setRepairs={setRepairs}
          totalOwners={totalOwners} setTotalOwners={setTotalOwners} 
        />
    </div>
  );
}

export default Data;