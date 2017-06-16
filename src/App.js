import React, {Component} from 'react';
import ReactHighcharts from 'react-highcharts';
import './App.css';
import dataGenerator from './data/series.js';
import HC_CONFIG from './config/highcharts.js'

import actionMakers from './actions';
import store from 'react';
// import connect from 'redux';
// import thunk from 'redux-thunk';

// TODO: To be extracted into config file
const APP_CONFIG = {
    wsUrl: 'ws://localhost:5000/'
};

let gen = dataGenerator();
let ws;

class App extends Component {
    componentWillMount() {
        // Open WS connection
        ws = new WebSocket(APP_CONFIG.wsUrl, "v1");

        ws.onerror = (err) => console.log(err);
        ws.onopen = () => {
            console.log("Hello wizard!");
        };
        ws.onmessage = (evt = {}) => {
            if (!evt.data) {
                return;
            }

            let msg = JSON.parse(evt.data);
            store.dispatch(actionMakers.dataReceived(msg));
        }
    }

    componentWillUnmount() {
        ws.close();
    }

    componentDidMount() {
        let chart = this.refs.chart.getChart();
        let nextVal = gen.next().value;
        while (nextVal) {
            chart.series[0].addPoint(buildPoint(nextVal, 'totalCallsAdded'), true);
            chart.series[1].addPoint(buildPoint(nextVal, 'totalCallsRemoved'), true);
            chart.series[2].addPoint(buildPoint(nextVal, 'segmentSize'), true);
            nextVal = gen.next().value;
        }
    }

    render() {
        return (
            <ReactHighcharts config={HC_CONFIG} ref="chart"></ReactHighcharts>
        );
    }
}


//-----------
// PRIVATE
//-----------

// Generates a point
function buildPoint(item, key) {
    switch (key) {
        case 'totalCallsRemoved':
            return [item['key']['timestamp'], -1 * item[key]];
        default:
            return [item['key']['timestamp'], 1 * item[key]];
    }
}

//-----------
// PUBLIC
//-----------
export default App;
