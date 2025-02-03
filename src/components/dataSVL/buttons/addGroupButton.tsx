import { SetStateAction } from 'react';
import styles from '../../../styles/components/dataSVL/buttons/dataSVLButtons.module.css';
import { PHOTOGRAPHS_SIZE, COMPONENTS_SIZE } from '../../../utils/constants/constants';
import { Maintenances } from '../../../utils/interfaces/dataSVL';

type AddGroupButtonProps = {
  setDataSVL: React.Dispatch<SetStateAction<any>>;
  selectedOwner: number;
  type: string;
};

const AddGroupButton = ({ setDataSVL, selectedOwner, type }: AddGroupButtonProps): JSX.Element => {

  const addMaintenanceGroup = () => {
    setDataSVL((prevDataSVL: Maintenances[]) =>
      prevDataSVL.map((item, index) =>
        index == selectedOwner
          ? {
              ...item,
              group: [
                ...item.group,
                {
                  date: "",
                  kilometers: "",
                  name: "",
                  doneBy: [false, "", false, ""],
                  pre: Array.from({ length: PHOTOGRAPHS_SIZE }, () => ''),
                  post: Array.from({ length: PHOTOGRAPHS_SIZE }, () => ''),
                  type: Array.from({ length: 1 }, () => ({
                    name: "",
                    components: Array.from({ length: COMPONENTS_SIZE }, () => ''),
                    numComponents: 1,
                    pre: Array.from({ length: PHOTOGRAPHS_SIZE }, () => ''),
                    post: Array.from({ length: PHOTOGRAPHS_SIZE }, () => ''),
                    comments: "",
                    shrinked: false,
                  })),
                  shrinked: false,
                  numTypes: 1,
                },
              ],
              numGroups: item.numGroups + 1,
            }
          : item
      )
    );
  }

  const handleAddGroup = () => {
    if (type == 'maintenances') addMaintenanceGroup();
  }

  return (
    <div>
      <button
        className={styles.addGroupButton}
        onClick={handleAddGroup}>
        +
      </button>
    </div>
  );
}

export default AddGroupButton;