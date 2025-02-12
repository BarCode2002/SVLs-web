import styles from '../../../styles/components/dataSVL/readOnlyFields/responsibleContainer.module.css';

type ResponsibleContainerProps = {
  fieldLabel: string;
  responsible: [boolean | null, string, boolean | null, string];
}

const ResponsibleContainer = ({ fieldLabel, responsible }: ResponsibleContainerProps) => {

  return (
    <div className={styles.responsibleContainer}>
      <div className={styles.fieldLabel}>
        {fieldLabel}
      </div>
      <div className={styles.responsible}>
        {responsible}
      </div>
    </div>
  );
};

export default ResponsibleContainer;


