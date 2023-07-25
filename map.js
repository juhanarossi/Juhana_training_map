mapboxgl.accessToken = 'pk.eyJ1IjoibWFodXJpbjAzIiwiYSI6ImNsazg5YW8xdDBiMWgzdWxjanQxYjcxNjQifQ.qFVncR2nVU7gSvfAemxIxg';

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
    let layers = map.getStyle().layers;
    let firstSymbolId;
    for (var i = 0; i < layers.length; i++) {
        if (layers[i].type === 'symbol') {
            firstSymbolId = layers[i].id;
            break;
        }
    }
    map.addLayer({
        'id': 'covid_data',
        'type': 'circle',
        'source': {
            'type': 'geojson',
            'data': 'data/covid_data.geojson'
        },
        'paint': {
            'circle-color': '#ff4400',
            'circle-stroke-color': '#4d4d4d',
            'circle-stroke-width': 0.5,
            'circle-radius': [
                'interpolate',
                ['linear'],
                ['zoom'],
                10, ['*', 0.05, ['to-number', ['get', 'nyc covid data by zip code  - nyc virus cases - nycases_zip_Positive tests']]],
                15, ['*', 0.1, ['to-number', ['get', 'nyc covid data by zip code  - nyc virus cases - nycases_zip_Positive tests']]]
            ]
        }
    }, firstSymbolId);
    

    map.on('click', 'covid_data', function (e) {
        let zipcode = e.features[0].properties.modzcta;
        let population = e.features[0].properties.pop_est;
        let positiveTests = e.features[0].properties["nyc covid data by zip code  - nyc virus cases - nycases_zip_Positive tests"];
        let totalTests = e.features[0].properties["nyc covid data by zip code  - nyc virus cases - nycases_zip_Total tests"];
        
        new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML('<h4>ZIP Code: ' + zipcode + '</h4>'
                + '<p><b>Population Est.:</b> ' + population + '<br>'
                + '<b>Positive Tests:</b> ' + positiveTests + '<br>'
                + '<b>Total Tests:</b> ' + totalTests + '</p>')
            .addTo(map);
    });
    
    map.on('mouseenter', 'covid_data', function () {
        map.getCanvas().style.cursor = 'pointer';
    });

    map.on('mouseleave', 'covid_data', function () {
        map.getCanvas().style.cursor = '';
    });
});
