import { SetStateAction } from 'react';
import styles from '../../styles/components/bottomNavBar/chooseSVLDataButtons.module.css';

type ChooseDataSVLButtonsProps = {
  setSelectedSVLData: React.Dispatch<SetStateAction<number>>;
};

const ChooseDataSVLButtons = ({ setSelectedSVLData }: ChooseDataSVLButtonsProps): JSX.Element => {

  const handleChooseSVLData = async (label: string) => {
    switch (label) {
      case 'General information':
        setSelectedSVLData(0);
        return
      case 'Maintenances':
        setSelectedSVLData(1);
        return
      case 'Modifications':
        setSelectedSVLData(2);
        return
      case 'Defects':
        setSelectedSVLData(3);
        return
      case 'Repairs':
        setSelectedSVLData(4);
        return
    }
  };

  return (
    <div className={styles.chooseSVLContainer}>
      <button
        className={styles.firstButton}
        onClick={() => handleChooseSVLData('General information')}>
        General information
      </button>
      <button
        className={styles.middleButtons}
        onClick={() => handleChooseSVLData('Maintenances')}>
        Maintenances
      </button>
      <button
        className={styles.middleButtons}
        onClick={() => handleChooseSVLData('Modifications')}>
        Modifications
      </button>
      <button
        className={styles.middleButtons}
        onClick={() => handleChooseSVLData('Defects')}>
        Defects
      </button>
      <button
        className={styles.lastButton}
        onClick={() => handleChooseSVLData('Repairs')}>
        Repairs
      </button>
    </div>
  );
}

export default ChooseDataSVLButtons;