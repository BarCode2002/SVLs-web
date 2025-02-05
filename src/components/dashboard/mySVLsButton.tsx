import styles from '../../styles/components/dashboard/filterSVLsButtons.module.css';
import { useTranslation } from "react-i18next";

type MySVLsButtonProps = {
  filterSVLs: number;
  setFilterSVLs: React.Dispatch<number>;
};

const MySVLsButton = ({ filterSVLs, setFilterSVLs }: MySVLsButtonProps): JSX.Element => {

  const { t } = useTranslation();

  const handleMySVLs = async () => {
    setFilterSVLs(0);
  };

  return (
    <div>
      <button
        className={filterSVLs == 0 ? styles.buttonSelected : styles.button}
        onClick={handleMySVLs}>
        {t('Dashboard.Labels.mySVLs')}
      </button>
    </div>
  );
}

export default MySVLsButton;