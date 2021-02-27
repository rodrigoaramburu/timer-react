
import styles from '../styles/components/dark-mode-check.module.css'

interface DarkModeCheck{
    isDarkMode: boolean;
    themeChange: () => void;
}

export default function DarkModeCheck({isDarkMode, themeChange}){


    return (
        <div className={styles.darkModeContainer}>
            <input id="darkModeCheck" type="checkbox" checked={isDarkMode} onChange={themeChange} title="Dark Mode"/>
        </div>
    );
}