const HC_CONFIG  = {
    title: {
        text: 'Selection activity',
        align: 'left'
    },
    xAxis: {
        type: 'datetime',
        // tickInterval: 24 * 3600 * 1000, // one day
        // tickPixelInterval: 150,
        // maxZoom: 20 * 1000
    },
    yAxis: [
        {
            minPadding: 0.2,
            maxPadding: 0.2,
            title: {
                text: 'Total number of profiles',
                margin: 20
            },
        },
        {
            minPadding: 0.2,
            maxPadding: 0.2,
            title: {
                text: 'Changes in segment',
                margin: 20,
                style: {color: '#009E14'},
            },
            labels: {
                style: {color: '#009E14'},
            },
            lineColor: '#009E14',
            opposite: true
        },

    ],
    series: [
        {name: 'Added', type: 'column', yAxis: 0, color: '#A366FF'},
        {name: 'Removed', type: 'column', yAxis: 0, color: '#A2A2A2'},
        {name: 'Selection size', type: 'spline', yAxis: 1, color: '#5AC3FF'}
    ],
    tooltip: {
        headerFormat: `<div>{point.key}</div><table style="width: 100%;">`,
        pointFormat: `<tr>
            <td style="color:{series.color};">{series.name}</td>
            <td style="text-align: right;">{point.y}</td>
        </tr>`,
        footerFormat: `</table>`,
        shared: true,
        useHTML: true,
        xDateFormat: '%e. %b'
    },
    plotOptions: {
        series: {
            stacking: 'normal'
        }
    },
};

export default HC_CONFIG;