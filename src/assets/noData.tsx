import i18n from 'i18next'; 

export const NoDataMaintenances = () => {
	return (
		<svg width="100" height="100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 2H14L20 8V22C20 22.5523 19.5523 23 19 23H5C4.44772 23 4 22.5523 4 22V4C4 2.89543 4.89543 2 6 2Z" 
        stroke="black" strokeWidth="2" fill="none"/>
      <path d="M14 2V8H20" stroke="black" strokeWidth="2" fill="none"/>
      <text x="9" y="13" font-size="4" fill="black"  dominantBaseline="middle" font-family="Arial" font-weight="bold">{i18n.t('DataSVL.Placeholders.No')}</text>
      <text x="6.5" y="18" font-size="4" fill="black" dominantBaseline="middle" font-family="Arial" font-weight="bold">{i18n.t('DataSVL.Placeholders.NoMaintenances')}</text>
		</svg>
	);
};

export const NoDataModifications = () => {
	return (
		<svg width="100" height="100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 2H14L20 8V22C20 22.5523 19.5523 23 19 23H5C4.44772 23 4 22.5523 4 22V4C4 2.89543 4.89543 2 6 2Z" 
        stroke="black" strokeWidth="2" fill="none"/>
      <path d="M14 2V8H20" stroke="black" strokeWidth="2" fill="none"/>
      <text x="9" y="13" font-size="4" fill="black"  dominantBaseline="middle" font-family="Arial" font-weight="bold">{i18n.t('DataSVL.Placeholders.No')}</text>
      <text x="6.5" y="18" font-size="4" fill="black" dominantBaseline="middle" font-family="Arial" font-weight="bold">{i18n.t('DataSVL.Placeholders.NoModifications')}</text>
		</svg>
	);
};

export const NoDataDefects = () => {
	return (
		<svg width="100" height="100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 2H14L20 8V22C20 22.5523 19.5523 23 19 23H5C4.44772 23 4 22.5523 4 22V4C4 2.89543 4.89543 2 6 2Z" 
        stroke="black" strokeWidth="2" fill="none"/>
      <path d="M14 2V8H20" stroke="black" strokeWidth="2" fill="none"/>
      <text x="9" y="13" font-size="4" fill="black"  dominantBaseline="middle" font-family="Arial" font-weight="bold">{i18n.t('DataSVL.Placeholders.No')}</text>
      <text x="6.5" y="18" font-size="4" fill="black" dominantBaseline="middle" font-family="Arial" font-weight="bold">{i18n.t('DataSVL.Placeholders.NoDefects')}</text>
		</svg>
	);
};

export const NoDataRepairs = () => {
	return (
		<svg width="100" height="100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 2H14L20 8V22C20 22.5523 19.5523 23 19 23H5C4.44772 23 4 22.5523 4 22V4C4 2.89543 4.89543 2 6 2Z" 
        stroke="black" strokeWidth="2" fill="none"/>
      <path d="M14 2V8H20" stroke="black" strokeWidth="2" fill="none"/>
      <text x="9" y="13" font-size="4" fill="black"  dominantBaseline="middle" font-family="Arial" font-weight="bold">{i18n.t('DataSVL.Placeholders.No')}</text>
      <text x="6.5" y="18" font-size="4" fill="black" dominantBaseline="middle" font-family="Arial" font-weight="bold">{i18n.t('DataSVL.Placeholders.NoRepairs')}</text>
		</svg>
	);
};