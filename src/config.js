const version = 0.2;

module.exports = {
    accessToken : process.env.ACCESSTOKEN,
    attribution : '©WASAC,Ltd.',
    styles : [
        { title: 'Street', uri: `https://wasac.github.io/mapbox-stylefiles/street/style.json?version=${version}`,}, 
        { title: 'Satellite', uri: `https://wasac.github.io/mapbox-stylefiles/satellite/style.json?version=${version}`},
        // { title: 'UN Vector', uri: 'https://wasac.github.io/mapbox-stylefiles/unvt/style.json'}
    ],
    center: [30.0291, -2.0032],
    zoom: 9,
    search:{
        url: 'https://wasac.github.io/vt-map/wss.geojson',
        target: ['wss_name', 'district','po_name'],
        format: (p) => {return `${p.wss_id}-${p.wss_name}, ${p.po_name}, ${p.district}`},
        place_type: ['wss'],
        placeholder: 'Search WSS/PO/District',
        limit: 10,
        zoom: 13,
    },
    popup: {
        target: ['connection','chamber','reservoir','pumping-station','watersource','pipeline',]
    }
}