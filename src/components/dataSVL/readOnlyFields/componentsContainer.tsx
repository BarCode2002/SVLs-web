import styles from '../../../styles/components/dataSVL/readOnlyFields/componentsContainer.module.css';

type ComponentsContainerProps = {
  fieldLabel: string;
  numComponents: number;
  components: string[];
}

const ComponentsContainer = ({ fieldLabel, numComponents, components }: ComponentsContainerProps) => {

  return (
    <div className={styles.componentsContainer}>
      <div className={styles.fieldLabel}>
        {fieldLabel}
      </div>
      {Array.from({ length: numComponents }).map((_, componentIndex) => (
        <div key={componentIndex} className={styles.components}>
          {components[componentIndex]}
        </div>
      ))}
    </div>
  );
};

export default ComponentsContainer;


