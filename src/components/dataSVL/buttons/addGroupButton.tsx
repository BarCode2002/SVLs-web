import { SetStateAction } from 'react';
import styles from '../../../styles/components/dataSVL/buttons/dataSVLButtons.module.css';
import { PHOTOGRAPHS_SIZE, COMPONENTS_SIZE, DEFECTS_REPAIRED_SIZE } from '../../../utils/constants';
import { Maintenances, Modifications, Defects, Repairs } from '../../../utils/interfaces';

type AddGroupButtonProps = {
  setDataSVL: React.Dispatch<SetStateAction<any>>;
  selectedOwner: number;
  type: string;
  editMode: boolean;
};

const AddGroupButton = ({ setDataSVL, selectedOwner, type, editMode }: AddGroupButtonProps): JSX.Element => {

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
                  kilometers: ['', 'km'],
                  name: "",
                  responsible: [null, "", null, ""],
                  pre: Array.from({ length: PHOTOGRAPHS_SIZE }, () => ''),
                  post: Array.from({ length: PHOTOGRAPHS_SIZE }, () => ''),
                  type: Array.from({ length: 1 }, () => ({
                    name: "",
                    components: Array.from({ length: COMPONENTS_SIZE }, () => ''),
                    numComponents: 0,
                    pre: Array.from({ length: PHOTOGRAPHS_SIZE }, () => ''),
                    post: Array.from({ length: PHOTOGRAPHS_SIZE }, () => ''),
                    comments: "",
                    shrinked: false,
                  })),
                  shrinked: false,
                },
              ],
            }
          : item
      )
    );
  }

  const addModificationGroup = () => {
    setDataSVL((prevDataSVL: Modifications[]) =>
      prevDataSVL.map((item, index) =>
        index == selectedOwner
          ? {
              ...item,
              group: [
                ...item.group,
                {
                  date: "",
                  kilometers: ['', 'km'],
                  name: "",
                  responsible: [null, "", null, ""],
                  pre: Array.from({ length: PHOTOGRAPHS_SIZE }, () => ''),
                  post: Array.from({ length: PHOTOGRAPHS_SIZE }, () => ''),
                  type: Array.from({ length: 1 }, () => ({
                    name: "",
                    components: Array.from({ length: COMPONENTS_SIZE }, () => ''),
                    numComponents: 0,
                    pre: Array.from({ length: PHOTOGRAPHS_SIZE }, () => ''),
                    post: Array.from({ length: PHOTOGRAPHS_SIZE }, () => ''),
                    comments: "",
                    shrinked: false,
                  })),
                  shrinked: false,
                },
              ],
            }
          : item
      )
    );
  }

  const addDefectGroup = () => {
    setDataSVL((prevDataSVL: Defects[]) =>
      prevDataSVL.map((item, index) =>
        index == selectedOwner
          ? {
              ...item,
              group: [
                ...item.group,
                {
                  date: "",
                  kilometers: ['', 'km'],
                  cause: "",
                  type: Array.from({ length: 1 }, () => ({
                    level: 'DataSVL.Forms.level',
                    photographs: Array.from({ length: PHOTOGRAPHS_SIZE }, () => ''),
                    description: "",
                    shrinked: false,
                  })),
                  shrinked: false,
                },
              ],
            }
          : item
      )
    );
  }

  const addRepairGroup = () => {
    setDataSVL((prevDataSVL: Repairs[]) =>
      prevDataSVL.map((item, index) =>
        index == selectedOwner
          ? {
              ...item,
              group: [
                ...item.group,
                {
                  date: "",
                  kilometers: ['', 'km'],
                  name: "",
                  responsible: [null, "", null, ""],
                  pre: Array.from({ length: PHOTOGRAPHS_SIZE }, () => ''),
                  post: Array.from({ length: PHOTOGRAPHS_SIZE }, () => ''),
                  defectsRepaired: Array.from({ length: DEFECTS_REPAIRED_SIZE }, () => ([-1, -1, -1 ])),
                  numDefectsRepaired: 0,
                  type: Array.from({ length: 1 }, () => ({
                    name: "",
                    components: Array.from({ length: COMPONENTS_SIZE }, () => ''),
                    numComponents: 0,
                    pre: Array.from({ length: PHOTOGRAPHS_SIZE }, () => ''),
                    post: Array.from({ length: PHOTOGRAPHS_SIZE }, () => ''),
                    comments: "",
                    shrinked: false,
                  })),
                  shrinked: false,
                },
              ],
            }
          : item
      )
    );
  }

  const handleAddGroup = () => {
    if (type == 'maintenances') addMaintenanceGroup();
    else if (type == 'modifications') addModificationGroup();
    else if (type == 'defects') addDefectGroup();
    else addRepairGroup();
  }

  return (
    <div>
      <button
        className={styles.addGroupButton}
        onClick={handleAddGroup}
        disabled={!editMode}>
        +
      </button>
    </div>
  );
}

export default AddGroupButton;