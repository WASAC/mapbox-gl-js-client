/**
 * Adds area switcher.
 * @param {Object} options
 * @param {Array} [options.area] - Array of area objects:
 * @param {String} options.area.label - Area label to display on switcher
 * @param {String} options.area.latlng - Latitude and Longitude to display
 * @param {String} options.area.zoom - Zoom level to display
 * @param {Function} [options.onChange] - Triggered on area change. Accepts `area` object
 */

export default class AreaSwitcherControl {
  constructor(areas) {
    this.areas = areas || AreaSwitcherControl.DEFAULT_AREAS;
    this.onDocumentClick = this.onDocumentClick.bind(this);
  }

  getDefaultPosition() {
    const defaultPosition = "top-right";
    return defaultPosition;
  }

  onAdd(map) {
    this.map = map;
    this.controlContainer = document.createElement("div");
    this.controlContainer.classList.add("mapboxgl-ctrl");
    this.controlContainer.classList.add("mapboxgl-ctrl-group");
    this.mapAreaContainer = document.createElement("div");
    this.areaButton = document.createElement("button");
    this.mapAreaContainer.classList.add("mapboxgl-area-list");
    for (const area of this.areas) {
        const styleElement = document.createElement("button");
        styleElement.innerText = area.title;
        styleElement.classList.add(area.title.replace(/[^a-z0-9-]/gi, '_'));
        styleElement.value = JSON.stringify({
          center: area.latlng,
          zoom: area.zoom,
        });
        styleElement.addEventListener("click", event => {
            const srcElement = event.srcElement;
            this.map.jumpTo(JSON.parse(srcElement.value));
            // this.map.setStyle(JSON.parse(srcElement.dataset.uri));
            this.mapAreaContainer.style.display = "none";
            this.areaButton.style.display = "block";
            const elms = this.mapAreaContainer.getElementsByClassName("active");
            while (elms[0]) {
                elms[0].classList.remove("active");
            }
            srcElement.classList.add("active");
        });
        if (area.title === AreaSwitcherControl.DEFAULT_AREA) {
            styleElement.classList.add("active");
        }
        this.mapAreaContainer.appendChild(styleElement);
    }
    this.areaButton.classList.add("mapboxgl-ctrl-icon");
    this.areaButton.classList.add("mapboxgl-area-switcher");
    this.areaButton.addEventListener("click", () => {
        this.areaButton.style.display = "none";
        this.mapAreaContainer.style.display = "block";
    });
    document.addEventListener("click", this.onDocumentClick);
    this.controlContainer.appendChild(this.areaButton);
    this.controlContainer.appendChild(this.mapAreaContainer);
    return this.controlContainer;
  }
  
  onRemove() {
    if (!this.controlContainer || !this.controlContainer.parentNode || !this.map || !this.areaButton) {
      return;
    }
    this.areaButton.removeEventListener("click", this.onDocumentClick);
    this.controlContainer.parentNode.removeChild(this.controlContainer);
    document.removeEventListener("click", this.onDocumentClick);
    this.map = undefined;
  }

  onDocumentClick(event) {
    if (this.controlContainer && !this.controlContainer.contains(event.target)
        && this.mapAreaContainer && this.areaButton) {
        this.mapAreaContainer.style.display = "none";
        this.areaButton.style.display = "block";
    }
  }
};

AreaSwitcherControl.DEFAULT_AREA = "Narok";
AreaSwitcherControl.DEFAULT_AREAS = [
  // {"title":"11 Nyarugenge", "latlng":[30.0288653612215,-1.99200475487584],"zoom":12},
  // {"title":"12 Gasabo", "latlng":[30.1422120482397,-1.89144733688565],"zoom":12},
  // {"title":"13 Kicukiro", "latlng":[30.1437249819475,-2.00886367922947],"zoom":12},
  {"title":"21 Nyanza", "latlng":[29.7934631363515,-2.33586082999584],"zoom":12},
  {"title":"22 Gisagara", "latlng":[29.8436033859615,-2.61811188806316],"zoom":12},
  {"title":"23 Nyaruguru", "latlng":[29.5168759030027,-2.69484387015002],"zoom":12},
  {"title":"24 Huye", "latlng":[29.7087951341718,-2.52464457911903],"zoom":12},
  {"title":"25 Nyamagabe", "latlng":[29.4698787720274,-2.41135618910831],"zoom":12},
  {"title":"26 Ruhango", "latlng":[29.7717605320827,-2.1935977243496],"zoom":12},
  {"title":"27 Muhanga", "latlng":[29.7227253820235,-1.95489071084815],"zoom":12},
  {"title":"28 Kamonyi", "latlng":[29.9024032068034,-2.00944646067485],"zoom":12},
  {"title":"31 Karongi", "latlng":[29.3939794945079,-2.14093530933277],"zoom":12},
  {"title":"32 Rutsiro", "latlng":[29.3245894326215,-1.90887784780581],"zoom":12},
  {"title":"33 Rubavu", "latlng":[29.3303054980033,-1.66515575107771],"zoom":12},
  {"title":"34 Nyabihu", "latlng":[29.510515375496,-1.64739217887844],"zoom":12},
  {"title":"35 Ngororero", "latlng":[29.569465018845,-1.87784485498627],"zoom":12},
  {"title":"36 Rusizi", "latlng":[29.0796739089125,-2.55892167107665],"zoom":12},
  {"title":"37 Nyamasheke", "latlng":[29.1560365354539,-2.35378626195199],"zoom":12},
  {"title":"41 Rulindo", "latlng":[29.9872268548849,-1.73928358664116],"zoom":12},
  {"title":"42 Gakenke", "latlng":[29.7842366394951,-1.69853058335672],"zoom":12},
  {"title":"43 Musanze", "latlng":[29.6065974375442,-1.49853529133511],"zoom":12},
  {"title":"44 Burera", "latlng":[29.8265446554722,-1.46624298025298],"zoom":12},
  {"title":"45 Gicumbi", "latlng":[30.1138711655701,-1.62157664586841],"zoom":12},
  {"title":"51 Rwamagana", "latlng":[30.3547358515713,-1.97549651051349],"zoom":12},
  {"title":"52 Nyagatare", "latlng":[30.37992503494,-1.33824885529472],"zoom":12},
  {"title":"53 Gatsibo", "latlng":[30.4453918762694,-1.61907593334064],"zoom":12},
  {"title":"54 Kayonza", "latlng":[30.6419786108336,-1.84512559523969],"zoom":12},
  {"title":"55 Kirehe", "latlng":[30.7103447378219,-2.23439612617204],"zoom":12},
  {"title":"56 Ngoma", "latlng":[30.4571880272249,-2.18299296025152],"zoom":12},
  {"title":"57 Bugesera", "latlng":[30.1501661937551,-2.2397657167318],"zoom":12},
  ];