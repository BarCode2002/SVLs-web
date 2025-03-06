import styles from '../styles/pages/Dashboard.module.css';
import { useEffect, useState } from 'react';
import { getWallet, setWalletConnection } from '../utils/wallet';
import { BeaconWallet } from '@taquito/beacon-wallet';
import TopNavBar from '../components/topNavBar/topNavBar';
import Welcome from '../components/dashboard/welcome';
import MySVLsButton from '../components/dashboard/mySVLsButton';
import RequestedSVLsButton from '../components/dashboard/requestedSVLsButton';
import FilterSVLs from '../components/dashboard/filterSVLs';
import PreviewSVLs from '../components/dashboard/previewSVLs';
import { FilterSVLsInterface } from '../utils/interfaces';
import { useTranslation } from 'react-i18next';

const Dashboard = (): JSX.Element => {

  const { t } = useTranslation();

  const GROUP_SIZE = 1;

  const [myAddress, setMyAddress] = useState<string | undefined>(undefined);
  const [wallet, setWallet] = useState<BeaconWallet | undefined>(undefined);
  const [search, setSearch] = useState(false);
  const [filterSVLs, setFilterSVLs] = useState(() => {
    const savedfilterSVLs = localStorage.getItem("filterSVLs");
    return savedfilterSVLs ? parseInt(savedfilterSVLs) : 0
  });
  const [appliedFiltersSVL, setAppliedFiltersSVL] = useState<FilterSVLsInterface>(() => {
    const savedFilters = localStorage.getItem("appliedFiltersSVL");
    return savedFilters ? JSON.parse(savedFilters) : {
      numOwners: ['0', ''],
      numMaintenances: ['0', ''],
      defects: {
        cosmetic: [false, '0', ''],
        minor: [false, '0', ''],
        moderate: [false, '0', ''],
        important: [false, '0', ''],
        critical: [false, '0', '']
      },
      numRepairs: ['0', ''],
      vin: '',
      brand: 'Dashboard.Placeholders.brand',
      model: 'Dashboard.Placeholders.model',
      year: ['0', ''],
      kilometers: ['0', '', 'km'],
      state: ['Dashboard.Placeholders.state', '', '', '', '', '', ''],
      power: ['0', '', 'cv'],
      shift: ['Dashboard.Placeholders.shift', ''],
      fuel: ['Dashboard.Placeholders.fuel', '', '', '', '', '', ''],
      autonomy: ['0', '', 'km'],
      climate: ['Dashboard.Placeholders.climate', '', '', '', '', '', ''],
      usage: ['Dashboard.Placeholders.usage', '', '', ''],
      storage: ['Dashboard.Placeholders.storage', '', '', '', '', '', ''],
    }
  });
  const [appliedFiltersSVLShrinked, setAppliedFiltersSVLShrinked] = useState(() => {
    const savedShrinkedFilters = localStorage.getItem("fullFilterShrinked");
    return savedShrinkedFilters ? JSON.parse(savedShrinkedFilters) : true
  });
  const [page, setPage] = useState(0);
  const [numPreviewSVLs, setNumPreviewSVLs] = useState(0);

  useEffect(() => {
    const initializedwallet = getWallet();
    setWallet(initializedwallet);
    const filterSVLs = localStorage.getItem('filterSVLs');
    setFilterSVLs(parseInt(filterSVLs!));    
  }, []);

  useEffect(() => {
    if (wallet) setWalletConnection(wallet, setMyAddress);
  }, [wallet]);

  const updateViewportHeight = () => {
    const newHeight = window.innerHeight;
    document.documentElement.style.setProperty('--vh', `${newHeight}px`);
  }
  window.addEventListener('resize', updateViewportHeight);

  const updatFullFilterSVL = () => {
    if (appliedFiltersSVLShrinked) {
      setAppliedFiltersSVLShrinked(false);
      localStorage.setItem('fullFilterShrinked', JSON.stringify(false));
    }
    else {
      setAppliedFiltersSVLShrinked(true);
      localStorage.setItem('fullFilterShrinked', JSON.stringify(true));

    }
  }

  const handleSVLsShown = (action: string, pageClicked: number) => {
    if (action == 'next' && page < numPreviewSVLs-1) setPage(page+1);
    else if (action == 'prev' && page > 0) setPage(page-1);
    else if (action == 'specific') setPage(pageClicked);
  }

  return (
    <div>
      {myAddress == undefined ? (
        <div className={styles.mainContainer}>
          <Welcome setMyAddress={setMyAddress} />
        </div>
      ) : (
        <div className={styles.mainContainer}>
          <TopNavBar page={'Dashboard'} myAddress={myAddress} setMyAddress={setMyAddress} />
          <div className={styles.dashboardInformation}>
            <div className={styles.filterContainer}>
              <MySVLsButton filterSVLs={filterSVLs} setFilterSVLs={setFilterSVLs} setSearch={setSearch} />
              <RequestedSVLsButton filterSVLs={filterSVLs} setFilterSVLs={setFilterSVLs} setSearch={setSearch} />
              <div className={styles.fullFiltersToggleContainer}>
                <div className={styles.toggleText}>
                  {t('Dashboard.Labels.showDetailedFilters')}
                </div>
                <button
                  className={styles.toggleFullFilters}
                  onClick={updatFullFilterSVL}>
                  {!appliedFiltersSVLShrinked ? '⬆' : '⬇'}
                </button>
              </div>
              {!appliedFiltersSVLShrinked &&
                <FilterSVLs filterSVLs={filterSVLs} setFilterSVLs={setFilterSVLs} appliedFiltersSVL={appliedFiltersSVL} setAppliedFiltersSVL={setAppliedFiltersSVL} search={search} setSearch={setSearch} />
              }
            </div>
            <div className={styles.previewSVLsAndManageContainer}>
              <PreviewSVLs myAddress={myAddress} filterSVL={filterSVLs} appliedFiltersSVL={appliedFiltersSVL} search={search} page={page} setNumPreviewSVLs={setNumPreviewSVLs} />
              <div className={styles.manangeShownSVLsContainer}>
                <button 
                  className={styles.pageButton}
                  onClick={() => handleSVLsShown('prev', -1)}
                  disabled={page == 0}>
                  ←
                </button>
                {page == 0 &&
                  <div>
                    <button 
                      className={styles.pageButtonSelected}
                      onClick={() => handleSVLsShown('specific', 0)}>
                      {1}
                    </button>
                    <button 
                      className={styles.pageButton}
                      onClick={() => handleSVLsShown('specific', 1)}>
                      {page+2}
                    </button>
                    <button 
                      className={styles.pageButton}
                      onClick={() => handleSVLsShown('specific', 2)}>
                      {page+3}
                    </button>
                    <button 
                      className={styles.pageButton}
                      onClick={() => handleSVLsShown('specific', 3)}>
                      {page+4}
                    </button>
                    ...
                    <button 
                      className={styles.pageButton}
                      onClick={() => handleSVLsShown('specific', numPreviewSVLs-1)}>
                      {numPreviewSVLs}
                    </button>
                  </div>
                }
                {page > 0 && page < numPreviewSVLs-1 &&
                  <div>
                    <button 
                      className={styles.pageButton}
                      onClick={() => handleSVLsShown('specific', 0)}>
                      {1}
                    </button>
                    ...
                    <button 
                      className={styles.pageButton}
                      onClick={() => handleSVLsShown('specific', 0)}>
                      {page}
                    </button>
                    <button 
                      className={styles.pageButtonSelected}
                      onClick={() => handleSVLsShown('specific', 0)}>
                      {page+1}
                    </button>
                    <button 
                      className={styles.pageButton}
                      onClick={() => handleSVLsShown('specific', 0)}>
                      {page+2}
                    </button>
                    ...
                    <button 
                      className={styles.pageButton}
                      onClick={() => handleSVLsShown('specific', numPreviewSVLs-1)}>
                      {numPreviewSVLs}
                    </button>
                  </div>
                }
                {page == numPreviewSVLs-1 &&
                  <div>
                    <button 
                      className={styles.pageButton}
                      onClick={() => handleSVLsShown('specific', 0)}>
                      {1}
                    </button>
                    ...
                    <button 
                      className={styles.pageButton}
                      onClick={() => handleSVLsShown('specific', numPreviewSVLs-4)}>
                      {numPreviewSVLs-3}
                    </button>
                    <button 
                      className={styles.pageButton}
                      onClick={() => handleSVLsShown('specific', numPreviewSVLs-3)}>
                      {numPreviewSVLs-2}
                    </button>
                    <button 
                      className={styles.pageButton}
                      onClick={() => handleSVLsShown('specific', numPreviewSVLs-2)}>
                      {numPreviewSVLs-1}
                    </button>
                    <button 
                      className={styles.pageButtonSelected}
                      onClick={() => handleSVLsShown('specific', numPreviewSVLs-1)}>
                      {numPreviewSVLs}
                    </button>
                  </div>
                }
                <button 
                  className={styles.pageButton}
                  onClick={() => handleSVLsShown('next', -1)}
                  disabled={page+1 == (numPreviewSVLs / GROUP_SIZE)}>
                  →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}   
    </div>
  );
}

export default Dashboard;