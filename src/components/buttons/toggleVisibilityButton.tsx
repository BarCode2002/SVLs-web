import { SetStateAction } from 'react';
import styles from '../../styles/components/buttons/dataSVLButtons.module.css';

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
      if (dataSVL[selectedOwner].group[selectedGroup].type[selectedGroupType].shrinked == true) updateSVLdata[selectedOwner].group[selectedGroup].type[selectedGroupType].shrinked = false;
      else updateSVLdata[selectedOwner].group[selectedGroup].type[selectedGroupType].shrinked = true;
    }
    setDataSVL(updateSVLdata);
  }

  return (
    <div>
      {selectedGroupType == -1 ? (
        <button
          className={styles.toogleButton}
          onClick={handleToggle}>
          {dataSVL[selectedOwner].group[selectedGroup].shrinked == false ? '⬆' : '⬇'}
        </button>
      ) : (
        <button
          className={styles.toogleButton}
          onClick={handleToggle}>
          {dataSVL[selectedOwner].group[selectedGroup].type[selectedGroupType].shrinked == false ? '⬆' : '⬇'}
        </button>
      )}
    </div>
  );
}

export default ToggleVisibilityButton;