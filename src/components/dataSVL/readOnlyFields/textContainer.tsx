import { useEffect, useState } from 'react';
import styles from '../../../styles/components/dataSVL/readOnlyFields/textContainer.module.css';
import { useTranslation } from "react-i18next";

type TextContainerProps = {
  fieldLabel: string;
  text: string;
}

const TextContainer = ({ fieldLabel, text }: TextContainerProps) => {

  const { t } = useTranslation();
  const [noData, setNoData] = useState(false);

  const checkNoData = () => {
    if (text == '' || text == t('DataSVL.Forms.state') || text == t('DataSVL.Forms.shift') ||
    text == t('DataSVL.Forms.fuel') || text == t('DataSVL.Forms.climate') ||
    text == t('DataSVL.Forms.usage') || text == t('DataSVL.Forms.storage')) setNoData(true);
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
      {noData == false &&
        <div className={styles.text}> 
          {text}
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


