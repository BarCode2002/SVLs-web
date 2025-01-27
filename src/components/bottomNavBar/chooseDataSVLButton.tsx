import { SetStateAction } from 'react';
import styles from '../../styles/components/bottomNavBar/bottomNavBarButtons.module.css';

type ChooseDataSVLButtonProps = {
  label: string;
  setSelectedSVLData: React.Dispatch<SetStateAction<number>>;
};

const ChooseDataSVLButton = ({ label, setSelectedSVLData }: ChooseDataSVLButtonProps): JSX.Element => {

  const handleChooseSVLData = async () => {
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
    <div>
      <button
        className={styles.button}
        onClick={handleChooseSVLData}>
        {label}
      </button>
    </div>
  );
}

export default ChooseDataSVLButton;