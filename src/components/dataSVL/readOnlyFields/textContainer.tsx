import { useEffect, useState } from 'react';
import styles from '../../../styles/components/dataSVL/readOnlyFields/textContainer.module.css';
import { useTranslation } from 'react-i18next';

type TextContainerProps = {
  fieldLabel: string;
  text: string | [string, string];
}

const TextContainer = ({ fieldLabel, text }: TextContainerProps) => {

  const [noData, setNoData] = useState(false);
  const { t } = useTranslation();
  
  const checkNoData = () => {
    if (fieldLabel == t('DataSVL.Labels.kilometers') || fieldLabel == t('DataSVL.Labels.weight') || fieldLabel == t('DataSVL.Labels.power') || fieldLabel == t('DataSVL.Labels.autonomy')) {
      if (text[0] == '') setNoData(true);
    }
    else if (text == '' || text == 'DataSVL.Forms.brand' || text == 'DataSVL.Forms.model' || 
      text == 'DataSVL.Forms.state' || text == 'DataSVL.Forms.shift' ||
      text == 'DataSVL.Forms.fuel' || text == 'DataSVL.Forms.climate' ||
      text == 'DataSVL.Forms.usage' || text == 'DataSVL.Forms.storage' ||
      text == 'DataSVL.Forms.level'
    ) setNoData(true);
    else setNoData(false);
  }

  useEffect(() => {
    checkNoData();
  }), [];

  return (
    <div className={styles.textContainer}>
      <div className={styles.fieldLabel}>
        {fieldLabel}
      </div>
      {typeof text == 'string' && noData == false && (fieldLabel == t('DataSVL.Labels.date') || fieldLabel == t('DataSVL.Labels.acquisitionDate')) &&
        <div className={styles.text}>
          {new Date(text).toLocaleDateString("en-GB")}
        </div>
      }
      {noData == false && (fieldLabel == t('DataSVL.Labels.kilometers') || fieldLabel == t('DataSVL.Labels.weight') || fieldLabel == t('DataSVL.Labels.power') || fieldLabel == t('DataSVL.Labels.autonomy')) &&
        <div className={styles.text}> 
          {text[0]} {text[1]}
        </div>
      }
      {noData == false && fieldLabel != t('DataSVL.Labels.kilometers') && fieldLabel != t('DataSVL.Labels.weight') && fieldLabel != t('DataSVL.Labels.power') && fieldLabel != t('DataSVL.Labels.autonomy') && fieldLabel != t('DataSVL.Labels.date') && fieldLabel != t('DataSVL.Labels.acquisitionDate') &&
        <div className={styles.text}> 
          {t(text)}
        </div>
      }
      {noData == true &&
        <div className={styles.text}> 
          -
        </div>
      }
    </div>
  );
};

export default TextContainer;


