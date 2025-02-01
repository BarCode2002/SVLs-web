import { SetStateAction } from 'react';
import styles from '../../../styles/components/dataSVL/buttons/dataSVLButtons.module.css';

type ToggleVisibilityButtonProps = {
  dataSVL: any;
  setDataSVL: React.Dispatch<SetStateAction<any>>;
  selectedOwner: number;
  selectedGroup: number;
  selectedGroupType: number;
  typeSVL: string;
};

const ToggleVisibilityButton = ({ dataSVL, setDataSVL, selectedOwner, selectedGroup, selectedGroupType, typeSVL}: ToggleVisibilityButtonProps): JSX.Element => {

  const handleToggle = () => {
    const updateSVLdata = [...dataSVL];
    if (selectedGroupType == -1) {
      if (dataSVL[selectedOwner].group[selectedGroup].shrinked == true) updateSVLdata[selectedOwner].group[selectedGroup].shrinked = false;
      else updateSVLdata[selectedOwner].group[selectedGroup].shrinked = true;
    }
    else {
      if (dataSVL[selectedOwner].group[selectedGroup][typeSVL][selectedGroupType].shrinked == true) updateSVLdata[selectedOwner].group[selectedGroup][typeSVL][selectedGroupType].shrinked = false;
      else updateSVLdata[selectedOwner].group[selectedGroup][typeSVL][selectedGroupType].shrinked = true;
    }
    setDataSVL(updateSVLdata);
  }

  return (
    <div>
      {selectedGroupType == -1 ? (
        <button
          className={styles.toogleButton}
          onClick={handleToggle}>
          {dataSVL[selectedOwner].group[selectedGroup].shrinked == false ? 'Hide' : 'Show'}
        </button>
      ) : (
        <button
          className={styles.toogleButton}
          onClick={handleToggle}>
          {dataSVL[selectedOwner].group[selectedGroup][typeSVL][selectedGroupType].shrinked == false ? 'Hide' : 'Show'}
        </button>
      )}
    </div>
  );
}

export default ToggleVisibilityButton;