import styles from '../../styles/components/dataSVL/typeSVL.module.css';
import { Repairs, Defects } from '../../utils/interfaces.ts';
import { useTranslation } from "react-i18next";

type PrevOwnersRepairsSVLProps = {
  selectedOwner: number;
  prevOwnersRepairs: Repairs[];
};

const PrevOwnersRepairsSVL = ({ selectedOwner, prevOwnersRepairs }: PrevOwnersRepairsSVLProps): JSX.Element => {

  const { t } = useTranslation();
  
  return (
    <div className={styles.typeSVLContainer}>
      <div className={styles.title}>
        {t('DataSVL.Labels.repairs')}
      </div>
    </div>
  );
}

export default PrevOwnersRepairsSVL;