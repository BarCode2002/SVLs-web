import { SetStateAction, useEffect, useState } from 'react';
import styles from '../../styles/components/dashboard/previewSVLs.module.css';
import { FilterSVLsType, PreviewSVLsInfo } from '../../utils/commonTypes';
import { useTranslation } from 'react-i18next';
import AcceptSVLRequestButton from './stateSVLsButtons/acceptSVLRequestButton';
import DenySVLRequestButton from './stateSVLsButtons/denySVLRequestButton';
import RequestSVLButton from './stateSVLsButtons/requestSVLButton';
import BuySVLButton from './stateSVLsButtons/buySVLButton';
import ChangeSVLPriceButton from './changeSVLPriceButton';
import axios, { AxiosError } from "axios";
import { useNavigate } from 'react-router-dom'; 
import pako from "pako";
import { ipfsRetrieve, indexer, mongoSmartContract } from '../../utils/ip';
import { GROUP_SIZE } from '../../utils/constants';

type PreviewSVLsProps = {
  myAddress: string;
  filterSVL: number;
  appliedFiltersSVL: FilterSVLsType;
  search: boolean;
  page: number;
  setNumPreviewSVLs: React.Dispatch<SetStateAction<number>>;
};

const PreviewSVLs = ({ myAddress, filterSVL, appliedFiltersSVL, search, page, setNumPreviewSVLs }: PreviewSVLsProps): JSX.Element => {

  const navigate = useNavigate();
  const { t } = useTranslation();

  const notRequestedLabel = t('Dashboard.Labels.notRequested');
  const pendingBuyLabel = t('Dashboard.Labels.pendingBuy');
  const blockedLabel = t('Dashboard.Labels.blocked');
  const requesterAddresLabel = t('Dashboard.Labels.requesterAddress');
  const ownerAddressLabel = t('Dashboard.Labels.ownerAddress');
  const ownerMeLabel = t('Dashboard.Labels.ownerMe');

  //const [numGroupPreviewSVLs, setNumGroupPreviewSVLs] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [split, setSplit] = useState(1);

  const urlIPFS = ipfsRetrieve;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); 
    }, 1000);
    setIsLoading(true);
    return () => clearTimeout(timer);
  }, [filterSVL, search, page]);

  const [previewSVLsInfo, setPreviewSVLsInfo] = useState<PreviewSVLsInfo[]>(
    Array.from({ length: GROUP_SIZE }, () => ({
      pk: '',
      price: 0,
      mySVL: null,
      mainPhotograph: '',
      brand: '',
      model: '',
      year: '',
      stateMySVL: [null, '', null],
      stateNotMySVL: [null, '', '', null, null],
    }))
  );
  
  const getSVLPreview = async () => {
    try {
      const responseMongo = await axios.get(`${mongoSmartContract}`);
      setSplit(responseMongo.data.split);
    } catch (error: any | AxiosError) {
      console.error("Unexpected error:", error);
    }
    const updatedPreviewSVLsInfo = [...previewSVLsInfo];
    for (let i = 0; i < GROUP_SIZE; i++) {
      updatedPreviewSVLsInfo[i] = {
        pk: '',
        price: 0,
        mySVL: null,
        mainPhotograph: '',
        brand: '',
        model: '',
        year: '',
        stateMySVL: [null, '', null],
        stateNotMySVL: [null, '', '', null, null],
      }
    }
    let url;
    if (filterSVL == 0) url = `${indexer}holder/my_svls?owner_address=${myAddress}&page=${page}`;
    else if (filterSVL == 1) url = `${indexer}holder/requested_svls?requester_address=${myAddress}&page=${page}`;
    else url = `${indexer}holder/filterSVL?owner_address=${myAddress}&page=${page}`;
    try {
      let responseIndexer;
      if (filterSVL == 0 ||  filterSVL == 1) responseIndexer = await axios.get(url);
      else {
        responseIndexer = await axios.post(url, JSON.stringify(appliedFiltersSVL), {
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }
      setNumPreviewSVLs(responseIndexer.data[1]);
      for (let i = 0; i < responseIndexer.data[0].length; i++) {
        let latestCid;
        if (responseIndexer.data[0][i].current_owner_info[0] == '') {
          latestCid = responseIndexer.data[0][i].previous_owners_info[0].cids[responseIndexer.data[0][i].previous_owners_info[0].cids.length-1];
        }
        else latestCid = responseIndexer.data[0][i].current_owner_info[responseIndexer.data[0][i].current_owner_info.length-1];
        try {
          const responseIPFS = await axios.get(`${urlIPFS}${latestCid}`, {
            responseType: "arraybuffer",
          });
          const compressedIPFSData = new Uint8Array(responseIPFS.data);
          const decompressedIPFSData = pako.ungzip(compressedIPFSData, { to: "string" });
          const parsedIPFSData = JSON.parse(decompressedIPFSData);
          updatedPreviewSVLsInfo[i].pk = responseIndexer.data[0][i].svl_key;
          updatedPreviewSVLsInfo[i].price = responseIndexer.data[0][i].svl_price.slice(0, -6);
          updatedPreviewSVLsInfo[i].mainPhotograph = parsedIPFSData[0].images[0];
          updatedPreviewSVLsInfo[i].brand = responseIndexer.data[0][i].brand;
          updatedPreviewSVLsInfo[i].model = responseIndexer.data[0][i].model;
          updatedPreviewSVLsInfo[i].year = responseIndexer.data[0][i].year;
          if (myAddress == responseIndexer.data[0][i].owner_address) { //my SVL
            if (myAddress == responseIndexer.data[0][i].requester_address) updatedPreviewSVLsInfo[i].stateMySVL = [false, '', false]; //not requested
            else updatedPreviewSVLsInfo[i].stateMySVL = [true, responseIndexer.data[0][i].requester_address, responseIndexer.data[0][i].request_accepted]; //requested and set if request accepted or not
            updatedPreviewSVLsInfo[i].stateNotMySVL = [false, '', '', false, false]; //whatever
            updatedPreviewSVLsInfo[i].mySVL = true;
          }
          else {
            if (responseIndexer.data[0][i].current_owner_info[0] == '') { //not my SVL
              updatedPreviewSVLsInfo[i].stateNotMySVL = [false, responseIndexer.data[0][i].owner_address, '', false, true]; //check if just transferred -> blocked
            }
            else if (responseIndexer.data[0][i].owner_address != responseIndexer.data[0][i].requester_address) { //requested, save the requester address and if it has been accepted
              updatedPreviewSVLsInfo[i].stateNotMySVL = [true, responseIndexer.data[0][i].owner_address, responseIndexer.data[0][i].requester_address, responseIndexer.data[0][i].request_accepted, false]; 
            }
            else updatedPreviewSVLsInfo[i].stateNotMySVL = [false, responseIndexer.data[0][i].owner_address, '', false, false];  //not requested but not just transferred
            updatedPreviewSVLsInfo[i].stateMySVL = [false, '', false]; //whatever
            updatedPreviewSVLsInfo[i].mySVL = false;
          }
        } catch (error) {
          console.log("Error retriving JSON:", error);
        }
      }
      //setNumGroupPreviewSVLs(responseIndexer.data[0].length);
    } catch (error: any | AxiosError) {
      if (axios.isAxiosError(error)) {
        if (error.status == 404) {
          setNumPreviewSVLs(0);
          //setNumGroupPreviewSVLs(0);
        }
      }
      console.error("Unexpected error:", error);
    }
    setPreviewSVLsInfo(updatedPreviewSVLsInfo);
  };

  useEffect(() => {
    getSVLPreview();
  }, [filterSVL, search, page, myAddress]);

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
          {previewSVLsInfo.filter(preview => preview.pk != '').map((dataPreviewSVL, index) => (
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
                  ((dataPreviewSVL.stateNotMySVL[0] == true && dataPreviewSVL.stateNotMySVL[2] != '' && dataPreviewSVL.stateNotMySVL[2] != myAddress) || (dataPreviewSVL.stateNotMySVL[4] == true)) ? (
                    <div>
                      <ChangeSVLPriceButton previewSVLsInfo={previewSVLsInfo} setPreviewSVLsInfo={setPreviewSVLsInfo} index={index} split={split} />
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
                          <ChangeSVLPriceButton previewSVLsInfo={previewSVLsInfo} setPreviewSVLsInfo={setPreviewSVLsInfo} index={index} split={split} />
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
                          <ChangeSVLPriceButton previewSVLsInfo={previewSVLsInfo} setPreviewSVLsInfo={setPreviewSVLsInfo} index={index} split={split} />
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
                          <ChangeSVLPriceButton previewSVLsInfo={previewSVLsInfo} setPreviewSVLsInfo={setPreviewSVLsInfo} index={index} split={split} />
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
                      <ChangeSVLPriceButton previewSVLsInfo={previewSVLsInfo} setPreviewSVLsInfo={setPreviewSVLsInfo} index={index} split={split} />
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
                        <ChangeSVLPriceButton previewSVLsInfo={previewSVLsInfo} setPreviewSVLsInfo={setPreviewSVLsInfo} index={index} split={split} />
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
                        <ChangeSVLPriceButton previewSVLsInfo={previewSVLsInfo} setPreviewSVLsInfo={setPreviewSVLsInfo} index={index} split={split} />
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