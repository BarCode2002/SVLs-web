import styles from '../../styles/components/dataSVL/generalInformationSVL.module.css';
import TextContainer from './readOnlyFields/textContainer.tsx';
import ImageContainer from './readOnlyFields/imageContainer.tsx';
import { useTranslation } from "react-i18next";
import { PossibleGeneralInformationJsonVersions } from '../../utils/commonTypes.ts';

type SummaryViewGeneralInformationProps = {
  prevOwnersGeneralInformation: PossibleGeneralInformationJsonVersions[];
  generalInformation: PossibleGeneralInformationJsonVersions[];
  numPreviousOwners: number;
  totalOwners: number;
  mySVL: boolean
};

const SummaryViewGeneralInformation = ({ prevOwnersGeneralInformation, generalInformation, numPreviousOwners, totalOwners, mySVL }: SummaryViewGeneralInformationProps): JSX.Element => {

  const { t } = useTranslation();

  const listGeneralInformation = Array.from({length: totalOwners }, (_, selectedOwner) => (
    <div key={selectedOwner}>
      <div className={styles.owner}>
        {t('DataSVL.Placeholders.owner')} {selectedOwner+1}
      </div>
      <div className={styles.dataWrapperSummary}>
        {!mySVL || selectedOwner < numPreviousOwners ? (
          <div className={styles.data}>   
            <TextContainer fieldLabel={t('DataSVL.Labels.vin')} text={prevOwnersGeneralInformation[selectedOwner].VIN} />
            <TextContainer fieldLabel={t('DataSVL.Labels.brand')} text={prevOwnersGeneralInformation[selectedOwner].brand} />
            <TextContainer fieldLabel={t('DataSVL.Labels.model')} text={prevOwnersGeneralInformation[selectedOwner].model} />
            <TextContainer fieldLabel={t('DataSVL.Labels.year')} text={prevOwnersGeneralInformation[selectedOwner].year} />
            <TextContainer fieldLabel={t('DataSVL.Labels.acquisitionDate')} text={prevOwnersGeneralInformation[selectedOwner].transferDate} />
            {prevOwnersGeneralInformation[selectedOwner].kilometers[0] != '' &&
              <TextContainer fieldLabel={t('DataSVL.Labels.kilometers')} text={prevOwnersGeneralInformation[selectedOwner].kilometers} />
            }
            <ImageContainer fieldLabel={t('DataSVL.Labels.mainImage')} images={[prevOwnersGeneralInformation[selectedOwner].mainPhotograph]} />
            {prevOwnersGeneralInformation[selectedOwner].photographs.filter((image: string) => image != '').length > 0 &&
              <ImageContainer fieldLabel={t('DataSVL.Labels.images')} images={prevOwnersGeneralInformation[selectedOwner].photographs} />
            }
            {prevOwnersGeneralInformation[selectedOwner].state != 'DataSVL.Forms.state' &&
              <TextContainer fieldLabel={t('DataSVL.Labels.state')} text={prevOwnersGeneralInformation[selectedOwner].state} />
            }
            {prevOwnersGeneralInformation[selectedOwner].weight[0] != '' &&
              <TextContainer fieldLabel={t('DataSVL.Labels.weight')} text={prevOwnersGeneralInformation[selectedOwner].weight} />
            }
            {prevOwnersGeneralInformation[selectedOwner].color != '' &&
              <TextContainer fieldLabel={t('DataSVL.Labels.color')} text={prevOwnersGeneralInformation[selectedOwner].color} />
            }
            {prevOwnersGeneralInformation[selectedOwner].engine != '' &&
              <TextContainer fieldLabel={t('DataSVL.Labels.engine')} text={prevOwnersGeneralInformation[selectedOwner].engine} />
            }
            {prevOwnersGeneralInformation[selectedOwner].power[0] != '' &&
              <TextContainer fieldLabel={t('DataSVL.Labels.power')} text={prevOwnersGeneralInformation[selectedOwner].power} />
            }
            {prevOwnersGeneralInformation[selectedOwner].shift != 'DataSVL.Forms.shift' &&
              <TextContainer fieldLabel={t('DataSVL.Labels.shift')} text={prevOwnersGeneralInformation[selectedOwner].shift} />
            }
            {prevOwnersGeneralInformation[selectedOwner].fuel != 'DataSVL.Forms.fuel' &&
              <TextContainer fieldLabel={t('DataSVL.Labels.fuel')} text={prevOwnersGeneralInformation[selectedOwner].fuel} />
            }
            {prevOwnersGeneralInformation[selectedOwner].autonomy[0] != '' &&
              <TextContainer fieldLabel={t('DataSVL.Labels.autonomy')} text={prevOwnersGeneralInformation[selectedOwner].autonomy} />
            }
            {prevOwnersGeneralInformation[selectedOwner].climate != 'DataSVL.Forms.climate' &&
              <TextContainer fieldLabel={t('DataSVL.Labels.climate')} text={prevOwnersGeneralInformation[selectedOwner].climate} />
            }
            {prevOwnersGeneralInformation[selectedOwner].usage != 'DataSVL.Forms.usage' &&
              <TextContainer fieldLabel={t('DataSVL.Labels.usage')} text={prevOwnersGeneralInformation[selectedOwner].usage} />
            }
            {prevOwnersGeneralInformation[selectedOwner].storage != 'DataSVL.Forms.storage' &&
              <TextContainer fieldLabel={t('DataSVL.Labels.storage')} text={prevOwnersGeneralInformation[selectedOwner].storage} />
            }
            {prevOwnersGeneralInformation[selectedOwner].comments != '' &&
              <TextContainer fieldLabel={t('DataSVL.Labels.comments')} text={prevOwnersGeneralInformation[selectedOwner].comments} />
            }
          </div>
        ) : (
          <div className={styles.data}>          
            <TextContainer fieldLabel={t('DataSVL.Labels.vin')} text={generalInformation[selectedOwner-numPreviousOwners].VIN} />
            <TextContainer fieldLabel={t('DataSVL.Labels.brand')} text={generalInformation[selectedOwner-numPreviousOwners].brand} />
            <TextContainer fieldLabel={t('DataSVL.Labels.model')} text={generalInformation[selectedOwner-numPreviousOwners].model} />
            <TextContainer fieldLabel={t('DataSVL.Labels.year')} text={generalInformation[selectedOwner-numPreviousOwners].year} />
            <TextContainer fieldLabel={t('DataSVL.Labels.acquisitionDate')} text={generalInformation[selectedOwner-numPreviousOwners].transferDate} />
            {generalInformation[selectedOwner-numPreviousOwners].kilometers[0] != '' &&
              <TextContainer fieldLabel={t('DataSVL.Labels.kilometers')} text={generalInformation[selectedOwner-numPreviousOwners].kilometers} />
            }
            <ImageContainer fieldLabel={t('DataSVL.Labels.mainImage')} images={[generalInformation[selectedOwner-numPreviousOwners].mainPhotograph]} />
            {generalInformation[selectedOwner-numPreviousOwners].photographs.filter(image => image != '').length > 0 &&
              <ImageContainer fieldLabel={t('DataSVL.Labels.images')} images={generalInformation[selectedOwner-numPreviousOwners].photographs} />
            }
            {generalInformation[selectedOwner-numPreviousOwners].state != 'DataSVL.Forms.state' &&
              <TextContainer fieldLabel={t('DataSVL.Labels.state')} text={generalInformation[selectedOwner-numPreviousOwners].state} />
            }
            {generalInformation[selectedOwner-numPreviousOwners].weight[0] != '' &&
              <TextContainer fieldLabel={t('DataSVL.Labels.weight')} text={generalInformation[selectedOwner-numPreviousOwners].weight} />
            }
            {generalInformation[selectedOwner-numPreviousOwners].color != '' &&
              <TextContainer fieldLabel={t('DataSVL.Labels.color')} text={generalInformation[selectedOwner-numPreviousOwners].color} />
            }
            {generalInformation[selectedOwner-numPreviousOwners].engine != '' &&
              <TextContainer fieldLabel={t('DataSVL.Labels.engine')} text={generalInformation[selectedOwner-numPreviousOwners].engine} />
            }
            {generalInformation[selectedOwner-numPreviousOwners].power[0] != '' &&
              <TextContainer fieldLabel={t('DataSVL.Labels.power')} text={generalInformation[selectedOwner-numPreviousOwners].power} />
            }
            {generalInformation[selectedOwner-numPreviousOwners].shift != 'DataSVL.Forms.shift' &&
              <TextContainer fieldLabel={t('DataSVL.Labels.shift')} text={generalInformation[selectedOwner-numPreviousOwners].shift} />
            }
            {generalInformation[selectedOwner-numPreviousOwners].fuel != 'DataSVL.Forms.fuel' &&
              <TextContainer fieldLabel={t('DataSVL.Labels.fuel')} text={generalInformation[selectedOwner-numPreviousOwners].fuel} />
            }
            {generalInformation[selectedOwner-numPreviousOwners].autonomy[0] != '' &&
              <TextContainer fieldLabel={t('DataSVL.Labels.autonomy')} text={generalInformation[selectedOwner-numPreviousOwners].autonomy} />
            }
            {generalInformation[selectedOwner-numPreviousOwners].climate != 'DataSVL.Forms.climate' &&
              <TextContainer fieldLabel={t('DataSVL.Labels.climate')} text={generalInformation[selectedOwner-numPreviousOwners].climate} />
            }
            {generalInformation[selectedOwner-numPreviousOwners].usage != 'DataSVL.Forms.usage' &&
              <TextContainer fieldLabel={t('DataSVL.Labels.usage')} text={generalInformation[selectedOwner-numPreviousOwners].usage} />
            }
            {generalInformation[selectedOwner-numPreviousOwners].storage != 'DataSVL.Forms.storage' &&
              <TextContainer fieldLabel={t('DataSVL.Labels.storage')} text={generalInformation[selectedOwner-numPreviousOwners].storage} />
            }
            {generalInformation[selectedOwner-numPreviousOwners].comments != '' &&
              <TextContainer fieldLabel={t('DataSVL.Labels.comments')} text={generalInformation[selectedOwner-numPreviousOwners].comments} />
            }
        </div>
        )}
      </div>
    </div>
  ));

  return (
    <div className={styles.generalInformationSVLContainer}>
      <div className={styles.title}>
        {t('DataSVL.Labels.generalInformation')}
      </div>
      {listGeneralInformation}
    </div>
  );
}

export default SummaryViewGeneralInformation;