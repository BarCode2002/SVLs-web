import { useEffect, useRef, useState } from 'react';
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
import { addGeneralInformationDefault, addMaintenances, addModifications, addDefects, addRepairs } from '../utils/addOwners.ts';

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

  const prevOwnersGeneralInformation = useRef<GeneralInformation[]>([]);
  const prevOwnersMaintenances = useRef<Maintenances[]>([]);
  const prevOwnersModifications = useRef<Modifications[]>([]);
  const prevOwnersDefects = useRef<Defects[]>([]);
  const prevOwnersRepairs = useRef<Repairs[]>([]);
  const didRun = useRef(false);// en teoria solo necesario para el development por el strict mode

  const fillOwnerSVLData = (so: number, ownerSVLData: any, prevOwnersGeneralInformation: any, justTransferred: boolean)=> {
    //console.log(ownerSVLData);
    //console.log(generalInformation);
    //console.log(maintenances.length);
    //console.log(modifications.length);
    //console.log(defects.length);
    //console.log(repairs.length);

    if (justTransferred) {
      setGeneralInformation((prevGeneralInformation) =>
        prevGeneralInformation.map((item, i) =>
          i == so ? { ...item,  ...prevOwnersGeneralInformation } : item
        )
      );
    }
    else {
      setGeneralInformation((prevGeneralInformation) =>
        prevGeneralInformation.map((item, i) =>
          i == so ? { ...item,  ...ownerSVLData[0] } : item
        )
      );
    
      setOwnerSVLDataToEmpty(so, setMaintenances);
      for (let i = 0; i < ownerSVLData[1].maintenances.length; i++) {
        addAndSetMaintenanceGroup(setMaintenances, so, ownerSVLData[1].maintenances[i]);
        for (let j = 1; j < ownerSVLData[1].maintenances[i].type.length; j++) {
          addAndSetMaintenanceGroupType(setMaintenances, so, i, ownerSVLData[1].maintenances[i].type[j]);
        }
      }

      setOwnerSVLDataToEmpty(so, setModifications);
      for (let i = 0; i < ownerSVLData[2].modifications.length; i++) {
        addAndSetModificationGroup(setModifications, so, ownerSVLData[2].modifications[i]);
        for (let j = 1; j < ownerSVLData[2].modifications[i].type.length; j++) {
          addAndSetModificationGroupType(setModifications, so, i, ownerSVLData[2].modifications[i].type[j]);
        }
      }

      setOwnerSVLDataToEmpty(so, setDefects);
      for (let i = 0; i < ownerSVLData[3].defects.length; i++) {
        addAndSetDefectGroup(setDefects, so, ownerSVLData[3].defects[i]);
        for (let j = 1; j < ownerSVLData[3].defects[i].type.length; ++j) {
          addAndSetDefectGroupType(setDefects, so, i, ownerSVLData[3].defects[i].type[j]);
        }
      }

      setOwnerSVLDataToEmpty(so, setRepairs);
      for (let i = 0; i < ownerSVLData[4].repairs.length; i++) {
        addAndSetRepairGroup(setRepairs, so, ownerSVLData[4].repairs[i]);
        for (let j = 1; j < ownerSVLData[4].repairs[i].type.length; j++) {
          addAndSetRepairGroupType(setRepairs, so, i, ownerSVLData[4].repairs[i].type[j]);
        }
      }
    }
  }

  const addOwners = () => {
    addGeneralInformationDefault(setGeneralInformation, t('DataSVL.Forms.brand'), t('DataSVL.Forms.model'),
    t('DataSVL.Forms.state'), t('DataSVL.Forms.shift'), t('DataSVL.Forms.fuel'), t('DataSVL.Forms.climate'),
    t('DataSVL.Forms.usage'), t('DataSVL.Forms.storage')
    );
    addMaintenances(setMaintenances);
    addModifications(setModifications);
    addDefects(setDefects, t('DataSVL.Forms.level'));
    addRepairs(setRepairs);
  }

  useEffect(() => {
    const getSVLFull = async () => {
      if (didRun.current) return;
      didRun.current = true;
      const timer = setTimeout(async () => {
        if (svl_pk) {
          try {
            const responseIndexer = await axios.get(`http://127.0.0.1:3000/indexer/holder/pk/${svl_pk}`);
            if (responseIndexer.data[0].previous_owners_info[0].cids[0] == '') {
              try {
                for (let i = 1; i < responseIndexer.data[0].current_owner_info.length; i++) {
                  addOwners();
                }
                setTotalOwners(responseIndexer.data[0].current_owner_info.length);
                setNumPreviousOwners(0);
                for (let i = 0; i < responseIndexer.data[0].current_owner_info.length; i++) {
                  const responseIPFS = await axios.get(`http://127.0.0.1:8080/ipfs/${responseIndexer.data[0].current_owner_info[i]}`);
                  fillOwnerSVLData(i, responseIPFS.data, [], false);
                }
              } catch (error: any | AxiosError) {
                console.error("Unexpected error:", error);
              }
              setSelectedOwner(0);
            }
            else {
              let numPreviousOwners = 0;
              for (let i = responseIndexer.data[0].previous_owners_info.length-1; i >= 0; i--) {
                for (let j = 0; j < responseIndexer.data[0].previous_owners_info[i].cids.length; j++) {
                  try {
                    const responseIPFS = await axios.get(`http://127.0.0.1:8080/ipfs/${responseIndexer.data[0].previous_owners_info[i].cids[j]}`);
                    prevOwnersGeneralInformation.current.push(responseIPFS.data[0]);
                    prevOwnersMaintenances.current.push(responseIPFS.data[1]);
                    prevOwnersModifications.current.push(responseIPFS.data[2]);
                    prevOwnersDefects.current.push(responseIPFS.data[3]);
                    prevOwnersRepairs.current.push(responseIPFS.data[4]);
                    ++numPreviousOwners;
                  } catch (error: any | AxiosError) {
                    console.error("Unexpected error:", error);
                  }
                }
              }
              setNumPreviousOwners(numPreviousOwners);
              try {
                for (let i = 1; i < responseIndexer.data[0].current_owner_info.length; i++) {
                  addOwners();
                }
                for (let i = 0; i < responseIndexer.data[0].current_owner_info.length; i++) {
                  let cid;
                  let justTransferred = false;
                  if (responseIndexer.data[0].current_owner_info[0] == '') {
                    cid = "Qme6enrnownz3wTieTreRFngEZpwbrywKboSwvSQUDB3we";
                    justTransferred = true;
                  }
                  else cid = responseIndexer.data[0].current_owner_info[i];
                  const responseIPFS = await axios.get(`http://127.0.0.1:8080/ipfs/${cid}`);
                  fillOwnerSVLData(i, responseIPFS.data, prevOwnersGeneralInformation.current[numPreviousOwners-1], justTransferred);
                }
                setTotalOwners(numPreviousOwners+responseIndexer.data[0].current_owner_info.length);
              } catch (error: any | AxiosError) {
                console.error("Unexpected error:", error);
              }
              setSelectedOwner(numPreviousOwners);
            }
            setNewSVL(false);
          } catch (error: any | AxiosError) {
            console.error("Unexpected error:", error);
          }
        }
        else setNewSVL(true);
        setIsLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    };
    getSVLFull();
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
            repairs={repairs} setRepairs={setRepairs} svl_pk={svl_pk}
          />
          <DataSVL selectedOwner={selectedOwner} selectedSVLData={selectedSVLData}
            generalInformation={generalInformation} setGeneralInformation={setGeneralInformation} prevOwnersGeneralInformation={prevOwnersGeneralInformation.current}
            maintenances={maintenances} setMaintenances={setMaintenances} prevOwnersMaintenances={prevOwnersMaintenances.current}
            modifications={modifications} setModifications={setModifications} prevOwnersModifications={prevOwnersModifications.current}
            defects={defects} setDefects={setDefects} prevOwnersDefects={prevOwnersDefects.current}
            repairs={repairs} setRepairs={setRepairs} prevOwnersRepairs={prevOwnersRepairs.current}
            totalOwners={totalOwners} editMode={editMode} numPreviousOwners={numPreviousOwners}
          />
          <BottomNavBar selectedSVLData={selectedSVLData} setSelectedSVLData={setSelectedSVLData} 
            selectedOwner={selectedOwner} setSelectedOwner={setSelectedOwner} numPreviousOwners={numPreviousOwners}
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