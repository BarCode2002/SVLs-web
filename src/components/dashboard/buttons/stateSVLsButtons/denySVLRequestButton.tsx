import styles from '../../../../styles/components/dashboard/stateSVLButtons/stateSVLButtons.module.css';
import { useTranslation } from 'react-i18next';

type DenySVLRequestButtonProps = {

};

const DenySVLRequestButton = ({ }: DenySVLRequestButtonProps): JSX.Element => { 

  const { t } = useTranslation();

  const handleDenySVLRequest = async () => { 
   
  };

  return (
    <div>
      <button 
        className={styles.buttonRight}
        onClick={handleDenySVLRequest}>
        {t('Dashboard.Labels.denyRequest')}
      </button>
    </div>
  );
};

export default DenySVLRequestButton;