import { SetStateAction } from "react";
import { GeneralInformation, Maintenances, Modifications, Defects, Repairs } from "./interfaces";

/*export const addAndSetGeneralInformation = (setGeneralInformation: React.Dispatch<SetStateAction<GeneralInformation[]>>, generalInformation: GeneralInformation) => {
    setGeneralInformation((prevGeneralInformation: GeneralInformation[]) => [
      ...prevGeneralInformation,
      {
        VIN: generalInformation.VIN,
        brand: generalInformation.brand,
        model: generalInformation.model,
        year: generalInformation.year,
        kilometers: generalInformation.kilometers,
        mainPhotograph: generalInformation.mainPhotograph,
        state: generalInformation.state,
        photographs: generalInformation.photographs,
        weight: generalInformation.weight,
        color: generalInformation.color,
        engine: generalInformation.engine,
        power: generalInformation.power,
        shift: generalInformation.shift,
        fuel: generalInformation.fuel,
        autonomy: generalInformation.autonomy,
        climate: generalInformation.climate,
        usage: generalInformation.usage,
        storage: generalInformation.storage,
        comments: generalInformation.comments,
      },
    ]);
}*/

export const addAndSetMaintenanceGroup = (setMaintenances: React.Dispatch<SetStateAction<Maintenances[]>>, selectedOwner: number, maintenanceGroup: any) => {
  setMaintenances((prevMaintenances: Maintenances[]) =>
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
                type: Array.from({ length: 1 }, () => ({
                  name: maintenanceGroup.type[0].name,
                  components: maintenanceGroup.type[0].components,
                  numComponents: maintenanceGroup.type[0].numComponents,
                  pre: maintenanceGroup.type[0].pre,
                  post: maintenanceGroup.type[0].post,
                  comments: maintenanceGroup.type[0].comments,
                  shrinked: maintenanceGroup.type[0].shrinked,
                })),
                shrinked: maintenanceGroup.shrinked,
              },
            ],
          }
        : item
    )
  );
}

export const addAndSetMaintenanceGroupType = (setMaintenances: React.Dispatch<SetStateAction<Maintenances[]>>, selectedOwner: number, selectedGroup: number, maintenanceType: any) => {
  setMaintenances((prevMaintenances: Maintenances[]) =>
    prevMaintenances.map((item, index) =>
      index == selectedOwner 
        ? {
            ...item,
            group: item.group.map((groupItem, gIndex) =>
              gIndex == selectedGroup 
                ? {
                    ...groupItem,
                    type: [
                      ...groupItem.type,
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

export const addAndSetModificationGroup = (setModifications: React.Dispatch<SetStateAction<Modifications[]>>, selectedOwner: number, modificationGroup: any) => {
  setModifications((prevModifications: Modifications[]) =>
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
                type: Array.from({ length: 1 }, () => ({
                  name: modificationGroup.type[0].name,
                  components: modificationGroup.type[0].components,
                  numComponents: modificationGroup.type[0].numComponents,
                  pre: modificationGroup.type[0].pre,
                  post: modificationGroup.type[0].post,
                  comments: modificationGroup.type[0].comments,
                  shrinked: modificationGroup.type[0].shrinked,
                })),
                shrinked: modificationGroup.shrinked,
              },
            ],
          }
        : item
    )
  );
}

export const addAndSetModificationGroupType = (setModifications: React.Dispatch<SetStateAction<Modifications[]>>, selectedOwner: number, selectedGroup: number, modificationType: any) => {
  setModifications((prevModifications: Modifications[]) =>
    prevModifications.map((item, index) =>
      index == selectedOwner 
        ? {
            ...item,
            group: item.group.map((groupItem, gIndex) =>
              gIndex == selectedGroup 
                ? {
                    ...groupItem,
                    type: [
                      ...groupItem.type,
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

export const addAndSetDefectGroup = (setDefects: React.Dispatch<SetStateAction<Defects[]>>, selectedOwner: number, defectGroup: any) => {
  setDefects((prevDefects: Defects[]) =>
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
                type: Array.from({ length: 1 }, () => ({
                  level: defectGroup.type[0].level,
                  photographs: defectGroup.type[0].photographs,
                  description: defectGroup.type[0].description,
                  shrinked: defectGroup.type[0].shrinked,
                })),
                shrinked: defectGroup.shrinked,
              },
            ],
          }
        : item
    )
  );
}

export const addAndSetDefectGroupType = (setDefects: React.Dispatch<SetStateAction<Defects[]>>, selectedOwner: number, selectedGroup: number, defectType: any) => {
  setDefects((prevDefects: Defects[]) =>
    prevDefects.map((item, index) =>
      index == selectedOwner 
        ? {
            ...item,
            group: item.group.map((groupItem, gIndex) =>
              gIndex == selectedGroup 
                ? {
                    ...groupItem,
                    type: [
                      ...groupItem.type,
                      {
                        level: defectType.level,
                        photographs: defectType.photographs,
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

export const addAndSetRepairGroup = (setRepairs: React.Dispatch<SetStateAction<Repairs[]>>, selectedOwner: number, repairGroup: any) => {
  setRepairs((prevRepairs: Repairs[]) =>
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
                type: Array.from({ length: 1 }, () => ({
                  name: repairGroup.type[0].name,
                  components: repairGroup.type[0].components,
                  numComponents: repairGroup.type[0].numComponents,
                  pre: repairGroup.type[0].pre,
                  post: repairGroup.type[0].post,
                  comments: repairGroup.type[0].comments,
                  shrinked: repairGroup.type[0].shrinked,
                })),
                shrinked: repairGroup.shrinked,
              },
            ],
          }
        : item
    )
  );
}

export const addAndSetRepairGroupType = (setRepairs: React.Dispatch<SetStateAction<Repairs[]>>, selectedOwner: number, selectedGroup: number, repairType: any) => {
  setRepairs((prevRepairs: Repairs[]) =>
    prevRepairs.map((item, index) =>
      index == selectedOwner 
        ? {
            ...item,
            group: item.group.map((groupItem, gIndex) =>
              gIndex == selectedGroup 
                ? {
                    ...groupItem,
                    type: [
                      ...groupItem.type,
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
