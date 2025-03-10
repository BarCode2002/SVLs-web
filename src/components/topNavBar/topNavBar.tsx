import styles from '../../styles/components/topNavBar/topNavBar.module.css';
import GoBackButton from './goBackButton';
import ViewTypeButton from './viewTypeButton';
import EditModeButton from './editModeButton';
import UploadJSONButton from './uploadJSONButton';
import DownloadJSONButton from './downloadJSONButton';
import MintSVLButton from './mintSVLButton';
import EditSVLButton from './updateSVLButton';
import DisconnectWalletButton from './disconnectWalletButton';
import CreateSVLButton from './createSVLButton';
import OwnershipSummaryButton from './ownershipSummaryButton';
import ChangeWalletButton from './changeWalletButton';
import LanguageSelector from '../varied/languageSelector';
import HelpButton from './helpButton';
import { GeneralInformation, Maintenances, Modifications, Defects, Repairs } from '../../utils/interfaces';
import { OwnershipSummary } from '../../utils/interfaces';
import { SetStateAction, useEffect, useState } from 'react';
import axios from "axios";
import { indexer, mongoSmartContract } from '../../utils/ip';
import { TezosLogo } from '../../assets/tezos';
import BuySVLButton from './buySVLButton';
import RequestSVLButton from './requestSVLButton';

type TopNavBarProps = {
  page: string;
  newSVL?: boolean;
  editMode?: boolean;
  setEditMode?: React.Dispatch<React.SetStateAction<boolean>>;
  viewType?: number;
  setViewType?: React.Dispatch<React.SetStateAction<number>>;
  myAddress?: string | undefined;
  setMyAddress?: React.Dispatch<React.SetStateAction<string | undefined>>;
  selectedOwner?: number;
  totalOwners?: number;
  numPreviousOwners?: number;
  generalInformation?: GeneralInformation[];
  setGeneralInformation?: React.Dispatch<SetStateAction<GeneralInformation[]>>;
  maintenances?: Maintenances[];
  setMaintenances?: React.Dispatch<SetStateAction<Maintenances[]>>;
  modifications?: Modifications[];
  setModifications?: React.Dispatch<SetStateAction<Modifications[]>>;
  defects?: Defects[];
  setDefects?: React.Dispatch<SetStateAction<Defects[]>>;
  repairs?: Repairs[];
  setRepairs?: React.Dispatch<SetStateAction<Repairs[]>>;
  svl_pk?: string;
  ownershipSummary?: OwnershipSummary[];
  mySVL?: boolean;
  jsonUploaded?: boolean;
  setJsonUploaded?: React.Dispatch<boolean>;
};

const TopNavBar = ({ page, newSVL, editMode, setEditMode, viewType, setViewType, myAddress, setMyAddress, selectedOwner, totalOwners, numPreviousOwners, generalInformation, setGeneralInformation, maintenances, setMaintenances, modifications, setModifications, defects, setDefects, repairs, setRepairs, svl_pk, ownershipSummary, mySVL, jsonUploaded, setJsonUploaded }: TopNavBarProps): JSX.Element => {

  const [mintPrice, setMintPrice] = useState<string>('');
  const [canBuy, setCanBuy] = useState(false);
  const [state, setState] = useState(0);

  useEffect(() => {
    const getMintPrice = async () => {
      try {
        const response = await axios.get(mongoSmartContract);
        setMintPrice(response.data.mintPrice);
      } catch (error) {
        console.error("Upload failed:", error);
      }
    };
    getMintPrice();
  }, []);  

  useEffect(() => {
    if (svl_pk) {
      const checkIfCanBuy = async () => {
        try {
          const responseIndexer = await axios.get(`${indexer}holder/pk/${svl_pk}`);
          if (responseIndexer.data[0].requester_address == localStorage.getItem('address') && responseIndexer.data[0].request_accepted) setCanBuy(true);
        } catch (error) {
          console.error("Upload failed:", error);
        }
      };
      checkIfCanBuy();
      const checkState = async () => {
        try {
          const responseIndexer = await axios.get(`${indexer}holder/pk/${svl_pk}`);
          if (responseIndexer.data[0].owner_address != responseIndexer.data[0].requester_address && responseIndexer.data[0].requester_address == localStorage.getItem('address')) setState(1); //requested
          else if ((responseIndexer.data[0].owner_address != responseIndexer.data[0].requester_address && responseIndexer.data[0].requester_address != localStorage.getItem('address')) || (responseIndexer.data[0].current_owner_info[0] == '')) setState(2); //blocked
        } catch (error) {
          console.error("Upload failed:", error);
        }
      };
      checkState();
    }
  }, [state]);  

  return (
    <div>
        {page == 'Dashboard' ? (
          <div className={styles.topNavBarDashboardContainer}>
            {myAddress != undefined &&
              <div className={styles.leftSideButton}>
                <LanguageSelector />
                <div className={styles.myAddress}>
                  {myAddress}
                </div>
                <ChangeWalletButton setMyAddress={setMyAddress!} />
                <DisconnectWalletButton setMyAddress={setMyAddress!} />
              </div>
            }
            <div className={styles.rightSideButtons}>
              <CreateSVLButton />
              <HelpButton />
            </div>
          </div>
        ) : (
          <div className={styles.topNavBarDataContainer}>
            <GoBackButton />
            {editMode == false ? (
              <div className={styles.alwaysVisibleButtons}>
                {ownershipSummary!.length > 0 &&
                  <OwnershipSummaryButton ownershipSummary={ownershipSummary!} />
                }
                <ViewTypeButton viewType={viewType!} setViewType={setViewType!} />
                {mySVL == true && viewType == 0 &&
                  <EditModeButton editMode={editMode} setEditMode={setEditMode!} />
                }
                {newSVL &&
                  <div className={styles.mintPrice}>
                     <div>{mintPrice}</div> <div className={styles.tezosLogo}><TezosLogo /></div>
                  </div>
                }
                {!mySVL && !canBuy &&
                  <RequestSVLButton svl_pk={svl_pk!} state={state} />
                }
                {!mySVL && canBuy &&
                  <BuySVLButton svl_pk={svl_pk!} />
                }
                <HelpButton />
              </div>
            ) : (
              <div className={styles.rightSideButtons}>
                {ownershipSummary!.length > 0 &&
                  <OwnershipSummaryButton ownershipSummary={ownershipSummary!} />
                }
                <ViewTypeButton viewType={viewType!} setViewType={setViewType!} />
                {selectedOwner! >= numPreviousOwners! && viewType == 0 && <EditModeButton editMode={editMode!} setEditMode={setEditMode!} />}
                {selectedOwner! >= numPreviousOwners! && viewType == 0 && <UploadJSONButton selectedOwner={selectedOwner!} numPreviousOwners={numPreviousOwners!}
                  generalInformation={generalInformation!} setGeneralInformation={setGeneralInformation!} 
                  setMaintenances={setMaintenances!} setModifications={setModifications!}
                  setDefects={setDefects!} setRepairs={setRepairs!}
                  jsonUploaded={jsonUploaded} setJsonUploaded={setJsonUploaded}
                />}
                {selectedOwner! >= numPreviousOwners! && viewType == 0 && <DownloadJSONButton selectedOwner={selectedOwner!} numPreviousOwners={numPreviousOwners!} 
                  generalInformation={generalInformation!} maintenances={maintenances!} modifications={modifications!} defects={defects!} repairs={repairs!}
                />}
                {selectedOwner! >= numPreviousOwners! && newSVL == true && viewType == 0 && 
                  <div className={styles.mintPriceContainer}>
                    {viewType == 0 && <MintSVLButton numPreviousOwners={numPreviousOwners!} totalOwners={totalOwners!} generalInformation={generalInformation!} 
                      maintenances={maintenances!} modifications={modifications!} defects={defects!} repairs={repairs!} 
                    />}
                    <div className={styles.mintPrice}>
                      <div>{mintPrice}</div> <div className={styles.tezosLogo}><TezosLogo /></div>
                    </div>
                  </div>
                }
                {selectedOwner! >= numPreviousOwners! && newSVL == false && viewType == 0 &&
                  <EditSVLButton numPreviousOwners={numPreviousOwners!} totalOwners={totalOwners!} generalInformation={generalInformation!} 
                    maintenances={maintenances!} modifications={modifications!} defects={defects!} repairs={repairs!} svl_pk={svl_pk!} 
                  />
                } 
                <HelpButton />
              </div>
            )}
          </div>
        )}
    </div>
  );
}

export default TopNavBar;