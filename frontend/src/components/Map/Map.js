// var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

// mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
// var map = new mapboxgl.Map({
//     container: 'mapcontainer', // id (#mapcontainer) of an element on your page where you would like your map
//     style: 'mapbox://styles/mapbox/streets-v11'
// });
import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';




// mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

mapboxgl.accessToken = "pk.eyJ1IjoiZGFjYWJ1IiwiYSI6ImNsZjljZGYzMzE5ejMzcXBvbDFuMW5hMmEifQ.qFJCBw1xmv4j-rjefmAkoA";

export default function Map(){

    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(-122.4);
    const [lat, setLat] = useState(37.78);
    const [zoom, setZoom] = useState(9);
    
    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [lng, lat],
        zoom: zoom,
        });

        map.current.on('load', () => {
            map.current.setFog({});

            map.current.addSource('sf-boundaries', {
                type: 'geojson',
                data: 'sf-boundaries.geojson',
                promoteId: 'ncode'
            });

            map.current.addLayer({
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
                    'fill-color': 
                        ['match',
                        ['get', 'ncode'],
                        1,'green', 2, 'green', 3, 'green', 4, 'green', 5, 'green', 6, 'green', 7, 'green', 8, 'green', 9, 'green', 10, 'green', 11,'red', 12, 'red', 13, 'red', 14, 'red', 15, 'red', 16, 'red', 17, 'red', 18, 'red', 19, 'red', 20, 'red', 21,'blue', 22, 'blue', 23, 'blue', 24, 'blue', 25, 'blue', 26, 'blue', 27, 'blue', 28, 'blue', 29, 'blue', 30, 'blue', 31,'yellow', 32, 'yellow', 33, 'yellow', 34, 'yellow', 35, 'yellow', 36, 'yellow', 37, 'yellow', 38, 'yellow', 39, 'yellow', 40, 'yellow', "red" 
                        ]
                }
            })

            map.current.addLayer({
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

            map.current.on('mousemove', 'sf-boundaries-fill', (e) => {
                if (e.features.length > 0) {
                    if (hoveredStateId !== null) {
                        map.current.setFeatureState(
                            { source: 'sf-boundaries', id: hoveredStateId },
                            { hover: false }
                        );
                    }
                hoveredStateId = e.features[0].id;
                    map.current.setFeatureState(
                        { source: 'sf-boundaries', id: hoveredStateId },
                        { hover: true }
                    );
                }
            });

            map.current.on('mouseleave', 'sf-boundaries-fill', () => {
                if (hoveredStateId !== null) {
                    map.current.setFeatureState(
                        { source: 'sf-boundaries', id: hoveredStateId },
                        { hover: false }
                    );
                }
                hoveredStateId = null;
            });

            map.current.on('click', (e)=> {
                const [ selectedN ] = map.current.queryRenderedFeatures(e.point, {
                    layers: ['sf-boundaries-fill']
                });
                if(selectedN){
                    const { nhood } = selectedN.properties
                    alert(`This is the ${nhood} neighborhood`)
                }
            })

        })
    }, []);
    
    useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on('move', () => {
    setLng(map.current.getCenter().lng.toFixed(4));
    setLat(map.current.getCenter().lat.toFixed(4));
    setZoom(map.current.getZoom().toFixed(2));
    });
    }, []);
    
    return (
    <div>
    Hello from Map
        <div ref={mapContainer} className="map-container" />
    </div>
    );
}



