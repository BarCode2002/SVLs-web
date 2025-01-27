import styles from '../../styles/components/topNavBar/topNavBar.module.css';
import GoBackButton from './goBackButton';
import MintSVLButton from './mintSVLButton';

const TopNavBar = (): JSX.Element => {

  return (
    <div className={styles.topNavBarContainer}>
      <GoBackButton />
      <MintSVLButton />
    </div>
  );
}

export default TopNavBar;