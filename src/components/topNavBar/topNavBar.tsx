import styles from '../../styles/components/topNavBar/topNavBar.module.css';
import GoBackButton from './goBackButton';
import ViewTypeButton from './viewTypeButton';
import EditModeButton from './editModeButton';
import UploadJSONButton from './uploadJSONButton';
import DownloadJSONButton from './downloadButtonJSON';
import MintSVLButton from './mintSVLButton';
import EditSVLButton from './editSVLButton';
import DisconnectWalletButton from './disconnectWalletButton';
import CreateSVLButton from './createSVLButton';

type TopNavBarProps = {
  page: string;
  newSVL?: boolean;
  editMode?: boolean;
  setEditMode?: React.Dispatch<React.SetStateAction<boolean>>;
  viewType?: number;
  setViewType?: React.Dispatch<React.SetStateAction<number>>;
  myAddress: string | undefined;
  setMyAddress?: React.Dispatch<React.SetStateAction<string | undefined>>;
};

const TopNavBar = ({ page, newSVL, editMode, setEditMode, viewType, setViewType, myAddress, setMyAddress }: TopNavBarProps): JSX.Element => {

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
                <UploadJSONButton />
                <DownloadJSONButton />
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