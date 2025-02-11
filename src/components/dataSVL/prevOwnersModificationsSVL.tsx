import styles from '../../styles/components/dataSVL/typeSVL.module.css';
import { Modifications } from '../../utils/interfaces.ts';
import { useTranslation } from "react-i18next";

type PrevOwnersModificationsSVLProps = {
  selectedOwner: number;
  prevOwnersModifications: Modifications[];
};

const PrevOwnersModificationsSVL = ({ selectedOwner, prevOwnersModifications }: PrevOwnersModificationsSVLProps): JSX.Element => {

  const { t } = useTranslation();

  return (
    <div className={styles.typeSVLContainer}>
      <div className={styles.title}>
        {t('DataSVL.Labels.modifications')}
      </div>
    </div>
  );
}

export default PrevOwnersModificationsSVL;