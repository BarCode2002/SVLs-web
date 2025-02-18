import styles from '../../styles/components/dataSVL/generalInformationSVL.module.css';
import { GeneralInformation } from '../../utils/interfaces.ts';
import TextContainer from './readOnlyFields/textContainer.tsx';
import ImageContainer from './readOnlyFields/imageContainer.tsx';
import { useTranslation } from "react-i18next";

type SummaryViewGeneralInformationProps = {
  prevOwnersGeneralInformation: GeneralInformation[];
  generalInformation: GeneralInformation[];
  numPreviousOwners: number;
  totalOwners: number;
};

const SummaryViewGeneralInformation = ({ prevOwnersGeneralInformation, generalInformation, numPreviousOwners, totalOwners }: SummaryViewGeneralInformationProps): JSX.Element => {

  const { t } = useTranslation();

  const listGeneralInformation = Array.from({length: totalOwners }, (_, selectedOwner) => (
    <div key={selectedOwner}>
      <div className={styles.owner}>
        {t('DataSVL.Placeholders.owner')} {selectedOwner+1}
      </div>
      <div className={styles.dataWrapperSummary}>
        {selectedOwner < numPreviousOwners ? (
          <div className={styles.data}>          
            <TextContainer fieldLabel={t('DataSVL.Labels.vin')} text={prevOwnersGeneralInformation[selectedOwner].VIN} />
            <TextContainer fieldLabel={t('DataSVL.Labels.brand')} text={prevOwnersGeneralInformation[selectedOwner].brand} />
            <TextContainer fieldLabel={t('DataSVL.Labels.model')} text={prevOwnersGeneralInformation[selectedOwner].model} />
            <TextContainer fieldLabel={t('DataSVL.Labels.year')} text={prevOwnersGeneralInformation[selectedOwner].year} />
            <TextContainer fieldLabel={t('DataSVL.Labels.kilometers')} text={prevOwnersGeneralInformation[selectedOwner].kilometers} />
            <ImageContainer fieldLabel={t('DataSVL.Labels.mainImage')} images={[prevOwnersGeneralInformation[selectedOwner].mainPhotograph]} />
            <ImageContainer fieldLabel={t('DataSVL.Labels.images')} images={prevOwnersGeneralInformation[selectedOwner].photographs} />
            <TextContainer fieldLabel={t('DataSVL.Labels.state')} text={prevOwnersGeneralInformation[selectedOwner].state} />
            <TextContainer fieldLabel={t('DataSVL.Labels.weight')} text={prevOwnersGeneralInformation[selectedOwner].weight} />
            <TextContainer fieldLabel={t('DataSVL.Labels.color')} text={prevOwnersGeneralInformation[selectedOwner].color} />
            <TextContainer fieldLabel={t('DataSVL.Labels.engine')} text={prevOwnersGeneralInformation[selectedOwner].engine} />
            <TextContainer fieldLabel={t('DataSVL.Labels.power')} text={prevOwnersGeneralInformation[selectedOwner].power} />
            <TextContainer fieldLabel={t('DataSVL.Labels.shift')} text={prevOwnersGeneralInformation[selectedOwner].shift} />
            <TextContainer fieldLabel={t('DataSVL.Labels.fuel')} text={prevOwnersGeneralInformation[selectedOwner].fuel} />
            <TextContainer fieldLabel={t('DataSVL.Labels.autonomy')} text={prevOwnersGeneralInformation[selectedOwner].autonomy} />
            <TextContainer fieldLabel={t('DataSVL.Labels.climate')} text={prevOwnersGeneralInformation[selectedOwner].climate} />
            <TextContainer fieldLabel={t('DataSVL.Labels.usage')} text={prevOwnersGeneralInformation[selectedOwner].usage} />
            <TextContainer fieldLabel={t('DataSVL.Labels.storage')} text={prevOwnersGeneralInformation[selectedOwner].storage} />
            <TextContainer fieldLabel={t('DataSVL.Labels.comments')} text={prevOwnersGeneralInformation[selectedOwner].comments} />
          </div>
        ) : (
          <div className={styles.data}>          
            <TextContainer fieldLabel={t('DataSVL.Labels.vin')} text={generalInformation[selectedOwner-numPreviousOwners].VIN} />
            <TextContainer fieldLabel={t('DataSVL.Labels.brand')} text={generalInformation[selectedOwner-numPreviousOwners].brand} />
            <TextContainer fieldLabel={t('DataSVL.Labels.model')} text={generalInformation[selectedOwner-numPreviousOwners].model} />
            <TextContainer fieldLabel={t('DataSVL.Labels.year')} text={generalInformation[selectedOwner-numPreviousOwners].year} />
            <TextContainer fieldLabel={t('DataSVL.Labels.kilometers')} text={generalInformation[selectedOwner-numPreviousOwners].kilometers} />
            <ImageContainer fieldLabel={t('DataSVL.Labels.mainImage')} images={[generalInformation[selectedOwner-numPreviousOwners].mainPhotograph]} />
            <ImageContainer fieldLabel={t('DataSVL.Labels.images')} images={generalInformation[selectedOwner-numPreviousOwners].photographs} />
            <TextContainer fieldLabel={t('DataSVL.Labels.state')} text={generalInformation[selectedOwner-numPreviousOwners].state} />
            <TextContainer fieldLabel={t('DataSVL.Labels.weight')} text={generalInformation[selectedOwner-numPreviousOwners].weight} />
            <TextContainer fieldLabel={t('DataSVL.Labels.color')} text={generalInformation[selectedOwner-numPreviousOwners].color} />
            <TextContainer fieldLabel={t('DataSVL.Labels.engine')} text={generalInformation[selectedOwner-numPreviousOwners].engine} />
            <TextContainer fieldLabel={t('DataSVL.Labels.power')} text={generalInformation[selectedOwner-numPreviousOwners].power} />
            <TextContainer fieldLabel={t('DataSVL.Labels.shift')} text={generalInformation[selectedOwner-numPreviousOwners].shift} />
            <TextContainer fieldLabel={t('DataSVL.Labels.fuel')} text={generalInformation[selectedOwner-numPreviousOwners].fuel} />
            <TextContainer fieldLabel={t('DataSVL.Labels.autonomy')} text={generalInformation[selectedOwner-numPreviousOwners].autonomy} />
            <TextContainer fieldLabel={t('DataSVL.Labels.climate')} text={generalInformation[selectedOwner-numPreviousOwners].climate} />
            <TextContainer fieldLabel={t('DataSVL.Labels.usage')} text={generalInformation[selectedOwner-numPreviousOwners].usage} />
            <TextContainer fieldLabel={t('DataSVL.Labels.storage')} text={generalInformation[selectedOwner-numPreviousOwners].storage} />
            <TextContainer fieldLabel={t('DataSVL.Labels.comments')} text={generalInformation[selectedOwner-numPreviousOwners].comments} />
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