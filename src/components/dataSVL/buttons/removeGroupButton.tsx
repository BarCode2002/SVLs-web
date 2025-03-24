import { SetStateAction, useState } from 'react';
import styles from '../../../styles/components/dataSVL/buttons/dataSVLButtons.module.css';
import { MaintenancesBase, ModificationsBase, DefectsBase, RepairsBase } from '../../../utils/baseTypes';
import { TrashIconDarkBronco, TrashIconWhite } from '../../../assets/trash';

type RemoveGroupButtonProps = {
  setDataSVL: React.Dispatch<SetStateAction<any>>;
  selectedOwner: number;
  selectedGroup: number;
  editMode: boolean;
};

const RemoveGroupButton = ({ setDataSVL, selectedOwner, selectedGroup, editMode }: RemoveGroupButtonProps): JSX.Element => {

  const [trashHovered, setTrashHovered] = useState(false);

  const handleRemoveGroup = () => {
    setDataSVL((prevDataSVL: MaintenancesBase[] | ModificationsBase[] | DefectsBase[] | RepairsBase[]) =>
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
        onMouseEnter={() => setTrashHovered(true)}
        onMouseLeave={() => setTrashHovered(false)}
        className={styles.removeGroupButton}
        onClick={handleRemoveGroup}
        disabled={!editMode}>
        {trashHovered ? <TrashIconWhite /> : <TrashIconDarkBronco />}
      </button>
    </div>
  );
}

export default RemoveGroupButton;