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
import { GROUP_SIZE } from '../utils/constants';

const Dashboard = (): JSX.Element => {

  const { t } = useTranslation();

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
      numModifications: ['0', ''],
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
  const [page, setPage] = useState(() => {
    const savedPage = localStorage.getItem("page");
    return savedPage ? JSON.parse(savedPage) : 0
  });
  const [numPreviewSVLs, setNumPreviewSVLs] = useState(0);
  const [numGroupsPages, setNumGroupPages] = useState(0);
  const [visibleGroupPagesInButton, setVisibleGroupPagesInButton] = useState(0);

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

  useEffect(() => {
    setNumGroupPages(Math.ceil(numPreviewSVLs / GROUP_SIZE));
  }, [numPreviewSVLs]);

  useEffect(() => {
    setPage(0);
  }, [filterSVLs]);

  useEffect(() => {
    if (page % 10 == 9 && visibleGroupPagesInButton < numGroupsPages) setVisibleGroupPagesInButton(visibleGroupPagesInButton+1);
    else if (page % 10 == 0 && visibleGroupPagesInButton > 0) setVisibleGroupPagesInButton(visibleGroupPagesInButton-1);
  }, [page]);

  const handleSVLsShown = (action: string, pageClicked: number) => {
    if (action == 'next' && page < numPreviewSVLs-1) {
      setPage(page+1);
      localStorage.setItem('page', JSON.stringify(page+1));
    }
    else if (action == 'prev' && page > 0) {
      setPage(page-1);
      localStorage.setItem('page', JSON.stringify(page-1));
    }
    else if (action == 'specific') {
      setPage(pageClicked);
      localStorage.setItem('page', JSON.stringify(pageClicked));
    }
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
            <div className={styles.mainFilterContainer}>
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
              {numGroupsPages > 0 &&
                <div className={styles.manangeShownSVLsContainer}>
                  {numGroupsPages >= 10 &&
                    <button 
                      className={styles.pageButton}
                      onClick={() => handleSVLsShown('prev', -1)}
                      disabled={page == 0}>
                      ←
                    </button>
                  }
                  
                  {Array.from({ length: Math.min(10, numGroupsPages) }, (_, i) => (
                    <button 
                      key={i}
                      className={page == (i)+(visibleGroupPagesInButton*numGroupsPages) ? styles.pageButtonSelected : styles.pageButton}
                      onClick={() => handleSVLsShown('specific', (i)+(visibleGroupPagesInButton*numGroupsPages))}>
                      {(i+1)+(visibleGroupPagesInButton*numGroupsPages)}
                    </button>
                  ))}        
                  {numGroupsPages >= 10 &&
                    <button 
                      className={styles.pageButton}
                      onClick={() => handleSVLsShown('next', -1)}
                      disabled={page+1 == numGroupsPages}>
                      →
                    </button>
                  }
                </div>
              }
            </div>
          </div>
        </div>
      )}   
    </div>
  );
}

export default Dashboard;