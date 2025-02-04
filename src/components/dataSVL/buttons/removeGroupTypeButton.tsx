import { SetStateAction } from 'react';
import styles from '../../../styles/components/dataSVL/buttons/dataSVLButtons.module.css';
import { Maintenances } from '../../../utils/dataSVL';

type RemoveGroupTypeButtonProps = {
  setDataSVL: React.Dispatch<SetStateAction<any>>;
  selectedOwner: number;
  selectedGroup: number;
  selectedGroupType: number;
};

const RemoveGroupTypeButton = ({ setDataSVL, selectedOwner, selectedGroup, selectedGroupType }: RemoveGroupTypeButtonProps): JSX.Element => {

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
                      numTypes: groupItem.numTypes - 1, 
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
        onClick={handleRemoveGroupType}>
        -
      </button>
    </div>
  );
}

export default RemoveGroupTypeButton;