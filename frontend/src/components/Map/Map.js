var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
var map = new mapboxgl.Map({
    container: 'mapcontainer', // id (#mapcontainer) of an element on your page where you would like your map
    style: 'mapbox://styles/mapbox/streets-v11'
});
