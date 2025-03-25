import { SetStateAction } from 'react';
import styles from '../../../styles/components/dataSVL/buttons/dataSVLButtons.module.css';
import { PHOTOGRAPHS_SIZE, COMPONENTS_SIZE, DEFECTS_REPAIRED_SIZE } from '../../../utils/constants';
import { MaintenancesBase, ModificationsBase, RepairsBase } from '../../../utils/baseTypes';
import { MaintenancesBaseSimple, ModificationsBaseSimple, RepairsBaseSimple } from '../../../utils/baseSimpleTypes';
import { PossibleDefectsJsonVersions } from '../../../utils/commonTypes';

type AddGroupButtonProps = {
  setDataSVL: React.Dispatch<SetStateAction<any>>;
  selectedOwner: number;
  type: string;
  editMode: boolean;
  jsonVersion: string;
};

const AddGroupButton = ({ setDataSVL, selectedOwner, type, editMode, jsonVersion }: AddGroupButtonProps): JSX.Element => {

  const addMaintenanceGroup = () => {
    if (jsonVersion == 'base') {
      setDataSVL((prevDataSVL: MaintenancesBase[]) =>
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
    else if (jsonVersion == 'baseSimple') {
      setDataSVL((prevDataSVL: MaintenancesBaseSimple[]) =>
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
                    images: Array.from({ length: PHOTOGRAPHS_SIZE }, () => ''),
                    type: Array.from({ length: 1 }, () => ({
                      name: "",
                      images: Array.from({ length: PHOTOGRAPHS_SIZE }, () => ''),
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
  }

  const addModificationGroup = () => {
    if (jsonVersion == 'base') {
      setDataSVL((prevDataSVL: ModificationsBase[]) =>
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
    else if (jsonVersion == 'baseSimple') {
      setDataSVL((prevDataSVL: ModificationsBaseSimple[]) =>
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
                    images: Array.from({ length: PHOTOGRAPHS_SIZE }, () => ''),
                    type: Array.from({ length: 1 }, () => ({
                      name: "",
                      images: Array.from({ length: PHOTOGRAPHS_SIZE }, () => ''),
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
  }

  const addDefectGroup = () => {
    setDataSVL((prevDataSVL: PossibleDefectsJsonVersions[]) =>
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
                    images: Array.from({ length: PHOTOGRAPHS_SIZE }, () => ''),
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
    if (jsonVersion == 'base') {
      setDataSVL((prevDataSVL: RepairsBase[]) =>
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
    else if (jsonVersion == 'baseSimple') {
      setDataSVL((prevDataSVL: RepairsBaseSimple[]) =>
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
                    images: Array.from({ length: PHOTOGRAPHS_SIZE }, () => ''),
                    defectsRepaired: Array.from({ length: DEFECTS_REPAIRED_SIZE }, () => ([-1, -1, -1 ])),
                    numDefectsRepaired: 0,
                    type: Array.from({ length: 1 }, () => ({
                      name: "",
                      images: Array.from({ length: PHOTOGRAPHS_SIZE }, () => ''),
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