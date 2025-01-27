import styles from '../../styles/components/bottomNavBar/bottomNavBar.module.css';
import OwnerButton from './ownerButton.tsx';

const BottomNavBar = (): JSX.Element => {

  return (
    <div className={styles.bottomNavBarContainer}>
      <OwnerButton />
      <OwnerButton />
    </div>
  );
}

export default BottomNavBar;