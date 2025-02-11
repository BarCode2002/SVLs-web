import styles from '../../styles/components/dataSVL/typeSVL.module.css';
import { Defects, Repairs } from '../../utils/interfaces.ts';
import { useTranslation } from "react-i18next";

type PrevOwnersDefectsSVLProps = {
  selectedOwner: number;
  prevOwnersDefects: Defects[];
  prevOwnersRepairs: Repairs[];
  repairs: Repairs[];
};

const PrevOwnersDefectsSVL = ({ selectedOwner, prevOwnersDefects, prevOwnersRepairs, repairs }: PrevOwnersDefectsSVLProps): JSX.Element => {

  const { t } = useTranslation();

  return (
    <div className={styles.typeSVLContainer}>
      <div className={styles.title}>
        {t('DataSVL.Labels.defects')}
      </div>
    </div>
  );
}

export default PrevOwnersDefectsSVL;