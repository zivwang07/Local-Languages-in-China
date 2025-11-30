// 1. Create the map centered on China
const map = L.map('map').setView([35, 105], 4); 
// [lat, lon] roughly center; zoom 4 is a good starting view

// 2. Add a base tile layer (background map)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 10,
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Helper: update info panel text
function showRegionInfo(props) {
  const container = document.getElementById('region-details');
  if (!props) {
    container.innerHTML = '<i>Click a region to see details.</i>';
    return;
  }

  container.innerHTML = `
    <p><b>${props.name_zh}</b> (${props.name_en})</p>
    <p>${props.description || ''}</p>
  `;
}

// Style for regions
function regionStyle(feature) {
  return {
    weight: 1,
    color: '#333',
    fillColor: '#f5a623',
    fillOpacity: 0.5
  };
}

// Highlight on hover
function highlightFeature(e) {
  const layer = e.target;
  layer.setStyle({
    weight: 2,
    color: '#000',
    fillOpacity: 0.7
  });
  layer.bringToFront();
}

// Reset highlight
function resetHighlight(e) {
  geojson.resetStyle(e.target);
}

// What happens when clicking a region
function onRegionClick(e) {
  const props = e.target.feature.properties;
  showRegionInfo(props);
}

// Attach events to each feature
function onEachFeature(feature, layer) {
  layer.on({
    mouseover: highlightFeature,
    mouseout: resetHighlight,
    click: onRegionClick
  });

  // Optional: tooltip on hover
  if (feature.properties && feature.properties.name_zh) {
    layer.bindTooltip(feature.properties.name_zh);
  }
}

// Load GeoJSON file
let geojson; // make it global so resetHighlight can use it

fetch('china_languages.geojson')
  .then(response => response.json())
  .then(data => {
    geojson = L.geoJSON(data, {
      style: regionStyle,
      onEachFeature: onEachFeature
    }).addTo(map);

    // Fit map bounds to your data
    map.fitBounds(geojson.getBounds());
  })
  .catch(err => console.error('Error loading GeoJSON:', err));
