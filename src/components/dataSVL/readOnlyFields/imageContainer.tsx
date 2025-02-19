import { useEffect, useRef, useState } from 'react';
import styles from '../../../styles/components/dataSVL/readOnlyFields/imageContainer.module.css';
import { GoBackArrowIcon } from '../../../assets/goBackArrow';

type ImageContainerProps = {
  fieldLabel: string;
  images: string[];
}

const ImageContainer = ({ fieldLabel, images }: ImageContainerProps) => {

  const urlIPFS = 'http://127.0.0.1:8080/ipfs/';

  const [showType, setShowType] = useState({showBig: false, imageIndex: -1});

  const [noImages, setNoImages] = useState(false);

  const checkNoImages = () => {
    if (images.filter(url => url != '').length == 0) setNoImages(true);
    else setNoImages(false);
  }

  useEffect(() => {
    checkNoImages();
  }), [];

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
      scrollContainer.scrollLeft = scrollContainer.scrollWidth * (showType.imageIndex / images.length);
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
    const numImages = images.filter(url => url != '').length;
    if (index < numImages-1) {
      setShowType((prevState) => ({
        ...prevState,
        showBig: true,
        imageIndex: index+1,
      }));
      updateScrollPosition(imagePreviewContainer);
    }
  }

  const imagePreviewContainer = useRef(null);

  return (
    <div className={styles.imageContainer}>
      <div className={styles.fieldLabel}>
        {fieldLabel}
      </div>
      {noImages == true &&
        <div>-</div>
      }
      {showType.showBig == false &&
        <div className={fieldLabel ? styles.imageSmallContainer : styles.imageSmallContainerGroupType}>
          {images.filter(url => url != '').map((url, index) => (
            <div key={`${url}-${index}`}>
              <img
                className={styles.imageSmall}
                onClick={() => changeImageSize('big', index)}
                src={url[4] != ':' ? `${urlIPFS}${url}` : url}
              />
            </div>
          ))}
        </div>
      }
      {showType.showBig == true &&
        <div className={styles.mainImageBigContainer}>
          <div className={styles.imageBigContainer}>
            <button
              className={styles.closeImageBigContainer}
              onClick={() => changeImageSize('small', -1)}>
              <GoBackArrowIcon />
            </button>
            <button
              className={styles.previousImageButton}
              onClick={() => previousImage(showType.imageIndex)}>
              ←
            </button>
            <img
              className={styles.imageBig}
              src={images[showType.imageIndex][4] != ':' ? `${urlIPFS}${images[showType.imageIndex]}` : images[showType.imageIndex]}
            />
            <button
              className={styles.nextImageButton}
              onClick={() => nextImage(showType.imageIndex)}>
              →
            </button>
          </div>
          <div ref={imagePreviewContainer} className={styles.imagePreviewContainer}>
            {images.filter(url => url != '').map((url, index) => (
              <div key={`${url}-${index}`}>
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

export default ImageContainer;