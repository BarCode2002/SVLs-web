import styles from '../../styles/components/bottomNavBar/bottomNavBarButtons.module.css';

type AddOwnerButtonProps = {
  totalOwners: number;
  setTotalOwners: React.Dispatch<React.SetStateAction<number>>;
};

const AddOwnerButton = ({ totalOwners, setTotalOwners }: AddOwnerButtonProps): JSX.Element => {

  const handleOwnerAddition = async () => {
    setTotalOwners(totalOwners+1);
  };

  return (
    <div>
      <button
        className={styles.button}
        onClick={handleOwnerAddition}>
        +
      </button>
    </div>
  );
}

export default AddOwnerButton;