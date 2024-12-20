"use client";
import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import geojsonData from './../geoData/countries.geo.json'; 
import co2bysector from './../geoData/co2bysector.json'; 
import styles from './../styles/components/map.module.scss';

export default function mapView({mapTypes}) {

    const valueToColor = function(value, minValue = 0, maxValue = 5000, lowColor = "#ADD8E6", highColor = "#FF0000") {
        function hexToRgb(hex) {
            hex = hex.replace("#", "");
            return {
                r: parseInt(hex.substring(0, 2), 16),
                g: parseInt(hex.substring(2, 4), 16),
                b: parseInt(hex.substring(4, 6), 16)
            };
        }
    
       
        function rgbToHex({ r, g, b }) {
            const toHex = (value) => value.toString(16).padStart(2, "0");
            return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
        }
    
        const lowRgb = hexToRgb(lowColor);
        const highRgb = hexToRgb(highColor);
    
      
        const ratio = (value - minValue) / (maxValue - minValue);
    
        
        const clampedRatio = Math.max(0, Math.min(1, ratio));
    
       
        const interpolatedRgb = {
            r: Math.round(lowRgb.r + (highRgb.r - lowRgb.r) * clampedRatio),
            g: Math.round(lowRgb.g + (highRgb.g - lowRgb.g) * clampedRatio),
            b: Math.round(lowRgb.b + (highRgb.b - lowRgb.b) * clampedRatio)
        };
    
      
        return rgbToHex(interpolatedRgb);
    };

    useEffect(() => {
        console.log('mapTyasdasdapes inside', mapTypes);
        
        const map = L.map('map',{
            center: [0, 0], // Center of the map 
            zoom: 2, // Initial zoom level
            maxZoom: 19, // Max zoom level
            minZoom: 2, // Prevent zooming out too much
            maxBounds: [
              [-90, -180], // South-West corner of the map
              [90, 180],   // North-East corner of the map
            ], // Restrict dragging to world bounds
          });
 
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
        }).addTo(map);

        const geoJsonLayer = L.geoJSON(geojsonData, {
            style: (feature) => {
                // console.log(feature);
                const country = co2bysector.find((item) => item.Country == feature.properties.name );
               
                var color = 'white'
                if(country){
                   color = valueToColor(country.TotalCO2emissionsfromfuelcombustion);
                }else{
                  color = 'white'  
                }
                const emissions = feature.properties.emissions || 0; 
                
                return {
                    color: 'black',
                    weight: 1,
                    fillColor: color,
                    fillOpacity: 0.7,
                };
            },
            onEachFeature: (feature, layer) => {
                const country = co2bysector.find((item) => item.Country == feature.properties.name );
                layer.bindPopup(`<b>${country?.Country}</b> million tonnes of CO2<br>Emissions: ${country?.TotalCO2emissionsfromfuelcombustion} 
                <br /> 
                Commercial and public services: ${country?.Sectors.Commercialandpublicservices} 
                Manufacturing industries and construction: ${country?.Sectors.Manufacturingindustriesandconstruction} 
                Other energy industry own use: ${country?.Sectors.Otherenergyindustryownuse} 
                Commercial and public services: ${country?.Sectors.Commercialandpublicservices} 
                `);
            },
        });
    
        const co2Sector = mapTypes.find((item) => item.name === "co2bysector");

        console.log('co2Sector',co2Sector);

        if(co2Sector?.active){
            geoJsonLayer.addTo(map);
        }
        
        
    
        return () => {
            map.remove();
        };
    }, [JSON.stringify(mapTypes)]);

    return (
        <div className={styles.maps_container} >
            <div id="map" style={{ width: '100%', height: '100%' }} />
        </div>
    );
}
