import styles from '../../../../styles/components/dashboard/stateSVLButtons/stateSVLButtons.module.css';
import { useTranslation } from 'react-i18next';

type AcceptSVLRequestButtonProps = {

};

const AcceptSVLRequestButton = ({ }: AcceptSVLRequestButtonProps): JSX.Element => { 

  const { t } = useTranslation();

  const handleAcceptSVLRequest = async () => { 
    
  };

  return (
    <div>
      <button 
        className={styles.buttonLeft}
        onClick={handleAcceptSVLRequest}>
        {t('Dashboard.Labels.acceptRequest')}
      </button>
    </div>
  );
};

export default AcceptSVLRequestButton;