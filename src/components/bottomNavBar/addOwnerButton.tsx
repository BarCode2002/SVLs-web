import { SetStateAction } from 'react';
import styles from '../../styles/components/bottomNavBar/manageOwnerButtons.module.css';
import { GeneralInformation, Maintenances, Modifications, Defects, Repairs } from '../../utils/dataSVL';
import { PHOTOGRAPHS_SIZE, COMPONENTS_SIZE, DEFECTS_REPAIRED_SIZE } from '../../utils/constants';
import { useTranslation } from "react-i18next";

type AddOwnerButtonProps = {
  setGeneralInformation: React.Dispatch<SetStateAction<GeneralInformation[]>>;
  setMaintenances: React.Dispatch<SetStateAction<Maintenances[]>>;
  setModifications: React.Dispatch<SetStateAction<Modifications[]>>;
  setDefects: React.Dispatch<SetStateAction<Defects[]>>;
  setRepairs: React.Dispatch<SetStateAction<Repairs[]>>;
  setSelectedOwner: React.Dispatch<React.SetStateAction<number>>;
  totalOwners: number;
  setTotalOwners: React.Dispatch<React.SetStateAction<number>>;
  editMode: boolean;
};

const AddOwnerButton = ({ setGeneralInformation, setMaintenances, setModifications, setDefects, setRepairs, setSelectedOwner, totalOwners, setTotalOwners, editMode }: AddOwnerButtonProps): JSX.Element => {

  const { t } = useTranslation();

  const addGeneralInformation = async () => {
    setGeneralInformation((prevGeneralInformation: GeneralInformation[]) => [
      ...prevGeneralInformation,
      {
        VIN: '',
        brand: t('DataSVL.Forms.brand'),
        model: t('DataSVL.Forms.model'),
        year: '',
        kilometers: '',
        mainPhotograph: '',
        state: t('DataSVL.Forms.state'),
        photographs: Array.from({ length: PHOTOGRAPHS_SIZE }, () => ''),
        weight: '',
        color: '',
        engine: '',
        power: '',
        shift: t('DataSVL.Forms.shift'),
        fuel: t('DataSVL.Forms.fuel'),
        autonomy: '',
        climate: t('DataSVL.Forms.climate'),
        usage: t('DataSVL.Forms.usage'),
        storage: t('DataSVL.Forms.storage'),
        comments: '',
      },
    ]);
  }

  const addMaintenances = async () => {
    setMaintenances((prevMaintenances: Maintenances[]) => [
      ...prevMaintenances,
      {
        group: Array.from({ length: 1 }, () => ({
          date: "",
          kilometers: "",
          name: "",
          responsible: [null, "", null, ""],
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
        })),
        numGroups: 1,
      },
    ]);
  }

  const addModifications = async () => {
    setModifications((prevModifications: Modifications[]) => [
      ...prevModifications,
      {
        group: Array.from({ length: 1 }, () => ({
          date: "",
          kilometers: "",
          name: "",
          responsible: [null, "", null, ""],
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
        })),
        numGroups: 1,
      },
    ]);
  }

  const addDefects = async () => {
    setDefects((prevDefects: Defects[]) => [
      ...prevDefects,
      {
        group: Array.from({ length: 1 }, () => ({
          date: "",
          kilometers: "",
          cause: "",
          type: Array.from({ length: 1 }, () => ({
            level: "",
            components: Array.from({ length: COMPONENTS_SIZE }, () => ''),
            photographs: Array.from({ length: PHOTOGRAPHS_SIZE }, () => ''),
            description: "",
            shrinked: false,
          })),
          shrinked: false,
          numTypes: 1,
        })),
        numGroups: 1,
      },
    ]);
  }

  const addRepairs = async () => {
    setRepairs((prevRepairs: Repairs[]) => [
      ...prevRepairs,
      {
        group: Array.from({ length: 1 }, () => ({
          date: "",
          kilometers: "",
          name: "",
          responsible: [null, "", null, ""],
          pre: Array.from({ length: PHOTOGRAPHS_SIZE }, () => ''),
          post: Array.from({ length: PHOTOGRAPHS_SIZE }, () => ''),
          defectsRepaired: Array.from({ length: DEFECTS_REPAIRED_SIZE }, () => ([-1, -1, -1 ])),
          numDefectsRepaired: 0,
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
        })),
        numGroups: 1,
      },
    ]);
  }
  
  const handleOwnerAddition = async () => {
    addGeneralInformation();
    addMaintenances();
    addModifications();
    addDefects();
    addRepairs();
    setSelectedOwner(totalOwners);
    setTotalOwners(totalOwners+1);
  }

  return (
    <div>
      <button
        className={styles.removeAddOwnerButton}
        onClick={handleOwnerAddition}
        disabled={!editMode}>
        +
      </button>
    </div>
  );
}

export default AddOwnerButton;