import styles from '../../styles/components/bottomNavBar/manageOwnerButtons.module.css';

type OwnerButtonProps = {
  index: number;
  setSelectedOwner: React.Dispatch<React.SetStateAction<number>>;
};

const OwnerButton = ({ index, setSelectedOwner}: OwnerButtonProps): JSX.Element => {

  const owner = `Owner ${index+1}`;

  const handleOwnerChange = async () => {
    setSelectedOwner(index);
  };

  return (
    <div>
      <button
        className={styles.ownerButton}
        onClick={handleOwnerChange}>
        {owner}
      </button>
    </div>
  );
}

export default OwnerButton;