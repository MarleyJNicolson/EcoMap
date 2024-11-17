import Image from "next/image";
import styles from "./../styles/page.module.scss";
import MapView from "./../components/mapView.tsx";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <MapView />
      </main>
      <footer className={styles.footer}>

      </footer>
    </div>
  );
}
