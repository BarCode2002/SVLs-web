import { useEffect, useRef, useState } from 'react';
import styles from '../styles/pages/Data.module.css';
import { OwnershipSummary, PossibleDefectsJsonVersions, PossibleGeneralInformationJsonVersions, PossibleMaintenancesJsonVersions, PossibleModificationsJsonVersions, PossibleRepairsJsonVersions } from '../utils/commonTypes.ts';
import TopNavBar from '../components/topNavBar/topNavBar.tsx';
import DataSVL from '../components/dataSVL/dataSVL.tsx';
import BottomNavBar from '../components/bottomNavBar/bottomNavBar.tsx';
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
import { defaultBaseDefects, defaultBaseGeneralInformation, defaultBaseMaintenances, defaultBaseModifications, defaultBaseRepairs } from '../utils/defaultBase.ts';
import { defaultBaseSimpleDefects, defaultBaseSimpleGeneralInformation, defaultBaseSimpleMaintenances, defaultBaseSimpleModifications, defaultBaseSimpleRepairs } from '../utils/defaultBaseSimple.ts';
import { cloneDeep } from 'lodash';

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
  const [fullScreen, setFullScreen] = useState(() => {
    const savedFullScreen = localStorage.getItem("fullScreen");
    if (savedFullScreen == null) return 0;
    else return parseInt(savedFullScreen);
  });

  const [jsonVersion, setJsonVersion] = useState<string[]>(['base']); 
  
  const [generalInformation, setGeneralInformation] = useState<PossibleGeneralInformationJsonVersions[]>(
    Array.from({ length: 1 }, () => {
      if (jsonVersion[0] == 'base') return cloneDeep(defaultBaseGeneralInformation);
      else return cloneDeep(defaultBaseSimpleGeneralInformation);
    })
  );

  const [maintenances, setMaintenances] = useState<PossibleMaintenancesJsonVersions[]>(
    Array.from({ length: 1 }, () => {
      if (jsonVersion[0] == 'base') return cloneDeep(defaultBaseMaintenances);
      else return cloneDeep(defaultBaseSimpleMaintenances);
    })
  );
  
  const [modifications, setModifications] = useState<PossibleModificationsJsonVersions[]>(
    Array.from({ length: 1 }, () => {
      if (jsonVersion[0] == 'base') return cloneDeep(defaultBaseModifications);
      else return cloneDeep(defaultBaseSimpleModifications);  
    })
  );

  const [defects, setDefects] = useState<PossibleDefectsJsonVersions[]>(
    Array.from({ length: 1 }, () => {
      if (jsonVersion[0] == 'base') return cloneDeep(defaultBaseDefects);
      else return cloneDeep(defaultBaseSimpleDefects);  
    })
  );

  const [repairs, setRepairs] = useState<PossibleRepairsJsonVersions[]>(
    Array.from({ length: 1 }, () => {
      if (jsonVersion[0] == 'base') return cloneDeep(defaultBaseRepairs);
      else return cloneDeep(defaultBaseSimpleRepairs);  
    })
  );

  const expandArrayToMatch = (sourceArray: any[], blueprint: any) => {
    return Array.from({ length: sourceArray.length }, (_, i) =>
      blueprint[i] !== undefined ? blueprint[i] : cloneDeep(blueprint[0])
    );
  };
  
  const deepMergePreserveMatching = (source: any, target: any): any => {
    // If the source is null or an empty string, return it as-is (no merging needed)
    if (source === null || source === "") {
      return target; // Fallback to target if source is null or empty string
    }
  
    if (Array.isArray(source) && Array.isArray(target)) {
      const expandedTarget = expandArrayToMatch(source, target);
      return source.map((item, index) => deepMergePreserveMatching(item, expandedTarget[index]));
    } else if (typeof source === "object" && typeof target === "object") {
      // Only merge fields that exist in both source and target
      const acc: Record<string, any> = {}; // Explicitly declare the type of acc
      return Object.keys(target).reduce((acc, key) => {
        if (source.hasOwnProperty(key)) {
          acc[key] = deepMergePreserveMatching(source[key], target[key]);
        } else {
          acc[key] = target[key];  // Default value from target (defaultB)
        }
        return acc;
      }, acc);  // Pass the initialized acc object
    }
    
    // If the source is not null and not empty, return the source value (preserved)
    return source ?? target; // Default to the value from target if missing in source
  };
  

  const renderCount = useRef(0); //hecho asi por el strict mode
  useEffect(() => {
    renderCount.current += 1;
    // Skip the effect on the first and second renders (including Strict Mode)
    if (renderCount.current < 3) {
      return;
    }

    if (jsonVersion[selectedOwner] == 'base') {
      const updatedMaintenances = [...maintenances];
      updatedMaintenances[selectedOwner-numPreviousOwners] = deepMergePreserveMatching(maintenances[selectedOwner-numPreviousOwners], cloneDeep(defaultBaseMaintenances));
      setMaintenances(updatedMaintenances);
      const updatedModifications = [...modifications];
      updatedModifications[selectedOwner-numPreviousOwners] = deepMergePreserveMatching(modifications[selectedOwner-numPreviousOwners], cloneDeep(defaultBaseModifications));
      setModifications(updatedModifications);
      const updatedRepairs = [...repairs];
      updatedRepairs[selectedOwner-numPreviousOwners] = deepMergePreserveMatching(repairs[selectedOwner-numPreviousOwners], cloneDeep(defaultBaseRepairs));
      setRepairs(updatedRepairs);
    }
    else {
      const updatedMaintenances = [...maintenances];
      updatedMaintenances[selectedOwner-numPreviousOwners] = deepMergePreserveMatching(maintenances[selectedOwner-numPreviousOwners], cloneDeep(defaultBaseSimpleMaintenances));
      setMaintenances(updatedMaintenances);
      const updatedModifications = [...modifications];
      updatedModifications[selectedOwner-numPreviousOwners] = deepMergePreserveMatching(modifications[selectedOwner-numPreviousOwners], cloneDeep(defaultBaseSimpleModifications));
      setModifications(updatedModifications);
      const updatedRepairs = [...repairs];
      updatedRepairs[selectedOwner-numPreviousOwners] = deepMergePreserveMatching(repairs[selectedOwner-numPreviousOwners], cloneDeep(defaultBaseSimpleRepairs));
      setRepairs(updatedRepairs);
    }
  }, [jsonVersion]);

  const prevOwnersGeneralInformation = useRef<PossibleGeneralInformationJsonVersions[]>([]);
  const prevOwnersMaintenances = useRef<PossibleMaintenancesJsonVersions[]>([]);
  const prevOwnersModifications = useRef<PossibleModificationsJsonVersions[]>([]);
  const prevOwnersDefects = useRef<PossibleDefectsJsonVersions[]>([]);
  const prevOwnersRepairs = useRef<PossibleRepairsJsonVersions[]>([]);
  //const didRun = useRef(false);//en teoria y sin teoria solo necesario para el development por el strict mode

  const ownershipSummary = useRef<OwnershipSummary[]>([]);

  const fillOwnerSVLData = (so: number, responseIPFS: any, prevOwnerGeneralInformation: any, justTransferred: boolean)=> {
    if (justTransferred) {
      const updatedGeneralInformation = [...generalInformation];
      updatedGeneralInformation[0] = {
        VIN: prevOwnerGeneralInformation.VIN,
        brand: prevOwnerGeneralInformation.brand,
        model: prevOwnerGeneralInformation.model,
        year: prevOwnerGeneralInformation.year,
        kilometers: prevOwnerGeneralInformation.kilometers,
        transferDate: '',
        state: 'DataSVL.Forms.state',
        images: [...prevOwnerGeneralInformation.images],
        weight: prevOwnerGeneralInformation.weight,
        color: prevOwnerGeneralInformation.color,
        engine: prevOwnerGeneralInformation.engine,
        power: prevOwnerGeneralInformation.power,
        shift: prevOwnerGeneralInformation.shift,
        fuel: prevOwnerGeneralInformation.fuel,
        autonomy: prevOwnerGeneralInformation.autonomy,
        climate: 'DataSVL.Forms.climate',
        usage: 'DataSVL.Forms.usage',
        storage: 'DataSVL.Forms.storage',
        comments: '',
      },
      setGeneralInformation(updatedGeneralInformation);
    }
    else {
      const ownerSVLData = responseIPFS;
      setGeneralInformation((prevGeneralInformation) =>
        prevGeneralInformation.map((item, i) =>
          i == so ? { ...item,  ...ownerSVLData[0] } : item
        )
      );
    
      setOwnerSVLDataToEmpty(so, setMaintenances);
      for (let i = 0; i < ownerSVLData[1].group.length; i++) {
        addAndSetMaintenanceGroup(setMaintenances, so, ownerSVLData[1].group[i], ownerSVLData[5].version);
        for (let j = 1; j < ownerSVLData[1].group[i].element.length; j++) {
          addAndSetMaintenanceGroupType(setMaintenances, so, i, ownerSVLData[1].group[i].element[j], ownerSVLData[5].version);
        }
      }

      setOwnerSVLDataToEmpty(so, setModifications);
      for (let i = 0; i < ownerSVLData[2].group.length; i++) {
        addAndSetModificationGroup(setModifications, so, ownerSVLData[2].group[i], ownerSVLData[5].version);
        for (let j = 1; j < ownerSVLData[2].group[i].element.length; j++) {
          addAndSetModificationGroupType(setModifications, so, i, ownerSVLData[2].group[i].element[j], ownerSVLData[5].version);
        }
      }

      setOwnerSVLDataToEmpty(so, setDefects);
      for (let i = 0; i < ownerSVLData[3].group.length; i++) {
        addAndSetDefectGroup(setDefects, so, ownerSVLData[3].group[i]);
        for (let j = 1; j < ownerSVLData[3].group[i].element.length; ++j) {
          addAndSetDefectGroupType(setDefects, so, i, ownerSVLData[3].group[i].element[j]);
        }
      }

      setOwnerSVLDataToEmpty(so, setRepairs);
      for (let i = 0; i < ownerSVLData[4].group.length; i++) {
        addAndSetRepairGroup(setRepairs, so, ownerSVLData[4].group[i], ownerSVLData[5].version);
        for (let j = 1; j < ownerSVLData[4].group[i].element.length; j++) {
          addAndSetRepairGroupType(setRepairs, so, i, ownerSVLData[4].group[i].element[j], ownerSVLData[5].version);
        }
      }
    }
  }

  const addOwners = (selectedJsonVersion: string) => {
    addGeneralInformationDefault(setGeneralInformation);
    addMaintenances(setMaintenances, selectedJsonVersion);
    addModifications(setModifications, selectedJsonVersion);
    addDefects(setDefects);
    addRepairs(setRepairs, selectedJsonVersion);
  }

  useEffect(() => {
    const getSVLFull = async () => {
      //if (didRun.current) return;
      //didRun.current = true;
      const timer = setTimeout(async () => {
        if (svl_pk) {
          try {
            const responseIndexer = await axios.get(`${indexer}holder/pk/${svl_pk}`);
            if (responseIndexer.data[0].owner_address != localStorage.getItem('address')) { //SVL not owned
              setMySVL(false);
              const updatedJsonVersion = [...jsonVersion];
              if (responseIndexer.data[0].first_owner) { //SVL has not been transferred
                const owners = [];
                for (let i = 0; i < responseIndexer.data[0].current_owner_info.length; i++) {
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
                    if (i == 0) updatedJsonVersion[0] = parsedIPFSData[5].version;
                    else updatedJsonVersion.push(parsedIPFSData[5].version);
                  } catch (error: any | AxiosError) {
                    console.error("Unexpected error:", error);
                  }
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
                setTotalOwners(responseIndexer.data[0].current_owner_info.length);
                setNumPreviousOwners(0);
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
                      if (i == responseIndexer.data[0].previous_owners_info.length-1 && j == 0) updatedJsonVersion[0] = parsedIPFSData[5].version;
                      else updatedJsonVersion.push(parsedIPFSData[5].version);
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
                const owners = [];
                for (let i = 0; i < responseIndexer.data[0].current_owner_info.length; i++) { //check for the information of the current owner
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
                    updatedJsonVersion.push(parsedIPFSData[5].version);
                    ++numPreviousOwners; 
                    owners.push(`${t('DataSVL.Placeholders.owner')} ${numPreviousOwners}`);
                  } catch (error: any | AxiosError) {
                    console.error("Unexpected error:", error);
                  }
                }
                const ownershipInfo = { //if just transferred set message, if not set current owners
                  ownerAddress: responseIndexer.data[0].owner_address,
                  owners: responseIndexer.data[0].current_owner_info.length == 1 && responseIndexer.data[0].current_owner_info[0] == '' ? [t('DataSVL.TopBar.justTransferred')] : owners,
                  transferDate: `${t('DataSVL.TopBar.acquisitionDate')} ${prevTransfeDate}`,
                }
                ownershipSummary.current.push(ownershipInfo);
                setTotalOwners(numPreviousOwners);          
                setSelectedOwner(0);
              }
              setJsonVersion(updatedJsonVersion);
            }
            else { //SVL owned
              let numPreviousOwners = 0;
              let prevTransferDate;
              const updatedJsonVersion = [...jsonVersion];
              if (!responseIndexer.data[0].first_owner) { //SVL has been transferred
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
                      if (i == responseIndexer.data[0].previous_owners_info.length-1 && j == 0) updatedJsonVersion[0] = parsedIPFSData[5].version;
                      else updatedJsonVersion.push(parsedIPFSData[5].version)
                    } catch (error: any | AxiosError) {
                      console.error("Unexpected error:", error);
                    }
                    ++numPreviousOwners; 
                    owners.push(`${t('DataSVL.Placeholders.owner')} ${numPreviousOwners}`);
                  }
                  if (i == responseIndexer.data[0].previous_owners_info.length-1) { //for the first SVL owner get the creation date from the SVL key
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
                  else { //for the rest get transfer date from the previous owners before their owner
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
              //add owners in the use state variable(there is always one owner by default)
              if (responseIndexer.data[0].current_owner_info[0] != '') {
                const responseIPFS = await axios.get(`${ipfsRetrieve}${responseIndexer.data[0].current_owner_info[0]}`, {
                  responseType: "arraybuffer",
                });
                const compressedIPFSData = new Uint8Array(responseIPFS.data);
                const decompressedIPFSData = pako.ungzip(compressedIPFSData, { to: "string" });
                const parsedIPFSData = JSON.parse(decompressedIPFSData);
                if (responseIndexer.data[0].first_owner) updatedJsonVersion[0] = parsedIPFSData[5].version;
                else updatedJsonVersion.push(parsedIPFSData[5].version);
              }
              else {
                if (responseIndexer.data[0].first_owner) updatedJsonVersion[0] = 'base';
                else updatedJsonVersion.push('base');
              }
              for (let i = 1; i < responseIndexer.data[0].current_owner_info.length; i++) {
                const responseIPFS = await axios.get(`${ipfsRetrieve}${responseIndexer.data[0].current_owner_info[i]}`, {
                  responseType: "arraybuffer",
                });
                const compressedIPFSData = new Uint8Array(responseIPFS.data);
                const decompressedIPFSData = pako.ungzip(compressedIPFSData, { to: "string" });
                const parsedIPFSData = JSON.parse(decompressedIPFSData);
                updatedJsonVersion.push(parsedIPFSData[5].version);
                addOwners(parsedIPFSData[5].version);
              }
              setJsonVersion(updatedJsonVersion);
              const owners = [];
              if (responseIndexer.data[0].current_owner_info[0] == '') { //the SVL has been transferred and not updated by the current_owner
                fillOwnerSVLData(0, [], prevOwnersGeneralInformation.current[numPreviousOwners-1], true);
                owners.push(`${t('DataSVL.Placeholders.owner')} ${numPreviousOwners+1}`);
              }
              else { //the SVL has been updated by the current owner
                for (let i = 0; i < responseIndexer.data[0].current_owner_info.length; i++) { //check for the information of the current owner
                  try {
                    const responseIPFS = await axios.get(`${ipfsRetrieve}${responseIndexer.data[0].current_owner_info[i]}`, {
                      responseType: "arraybuffer",
                    });
                    const compressedIPFSData = new Uint8Array(responseIPFS.data);
                    const decompressedIPFSData = pako.ungzip(compressedIPFSData, { to: "string" });
                    const parsedIPFSData = JSON.parse(decompressedIPFSData);
                    fillOwnerSVLData(i, parsedIPFSData, [], false);
                  } catch (error: any | AxiosError) {
                    console.error("Unexpected error:", error);
                  }
                  owners.push(`${t('DataSVL.Placeholders.owner')} ${numPreviousOwners+i+1}`);
                }
              }
              if (numPreviousOwners > 0) { //SVL transferred
                const ownershipInfo = {
                  ownerAddress: responseIndexer.data[0].owner_address,
                  owners: owners,
                  transferDate: `${t('DataSVL.TopBar.acquisitionDate')} ${prevTransferDate}`,
                }
                ownershipSummary.current.push(ownershipInfo);
              }
              else { //SVL not transferred
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
          {fullScreen == 0 &&
            <TopNavBar page={'Data'} newSVL={newSVL} editMode={editMode} setEditMode={setEditMode} viewType={viewType} 
              setViewType={setViewType} selectedOwner={selectedOwner} totalOwners={totalOwners} numPreviousOwners={numPreviousOwners}
              generalInformation={generalInformation} setGeneralInformation={setGeneralInformation}
              maintenances={maintenances} setMaintenances={setMaintenances} modifications={modifications} 
              setModifications={setModifications} defects={defects} setDefects={setDefects}
              repairs={repairs} setRepairs={setRepairs} svl_pk={svl_pk} ownershipSummary={ownershipSummary.current} mySVL={mySVL}
              jsonUploaded={jsonUploaded} setJsonUploaded={setJsonUploaded} jsonVersion={jsonVersion} setJsonVersion={setJsonVersion}
            />
          }
          <DataSVL selectedOwner={selectedOwner} selectedSVLData={selectedSVLData}
            generalInformation={generalInformation} setGeneralInformation={setGeneralInformation} prevOwnersGeneralInformation={prevOwnersGeneralInformation.current}
            maintenances={maintenances} setMaintenances={setMaintenances} prevOwnersMaintenances={prevOwnersMaintenances.current}
            modifications={modifications} setModifications={setModifications} prevOwnersModifications={prevOwnersModifications.current}
            defects={defects} setDefects={setDefects} prevOwnersDefects={prevOwnersDefects.current}
            repairs={repairs} setRepairs={setRepairs} prevOwnersRepairs={prevOwnersRepairs.current}
            totalOwners={totalOwners} editMode={editMode} numPreviousOwners={numPreviousOwners} mySVL={mySVL} viewType={viewType} jsonUploaded={jsonUploaded}
            fullScreen={fullScreen} setFullScreen={setFullScreen} jsonVersion={jsonVersion} setJsonVersion={setJsonVersion}
          />
          {fullScreen == 0 &&
            <BottomNavBar selectedSVLData={selectedSVLData} setSelectedSVLData={setSelectedSVLData} 
              selectedOwner={selectedOwner} setSelectedOwner={setSelectedOwner} numPreviousOwners={numPreviousOwners}
              setGeneralInformation={setGeneralInformation} setMaintenances={setMaintenances}
              setModifications={setModifications} setDefects={setDefects} setRepairs={setRepairs}
              totalOwners={totalOwners} setTotalOwners={setTotalOwners} editMode={editMode} 
              viewType={viewType}prevOwnersGeneralInformation={prevOwnersGeneralInformation.current} mySVL={mySVL}
              jsonVersion={jsonVersion} setJsonVersion={setJsonVersion}
            />
          }
        </div>
      }
    </div>
  );
}

export default Data;