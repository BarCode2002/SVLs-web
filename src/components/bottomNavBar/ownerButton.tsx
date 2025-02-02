import styles from '../../styles/components/bottomNavBar/manageOwnerButtons.module.css';
import { useTranslation } from "react-i18next";

type OwnerButtonProps = {
  index: number;
  selectedOwner: number;
  setSelectedOwner: React.Dispatch<React.SetStateAction<number>>;
  ownersContainerRef: any;
};

const OwnerButton = ({ index, selectedOwner, setSelectedOwner, ownersContainerRef }: OwnerButtonProps): JSX.Element => {

  const { t } = useTranslation();
  const owner = `${t('DataSVL.BottomBar.owner')} ${index+1}`;

  const handleOwnerChange = (event: any) => {
    const button = event.target;
    const containerRect = ownersContainerRef.getBoundingClientRect();
    const buttonRect = button.getBoundingClientRect();
    const offset = buttonRect.left - containerRect.left; 
    const scrollTo = ownersContainerRef.scrollLeft + offset - containerRect.width / 2 + buttonRect.width / 2;
    ownersContainerRef.scrollTo({ left: scrollTo, behavior: "smooth" });
    setSelectedOwner(index);
  };

  return (
    <div>
      <button
        className={index == selectedOwner ? styles.ownerButtonSelected : styles.ownerButton}
        onClick={handleOwnerChange}>
        {owner}
      </button>
    </div>
  );
}

export default OwnerButton;