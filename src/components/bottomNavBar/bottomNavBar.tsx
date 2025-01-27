import { SetStateAction } from 'react';
import styles from '../../styles/components/bottomNavBar/bottomNavBar.module.css';
import ChooseDataSVLButtons from './chooseDataSVLButtons.tsx';
import AddOwnerButton from './addOwnerButton.tsx';
import OwnerButton from './ownerButton.tsx';
import RemoveOwnerButton from './removeOwnerButton.tsx';

type BottomNavBarProps = {
  setSelectedSVLData: React.Dispatch<SetStateAction<number>>;
  setSelectedOwner: React.Dispatch<SetStateAction<number>>
  totalOwners: number;
  setTotalOwners: React.Dispatch<SetStateAction<number>>
};

const BottomNavBar = ({ setSelectedSVLData, setSelectedOwner, totalOwners, setTotalOwners }: BottomNavBarProps): JSX.Element => {

  const ownerSelector = Array.from({length: totalOwners}, (_, index) => (
    <div key={index}>
      <OwnerButton index={index} setSelectedOwner={setSelectedOwner} />
    </div>
  ));

  return (
    <div className={styles.bottomNavBarContainer}>
      <div className={styles.topPart}>
        <ChooseDataSVLButtons setSelectedSVLData={setSelectedSVLData} />
      </div>
      <div className={styles.bottomPart}>
        <RemoveOwnerButton totalOwners={totalOwners} setTotalOwners={setTotalOwners} />
        {ownerSelector}
        <div className={styles.addOwnerButton}>
          <AddOwnerButton totalOwners={totalOwners} setTotalOwners={setTotalOwners} />
        </div>
      </div>
    </div>
  );
}

export default BottomNavBar;