import { SetStateAction } from 'react';
import styles from '../../styles/components/bottomNavBar/chooseSVLDataButtons.module.css';
import { useTranslation } from "react-i18next";

type ChooseDataSVLButtonsProps = {
  selectedSVLData: number;
  setSelectedSVLData: React.Dispatch<SetStateAction<number>>;
};

const ChooseDataSVLButtons = ({ selectedSVLData, setSelectedSVLData }: ChooseDataSVLButtonsProps): JSX.Element => {

  const { t } = useTranslation();

  const handleChooseSVLData = async (label: string) => {
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
    <div className={styles.chooseSVLContainer}>
      <button
        className={selectedSVLData == 0 ? styles.butttonSelected : styles.button}
        onClick={() => handleChooseSVLData('General information')}>
        {t('DataSVL.BottomBar.generalInformation')}
      </button>
      <button
        className={selectedSVLData == 1 ? styles.butttonSelected : styles.button}
        onClick={() => handleChooseSVLData('Maintenances')}>
        {t('DataSVL.BottomBar.maintenances')}
      </button>
      <button
        className={selectedSVLData == 2 ? styles.butttonSelected : styles.button}
        onClick={() => handleChooseSVLData('Modifications')}>
        {t('DataSVL.BottomBar.modifications')}
      </button>
      <button
        className={selectedSVLData == 3 ? styles.butttonSelected : styles.button}
        onClick={() => handleChooseSVLData('Defects')}>
        {t('DataSVL.BottomBar.defects')}
      </button>
      <button
        className={selectedSVLData == 4 ? styles.butttonSelected : styles.button}
        onClick={() => handleChooseSVLData('Repairs')}>
        {t('DataSVL.BottomBar.repairs')}
      </button>
    </div>
  );
}

export default ChooseDataSVLButtons;