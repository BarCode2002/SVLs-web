import { SetStateAction } from 'react';
import styles from '../../../styles/components/dataSVL/buttons/dataSVLButtons.module.css';
import { PHOTOGRAPHS_SIZE, MMDR_SIZE, COMPONENTS_SIZE } from '../../../utils/constants/constants';
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
                  doneBy: ["", "", false, ""],
                  pre: Array.from({ length: PHOTOGRAPHS_SIZE }, () => ''),
                  post: Array.from({ length: PHOTOGRAPHS_SIZE }, () => ''),
                  maintenance: Array.from({ length: MMDR_SIZE }, () => ({
                    name: "",
                    components: Array.from({ length: COMPONENTS_SIZE }, () => ''),
                    pre: Array.from({ length: PHOTOGRAPHS_SIZE }, () => ''),
                    post: Array.from({ length: PHOTOGRAPHS_SIZE }, () => ''),
                    comments: "",
                    shrinked: false,
                  })),
                  shrinked: false,
                  numMaintenances: 1,
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
        className={styles.button}
        onClick={handleAddGroup}>
        +
      </button>
    </div>
  );
}

export default AddGroupButton;