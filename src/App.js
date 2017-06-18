import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import ReactHighcharts from 'react-highcharts';
import './App.css';
import HC_CONFIG from './config/highcharts.js'
import APP_CONFIG from './config/app';
import actions from './actions';
import dataGenerator from './data/series';

let interval;

class App extends Component {
    componentWillMount() {
        // Simulate periodical changes from the WS
        let seriesGenerator = dataGenerator(10, 0);
        interval = setInterval(() => {
            let nextVal = seriesGenerator.next().value;
            if (nextVal !== undefined) {
                let action = actions.handleMessage(nextVal);
                this.props.dispatch(action);
            }
        }, 1000);

        this.props.dispatch(actions.connect(APP_CONFIG.wsUrl));
    }

    shouldComponentUpdate(nextProps) {
        let chart = this.refs.chart.getChart();

        chart.series[0].addPoint(nextProps.added.slice(-1)[0], false, true);
        chart.series[1].addPoint(nextProps.removed.slice(-1)[0], false, true);
        chart.series[2].addPoint(nextProps.segmentSize.slice(-1)[0], true, true);

        return false;
    }

    componentWillUpdate(nextProps, nextState) {

    }

    componentWillUnmount() {
        clearInterval(interval);
        this.props.dispatch(actions.disconnect());
    }

    componentDidMount() {
        let chart = this.refs.chart.getChart();
        chart.series[0].setData(this.props.added, false, true);
        chart.series[1].setData(this.props.removed, false, true);
        chart.series[2].setData(this.props.segmentSize, true, true);
    }

    render() {
        return <ReactHighcharts config={HC_CONFIG} ref="chart" {...this.props} />;
    }
}

// App.propTypes = {
//     added: PropTypes.arrayOf(PropTypes.array).required,
//     removed: PropTypes.arrayOf(PropTypes.array).required,
//     segmentSize: PropTypes.arrayOf(PropTypes.string).required
// };

const mapStateToProps = (state) => {
    return {
        added: state.added,
        removed: state.removed,
        segmentSize: state.segmentSize
    };
};

//-----------
// PUBLIC
//-----------
export default connect(mapStateToProps)(App);
