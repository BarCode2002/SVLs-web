import { SetStateAction, useState } from 'react';
import styles from '../../../styles/components/dataSVL/buttons/dataSVLButtons.module.css';
import { DragIcon } from '../../../assets/drag';

type DragGroupGroupTypeButtonProps = {
  setDraggable: React.Dispatch<SetStateAction<boolean>>;
  editMode: boolean;
};

const DragGroupGroupTypeButton = ({ setDraggable, editMode }: DragGroupGroupTypeButtonProps): JSX.Element => {

  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [isDragging, setIsDragging] = useState(false);

  const makeDraggable = (e: any) => {
    console.log("Dragging started");
    e.stopPropagation(); // Prevent triggering drag on parent
    setDraggable(true);
    setIsDragging(true);

    // Capture the initial position
    const startX = e.clientX - position.x;
    const startY = e.clientY - position.y;

    // Handle movement during dragging
    const handleDrag = (moveEvent: any) => {
      if (!isDragging) return; // Ensure drag state is active
      setPosition({
        x: moveEvent.clientX - startX,
        y: moveEvent.clientY - startY,
      });
    };

    // Stop dragging — this function is attached to the document event
    const unmakeDraggable = () => {
      console.log("Dragging ended");
      setIsDragging(false);
      setDraggable(false);

      // Clean up global event listeners after drag ends
      document.removeEventListener("mousemove", handleDrag);
      document.removeEventListener("mouseup", unmakeDraggable);
    };

    // Add global event listeners (so drag works even if the mouse leaves the button)
    document.addEventListener("mousemove", handleDrag);
    document.addEventListener("mouseup", unmakeDraggable);
  };

  return (
    <div>
      <button
        className={styles.dragButton}
        onMouseDown={makeDraggable}
        disabled={!editMode}>
        <DragIcon />
      </button>
    </div>
  );
}

export default DragGroupGroupTypeButton;