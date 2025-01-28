import styles from '../../styles/components/topNavBar/topNavBarButtons.module.css';

type EditModeButtonProps = {
  editMode: boolean;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
};

const EditModeButton = ({ editMode, setEditMode }: EditModeButtonProps): JSX.Element => {

  const enabled = 'Enter edit mode';
  const disabled = 'Exit edit mode';

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