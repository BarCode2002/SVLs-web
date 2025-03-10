import styles from '../../../styles/components/dataSVL/fields/imagesField.module.css';
import { useEffect, useRef, useState } from 'react';
import { PHOTOGRAPHS_SIZE } from '../../../utils/constants';
import { GoBackArrowIcon } from '../../../assets/goBackArrow';
import { TrashIconRed } from '../../../assets/trash';
import axios from "axios";
import { useTranslation } from 'react-i18next';
import { ipfsRetrieve, ipfsUpload } from '../../../utils/ip';

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
  allowMultipleImages: boolean;
  editMode: boolean;
}

const ImagesField = ({ fieldLabel, placeholder, selectedOwner, selectedGroup, selectedGroupType, dataSVL, selectedImages, setDataSVL, type, allowMultipleImages, editMode }: ImagesFieldProps) => {

  const { t } = useTranslation();
  
  const urlIPFS = ipfsRetrieve;

  let imageInputId;
  if (selectedGroup == -1) {
    if (type == 'mainPhotograph' ) imageInputId = `image-input${'-1'}`;
    else imageInputId = `image-input${'-2'}`;
  }
  else imageInputId = `image-input${type}${selectedGroup}${selectedGroupType}`;

  const [showType, setShowType] = useState({showBig: false, imageIndex: -1});
  const [imagesSaved, setImagesSaved] = useState(false);

  useEffect(() => {
    for (let i = 0; i < selectedImages.length; i++) {
      if (selectedImages[i][4] == ':') {
        setImagesSaved(false);
        return;
      }
    }
    setImagesSaved(true);
  }, [selectedOwner]);

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
          updatedDataSVL[selectedOwner].group[selectedGroup].type[selectedGroupType][type][i] = URL.createObjectURL(event.target.files[i-numImages]);
        }
      }
      setDataSVL(updatedDataSVL);
      setImagesSaved(false);
      event.target.value = '';
    }
  };

  const removeUploadedImage = (imageRemovedIndex: number) => {
    const updatedDataSVL = [...dataSVL];
    const numImages = selectedImages.filter(url => url != '').length;
    for (let i = imageRemovedIndex; i < numImages; i++) {
      if (selectedGroup == -1 && selectedGroupType == -1) {
        if (type == 'mainPhotograph') {
          updatedDataSVL[selectedOwner][type] = '';
          setShowType((prevState) => ({
            ...prevState,
            showBig: false,
            imageIndex: i,
          }));
        }
        else {
          updatedDataSVL[selectedOwner][type][i] = updatedDataSVL[selectedOwner][type][i+1];
          if (numImages == 1) {
            setShowType((prevState) => ({
              ...prevState,
              showBig: false,
              imageIndex: i,
            }));
          }
          else if (showType.showBig && showType.imageIndex+1 == numImages) {
            setShowType((prevState) => ({
              ...prevState,
              showBig: true,
              imageIndex: i-1,
            }));
          }
          else if (showType.showBig && showType.imageIndex > imageRemovedIndex) {
            setShowType((prevState) => ({
              ...prevState,
              showBig: true,
              imageIndex: showType.imageIndex-1,
            }));
          }
        }
      }
      else if (selectedGroup != -1 && selectedGroupType == -1) {
        updatedDataSVL[selectedOwner].group[selectedGroup][type][i] =  updatedDataSVL[selectedOwner].group[selectedGroup][type][i+1];
        if (numImages == 1) {
          setShowType((prevState) => ({
            ...prevState,
            showBig: false,
            imageIndex: i,
          }));
        }
        else if (showType.showBig && showType.imageIndex+1 == numImages) {
          setShowType((prevState) => ({
            ...prevState,
            showBig: true,
            imageIndex: i-1,
          }));
        }
        else if (showType.showBig && showType.imageIndex > imageRemovedIndex) {
          setShowType((prevState) => ({
            ...prevState,
            showBig: true,
            imageIndex: showType.imageIndex-1,
          }));
        }
      }
      else {
        updatedDataSVL[selectedOwner].group[selectedGroup].type[selectedGroupType][type][i] = updatedDataSVL[selectedOwner].group[selectedGroup].type[selectedGroupType][type][i+1];
        if (numImages == 1) {
          setShowType((prevState) => ({
            ...prevState,
            showBig: false,
            imageIndex: i,
          }));
        }
        else if (showType.showBig && showType.imageIndex+1 == numImages) {
          setShowType((prevState) => ({
            ...prevState,
            showBig: true,
            imageIndex: i-1,
          }));
        }
        else if (showType.showBig && showType.imageIndex > imageRemovedIndex) {
          setShowType((prevState) => ({
            ...prevState,
            showBig: true,
            imageIndex: showType.imageIndex-1,
          }));
        }
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
      updateScrollPosition(imagePreviewContainer);
    }
    else {
      setShowType((prevState) => ({
        ...prevState,
        showBig: false,
        imageIndex: index,
      }));
    }
  }

  const updateScrollPosition = (scrollContainerRef: any) => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.scrollLeft = scrollContainer.scrollWidth * (showType.imageIndex / selectedImages.length);
    }
  }

  const previousImage = (index: number) => {
    if (index > 0) {
      setShowType((prevState) => ({
        ...prevState,
        showBig: true,
        imageIndex: index-1,
      }));
      updateScrollPosition(imagePreviewContainer);
    }
  }

  const nextImage = (index: number) => {
    const numImages = selectedImages.filter(url => url != '').length;
    if (index < numImages-1) {
      setShowType((prevState) => ({
        ...prevState,
        showBig: true,
        imageIndex: index+1,
      }));
      updateScrollPosition(imagePreviewContainer);
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
        const draggedValue = dataSVL[selectedOwner].group[selectedGroup].type[selectedGroupType][type][indexDragged];
        for (let i = indexDragged; i > index; i--) {
          updatedDataSVL[selectedOwner].group[selectedGroup].type[selectedGroupType][type][i] = dataSVL[selectedOwner].group[selectedGroup].type[selectedGroupType][type][i-1];
        }
        updatedDataSVL[selectedOwner].group[selectedGroup].type[selectedGroupType][type][index] = draggedValue;
      }
      else if (indexDragged < index) {
        const draggedValue = dataSVL[selectedOwner].group[selectedGroup].type[selectedGroupType][type][indexDragged];
        for (let i = indexDragged; i < index; i++) {
          updatedDataSVL[selectedOwner].group[selectedGroup].type[selectedGroupType][type][i] = dataSVL[selectedOwner].group[selectedGroup].type[selectedGroupType][type][i+1];
        }
        updatedDataSVL[selectedOwner].group[selectedGroup].type[selectedGroupType][type][index] = draggedValue;
      }
    }
    setDataSVL(updatedDataSVL);
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  }

  const handleUploadImagesToIPFS = async () => {
    try {
      const formData = new FormData();
      const indexImagesToSave = [];
      for (let i = 0; i < selectedImages.filter(url => url != '').length; i++) {
        if (selectedImages[i][4] == ':') {
          indexImagesToSave.push(i);
          const response = await fetch(selectedImages[i]);
          const blob = await response.blob();     
          const fileExtension = selectedImages[i].split('.').pop()?.toLowerCase();
          formData.append("file", blob, `image/${fileExtension}`);
        }
      }
      const uploadResponse = await axios.post(ipfsUpload, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const updatedDataSVL = [...dataSVL];
      if (selectedGroup == -1 && selectedGroupType == -1) {
        if (type == 'mainPhotograph') updatedDataSVL[selectedOwner][type] = uploadResponse.data.cids[0]; 
        else {
          for (let i = 0; i < indexImagesToSave.length; i++) {
            updatedDataSVL[selectedOwner][type][indexImagesToSave[i]] = uploadResponse.data.cids[i];   
          }
        }  
      }
      else if (selectedGroup != -1 && selectedGroupType == -1) {
        for (let i = 0; i < indexImagesToSave.length; i++) {
          updatedDataSVL[selectedOwner].group[selectedGroup][type][indexImagesToSave[i]] = uploadResponse.data.cids[i];   
        }
      }
      else {
        for (let i = 0; i < indexImagesToSave.length; i++) {
          updatedDataSVL[selectedOwner].group[selectedGroup].type[selectedGroupType][type][indexImagesToSave[i]] = uploadResponse.data.cids[i];   
        }
      }
      setDataSVL(updatedDataSVL);
      setImagesSaved(true);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  }

  const imagePreviewContainer = useRef(null);

  return (
    <div>
      <div className={styles.imageFieldContainer}>
        {fieldLabel != '' &&
          <div className={styles.fieldLabel}>
            {fieldLabel}
          </div>
        }
        <div className={styles.fieldContainer}>
          <button 
            className={styles.fileInput}
            onClick={() => document.getElementById(imageInputId)!.click()}
            disabled={!editMode}>
            {placeholder}
          </button>
          <input 
            type="file" 
            multiple={allowMultipleImages}
            onChange={handleImageUpload}
            id={imageInputId}
            style={{ display: 'none' }}
          />
          <button
            className={styles.saveImagesButton}
            onClick={() => handleUploadImagesToIPFS()}
            disabled={selectedImages.filter(url => url != '').length == 0 || editMode == false || imagesSaved == true}>
            {t('DataSVL.Labels.save')}
          </button>
        </div>
      </div>
      {showType.showBig == false && selectedImages.filter(url => url != '').length > 0 &&
        <div className={fieldLabel ? styles.imageSmallContainer : styles.imageSmallContainerGroupType}>
          {selectedImages.filter(url => url != '').map((url, index) => (
            <div key={`${url}-${index}`}>
              <img
                className={styles.imageSmall}
                onClick={() => changeImageSize('big', index)}
                src={url[4] != ':' ? `${urlIPFS}${url}` : url}
                draggable={editMode}
                onDragStart={(e) => handleOnDrag(e, index)}
                onDrop={(e) => handleOnDrop(e, index)}
                onDragOver={(e) => handleDragOver(e)}
              />
              <div className={styles.removeImageButtonWrapper}>
                <button
                  className={styles.removeImageButton}
                  onClick={() => removeUploadedImage(index)}
                  disabled={!editMode}>
                  <TrashIconRed />
                </button>
              </div>
            </div>
          ))}
        </div>
      }
      {showType.showBig == true && selectedImages.filter(url => url != '').length > 0 &&
        <div className={styles.mainImageBigContainer}>
          <div className={styles.imageBigContainer}>
            <button
              className={styles.closeImageBigContainer}
              onClick={() => changeImageSize('small', -1)}>
              <GoBackArrowIcon />
            </button>
            {selectedImages.filter(url => url != '').length > 1 &&
              <button
                className={styles.previousImageButton}
                onClick={() => previousImage(showType.imageIndex)}>
                ←
              </button>
            }
            <img
              className={styles.imageBig}
              src={selectedImages[showType.imageIndex][4] != ':' ? `${urlIPFS}${selectedImages[showType.imageIndex]}` : selectedImages[showType.imageIndex]}
            />
            {selectedImages.filter(url => url != '').length > 1 &&
              <button
                className={styles.nextImageButton}
                onClick={() => nextImage(showType.imageIndex)}>
                →
              </button>
            }
          </div>
          <div ref={imagePreviewContainer} className={styles.imagePreviewContainer}>
            {selectedImages.filter(url => url != '').map((url, index) => (
              <div key={`${url}-${index}`}>
                <div className={styles.removeImageButtonWrapper}>
                  <button
                    className={styles.removeImagePreviewButton}
                    onClick={() => removeUploadedImage(index)}
                    disabled={!editMode}>
                    <TrashIconRed />
                  </button>
                </div>
                {showType.imageIndex == index ? (
                  <img
                    className={styles.imageSmallSelected}
                    onClick={() => changeImageSize('big', index)}
                    src={url[4] != ':' ? `${urlIPFS}${url}` : url}
                  />
                ) : (
                  <img
                    className={styles.imageSmall}
                    onClick={() => changeImageSize('big', index)}
                    src={url[4] != ':' ? `${urlIPFS}${url}` : url}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      }
    </div>
  );
};

export default ImagesField;