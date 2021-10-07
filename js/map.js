// defining basemap variables START

let basemapSatellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: `Tiles &copy; Esri &mdash; 
    Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, 
    Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community, 
    github.com/aghayeffemin`
});

let basemapStreets = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, github.com/aghayeffemin`'
});

// defining basemap variables END

let basemapObject = {
    "streets": basemapStreets,
    "satellite": basemapSatellite
}

let mapContainer = L.map('map_container', { layers: [basemapSatellite], zoomControl: false }).setView([47.373002669575044, 5.321126760677522], 13);

// layer for graphics
let layerGroup = L.layerGroup().addTo(mapContainer);

// add predefined graphics to the map
addGraphics()

function addGraphics() {

    // clear all graphics before adding the defualt ones
    layerGroup.clearLayers();

    let marker = L.marker([47.373002669575044, 5.311126760677522]).addTo(layerGroup);

    let circle = L.circle([47.373002669575044, 5.299999], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 500
    }).addTo(layerGroup);

    let polygon = L.polygon([
        [47.370002669575044, 5.320126760677522],
        [47.375002669575044, 5.355126760677522],
        [47.379002669575044, 5.329126760677522]
    ]).addTo(layerGroup);
}

// hide/show template of the button if there is
function openContentHolder(elem) {
    let contentHolderElem = document.querySelector("#" + elem.dataset.contentid);
    if (contentHolderElem.style.display === "none") {
        contentHolderElem.style.display = "block"
        elem.style.backgroundColor = "#03aa6f"
        elem.querySelector(".lni").style.color = "#ffffff"
    }
    else {
        contentHolderElem.style.display = "none"
        elem.style.backgroundColor = "#ffffff"
        elem.querySelector(".lni").style.color = "#000000"
    }
}

// Map Functions START

function cGoToCoordinate() {
    let latitudeValue = parseFloat(document.getElementById("latitude").value);
    let longitudeValue = parseFloat(document.getElementById("longitude").value);
    console.log(latitudeValue, longitudeValue)
    if (!isNaN(latitudeValue) && !isNaN(longitudeValue !== null)) {
        L.marker([latitudeValue, longitudeValue]).addTo(layerGroup);
        mapContainer.setView([latitudeValue, longitudeValue], mapContainer.getZoom())
        return;
    }
    alert("Fill both values")
    return;
}

function cActivateBasemap(elem) {
    if (mapContainer.hasLayer(basemapObject[elem.dataset.basemapid])) {
        mapContainer.removeLayer(basemapObject[elem.dataset.basemapid])
    }
    basemapObject[elem.dataset.basemapid].addTo(mapContainer)
}

function cZoomIn() {
    mapContainer.setZoom(mapContainer.getZoom() + 1)
}

function cZoomOut() {
    mapContainer.setZoom(mapContainer.getZoom() - 1)
}

function cResetMapState() {
    mapContainer.setView([47.373002669575044, 5.321126760677522], 13);
    addGraphics()
}

function cFullScreen() {
    if ((document.fullScreenElement && document.fullScreenElement !== null) ||
        (!document.mozFullScreen && !document.webkitIsFullScreen)) {
        if (document.documentElement.requestFullScreen) {
            document.documentElement.requestFullScreen();
        } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullScreen) {
            document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
        }
    } else {
        if (document.cancelFullScreen) {
            document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        }
    }
}

function cClearGraphics() {
    layerGroup.clearLayers();
}

// Map Functions END

function runCommand(command, elem) {
    switch (command) {
        case "open-basemap-holder":
            openContentHolder(elem)
            break;
        case "goto-coordinate-holder":
            openContentHolder(elem)
            break;
        case "zoom-in":
            cZoomIn()
            break;
        case "zoom-out":
            cZoomOut()
            break;
        case "reset-map-state":
            cResetMapState()
            break;
        case "full-screen":
            cFullScreen()
            break;
        case "clear-graphics":
            cClearGraphics()
            break;
        default:
            break;
    }
}