import { SetStateAction, useState } from 'react';
import styles from '../../../styles/components/dataSVL/fields/responsibleField.module.css';

type ResponsibleFieldProps = {
  fieldLabel: string;
  placeholder: string;
  selectedOwner: number;
  selectedGroup: number;
  dataSVL: any;
  value: [boolean, string, boolean, string];
  setDataSVL: React.Dispatch<SetStateAction<any>>;
}

const ResponsibleField = ({ fieldLabel, placeholder, selectedOwner, selectedGroup, dataSVL, value, setDataSVL }: ResponsibleFieldProps) => {

  const [step, setStep] = useState(0);
  const [mechanic, setMechanic] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [proof, setProof] = useState(false);
  const [showBig, setShowBig] = useState(false);

  const imageInputId = `${selectedGroup}`;
  
  const mechanicsList = ['Pepe', 'Jaja', 'ewfgew', 'Camion', 'avion', 'pepa'];

  const handleMeResponsible = () => {
    setMechanic(false);
    setStep(2);
  }

  const handleMechanicResponsible = () => {
    setMechanic(true);
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
  }

  const handleImageField = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const updatedDataSVL = [...dataSVL];
      updatedDataSVL[selectedOwner].group[selectedGroup].doneBy[3] = URL.createObjectURL(event.target.files[0]);    
      setDataSVL(updatedDataSVL);
    }
  }

  const changeImageSize = (size: string) => {
    if (size == 'big') setShowBig(true);
    else setShowBig(false);
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
              className={styles.meButton}
              onClick={handleMeResponsible}>
              Me
            </button>
            <button
              className={styles.mechanichButton}
              onClick={handleMechanicResponsible}>
              Mechanic
            </button>
          </div>
        }
        {step >= 1 && mechanic == true &&
          <div>
            <input
              className={styles.inputField}
              placeholder={placeholder}
              value={searchQuery}
              onChange={handleInputChange}
            />
            {isOpen && searchQuery != '' &&
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
            }
          </div>
        }
        {step >= 2 &&
          <div>
            {proof == false ? (
              <button
                className={styles.noProofButton}
                onClick={handleYesProof}>
                Proof X
              </button>
            ) : (
              <button
                className={styles.yesProofButton}
                onClick={handleNoProof}>
                Proof ✔
              </button>
            )}
          </div>
        }
        {step >= 3 && proof == true && 
          <div>
            <button 
              className={styles.fileInput}
              onClick={() => document.getElementById(imageInputId)!.click()}>
              Upload proof
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
                  <img
                    className={styles.imageSmall}
                    onClick={() => changeImageSize('big')}
                    src={value[3]}
                  />
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