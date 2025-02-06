import { useEffect, useState } from 'react';
import styles from '../../styles/components/dashboard/previewSVLs.module.css';
import { PreviewSVLsInfo } from '../../utils/interfaces';
import { useTranslation } from 'react-i18next';
//import { useNavigate } from 'react-router-dom'; 

type PreviewSVLsProps = {
  myAddress?: string;
  filterSVL?: number;
};

const PreviewSVLs = ({ myAddress, filterSVL }: PreviewSVLsProps): JSX.Element => {

  //const navigate = useNavigate();
  const { t } = useTranslation();

  const brandLabel = t('Dashboard.Labels.brand');
  const modelLabel = t('Dashboard.Labels.model');
  const yearLabel = t('Dashboard.Labels.year');
  const notRequestedLabel = t('Dashboard.Labels.notRequested');
  const pendingBuyLabel = t('Dashboard.Labels.pendingBuy');
  const blockedLabel = t('Dashboard.Labels.blocked');
  const requesterAddresLabel = t('Dashboard.Labels.requesterAddress');
  const ownerAddressLabel = t('Dashboard.Labels.ownerAddress');
  const ownerMeLabel = t('Dashboard.Labels.ownerMe');

  const [previewSVLsInfo, setPreviewSVLsInfo] = useState<PreviewSVLsInfo[]>(
    Array.from({ length: 20 }, () => ({
      pk: '',
      mySVL: null,
      mainPhotograph: '',
      brand: '',
      model: '',
      year: '',
      stateMySVL: [null, '', null],
      stateNotMySVL: ['', '', null],
    }))
  );

  const getSVLPreview = () => {
    const updatedPreviewSVLsInfo = [...previewSVLsInfo];
    
    updatedPreviewSVLsInfo[0].mySVL = true;
    updatedPreviewSVLsInfo[0].mainPhotograph = '';
    updatedPreviewSVLsInfo[0].brand = 'Porsche';
    updatedPreviewSVLsInfo[0].model = '911';
    updatedPreviewSVLsInfo[0].year = '2002';
    updatedPreviewSVLsInfo[0].stateMySVL = [false, '', false]; 
    updatedPreviewSVLsInfo[0].stateNotMySVL = ['', '', false]; 

    updatedPreviewSVLsInfo[1].mySVL = true;
    updatedPreviewSVLsInfo[1].mainPhotograph = '';
    updatedPreviewSVLsInfo[1].brand = 'Porsche';
    updatedPreviewSVLsInfo[1].model = '911';
    updatedPreviewSVLsInfo[1].year = '2002';
    updatedPreviewSVLsInfo[1].stateMySVL = [false, '', false]; 
    updatedPreviewSVLsInfo[1].stateNotMySVL = ['', '', false]; 

    updatedPreviewSVLsInfo[2].mySVL = true;
    updatedPreviewSVLsInfo[2].mainPhotograph = '';
    updatedPreviewSVLsInfo[2].brand = 'Porsche';
    updatedPreviewSVLsInfo[2].model = '911';
    updatedPreviewSVLsInfo[2].year = '2002';
    updatedPreviewSVLsInfo[2].stateMySVL = [false, '', false]; 
    updatedPreviewSVLsInfo[2].stateNotMySVL = ['', '', false]; 

    updatedPreviewSVLsInfo[3].mySVL = true;
    updatedPreviewSVLsInfo[3].mainPhotograph = '';
    updatedPreviewSVLsInfo[3].brand = 'Porsche';
    updatedPreviewSVLsInfo[3].model = '911';
    updatedPreviewSVLsInfo[3].year = '2002';
    updatedPreviewSVLsInfo[3].stateMySVL = [false, '', false]; 
    updatedPreviewSVLsInfo[3].stateNotMySVL = ['', '', false]; 

    for (let i = 4; i < 20; i++) {
      updatedPreviewSVLsInfo[i].mySVL = true;
      updatedPreviewSVLsInfo[i].mainPhotograph = '';
      updatedPreviewSVLsInfo[i].brand = 'Porsche';
      updatedPreviewSVLsInfo[i].model = '911';
      updatedPreviewSVLsInfo[i].year = '2002';
      updatedPreviewSVLsInfo[i].stateMySVL = [false, '', false]; 
      updatedPreviewSVLsInfo[i].stateNotMySVL = ['', '', false]; 
    }

    setPreviewSVLsInfo(updatedPreviewSVLsInfo);

  };

  useEffect(() => {
    getSVLPreview();
  }, [filterSVL]);

  /*const inDetail = async (id_bigMap: string) => {
    console.log("view the SVL in detail:", id_bigMap);
    navigate(`/SVL/${id_bigMap}`); 
  }*/

  return (
    <div className={styles.previewSVLsContainer}>
      {previewSVLsInfo.map((info, index) => (
        <div key={`${index}`}>
          <div className={styles.previewSVLContainer}>
            {info.mySVL == true && info.stateMySVL[0] == true &&
              <div className={styles.ownerOrRequesterContentWrapper}>
                <div className={styles.ownerOrRequesterContent}>
                  <div>{requesterAddresLabel}</div>
                  {info.stateMySVL[1]}
                </div>
              </div>
            }
            {info.mySVL == true && info.stateMySVL[0] == false &&
              <div className={styles.ownerOrRequesterContentWrapper}>
                <div className={styles.ownerOrRequesterContent}>
                  <div>{ownerMeLabel}</div>
                    {myAddress}
                </div>
              </div>
            }
            {info.mySVL == false &&
              <div className={styles.ownerOrRequesterContentWrapper}>
                <div className={styles.ownerOrRequesterContent}>
                  <div>{ownerAddressLabel}</div>
                  {myAddress}
                </div>
              </div>
            }
            <img
              className={styles.svl}
              src={''}/>
            <div className={styles.infoSVL}>
              <div>
                {brandLabel} {info.brand}
              </div>
              <div>
                {modelLabel} {info.model}
              </div>
              <div>
                {yearLabel} {info.year}  
              </div>
            </div>  
          </div>
        </div>
      ))}
    </div>
  );
}

export default PreviewSVLs;
