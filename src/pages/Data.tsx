import { useEffect, useRef, useState } from 'react';
import styles from '../styles/pages/Data.module.css';
import { GeneralInformation, Maintenances, Modifications, Defects, Repairs } from '../utils/interfaces.ts';
import { OwnershipSummary } from '../utils/interfaces.ts';
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
import { parse, format } from "date-fns";
import pako from "pako";
import { indexer, ipfsRetrieve } from '../utils/ip.ts';

const Data = (): JSX.Element => {

  const { t } = useTranslation();

  const { svl_pk } = useParams();

  const [selectedSVLData, setSelectedSVLData] = useState(0);
  const [selectedOwner, setSelectedOwner] = useState(0);
  const [totalOwners, setTotalOwners] = useState(1);
  const [numPreviousOwners, setNumPreviousOwners] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [viewType, setViewType] = useState(0);
  const [newSVL, setNewSVL] = useState(true);
  const [mySVL, setMySVL] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [jsonUploaded, setJsonUploaded] = useState(false);
  
  const [generalInformation, setGeneralInformation] = useState<GeneralInformation[]>(
    Array.from({ length: 1 }, () => ({
      VIN: '',
      brand: 'DataSVL.Forms.brand',
      model: 'DataSVL.Forms.model',
      year: '',
      kilometers: ['', 'km'],
      transferDate: '',
      mainPhotograph: '',
      state: 'DataSVL.Forms.state',
      photographs: Array.from({ length: PHOTOGRAPHS_SIZE }, () => ''),
      weight: ['', 'kg'],
      color: '',
      engine: '',
      power: ['', 'cv'],
      shift: 'DataSVL.Forms.shift',
      fuel: 'DataSVL.Forms.fuel',
      autonomy: ['', 'km'],
      climate: 'DataSVL.Forms.climate',
      usage: 'DataSVL.Forms.usage',
      storage: 'DataSVL.Forms.storage',
      comments: '',
    }))
  );

  const [maintenances, setMaintenances] = useState<Maintenances[]>(
    Array.from({ length: 1 }, () => ({
      group: Array.from({ length: 1 }, () => ({
        date: "",
        kilometers: ['', 'km'],
        name: "",
        responsible: [null, "", null, ""],
        pre: Array.from({ length: PHOTOGRAPHS_SIZE }, () => ''),
        post: Array.from({ length: PHOTOGRAPHS_SIZE }, () => ''),
        type: Array.from({ length: 1 }, () => ({
          name: "",
          components: Array.from({ length: COMPONENTS_SIZE }, () => ''),
          numComponents: 0,
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
        kilometers: ['', 'km'],
        name: "",
        responsible: [null, "", null, ""],
        pre: Array.from({ length: PHOTOGRAPHS_SIZE }, () => ''),
        post: Array.from({ length: PHOTOGRAPHS_SIZE }, () => ''),
        type: Array.from({ length: 1 }, () => ({
          name: "",
          components: Array.from({ length: COMPONENTS_SIZE }, () => ''),
          numComponents: 0,
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
        kilometers: ['', 'km'],
        cause: "",
        type: Array.from({ length: 1 }, () => ({
          level: 'DataSVL.Forms.level',
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
        kilometers: ['', 'km'],
        name: "",
        responsible: [null, "", null, ""],
        pre: Array.from({ length: PHOTOGRAPHS_SIZE }, () => ''),
        post: Array.from({ length: PHOTOGRAPHS_SIZE }, () => ''),
        defectsRepaired: Array.from({ length: DEFECTS_REPAIRED_SIZE }, () => ([-1, -1, -1 ])),
        numDefectsRepaired: 0,
        type: Array.from({ length: 1 }, () => ({
          name: "",
          components: Array.from({ length: COMPONENTS_SIZE }, () => ''),
          numComponents: 0,
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
  const didRun = useRef(false);//en teoria solo necesario para el development por el strict mode

  const ownershipSummary = useRef<OwnershipSummary[]>([]);

  const fillOwnerSVLData = (so: number, responseIPFS: any, prevOwnerGeneralInformation: any, justTransferred: boolean)=> {
    //console.log(generalInformation);
    //console.log(maintenances.length);
    //console.log(modifications.length);
    //console.log(defects.length);
    //console.log(repairs.length);

    if (justTransferred) {
      const updatedGeneralInformation = [...generalInformation];
      updatedGeneralInformation[0] = {
        VIN: prevOwnerGeneralInformation.VIN,
        brand: prevOwnerGeneralInformation.brand,
        model: prevOwnerGeneralInformation.model,
        year: prevOwnerGeneralInformation.year,
        kilometers: prevOwnerGeneralInformation.kilometers,
        transferDate: '',
        mainPhotograph: prevOwnerGeneralInformation.mainPhotograph,
        state: prevOwnerGeneralInformation.state,
        photographs: [...prevOwnerGeneralInformation.photographs],
        weight: prevOwnerGeneralInformation.weight,
        color: prevOwnerGeneralInformation.color,
        engine: prevOwnerGeneralInformation.engine,
        power: prevOwnerGeneralInformation.power,
        shift: prevOwnerGeneralInformation.shift,
        fuel: prevOwnerGeneralInformation.fuel,
        autonomy: prevOwnerGeneralInformation.autonomy,
        climate: prevOwnerGeneralInformation.climate,
        usage: prevOwnerGeneralInformation.usage,
        storage: prevOwnerGeneralInformation.storage,
        comments: prevOwnerGeneralInformation.comments,
      },
      setGeneralInformation(updatedGeneralInformation);
    }
    else {
      const ownerSVLData = responseIPFS;
      //console.log(ownerSVLData);
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
    addGeneralInformationDefault(setGeneralInformation);
    addMaintenances(setMaintenances);
    addModifications(setModifications);
    addDefects(setDefects);
    addRepairs(setRepairs);
  }

  useEffect(() => {
    const getSVLFull = async () => {
      if (didRun.current) return;
      didRun.current = true;
      const timer = setTimeout(async () => {
        if (svl_pk) {
          try {
            const responseIndexer = await axios.get(`${indexer}holder/pk/${svl_pk}`);
            if (responseIndexer.data[0].owner_address != localStorage.getItem('address')) { //SVL not owned
              setMySVL(false);
              if (responseIndexer.data[0].previous_owners_info[0].cids[0] == '') { //SVL has not been transferred
                try {
                  setTotalOwners(responseIndexer.data[0].current_owner_info.length);
                  setNumPreviousOwners(0);
                  const owners = [];
                  for (let i = 0; i < responseIndexer.data[0].current_owner_info.length; i++) {
                    const responseIPFS = await axios.get(`${ipfsRetrieve}${responseIndexer.data[0].current_owner_info[i]}`, {
                      responseType: "arraybuffer",
                    });
                    const compressedIPFSData = new Uint8Array(responseIPFS.data);
                    const decompressedIPFSData = pako.ungzip(compressedIPFSData, { to: "string" });
                    const parsedIPFSData = JSON.parse(decompressedIPFSData);
                    prevOwnersGeneralInformation.current.push(parsedIPFSData[0]);
                    prevOwnersMaintenances.current.push(parsedIPFSData[1]);
                    prevOwnersModifications.current.push(parsedIPFSData[2]);
                    prevOwnersDefects.current.push(parsedIPFSData[3]);
                    prevOwnersRepairs.current.push(parsedIPFSData[4]);
                    owners.push(`${t('DataSVL.Placeholders.owner')} ${i+1}`);
                  }
                  const date = parse(svl_pk.split("tz")[0], "dd MM yyyy HH:mm:ss", new Date()); //get the SVL creation date from the SVL key
                  const transferDate = format(date, "dd/MM/yyyy");
                  const ownershipInfo = {
                    ownerAddress: responseIndexer.data[0].owner_address,
                    owners: owners,
                    transferDate: `${t('DataSVL.TopBar.mintDate')} ${transferDate}`,
                  }
                  ownershipSummary.current.push(ownershipInfo);
                } catch (error: any | AxiosError) {
                  console.error("Unexpected error:", error);
                }
                setSelectedOwner(0);
              }
              else { //SVL has been transferred
                let numPreviousOwners = 0;
                let prevTransfeDate;
                for (let i = responseIndexer.data[0].previous_owners_info.length-1; i >= 0; i--) { //traverse the previous owners information from the least recent to the most recent
                  const owners = [];
                  for (let j = 0; j < responseIndexer.data[0].previous_owners_info[i].cids.length; j++) { //inside a previous owner traverse from the least recent to the most recent
                    try {
                      const responseIPFS = await axios.get(`${ipfsRetrieve}${responseIndexer.data[0].previous_owners_info[i].cids[j]}`, {
                        responseType: "arraybuffer",
                      });
                      const compressedIPFSData = new Uint8Array(responseIPFS.data);
                      const decompressedIPFSData = pako.ungzip(compressedIPFSData, { to: "string" });
                      const parsedIPFSData = JSON.parse(decompressedIPFSData);
                      prevOwnersGeneralInformation.current.push(parsedIPFSData[0]);
                      prevOwnersMaintenances.current.push(parsedIPFSData[1]);
                      prevOwnersModifications.current.push(parsedIPFSData[2]);
                      prevOwnersDefects.current.push(parsedIPFSData[3]);
                      prevOwnersRepairs.current.push(parsedIPFSData[4]);
                      ++numPreviousOwners; 
                      owners.push(`${t('DataSVL.Placeholders.owner')} ${numPreviousOwners}`);
                    } catch (error: any | AxiosError) {
                      console.error("Unexpected error:", error);
                    }
                  }
                  if (i == responseIndexer.data[0].previous_owners_info.length-1) { //for the first SVL owner get the creation date from the SVL key
                    const date = parse(svl_pk.split("tz")[0], "dd MM yyyy HH:mm:ss", new Date());
                    const transferDate = format(date, "dd/MM/yyyy");
                    prevTransfeDate = transferDate;
                    const ownershipInfo = {
                      ownerAddress: responseIndexer.data[0].previous_owners_info[i].address,
                      owners: owners,
                      transferDate: `${t('DataSVL.TopBar.mintDate')} ${transferDate}`,
                    }
                    prevTransfeDate = format(responseIndexer.data[0].previous_owners_info[i].transferDate, "dd/MM/yyyy");
                    ownershipSummary.current.push(ownershipInfo);
                  }
                  else { //for the rest get transfer date from the previous owners before their owner
                    const ownershipInfo = {
                      ownerAddress: responseIndexer.data[0].previous_owners_info[i].address,
                      owners: owners,
                      transferDate: `${t('DataSVL.TopBar.acquisitionDate')} ${prevTransfeDate}`,
                    }
                    prevTransfeDate = format(responseIndexer.data[0].previous_owners_info[i].transferDate, "dd/MM/yyyy");
                    ownershipSummary.current.push(ownershipInfo);
                  }
                }
                try {
                  const owners = [];
                  let justTransferred = true;
                  for (let i = 0; i < responseIndexer.data[0].current_owner_info.length; i++) { //check for the information of the current owner
                    if (responseIndexer.data[0].current_owner_info[i] != '') { //do not check it if SVL has just been transferred and the new owner has not introduced new information
                      justTransferred = false;;
                      try {
                        const responseIPFS = await axios.get(`${ipfsRetrieve}${responseIndexer.data[0].current_owner_info[i]}`, {
                          responseType: "arraybuffer",
                        });
                        const compressedIPFSData = new Uint8Array(responseIPFS.data);
                        const decompressedIPFSData = pako.ungzip(compressedIPFSData, { to: "string" });
                        const parsedIPFSData = JSON.parse(decompressedIPFSData);
                        prevOwnersGeneralInformation.current.push(parsedIPFSData[0]);
                        prevOwnersMaintenances.current.push(parsedIPFSData[1]);
                        prevOwnersModifications.current.push(parsedIPFSData[2]);
                        prevOwnersDefects.current.push(parsedIPFSData[3]);
                        prevOwnersRepairs.current.push(parsedIPFSData[4]);
                        ++numPreviousOwners; 
                        owners.push(`${t('DataSVL.Placeholders.owner')} ${numPreviousOwners}`);
                      } catch (error: any | AxiosError) {
                        console.error("Unexpected error:", error);
                      }
                    }
                  }
                  if (!justTransferred) {
                    const ownershipInfo = {
                      ownerAddress: responseIndexer.data[0].owner_address,
                      owners: owners,
                      transferDate: `${t('DataSVL.TopBar.acquisitionDate')} ${prevTransfeDate}`,
                    }
                    ownershipSummary.current.push(ownershipInfo);
                  }
                  setTotalOwners(numPreviousOwners);
                } catch (error: any | AxiosError) {
                  console.error("Unexpected error:", error);
                }
                setSelectedOwner(0);
              }
            }
            else { //SVL owned
              let numPreviousOwners = 0;
              let prevTransferDate;
              if (responseIndexer.data[0].previous_owners_info[0].cids[0] != '') {
                for (let i = responseIndexer.data[0].previous_owners_info.length-1; i >= 0; i--) {
                  const owners = [];
                  for (let j = 0; j < responseIndexer.data[0].previous_owners_info[i].cids.length; j++) {
                    try {
                      const responseIPFS = await axios.get(`${ipfsRetrieve}${responseIndexer.data[0].previous_owners_info[i].cids[j]}`, {
                        responseType: "arraybuffer",
                      });
                      const compressedIPFSData = new Uint8Array(responseIPFS.data);
                      const decompressedIPFSData = pako.ungzip(compressedIPFSData, { to: "string" });
                      const parsedIPFSData = JSON.parse(decompressedIPFSData);
                      prevOwnersGeneralInformation.current.push(parsedIPFSData[0]);
                      prevOwnersMaintenances.current.push(parsedIPFSData[1]);
                      prevOwnersModifications.current.push(parsedIPFSData[2]);
                      prevOwnersDefects.current.push(parsedIPFSData[3]);
                      prevOwnersRepairs.current.push(parsedIPFSData[4]);
                      ++numPreviousOwners; 
                      owners.push(`${t('DataSVL.Placeholders.owner')} ${numPreviousOwners}`);
                    } catch (error: any | AxiosError) {
                      console.error("Unexpected error:", error);
                    }
                  }
                  if (i == responseIndexer.data[0].previous_owners_info.length-1) {
                    const date = parse(svl_pk.split("tz")[0], "dd MM yyyy HH:mm:ss", new Date());
                    const transferDate = format(date, "dd/MM/yyyy");
                    const ownershipInfo = {
                      ownerAddress: responseIndexer.data[0].previous_owners_info[i].address,
                      owners: owners,
                      transferDate: `${t('DataSVL.TopBar.mintDate')} ${transferDate}`,
                    }
                    prevTransferDate = format(responseIndexer.data[0].previous_owners_info[i].transferDate, "dd/MM/yyyy");
                    ownershipSummary.current.push(ownershipInfo);
                  }
                  else {
                    const ownershipInfo = {
                      ownerAddress: responseIndexer.data[0].previous_owners_info[i].address,
                      owners: owners,
                      transferDate: `${t('DataSVL.TopBar.acquisitionDate')} ${prevTransferDate}`,
                    }
                    prevTransferDate = format(responseIndexer.data[0].previous_owners_info[i].transferDate, "dd/MM/yyyy");
                    ownershipSummary.current.push(ownershipInfo);
                  }
                }
              }
              try {
                for (let i = 1; i < responseIndexer.data[0].current_owner_info.length; i++) {
                  addOwners();
                }
                const owners = [];
                for (let i = 0; i < responseIndexer.data[0].current_owner_info.length; i++) {
                  let cid;
                  let justTransferred = false;
                  if (responseIndexer.data[0].current_owner_info[0] == '') justTransferred = true;
                  else cid = responseIndexer.data[0].current_owner_info[i];
                  let parsedIPFSData;
                  if (justTransferred == false) {
                    const responseIPFS = await axios.get(`${ipfsRetrieve}${cid}`, {
                      responseType: "arraybuffer",
                    });
                    const compressedIPFSData = new Uint8Array(responseIPFS.data);
                    const decompressedIPFSData = pako.ungzip(compressedIPFSData, { to: "string" });
                    parsedIPFSData = JSON.parse(decompressedIPFSData);
                  }
                  fillOwnerSVLData(i, parsedIPFSData, prevOwnersGeneralInformation.current[numPreviousOwners-1], justTransferred);
                  owners.push(`${t('DataSVL.Placeholders.owner')} ${numPreviousOwners+i+1}`);
                }
                if (numPreviousOwners > 0) {
                  const ownershipInfo = {
                    ownerAddress: responseIndexer.data[0].owner_address,
                    owners: owners,
                    transferDate: `${t('DataSVL.TopBar.acquisitionDate')} ${prevTransferDate}`,
                  }
                  ownershipSummary.current.push(ownershipInfo);
                }
                else {
                  const date = parse(svl_pk.split("tz")[0], "dd MM yyyy HH:mm:ss", new Date());
                  const transferDate = format(date, "dd/MM/yyyy");
                  const ownershipInfo = {
                    ownerAddress: responseIndexer.data[0].owner_address,
                    owners: owners,
                    transferDate: `${t('DataSVL.TopBar.mintDate')} ${transferDate}`,
                  }
                  ownershipSummary.current.push(ownershipInfo);
                }
                setTotalOwners(numPreviousOwners+responseIndexer.data[0].current_owner_info.length);
              } catch (error: any | AxiosError) {
                console.error("Unexpected error:", error);
              }
              setSelectedOwner(numPreviousOwners);
              setNumPreviousOwners(numPreviousOwners);
            }
            setNewSVL(false);
          } catch (error: any | AxiosError) {
            console.error("Unexpected error:", error);
          }
        }
        else {
          setNewSVL(true);
          setEditMode(true);
        }
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
            setViewType={setViewType} selectedOwner={selectedOwner} totalOwners={totalOwners} numPreviousOwners={numPreviousOwners}
            generalInformation={generalInformation} setGeneralInformation={setGeneralInformation}
            maintenances={maintenances} setMaintenances={setMaintenances} modifications={modifications} 
            setModifications={setModifications} defects={defects} setDefects={setDefects}
            repairs={repairs} setRepairs={setRepairs} svl_pk={svl_pk} ownershipSummary={ownershipSummary.current} mySVL={mySVL}
            jsonUploaded={jsonUploaded} setJsonUploaded={setJsonUploaded}
          />
          <DataSVL selectedOwner={selectedOwner} selectedSVLData={selectedSVLData}
            generalInformation={generalInformation} setGeneralInformation={setGeneralInformation} prevOwnersGeneralInformation={prevOwnersGeneralInformation.current}
            maintenances={maintenances} setMaintenances={setMaintenances} prevOwnersMaintenances={prevOwnersMaintenances.current}
            modifications={modifications} setModifications={setModifications} prevOwnersModifications={prevOwnersModifications.current}
            defects={defects} setDefects={setDefects} prevOwnersDefects={prevOwnersDefects.current}
            repairs={repairs} setRepairs={setRepairs} prevOwnersRepairs={prevOwnersRepairs.current}
            totalOwners={totalOwners} editMode={editMode} numPreviousOwners={numPreviousOwners} mySVL={mySVL} viewType={viewType} jsonUploaded={jsonUploaded}
          />
          <BottomNavBar selectedSVLData={selectedSVLData} setSelectedSVLData={setSelectedSVLData} 
            selectedOwner={selectedOwner} setSelectedOwner={setSelectedOwner} numPreviousOwners={numPreviousOwners}
            setGeneralInformation={setGeneralInformation} setMaintenances={setMaintenances}
            setModifications={setModifications} setDefects={setDefects} setRepairs={setRepairs}
            totalOwners={totalOwners} setTotalOwners={setTotalOwners} editMode={editMode} 
            viewType={viewType}prevOwnersGeneralInformation={prevOwnersGeneralInformation.current} mySVL={mySVL}
          />
        </div>
      }
    </div>
  );
}

export default Data;