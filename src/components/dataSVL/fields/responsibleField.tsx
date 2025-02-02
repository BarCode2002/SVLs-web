import { SetStateAction, useState } from 'react';
import styles from '../../../styles/components/dataSVL/fields/responsibleField.module.css';
import { useTranslation } from "react-i18next";

type ResponsibleFieldProps = {
  fieldLabel: string;
  selectedOwner: number;
  selectedGroup: number;
  dataSVL: any;
  value: [boolean, string, boolean, string];
  setDataSVL: React.Dispatch<SetStateAction<any>>;
}

const ResponsibleField = ({ fieldLabel, selectedOwner, selectedGroup, dataSVL, value, setDataSVL }: ResponsibleFieldProps) => {

  const { t } = useTranslation();

  const [step, setStep] = useState(0);
  const [mechanic, setMechanic] = useState<boolean | undefined>(undefined);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [proof, setProof] = useState(false);
  const [showBig, setShowBig] = useState(false);

  const imageInputId = `${selectedGroup}`;
  
  const mechanicsList = ['Pepe', 'Jaja', 'ewfgew', 'Camion', 'avion', 'pepa', 'pepo', 'pepin', 'pepapaa', 'pepeeee', 'pepitp'];

  const handleMeResponsible = () => {
    setMechanic(false);
    setProof(false);
    setStep(2);
  }

  const handleMechanicResponsible = () => {
    setMechanic(true);
    setProof(false);
    setSearchQuery('');
    setStep(1);
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsOpen(true);
    setSearchQuery(event.target.value);
  }

  const handleMechanicSelected = (mechanic: string) => {
    setSearchQuery(mechanic);
    setIsOpen(false);
    setStep(2);
  }

  const handleYesProof = () => {
    setProof(true);
    setStep(3);
  }

  const handleNoProof = () => {
    setProof(false);
    removeUploadedImage();
  }

  const handleImageField = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const updatedDataSVL = [...dataSVL];
      updatedDataSVL[selectedOwner].group[selectedGroup].doneBy[3] = URL.createObjectURL(event.target.files[0]);    
      setDataSVL(updatedDataSVL);
    }
    event.target.value = '';
  }

  const changeImageSize = (size: string) => {
    if (size == 'big') setShowBig(true);
    else setShowBig(false);
  }

  const removeUploadedImage = () => {
    const updatedDataSVL = [...dataSVL];
    updatedDataSVL[selectedOwner].group[selectedGroup].doneBy[3] = '';    
    setDataSVL(updatedDataSVL);
  }

  return (
    <div className={styles.responsibleFieldContainer}>
      <div className={styles.fieldLabel}>
        {fieldLabel}
      </div>
      <div className={styles.dataContainer}>
        {step >= 0 &&
          <div>
            <button
              className={mechanic != false ? styles.meButton : styles.meButtonSelected}
              onClick={handleMeResponsible}>
              {t('DataSVL.Placeholders.me')}
            </button>
            <button
              className={mechanic != true ? styles.mechanicButton : styles.mechanicButtonSelected}
              onClick={handleMechanicResponsible}>
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
            />
            {isOpen && searchQuery != '' &&
              <div className={styles.mechanicsListWrapper}>
                <div className={styles.mechanicsList}>
                  {mechanicsList.filter(mechanic => mechanic.toLowerCase().includes(searchQuery.toLowerCase())).map((mechanic, index) => (
                    <button
                      key={index}
                      className={styles.mechanic}
                      onClick={() => handleMechanicSelected(mechanic)}>
                      {mechanic}
                    </button>
                  ))}
                </div>
              </div>
            }
          </div>
        }
        {step >= 2 &&
          <div>
            {proof == false ? (
              <button
                className={styles.noProofButton}
                onClick={handleYesProof}>
                {t('DataSVL.Placeholders.proof')} {'x'}
              </button>
            ) : (
              <button
                className={styles.yesProofButton}
                onClick={handleNoProof}>
                {t('DataSVL.Placeholders.proof')} {'✔'}
              </button>
            )}
          </div>
        }
        {step >= 3 && proof == true && 
          <div className={styles.proofUploadContainer}>
            <button 
              className={styles.fileInput}
              onClick={() => document.getElementById(imageInputId)!.click()}>
              {t('DataSVL.Placeholders.uploadProof')}
            </button>
            <input 
              type="file" 
              multiple={false}
              onChange={handleImageField}
              id={imageInputId}
              style={{ display: 'none' }}
            />
            {value[3] != '' &&
              <div>
                {showBig == false ? (
                  <div className={styles.imageSmallContainer}>
                    <img
                      className={styles.imageSmall}
                      onClick={() => changeImageSize('big')}
                      src={value[3]}
                    />
                    <button
                      className={styles.removeImageButton}
                      onClick={removeUploadedImage}>
                      x
                    </button>
                  </div>
                ) : (
                  <div className={styles.imageBigContainer}>
                    <button
                      className={styles.closeImageBigContainer}
                      onClick={() => changeImageSize('small')}>
                      x
                    </button>
                    <img
                      className={styles.imageBig}
                      src={value[3]}
                    />
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