import { SetStateAction } from 'react';
import styles from '../../styles/components/dataSVL/defectsSVL.module.css';
import { Defects } from '../../utils/interfaces/dataSVL.ts';

type DefectsSVLProps = {
  selectedOwner: number;
  defects: Defects[];
  setDefects: React.Dispatch<SetStateAction<Defects[]>>;
};

const DefectsSVL = ({ selectedOwner, defects, setDefects }: DefectsSVLProps): JSX.Element => {

  return (
    <div className={styles.defectsSVLContainer}>
      <div className={styles.title}>
        Defects
      </div>
    </div>
  );
}

export default DefectsSVL;