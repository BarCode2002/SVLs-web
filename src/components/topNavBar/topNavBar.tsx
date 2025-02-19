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
import { GeneralInformation, Maintenances, Modifications, Defects, Repairs } from '../../utils/interfaces';
import { OwnershipSummary } from '../../utils/interfaces';
import { SetStateAction, useEffect, useState } from 'react';
import axios from "axios";

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
};

const TopNavBar = ({ page, newSVL, editMode, setEditMode, viewType, setViewType, myAddress, setMyAddress, selectedOwner, totalOwners, numPreviousOwners, generalInformation, setGeneralInformation, maintenances, setMaintenances, modifications, setModifications, defects, setDefects, repairs, setRepairs, svl_pk, ownershipSummary, mySVL }: TopNavBarProps): JSX.Element => {

  const [mintPrice, setMintPrice] = useState<string>('');

  useEffect(() => {
    const getMintPrice = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:3000/mongo/smartcontract");
        setMintPrice(response.data.mintPrice);
      } catch (error) {
        console.error("Upload failed:", error);
      }
    };
    getMintPrice();
  }, []);

  return (
    <div>
        {page == 'Dashboard' ? (
          <div className={styles.topNavBarDashboardContainer}>
            {myAddress != undefined &&
              <div className={styles.leftSideButton}>
                <div className={styles.myAddress}>
                  {myAddress}
                </div>
                <DisconnectWalletButton setMyAddress={setMyAddress!} />
                <ChangeWalletButton setMyAddress={setMyAddress!} />
              </div>
            }
            <div className={styles.rightSideButtons}>
              <CreateSVLButton />
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
                    {mintPrice} tezos
                  </div>
                }
              </div>
            ) : (
              <div className={styles.rightSideButtons}>
                {ownershipSummary!.length > 0 &&
                  <OwnershipSummaryButton ownershipSummary={ownershipSummary!} />
                }
                <ViewTypeButton viewType={viewType!} setViewType={setViewType!} />
                {viewType == 0 && <EditModeButton editMode={editMode!} setEditMode={setEditMode!} />}
                {viewType == 0 && <UploadJSONButton selectedOwner={selectedOwner!} numPreviousOwners={numPreviousOwners!}
                  generalInformation={generalInformation!} setGeneralInformation={setGeneralInformation!} 
                  setMaintenances={setMaintenances!} setModifications={setModifications!}
                  setDefects={setDefects!} setRepairs={setRepairs!}
                />}
                {viewType == 0 && <DownloadJSONButton selectedOwner={selectedOwner!} numPreviousOwners={numPreviousOwners!} 
                  generalInformation={generalInformation!} maintenances={maintenances!} modifications={modifications!} defects={defects!} repairs={repairs!}
                />}
                {newSVL == true && viewType == 0 && 
                  <div className={styles.mintPriceContainer}>
                    {viewType == 0 && <MintSVLButton numPreviousOwners={numPreviousOwners!} totalOwners={totalOwners!} generalInformation={generalInformation!} 
                      maintenances={maintenances!} modifications={modifications!} defects={defects!} repairs={repairs!} 
                    />}
                    <div className={styles.mintPrice}>
                      {mintPrice} tezos
                    </div>
                  </div>
                }
                {newSVL == false && viewType == 0 &&
                  <EditSVLButton numPreviousOwners={numPreviousOwners!} totalOwners={totalOwners!} generalInformation={generalInformation!} 
                    maintenances={maintenances!} modifications={modifications!} defects={defects!} repairs={repairs!} svl_pk={svl_pk!} 
                  />
                }
              </div>
            )}
          </div>
        )}
    </div>
  );
}

export default TopNavBar;