

async function fetchData() { 
    const response = await fetch('cereales.csv');
    const data = await response.text();

    const rows = data.split('\n').slice(1);

    const colors = ['#648FFF', '#785EF0', '#DC267F', '#FE6100', '#FFB000'];

    const traces = [];
    const annotations = [];

    rows.forEach((row, index) => {
        const cols = row.split(';');
        const brand = cols[0];
        const year1 = parseFloat(cols[1]);
        const year2 = parseFloat(cols[2]);
        const year3 = parseFloat(cols[3]);
        const year4 = parseFloat(cols[4]);   // New 2020 value

        if (!isNaN(year1) && !isNaN(year2) && !isNaN(year3) && !isNaN(year4) && brand) {
            traces.push({
                x: ['2010', '2015', '2020', '2024'],
                y: [year1, year2, year3, year4],
                name: brand,
                type: 'scatter',
                mode: 'lines+markers',
                line: { shape: 'linear', color: colors[index % colors.length], width: 3 },
                marker: { size: 8, symbol: ['circle', 'circle', 'circle', 'circle'] }
            });

            // Annotations for 2010, 2015, and 2020
            annotations.push(
                {
                    x: '2010' - 0.2,
                    y: year1,
                    xref: 'x',
                    yref: 'y',
                    text: `<b>${brand}</b> ${Math.round(year1)}`,
                    showarrow: false,
                    font: { color: 'black', size: 12 },
                    xanchor: 'right'
                },
                {
                    x: '2015',
                    y: year2 + 0.4,
                    xref: 'x',
                    yref: 'y',
                    text: ` ${Math.round(year2)}`,
                    showarrow: false,
                    font: { color: 'black', size: 12 },
                    xanchor: 'center'
                },
                {
                    x: '2020',
                    y: year3 + 0.4,
                    xref: 'x',
                    yref: 'y',
                    text: ` ${Math.round(year3)}`,
                    showarrow: false,
                    font: { color: 'black', size: 12 },
                    xanchor: 'center'
                },
                {
                    x: '2024',
                    y: year4 + 0.4,
                    xref: 'x',
                    yref: 'y',
                    text: ` ${Math.round(year4)}`,
                    showarrow: false,
                    font: { color: 'black', size: 12 },
                    xanchor: 'left'
                }
            );
        }
    });

    return { traces, annotations };
}

fetchData().then(({ traces, annotations }) => {
    const layout = {
        title: 'Azúcares en Cereales [g/30g]',
        xaxis: {
            tickvals: ['2010', '2012', '2015', '2016', '2020', '2024'],  // Include 2020
            tickmode: 'array'
        },
        yaxis: {
            range: [0, 15],
            showticklabels: false
        },
        showlegend: false,
        margin: { l: 70, r: 100, t: 130 },
        annotations: [
            ...annotations,
            {
                x: '2016',
                y: 15,
                xref: 'x',
                yref: 'y',
                text: 'Implementación<br>sellos',
                showarrow: false,
                font: { color: 'black', size: 13 },
                xanchor: 'center',
                yanchor: 'bottom'
            },
            {
                x: '2012',
                y: 15,
                xref: 'x',
                yref: 'y',
                text: 'Aprobación<br>ley',
                showarrow: false,
                font: { color: 'black', size: 13 },
                xanchor: 'center',
                yanchor: 'bottom'
            },
            {
                x: '2010',
                y: 15,
                xref: 'x',
                yref: 'y',
                text: '<b>Cereales<b>',
                showarrow: false,
                font: { color: 'black', size: 14 },
                xanchor: 'right',
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
                },
                layer: 'below'
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
                },
                layer: 'below'
            },
            {
                type: 'line',
                x0: '2010',
                y0: 0,
                x1: '2010',
                y1: 0,
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
    Plotly.newPlot('myDiv', traces, layout);
});


