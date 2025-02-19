import styles from '../../../styles/components/dataSVL/readOnlyFields/defectsRepairedContainer.module.css';
import { useTranslation } from "react-i18next";


type DefectsRepairedContainerProps = {
  fieldLabel: string;
  numDefectsRepaired: number;
  defectsRepaired: [number, number, number][];
}

const DefectsRepairedContainer = ({ fieldLabel, numDefectsRepaired, defectsRepaired }: DefectsRepairedContainerProps) => {

  const { t } = useTranslation();

  return (
    <div className={styles.defectsRepairedContainer}>
      <div className={styles.fieldLabel}>
        {fieldLabel}
      </div>
      <div className={styles.defectsRepaired}>
        {numDefectsRepaired > 0 && defectsRepaired.filter(repair => repair[0] != -1 && repair[1] != -1 && repair[2] != -1).map((_, defectRepairedIndex) => (
          <div key={defectRepairedIndex} className={styles.defectRepaired}>       
            <div className={styles.ownerPart}>
              {t('DataSVL.Placeholders.owner')} {defectsRepaired[defectRepairedIndex][0]+1}
            </div>
            <div className={styles.groupPart}>
              {t('DataSVL.Placeholders.groupDefect')} {defectsRepaired[defectRepairedIndex][1]+1}
            </div>
            {defectsRepaired[defectRepairedIndex][2] == -2 && 
              <div className={styles.defectPart}>
                {t('DataSVL.Placeholders.allDefects')}
              </div>
            }
            {defectsRepaired[defectRepairedIndex][2] != -2 && defectsRepaired[defectRepairedIndex][2] != -1 &&
              <div className={styles.defectPart}>
                {t('DataSVL.Placeholders.defect')} {defectsRepaired[defectRepairedIndex][2]+1}
              </div>
            }
          </div>
        ))}
      </div>
      {numDefectsRepaired == 0 &&
        <div className={styles.defectRepaired}>
          -
        </div>
      }
    </div>
  );
};

export default DefectsRepairedContainer;


