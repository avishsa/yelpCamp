mapboxgl.accessToken = mapboxToken;
const campgroundJson = JSON.parse(campground)
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11', 
    center: campgroundJson.geometry.coordinates, // starting position [lng, lat]
    zoom: 9 // starting zoom
});
const popup = new mapboxgl.Popup({ offset: 25 })

.setHTML(     
     `<h3>${campgroundJson.title}<h3>`
);
new mapboxgl.Marker()
.setLngLat(campgroundJson.geometry.coordinates)
.setPopup(popup)
.addTo(map);

