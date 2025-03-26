import styles from '../../../styles/components/dataSVL/readOnlyFields/componentsContainer.module.css';

type ComponentsContainerProps = {
  fieldLabel: string;
  components: string[];
}

const ComponentsContainer = ({ fieldLabel, components }: ComponentsContainerProps) => {

  return (
    <div className={styles.componentsContainer}>
      <div className={styles.fieldLabel}>
        {fieldLabel}
      </div>
      <div className={styles.components}>
        {components.filter(url => url != '').map((component, index) => (
          <div key={index} className={styles.components}>
            {component} {index+1 < components.filter(component => component != '').length && '/'}
          </div>
        ))}
        {components.filter(url => url != '').length == 0 &&
          <div>-</div>
        }
      </div>
    </div>
  );
};

export default ComponentsContainer;