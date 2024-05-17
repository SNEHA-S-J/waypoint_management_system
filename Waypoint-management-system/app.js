let map;
let markers = [];

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
    });

    map.addListener('click', (event) => {
        addWaypoint(event.latLng);
    });

    loadWaypoints();
}

function addWaypoint(location) {
    const marker = new google.maps.Marker({
        position: location,
        map: map,
        draggable: true,
    });

    markers.push(marker);

    marker.addListener('rightclick', () => {
        removeWaypoint(marker);
    });

    saveWaypoints();
}

function removeWaypoint(marker) {
    marker.setMap(null);
    markers = markers.filter(m => m !== marker);
    saveWaypoints();
}

function saveWaypoints() {
    const waypoints = markers.map(marker => {
        return { lat: marker.getPosition().lat(), lng: marker.getPosition().lng() };
    });

    localStorage.setItem('waypoints', JSON.stringify(waypoints));
}

function loadWaypoints() {
    const waypoints = JSON.parse(localStorage.getItem('waypoints')) || [];
    waypoints.forEach(wp => {
        addWaypoint(new google.maps.LatLng(wp.lat, wp.lng));
    });
}

window.onload = initMap;