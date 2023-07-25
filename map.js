mapboxgl.accessToken = 'pk.eyJ1IjoibWFodXJpbjAzIiwiYSI6ImNsazg5YW8xdDBiMWgzdWxjanQxYjcxNjQifQ.qFVncR2nVU7gSvfAemxIxg';

//This adds a new map to the screen and sets the min
//and max zoom and the center point and loads the style
//that you created in Mapbox Studio.
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mahurin03/clk88b87e02zx01nses6s3n7e',
    zoom: 10,
    center: [-74, 40.725],
    maxZoom: 15,
    minZoom: 8,
    maxBounds: [[-74.45, 40.45], [-73.55, 41]]
});
map.on('load', function () {
    // This is the function that finds the first symbol layer
    let layers = map.getStyle().layers;
    let firstSymbolId;
    for (var i = 0; i < layers.length; i++) {
    console.log(layers[i].id); // This is the line of code that we are adding
    if (layers[i].type === 'symbol') {
        firstSymbolId = layers[i].id;
        break;
    }
}
    // This is the function that adds the data
    map.addLayer({
        'id': 'covid_data',
        'type': 'circle',
        'source': {
            'type': 'geojson',
            'data': 'data/covid_data.geojson'
        },
        'paint': {
            'circle-color': ['interpolate', ['linear'], ['get', 'ENTRIES_DIFF'],
                -1, '#ff4400',
                -0.7, '#ffba31',
                -0.4,  '#ffffff'
            ],
            'circle-stroke-color': '#4d4d4d',
            'circle-stroke-width': 0.5,
            'circle-radius': ['interpolate', ['exponential', 2], ['zoom'],
                10, ['interpolate', ['linear'], ['get', 'ENTRIES_DIFF'],
                    -1, 10,
                    -0.4, 1
                ],
                15, ['interpolate', ['linear'], ['get', 'ENTRIES_DIFF'],
                    -1, 25,
                    -0.4, 12
                ]]
        }
    }, firstSymbolId);

 //map.on('click', 'covid_data', function (e) {
        //let label = e.features[0].properties.label;
        //let modzcta = e.features[0].properties.modzcta;
        //let pop_est = e.features[0].properties.pop_est;
        //let zcta = e.features[0].properties.zcta;
        //let neighborhood = e.features[0].properties["nyc covid data by zip code  - nyc virus cases - nycases_zip_neighborhood"];
        //let positiveTests = e.features[0].properties["nyc covid data by zip code  - nyc virus cases - nycases_zip_Positive tests"];
        //let totalTests = e.features[0].properties["nyc covid data by zip code  - nyc virus cases - nycases_zip_Total tests"];
        //let boros = e.features[0].properties["nyc covid data by zip code  - nyc virus cases - nycases_zip_boros"];
        
        //new mapboxgl.Popup()
            //.setLngLat(e.lngLat)
            //.setHTML('<h4>' + neighborhood + ' (' + label + ')</h4>'
                //+ '<p><b>Modzcta:</b> ' + modzcta + '<br>'
                //+ '<b>Population Est.:</b> ' + pop_est + '<br>'
                //+ '<b>ZCTA:</b> ' + zcta + '<br>'
                //+ '<b>Positive Tests:</b> ' + positiveTests + '<br>'
                //+ '<b>Total Tests:</b> ' + totalTests + '<br>'
                //+ '<b>Borough:</b> ' + boros + '</p>')
            //.addTo(map);
        
});
// Change the cursor to a pointer when the mouse is over the covid_data layer.
map.on('mouseenter', 'covid_data', function () {
    map.getCanvas().style.cursor = 'pointer';
});
// Change it back to a pointer when it leaves.
map.on('mouseleave', 'covid_data', function () {
    map.getCanvas().style.cursor = '';
});