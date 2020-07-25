import $ from 'jquery';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import RulerControl from 'mapbox-gl-controls/lib/ruler';
import CompassControl from 'mapbox-gl-controls/lib/compass';
import { MapboxStyleSwitcherControl } from "mapbox-gl-style-switcher";
import MapboxPopupControl from '@watergis/mapbox-gl-popup';
import '@watergis/mapbox-gl-popup/css/styles.css';
import PitchToggle from './pitchtogglecontrol/pitchtogglecontrol';
import MapboxAreaSwitcherControl from '@watergis/mapbox-gl-area-switcher';
import '@watergis/mapbox-gl-area-switcher/css/styles.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import "mapbox-gl-style-switcher/styles.css"
import './pitchtogglecontrol/pitchtogglecontrol.css';

import './style.css';
import config from './config';

$(function(){
    mapboxgl.accessToken = config.accessToken;

    this.map = new mapboxgl.Map({
        container: 'map',
        style: config.styles[0].uri,
        center: config.center,
        zoom: config.zoom,
        hash:true,
        attributionControl: false,
    });

    this.map.addControl(new mapboxgl.NavigationControl({showCompass:false}), 'top-right');
    this.map.addControl(new CompassControl(), 'top-right');
    this.map.addControl(new mapboxgl.GeolocateControl({positionOptions: {enableHighAccuracy: true},trackUserLocation: true}), 'top-right');
    this.map.addControl(new PitchToggle({minpitchzoom: 19})); 
    MapboxStyleSwitcherControl.DEFAULT_STYLE = config.styles[0].title;
    this.map.addControl(new MapboxStyleSwitcherControl(config.styles), 'top-right');
    this.map.addControl(new RulerControl(), 'top-right');
    this.map.addControl(new mapboxgl.ScaleControl({maxWidth: 80, unit: 'metric'}), 'bottom-left');
    this.map.addControl(new mapboxgl.AttributionControl({compact: true,customAttribution: config.attribution}), 'bottom-right');
    if (config.popup)this.map.addControl(new MapboxPopupControl(config.popup.target));

    if (config.search){
        $.getJSON(config.search.url , customerData =>{
            function forwardGeocoder(query) {
                var matchingFeatures = [];
                for (var i = 0; i < customerData.features.length; i++) {
                    var feature = customerData.features[i];
                    config.search.target.forEach(v=>{
                        var target = feature.properties[v];
                        if (!target){
                            return;
                        }
                        // handle queries with different capitalization than the source data by calling toLowerCase()
                        if ((target.toString().toLowerCase().search(query.toString().toLowerCase()) !== -1)) {
                            feature['place_name'] = config.search.format(feature.properties);
                            feature['center'] = feature.geometry.coordinates;
                            feature['place_type'] = config.search.place_type;
                            matchingFeatures.push(feature);
                        }
                    })
                }
                return matchingFeatures;
            }
            this.map.addControl(
                new MapboxGeocoder({
                    accessToken: mapboxgl.accessToken,
                    localGeocoder: forwardGeocoder,
                    localGeocoderOnly:true,
                    zoom: config.search.zoom,
                    placeholder: config.search.placeholder,
                    limit: config.search.limit,
                    mapboxgl: mapboxgl,
                }),
                'top-left'
            );

            var areas = [
                {"title":"Select District", "latlng":config.center,"zoom":config.zoom},
                {"title":"11 Nyarugenge", "latlng":[30.0288653612215,-1.99200475487584],"zoom":12},
                {"title":"12 Gasabo", "latlng":[30.1422120482397,-1.89144733688565],"zoom":12},
                {"title":"13 Kicukiro", "latlng":[30.1437249819475,-2.00886367922947],"zoom":12},
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
            MapboxAreaSwitcherControl.DEFAULT_AREA = areas[0].title;
            this.map.addControl(new MapboxAreaSwitcherControl(areas), 'top-left');
        });
    }
})