// var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

// mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
// var map = new mapboxgl.Map({
//     container: 'mapcontainer', // id (#mapcontainer) of an element on your page where you would like your map
//     style: 'mapbox://styles/mapbox/streets-v11'
// });
import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

export default function MapBox(){

    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(-70.9);
    const [lat, setLat] = useState(42.35);
    const [zoom, setZoom] = useState(9);
    
    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [lng, lat],
        zoom: zoom
        });

        map.on('load', () => {
            map.setFog({});

            map.addSource('sf-boundaries', {
                type: 'geojson',
                data: './sf-boundaries.geojson',
                promoteId: 'ncode'
            });

            map.addLayer({
                id: 'sf-boundaries-fill',
                type: 'fill',
                source: 'sf-boundaries',
                paint:{
                    'fill-opacity': [
                        'case',
                        ['boolean', ['feature-state', 'hover'], false],
                        0.65,
                        0.2
                    ],
                    'fill-color': [
                        'match',
                        ['get', 'ncode'],
                        1,'green', 2, 'green', 3, 'green', 4, 'green', 5, 'green', 6, 'green', 7, 'green', 8, 'green', 9, 'green', 10, 'green', 
                        11,'green', 12, 'green', 13, 'green', 14, 'green', 15, 'green', 16, 'green', 17, 'green', 18, 'green', 19, 'green', 20, 'green',
                        21,'red', 22, 'red', 23, 'red', 24, 'red', 25, 'red', 26, 'red', 27, 'red', 28, 'red', 29, 'red', 30, 'red', 
                        31,'red', 32, 'red', 33, 'red', 34, 'red', 35, 'red', 36, 'red', 37, 'red', 38, 'red', 39, 'red', 40, 'red',
                        41,'blue', 44, 'blue', 43, 'blue', 44, 'blue', 45, 'blue', 46, 'blue', 47, 'blue', 48, 'blue', 49, 'blue', 50, 'blue', 
                        51,'blue', 52, 'blue', 55, 'blue', 54, 'blue', 55, 'blue', 56, 'blue', 57, 'blue', 58, 'blue', 59, 'blue', 60, 'blue',
                        61,'yellow', 66, 'yellow', 63, 'yellow', 66, 'yellow', 65, 'yellow', 66, 'yellow', 67, 'yellow', 68, 'yellow', 69, 'yellow', 70, 'yellow', 
                        71,'yellow', 72, 'yellow', 77, 'yellow', 74, 'yellow', 77, 'yellow', 76, 'yellow', 77, 'yellow', 78, 'yellow', 79, 'yellow', 80, 'yellow',
                        81, 'yellow' 
                        ]
                }
            })

            map.addLayer({
                id: 'sf-boundaries-line',
                type: 'line',
                source: 'sf-boundaries',
                paint:{
                    'line-color': 'white',
                    'line-width': 4,
                    'line-opacity': 0.7
                }
            });

            let hoveredStateId = null

            map.on('mousemove', 'sf-boundaries-fill', (e) => {
                if (e.features.length > 0) {
                    if (hoveredStateId !== null) {
                        map.setFeatureState(
                            { source: 'sf-boundaries', id: hoveredStateId },
                            { hover: false }
                        );
                    }
                hoveredStateId = e.features[0].id;
                    map.setFeatureState(
                        { source: 'sf-boundaries', id: hoveredStateId },
                        { hover: true }
                    );
                }
            });

            map.on('mouseleave', 'sf-boundaries-fills', () => {
                if (hoveredStateId !== null) {
                    map.setFeatureState(
                        { source: 'sf-boundaries', id: hoveredStateId },
                        { hover: false }
                    );
                }
                hoveredStateId = null;
            });

            map.on('click', (e)=> {
                const [ selectedN ] = map.queryRenderedFeatures(e.point, {
                    layers: ['sf-boundaries-fill']
                });
                if(selectedN){
                    const { nhood } = selectedN.properties
                    alert(`This is the ${nhood} neighborhood`)
                }
            })

        })
    });
    
    useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on('move', () => {
    setLng(map.current.getCenter().lng.toFixed(4));
    setLat(map.current.getCenter().lat.toFixed(4));
    setZoom(map.current.getZoom().toFixed(2));
    });
    });
    
    return (
    <div>
    <div className="sidebar">
    Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
    </div>
    <div ref={mapContainer} className="map-container" />
    </div>
    );
}



