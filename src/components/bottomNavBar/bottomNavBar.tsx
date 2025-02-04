import { SetStateAction, useRef } from 'react';
import styles from '../../styles/components/bottomNavBar/bottomNavBar.module.css';
import ChooseDataSVLButtons from './chooseDataSVLButtons.tsx';
import AddOwnerButton from './addOwnerButton.tsx';
import OwnerButton from './ownerButton.tsx';
import RemoveOwnerButton from './removeOwnerButton.tsx';
import { GeneralInformation, Maintenances, Modifications, Defects, Repairs } from '../../utils/dataSVL.ts';

type BottomNavBarProps = {
  selectedSVLData: number;
  setSelectedSVLData: React.Dispatch<SetStateAction<number>>;
  selectedOwner: number;
  setSelectedOwner: React.Dispatch<SetStateAction<number>>
  setGeneralInformation: React.Dispatch<SetStateAction<GeneralInformation[]>>;
  setMaintenances: React.Dispatch<SetStateAction<Maintenances[]>>;
  setModifications: React.Dispatch<SetStateAction<Modifications[]>>;
  setDefects: React.Dispatch<SetStateAction<Defects[]>>;
  setRepairs: React.Dispatch<SetStateAction<Repairs[]>>;
  totalOwners: number;
  setTotalOwners: React.Dispatch<SetStateAction<number>>
};

const BottomNavBar = ({ selectedSVLData, setSelectedSVLData, selectedOwner, setSelectedOwner, setGeneralInformation, setMaintenances, setModifications, setDefects, setRepairs,  totalOwners, setTotalOwners }: BottomNavBarProps): JSX.Element => {

  const ownersContainerRef = useRef(null);

  const ownerSelector = Array.from({length: totalOwners}, (_, index) => (
    <div key={index}>
      <OwnerButton index={index} selectedOwner={selectedOwner} setSelectedOwner={setSelectedOwner} ownersContainerRef={ownersContainerRef.current} />
    </div>
  ));

  return (
    <div className={styles.bottomNavBarContainer}>
      <div className={styles.topPart}>
        <ChooseDataSVLButtons selectedSVLData={selectedSVLData} setSelectedSVLData={setSelectedSVLData} />
      </div>
      <div className={styles.separator}></div>
      <div className={styles.bottomPart}>
        <RemoveOwnerButton  setGeneralInformation={setGeneralInformation} setMaintenances={setMaintenances}
          setModifications={setModifications} setDefects={setDefects} setRepairs={setRepairs} 
          selectedOwner={selectedOwner} setSelectedOwner={setSelectedOwner}
          totalOwners={totalOwners} setTotalOwners={setTotalOwners} 
        />
        <div ref={ownersContainerRef} className={styles.ownersContainer}>
          {ownerSelector}
        </div>
        <div className={styles.addOwnerButton}>
          <AddOwnerButton setGeneralInformation={setGeneralInformation} setMaintenances={setMaintenances}
            setModifications={setModifications} setDefects={setDefects} setRepairs={setRepairs}
            setSelectedOwner={setSelectedOwner} totalOwners={totalOwners} setTotalOwners={setTotalOwners} 
          />
        </div>
      </div>
    </div>
  );
}

export default BottomNavBar;