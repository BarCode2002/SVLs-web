import { useEffect, useState } from 'react';
import styles from '../styles/pages/Data.module.css';
import { GeneralInformation, Maintenances, Modifications, Defects, Repairs } from '../utils/interfaces.ts';
import TopNavBar from '../components/topNavBar/topNavBar.tsx';
import DataSVL from '../components/dataSVL/dataSVL.tsx';
import BottomNavBar from '../components/bottomNavBar/bottomNavBar.tsx';
import { PHOTOGRAPHS_SIZE, COMPONENTS_SIZE, DEFECTS_REPAIRED_SIZE } from '../utils/constants.ts';
import { useTranslation } from "react-i18next";
import { useParams } from 'react-router-dom';
import axios, { AxiosError } from "axios";
import { addAndSetMaintenanceGroup, addAndSetMaintenanceGroupType, setOwnerSVLDataToEmpty } from '../utils/uploadJSON.ts';
import { addAndSetModificationGroup, addAndSetModificationGroupType } from '../utils/uploadJSON.ts';
import { addAndSetDefectGroup, addAndSetDefectGroupType } from '../utils/uploadJSON.ts';
import { addAndSetRepairGroup, addAndSetRepairGroupType } from '../utils/uploadJSON.ts';
import { addGeneralInformation, addMaintenances, addModifications, addDefects, addRepairs } from '../utils/addOwners.ts';

const Data = (): JSX.Element => {

  const { t } = useTranslation();

  const { svl_pk } = useParams();

  const [selectedSVLData, setSelectedSVLData] = useState(0);
  const [selectedOwner, setSelectedOwner] = useState(0);
  const [totalOwners, setTotalOwners] = useState(1);
  const [numPreviousOwners, setNumPreviousOwners] = useState(0);
  const [editMode, setEditMode] = useState(true);
  const [viewType, setViewType] = useState(0);
  const [newSVL, setNewSVL] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); 
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

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
        responsible: [null, "", null, ""],
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
      }))
    }))
  );
  
  const [modifications, setModifications] = useState<Modifications[]>(
    Array.from({ length: 1 }, () => ({
      group: Array.from({ length: 1 }, () => ({
        date: "",
        kilometers: "",
        name: "",
        responsible: [null, "", null, ""],
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
      }))
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
      }))
    }))
  );

  const [repairs, setRepairs] = useState<Repairs[]>(
    Array.from({ length: 1 }, () => ({
      group: Array.from({ length: 1 }, () => ({
        date: "",
        kilometers: "",
        name: "",
        responsible: [null, "", null, ""],
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
      }))
    }))
  );

  const prevOwnersGeneralInformation: GeneralInformation[] = [];
  const prevOwnersMaintenances: Maintenances[] = [];
  const prevOwnersModifications: Modifications[] = [];
  const prevOwnersDefects: Defects[] = [];
  const prevOwnerRepairs: Repairs[] = [];

  const fillOwnerSVLData = (selectedOwner: number, ownerSVLData: any) => {
    if (selectedOwner > 0) {
      addGeneralInformation(setGeneralInformation, t('DataSVL.Forms.brand'), t('DataSVL.Forms.model'), 
        t('DataSVL.Forms.state'), t('DataSVL.Forms.shift'), t('DataSVL.Forms.fuel'), t('DataSVL.Forms.climate'),
        t('DataSVL.Forms.usage'), t('DataSVL.Forms.storage')
      );
      addMaintenances(setMaintenances);
      addModifications(setModifications);
      addDefects(setDefects);
      addRepairs(setRepairs);
    }
    const updatedGeneralInformation = [...generalInformation];
    updatedGeneralInformation[selectedOwner] = ownerSVLData[0];
    setGeneralInformation(updatedGeneralInformation);

    setOwnerSVLDataToEmpty(selectedOwner, setMaintenances);
    for (let i = 0; i < ownerSVLData[1].maintenances.length; i++) {
      addAndSetMaintenanceGroup(setMaintenances, selectedOwner, ownerSVLData[1].maintenances[i]);
      for (let j = 1; j < ownerSVLData[1].maintenances[i].type.length; j++) {
        addAndSetMaintenanceGroupType(setMaintenances, selectedOwner, i, ownerSVLData[1].maintenances[i].type[j]);
      }
    }

    setOwnerSVLDataToEmpty(selectedOwner, setModifications);
    for (let i = 0; i < ownerSVLData[2].modifications.length; i++) {
      addAndSetModificationGroup(setModifications, selectedOwner, ownerSVLData[2].modifications[i]);
      for (let j = 1; j < ownerSVLData[2].modifications[i].type.length; j++) {
        addAndSetModificationGroupType(setModifications, selectedOwner, i, ownerSVLData[2].modifications[i].type[j]);
      }
    }

    setOwnerSVLDataToEmpty(selectedOwner, setDefects);
    for (let i = 0; i < ownerSVLData[3].defects.length; i++) {
      addAndSetDefectGroup(setDefects, selectedOwner, ownerSVLData[3].defects[i]);
      for (let j = 1; j < ownerSVLData[3].defects[i].type.length; ++j) {
        addAndSetDefectGroupType(setDefects, selectedOwner, i, ownerSVLData[3].defects[i].type[j]);
      }
    }

    setOwnerSVLDataToEmpty(selectedOwner, setRepairs);
    for (let i = 0; i < ownerSVLData[4].repairs.length; i++) {
      addAndSetRepairGroup(setRepairs, selectedOwner, ownerSVLData[4].repairs[i]);
      for (let j = 1; j < ownerSVLData[4].repairs[i].type.length; j++) {
        addAndSetRepairGroupType(setRepairs, selectedOwner, i, ownerSVLData[4].repairs[i].type[j]);
      }
    }

  }

  useEffect(() => {
    const getSVLFull = async () => {
      if (svl_pk) {
        try {
          const responseIndexer = await axios.get(`http://127.0.0.1:3000/indexer/holder/pk/${svl_pk}`);
          //console.log(responseIndexer.data);
          if (responseIndexer.data[0].previous_owners_info[0].cids[0] == '') {
            try {
              for (let i = 0; i < responseIndexer.data[0].current_owner_info.length; i++) {
                const responseIPFS = await axios.get(`http://127.0.0.1:8080/ipfs/${responseIndexer.data[0].current_owner_info[i]}`);
                console.log(responseIPFS.data);
                fillOwnerSVLData(i, responseIPFS.data);
              }
            } catch (error: any | AxiosError) {
              console.error("Unexpected error:", error);
            }
            setSelectedOwner(0);
            setTotalOwners(1);
            setNumPreviousOwners(0);
          }
        } catch (error: any | AxiosError) {
          console.error("Unexpected error:", error);
        }
      }
      else setNewSVL(true);
    };
    getSVLFull();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const updateViewportHeight = () => {
    const newHeight = window.innerHeight;
    document.documentElement.style.setProperty('--vh', `${newHeight}px`);
  }
  window.addEventListener('resize', updateViewportHeight);

  return (
    <div>
      {isLoading == true ? (
        <div className={styles.mainContainer}>
          <div className={styles.dotContainer}>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
          </div>
        </div>
      ) :
        <div className={styles.mainContainer}>
          <TopNavBar page={'Data'} newSVL={newSVL} editMode={editMode} setEditMode={setEditMode} viewType={viewType} 
            setViewType={setViewType} selectedOwner={selectedOwner} totalOwners={totalOwners}
            generalInformation={generalInformation} setGeneralInformation={setGeneralInformation} 
            maintenances={maintenances} setMaintenances={setMaintenances}
            modifications={modifications} setModifications={setModifications}
            defects={defects} setDefects={setDefects}
            repairs={repairs} setRepairs={setRepairs}
          />
          <DataSVL selectedOwner={selectedOwner} selectedSVLData={selectedSVLData}
            generalInformation={generalInformation} setGeneralInformation={setGeneralInformation} 
            maintenances={maintenances} setMaintenances={setMaintenances}
            modifications={modifications} setModifications={setModifications}
            defects={defects} setDefects={setDefects}
            repairs={repairs} setRepairs={setRepairs}
            totalOwners={totalOwners} editMode={editMode}
          />
          <BottomNavBar selectedSVLData={selectedSVLData} setSelectedSVLData={setSelectedSVLData} 
            selectedOwner={selectedOwner} setSelectedOwner={setSelectedOwner} 
            setGeneralInformation={setGeneralInformation} setMaintenances={setMaintenances}
            setModifications={setModifications} setDefects={setDefects} setRepairs={setRepairs}
            totalOwners={totalOwners} setTotalOwners={setTotalOwners} editMode={editMode}
          />
        </div>
      }
    </div>
  );
}

export default Data;