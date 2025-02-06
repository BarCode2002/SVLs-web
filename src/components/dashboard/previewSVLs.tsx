import { useEffect, useState } from 'react';
import styles from '../../styles/components/dashboard/previewSVLs.module.css';
import { PreviewSVLsInfo } from '../../utils/interfaces';
import { useTranslation } from 'react-i18next';
import AcceptSVLRequestButton from './buttons/stateSVLsButtons/acceptSVLRequestButton';
import DenySVLRequestButton from './buttons/stateSVLsButtons/denySVLRequestButton';
import RequestSVLButton from './buttons/stateSVLsButtons/requestSVLButton';
import BuySVLButton from './buttons/stateSVLsButtons/buySVLButton';
//import { useNavigate } from 'react-router-dom'; 

type PreviewSVLsProps = {
  myAddress: string;
  filterSVL: number;
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

  const [numPreviewSVLs, setNumPreviewSVLs] = useState(0);

  const [previewSVLsInfo, setPreviewSVLsInfo] = useState<PreviewSVLsInfo[]>(
    Array.from({ length: 20 }, () => ({
      pk: '',
      mySVL: null,
      mainPhotograph: '',
      brand: '',
      model: '',
      year: '',
      stateMySVL: [null, '', null],
      stateNotMySVL: [null, '', '', null],
    }))
  );

  const getSVLPreview = () => {
    const updatedPreviewSVLsInfo = [...previewSVLsInfo];
    if (filterSVL == 0) {
      updatedPreviewSVLsInfo[0].mySVL = true;
      updatedPreviewSVLsInfo[0].mainPhotograph = 'https://uploads.automaistv.com.br/2024/10/5FbD8Ftw-Porsche-911-Turbo-12-scaled.webp';
      updatedPreviewSVLsInfo[0].brand = 'Porsche';
      updatedPreviewSVLsInfo[0].model = '911';
      updatedPreviewSVLsInfo[0].year = '2002';
      updatedPreviewSVLsInfo[0].stateMySVL = [false, '', false]; 
      updatedPreviewSVLsInfo[0].stateNotMySVL = [false, '', '', false]; 

      updatedPreviewSVLsInfo[1].mySVL = true;
      updatedPreviewSVLsInfo[1].mainPhotograph = 'https://www.diariomotor.com/imagenes/2024/07/porsche-911-992-t-hybrid-2024-1086777.jpg?class=XL';
      updatedPreviewSVLsInfo[1].brand = 'Porsche';
      updatedPreviewSVLsInfo[1].model = '911';
      updatedPreviewSVLsInfo[1].year = '2002';
      updatedPreviewSVLsInfo[1].stateMySVL = [true, 'tzgtjorhtjro7657', false]; 
      updatedPreviewSVLsInfo[1].stateNotMySVL = [false, '', '', false];

      updatedPreviewSVLsInfo[2].mySVL = true;
      updatedPreviewSVLsInfo[2].mainPhotograph = 'https://newsroom.porsche.com/.imaging/mte/porsche-templating-theme/image_1290x726/dam/ES-PLA-local/2024/Vehiculos/Peru_911GTRS/PLA24_0177_fine.jpg/jcr:content/PLA24_0177_fine.jpg';
      updatedPreviewSVLsInfo[2].brand = 'Porsche';
      updatedPreviewSVLsInfo[2].model = '911';
      updatedPreviewSVLsInfo[2].year = '2002';
      updatedPreviewSVLsInfo[2].stateMySVL = [true, 'tz432904324fwfuiefe3242', false]; 
      updatedPreviewSVLsInfo[2].stateNotMySVL = [false, '', '', false];

      updatedPreviewSVLsInfo[3].mySVL = true;
      updatedPreviewSVLsInfo[3].mainPhotograph = 'https://pictures.porsche.com/rtt/iris?COSY-EU-100-1711coMvsi60AAt5FwcmBEgA4qP8iBUDxPE3Cb9pNXkBuNYdMGF4tl3U0%25z8rMHIspbWvanYb%255y%25oq%25vSTmjMXD4qAZeoNBPUSfUx4RmHlCgI7lOYx7e2HhTc1UzQKUwIbsqYSYXV0iO5MUExHcTCkaJbKf2GLm2FSPQrIFVBMNXibeItxi%25tFNTDkDHnLwKAovfYzeP3V';
      updatedPreviewSVLsInfo[3].brand = 'Porsche';
      updatedPreviewSVLsInfo[3].model = '911';
      updatedPreviewSVLsInfo[3].year = '2002';
      updatedPreviewSVLsInfo[3].stateMySVL = [true, 'tzprewrewrw4298798798', true]; 
      updatedPreviewSVLsInfo[3].stateNotMySVL = [false, '', '', false];

      setNumPreviewSVLs(4);
    }
    else if (filterSVL == 1) {
      updatedPreviewSVLsInfo[0].mySVL = false;
      updatedPreviewSVLsInfo[0].mainPhotograph = 'https://images.ecestaticos.com/DWa-4iwKF7cA3vKBT9FZdBnFrbA=/463x145:1976x1279/1200x900/filters:fill(white):format(jpg)/f.elconfidencial.com%2Foriginal%2F7cf%2Fc50%2F732%2F7cfc507320c889c4c0560d8c269f5895.jpg';
      updatedPreviewSVLsInfo[0].brand = 'Porsche';
      updatedPreviewSVLsInfo[0].model = '911';
      updatedPreviewSVLsInfo[0].year = '2002';
      updatedPreviewSVLsInfo[0].stateMySVL = [false, '', false]; 
      updatedPreviewSVLsInfo[0].stateNotMySVL = [false, 'tz432421d1s24324211aas', '', false]; 

      updatedPreviewSVLsInfo[1].mySVL = false;
      updatedPreviewSVLsInfo[1].mainPhotograph = 'https://cdn.autobild.es/sites/navi.axelspringer.es/public/media/image/2017/07/porsche-911-turbo-s-exclusive-series_6.jpg?tf=3840x';
      updatedPreviewSVLsInfo[1].brand = 'Porsche';
      updatedPreviewSVLsInfo[1].model = '911';
      updatedPreviewSVLsInfo[1].year = '2002';
      updatedPreviewSVLsInfo[1].stateMySVL = [false, '', false]; 
      updatedPreviewSVLsInfo[1].stateNotMySVL = [true, 'tz432421d1s24324211aas', 'tz1iRXmfLXK5wWVok4MATJiw3UsgKkH9vrwX', false]; 

      updatedPreviewSVLsInfo[2].mySVL = false;
      updatedPreviewSVLsInfo[2].mainPhotograph = 'https://fotos.quecochemecompro.com/porsche-911/interior-instrumentos-porsche-911.jpg?size=750x400';
      updatedPreviewSVLsInfo[2].brand = 'Porsche';
      updatedPreviewSVLsInfo[2].model = '911';
      updatedPreviewSVLsInfo[2].year = '2002';
      updatedPreviewSVLsInfo[2].stateMySVL = [false, '', false]; 
      updatedPreviewSVLsInfo[2].stateNotMySVL = [true, 'tz432421d1s24324211aas', 'tz132123123lññlñ', false]; 

      updatedPreviewSVLsInfo[3].mySVL = false;
      updatedPreviewSVLsInfo[3].mainPhotograph = 'https://newsroom.porsche.com/.imaging/mte/porsche-templating-theme/image_1080x624/dam/pnr/2022/Motorsports/911-GT3-R-world-premiere/M22_3550_fine.jpeg/jcr:content/M22_3550_fine.jpeg';
      updatedPreviewSVLsInfo[3].brand = 'Porsche';
      updatedPreviewSVLsInfo[3].model = '911';
      updatedPreviewSVLsInfo[3].year = '2002';
      updatedPreviewSVLsInfo[3].stateMySVL = [false, '', false]; 
      updatedPreviewSVLsInfo[3].stateNotMySVL = [true, 'tz432421d1s24324211aas', 'tz132123123lññlñ', true]; 

      updatedPreviewSVLsInfo[4].mySVL = false;
      updatedPreviewSVLsInfo[4].mainPhotograph = 'https://hips.hearstapps.com/hmg-prod/images/porsche-911-carrera-gts-03-1655287035.jpg';
      updatedPreviewSVLsInfo[4].brand = 'Porsche';
      updatedPreviewSVLsInfo[4].model = '911';
      updatedPreviewSVLsInfo[4].year = '2002';
      updatedPreviewSVLsInfo[4].stateMySVL = [false, '', false]; 
      updatedPreviewSVLsInfo[4].stateNotMySVL = [true, 'tz432421d1s24324211aas', 'tz1iRXmfLXK5wWVok4MATJiw3UsgKkH9vrwX', false]; 

      updatedPreviewSVLsInfo[5].mySVL = false;
      updatedPreviewSVLsInfo[5].mainPhotograph = 'https://res.cloudinary.com/unix-center/image/upload/c_limit,dpr_3.0,f_auto,fl_progressive,g_center,h_240,q_auto:good,w_385/kpjpk6syexcbruz7gasd.jpg';
      updatedPreviewSVLsInfo[5].brand = 'Porsche';
      updatedPreviewSVLsInfo[5].model = '911';
      updatedPreviewSVLsInfo[5].year = '2002';
      updatedPreviewSVLsInfo[5].stateMySVL = [false, '', false]; 
      updatedPreviewSVLsInfo[5].stateNotMySVL = [true, 'tz432421d1s24324211aas', 'tz1iRXmfLXK5wWVok4MATJiw3UsgKkH9vrwX', true]; 

      updatedPreviewSVLsInfo[6].mySVL = false;
      updatedPreviewSVLsInfo[6].mainPhotograph = 'https://cdn.classic-trader.com/I/images/1920_1920_inset/vehicle_ad_standard_image_e78bf02795a6c14a4d85e70898c76a8c.jpg';
      updatedPreviewSVLsInfo[6].brand = 'Porsche';
      updatedPreviewSVLsInfo[6].model = '911';
      updatedPreviewSVLsInfo[6].year = '2002';
      updatedPreviewSVLsInfo[6].stateMySVL = [false, '', false]; 
      updatedPreviewSVLsInfo[6].stateNotMySVL = [true, 'tz432421d1s24324211aas', '', false]; 
      
      setNumPreviewSVLs(7);
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
      {previewSVLsInfo.slice(0, numPreviewSVLs).map((dataPreviewSVL, index) => (
        <div key={`${index}`}>
          <div className={styles.previewSVLContainer}>
            {dataPreviewSVL.mySVL == true && dataPreviewSVL.stateMySVL[0] == true &&
              <div className={styles.ownerOrRequesterContentWrapper}>
                <div className={styles.ownerOrRequesterContent}>
                  <div>{requesterAddresLabel}</div>
                  <div className={styles.separator}>
                    <div className={styles.leftSepartor}></div>
                    <div className={styles.middleSepartor}></div>
                    <div className={styles.rightSepartor}></div>
                  </div>
                  {dataPreviewSVL.stateMySVL[1]}
                </div>
              </div>
            }
            {dataPreviewSVL.mySVL == true && dataPreviewSVL.stateMySVL[0] == false &&
              <div className={styles.ownerOrRequesterContentWrapper}>
                <div className={styles.ownerOrRequesterContent}>
                  <div>{ownerMeLabel}</div>
                  <div className={styles.separator}>
                    <div className={styles.leftSepartor}></div>
                    <div className={styles.middleSepartor}></div>
                    <div className={styles.rightSepartor}></div>
                  </div>
                  {myAddress}
                </div>
              </div>
            }
            {dataPreviewSVL.mySVL == false &&
              <div className={styles.ownerOrRequesterContentWrapper}>
                <div className={styles.ownerOrRequesterContent}>
                  <div>{ownerAddressLabel}</div>
                  <div className={styles.separator}>
                    <div className={styles.leftSepartor}></div>
                    <div className={styles.middleSepartor}></div>
                    <div className={styles.rightSepartor}></div>
                  </div>
                  {dataPreviewSVL.stateNotMySVL[1]}
                </div>
              </div>
            }
            <img
              className={styles.previewSVL}
              src={dataPreviewSVL.mainPhotograph}/>
            <div className={styles.infoPreviewSVL}>
              <div>
                {brandLabel} {dataPreviewSVL.brand}
              </div>
              <div>
                {modelLabel} {dataPreviewSVL.model}
              </div>
              <div>
                {yearLabel} {dataPreviewSVL.year}  
              </div>
            </div>
            <div className={styles.separator}>
              <div className={styles.leftSepartor}></div>
              <div className={styles.middleSepartor}></div>
              <div className={styles.rightSepartor}></div>
            </div>
            {(dataPreviewSVL.mySVL == false) ? (
              dataPreviewSVL.stateNotMySVL[0] == true && dataPreviewSVL.stateNotMySVL[2] != '' && dataPreviewSVL.stateNotMySVL[2] != myAddress ? (
                <div className={styles.blockedSVL}>
                  {blockedLabel}
                </div>
              ) : (
                <div>
                  {dataPreviewSVL.stateNotMySVL[3] == false && dataPreviewSVL.stateNotMySVL[2] == '' &&
                    <div className={styles.requestSVLtransfer}>
                      <RequestSVLButton requested={false} />
                    </div>
                  }
                  {dataPreviewSVL.stateNotMySVL[3] == false && dataPreviewSVL.stateNotMySVL[2] == myAddress &&
                    <div className={styles.requestSVLtransfer}>
                      <RequestSVLButton requested={true} />
                    </div>
                  }
                  {dataPreviewSVL.stateNotMySVL[3] == true && dataPreviewSVL.stateNotMySVL[2] == myAddress &&
                    <div className={styles.buySVL}>
                      <BuySVLButton />
                    </div>
                  }
                </div>
              )
            ) : (
              dataPreviewSVL.stateMySVL[0] == false ? (
                <div className={styles.SVLNotRequested}>
                  {notRequestedLabel}
                </div>
              ) : (
                dataPreviewSVL.stateMySVL[2] == false ? (
                  <div className={styles.SVLRequested}>
                    <AcceptSVLRequestButton />
                    <DenySVLRequestButton />
                  </div>
                ) : (
                  <div className={styles.SVLPendingBuy}>
                    <div className={styles.SVLRequestAcceptedPendingBuy}>
                      {pendingBuyLabel}
                    </div>
                    <DenySVLRequestButton />
                  </div>
                )
              )
            )}  
          </div>
        </div>
      ))}
    </div>
  );
}

export default PreviewSVLs;
