import { SetStateAction, useEffect, useRef, useState } from 'react';
import styles from '../../../styles/components/dataSVL/fields/responsibleField.module.css';
import { DetectClickOutsideComponent } from '../../varied/detectClickOutsideComponent';
import { GoBackArrowIcon } from '../../../assets/goBackArrow';
import { useTranslation } from "react-i18next";
import { TrashIconRed } from '../../../assets/trash';
import axios from "axios";
import { ipfsRetrieve, ipfsUpload, mongoList } from '../../../utils/ip';

type ResponsibleFieldProps = {
  fieldLabel: string;
  selectedOwner: number;
  selectedGroup: number;
  dataSVL: any;
  value: [number | null, string, boolean | null, string];
  setDataSVL: React.Dispatch<SetStateAction<any>>;
  type: string;
  editMode: boolean;
  jsonUploaded?: boolean;
}

const ResponsibleField = ({ fieldLabel, selectedOwner, selectedGroup, dataSVL, value, setDataSVL, type, editMode, jsonUploaded }: ResponsibleFieldProps) => {

  const { t } = useTranslation();

  const urlIPFS = ipfsRetrieve;

  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showBig, setShowBig] = useState(false);
  const [imagesSaved, setImagesSaved] = useState(false);
  const [mechanicsList, setMechanicsList] = useState<string[]>(['']);

  useEffect(() => {
    const getMechanics = async () => {
      try {
        const responseMongo = await axios.get(`${mongoList}mechanic`);
        setMechanicsList(responseMongo.data);
      } catch (error) {
        console.error("Unexpected error:", error);
      }
    }
    getMechanics();
  }, []);

  useEffect(() => {
    if (value[3][4] == ':') setImagesSaved(false);
    else setImagesSaved(true);
    setSearchQuery(value[1]);
  }, [jsonUploaded]);

  const imageInputId = `${selectedGroup}`;

  const handleResponsible = (responsible: number) => {
    if (dataSVL[selectedOwner].group[selectedGroup].responsible[0] != responsible) {
      const updatedDataSVL = [...dataSVL];
      updatedDataSVL[selectedOwner].group[selectedGroup].responsible[0] = responsible;  
      updatedDataSVL[selectedOwner].group[selectedGroup].responsible[1] = '';  
      updatedDataSVL[selectedOwner].group[selectedGroup].responsible[2] = null;
      updatedDataSVL[selectedOwner].group[selectedGroup].responsible[3] = '';  
      setDataSVL(updatedDataSVL);
      setSearchQuery('');
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value != '') {
      setIsOpen(true);
      setSearchQuery(event.target.value);
    }
    else {
      setSearchQuery('');
    }
  }

  const handleMechanicSelected = (mechanic: string) => {
    const updatedDataSVL = [...dataSVL];
    updatedDataSVL[selectedOwner].group[selectedGroup].responsible[1] = mechanic;    
    setDataSVL(updatedDataSVL);
    setSearchQuery(mechanic);
    setIsOpen(false);
  }

  const handleYesProof = () => {
    const updatedDataSVL = [...dataSVL];
    updatedDataSVL[selectedOwner].group[selectedGroup].responsible[2] = true;    
    setDataSVL(updatedDataSVL);
  }

  const handleNoProof = () => {
    const updatedDataSVL = [...dataSVL];
    updatedDataSVL[selectedOwner].group[selectedGroup].responsible[2] = false;    
    setDataSVL(updatedDataSVL);
    removeUploadedImage();
  }

  const handleImageField = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const updatedDataSVL = [...dataSVL];
      updatedDataSVL[selectedOwner].group[selectedGroup].responsible[3] = URL.createObjectURL(event.target.files[0]);    
      setDataSVL(updatedDataSVL);
      setImagesSaved(false);
    }
    event.target.value = '';
  }

  const changeImageSize = (size: string) => {
    if (size == 'big') setShowBig(true);
    else setShowBig(false);
  }

  const removeUploadedImage = () => {
    const updatedDataSVL = [...dataSVL];
    updatedDataSVL[selectedOwner].group[selectedGroup].responsible[3] = '';    
    setDataSVL(updatedDataSVL);
    setShowBig(false);
  }

  const refClickOutside = DetectClickOutsideComponent(() => { 
    if (isOpen) setIsOpen(false); 
  });

  const handleUploadImagesToIPFS = async () => {
    try {
      const formData = new FormData();
      const response = await fetch(value[3]);
      const blob = await response.blob();     
      const fileExtension = value[3].split('.').pop()?.toLowerCase();
      formData.append("file", blob, `image/${fileExtension}`);
      const uploadResponse = await axios.post(ipfsUpload, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const updatedDataSVL = [...dataSVL];
      updatedDataSVL[selectedOwner].group[selectedGroup].responsible[3] = uploadResponse.data.cids[0];    
      setDataSVL(updatedDataSVL);
      setImagesSaved(true);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  }

  const imagePreviewContainer = useRef(null);

  const renderQuestionProofTest = () => {
    if (type === 'maintenances') {
      if (value[0]) return t('DataSVL.Placeholders.canYouProveItMaintenanancesMechanic');
      else return t('DataSVL.Placeholders.canYouProveItMaintenanances');
    }
    if (type === 'modifications') {
      if (value[0]) return t('DataSVL.Placeholders.canYouProveItModifiactionsMechanic');
      else return t('DataSVL.Placeholders.canYouProveItModifiactions');
    }
    else {
      if (value[0]) return t('DataSVL.Placeholders.canYouProveItRepairsMechanic');
      else return t('DataSVL.Placeholders.canYouProveItRepairs');
    }
  };

  return (
    <div className={styles.responsibleFieldContainer}>
      <div className={styles.fieldLabel}>
        {fieldLabel}
      </div>
      <div className={styles.dataContainer}>
        <div className={styles.dataContainerTopPart}>
          <div>
            <button
              className={value[0] == 0 ? styles.leftButtonSelected : styles.leftButton}
              onClick={() => handleResponsible(0)}
              disabled={!editMode}>
              {t('DataSVL.Placeholders.owner')}
            </button>
            <button
              className={value[0] == 1 ? styles.middleButtonSelected : styles.middleButton}
              onClick={() => handleResponsible(1)}
              disabled={!editMode}>
              OEM
            </button>
            <button
              className={value[0] == 2 ? styles.middleButtonSelected : styles.middleButton}
              onClick={() => handleResponsible(2)}
              disabled={!editMode}>
              {t('DataSVL.Placeholders.mechanic')}
            </button>
            <button
              className={value[0] == 3 ? styles.rightButtonSelected : styles.rightButton}
              onClick={() => handleResponsible(3)}
              disabled={!editMode}>
              {t('DataSVL.Placeholders.unknown')}
            </button>
          </div>
          {value[0] == 2 &&
            <div className={styles.setMechanicContainer}>
              <input
                className={styles.inputField}
                placeholder={t('DataSVL.Placeholders.mechanicShop')}
                value={searchQuery}
                onChange={handleInputChange}
                disabled={!editMode}
              />
              {isOpen && searchQuery != '' &&
                <div ref={refClickOutside} className={styles.mechanicsListWrapper}>
                  <div className={styles.mechanicsList}>
                    {mechanicsList.filter(mechanic => mechanic.toLowerCase().includes(searchQuery.toLowerCase())).map((mechanic, index) => (
                      <button
                        key={index}
                        className={styles.mechanic}
                        onClick={() => handleMechanicSelected(mechanic)}
                        disabled={!editMode}>
                        {mechanic}
                      </button>
                    ))}
                  </div>
                </div>
              }
              <button
                className={styles.saveImagesButton}
                onClick={() => handleMechanicSelected(searchQuery)}
                disabled={!editMode || value[1] == searchQuery}>
                {t('DataSVL.Labels.save')}
              </button>
            </div>
          }
        </div>
        {((value[0] == 0) || (value[0] == 2 && value[1] != ''))  &&
          <div className={styles.dataContainerBottomPart}>
            <div className={styles.questionProofContainer}>
              <div className={styles.questionProofText}>
                {renderQuestionProofTest()}
              </div>
              <button
                className={value[2] != true ? styles.leftButton : styles.leftButtonSelected}
                onClick={handleYesProof}
                disabled={!editMode}>
                {t('DataSVL.Placeholders.yes')}
              </button>
              <button
                className={value[2] != false ? styles.rightButton : styles.rightButtonSelected}
                onClick={handleNoProof}
                disabled={!editMode}>
                {t('DataSVL.Placeholders.no')}
              </button>
            </div>
            {value[2] == true && 
              <div>
                <div>
                  <button 
                    className={styles.fileInput}
                    onClick={() => document.getElementById(imageInputId)!.click()}
                    disabled={!editMode}>
                    {t('DataSVL.Placeholders.uploadProof')}
                  </button>
                  <input 
                    type="file" 
                    multiple={false}
                    onChange={handleImageField}
                    id={imageInputId}
                    style={{ display: 'none' }}
                  />
                  <button
                    className={styles.saveImagesButton}
                    onClick={() => handleUploadImagesToIPFS()}
                    disabled={value[3] == '' || editMode == false || imagesSaved == true}>
                    {t('DataSVL.Labels.save')}
                  </button>
                </div>
                {value[3] != '' &&
                  <div>
                    {showBig == false ? (
                      <div className={styles.imageSmallContainer}>
                        <img
                          className={styles.imageSmall}
                          onClick={() => changeImageSize('big')}
                          src={value[3][4] != ':' ? `${urlIPFS}${value[3]}` : value[3]}
                        />
                        <div className={styles.removeImageButtonWrapper}>
                          <button
                            className={styles.removeImageButton}
                            onClick={removeUploadedImage}
                            disabled={!editMode}>
                            <TrashIconRed />
                          </button>
                        </div>
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
                            src={value[3][4] != ':' ? `${urlIPFS}${value[3]}` : value[3]}
                          />
                        </div>
                        <div ref={imagePreviewContainer} className={styles.imagePreviewContainer}>
                          {[value[3]].filter(url => url != '').map((url, index) => (
                            <div key={`${url}-${index}`}>
                              <div className={styles.removeImageButtonWrapper}>
                                <button
                                  className={styles.removeImagePreviewButton}
                                  onClick={() => removeUploadedImage()}
                                  disabled={!editMode}>
                                  <TrashIconRed />
                                </button>
                              </div>
                              {showBig ? (
                                <img
                                  className={styles.imageSmallSelected}
                                  onClick={() => changeImageSize('big')}
                                  src={url[4] != ':' ? `${urlIPFS}${url}` : url}
                                />
                              ) : (
                                <img
                                  className={styles.imageSmall}
                                  onClick={() => changeImageSize('big')}
                                  src={url[4] != ':' ? `${urlIPFS}${url}` : url}
                                />
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                }
              </div>
            }
          </div>
        }
      </div>
    </div>
  );
};

export default ResponsibleField;