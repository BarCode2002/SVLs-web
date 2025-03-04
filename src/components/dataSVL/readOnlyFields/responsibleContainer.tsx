import { useRef, useState } from 'react';
import styles from '../../../styles/components/dataSVL/readOnlyFields/responsibleContainer.module.css';
import { GoBackArrowIcon } from '../../../assets/goBackArrow';
import { useTranslation } from "react-i18next";
import { ipfsRetrieve } from '../../../utils/ip';

type ResponsibleContainerProps = {
  fieldLabel: string;
  responsible: [number | null, string, boolean | null, string];
}

const ResponsibleContainer = ({ fieldLabel, responsible }: ResponsibleContainerProps) => {

  const [showBig, setShowBig] = useState(false);
  const urlIPFS = ipfsRetrieve;

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
      {(responsible[0] == 0 || responsible[0] == 1 || responsible[0] == 3)&&
        <div className={styles.responsible}>
          {responsible[0] == 0 && <div>{t('DataSVL.Labels.vehicleOwner')}.</div>}
          {responsible[0] == 1 && <div>OEM.</div>}
          {responsible[0] == 3 && <div>{t('DataSVL.Placeholders.unknown')}.</div>}
          {responsible[0] == 0 && responsible[2] == false &&
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
      {responsible[0] == 2 &&
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


