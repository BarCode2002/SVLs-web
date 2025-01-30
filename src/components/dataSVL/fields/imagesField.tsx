import styles from '../../../styles/components/dataSVL/fields/imagesField.module.css';
import { useState } from 'react';
import { PHOTOGRAPHS_SIZE } from '../../../utils/constants/constants';


type ImagesFieldProps = {
  fieldLabel: string;
  placeholder: string;
  selectedOwner: number;
  dataSVL: any;
  selectedImages: string[];
  setDataSVL: React.Dispatch<React.SetStateAction<any>>;
  formType: string;
  id: number;
  allowMultipleImages: boolean;
}

const ImagesField = ({ fieldLabel, placeholder, selectedOwner, dataSVL, selectedImages ,setDataSVL, formType, id, allowMultipleImages }: ImagesFieldProps) => {

  let imageInputId;
  if (id == -1) {
    if (formType == 'mainPhotograph' ) imageInputId = `image-input${'-1'}`;
    else imageInputId = `image-input${'-2'}`;
  }
  else imageInputId = `image-input${id}`;

  const [showType, setShowType] = useState({showBig: false, imageIndex: -1});

  const handleImageField = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const updatedDataSVL = [...dataSVL];
      if (formType == 'mainPhotograph') {
        updatedDataSVL[selectedOwner][formType] = URL.createObjectURL(event.target.files[0]);    
      }
      else {
        const numImages = selectedImages.filter(url => url != '').length;
        let maxImages = event.target.files.length + numImages;
        if (maxImages > PHOTOGRAPHS_SIZE) maxImages = PHOTOGRAPHS_SIZE;
        for (let i = numImages; i < maxImages; i++) {
          updatedDataSVL[selectedOwner][formType][i] = URL.createObjectURL(event.target.files[i-numImages]);
        }
      }
      setDataSVL(updatedDataSVL);
      event.target.value = '';
    }
  };

  const changeImageSize = (size: string, index: number) => {
    if (size == 'big') {
      setShowType((prevState) => ({
        ...prevState,
        showBig: true,
        imageIndex: index,
      }));
    }
    else {
      setShowType((prevState) => ({
        ...prevState,
        showBig: false,
        imageIndex: index,
      }));
    }
  }

  const previousImage = (index: number) => {
    if (index > 0) {
      setShowType((prevState) => ({
        ...prevState,
        showBig: true,
        imageIndex: index-1,
      }));
    }
  }

  const nextImage = (index: number) => {
    const numImages = selectedImages.filter(url => url != '').length;
    console.log(numImages);
    if (index < numImages) {
      setShowType((prevState) => ({
        ...prevState,
        showBig: true,
        imageIndex: index+1,
      }));
    }
  }

  const handleOnDrag = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData("index", index.toString());
  }

  const handleOnDrop = (e: React.DragEvent, index: number) => {
    const indexDragged = parseInt(e.dataTransfer.getData("index"));
    const updatedDataSVL = [...dataSVL];
    if (indexDragged > index) {
      const draggedValue = dataSVL[selectedOwner][formType][indexDragged];
      for (let i = indexDragged; i > index; i--) {
        updatedDataSVL[selectedOwner][formType][i] = dataSVL[selectedOwner][formType][i-1];
      }
      updatedDataSVL[selectedOwner][formType][index] = draggedValue;
    }
    else if (indexDragged < index) {
      const draggedValue = dataSVL[selectedOwner][formType][indexDragged];
      for (let i = indexDragged; i < index; i++) {
        updatedDataSVL[selectedOwner][formType][i] = dataSVL[selectedOwner][formType][i+1];
      }
      updatedDataSVL[selectedOwner][formType][index] = draggedValue;
    }
    setDataSVL(updatedDataSVL);
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
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
      {showType.showBig == false && selectedImages.filter(url => url != '').length > 0 ? (
        <div className={styles.imageSmallContainer}>
          {selectedImages.filter(url => url != '').map((url, index) => (
            <div key={`${url}-${index}`}>
              <img
                className={styles.imageSmall}
                onClick={() => changeImageSize('big', index)}
                src={url}
                draggable
                onDragStart={(e) => handleOnDrag(e, index)}
                onDrop={(e) => handleOnDrop(e, index)}
                onDragOver={(e) => handleDragOver(e)}
              />
            </div>
          ))}
        </div>
      ) : ('')}
      {showType.showBig == true && selectedImages.filter(url => url != '').length > 0 ? (
        <div className={styles.imageBigContainer}>
          <button
            className={styles.closeImageBigContainer}
            onClick={() => changeImageSize('small', -1)}>
            x
          </button>
          <button
            className={styles.previousImageButton}
            onClick={() => previousImage(showType.imageIndex)}>
            ←
          </button>
          <img
            className={styles.imageBig}
            src={selectedImages[showType.imageIndex]}
          />
          <button
            className={styles.nextImageButton}
            onClick={() => nextImage(showType.imageIndex)}>
            →
          </button>
          <div className={styles.imagePreviewContainer}>
            {selectedImages.filter(url => url != '').map((url, index) => (
              <div key={`${url}-${index}`}>
                {showType.imageIndex == index ? (
                  <img
                    className={styles.imageSmallSelected}
                    onClick={() => changeImageSize('big', index)}
                    src={url}
                  />
                ) : (
                  <img
                    className={styles.imageSmall}
                    onClick={() => changeImageSize('big', index)}
                    src={url}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      ) : ('')}
    </div>
  );
};

export default ImagesField;

