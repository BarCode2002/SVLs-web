import styles from '../../styles/components/topNavBar/topNavBar.module.css';
import GoBackButton from './goBackButton';
import ViewTypeButton from './viewTypeButton';
import EditModeButton from './editModeButton';
import UploadJSONButton from './uploadJSONButton';
import DownloadJSONButton from './downloadJSONButton';
import MintSVLButton from './mintSVLButton';
import EditSVLButton from './editSVLButton';
import DisconnectWalletButton from './disconnectWalletButton';
import CreateSVLButton from './createSVLButton';
import { GeneralInformation, Maintenances, Modifications, Defects, Repairs } from '../../utils/dataSVL';
import { SetStateAction } from 'react';

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
};

const TopNavBar = ({ page, newSVL, editMode, setEditMode, viewType, setViewType, myAddress, setMyAddress, selectedOwner, generalInformation, setGeneralInformation, maintenances, setMaintenances, modifications, setModifications, defects, setDefects, repairs, setRepairs }: TopNavBarProps): JSX.Element => {

  return (
    <div>
        {page == 'Dashboard' ? (
          <div className={styles.topNavBarDashboardContainer}>
            {myAddress != undefined &&
              <DisconnectWalletButton setMyAddress={setMyAddress!} />
            }
            <div className={styles.rightSideButtons}>
              <CreateSVLButton />
            </div>
          </div>
        ) : (
          <div className={styles.topNavBarDataContainer}>
            <GoBackButton />
            {editMode == false ? (
              <EditModeButton editMode={editMode} setEditMode={setEditMode!} />
            ) : (
              <div className={styles.rightSideButtons}>
                <EditModeButton editMode={editMode!} setEditMode={setEditMode!} />
                <ViewTypeButton viewType={viewType!} setViewType={setViewType!} />
                <UploadJSONButton selectedOwner={selectedOwner!}
                  generalInformation={generalInformation!} setGeneralInformation={setGeneralInformation!} 
                  maintenances={maintenances!} setMaintenances={setMaintenances!}
                  modifications={modifications!} setModifications={setModifications!}
                  defects={defects!} setDefects={setDefects!}
                  repairs={repairs!} setRepairs={setRepairs!}
                />
                <DownloadJSONButton selectedOwner={selectedOwner!} generalInformation={generalInformation!} 
                  maintenances={maintenances!} modifications={modifications!} defects={defects!} repairs={repairs!}
                />
                {newSVL == true ? (
                  <MintSVLButton />
                ) : (
                  <EditSVLButton />
                )}
              </div>
            )}
          </div>
        )}
    </div>
  );
}

export default TopNavBar;