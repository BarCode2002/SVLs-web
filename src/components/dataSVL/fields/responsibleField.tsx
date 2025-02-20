import { SetStateAction, useEffect, useRef, useState } from 'react';
import styles from '../../../styles/components/dataSVL/fields/responsibleField.module.css';
import { DetectClickOutsideComponent } from '../../varied/detectClickOutsideComponent';
import { GoBackArrowIcon } from '../../../assets/goBackArrow';
import { useTranslation } from "react-i18next";
import { TrashIconRed } from '../../../assets/trash';
import axios from "axios";

type ResponsibleFieldProps = {
  fieldLabel: string;
  selectedOwner: number;
  selectedGroup: number;
  dataSVL: any;
  value: [boolean | null, string, boolean | null, string];
  setDataSVL: React.Dispatch<SetStateAction<any>>;
  editMode: boolean;
}

const ResponsibleField = ({ fieldLabel, selectedOwner, selectedGroup, dataSVL, value, setDataSVL, editMode }: ResponsibleFieldProps) => {

  const { t } = useTranslation();

  const urlIPFS = 'http://127.0.0.1:8080/ipfs/';

  const [step, setStep] = useState(0);
  const [mechanic, setMechanic] = useState<boolean | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [proof, setProof] = useState<boolean | null>(null);
  const [showBig, setShowBig] = useState(false);
  const [imagesSaved, setImagesSaved] = useState(false);

  useEffect(() => {
    if (value[3][4] == ':') setImagesSaved(false);
    else setImagesSaved(true);
  }, []);

  const imageInputId = `${selectedGroup}`;
  
  const mechanicsList = ['Pepe', 'Jaja', 'ewfgew', 'Camion', 'avion', 'pepa', 'pepo', 'pepin', 'pepapaa', 'pepeeee', 'pepitp'];

  useEffect(() => {
    if (value[0] != null) {
      setStep(1);
      setMechanic(value[0]);
      if (value[0] == true && value[1] != '') {
        setStep(2);
        setSearchQuery(value[1]);
      }
      if (value[2] != null) {
        setStep(3);
        setProof(value[2]);
      }
    }
    else {
      setProof(null);
      setMechanic(null);
      setStep(0);
      setSearchQuery('');
    }
  }, [selectedOwner]);

  const handleMeResponsible = () => {
    const updatedDataSVL = [...dataSVL];
    updatedDataSVL[selectedOwner].group[selectedGroup].responsible[0] = false;    
    setDataSVL(updatedDataSVL);
    setMechanic(false);
    setProof(null);
    setStep(2);
  }

  const handleMechanicResponsible = () => {
    const updatedDataSVL = [...dataSVL];
    updatedDataSVL[selectedOwner].group[selectedGroup].responsible[0] = true;    
    setDataSVL(updatedDataSVL);
    setMechanic(true);
    setProof(null);
    setSearchQuery('');
    setStep(1);
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value != '') {
      setIsOpen(true);
      setSearchQuery(event.target.value);
    }
    else {
      setStep(1);
      setSearchQuery('');
    }
  }

  const handleMechanicSelected = (mechanic: string) => {
    const updatedDataSVL = [...dataSVL];
    updatedDataSVL[selectedOwner].group[selectedGroup].responsible[1] = mechanic;    
    setDataSVL(updatedDataSVL);
    setSearchQuery(mechanic);
    setIsOpen(false);
    setStep(2);
  }

  const handleYesProof = () => {
    const updatedDataSVL = [...dataSVL];
    updatedDataSVL[selectedOwner].group[selectedGroup].responsible[2] = true;    
    setDataSVL(updatedDataSVL);
    setProof(true);
    setStep(3);
  }

  const handleNoProof = () => {
    const updatedDataSVL = [...dataSVL];
    updatedDataSVL[selectedOwner].group[selectedGroup].responsible[2] = false;    
    setDataSVL(updatedDataSVL);
    setProof(false);
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
      const uploadResponse = await axios.post("http://127.0.0.1:3000/upload", formData, {
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

  return (
    <div className={styles.responsibleFieldContainer}>
      <div className={styles.fieldLabel}>
        {fieldLabel}
      </div>
      <div className={styles.dataContainer}>
        {step >= 0 &&
          <div>
            <button
              className={mechanic != false ? styles.leftButton : styles.leftButtonSelected}
              onClick={handleMeResponsible}
              disabled={!editMode}>
              {t('DataSVL.Placeholders.me')}
            </button>
            <button
              className={mechanic != true ? styles.rightButton : styles.rightButtonSelected}
              onClick={handleMechanicResponsible}
              disabled={!editMode}>
              {t('DataSVL.Placeholders.mechanic')}
            </button>
          </div>
        }
        {step >= 1 && mechanic == true &&
          <div>
            <input
              className={styles.inputField}
              placeholder={t('DataSVL.Placeholders.mechanicShop')}
              value={searchQuery}
              onChange={handleInputChange}
              disabled={!editMode}
            />
            {isOpen && searchQuery != '' &&
              <div className={styles.mechanicsListWrapper}>
                <div ref={refClickOutside} className={styles.mechanicsList}>
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
          </div>
        }
        {step >= 2 &&
          <div className={styles.questionProofContainer}>
            <div className={styles.questionProofText}>
              {t('DataSVL.Placeholders.canYouProveItMaintenanances')}
            </div>
            <button
              className={proof != true ? styles.leftButton : styles.leftButtonSelected}
              onClick={handleYesProof}
              disabled={!editMode}>
              {t('DataSVL.Placeholders.yes')}
            </button>
            <button
              className={proof != false ? styles.rightButton : styles.rightButtonSelected}
              onClick={handleNoProof}
              disabled={!editMode}>
              {t('DataSVL.Placeholders.no')}
            </button>
          </div>
        }
        {step >= 3 && proof == true && 
          <div className={styles.proofUploadContainer}>
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
    </div>
  );
};

export default ResponsibleField;