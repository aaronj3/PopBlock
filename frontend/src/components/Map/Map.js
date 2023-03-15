// var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

// mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
// var map = new mapboxgl.Map({
//     container: 'mapcontainer', // id (#mapcontainer) of an element on your page where you would like your map
//     style: 'mapbox://styles/mapbox/streets-v11'
// });
import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import './Map.css'



// mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

mapboxgl.accessToken = "pk.eyJ1IjoiZGFjYWJ1IiwiYSI6ImNsZjljZGYzMzE5ejMzcXBvbDFuMW5hMmEifQ.qFJCBw1xmv4j-rjefmAkoA";

export default function Map(){

    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(-122.45);
    const [lat, setLat] = useState(37.76);
    const [zoom, setZoom] = useState(11);
    const bounds =[
        [-122.656150, 37.659881], //southwest coordinates
        [-122.235293, 37.857600] // Northeast coordinates
    ];
    
    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: [lng, lat], // starting positiong
        zoom: zoom, // starting zoom
        maxBounds: bounds // set map's geographical boundaries
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

            map.current.on('mouseenter', 'sf-boundaries-fill', () => {
                map.current.getCanvas().style.cursor = 'pointer';
                });

            map.current.on('mouseleave', 'sf-boundaries-fill', () => {
                map.current.getCanvas().style.cursor = '';
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
                    const { nhood } = selectedN.properties;
                    const { id } = selectedN.properties;
                    const post = useSelector(getPostByArea(`${id}`))
                    dispatch(fetchPostByArea(`${id}`));
                    const name = post.user.name
                    // const name = topPosts.areaID(selectedN.id).name
                    const description = `<strong>Aaron</strong> is poppin in the <Link>${nhood} neighborhood</Link>`
                    new mapboxgl.Popup()
                        .setLngLat(e.lngLat)
                        .setHTML(description)
                        .addTo(map.current);
                }
            })
            
            const n1 = document.createElement('div'); // Western Addition
            n1.textContent = `A`;
            n1.className ='marker'
            new mapboxgl.Marker(n1)
                .setLngLat([-122.430420,37.780713])
                .addTo(map.current);

            const n2 = document.createElement('div'); // West of Twin Peaks
            n2.textContent = `A`;
            n2.className ='marker'
            new mapboxgl.Marker(n2)
                .setLngLat([-122.459853,37.736381])
                .addTo(map.current);
            
            const n3 = document.createElement('div'); // Visitacion valley
            n3.textContent = `A`;
            n3.className ='marker'
            new mapboxgl.Marker(n3)
                .setLngLat([-122.408208,37.710768])
                .addTo(map.current);

            const n4 = document.createElement('div'); // Twin Peaks
            n4.textContent = `A`;
            n4.className ='marker'
            new mapboxgl.Marker(n4)
                .setLngLat([-122.450358,37.751458])
                .addTo(map.current);
            

            const n5 = document.createElement('div'); // South of Market
            n5.textContent = `A`;
            n5.className ='marker'
            new mapboxgl.Marker(n5)
                .setLngLat([-122.404476,37.778542])
                .addTo(map.current);

            const n6 = document.createElement('div'); // Presidio Heights
            n6.textContent = `A`;
            n6.className ='marker'
            new mapboxgl.Marker(n6)
                .setLngLat([-122.452269,37.786009])
                .addTo(map.current);

            const n7 = document.createElement('div'); // Presidio
            n7.textContent = `A`;
            n7.className ='marker'
            new mapboxgl.Marker(n7)
                .setLngLat([-122.465072,37.797713])
                .addTo(map.current);

            const n8 = document.createElement('div'); // Portero Hill
            n8.textContent = `A`;
            n8.className ='marker'
            new mapboxgl.Marker(n8)
                .setLngLat([-122.392476,37.759281])
                .addTo(map.current);

            const n9 = document.createElement('div'); // Portola
            n9.textContent = `A`;
            n9.className ='marker'
            new mapboxgl.Marker(n9)
                .setLngLat([-122.407307,37.725845])
                .addTo(map.current);

            const n10 = document.createElement('div'); // Pacific Heights
            n10.textContent = `A`;
            n10.className ='marker'
            new mapboxgl.Marker(n10)
                .setLngLat([-122.432606,37.791035])
                .addTo(map.current);

            const n11 = document.createElement('div'); // Outer Richmond
            n11.textContent = `A`;
            n11.className ='marker'
            new mapboxgl.Marker(n11)
                .setLngLat([-122.488459,37.777190])
                .addTo(map.current);
            
            const n12 = document.createElement('div'); // Outer Mission
            n12.textContent = `A`;
            n12.className ='marker'
            new mapboxgl.Marker(n12)
                .setLngLat([-122.440988,37.723215])
                .addTo(map.current);
            
            const n13 = document.createElement('div'); // Sunset/Parkside
            n13.textContent = `A`;
            n13.className ='marker'
            new mapboxgl.Marker(n13)
                .setLngLat([-122.493095,37.750969])
                .addTo(map.current);

            const n14 = document.createElement('div'); // Oceanview
            n14.textContent = `A`;
            n14.className ='marker'
            new mapboxgl.Marker(n14)
                .setLngLat([-122.459106,37.716320])
                .addTo(map.current);

            const n15 = document.createElement('div'); // North Beach
            n15.textContent = `A`;
            n15.className ='marker'
            new mapboxgl.Marker(n15)
                .setLngLat([-122.407093,37.803778])
                .addTo(map.current);

            const n16 = document.createElement('div'); // Noe Valley
            n16.textContent = `A`;
            n16.className ='marker'
            new mapboxgl.Marker(n16)
                .setLngLat([-122.433711,37.748856])
                .addTo(map.current);
            
            const n17 = document.createElement('div'); // Lone Mountain
            n17.textContent = `A`;
            n17.className ='marker'
            new mapboxgl.Marker(n17)
                .setLngLat([-122.446843,37.777636])
                .addTo(map.current);

            const n18 = document.createElement('div'); // Lincoln Park
            n18.textContent = `A`;
            n18.className ='marker'
            new mapboxgl.Marker(n18)
                .setLngLat([-122.500262,37.783624])
                .addTo(map.current);

            const n19 = document.createElement('div'); // Seacliff
            n19.textContent = `A`;
            n19.className ='marker'
            new mapboxgl.Marker(n19)
                .setLngLat([-122.486248,37.786729])
                .addTo(map.current);

            const n20 = document.createElement('div'); // Nob Hill
            n20.textContent = `A`;
            n20.className ='marker'
            new mapboxgl.Marker(n20)
                .setLngLat([-122.481362,37.769060])
                .addTo(map.current);

            const n21 = document.createElement('div'); // Mission Bay
            n21.textContent = `A`;
            n21.className ='marker'
            new mapboxgl.Marker(n21)
                .setLngLat([-122.481362,37.769060])
                .addTo(map.current);
            
            const n22 = document.createElement('div'); // Mission
            n22.textContent = `A`;
            n22.className ='marker'
            new mapboxgl.Marker(n22)
                .setLngLat([-122.414842,37.760566])
                .addTo(map.current);

            const n23 = document.createElement('div'); // Russian Hill
            n23.textContent = `A`;
            n23.className ='marker'
            new mapboxgl.Marker(n23)
                .setLngLat([-122.494512,37.722528])
                .addTo(map.current);

            const n24 = document.createElement('div'); // Marina
            n24.textContent = `A`;
            n24.className ='marker'
            new mapboxgl.Marker(n24)
                .setLngLat([-122.481362,37.769060])
                .addTo(map.current);
            
            const n25 = document.createElement('div'); // Lakeshore
            n25.textContent = `A`;
            n25.className ='marker'
            new mapboxgl.Marker(n25)
                .setLngLat([-122.494512,37.722528])
                .addTo(map.current);

            const n26 = document.createElement('div'); // Tenderloin
            n26.textContent = `A`;
            n26.className ='marker'
            new mapboxgl.Marker(n26)
                .setLngLat([-122.481362,37.769060])
                .addTo(map.current);

            const n27 = document.createElement('div'); //McLaren Park
            n27.textContent = `A`;
            n27.className ='marker'
            new mapboxgl.Marker(n27)
                .setLngLat([-122.481362,37.769060])
                .addTo(map.current);

            const n28 = document.createElement('div'); //Japantown
            n28.textContent = `A`;
            n28.className ='marker'
            new mapboxgl.Marker(n28)
                .setLngLat([-122.481362,37.769060])
                .addTo(map.current);

            const n29 = document.createElement('div'); // Inner Sunset
            n29.textContent = `A`;
            n29.className ='marker'
            new mapboxgl.Marker(n29)
                .setLngLat([-122.481362,37.769060])
                .addTo(map.current);

            const n30 = document.createElement('div'); // Hayes Valley
            n30.textContent = `A`;
            n30.className ='marker'
            new mapboxgl.Marker(n30)
                .setLngLat([-122.481362,37.769060])
                .addTo(map.current);

            const n32 = document.createElement('div'); // Golden Gate Park
            n32.textContent = `A`;
            n32.className ='marker'
            new mapboxgl.Marker(n32)
                .setLngLat([-122.481362,37.769060])
                .addTo(map.current);
                
            const n33 = document.createElement('div'); // Inner Richmond
            n33.textContent = `A`;
            n33.className ='marker'
            new mapboxgl.Marker(n33)
                .setLngLat([-122.481362,37.769060])
                .addTo(map.current);
                
            const n34 = document.createElement('div'); // Glen Park
            n34.textContent = `A`;
            n34.className ='marker'
            new mapboxgl.Marker(n34)
                .setLngLat([-122.481362,37.769060])
                .addTo(map.current);

            const n35 = document.createElement('div'); //Financial District
            n35.textContent = `A`;
            n35.className ='marker'
            new mapboxgl.Marker(n35)
                .setLngLat([-122.481362,37.769060])
                .addTo(map.current);
            
            const n36 = document.createElement('div'); // Excelsior
            n36.textContent = `A`;
            n36.className ='marker'
            new mapboxgl.Marker(n36)
                .setLngLat([-122.481362,37.769060])
                .addTo(map.current);

            const n37 = document.createElement('div'); // Chinatown
            n37.textContent = `A`;
            n37.className ='marker'
            new mapboxgl.Marker(n37)
                .setLngLat([-122.481362,37.769060])
                .addTo(map.current);

            const n38 = document.createElement('div'); // Castro/ Upper Market
            n38.textContent = `A`;
            n38.className ='marker'
            new mapboxgl.Marker(n38)
                .setLngLat([-122.481362,37.769060])
                .addTo(map.current);

            const n39 = document.createElement('div'); //Bernal Heights
            n39.textContent = `A`;
            n39.className ='marker'
            new mapboxgl.Marker(n39)
                .setLngLat([-122.481362,37.769060])
                .addTo(map.current);
            
            const n40 = document.createElement('div'); // Bayview Hunters
            n40.textContent = `A`;
            n40.className ='marker'
            new mapboxgl.Marker(n40)
                .setLngLat([-122.389854,37.733749])
                .addTo(map.current);
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
        <div ref={mapContainer} className="map-container" />
    </div>
    );
}



