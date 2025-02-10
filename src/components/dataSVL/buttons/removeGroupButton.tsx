import { SetStateAction } from 'react';
import styles from '../../../styles/components/dataSVL/buttons/dataSVLButtons.module.css';
import { Maintenances, Modifications, Defects, Repairs } from '../../../utils/interfaces';

type RemoveGroupButtonProps = {
  setDataSVL: React.Dispatch<SetStateAction<any>>;
  selectedOwner: number;
  selectedGroup: number;
  editMode: boolean;
};

const RemoveGroupButton = ({ setDataSVL, selectedOwner, selectedGroup, editMode }: RemoveGroupButtonProps): JSX.Element => {


  const handleRemoveGroup = () => {
    setDataSVL((prevDataSVL: Maintenances[] | Modifications[] | Defects[] | Repairs[]) =>
      prevDataSVL.map((item, index) =>
        index === selectedOwner
          ? {
              ...item,
              group: item.group.filter((_, i) => i !== selectedGroup),
            }
          : item
      )
    );
  }

  return (
    <div>
      <button
        className={styles.removeGroupButton}
        onClick={handleRemoveGroup}
        disabled={!editMode}>
        -
      </button>
    </div>
  );
}

export default RemoveGroupButton;