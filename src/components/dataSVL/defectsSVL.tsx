import { SetStateAction } from 'react';
import styles from '../../styles/components/dataSVL/defectsSVL.module.css';
import { Defects } from '../../utils/interfaces/dataSVL.ts';

type DefectsSVLProps = {
  defects: Defects[];
  setDefects: React.Dispatch<SetStateAction<Defects[]>>;
};

const DefectsSVL = ({ defects, setDefects }: DefectsSVLProps): JSX.Element => {

  return (
    <div className={styles.defectsSVLContainer}>
    </div>
  );
}

export default DefectsSVL;