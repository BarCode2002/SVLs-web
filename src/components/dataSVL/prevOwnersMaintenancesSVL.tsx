import styles from '../../styles/components/dataSVL/typeSVL.module.css';
import { Maintenances } from '../../utils/interfaces.ts';
import { useTranslation } from "react-i18next";

type PrevOwnersMainteancesSVLProps = {
  selectedOwner: number;
  prevOwnersMaintenances: Maintenances[];
};

const PrevOwnersMaintenancesSVL = ({ selectedOwner, prevOwnersMaintenances }: PrevOwnersMainteancesSVLProps): JSX.Element => {

  const { t } = useTranslation();

  return (
    <div className={styles.typeSVLContainer}>
      <div className={styles.title}>
        {t('DataSVL.Labels.maintenances')}
      </div>
    </div>
  );
}

export default PrevOwnersMaintenancesSVL;