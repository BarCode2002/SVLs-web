import { useState } from 'react';
import styles from '../../../styles/components/dataSVL/readOnlyFields/responsibleContainer.module.css';
import { GoBackArrowIcon } from '../../../assets/goBackArrow';
import { useTranslation } from "react-i18next";

type ResponsibleContainerProps = {
  fieldLabel: string;
  responsible: [boolean | null, string, boolean | null, string];
}

const ResponsibleContainer = ({ fieldLabel, responsible }: ResponsibleContainerProps) => {

  const [showBig, setShowBig] = useState(false);
  const urlIPFS = 'http://127.0.0.1:8080/ipfs/';

  const { t } = useTranslation();
  

  const changeImageSize = (size: string) => {
    if (size == 'big') setShowBig(true);
    else setShowBig(false);
  }

  return (
    <div className={styles.responsibleContainer}>
      <div className={styles.fieldLabel}>
        {fieldLabel}
      </div>
      {responsible[0] == false ? (
        <div className={styles.responsible}>
          <div>Propietario del vehiculo</div>
          {responsible[2] == false || responsible[2] == null ? (
            <div>Sin pruebas de que se realizara</div>
          ) : (
            <div className={styles.proofContainer}>
              <div>El responsable tiene pruebas</div>
              {showBig == false ? (
                <div className={styles.imageSmallContainer}>
                  {responsible[3] != '' &&
                    <img
                      className={styles.imageSmall}
                      onClick={() => changeImageSize('big')}
                      src={`${urlIPFS}${responsible[3]}`}
                    />
                  }
                </div>
              ) : (
                <div className={styles.mainImageBigContainer}>
                  <div className={styles.imageBigContainer}>
                    <button
                      className={styles.closeImageBigContainer}
                      onClick={() => changeImageSize('small')}>
                      <GoBackArrowIcon />
                    </button>
                    <img
                      className={styles.imageBig}
                      src={`${urlIPFS}${responsible[3]}`}
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className={styles.responsible}>
          <div>Mecanico</div>
          <div>{responsible[1]}</div>
          {responsible[2] == false || responsible[2] == null ? (
            <div>Sin pruebas de que se realizara</div>
          ) : (
            <div className={styles.proofContainer}>
              <div>El responsable tiene pruebas</div>
              {showBig == false ? (
                <div className={styles.imageSmallContainer}>
                  {responsible[3] != '' &&
                    <img
                      className={styles.imageSmall}
                      onClick={() => changeImageSize('big')}
                      src={`${urlIPFS}${responsible[3]}`}
                    />
                  }
                </div>
              ) : (
                <div className={styles.mainImageBigContainer}>
                  <div className={styles.imageBigContainer}>
                    <button
                      className={styles.closeImageBigContainer}
                      onClick={() => changeImageSize('small')}>
                      <GoBackArrowIcon />
                    </button>
                    <img
                      className={styles.imageBig}
                      src={`${urlIPFS}${responsible[3]}`}
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ResponsibleContainer;


