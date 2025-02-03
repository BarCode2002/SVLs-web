import { SetStateAction } from 'react';
import styles from '../../styles/components/dataSVL/typeSVL.module.css';
import { Repairs } from '../../utils/interfaces/dataSVL.ts';

type RepairsSVLProps = {
  selectedOwner: number;
  repairs: Repairs[];
  setRepairs: React.Dispatch<SetStateAction<Repairs[]>>;
};

const RepairsSVL = ({ selectedOwner, repairs, setRepairs }: RepairsSVLProps): JSX.Element => {

  return (
    <div className={styles.typeSVLContainer}>
      <div className={styles.title}>
        Repairs
      </div>
    </div>
  );
}

export default RepairsSVL;