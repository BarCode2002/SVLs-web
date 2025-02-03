import { SetStateAction } from 'react';
import styles from '../../styles/components/dataSVL/typeSVL.module.css';
import { Modifications } from '../../utils/interfaces/dataSVL.ts';

type ModificationsSVLProps = {
  selectedOwner: number;
  modifications: Modifications[];
  setModifications: React.Dispatch<SetStateAction<Modifications[]>>;
};

const ModificationsSVL = ({ selectedOwner, modifications, setModifications }: ModificationsSVLProps): JSX.Element => {

  return (
    <div className={styles.typeSVLContainer}>
      <div className={styles.title}>
        Modifications
      </div>
    </div>
  );
}

export default ModificationsSVL;