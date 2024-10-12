

async function fetchData() {
    const response = await fetch('cereales.csv');
    const data = await response.text();

    const rows = data.split('\n').slice(1);

    const colors = ['#648FFF', '#785EF0', '#DC267F', '#FE6100', '#FFB000'];

    const traces = [];
    const annotations = [];

    rows.forEach((row, index) => {
        const cols = row.split(',');
        const brand = cols[0];
        const year1 = parseFloat(cols[1]);
        const year2 = parseFloat(cols[2]);

        if (!isNaN(year1) && !isNaN(year2) && brand) {
            traces.push({
                x: ['2010', '2015'],
                y: [year1, year2],
                name: brand,
                type: 'scatter',
                mode: 'lines+markers',
                line: { shape: 'linear', color: colors[index % colors.length], width: 3 }, // Assign color
                marker: { size: 8, symbol: ['circle', 'square'] }
            });

            // Add annotation for the starting point (2010)
            annotations.push({
                x: '2010',
                y: year1,
                xref: 'x',
                yref: 'y',
                text: `${brand}  ${Math.round(year1)} `,
                showarrow: false,
                font: { color: 'black', size: 12 },
                xanchor: 'right'
            });

            // Add annotation for the ending point (2015)
            annotations.push({
                x: '2015',
                y: year2,
                xref: 'x',
                yref: 'y',
                text: `  ${Math.round(year2)}`,
                showarrow: false,
                font: { color: 'black', size: 12 },
                xanchor: 'left'
            });
        }
    });

    return { traces, annotations };
}

fetchData().then(({ traces, annotations }) => {
    const layout = {
        title: 'Azucares en Cereales',
        xaxis: {
            tickvals: ['2010', '2012', '2015', '2016'], // Include 2012 on the x-axis
            tickmode: 'array'
        },
        yaxis: {
            range: [0, 45],
            showticklabels: false
        },
        showlegend: false,
        margin: { l: 70, r: 100, t: 130 },
        annotations: [
            ...annotations,
            {
                x: '2016',  
                y: 45,  
                xref: 'x',
                yref: 'y',
                text: 'Implementación Sellos',  
                showarrow: false,
                font: { color: 'black', size: 14 },
                xanchor: 'center',
                yanchor: 'bottom'
            },
            {
                x: '2012',  
                y: 45,  
                xref: 'x',
                yref: 'y',
                text: 'Aprobación Ley',  
                showarrow: false,
                font: { color: 'black', size: 14 },
                xanchor: 'center',
                yanchor: 'bottom'
            }
        ],
        shapes: [
            {
                type: 'line',
                x0: '2016',
                y0: 0,
                x1: '2016',
                y1: 50,
                xref: 'x',
                yref: 'y',
                line: {
                    color: 'black',
                    width: 2,
                    dash: 'dot'  
                }
            },
            {
                type: 'line',
                x0: '2012',
                y0: 0,
                x1: '2012',
                y1: 50,
                xref: 'x',
                yref: 'y',
                line: {
                    color: 'black',
                    width: 2,
                    dash: 'dot'  
                }
            }
        ]
    };

    Plotly.newPlot('myDiv', traces, {
        ...layout,
        width: 700,  // Set desired width
        height: 700  // Set desired height
    });

});

