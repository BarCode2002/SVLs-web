import { useEffect, useRef, useState } from 'react';
import styles from '../../../styles/components/dataSVL/readOnlyFields/imageContainer.module.css';
import { GoBackArrowIcon } from '../../../assets/goBackArrow';
import { ipfsRetrieve } from '../../../utils/ip';
import { LeftArrowImages, RightArrowImages } from '../../../assets/directionArrows';

type ImageContainerProps = {
  fieldLabel: string;
  images: string[];
}

const ImageContainer = ({ fieldLabel, images }: ImageContainerProps) => {

  const urlIPFS = ipfsRetrieve;
  const [showType, setShowType] = useState({showBig: false, imageIndex: -1});
  const [noImages, setNoImages] = useState(false);
  const imagePreviewContainer = useRef(null);

  const checkNoImages = () => {
    if (images.filter(url => url != '').length == 0) setNoImages(true);
    else setNoImages(false);
  }

  useEffect(() => {
    checkNoImages();
  }), [];

  const updateScrollPosition = (scrollContainerRef: any) => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      const selectedImage = scrollContainer.children[showType.imageIndex];
      if (selectedImage) {
        const containerWidth = scrollContainer.clientWidth;
        const imageLeft = selectedImage.offsetLeft;
        const imageWidth = selectedImage.clientWidth;
  
        // Scroll so that the selected image is centered in the container
        const scrollLeft = imageLeft - (containerWidth / 2) + (imageWidth / 2);
  
        scrollContainer.scrollTo({
          left: scrollLeft,
          behavior: "smooth",
        });
      }
    }
  };

  useEffect(() => {
    if (showType.showBig) updateScrollPosition(imagePreviewContainer);
  }), [showType.showBig];

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

  return (
    <div className={styles.imageContainer}>
      <div className={styles.fieldLabel}>
        {fieldLabel}
      </div>
      {noImages == true &&
        <div>-</div>
      }
      {showType.showBig == false &&
        <div className={styles.imageSmallContainer}>
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
            {images.filter(url => url != '').length > 1 &&
              <button
                className={styles.previousImageButton}
                onClick={() => previousImage(showType.imageIndex)}
                disabled={showType.imageIndex == 0}>
                <LeftArrowImages />
              </button>
            }
            <img
              className={styles.imageBig}
              src={images[showType.imageIndex][4] != ':' ? `${urlIPFS}${images[showType.imageIndex]}` : images[showType.imageIndex]}
            />
            {images.filter(url => url != '').length > 1 &&
              <button
                className={styles.nextImageButton}
                onClick={() => nextImage(showType.imageIndex)}
                disabled={showType.imageIndex == images.filter(url => url != '').length-1}>
                <RightArrowImages />
              </button>
            }
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