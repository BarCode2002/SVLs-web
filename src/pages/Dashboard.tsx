import styles from '../styles/pages/Dashboard.module.css';
import { useEffect, useRef, useState } from 'react';
import { getWallet, setWalletConnection } from '../utils/wallet';
import { BeaconWallet } from '@taquito/beacon-wallet';
import TopNavBar from '../components/topNavBar/topNavBar';
import Welcome from '../components/dashboard/welcome';
import MySVLsButton from '../components/dashboard/mySVLsButton';
import RequestedSVLsButton from '../components/dashboard/requestedSVLsButton';
import FilterSVLs from '../components/dashboard/filterSVLs';
import PreviewSVLs from '../components/dashboard/previewSVLs';
import { FilterSVLsType } from '../utils/commonTypes';
import { useTranslation } from 'react-i18next';
import { GROUP_SIZE } from '../utils/constants';
import { BottomArrowWide, BottomArrowWideWhite, TopArrowWide, TopArrowWideWhite } from '../assets/directionArrows';

const Dashboard = (): JSX.Element => {

  const { t } = useTranslation();

  const [isHovered, setIsHovered] = useState(false);
  const [myAddress, setMyAddress] = useState<string | undefined>(undefined);
  const [wallet, setWallet] = useState<BeaconWallet | undefined>(undefined);
  const [search, setSearch] = useState(false);
  const [filterSVLs, setFilterSVLs] = useState(() => {
    const savedfilterSVLs = localStorage.getItem("filterSVLs");
    if (savedfilterSVLs == null) return 0;
    else return parseInt(savedfilterSVLs);
  });
  const defaultAppliedFilterSVL: FilterSVLsType = {
    key: "v1",
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
    brand: '',
    model: '',
    year: ['0', ''],
    kilometers: ['0', '', 'km'],
    state: ['', '', '', '', '', '', ''],
    weight: ['0', '', 'kg'],
    power: ['0', '', 'cv'],
    shift: ['', ''],
    fuel: ['', '', '', '', '', '', ''],
    autonomy: ['0', '', 'km'],
    climate: ['', '', '', '', '', '', ''],
    usage: ['', '', '', ''],
    storage: ['', '', '', '', '', '', ''],
  }
  const [appliedFiltersSVL, setAppliedFiltersSVL] = useState<FilterSVLsType>(() => {
    const savedFilters = localStorage.getItem("appliedFiltersSVL");
    const parsedSavedFilters = savedFilters ? JSON.parse(savedFilters) : null;
    if (parsedSavedFilters && parsedSavedFilters.key === defaultAppliedFilterSVL.key) {
      return parsedSavedFilters;
    }
    else return defaultAppliedFilterSVL; 
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
      setFilterSVLs(2);
      localStorage.setItem('filterSVLs', '2');
    }
    else {
      setAppliedFiltersSVLShrinked(true);
      localStorage.setItem('fullFilterShrinked', JSON.stringify(true));
    }
  }

  useEffect(() => {
    setNumGroupPages(Math.ceil(numPreviewSVLs / GROUP_SIZE));
  }, [numPreviewSVLs]);

  const hasMounted = useRef(false);
  useEffect(() => {
    if (hasMounted.current) setPage(0);
    else hasMounted.current = true;
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
              <MySVLsButton filterSVLs={filterSVLs} setFilterSVLs={setFilterSVLs} setSearch={setSearch} setAppliedFiltersSVLShrinked={setAppliedFiltersSVLShrinked} />
              <RequestedSVLsButton filterSVLs={filterSVLs} setFilterSVLs={setFilterSVLs} setSearch={setSearch} setAppliedFiltersSVLShrinked={setAppliedFiltersSVLShrinked} />
              <div className={styles.fullFiltersToggleContainer}>
                <button
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  className={filterSVLs == 2 ? styles.toggleFullFiltersSelected : styles.toggleFullFilters}
                  onClick={updatFullFilterSVL}>
                  {t('Dashboard.Labels.detailedFilters')} 
                  {isHovered && filterSVLs != 2 
                    ? <BottomArrowWide />
                    : appliedFiltersSVLShrinked 
                      ? (filterSVLs == 2 ? <BottomArrowWide /> : <BottomArrowWideWhite />) 
                      : (filterSVLs == 2 ? <TopArrowWide /> : <TopArrowWideWhite />)
                  }
                </button>
              </div>
              {!appliedFiltersSVLShrinked &&
                <FilterSVLs setFilterSVLs={setFilterSVLs} appliedFiltersSVL={appliedFiltersSVL} setAppliedFiltersSVL={setAppliedFiltersSVL} search={search} setSearch={setSearch} />
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