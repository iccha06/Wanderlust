window.addEventListener("load", async () => {

    console.log("Coordinates received:", coordinates);

    if (!coordinates || coordinates.length < 2) {
        console.log("Coordinates missing");
        return;
    }

    const longitude = coordinates[0];
    const latitude = coordinates[1];

    // Initialize map
    const map = L.map("map").setView([latitude, longitude], 13);

    // OpenStreetMap tiles
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    // Custom red marker icon
    const redIcon = new L.Icon({
        iconUrl:
            "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",

        shadowUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",

        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
    });

    // Default popup text
    let locationName = "Selected Location";

    try {
        // Reverse geocoding
        const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
        );

        const data = await response.json();

        // Get cleaner location name
        if (data && data.display_name) {
            locationName = data.display_name
                .split(",")
                .slice(0, 2)
                .join(",");
        }

    } catch (error) {
        console.log("Error fetching location name:", error);
    }

    // Popup HTML
    const popupText = `
        <div style="
            font-size: 15px;
            font-weight: bold;
            padding: 5px 10px;
        ">
            ${locationName}
        </div>
    `;

    // Add marker
    L.marker([latitude, longitude], {
        icon: redIcon,
    })
        .addTo(map)
        //.bindPopup(popupText)
        .openPopup();

    // Fix rendering issue
    setTimeout(() => {
        map.invalidateSize();
    }, 100);
});