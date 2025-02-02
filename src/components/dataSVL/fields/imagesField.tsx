import styles from '../../../styles/components/dataSVL/fields/imagesField.module.css';
import { useState } from 'react';
import { PHOTOGRAPHS_SIZE } from '../../../utils/constants/constants';

type ImagesFieldProps = {
  fieldLabel: string;
  placeholder: string;
  selectedOwner: number;
  selectedGroup: number;
  selectedGroupType: number;
  dataSVL: any;
  selectedImages: string[];
  setDataSVL: React.Dispatch<React.SetStateAction<any>>;
  type: string;
  typeSVL: string;
  allowMultipleImages: boolean;
}

const ImagesField = ({ fieldLabel, placeholder, selectedOwner, selectedGroup, selectedGroupType, dataSVL, selectedImages, setDataSVL, type, typeSVL, allowMultipleImages }: ImagesFieldProps) => {

  let imageInputId;
  if (selectedGroup == -1) {
    if (type == 'mainPhotograph' ) imageInputId = `image-input${'-1'}`;
    else imageInputId = `image-input${'-2'}`;
  }
  else imageInputId = `image-input${type}${selectedGroup}${selectedGroupType}`;

  const [showType, setShowType] = useState({showBig: false, imageIndex: -1});

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const updatedDataSVL = [...dataSVL];
      if (selectedGroup == -1 && selectedGroupType == -1) {
        if (type == 'mainPhotograph') {
          updatedDataSVL[selectedOwner][type] = URL.createObjectURL(event.target.files[0]);    
        }
        else {
          const numImages = selectedImages.filter(url => url != '').length;
          let maxImages = event.target.files.length + numImages;
          if (maxImages > PHOTOGRAPHS_SIZE) maxImages = PHOTOGRAPHS_SIZE;
          for (let i = numImages; i < maxImages; i++) {
            updatedDataSVL[selectedOwner][type][i] = URL.createObjectURL(event.target.files[i-numImages]);
          }
        }
      }
      else if (selectedGroup != -1 && selectedGroupType == -1) {
        const numImages = selectedImages.filter(url => url != '').length;
        let maxImages = event.target.files.length + numImages;
        if (maxImages > PHOTOGRAPHS_SIZE) maxImages = PHOTOGRAPHS_SIZE;
        for (let i = numImages; i < maxImages; i++) {
          updatedDataSVL[selectedOwner].group[selectedGroup][type][i] = URL.createObjectURL(event.target.files[i-numImages]);
        }
      }
      else {
        const numImages = selectedImages.filter(url => url != '').length;
        let maxImages = event.target.files.length + numImages;
        if (maxImages > PHOTOGRAPHS_SIZE) maxImages = PHOTOGRAPHS_SIZE;
        for (let i = numImages; i < maxImages; i++) {
          updatedDataSVL[selectedOwner].group[selectedGroup][typeSVL][selectedGroupType][type][i] = URL.createObjectURL(event.target.files[i-numImages]);
        }
      }
      setDataSVL(updatedDataSVL);
      event.target.value = '';
    }
  };

  const removeUploadedImage = (imamgeRemovedIndex: number) => {
    const updatedDataSVL = [...dataSVL];
    for (let i = imamgeRemovedIndex; i < selectedImages.filter(url => url != '').length; i++) {
      if (selectedGroup == -1 && selectedGroupType == -1) {
        if (type == 'mainPhotograph') updatedDataSVL[selectedOwner][type] = '';
        else updatedDataSVL[selectedOwner][type][i] = updatedDataSVL[selectedOwner][type][i+1];
      }
      else if (selectedGroup != -1 && selectedGroupType == -1) {
        updatedDataSVL[selectedOwner].group[selectedGroup][type][i] =  updatedDataSVL[selectedOwner].group[selectedGroup][type][i+1];
      }
      else {
        updatedDataSVL[selectedOwner].group[selectedGroup][typeSVL][selectedGroupType][type][i] = updatedDataSVL[selectedOwner].group[selectedGroup][typeSVL][selectedGroupType][type][i+1];
      }
    }
    setDataSVL(updatedDataSVL);
  }

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
    if (index < numImages-1) {
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
    if (selectedGroup == -1 && selectedGroupType == -1) {
      if (indexDragged > index) {
        const draggedValue = dataSVL[selectedOwner][type][indexDragged];
        for (let i = indexDragged; i > index; i--) {
          updatedDataSVL[selectedOwner][type][i] = dataSVL[selectedOwner][type][i-1];
        }
        updatedDataSVL[selectedOwner][type][index] = draggedValue;
      }
      else if (indexDragged < index) {
        const draggedValue = dataSVL[selectedOwner][type][indexDragged];
        for (let i = indexDragged; i < index; i++) {
          updatedDataSVL[selectedOwner][type][i] = dataSVL[selectedOwner][type][i+1];
        }
        updatedDataSVL[selectedOwner][type][index] = draggedValue;
      }
    }
    else if (selectedGroup != -1 && selectedGroupType == -1) {
      if (indexDragged > index) {
        const draggedValue = dataSVL[selectedOwner].group[selectedGroup][type][indexDragged];
        for (let i = indexDragged; i > index; i--) {
          updatedDataSVL[selectedOwner].group[selectedGroup][type][i] = dataSVL[selectedOwner].group[selectedGroup][type][i-1];
        }
        updatedDataSVL[selectedOwner].group[selectedGroup][type][index] = draggedValue;
      }
      else if (indexDragged < index) {
        const draggedValue = dataSVL[selectedOwner].group[selectedGroup][type][indexDragged];
        for (let i = indexDragged; i < index; i++) {
          updatedDataSVL[selectedOwner].group[selectedGroup][type][i] = dataSVL[selectedOwner].group[selectedGroup][type][i+1];
        }
        updatedDataSVL[selectedOwner].group[selectedGroup][type][index] = draggedValue;
      }
    }
    else {
      if (indexDragged > index) {
        const draggedValue = dataSVL[selectedOwner].group[selectedGroup][typeSVL][selectedGroupType][type][indexDragged];
        for (let i = indexDragged; i > index; i--) {
          updatedDataSVL[selectedOwner].group[selectedGroup][typeSVL][selectedGroupType][type][i] = dataSVL[selectedOwner].group[selectedGroup][typeSVL][selectedGroupType][type][i-1];
        }
        updatedDataSVL[selectedOwner].group[selectedGroup][typeSVL][selectedGroupType][type][index] = draggedValue;
      }
      else if (indexDragged < index) {
        const draggedValue = dataSVL[selectedOwner].group[selectedGroup][typeSVL][selectedGroupType][type][indexDragged];
        for (let i = indexDragged; i < index; i++) {
          updatedDataSVL[selectedOwner].group[selectedGroup][typeSVL][selectedGroupType][type][i] = dataSVL[selectedOwner].group[selectedGroup][typeSVL][selectedGroupType][type][i+1];
        }
        updatedDataSVL[selectedOwner].group[selectedGroup][typeSVL][selectedGroupType][type][index] = draggedValue;
      }
    }
    setDataSVL(updatedDataSVL);
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  }

  return (
    <div>
      <div className={styles.imageFieldContainer}>
        {fieldLabel != '' &&
          <div className={styles.fieldLabel}>
            {fieldLabel}
          </div>
        }
        <div>
          <button 
            className={styles.fileInput}
            onClick={() => document.getElementById(imageInputId)!.click()}>
            {placeholder}
          </button>
          <input 
            type="file" 
            multiple={allowMultipleImages}
            onChange={handleImageUpload}
            id={imageInputId}
            style={{ display: 'none' }}
          />
        </div>
      </div>
      {showType.showBig == false && selectedImages.filter(url => url != '').length > 0 ? (
        <div className={fieldLabel ? styles.imageSmallContainer : styles.imageSmallContainerGroupType}>
          {selectedImages.filter(url => url != '').map((url, index) => (
            <div key={`${url}-${index}`}>
              <img
                className={styles.imageSmall}
                onClick={() => changeImageSize('big', index)}
                src={url}
                draggable={true}
                onDragStart={(e) => handleOnDrag(e, index)}
                onDrop={(e) => handleOnDrop(e, index)}
                onDragOver={(e) => handleDragOver(e)}
              />
              <div className={styles.removeImageButtonWrapper}>
                <button
                  className={styles.removeImageButton}
                  onClick={() => removeUploadedImage(index)}>
                  x 
                </button>
              </div>
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

