import styles from '../../styles/components/topNavBar/topNavBarButtons.module.css';
import { useTranslation } from "react-i18next";

type EditModeButtonProps = {
  editMode: boolean;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
};

const EditModeButton = ({ editMode, setEditMode }: EditModeButtonProps): JSX.Element => {

  const { t } = useTranslation();
  const enabled = t('DataSVL.TopBar.enterEditMode');
  const disabled = t('DataSVL.TopBar.exitEditMode');

  const handleEditMode = async () => {
    if (editMode == true) setEditMode(false);
    else setEditMode(true);
  };

  return (
    <div>
      <button 
        className={styles.button} 
        onClick={handleEditMode}>
        {editMode ? disabled : enabled}
      </button>
    </div>
  );
};

export default EditModeButton;