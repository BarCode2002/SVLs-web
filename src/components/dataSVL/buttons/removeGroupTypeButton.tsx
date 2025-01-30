import { SetStateAction } from 'react';
import styles from '../../../styles/components/dataSVL/buttons/dataSVLButtons.module.css';

type RemoveGroupTypeButtonProps = {
  dataSVL: any;
  setDataSVL: React.Dispatch<SetStateAction<any>>;
  selectedOwner: number;
  selectedGroup: number;
  type: string;
};

const RemoveGroupTypeButton = ({ dataSVL, setDataSVL, selectedOwner, selectedGroup, type }: RemoveGroupTypeButtonProps): JSX.Element => {

  const handleRemoveGroupType = () => {
    const numGroupTypes = dataSVL[selectedOwner].group[selectedGroup][type];
    if (numGroupTypes > 1) {
      const updateSVLdata = [...dataSVL];
      updateSVLdata[selectedOwner].group[selectedGroup][type] = numGroupTypes - 1;
      setDataSVL(updateSVLdata);
    }
  }

  return (
    <div>
      <button
        className={styles.button}
        onClick={handleRemoveGroupType}>
        -
      </button>
    </div>
  );
}

export default RemoveGroupTypeButton;