import styles from '../../styles/components/topNavBar/topNavBar.module.css';
import GoBackButton from './goBackButton';
import ViewTypeButton from './viewTypeButton';
import EditModeButton from './editModeButton';
import UploadJSONButton from './uploadJsonButton';
import DownloadJSONButton from './downloadButtonJSON';
import MintSVLButton from './mintSVLButton';
import EditSVLButton from './editSVLButton';

type TopNavBarProps = {
  newSVL: boolean;
  editMode: boolean;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  viewType: number;
  setViewType: React.Dispatch<React.SetStateAction<number>>;
};

const TopNavBar = ({ newSVL, editMode, setEditMode, viewType, setViewType }: TopNavBarProps): JSX.Element => {

  return (
    <div className={styles.topNavBarContainer}>
      <GoBackButton />
      {editMode == false ? (
        <EditModeButton editMode={editMode} setEditMode={setEditMode} />
      ) : (
        <div className={styles.rightSideButtons}>
          <EditModeButton editMode={editMode} setEditMode={setEditMode} />
          <ViewTypeButton viewType={viewType} setViewType={setViewType} />
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
  );
}

export default TopNavBar;