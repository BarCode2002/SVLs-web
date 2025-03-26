import styles from '../../styles/components/dataSVL/generalInformationSVL.module.css';
import TextContainer from './readOnlyFields/textContainer.tsx';
import ImageContainer from './readOnlyFields/imageContainer.tsx';
import { useTranslation } from "react-i18next";
import { PossibleGeneralInformationJsonVersions } from '../../utils/commonTypes.ts';

type PrevOwnersGeneralInformationSVLProps = {
  selectedOwner: number;
  prevOwnersGeneralInformation: PossibleGeneralInformationJsonVersions[];
};

const PrevOwnersGeneralInformationSVL = ({ selectedOwner, prevOwnersGeneralInformation }: PrevOwnersGeneralInformationSVLProps): JSX.Element => {

  const { t } = useTranslation();

  return (
    <div className={styles.generalInformationSVLContainer}>
      <div className={styles.title}>
        {t('DataSVL.Labels.generalInformation')}
      </div>
      <div className={styles.dataWrapper}>
        <div className={styles.data}>
          <TextContainer fieldLabel={t('DataSVL.Labels.vin')} text={prevOwnersGeneralInformation[selectedOwner].VIN} />
          <TextContainer fieldLabel={t('DataSVL.Labels.brand')} text={prevOwnersGeneralInformation[selectedOwner].brand} />
          <TextContainer fieldLabel={t('DataSVL.Labels.model')} text={prevOwnersGeneralInformation[selectedOwner].model} />
          <TextContainer fieldLabel={t('DataSVL.Labels.year')} text={prevOwnersGeneralInformation[selectedOwner].year} />
          <TextContainer fieldLabel={t('DataSVL.Labels.kilometers')} text={prevOwnersGeneralInformation[selectedOwner].kilometers} />
          <TextContainer fieldLabel={t('DataSVL.Labels.acquisitionDate')} text={prevOwnersGeneralInformation[selectedOwner].transferDate} />
          <ImageContainer fieldLabel={t('DataSVL.Labels.images')} images={prevOwnersGeneralInformation[selectedOwner].images} />
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
      </div>
    </div>
  );
}

export default PrevOwnersGeneralInformationSVL;