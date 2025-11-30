// 1. Create the map centered on China
const map = L.map('map').setView([35, 105], 4); 
// [lat, lon] roughly center; zoom 4 is a good starting view

// 2. Add a base tile layer (background map)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 10,
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);
