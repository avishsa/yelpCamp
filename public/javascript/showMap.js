mapboxgl.accessToken = mapboxToken;
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11', 
    center: campground.geometry.coordinates, // starting position [lng, lat]
    zoom: 9 // starting zoom
});
const popup = new mapboxgl.Popup({ offset: 25 })

.setHTML(     
     `<h3>${campground.title}<h3>`
);
new mapboxgl.Marker()
.setLngLat(campground.geometry.coordinates)
.setPopup(popup)
.addTo(map);

