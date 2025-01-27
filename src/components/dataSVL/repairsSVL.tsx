import { SetStateAction } from 'react';
import styles from '../../styles/components/dataSVL/repairsSVL.module.css';
import { Repairs } from '../../utils/interfaces/dataSVL.ts';

type RepairsSVLProps = {
  repairs: Repairs[];
  setRepairs: React.Dispatch<SetStateAction<Repairs[]>>;
};

const RepairsSVL = ({ repairs, setRepairs }: RepairsSVLProps): JSX.Element => {

  return (
    <div className={styles.repairsSVLContainer}>
    </div>
  );
}

export default RepairsSVL;