import { SetStateAction } from 'react';
import styles from '../../../styles/components/dataSVL/buttons/dataSVLButtons.module.css';
import { TopArrowWide, BottomArrowWide } from '../../../assets/directionArrows';

type ToggleVisibilityButtonProps = {
  dataSVL: any;
  setDataSVL: React.Dispatch<SetStateAction<any>>;
  selectedOwner: number;
  selectedGroup: number;
  selectedGroupType: number;
};

const ToggleVisibilityButton = ({ dataSVL, setDataSVL, selectedOwner, selectedGroup, selectedGroupType}: ToggleVisibilityButtonProps): JSX.Element => {

  const handleToggle = () => {
    const updateSVLdata = [...dataSVL];
    if (selectedGroupType == -1) {
      if (dataSVL[selectedOwner].group[selectedGroup].shrinked == true) updateSVLdata[selectedOwner].group[selectedGroup].shrinked = false;
      else updateSVLdata[selectedOwner].group[selectedGroup].shrinked = true;
    }
    else {
      if (dataSVL[selectedOwner].group[selectedGroup].element[selectedGroupType].shrinked == true) updateSVLdata[selectedOwner].group[selectedGroup].element[selectedGroupType].shrinked = false;
      else updateSVLdata[selectedOwner].group[selectedGroup].element[selectedGroupType].shrinked = true;
    }
    setDataSVL(updateSVLdata);
  }

  return (
    <div>
      {selectedGroupType == -1 ? (
        <button
          className={styles.toogleButton}
          onClick={handleToggle}>
          {dataSVL[selectedOwner].group[selectedGroup].shrinked == false ? <TopArrowWide /> : <BottomArrowWide />}
        </button>
      ) : (
        <button
          className={styles.toogleButton}
          onClick={handleToggle}>
          {dataSVL[selectedOwner].group[selectedGroup].element[selectedGroupType].shrinked == false ? <TopArrowWide /> : <BottomArrowWide />}
        </button>
      )}
    </div>
  );
}

export default ToggleVisibilityButton;