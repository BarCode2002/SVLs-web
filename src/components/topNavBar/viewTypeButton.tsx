import styles from '../../styles/components/topNavBar/topNavBarButtons.module.css';

type ViewTypeButtonProps = {
  viewType: number;
  setViewType: React.Dispatch<React.SetStateAction<number>>;
};

const ViewTypeButton = ({ viewType, setViewType }: ViewTypeButtonProps): JSX.Element => {

  const ownerView = 'Owner view';
  const summaryView = 'Summary view';

  const handleEditMode = async () => {
    if (viewType == 0) setViewType(1);
    else setViewType(0);
  };

  return (
    <div>
      <button 
        className={styles.button} 
        onClick={handleEditMode}>
        {viewType ? ownerView : summaryView}
      </button>
    </div>
  );
};

export default ViewTypeButton;