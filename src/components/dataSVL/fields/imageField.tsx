import styles from '../../../styles/components/dataSVL/fields/imageField.module.css';
import { useEffect, useState } from 'react';

type ImagesFieldProps = {
  fieldLabel: string;
  placeholder: string;
  selectedOwner: number;
  dataSVL: any;
  selectedImage: string;
  selectedImages?: string[];
  setDataSVL: React.Dispatch<React.SetStateAction<any>>;
  formType: string;
  id: number;
  allowMultipleImages: boolean;
}

const ImagesField = ({ fieldLabel, placeholder, selectedOwner, dataSVL, selectedImage, selectedImages ,setDataSVL, formType, id, allowMultipleImages }: ImagesFieldProps) => {

  let imageInputId;
  if (id == -1) {
    if (formType == 'mainPhotograph' ) imageInputId = `image-input${'-1'}`;
    else imageInputId = `image-input${'-2'}`;
  }
  else imageInputId = `image-input${id}`;

  const [showBig, setShowBig] = useState(true);

  const handleImageField = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const updatedDataSVL = [...dataSVL];
      if (id == -1) {
        updatedDataSVL[selectedOwner][formType] = URL.createObjectURL(event.target.files[0]);    
      }
      setDataSVL(updatedDataSVL);
      event.target.value = '';
    }
  };

  const changeImageSize = (size: string) => {
    if (size == 'big') {
      setShowBig(true);
    }
    else {
      setShowBig(false);
    }
  }

  return (
    <div>
      <div className={styles.imageFieldContainer}>
        <div className={styles.fieldLabel}>
          {fieldLabel}
        </div>
        <div>
          <button 
            className={styles.fileInput}
            onClick={() => document.getElementById(imageInputId)!.click()}>
            {placeholder}
          </button>
          <input 
            type="file" 
            multiple={allowMultipleImages}
            onChange={handleImageField}
            id={imageInputId}
            style={{ display: 'none' }}
          />
        </div>
      </div>
      {showBig == false && selectedImage != '' ? (
        <div className={styles.imageSmallContainer}>
          <img
            className={styles.imageSmall}
            onClick={() => changeImageSize('big')}
            src={selectedImage}/>
        </div>
      ) : ('')}
      {showBig == true && selectedImage != '' ? (
        <div className={styles.imageBigContainer}>
          <button
            className={styles.closeImageBigContainer}
            onClick={() => changeImageSize('small')}>
            x
          </button>
           <img
            className={styles.imageBig}
            src={selectedImage}/>
        </div>
      ) : ('')}
    </div>
  );
};

export default ImagesField;

