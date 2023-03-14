var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

mapboxgl.accessToken = 'pk.eyJ1IjoiZGFjYWJ1IiwiYSI6ImNsZjhpc20xcTEyMnczcXBvZnZob3Q5amEifQ.Z1fRyIcR3box_xVcDcxoLA';
var map = new mapboxgl.Map({
    container: 'mapcontainer', // id (#mapcontainer) of an element on your page where you would like your map
    style: 'mapbox://styles/mapbox/streets-v11'
});
