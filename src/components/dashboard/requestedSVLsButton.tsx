import styles from '../../styles/components/dashboard/filterSVLsButtons.module.css';
import { useTranslation } from "react-i18next";

type RequestedSVLsButtonProps = {
  filterSVLs: number;
  setFilterSVLs: React.Dispatch<number>;
  setSearch: React.Dispatch<boolean>;
  setAppliedFiltersSVLShrinked: React.Dispatch<boolean>;
};

const RequestedSVLsButton = ({ filterSVLs, setFilterSVLs, setSearch, setAppliedFiltersSVLShrinked }: RequestedSVLsButtonProps): JSX.Element => {

  const { t } = useTranslation();

  const handleRequestedSVLs = async () => {
    setFilterSVLs(1);
    localStorage.setItem('filterSVLs', '1');
    setSearch(false);
    setAppliedFiltersSVLShrinked(true);
    localStorage.setItem('fullFilterShrinked', JSON.stringify(true));
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