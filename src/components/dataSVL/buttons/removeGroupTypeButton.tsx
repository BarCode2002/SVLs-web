import { SetStateAction } from 'react';
import styles from '../../../styles/components/dataSVL/buttons/dataSVLButtons.module.css';
import { Maintenances } from '../../../utils/interfaces';

type RemoveGroupTypeButtonProps = {
  setDataSVL: React.Dispatch<SetStateAction<any>>;
  selectedOwner: number;
  selectedGroup: number;
  selectedGroupType: number;
  editMode: boolean;
};

const RemoveGroupTypeButton = ({ setDataSVL, selectedOwner, selectedGroup, selectedGroupType, editMode }: RemoveGroupTypeButtonProps): JSX.Element => {

  const handleRemoveGroupType = () => {
    setDataSVL((prevDataSVL: Maintenances[]) =>
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
        -
      </button>
    </div>
  );
}

export default RemoveGroupTypeButton;