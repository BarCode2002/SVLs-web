import styles from '../styles/pages/Help.module.css';

const Help = (): JSX.Element => {

  const updateViewportHeight = () => {
    const newHeight = window.innerHeight;
    document.documentElement.style.setProperty('--vh', `${newHeight}px`);
  }
  window.addEventListener('resize', updateViewportHeight);

  return (
    <div className={styles.mainContainer}>
      
    </div>
  );
}

export default Help;