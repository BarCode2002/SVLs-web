import styles from '../../../styles/components/dataSVL/readOnlyFields/defectsRepairedContainer.module.css';

type DefectsRepairedContainerProps = {
  fieldLabel: string;
  numDefectsRepaired: number;
  defectsRepaired: [number, number, number][];
}

const DefectsRepairedContainer = ({ fieldLabel, numDefectsRepaired, defectsRepaired }: DefectsRepairedContainerProps) => {

  return (
    <div className={styles.defectsContainer}>
      <div className={styles.fieldLabel}>
        {fieldLabel}
      </div>
      {numDefectsRepaired > 0 && Array.from({ length: numDefectsRepaired }).map((_, defectRepairedIndex) => (
        <div key={defectRepairedIndex} className={styles.defectsRepaired}>
          {defectsRepaired[defectRepairedIndex]}
        </div>
      ))}
      {numDefectsRepaired == 0 &&
        <div className={styles.defectsRepaired}>
          -
        </div>
      }
    </div>
  );
};

export default DefectsRepairedContainer;


