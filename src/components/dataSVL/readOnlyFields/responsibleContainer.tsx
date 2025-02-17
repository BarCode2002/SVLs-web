import styles from '../../../styles/components/dataSVL/readOnlyFields/responsibleContainer.module.css';

type ResponsibleContainerProps = {
  fieldLabel: string;
  responsible: [boolean | null, string, boolean | null, string];
}

const ResponsibleContainer = ({ fieldLabel, responsible }: ResponsibleContainerProps) => {

  console.log(responsible);

  return (
    <div className={styles.responsibleContainer}>
      <div className={styles.fieldLabel}>
        {fieldLabel}
      </div>
      {responsible[0] == false ? (
        <div className={styles.responsible}>
          <div>Propietario del vehiculo</div>
          <div>{responsible[2]}</div>
        </div>
      ) : (
        <div className={styles.responsible}>
          <div>Mecanico</div>
          <div>{responsible[1]}</div>
          <div>{responsible[2]}</div>
        </div>
      )}
    </div>
  );
};

export default ResponsibleContainer;


