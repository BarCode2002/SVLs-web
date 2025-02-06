import styles from '../../../../styles/components/dashboard/stateSVLButtons/stateSVLButtons.module.css';
import { useTranslation } from 'react-i18next';

type RequestSVLButtonProps = {
  requested: boolean;
};

const RequestSVLButton = ({ requested }: RequestSVLButtonProps): JSX.Element => {

  const { t } = useTranslation();

  const handleRequestSVL = async () => { 
    
  };

  return (
    <div>
      <button 
        className={styles.buttonFull}
        onClick={handleRequestSVL}>
        {requested ? t('Dashboard.Labels.unrequest') : t('Dashboard.Labels.request')}
      </button>
    </div>
  );
};

export default RequestSVLButton;