import { SetStateAction } from 'react';
import styles from '../../styles/components/dataSVL/maintenancesSVL.module.css';
import { Maintenances } from '../../utils/interfaces/dataSVL.ts';

type MainteancesSVLProps = {
  selectedOwner: number;
  maintenances: Maintenances[];
  setMaintenances: React.Dispatch<SetStateAction<Maintenances[]>>;
};

const MaintenancesSVL = ({ selectedOwner, maintenances, setMaintenances }: MainteancesSVLProps): JSX.Element => {

  return (
    <div className={styles.maintenancesSVLContainer}>
      <div className={styles.title}>
        Maintenances
      </div>
    </div>
  );
}

export default MaintenancesSVL;