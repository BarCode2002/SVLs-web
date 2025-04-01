import { SetStateAction } from "react";
import { MaintenancesBase, ModificationsBase, RepairsBase } from "./baseTypes";
import { MaintenancesBaseSimple, ModificationsBaseSimple, RepairsBaseSimple } from "./baseSimpleTypes";
import { PossibleDefectsJsonVersions } from "./commonTypes";

export const addAndSetMaintenanceGroup = (setMaintenances: React.Dispatch<SetStateAction<any[]>>, selectedOwner: number, maintenanceGroup: any, jsonVersion: string) => {
  if (jsonVersion == 'base') {
    setMaintenances((prevMaintenances: MaintenancesBase[]) =>
      prevMaintenances.map((item, index) =>
        index == selectedOwner
          ? {
              ...item,
              group: [
                ...item.group,
                {
                  date: maintenanceGroup.date,
                  kilometers: maintenanceGroup.kilometers,
                  name: maintenanceGroup.name,
                  responsible: maintenanceGroup.responsible,
                  pre: maintenanceGroup.pre,
                  post: maintenanceGroup.post,
                  element: Array.from({ length: 1 }, () => ({
                    name: maintenanceGroup.element[0].name,
                    components: maintenanceGroup.element[0].components,
                    numComponents: maintenanceGroup.element[0].numComponents,
                    pre: maintenanceGroup.element[0].pre,
                    post: maintenanceGroup.element[0].post,
                    comments: maintenanceGroup.element[0].comments,
                    shrinked: maintenanceGroup.element[0].shrinked,
                  })),
                  shrinked: maintenanceGroup.shrinked,
                },
              ],
            }
          : item
      )
    );
  }
  else if (jsonVersion == 'baseSimple') {
    setMaintenances((prevMaintenances: MaintenancesBaseSimple[]) =>
      prevMaintenances.map((item, index) =>
        index == selectedOwner
          ? {
              ...item,
              group: [
                ...item.group,
                {
                  date: maintenanceGroup.date,
                  kilometers: maintenanceGroup.kilometers,
                  name: maintenanceGroup.name,
                  responsible: maintenanceGroup.responsible,
                  images: maintenanceGroup.post,
                  element: Array.from({ length: 1 }, () => ({
                    name: maintenanceGroup.element[0].name,
                    images: maintenanceGroup.element[0].post,
                    comments: maintenanceGroup.element[0].comments,
                    shrinked: maintenanceGroup.element[0].shrinked,
                  })),
                  shrinked: maintenanceGroup.shrinked,
                },
              ],
            }
          : item
      )
    );
  }
}

export const addAndSetMaintenanceGroupType = (setMaintenances: React.Dispatch<SetStateAction<any>>, selectedOwner: number, selectedGroup: number, maintenanceType: any, jsonVersion: string) => {
  if (jsonVersion == 'base') {
    setMaintenances((prevMaintenances: MaintenancesBase[]) =>
      prevMaintenances.map((item, index) =>
        index == selectedOwner 
          ? {
              ...item,
              group: item.group.map((groupItem, gIndex) =>
                gIndex == selectedGroup 
                  ? {
                      ...groupItem,
                      element: [
                        ...groupItem.element,
                        {
                          name: maintenanceType.name,
                          components: maintenanceType.components,
                          numComponents: maintenanceType.numComponents,
                          pre: maintenanceType.pre,
                          post: maintenanceType.post,
                          comments: maintenanceType.comments,
                          shrinked: maintenanceType.shrinked,
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
    setMaintenances((prevMaintenances: MaintenancesBase[]) =>
      prevMaintenances.map((item, index) =>
        index == selectedOwner 
          ? {
              ...item,
              group: item.group.map((groupItem, gIndex) =>
                gIndex == selectedGroup 
                  ? {
                      ...groupItem,
                      element: [
                        ...groupItem.element,
                        {
                          name: maintenanceType.name,
                          images: maintenanceType.post,
                          comments: maintenanceType.comments,
                          shrinked: maintenanceType.shrinked,
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

export const addAndSetModificationGroup = (setModifications: React.Dispatch<SetStateAction<any>>, selectedOwner: number, modificationGroup: any, jsonVersion: string) => {
  if (jsonVersion == 'base') {
    setModifications((prevModifications: ModificationsBase[]) =>
      prevModifications.map((item, index) =>
        index == selectedOwner
          ? {
              ...item,
              group: [
                ...item.group,
                {
                  date: modificationGroup.date,
                  kilometers: modificationGroup.kilometers,
                  name: modificationGroup.name,
                  responsible: modificationGroup.responsible,
                  pre: modificationGroup.pre,
                  post: modificationGroup.post,
                  element: Array.from({ length: 1 }, () => ({
                    name: modificationGroup.element[0].name,
                    components: modificationGroup.element[0].components,
                    numComponents: modificationGroup.element[0].numComponents,
                    pre: modificationGroup.element[0].pre,
                    post: modificationGroup.element[0].post,
                    comments: modificationGroup.element[0].comments,
                    shrinked: modificationGroup.element[0].shrinked,
                  })),
                  shrinked: modificationGroup.shrinked,
                },
              ],
            }
          : item
      )
    );
  }
  else if (jsonVersion == 'baseSimple') {
    setModifications((prevModifications: ModificationsBaseSimple[]) =>
      prevModifications.map((item, index) =>
        index == selectedOwner
          ? {
              ...item,
              group: [
                ...item.group,
                {
                  date: modificationGroup.date,
                  kilometers: modificationGroup.kilometers,
                  name: modificationGroup.name,
                  responsible: modificationGroup.responsible,
                  images: modificationGroup.post,
                  element: Array.from({ length: 1 }, () => ({
                    name: modificationGroup.element[0].name,
                    images: modificationGroup.element[0].post,
                    comments: modificationGroup.element[0].comments,
                    shrinked: modificationGroup.element[0].shrinked,
                  })),
                  shrinked: modificationGroup.shrinked,
                },
              ],
            }
          : item
      )
    );
  }
}

export const addAndSetModificationGroupType = (setModifications: React.Dispatch<SetStateAction<any>>, selectedOwner: number, selectedGroup: number, modificationType: any, jsonVersion: string) => {
  if (jsonVersion == 'base') {
    setModifications((prevModifications: ModificationsBase[]) =>
      prevModifications.map((item, index) =>
        index == selectedOwner 
          ? {
              ...item,
              group: item.group.map((groupItem, gIndex) =>
                gIndex == selectedGroup 
                  ? {
                      ...groupItem,
                      element: [
                        ...groupItem.element,
                        {
                          name: modificationType.name,
                          components: modificationType.components,
                          numComponents: modificationType.numComponents,
                          pre: modificationType.pre,
                          post: modificationType.post,
                          comments: modificationType.comments,
                          shrinked: modificationType.shrinked,
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
    setModifications((prevModifications: ModificationsBase[]) =>
      prevModifications.map((item, index) =>
        index == selectedOwner 
          ? {
              ...item,
              group: item.group.map((groupItem, gIndex) =>
                gIndex == selectedGroup 
                  ? {
                      ...groupItem,
                      element: [
                        ...groupItem.element,
                        {
                          name: modificationType.name,
                          images: modificationType.post,
                          comments: modificationType.comments,
                          shrinked: modificationType.shrinked,
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

export const addAndSetDefectGroup = (setDefects: React.Dispatch<SetStateAction<any>>, selectedOwner: number, defectGroup: any) => {
  setDefects((prevDefects: PossibleDefectsJsonVersions[]) =>
    prevDefects.map((item, index) =>
      index == selectedOwner
        ? {
            ...item,
            group: [
              ...item.group,
              {
                date: defectGroup.date,
                kilometers: defectGroup.kilometers,
                cause: defectGroup.cause,
                element: Array.from({ length: 1 }, () => ({
                  level: defectGroup.element[0].level,
                  images: defectGroup.element[0].images,
                  description: defectGroup.element[0].description,
                  shrinked: defectGroup.element[0].shrinked,
                })),
                shrinked: defectGroup.shrinked,
              },
            ],
          }
        : item
    )
  );
}

export const addAndSetDefectGroupType = (setDefects: React.Dispatch<SetStateAction<any>>, selectedOwner: number, selectedGroup: number, defectType: any) => {
  setDefects((prevDefects: PossibleDefectsJsonVersions[]) =>
    prevDefects.map((item, index) =>
      index == selectedOwner 
        ? {
            ...item,
            group: item.group.map((groupItem, gIndex) =>
              gIndex == selectedGroup 
                ? {
                    ...groupItem,
                    element: [
                      ...groupItem.element,
                      {
                        level: defectType.level,
                        images: defectType.images,
                        description: defectType.description,
                        shrinked: defectType.shrinked,
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

export const addAndSetRepairGroup = (setRepairs: React.Dispatch<SetStateAction<any>>, selectedOwner: number, repairGroup: any, jsonVersion: string) => {
  if (jsonVersion == 'base') {  
    setRepairs((prevRepairs: RepairsBase[]) =>
      prevRepairs.map((item, index) =>
        index == selectedOwner
          ? {
              ...item,
              group: [
                ...item.group,
                {
                  date: repairGroup.date,
                  kilometers: repairGroup.kilometers,
                  name: repairGroup.name,
                  responsible: repairGroup.responsible,
                  pre: repairGroup.pre,
                  post: repairGroup.post,
                  defectsRepaired: repairGroup.defectsRepaired,
                  numDefectsRepaired: repairGroup.numDefectsRepaired,
                  element: Array.from({ length: 1 }, () => ({
                    name: repairGroup.element[0].name,
                    components: repairGroup.element[0].components,
                    numComponents: repairGroup.element[0].numComponents,
                    pre: repairGroup.element[0].pre,
                    post: repairGroup.element[0].post,
                    comments: repairGroup.element[0].comments,
                    shrinked: repairGroup.element[0].shrinked,
                  })),
                  shrinked: repairGroup.shrinked,
                },
              ],
            }
          : item
      )
    );
  }
  else if (jsonVersion == 'baseSimple') {
    setRepairs((prevRepairs: RepairsBaseSimple[]) =>
      prevRepairs.map((item, index) =>
        index == selectedOwner
          ? {
              ...item,
              group: [
                ...item.group,
                {
                  date: repairGroup.date,
                  kilometers: repairGroup.kilometers,
                  name: repairGroup.name,
                  responsible: repairGroup.responsible,
                  images: repairGroup.post,
                  defectsRepaired: repairGroup.defectsRepaired,
                  numDefectsRepaired: repairGroup.numDefectsRepaired,
                  element: Array.from({ length: 1 }, () => ({
                    name: repairGroup.element[0].name,
                    images: repairGroup.element[0].post,
                    comments: repairGroup.element[0].comments,
                    shrinked: repairGroup.element[0].shrinked,
                  })),
                  shrinked: repairGroup.shrinked,
                },
              ],
            }
          : item
      )
    );
  }
}

export const addAndSetRepairGroupType = (setRepairs: React.Dispatch<SetStateAction<any>>, selectedOwner: number, selectedGroup: number, repairType: any, jsonVersion: string) => {
  if (jsonVersion == 'base') {
    setRepairs((prevRepairs: RepairsBase[]) =>
      prevRepairs.map((item, index) =>
        index == selectedOwner 
          ? {
              ...item,
              group: item.group.map((groupItem, gIndex) =>
                gIndex == selectedGroup 
                  ? {
                      ...groupItem,
                      element: [
                        ...groupItem.element,
                        {
                          name: repairType.name,
                          components: repairType.components,
                          numComponents: repairType.numComponents,
                          pre: repairType.pre,
                          post: repairType.post,
                          comments: repairType.comments,
                          shrinked: repairType.shrinked,
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
    setRepairs((prevRepairs: RepairsBaseSimple[]) =>
      prevRepairs.map((item, index) =>
        index == selectedOwner 
          ? {
              ...item,
              group: item.group.map((groupItem, gIndex) =>
                gIndex == selectedGroup 
                  ? {
                      ...groupItem,
                      element: [
                        ...groupItem.element,
                        {
                          name: repairType.name,
                          images: repairType.post,
                          comments: repairType.comments,
                          shrinked: repairType.shrinked,
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

export const setOwnerSVLDataToEmpty = (selectedOwner: number, setDataSVL: any) => {
  setDataSVL((prevDataSVL: any[]) => 
    prevDataSVL.map((item, index) =>
      index == selectedOwner
        ? {
            group: [],
          }
        : item
    )
  );
} 