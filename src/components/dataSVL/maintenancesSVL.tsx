import { SetStateAction } from 'react';
import styles from '../../styles/components/dataSVL/maintenancesSVL.module.css';
import { Maintenances } from '../../utils/interfaces/dataSVL.ts';

type MainteancesSVLProps = {
  maintenances: Maintenances[];
  setMaintenances: React.Dispatch<SetStateAction<Maintenances[]>>;
};

const MaintenancesSVL = ({ maintenances, setMaintenances }: MainteancesSVLProps): JSX.Element => {

  return (
    <div className={styles.maintenancesSVLContainer}>
      
    </div>
  );
}

export default MaintenancesSVL;