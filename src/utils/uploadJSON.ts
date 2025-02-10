import { SetStateAction } from "react";
import { GeneralInformation, Maintenances, Modifications, Defects, Repairs } from "./interfaces";

export const addAndSetGeneralInformation = async (setGeneralInformation: React.Dispatch<SetStateAction<GeneralInformation[]>>, generalInformation: GeneralInformation) => {
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
  }

export const addAndSetMaintenanceGroup = (setMaintenances: React.Dispatch<SetStateAction<Maintenances[]>>, selectedOwner: number, date: string, kilometers: string, name: string, responsible: any, pre: string[], post: string[], nameType: string, components: string[], numComponents: number, preType: string[], postType: string[], comments: string, shrinkedType: boolean, shrinked: boolean) => {
  setMaintenances((prevMaintenances: Maintenances[]) =>
    prevMaintenances.map((item, index) =>
      index == selectedOwner
        ? {
            ...item,
            group: [
              ...item.group,
              {
                date: date,
                kilometers: kilometers,
                name: name,
                responsible: responsible,
                pre: pre,
                post: post,
                type: Array.from({ length: 1 }, () => ({
                  name: nameType,
                  components: components,
                  numComponents: numComponents,
                  pre: preType,
                  post: postType,
                  comments: comments,
                  shrinked: shrinkedType,
                })),
                shrinked: shrinked,
                numTypes: 1,
              },
            ],
            numGroups: item.numGroups + 1,
          }
        : item
    )
  );
}

export const addAndSetMaintenanceGroupType = (setMaintenances: React.Dispatch<SetStateAction<Maintenances[]>>, selectedOwner: number, selectedGroup: number, name: string, components: string[], numComponents: number, pre: string[], post: string[], comments: string, shrinked: boolean) => {
  setMaintenances((prevMaintenances: Maintenances[]) =>
    prevMaintenances.map((item, index) =>
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
                        name: name,
                        components: components,
                        numComponents: numComponents,
                        pre: pre,
                        post: post,
                        comments: comments,
                        shrinked: shrinked,
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

export const addAndSetModificationGroup = (setModifications: React.Dispatch<SetStateAction<Modifications[]>>, selectedOwner: number, date: string, kilometers: string, name: string, responsible: any, pre: string[], post: string[], nameType: string, components: string[], numComponents: number, preType: string[], postType: string[], comments: string, shrinkedType: boolean, shrinked: boolean) => {
  setModifications((prevModifications: Modifications[]) =>
    prevModifications.map((item, index) =>
      index == selectedOwner
        ? {
            ...item,
            group: [
              ...item.group,
              {
                date: date,
                kilometers: kilometers,
                name: name,
                responsible: responsible,
                pre: pre,
                post: post,
                type: Array.from({ length: 1 }, () => ({
                  name: nameType,
                  components: components,
                  numComponents: numComponents,
                  pre: preType,
                  post: postType,
                  comments: comments,
                  shrinked: shrinkedType,
                })),
                shrinked: shrinked,
                numTypes: 1,
              },
            ],
            numGroups: item.numGroups + 1,
          }
        : item
    )
  );
}

export const addAndSetModificationGroupType = (setModifications: React.Dispatch<SetStateAction<Modifications[]>>, selectedOwner: number, selectedGroup: number, name: string, components: string[], numComponents: number, pre: string[], post: string[], comments: string, shrinked: boolean) => {
  setModifications((prevModifications: Modifications[]) =>
    prevModifications.map((item, index) =>
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
                        name: name,
                        components: components,
                        numComponents: numComponents,
                        pre: pre,
                        post: post,
                        comments: comments,
                        shrinked: shrinked,
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

export const addAndSetDefectGroup = (setDefects: React.Dispatch<SetStateAction<Defects[]>>, selectedOwner: number, date: string, kilometers: string, cause: string, level: string, photographs: string[], description: string, shrinkedType: boolean, shrinked: boolean) => {
  setDefects((prevDefects: Defects[]) =>
    prevDefects.map((item, index) =>
      index == selectedOwner
        ? {
            ...item,
            group: [
              ...item.group,
              {
                date: date,
                kilometers: kilometers,
                cause: cause,
                type: Array.from({ length: 1 }, () => ({
                  level: level,
                  photographs: photographs,
                  description: description,
                  shrinked: shrinkedType,
                })),
                shrinked: shrinked,
                numTypes: 1,
              },
            ],
            numGroups: item.numGroups + 1,
          }
        : item
    )
  );
}

export const addAndSetDefectGroupType = (setDefects: React.Dispatch<SetStateAction<Defects[]>>, selectedOwner: number, selectedGroup: number, level: string, photographs: string[], description: string, shrinked: boolean,) => {
  setDefects((prevDefects: Defects[]) =>
    prevDefects.map((item, index) =>
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
                        level: level,
                        photographs: photographs,
                        description: description,
                        shrinked: shrinked,
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

export const addAndSetRepairGroup = (setRepairs: React.Dispatch<SetStateAction<Repairs[]>>, selectedOwner: number, date: string, kilometers: string, name: string, responsible: any, pre: string[], post: string[], defectsRepaired: [], numDefectsRepaired: number , nameType: string, components: string[], numComponents: number, preType: string[], postType: string[], comments: string, shrinkedType: boolean, shrinked: boolean) => {
  setRepairs((prevRepairs: Repairs[]) =>
    prevRepairs.map((item, index) =>
      index == selectedOwner
        ? {
            ...item,
            group: [
              ...item.group,
              {
                date: date,
                kilometers: kilometers,
                name: name,
                responsible: responsible,
                pre: pre,
                post: post,
                defectsRepaired: defectsRepaired,
                numDefectsRepaired: numDefectsRepaired,
                type: Array.from({ length: 1 }, () => ({
                  name: nameType,
                  components: components,
                  numComponents: numComponents,
                  pre: preType,
                  post: postType,
                  comments: comments,
                  shrinked: shrinkedType,
                })),
                shrinked: shrinked,
                numTypes: 1,
              },
            ],
            numGroups: item.numGroups + 1,
          }
        : item
    )
  );
}

export const addAndSetRepairGroupType = (setRepairs: React.Dispatch<SetStateAction<Repairs[]>>, selectedOwner: number, selectedGroup: number, name: string, components: string[], numComponents: number, pre: string[], post: string[], comments: string, shrinked: boolean) => {
  setRepairs((prevRepairs: Repairs[]) =>
    prevRepairs.map((item, index) =>
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
                        name: name,
                        components: components,
                        numComponents: numComponents,
                        pre: pre,
                        post: post,
                        comments: comments,
                        shrinked: shrinked,
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

export const setOwnerSVLDataToEmpty = (selectedOwner: number, setDataSVL: any) => {
  setDataSVL((prevDataSVL: any[]) => 
    prevDataSVL.map((item, index) =>
      index === selectedOwner
        ? {
            group: [],
            numGroups: 0,
          }
        : item
    )
  );
} 
