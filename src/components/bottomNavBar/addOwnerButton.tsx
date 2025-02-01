import { SetStateAction } from 'react';
import styles from '../../styles/components/bottomNavBar/manageOwnerButtons.module.css';
import { GeneralInformation, Maintenances, Modifications, Defects, Repairs } from '../../utils/interfaces/dataSVL';
import { PHOTOGRAPHS_SIZE, COMPONENTS_SIZE, DEFECTS_REPAIRED_SIZE } from '../../utils/constants/constants';

type AddOwnerButtonProps = {
  setGeneralInformation: React.Dispatch<SetStateAction<GeneralInformation[]>>;
  setMaintenances: React.Dispatch<SetStateAction<Maintenances[]>>;
  setModifications: React.Dispatch<SetStateAction<Modifications[]>>;
  setDefects: React.Dispatch<SetStateAction<Defects[]>>;
  setRepairs: React.Dispatch<SetStateAction<Repairs[]>>;
  selectedOwner: number;
  setSelectedOwner: React.Dispatch<React.SetStateAction<number>>;
  totalOwners: number;
  setTotalOwners: React.Dispatch<React.SetStateAction<number>>;
};

const AddOwnerButton = ({ setGeneralInformation, setMaintenances, setModifications, setDefects, setRepairs, selectedOwner, setSelectedOwner, totalOwners, setTotalOwners }: AddOwnerButtonProps): JSX.Element => {

  const addGeneralInformation = async () => {
    setGeneralInformation((prevGeneralInformation: GeneralInformation[]) => [
      ...prevGeneralInformation,
      {
        VIN: '',
        brand: 'Vehicle brand',
        model: 'Model brand',
        year: '',
        kilometers: '',
        mainPhotograph: '',
        state: 'State of the vehicle',
        photographs: Array.from({ length: PHOTOGRAPHS_SIZE }, () => ''),
        weight: '',
        color: '',
        engine: '',
        power: '',
        shift: 'Shift of the vehicle',
        fuel: 'Fuel of the vehicle',
        autonomy: '',
        climate: 'Climate where the vehicle was used',
        usage: 'Usage that was made to the vehicle',
        storage: 'Storage of the vehicle',
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
          doneBy: [false, "", false, ""],
          pre: Array.from({ length: PHOTOGRAPHS_SIZE }, () => ''),
          post: Array.from({ length: PHOTOGRAPHS_SIZE }, () => ''),
          maintenance: Array.from({ length: 1 }, () => ({
            name: "",
            components: Array.from({ length: COMPONENTS_SIZE }, () => ''),
            numComponents: 1,
            pre: Array.from({ length: PHOTOGRAPHS_SIZE }, () => ''),
            post: Array.from({ length: PHOTOGRAPHS_SIZE }, () => ''),
            comments: "",
            shrinked: false,
          })),
          shrinked: false,
          numMaintenances: 1,
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
          doneBy: [false, "", false, ""],
          pre: Array.from({ length: PHOTOGRAPHS_SIZE }, () => ''),
          post: Array.from({ length: PHOTOGRAPHS_SIZE }, () => ''),
          modification: Array.from({ length: 1 }, () => ({
            name: "",
            components: Array.from({ length: COMPONENTS_SIZE }, () => ''),
            pre: Array.from({ length: PHOTOGRAPHS_SIZE }, () => ''),
            post: Array.from({ length: PHOTOGRAPHS_SIZE }, () => ''),
            comments: "",
            shrinked: false,
          })),
          shrinked: false,
          numModifications: 1,
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
          defect: Array.from({ length: 1 }, () => ({
            level: "",
            components: Array.from({ length: COMPONENTS_SIZE }, () => ''),
            photographs: Array.from({ length: PHOTOGRAPHS_SIZE }, () => ''),
            description: "",
            cause: "",
            shrinked: false,
          })),
          shrinked: false,
          numDefects: 1,
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
          doneBy: [false, "", false, ""],
          pre: Array.from({ length: PHOTOGRAPHS_SIZE }, () => ''),
          post: Array.from({ length: PHOTOGRAPHS_SIZE }, () => ''),
          defectsRepaired: Array.from({ length: DEFECTS_REPAIRED_SIZE }, () => ([false, -1, -1, -1 ])),
          repair: Array.from({ length: 1 }, () => ({
            name: "",
            components: Array.from({ length: COMPONENTS_SIZE }, () => ''),
            pre: Array.from({ length: PHOTOGRAPHS_SIZE }, () => ''),
            post: Array.from({ length: PHOTOGRAPHS_SIZE }, () => ''),
            comments: "",
            shrinked: false,
          })),
          shrinked: false,
          numRepairs: 1,
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
    setSelectedOwner(selectedOwner+1);
    setTotalOwners(totalOwners+1);
  }

  return (
    <div>
      <button
        className={styles.addOwnerButton}
        onClick={handleOwnerAddition}>
        +
      </button>
    </div>
  );
}

export default AddOwnerButton;