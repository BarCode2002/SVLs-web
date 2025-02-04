import { useState } from 'react';
import styles from '../styles/pages/Data.module.css';
import { GeneralInformation, Maintenances, Modifications, Defects, Repairs } from '../utils/dataSVL.ts';
import TopNavBar from '../components/topNavBar/topNavBar.tsx';
import DataSVL from '../components/dataSVL/dataSVL.tsx';
import BottomNavBar from '../components/bottomNavBar/bottomNavBar.tsx';
import { PHOTOGRAPHS_SIZE, COMPONENTS_SIZE, DEFECTS_REPAIRED_SIZE } from '../utils/constants.ts';
import { useTranslation } from "react-i18next";

const Data = (): JSX.Element => {

  const { t } = useTranslation();

  const [selectedSVLData, setSelectedSVLData] = useState(0);
  const [selectedOwner, setSelectedOwner] = useState(0);
  const [totalOwners, setTotalOwners] = useState(1);
  const [editMode, setEditMode] = useState(false);
  const [viewType, setViewType] = useState(0);
  const [newSVL, setNewSVL] = useState(true);

  const [generalInformation, setGeneralInformation] = useState<GeneralInformation[]>(
    Array.from({ length: 1 }, () => ({
      VIN: '',
      brand: t('DataSVL.Forms.brand'),
      model: t('DataSVL.Forms.model'),
      year: '',
      kilometers: '',
      mainPhotograph: '',
      state: t('DataSVL.Forms.state'),
      photographs: Array.from({ length: PHOTOGRAPHS_SIZE }, () => ''),
      weight: '',
      color: '',
      engine: '',
      power: '',
      shift: t('DataSVL.Forms.shift'),
      fuel: t('DataSVL.Forms.fuel'),
      autonomy: '',
      climate: t('DataSVL.Forms.climate'),
      usage: t('DataSVL.Forms.usage'),
      storage: t('DataSVL.Forms.storage'),
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
        type: Array.from({ length: 1 }, () => ({
          name: "",
          components: Array.from({ length: COMPONENTS_SIZE }, () => ''),
          numComponents: 1,
          pre: Array.from({ length: PHOTOGRAPHS_SIZE }, () => ''),
          post: Array.from({ length: PHOTOGRAPHS_SIZE }, () => ''),
          comments: "",
          shrinked: false,
        })),
        shrinked: false,
        numTypes: 1,
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
        type: Array.from({ length: 1 }, () => ({
          name: "",
          components: Array.from({ length: COMPONENTS_SIZE }, () => ''),
          numComponents: 1,
          pre: Array.from({ length: PHOTOGRAPHS_SIZE }, () => ''),
          post: Array.from({ length: PHOTOGRAPHS_SIZE }, () => ''),
          comments: "",
          shrinked: false,
        })),
        shrinked: false,
        numTypes: 1,
      })),
      numGroups: 1,
    }))
  );

  const [defects, setDefects] = useState<Defects[]>(
    Array.from({ length: 1 }, () => ({
      group: Array.from({ length: 1 }, () => ({
        date: "",
        kilometers: "",
        cause: "",
        type: Array.from({ length: 1 }, () => ({
          level: t('DataSVL.Forms.level'),
          photographs: Array.from({ length: PHOTOGRAPHS_SIZE }, () => ''),
          description: "",
          shrinked: false,
        })),
        shrinked: false,
        numTypes: 1,
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
        defectsRepaired: Array.from({ length: DEFECTS_REPAIRED_SIZE }, () => ([-1, -1, -1 ])),
        numDefectsRepaired: 0,
        type: Array.from({ length: 1 }, () => ({
          name: "",
          components: Array.from({ length: COMPONENTS_SIZE }, () => ''),
          numComponents: 1,
          pre: Array.from({ length: PHOTOGRAPHS_SIZE }, () => ''),
          post: Array.from({ length: PHOTOGRAPHS_SIZE }, () => ''),
          comments: "",
          shrinked: false,
        })),
        shrinked: false,
        numTypes: 1,
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
        <TopNavBar page={'Data'} newSVL={newSVL} editMode={editMode} setEditMode={setEditMode} viewType={viewType} setViewType={setViewType} />
        <DataSVL selectedOwner={selectedOwner} selectedSVLData={selectedSVLData}
          generalInformation={generalInformation} setGeneralInformation={setGeneralInformation} 
          maintenances={maintenances} setMaintenances={setMaintenances}
          modifications={modifications} setModifications={setModifications}
          defects={defects} setDefects={setDefects}
          repairs={repairs} setRepairs={setRepairs}
          totalOwners={totalOwners}
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