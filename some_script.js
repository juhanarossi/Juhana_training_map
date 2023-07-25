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
