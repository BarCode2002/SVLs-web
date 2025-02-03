import { SetStateAction } from 'react';
import styles from '../../../styles/components/dataSVL/buttons/dataSVLButtons.module.css';
import { PHOTOGRAPHS_SIZE, COMPONENTS_SIZE } from '../../../utils/constants/constants';
import { Maintenances } from '../../../utils/interfaces/dataSVL';

type AddGroupTypeButtonProps = {
  setDataSVL: React.Dispatch<SetStateAction<any>>;
  selectedOwner: number;
  selectedGroup: number;
  type: string;
};

const AddGroupTypeButton = ({ setDataSVL, selectedOwner, selectedGroup, type }: AddGroupTypeButtonProps): JSX.Element => {

  const addMaintenanceGroupType = () => {
    setDataSVL((prevDataSVL: Maintenances[]) =>
      prevDataSVL.map((item, index) =>
        index === selectedOwner 
          ? {
              ...item,
              group: item.group.map((groupItem, gIndex) =>
                gIndex === selectedGroup 
                  ? {
                      ...groupItem,
                      type: [
                        ...groupItem.type,
                        {
                          name: "",
                          components: Array.from({ length: COMPONENTS_SIZE }, () => ""),
                          numComponents: 1,
                          pre: Array.from({ length: PHOTOGRAPHS_SIZE }, () => ""),
                          post: Array.from({ length: PHOTOGRAPHS_SIZE }, () => ""),
                          comments: "",
                          shrinked: false,
                        },
                      ],
                      numTypes: groupItem.numTypes + 1,
                    }
                  : groupItem 
              ),
            }
          : item 
      )
    );
  }

  const handleAddGroupType = () => {
    if (type == 'maintenance') addMaintenanceGroupType();
  }

  return (
    <div>
      <button
        className={styles.addGroupTypeButton}
        onClick={handleAddGroupType}>
        +
      </button>
    </div>
  );
}

export default AddGroupTypeButton;