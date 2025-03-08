import styles from '../../styles/components/dashboard/filterSVLsButtons.module.css';
import { useTranslation } from "react-i18next";

type MySVLsButtonProps = {
  filterSVLs: number;
  setFilterSVLs: React.Dispatch<number>;
  setSearch: React.Dispatch<boolean>;
  setAppliedFiltersSVLShrinked: React.Dispatch<boolean>;
};

const MySVLsButton = ({ filterSVLs, setFilterSVLs, setSearch, setAppliedFiltersSVLShrinked }: MySVLsButtonProps): JSX.Element => {

  const { t } = useTranslation();

  const handleMySVLs = async () => {
    setFilterSVLs(0);
    localStorage.setItem('filterSVLs', '0');
    setSearch(false);
    setAppliedFiltersSVLShrinked(true);
    localStorage.setItem('fullFilterShrinked', JSON.stringify(true));
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