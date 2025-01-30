import { SetStateAction } from 'react';
import styles from '../../../styles/components/dataSVL/buttons/dataSVLButtons.module.css';

type ToggleGroupVisibilityButtonProps = {
  dataSVL: any;
  setDataSVL: React.Dispatch<SetStateAction<any>>;
  selectedOwner: number;
  selectedGroup: number;
};

const ToggleGroupVisibilityButton = ({ dataSVL, setDataSVL, selectedOwner, selectedGroup }: ToggleGroupVisibilityButtonProps): JSX.Element => {

  const handleToggle = () => {
    const updateSVLdata = [...dataSVL];
    if (dataSVL[selectedOwner].group[selectedGroup].shrinked == true) updateSVLdata[selectedOwner].group[selectedGroup].shrinked = false;
    else updateSVLdata[selectedOwner].group[selectedGroup].shrinked = true;
    setDataSVL(updateSVLdata);
  }

  return (
    <div>
      <button
        className={styles.button}
        onClick={handleToggle}>
        Toggle
      </button>
    </div>
  );
}

export default ToggleGroupVisibilityButton;