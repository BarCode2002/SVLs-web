import styles from '../../styles/components/dataSVL/generalInformationSVL.module.css';
import { GeneralInformation } from '../../utils/interfaces.ts';
import { useTranslation } from "react-i18next";

type PrevOwnersGeneralInformationSVLProps = {
  selectedOwner: number;
  prevOwnersGeneralInformation: GeneralInformation[];
};

const PrevOwnersGeneralInformationSVL = ({ selectedOwner, prevOwnersGeneralInformation }: PrevOwnersGeneralInformationSVLProps): JSX.Element => {

  const { t } = useTranslation();

  return (
    <div className={styles.generalInformationSVLContainer}>
      <div className={styles.title}>
        {t('DataSVL.Labels.generalInformation')}
      </div>
      <div className={styles.dataWrapper}>
        <div className={styles.data}>
          
        </div>
      </div>
    </div>
  );
}

export default PrevOwnersGeneralInformationSVL;