"use client";
import Image from "next/image";
import styles from "./../styles/page.module.scss";
import { useState, useEffect } from 'react';
import MapView from "./../components/mapView.tsx";
import SideBar from "./../components/sideBar";

export default function Home() {

  const [mapViews, setMapViews] = useState([]);


  const handleMapViewsChange = (updatedMapViews) => {
    setMapViews([...updatedMapViews]);
    console.log('updatedMapViews', updatedMapViews);
  };
  
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <SideBar onMapViewsChange={handleMapViewsChange}/>
        <MapView mapTypes={mapViews} />
      </main>
      <footer className={styles.footer}>

      </footer>
    </div>
  );
}
