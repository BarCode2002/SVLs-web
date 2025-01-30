import { SetStateAction } from 'react';
import styles from '../../../styles/components/dataSVL/buttons/dataSVLButtons.module.css';
import { Maintenances } from '../../../utils/interfaces/dataSVL';

type RemoveGroupTypeButtonProps = {
  setDataSVL: React.Dispatch<SetStateAction<any>>;
  selectedOwner: number;
  selectedGroup: number;
  selectedGroupType: number;
  type: string;
};

const RemoveGroupTypeButton = ({ setDataSVL, selectedOwner, selectedGroup, selectedGroupType, type }: RemoveGroupTypeButtonProps): JSX.Element => {

  const removeMaintenanceGroupType = () => {
    setDataSVL((prevDataSVL: Maintenances[]) =>
      prevDataSVL.map((item, index) =>
        index === selectedOwner
          ? {
              ...item,
              group: item.group.map((groupItem, gIndex) =>
                gIndex === selectedGroup
                  ? {
                      ...groupItem,
                      maintenance: groupItem.maintenance.filter((_, i) => i !== selectedGroupType), 
                      numMaintenances: groupItem.numMaintenances - 1, 
                    }
                  : groupItem 
              ),
            }
          : item 
      )
    );
  }

  const handleRemoveGroupType = () => {
    if (type == 'maintenance') removeMaintenanceGroupType();
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