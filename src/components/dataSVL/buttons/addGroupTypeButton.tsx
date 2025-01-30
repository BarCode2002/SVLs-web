import { SetStateAction } from 'react';
import styles from '../../../styles/components/dataSVL/buttons/dataSVLButtons.module.css';
import { PHOTOGRAPHS_SIZE } from '../../../utils/constants/constants';

type AddGroupTypeButtonProps = {
  dataSVL: any;
  setDataSVL: React.Dispatch<SetStateAction<any>>;
  selectedOwner: number;
  selectedGroup: number;
  type: string;
};

const AddGroupTypeButton = ({ dataSVL, setDataSVL, selectedOwner, selectedGroup, type }: AddGroupTypeButtonProps): JSX.Element => {

  const handleAddGroupType = () => {
    const numGroupTypes = dataSVL[selectedOwner].group[selectedGroup][type];
    if (numGroupTypes < PHOTOGRAPHS_SIZE) {
      const updateSVLdata = [...dataSVL];
      updateSVLdata[selectedOwner].group[selectedGroup][type] = numGroupTypes + 1;
      setDataSVL(updateSVLdata);
    }
  }

  return (
    <div>
      <button
        className={styles.button}
        onClick={handleAddGroupType}>
        +
      </button>
    </div>
  );
}

export default AddGroupTypeButton;