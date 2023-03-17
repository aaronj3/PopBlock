// var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

// mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
// var map = new mapboxgl.Map({
//     container: 'mapcontainer', // id (#mapcontainer) of an element on your page where you would like your map
//     style: 'mapbox://styles/mapbox/streets-v11'
// });
import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import mapboxgl from 'mapbox-gl';
import './Map.css';
// import { Link } from 'react-router-dom';
import {getPosts} from '../../store/posts';
import jwtFetch from "../../store/jwt";


// mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

mapboxgl.accessToken = "pk.eyJ1IjoiZGFjYWJ1IiwiYSI6ImNsZjljZGYzMzE5ejMzcXBvbDFuMW5hMmEifQ.qFJCBw1xmv4j-rjefmAkoA";
// mapboxgl.accessToken = process.env.MAP_TOKEN;


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

        map.current.on('load', async () => {
            const response = await jwtFetch('/api/posts/likes')
            let maxLikes = []
            if (response.ok) {
                const res  = await response.json();
                maxLikes = res
            }

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
                paint: {
                    'fill-opacity': [
                        'case',
                        ['boolean', ['feature-state', 'hover'], false],
                        0.65,
                        0.2
                    ],
                    'fill-color':
                        ['match',
                            ['get', 'ncode'],
                            1, 'green', 2, 'green', 3, 'green', 4, 'green', 5, 'green', 6, 'green', 7, 'green', 8, 'green', 9, 'green', 10, 'green', 11, 'red', 12, 'red', 13, 'red', 14, 'red', 15, 'red', 16, 'red', 17, 'red', 18, 'red', 19, 'red', 20, 'red', 21, 'blue', 22, 'blue', 23, 'blue', 24, 'blue', 25, 'blue', 26, 'blue', 27, 'blue', 28, 'blue', 29, 'blue', 30, 'blue', 31, 'yellow', 32, 'yellow', 33, 'yellow', 34, 'yellow', 35, 'yellow', 36, 'yellow', 37, 'yellow', 38, 'yellow', 39, 'yellow', 40, 'yellow', "red"
                        ]
                }
            })

            map.current.addLayer({
                id: 'sf-boundaries-line',
                type: 'line',
                source: 'sf-boundaries',
                paint: {
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
                            {source: 'sf-boundaries', id: hoveredStateId},
                            {hover: false}
                        );
                    }
                    hoveredStateId = e.features[0].id;
                    map.current.setFeatureState(
                        {source: 'sf-boundaries', id: hoveredStateId},
                        {hover: true}
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
                        {source: 'sf-boundaries', id: hoveredStateId},
                        {hover: false}
                    );
                }
                hoveredStateId = null;
            });

            map.current.on('click', (e) => {
                const [selectedN] = map.current.queryRenderedFeatures(e.point, {
                    layers: ['sf-boundaries-fill']
                });
                if (selectedN) {
                    const {nhood} = selectedN.properties;
                    const {ncode} = selectedN.properties;
                    const areaId = parseInt(`${ncode}`);
                    // const post = useSelector(getPostByArea(`${id}`))
                    // dispatch(fetchPostByArea(`${id}`));
                    // const name = post.user.name
                    // const name = topPosts.areaID(selectedN.id).name
                    const regionData = maxLikes.find(l => l.area == areaId)
                    const description = `<strong>${regionData?regionData.author.username:areaId}</strong> is poppin in the <a href="/posts/area/${areaId}" >${nhood} neighborhood</a>`
                    new mapboxgl.Popup()
                        .setLngLat(e.lngLat)
                        .setHTML(description)
                        .addTo(map.current);
                }
            })

            const lngLat = [
                [-122.430420, 37.780713],
                [-122.459853, 37.736381],
                [-122.408208, 37.710768],
                [-122.450358, 37.751458],
                [-122.404476, 37.778542],
                [-122.452269, 37.786009],
                [-122.465072, 37.797713],
                [-122.392476, 37.759281],
                [-122.407307, 37.725845],
                [-122.432606, 37.791035],
                [-122.488459, 37.777190],
                [-122.440988, 37.723215],
                [-122.493095, 37.750969],
                [-122.459106, 37.716320],
                [-122.407093, 37.803778],
                [-122.433711, 37.748856],
                [-122.446843, 37.777636],
                [-122.500262, 37.783624],
                [-122.486248, 37.786729],
                [-122.414766, 37.790109],
                [-122.394271, 37.770478],
                [-122.414842, 37.760566],
                [-122.419647, 37.800428],
                [-122.435989, 37.800052],
                [-122.489963, 37.719168],
                [-122.414130, 37.783586],
                [-122.419105, 37.717505],
                [-122.438030, 37.784446],
                [-122.465223, 37.757196],
                [-122.428468, 37.774426],
                [-122.443236, 37.768976],
                [-122.481362, 37.769060],
                [-122.465290, 37.780804],
                [-122.434959, 37.735655],
                [-122.398942, 37.786973],
                [-122.432141, 37.717058],
                [-122.406955, 37.795075],
                [-122.434738, 37.760814],
                [-122.414239, 37.740596],
                [-122.389854, 37.733749]
            ];

            lngLat.forEach((data, index) => {
                const div = document.createElement('div'); // Bayview Hunters
                const regionData = maxLikes.find(l => l.area == index)
                div.textContent = regionData ? regionData.author.username : index;
                div.className = 'marker'
                div.style.backgroundColor = regionData ? regionData.author.color : "black";
                new mapboxgl.Marker(div)
                    .setLngLat(data)
                    .addTo(map.current);
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
        <div ref={mapContainer} className="map-container" />
    </div>
    );
}
