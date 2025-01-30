import { SetStateAction } from 'react';
import styles from '../../../styles/components/dataSVL/buttons/dataSVLButtons.module.css';
import { Maintenances } from '../../../utils/interfaces/dataSVL';

type RemoveGroupButtonProps = {
  setDataSVL: React.Dispatch<SetStateAction<any>>;
  selectedOwner: number;
  selectedGroup: number;
  type: string;
};

const RemoveGroupButton = ({ setDataSVL, selectedOwner, selectedGroup, type }: RemoveGroupButtonProps): JSX.Element => {

  const removeMaintenanceGroup = () => {
    setDataSVL((prevDataSVL: Maintenances[]) =>
      prevDataSVL.map((item, index) =>
        index === selectedOwner
          ? {
              ...item,
              group: item.group.filter((_, i) => i !== selectedGroup),
              numGroups: item.numGroups - 1,
            }
          : item
      )
    );
  }

  const handleRemoveGroup = () => {
    if (type == 'maintenances') removeMaintenanceGroup();
  }

  return (
    <div>
      <button
        className={styles.button}
        onClick={handleRemoveGroup}>
        -
      </button>
    </div>
  );
}

export default RemoveGroupButton;