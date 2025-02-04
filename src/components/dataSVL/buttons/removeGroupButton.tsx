import { SetStateAction } from 'react';
import styles from '../../../styles/components/dataSVL/buttons/dataSVLButtons.module.css';
import { Maintenances, Modifications, Defects, Repairs } from '../../../utils/dataSVL';

type RemoveGroupButtonProps = {
  setDataSVL: React.Dispatch<SetStateAction<any>>;
  selectedOwner: number;
  selectedGroup: number;
};

const RemoveGroupButton = ({ setDataSVL, selectedOwner, selectedGroup }: RemoveGroupButtonProps): JSX.Element => {


  const handleRemoveGroup = () => {
    setDataSVL((prevDataSVL: Maintenances[] | Modifications[] | Defects[] | Repairs[]) =>
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

  return (
    <div>
      <button
        className={styles.removeGroupButton}
        onClick={handleRemoveGroup}>
        -
      </button>
    </div>
  );
}

export default RemoveGroupButton;