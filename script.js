let map;
let markers = [];

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 15.3694, lng: 44.1910 },
    zoom: 13
  });

  fetch('data/locations.json')
    .then(res => res.json())
    .then(data => {
      renderMarkers(data);

      document.getElementById("searchInput").addEventListener("input", function() {
        const keyword = this.value.toLowerCase();
        const filtered = data.filter(loc =>
          loc.name.toLowerCase().includes(keyword) ||
          loc.type.toLowerCase().includes(keyword)
        );
        clearMarkers();
        renderMarkers(filtered);
      });
    });
}

function renderMarkers(locations) {
  locations.forEach(loc => {
    const marker = new google.maps.Marker({
      position: { lat: loc.lat, lng: loc.lng },
      map: map,
      title: loc.name
    });

    const infoWindow = new google.maps.InfoWindow({
      content: `
        <strong>${loc.name}</strong><br>
        📌 النوع: ${loc.type}<br>
        📍 العنوان: ${loc.address}<br>
        📞 التواصل: ${loc.phone}<br>
        ⏰ الدوام: ${loc.hours}<br>
        <a href="${loc.link}" target="_blank">فتح في Google Maps</a>
      `
    });

    marker.addListener("click", () => infoWindow.open(map, marker));
    markers.push(marker);
  });
}

function clearMarkers() {
  markers.forEach(marker => marker.setMap(null));
  markers = [];
}