import { useState } from 'react';
import styles from '../styles/pages/Data.module.css';
import { GeneralInformation, Maintenances, Modifications, Defects, Repairs } from '../utils/interfaces/dataSVL.ts';
import TopNavBar from '../components/topNavBar/topNavBar.tsx';
import DataSVL from '../components/dataSVL/dataSVL.tsx';
import BottomNavBar from '../components/bottomNavBar/bottomNavBar.tsx';

const OWNERS_LIMIT = 100; 
const GROUPS_LIMIT = 100; 
const MMDR_LIMIT = 20;
const PHOTOGRAPHS_LIMIT = 10;
const COMPONENTS_LIMIT = 10;
const DEFECTS_REPAIRED_LIMIT = 10;

const Data = (): JSX.Element => {

  const [generalInformation, setGeneralInformation] = useState<GeneralInformation[]>(
    Array.from({ length: OWNERS_LIMIT }, () => ({
      VIN: '',
      brand: '',
      model: '',
      year: '',
      kilometers: '',
      mainPhotograph: '',
      state: '',
      photographs: Array.from({ length: PHOTOGRAPHS_LIMIT }, () => ''),
      weight: '',
      color: '',
      engine: '',
      power: '',
      shift: '',
      fuel: '',
      autonomy: '',
      climate: '',
      usage: '',
      garage: false,
      comments: '',
    }))
  );

  const [maintenances, setMaintenances] = useState<Maintenances[]>(
    Array.from({ length: OWNERS_LIMIT }, () => ({
      group: Array.from({ length: GROUPS_LIMIT }, () => ({
        date: "",
        kilometers: "",
        name: "",
        doneBy: ["", "", false, ""],
        pre: Array.from({ length: PHOTOGRAPHS_LIMIT }, () => ''),
        post: Array.from({ length: PHOTOGRAPHS_LIMIT }, () => ''),
        maintenance: Array.from({ length: MMDR_LIMIT }, () => ({
          name: "",
          components: Array.from({ length: COMPONENTS_LIMIT }, () => ''),
          pre: Array.from({ length: PHOTOGRAPHS_LIMIT }, () => ''),
          post: Array.from({ length: PHOTOGRAPHS_LIMIT }, () => ''),
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
    Array.from({ length: OWNERS_LIMIT }, () => ({
      group: Array.from({ length: GROUPS_LIMIT }, () => ({
        date: "",
        kilometers: "",
        name: "",
        doneBy: ["", "", false, ""],
        pre: Array.from({ length: PHOTOGRAPHS_LIMIT }, () => ''),
        post: Array.from({ length: PHOTOGRAPHS_LIMIT }, () => ''),
        modification: Array.from({ length: MMDR_LIMIT }, () => ({
          name: "",
          components: Array.from({ length: COMPONENTS_LIMIT }, () => ''),
          pre: Array.from({ length: PHOTOGRAPHS_LIMIT }, () => ''),
          post: Array.from({ length: PHOTOGRAPHS_LIMIT }, () => ''),
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
    Array.from({ length: OWNERS_LIMIT }, () => ({
      group: Array.from({ length: GROUPS_LIMIT }, () => ({
        date: "",
        kilometers: "",
        defect: Array.from({ length: MMDR_LIMIT }, () => ({
          level: "",
          photographs: Array.from({ length: PHOTOGRAPHS_LIMIT }, () => ''),
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
    Array.from({ length: OWNERS_LIMIT }, () => ({
      group: Array.from({ length: GROUPS_LIMIT }, () => ({
        date: "",
        kilometers: "",
        name: "",
        doneBy: ["", "", false, ""],
        pre: Array.from({ length: PHOTOGRAPHS_LIMIT }, () => ''),
        post: Array.from({ length: PHOTOGRAPHS_LIMIT }, () => ''),
        defectsRepaired: Array.from({ length: DEFECTS_REPAIRED_LIMIT }, () => ([false, -1, -1, -1 ])),
        repair: Array.from({ length: MMDR_LIMIT }, () => ({
          name: "",
          components: Array.from({ length: COMPONENTS_LIMIT }, () => ''),
          pre: Array.from({ length: PHOTOGRAPHS_LIMIT }, () => ''),
          post: Array.from({ length: PHOTOGRAPHS_LIMIT }, () => ''),
          comments: "",
          shrinked: false,
        })),
        shrinked: false,
        numRepairs: 1,
      })),
      numGroups: 1,
    }))
  );

  return (
    <div className={styles.mainContainer}>
      
        <TopNavBar />
     
    
        <DataSVL />
      
     
        <BottomNavBar />
     
    </div>
  );
}

export default Data;