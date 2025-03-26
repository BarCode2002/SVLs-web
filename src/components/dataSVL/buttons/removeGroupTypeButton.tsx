import { SetStateAction } from 'react';
import styles from '../../../styles/components/dataSVL/buttons/dataSVLButtons.module.css';
import { MaintenancesBase, ModificationsBase, DefectsBase, RepairsBase } from '../../../utils/baseTypes';
import { TrashIconBlack } from '../../../assets/trash';

type RemoveGroupTypeButtonProps = {
  setDataSVL: React.Dispatch<SetStateAction<any>>;
  selectedOwner: number;
  selectedGroup: number;
  selectedGroupType: number;
  editMode: boolean;
};

const RemoveGroupTypeButton = ({ setDataSVL, selectedOwner, selectedGroup, selectedGroupType, editMode }: RemoveGroupTypeButtonProps): JSX.Element => {
  
  const handleRemoveGroupType = () => {
    setDataSVL((prevDataSVL: MaintenancesBase[] | ModificationsBase[] | DefectsBase[] | RepairsBase[]) =>
      prevDataSVL.map((item, index) =>
        index === selectedOwner
          ? {
              ...item,
              group: item.group.map((groupItem, gIndex) =>
                gIndex === selectedGroup
                  ? {
                      ...groupItem,
                      type: groupItem.type.filter((_, i) => i !== selectedGroupType), 
                    }
                  : groupItem 
              ),
            }
          : item 
      )
    );
  }

  return (
    <div>
      <button
        className={styles.removeGroupTypeButton}
        onClick={handleRemoveGroupType}
        disabled={!editMode}>
        <TrashIconBlack />
      </button>
    </div>
  );
}

export default RemoveGroupTypeButton;