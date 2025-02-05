import styles from '../../styles/components/dashboard/filterSVLsButtons.module.css';
import { useTranslation } from "react-i18next";

type RequestedSVLsButtonProps = {
  filterSVLs: number;
  setFilterSVLs: React.Dispatch<number>;
};

const RequestedSVLsButton = ({ filterSVLs, setFilterSVLs }: RequestedSVLsButtonProps): JSX.Element => {

  const { t } = useTranslation();

  const handleRequestedSVLs = async () => {
    setFilterSVLs(1);
  };

  return (
    <div>
      <button
        className={filterSVLs == 1 ? styles.buttonSelected : styles.button}
        onClick={handleRequestedSVLs}>
        {t('Dashboard.Labels.requestedSVLs')}
      </button>
    </div>
  );
}

export default RequestedSVLsButton;