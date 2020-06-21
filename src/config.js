module.exports = {
    accessToken : 'pk.eyJ1IjoiamluLWlnYXJhc2hpIiwiYSI6ImNrOHV1Nm9mdTAzMGIzdHNmbDBmZzllNnIifQ.J-ZRzlVGLH6Qm2UbCmYWeA',
    attribution : '©WASAC,Ltd.',
    styles : [
        { title: 'Street', uri: 'mapbox://styles/jin-igarashi/ckbp2snlw08oa1iqp9n3pyqos',}, 
    ],
    center: [29.69, -2.018],
    zoom: 8,
    // search:{
    //     url: 'https://narwassco.github.io/vt-map/meter.geojson',
    //     target: ['connno', 'serialno'],
    //     format: (p) => {return `${p.customer}, ${p.connno}, ${p.serialno}, ${p.village}`},
    //     place_type: ['meter'],
    //     placeholder: 'Search CONN NO or S/N',
    //     zoom: 17,
    // },
    popup: {
        target: ['connection','chamber','reservoir','pumping-station','watersource','pipeline',]
    }
}