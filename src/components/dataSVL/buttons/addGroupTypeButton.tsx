import { SetStateAction } from 'react';
import styles from '../../../styles/components/dataSVL/buttons/dataSVLButtons.module.css';
import { PHOTOGRAPHS_SIZE, COMPONENTS_SIZE } from '../../../utils/constants';
import { Maintenances } from '../../../utils/dataSVL';
import { useTranslation } from "react-i18next";

type AddGroupTypeButtonProps = {
  setDataSVL: React.Dispatch<SetStateAction<any>>;
  selectedOwner: number;
  selectedGroup: number;
  type: string;
};

const AddGroupTypeButton = ({ setDataSVL, selectedOwner, selectedGroup, type }: AddGroupTypeButtonProps): JSX.Element => {

  const { t } = useTranslation();

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

  const addModificationGroupType = () => {
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
                          components: Array.from({ length: COMPONENTS_SIZE }, () => ''),
                          numComponents: 1,
                          pre: Array.from({ length: PHOTOGRAPHS_SIZE }, () => ''),
                          post: Array.from({ length: PHOTOGRAPHS_SIZE }, () => ''),
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

  const addDefectGroupType = () => {
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
                          level: t('DataSVL.Forms.level'),
                          photographs: Array.from({ length: PHOTOGRAPHS_SIZE }, () => ''),
                          description: "",
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

  const addRepairGroupType = () => {
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
                          components: Array.from({ length: COMPONENTS_SIZE }, () => ''),
                          numComponents: 1,
                          pre: Array.from({ length: PHOTOGRAPHS_SIZE }, () => ''),
                          post: Array.from({ length: PHOTOGRAPHS_SIZE }, () => ''),
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
    else if (type == 'modification') addModificationGroupType();
    else if (type == 'defect') addDefectGroupType();
    else addRepairGroupType();
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