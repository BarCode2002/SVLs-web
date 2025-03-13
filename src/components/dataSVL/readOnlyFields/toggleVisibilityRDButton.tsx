import { SetStateAction } from 'react';
import styles from '../../../styles/components/dataSVL/buttons/dataSVLButtons.module.css';
import { TopArrowWide, BottomArrowWide } from '../../../assets/directionArrows';

type ToggleVisibilityRDButtonProps = {
  shrinked: any;
  setShrinked: React.Dispatch<SetStateAction<any>>;
  selectedOwner: number;
  selectedGroup: number;
  selectedGroupType: number;
};

const ToggleVisibilityRDButton = ({ shrinked, setShrinked, selectedOwner, selectedGroup, selectedGroupType}: ToggleVisibilityRDButtonProps): JSX.Element => {

  const handleToggle = () => {
    const updatedShrinked = [...shrinked];
    if (selectedGroupType == -1) {
      if (shrinked[selectedOwner][selectedGroup].group == true) updatedShrinked[selectedOwner][selectedGroup].group = false;
      else updatedShrinked[selectedOwner][selectedGroup].group = true;
    }
    else {
      if (shrinked[selectedOwner][selectedGroup].type[selectedGroupType] == true) updatedShrinked[selectedOwner][selectedGroup].type[selectedGroupType] = false;
      else updatedShrinked[selectedOwner][selectedGroup].type[selectedGroupType] = true;
    }
    setShrinked(updatedShrinked);
  }

  return (
    <div>
      {selectedGroupType == -1 ? (
        <button
          className={styles.toogleButton}
          onClick={handleToggle}>
          {shrinked[selectedOwner][selectedGroup].group == false ? <TopArrowWide /> : <BottomArrowWide />}
        </button>
      ) : (
        <button
          className={styles.toogleButton}
          onClick={handleToggle}>
          {shrinked[selectedOwner][selectedGroup].type[selectedGroupType] == false ? <TopArrowWide /> : <BottomArrowWide />}
        </button>
      )}
    </div>
  );
}

export default ToggleVisibilityRDButton;