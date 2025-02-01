import { SetStateAction } from 'react';
import styles from '../../../styles/components/dataSVL/buttons/dataSVLButtons.module.css';

type DragGroupGroupTypeButtonProps = {
  setDraggable: React.Dispatch<SetStateAction<boolean>>;
};

const DragGroupGroupTypeButton = ({ setDraggable}: DragGroupGroupTypeButtonProps): JSX.Element => {

  const makeDraggable = () => {
    setDraggable(true);
  }

  const unmakeDraggable = () => {
    setDraggable(false);
  }

  return (
    <div>
      <button
        className={styles.dragButton}
        onMouseDown={makeDraggable}
        onMouseUp={unmakeDraggable}
        onMouseLeave={unmakeDraggable}>
        {'<->'}
      </button>
    </div>
  );
}

export default DragGroupGroupTypeButton;