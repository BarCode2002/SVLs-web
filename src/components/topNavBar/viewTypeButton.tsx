import styles from '../../styles/components/topNavBar/topNavBarButtons.module.css';
import { useTranslation } from "react-i18next";

type ViewTypeButtonProps = {
  viewType: number;
  setViewType: React.Dispatch<React.SetStateAction<number>>;
};

const ViewTypeButton = ({ viewType, setViewType }: ViewTypeButtonProps): JSX.Element => {

  const { t } = useTranslation();
  const ownerView = t('DataSVL.TopBar.ownerView');
  const summaryView = t('DataSVL.TopBar.summaryView');

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