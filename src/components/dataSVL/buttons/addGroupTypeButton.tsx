import { SetStateAction } from 'react';
import styles from '../../../styles/components/dataSVL/buttons/dataSVLButtons.module.css';
import { PHOTOGRAPHS_SIZE, COMPONENTS_SIZE } from '../../../utils/constants';
import { MaintenancesBase, ModificationsBase, RepairsBase } from '../../../utils/baseTypes';
import { useTranslation } from "react-i18next";
import { MaintenancesBaseSimple, ModificationsBaseSimple, RepairsBaseSimple } from '../../../utils/baseSimpleTypes';
import { PossibleDefectsJsonVersions } from '../../../utils/commonTypes';

type AddGroupTypeButtonProps = {
  setDataSVL: React.Dispatch<SetStateAction<any>>;
  selectedOwner: number;
  selectedGroup: number;
  type: string;
  editMode: boolean;
  jsonVersion: string;
};

const AddGroupTypeButton = ({ setDataSVL, selectedOwner, selectedGroup, type, editMode, jsonVersion }: AddGroupTypeButtonProps): JSX.Element => {

  const { t } = useTranslation();

  const addMaintenanceGroupType = () => {
    if (jsonVersion == 'base') {
      setDataSVL((prevDataSVL: MaintenancesBase[]) =>
        prevDataSVL.map((item, index) =>
          index === selectedOwner 
            ? {
                ...item,
                group: item.group.map((groupItem, gIndex) =>
                  gIndex == selectedGroup 
                    ? {
                        ...groupItem,
                        type: [
                          ...groupItem.type,
                          {
                            name: "",
                            components: Array.from({ length: COMPONENTS_SIZE }, () => ""),
                            numComponents: 0,
                            pre: Array.from({ length: PHOTOGRAPHS_SIZE }, () => ""),
                            post: Array.from({ length: PHOTOGRAPHS_SIZE }, () => ""),
                            comments: "",
                            shrinked: false,
                          },
                        ],
                      }
                    : groupItem 
                ),
              }
            : item 
        )
      );
    }
    else if (jsonVersion == 'baseSimple') {
      setDataSVL((prevDataSVL: MaintenancesBaseSimple[]) =>
        prevDataSVL.map((item, index) =>
          index === selectedOwner 
            ? {
                ...item,
                group: item.group.map((groupItem, gIndex) =>
                  gIndex == selectedGroup 
                    ? {
                        ...groupItem,
                        type: [
                          ...groupItem.type,
                          {
                            name: "",                            
                            images: Array.from({ length: PHOTOGRAPHS_SIZE }, () => ""),
                            comments: "",
                            shrinked: false,
                          },
                        ],
                      }
                    : groupItem 
                ),
              }
            : item 
        )
      );
    }
  }

  const addModificationGroupType = () => {
    if (jsonVersion == 'base') {
      setDataSVL((prevDataSVL: ModificationsBase[]) =>
        prevDataSVL.map((item, index) =>
          index == selectedOwner 
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
                            components: Array.from({ length: COMPONENTS_SIZE }, () => ''),
                            numComponents: 0,
                            pre: Array.from({ length: PHOTOGRAPHS_SIZE }, () => ''),
                            post: Array.from({ length: PHOTOGRAPHS_SIZE }, () => ''),
                            comments: "",
                            shrinked: false,
                          },
                        ],
                      }
                    : groupItem 
                ),
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
                group: item.group.map((groupItem, gIndex) =>
                  gIndex === selectedGroup 
                    ? {
                        ...groupItem,
                        type: [
                          ...groupItem.type,
                          {
                            name: "",
                            images: Array.from({ length: PHOTOGRAPHS_SIZE }, () => ''),
                            comments: "",
                            shrinked: false,
                          },
                        ],
                      }
                    : groupItem 
                ),
              }
            : item 
        )
      );
    }
  }

  const addDefectGroupType = () => {
    setDataSVL((prevDataSVL: PossibleDefectsJsonVersions[]) =>
      prevDataSVL.map((item, index) =>
        index == selectedOwner 
          ? {
              ...item,
              group: item.group.map((groupItem, gIndex) =>
                gIndex === selectedGroup 
                  ? {
                      ...groupItem,
                      type: [
                        ...groupItem.type,
                        {
                          level: t('DataSVL.Forms.level'),
                          images: Array.from({ length: PHOTOGRAPHS_SIZE }, () => ''),
                          description: "",
                          shrinked: false,
                        },
                      ],
                    }
                  : groupItem 
              ),
            }
          : item 
      )
    );
  }

  const addRepairGroupType = () => {
    if (jsonVersion == 'base') {
      setDataSVL((prevDataSVL: RepairsBase[]) =>
        prevDataSVL.map((item, index) =>
          index == selectedOwner 
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
                            components: Array.from({ length: COMPONENTS_SIZE }, () => ''),
                            numComponents: 0,
                            pre: Array.from({ length: PHOTOGRAPHS_SIZE }, () => ''),
                            post: Array.from({ length: PHOTOGRAPHS_SIZE }, () => ''),
                            comments: "",
                            shrinked: false,
                          },
                        ],
                      }
                    : groupItem 
                ),
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
                group: item.group.map((groupItem, gIndex) =>
                  gIndex === selectedGroup 
                    ? {
                        ...groupItem,
                        type: [
                          ...groupItem.type,
                          {
                            name: "",
                            images: Array.from({ length: PHOTOGRAPHS_SIZE }, () => ''),
                            comments: "",
                            shrinked: false,
                          },
                        ],
                      }
                    : groupItem 
                ),
              }
            : item 
        )
      );
    }
  }

  const handleAddGroupType = () => {
    if (type == 'maintenance') addMaintenanceGroupType();
    else if (type == 'modification') addModificationGroupType();
    else if (type == 'defect') addDefectGroupType();
    else addRepairGroupType();
  }

  return (
    <div>
      <button
        className={styles.addGroupTypeButton}
        onClick={handleAddGroupType}
        disabled={!editMode}>
        +
      </button>
    </div>
  );
}

export default AddGroupTypeButton;