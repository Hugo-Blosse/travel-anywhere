import Spinner from 'react-bootstrap/Spinner';
import styles from "./LoadingPanel.module.css";

export default function LoadingPanel() {
    return <div className={styles.spinerContainer}>
        <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
        </Spinner>
    </div>
}