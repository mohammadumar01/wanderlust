maptilersdk.config.apiKey = mapKey;
const map = new maptilersdk.Map({
container: 'map', // container's id or the HTML element to render the map
style: maptilersdk.MapStyle.STREETS,
center: coordinates, // starting position [lng, lat]
zoom: 9, // starting zoom
});

const marker = new maptilersdk.Marker({ color: "red" })
  .setLngLat(coordinates)
  .setPopup(
    new maptilersdk.Popup({offset: 12}).setHTML("<p>Exact location provided after booking</p>")
  )
  .addTo(map);