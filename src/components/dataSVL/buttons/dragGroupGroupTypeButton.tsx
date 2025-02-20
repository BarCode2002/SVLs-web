import { SetStateAction } from 'react';
import styles from '../../../styles/components/dataSVL/buttons/dataSVLButtons.module.css';
import { DragIcon } from '../../../assets/drag';

type DragGroupGroupTypeButtonProps = {
  setDraggable: React.Dispatch<SetStateAction<boolean>>;
  editMode: boolean;
};

const DragGroupGroupTypeButton = ({ setDraggable, editMode }: DragGroupGroupTypeButtonProps): JSX.Element => {

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
        onMouseLeave={unmakeDraggable}
        disabled={!editMode}>
        <DragIcon />
      </button>
    </div>
  );
}

export default DragGroupGroupTypeButton;