import styles from '../../styles/components/bottomNavBar/manageOwnerButtons.module.css';

type RemoveOwnerButtonProps = {
  totalOwners: number;
  setTotalOwners: React.Dispatch<React.SetStateAction<number>>;
};

const RemoveOwnerButton = ({ totalOwners, setTotalOwners }: RemoveOwnerButtonProps): JSX.Element => {

  const handleOwnerRemoval = async () => {
    setTotalOwners(totalOwners-1);
  };

  return (
    <div>
      <button
        className={styles.removeOwnerButton}
        onClick={handleOwnerRemoval}>
        -
      </button>
    </div>
  );
}

export default RemoveOwnerButton;