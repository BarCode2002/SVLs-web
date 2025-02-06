import styles from '../../../../styles/components/dashboard/stateSVLButtons/stateSVLButtons.module.css';
import { useTranslation } from 'react-i18next';

type BuySVLButtonProps = {

};

const BuySVLButton = ({ }: BuySVLButtonProps): JSX.Element => { 

  const { t } = useTranslation();
  
  const handleBuySVL = async () => { 
   
  };

  return (
    <div>
      <button 
        className={styles.buttonFull}
        onClick={handleBuySVL}>
        {t('Dashboard.Labels.buy')}
      </button>
    </div>
  );
};

export default BuySVLButton;