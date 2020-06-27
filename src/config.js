module.exports = {
    accessToken : 'pk.eyJ1IjoiamluLWlnYXJhc2hpIiwiYSI6ImNrOHV1Nm9mdTAzMGIzdHNmbDBmZzllNnIifQ.J-ZRzlVGLH6Qm2UbCmYWeA',
    attribution : '©WASAC,Ltd.',
    styles : [
        { title: 'Street', uri: 'https://wasac.github.io/mapbox-stylefiles/street/style.json',}, 
        { title: 'Satellite', uri: 'https://wasac.github.io/mapbox-stylefiles/satellite/style.json'},
        // { title: 'UN Vector', uri: 'https://wasac.github.io/mapbox-stylefiles/unvt/style.json'}
    ],
    center: [30.0291, -2.0032],
    zoom: 9,
    search:{
        url: 'https://wasac.github.io/vt-map/wss.geojson',
        target: ['wss_name', 'district','po_name'],
        format: (p) => {return `${p.wss_id}-${p.wss_name}, ${p.po_name}, ${p.district}`},
        place_type: ['wss'],
        placeholder: 'Name of WSS, PO, District',
        limit: 10,
        zoom: 13,
    },
    popup: {
        target: ['connection','chamber','reservoir','pumping-station','watersource','pipeline',]
    }
}