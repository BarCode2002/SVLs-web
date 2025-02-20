import { useRef, useState } from 'react';
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

  const imagePreviewContainer = useRef(null);

  return (
    <div className={styles.responsibleContainer}>
      <div className={styles.fieldLabel}>
        {fieldLabel}
      </div>
      {responsible[0] == false &&
        <div className={styles.responsible}>
          <div>{t('DataSVL.Labels.vehicleOwner')}.</div>
          {responsible[2] == false &&
            <div>{t('DataSVL.Labels.withOutProof')}.</div>
          }
          {responsible[2] == true &&
            <div className={styles.proofContainer}>
              {responsible[3] == '' ? (
                <div>{t('DataSVL.Labels.hasProofButNotUploaded')}.</div>
              ) : (
                <div>
                  {showBig == false ? (
                    <div className={styles.imageSmallContainer}>
                      {t('DataSVL.Labels.proof')}
                      <img
                        className={styles.imageSmall}
                        onClick={() => changeImageSize('big')}
                        src={responsible[3][4] != ':' ? `${urlIPFS}${responsible[3]}` : responsible[3]}
                      />
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
                          src={responsible[3][4] != ':' ? `${urlIPFS}${responsible[3]}` : responsible[3]}
                        />
                      </div>
                      <div ref={imagePreviewContainer} className={styles.imagePreviewContainer}>
                        {showBig ? (
                          <img
                            className={styles.imageSmallSelected}
                            onClick={() => changeImageSize('big')}
                            src={responsible[3][4] != ':' ? `${urlIPFS}${responsible[3]}` : responsible[3]}
                          />
                        ) : (
                          <img
                            className={styles.imageSmall}
                            onClick={() => changeImageSize('big')}
                            src={responsible[3][4] != ':' ? `${urlIPFS}${responsible[3]}` : responsible[3]}
                          />
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )} 
            </div>
          }
        </div>
      }
      {responsible[0] == true &&
        <div className={styles.responsible}>
          {responsible[1] != '' &&
            <div>{t('DataSVL.Labels.inTheRepairShop')} {responsible[1]}.</div>
          }
          {responsible[1] == '' &&
            <div>{t('DataSVL.Labels.inTheRepairShop')} -</div>
          }
          {responsible[2] == false && 
            <div>{t('DataSVL.Labels.withOutProof')}.</div>
          }
          {responsible[2] == true && 
            <div className={styles.proofContainer}>
              {responsible[3] == '' ? (
                <div>{t('DataSVL.Labels.hasProofButNotUploaded')}.</div>
              ) : (
                <div>
                  {showBig == false ? (
                    <div className={styles.imageSmallContainer}>
                      {t('DataSVL.Labels.proof')}
                      <img
                        className={styles.imageSmall}
                        onClick={() => changeImageSize('big')}
                        src={responsible[3][4] != ':' ? `${urlIPFS}${responsible[3]}` : responsible[3]}
                      />
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
                          src={responsible[3][4] != ':' ? `${urlIPFS}${responsible[3]}` : responsible[3]}
                        />
                      </div>
                      <div ref={imagePreviewContainer} className={styles.imagePreviewContainer}>
                        {showBig ? (
                          <img
                            className={styles.imageSmallSelected}
                            onClick={() => changeImageSize('big')}
                            src={responsible[3][4] != ':' ? `${urlIPFS}${responsible[3]}` : responsible[3]}
                          />
                        ) : (
                          <img
                            className={styles.imageSmall}
                            onClick={() => changeImageSize('big')}
                            src={responsible[3][4] != ':' ? `${urlIPFS}${responsible[3]}` : responsible[3]}
                          />
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )} 
            </div>
          }
        </div>
      }
      {responsible[0] == null &&
        <div className={styles.responsible}>
          -
        </div>
      }
    </div>
  );
};

export default ResponsibleContainer;


