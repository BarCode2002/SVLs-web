import { useEffect, useState } from 'react';
import styles from '../../styles/components/dashboard/previewSVLs.module.css';
import { PreviewSVLsInfo } from '../../utils/interfaces';
import { useTranslation } from 'react-i18next';
import AcceptSVLRequestButton from './stateSVLsButtons/acceptSVLRequestButton';
import DenySVLRequestButton from './stateSVLsButtons/denySVLRequestButton';
import RequestSVLButton from './stateSVLsButtons/requestSVLButton';
import BuySVLButton from './stateSVLsButtons/buySVLButton';
import ChangeSVLPriceButton from './changeSVLPriceButton';
import axios, { AxiosError } from "axios";
import { useNavigate } from 'react-router-dom'; 
import pako from "pako";
import { ipfsRetrieve, indexer } from '../../utils/ip';

type PreviewSVLsProps = {
  myAddress: string;
  filterSVL: number;
  VIN: string;
  search: boolean;
};

const PreviewSVLs = ({ myAddress, filterSVL, VIN, search }: PreviewSVLsProps): JSX.Element => {

  const navigate = useNavigate();
  const { t } = useTranslation();

  const notRequestedLabel = t('Dashboard.Labels.notRequested');
  const pendingBuyLabel = t('Dashboard.Labels.pendingBuy');
  const blockedLabel = t('Dashboard.Labels.blocked');
  const requesterAddresLabel = t('Dashboard.Labels.requesterAddress');
  const ownerAddressLabel = t('Dashboard.Labels.ownerAddress');
  const ownerMeLabel = t('Dashboard.Labels.ownerMe');

  const [numPreviewSVLs, setNumPreviewSVLs] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const urlIPFS = ipfsRetrieve;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); 
    }, 1000);
    setIsLoading(true);
    return () => clearTimeout(timer);
  }, [filterSVL, search]);

  const [previewSVLsInfo, setPreviewSVLsInfo] = useState<PreviewSVLsInfo[]>(
    Array.from({ length: 20 }, () => ({
      pk: '',
      price: 0,
      mySVL: null,
      mainPhotograph: '',
      brand: '',
      model: '',
      year: '',
      stateMySVL: [null, '', null],
      stateNotMySVL: [null, '', '', null],
    }))
  );
  
  const getSVLPreview = async () => {
    let url;
    if (filterSVL == 0) url = `${indexer}holder/owner_address/${myAddress}`;
    else if (filterSVL == 1) url = `${indexer}holder/requested_svls?requester_address=${myAddress}`;
    else url = `${indexer}holder/by_vin?vin=${VIN}&owner_address=${myAddress}`;
    try {
      const responseIndexer = await axios.get(url);
      const updatedPreviewSVLsInfo = [...previewSVLsInfo];
      for (let i = 0; i < responseIndexer.data.length; i++) {
        let latestCid;
        if (responseIndexer.data[i].current_owner_info[0] == '') {
          latestCid = responseIndexer.data[i].previous_owners_info[0].cids[responseIndexer.data[i].previous_owners_info[0].cids.length-1];
        }
        else latestCid = responseIndexer.data[i].current_owner_info[responseIndexer.data[i].current_owner_info.length-1];
        try {
          const responseIPFS = await axios.get(`${urlIPFS}${latestCid}`, {
            responseType: "arraybuffer",
          });
          const compressedIPFSData = new Uint8Array(responseIPFS.data);
          const decompressedIPFSData = pako.ungzip(compressedIPFSData, { to: "string" });
          const parsedIPFSData = JSON.parse(decompressedIPFSData);
          updatedPreviewSVLsInfo[i].pk = responseIndexer.data[i].svl_key;
          updatedPreviewSVLsInfo[i].price = responseIndexer.data[i].svl_price.slice(0, -6);
          updatedPreviewSVLsInfo[i].mainPhotograph = parsedIPFSData[0].mainPhotograph;
          updatedPreviewSVLsInfo[i].brand = responseIndexer.data[i].brand;
          updatedPreviewSVLsInfo[i].model = responseIndexer.data[i].model;
          updatedPreviewSVLsInfo[i].year = responseIndexer.data[i].year;
          if (myAddress == responseIndexer.data[i].owner_address) {
            if (myAddress == responseIndexer.data[i].requester_address) updatedPreviewSVLsInfo[i].stateMySVL = [false, '', false]; 
            else updatedPreviewSVLsInfo[i].stateMySVL = [true, responseIndexer.data[i].requester_address, responseIndexer.data[i].request_accepted]; 
            updatedPreviewSVLsInfo[i].stateNotMySVL = [false, '', '', false]; 
            updatedPreviewSVLsInfo[i].mySVL = true;
          }
          else {
            if (responseIndexer.data[i].owner_address != responseIndexer.data[i].requester_address) {
              updatedPreviewSVLsInfo[i].stateNotMySVL = [true, responseIndexer.data[i].owner_address, responseIndexer.data[i].requester_address, responseIndexer.data[i].request_accepted]; 
            }
            else updatedPreviewSVLsInfo[i].stateNotMySVL = [false, responseIndexer.data[i].owner_address, '', false]; 
            updatedPreviewSVLsInfo[i].stateMySVL = [false, '', false]; 
            updatedPreviewSVLsInfo[i].mySVL = false;
          }
        } catch (error) {
          //console.log("Error retriving JSON:", error);
        }
      }
      setPreviewSVLsInfo(updatedPreviewSVLsInfo);
      setNumPreviewSVLs(responseIndexer.data.length);
    } catch (error: any | AxiosError) {
      if (axios.isAxiosError(error)) {
        if (error.status == 404) setNumPreviewSVLs(0);
      }
      //console.error("Unexpected error:", error);
    }
  };

  useEffect(() => {
    getSVLPreview();
  }, [filterSVL, search, myAddress]);

  const viewSVLInDetail = (svl_pk: string) => {
    navigate(`/data/${svl_pk}`); 
  }

  return (
    <div>
      {isLoading == true ? (
        <div className={styles.previewSVLsContainerLoading}>
          <div className={styles.dotContainer}>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
          </div>
        </div>
      ) :
        <div className={styles.previewSVLsContainer}>
          {previewSVLsInfo.slice(0, numPreviewSVLs).map((dataPreviewSVL, index) => (
            <div key={`${index}`}>
              <div className={styles.previewSVLContainer}>
                {dataPreviewSVL.mySVL == true && dataPreviewSVL.stateMySVL[0] == true &&
                  <div className={styles.ownerOrRequesterContentWrapper}>
                    <div className={styles.ownerOrRequesterContent}>
                      {requesterAddresLabel}
                      <div className={styles.separator}>
                        <div className={styles.leftSepartor}></div>
                        <div className={styles.middleSepartor}></div>
                        <div className={styles.rightSepartor}></div>
                      </div>
                      <div>
                        {dataPreviewSVL.stateMySVL[1]}
                      </div>
                    </div>
                  </div>
                }
                {dataPreviewSVL.mySVL == true && dataPreviewSVL.stateMySVL[0] == false &&
                  <div className={styles.ownerOrRequesterContentWrapper}>
                    <div className={styles.ownerOrRequesterContent}>
                      {ownerMeLabel}
                      <div className={styles.separator}>
                        <div className={styles.leftSepartor}></div>
                        <div className={styles.middleSepartor}></div>
                        <div className={styles.rightSepartor}></div>
                      </div>
                      <div>
                        {myAddress}
                      </div>
                    </div>
                  </div>
                }
                {dataPreviewSVL.mySVL == false &&
                  <div className={styles.ownerOrRequesterContentWrapper}>
                    <div className={styles.ownerOrRequesterContent}>
                      {ownerAddressLabel}
                      <div className={styles.separator}>
                        <div className={styles.leftSepartor}></div>
                        <div className={styles.middleSepartor}></div>
                        <div className={styles.rightSepartor}></div>
                      </div>
                      <div>
                        {dataPreviewSVL.stateNotMySVL[1]} 
                      </div>
                    </div>
                  </div>
                }
                <img
                  className={styles.previewSVL}
                  src={`${urlIPFS}${dataPreviewSVL.mainPhotograph}`}
                  onClick={() => viewSVLInDetail(dataPreviewSVL.pk)}
                />
                <div className={styles.infoPreviewSVL}>
                  <div>
                    {dataPreviewSVL.brand}
                  </div>
                  <div>
                    {dataPreviewSVL.model}
                  </div>
                  <div>
                    {dataPreviewSVL.year}  
                  </div>
                </div>
                <div className={styles.separator}>
                  <div className={styles.leftSepartor}></div>
                  <div className={styles.middleSepartor}></div>
                  <div className={styles.rightSepartor}></div>
                </div>
                {(dataPreviewSVL.mySVL == false) ? (
                  dataPreviewSVL.stateNotMySVL[0] == true && dataPreviewSVL.stateNotMySVL[2] != '' && dataPreviewSVL.stateNotMySVL[2] != myAddress ? (
                    <div>
                      <ChangeSVLPriceButton previewSVLsInfo={previewSVLsInfo} setPreviewSVLsInfo={setPreviewSVLsInfo} index={index} />
                      <div className={styles.separator}>
                        <div className={styles.leftSepartor}></div>
                        <div className={styles.middleSepartor}></div>
                        <div className={styles.rightSepartor}></div>
                      </div>
                      <div className={styles.blockedSVL}>
                        {blockedLabel}
                      </div>
                    </div>
                  ) : (
                    <div>
                      {dataPreviewSVL.stateNotMySVL[3] == false && dataPreviewSVL.stateNotMySVL[2] == '' &&
                        <div>
                          <ChangeSVLPriceButton previewSVLsInfo={previewSVLsInfo} setPreviewSVLsInfo={setPreviewSVLsInfo} index={index} />
                          <div className={styles.separator}>
                            <div className={styles.leftSepartor}></div>
                            <div className={styles.middleSepartor}></div>
                            <div className={styles.rightSepartor}></div>
                          </div>
                          <div className={styles.requestSVLtransfer}>
                            <RequestSVLButton requested={false} previewSVLsInfo={previewSVLsInfo} setPreviewSVLsInfo={setPreviewSVLsInfo} index={index} />
                          </div>
                        </div>
                      }
                      {dataPreviewSVL.stateNotMySVL[3] == false && dataPreviewSVL.stateNotMySVL[2] == myAddress &&
                        <div>
                          <ChangeSVLPriceButton previewSVLsInfo={previewSVLsInfo} setPreviewSVLsInfo={setPreviewSVLsInfo} index={index} />
                          <div className={styles.separator}>
                            <div className={styles.leftSepartor}></div>
                            <div className={styles.middleSepartor}></div>
                            <div className={styles.rightSepartor}></div>
                          </div>
                          <div className={styles.requestSVLtransfer}>
                            <RequestSVLButton requested={true} previewSVLsInfo={previewSVLsInfo} setPreviewSVLsInfo={setPreviewSVLsInfo} index={index} />
                          </div>
                        </div>
                      }
                      {dataPreviewSVL.stateNotMySVL[3] == true && dataPreviewSVL.stateNotMySVL[2] == myAddress &&
                        <div>
                          <ChangeSVLPriceButton previewSVLsInfo={previewSVLsInfo} setPreviewSVLsInfo={setPreviewSVLsInfo} index={index} />
                          <div className={styles.separator}>
                            <div className={styles.leftSepartor}></div>
                            <div className={styles.middleSepartor}></div>
                            <div className={styles.rightSepartor}></div>
                          </div>
                          <div className={styles.buySVL}>
                            <BuySVLButton previewSVLsInfo={previewSVLsInfo} setPreviewSVLsInfo={setPreviewSVLsInfo} index={index} />
                            <RequestSVLButton requested={true} previewSVLsInfo={previewSVLsInfo} setPreviewSVLsInfo={setPreviewSVLsInfo} index={index} />
                          </div>
                        </div>
                      }
                    </div>
                  )
                ) : (
                  dataPreviewSVL.stateMySVL[0] == false ? (
                    <div>
                      <ChangeSVLPriceButton previewSVLsInfo={previewSVLsInfo} setPreviewSVLsInfo={setPreviewSVLsInfo} index={index} />
                      <div className={styles.separator}>
                        <div className={styles.leftSepartor}></div>
                        <div className={styles.middleSepartor}></div>
                        <div className={styles.rightSepartor}></div>
                      </div>
                      <div className={styles.SVLNotRequested}>
                        {notRequestedLabel}
                      </div>
                    </div>
                  ) : (
                    dataPreviewSVL.stateMySVL[2] == false ? (
                      <div>
                        <ChangeSVLPriceButton previewSVLsInfo={previewSVLsInfo} setPreviewSVLsInfo={setPreviewSVLsInfo} index={index} />
                        <div className={styles.separator}>
                          <div className={styles.leftSepartor}></div>
                          <div className={styles.middleSepartor}></div>
                          <div className={styles.rightSepartor}></div>
                        </div>
                        <div className={styles.SVLRequested}>
                          <AcceptSVLRequestButton previewSVLsInfo={previewSVLsInfo} setPreviewSVLsInfo={setPreviewSVLsInfo} index={index} />
                          <DenySVLRequestButton previewSVLsInfo={previewSVLsInfo} setPreviewSVLsInfo={setPreviewSVLsInfo} index={index} />
                        </div>
                      </div>
                    ) : (
                      <div>
                        <ChangeSVLPriceButton previewSVLsInfo={previewSVLsInfo} setPreviewSVLsInfo={setPreviewSVLsInfo} index={index} />
                        <div className={styles.separator}>
                          <div className={styles.leftSepartor}></div>
                          <div className={styles.middleSepartor}></div>
                          <div className={styles.rightSepartor}></div>
                        </div>
                        <div className={styles.SVLPendingBuy}>
                          <div className={styles.SVLRequestAcceptedPendingBuy}>
                            {pendingBuyLabel}
                          </div>
                          <DenySVLRequestButton previewSVLsInfo={previewSVLsInfo} setPreviewSVLsInfo={setPreviewSVLsInfo} index={index} />
                        </div>
                      </div>
                    )
                  )
                )}  
              </div>
            </div>
          ))}
        </div>
      }
    </div>
  );
}

export default PreviewSVLs;