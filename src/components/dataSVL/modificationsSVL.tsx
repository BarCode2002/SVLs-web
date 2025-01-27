import { SetStateAction } from 'react';
import styles from '../../styles/components/dataSVL/modificationsSVL.module.css';
import { Modifications } from '../../utils/interfaces/dataSVL.ts';

type ModificationsSVLProps = {
  modifications: Modifications[];
  setModifications: React.Dispatch<SetStateAction<Modifications[]>>;
};

const ModificationsSVL = ({ modifications, setModifications }: ModificationsSVLProps): JSX.Element => {

  return (
    <div className={styles.modificationsSVLContainer}>
    </div>
  );
}

export default ModificationsSVL;