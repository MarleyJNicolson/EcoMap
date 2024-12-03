"use client";
import React from 'react';
import { useState } from 'react';
import styles from "./../styles/components/sidebar.module.scss";

function mapViewObject(name, active, date) {
  this.name = name;
  this.active = active
  this.date = date
}


export default function sideBar({onMapViewsChange}) {

  const [mapViews, setMapViews] = useState([
    new mapViewObject('co2bysector', false, false),
  ]);

  const handleCheckboxChange = (name) => {
  

    const theMapView = mapViews.find( mapView => mapView.name = name );

    if(theMapView.active === true){
      theMapView.active = false
    }else{
      theMapView.active = true
    }

    console.log('MV', mapViews);

    onMapViewsChange(mapViews);
  };


  return (
    <aside className={styles.sidebar}>
      <h3>
        View options and sources
      </h3>
      <nav>
        {/* this might be better as a component */}
        <div className={styles.option}>
          <div className={styles.optionInfo}>
            <div>
              <p>Co2 by sector</p>
              <p className={styles.source}>Greenhouse Gas Emissions from Energy, IEA, 2024 - Highlights</p>
            </div>
            <input type="checkbox" name="co2Option" value="sector" 
            onChange={() => handleCheckboxChange("co2bysector")}
            />
          </div>
          <div className={styles.optionControls}>
          {/* <pre>{JSON.stringify(mapViews, null, 2)}</pre> */}
          </div>
        </div>
      </nav>
    </aside>
  );
}