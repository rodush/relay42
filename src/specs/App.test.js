import React from 'react';
import {App} from '../App';
import {shallow, mount, render} from 'enzyme';
import ReactHighcharts from 'react-highcharts';
import configureStore from 'redux-mock-store';

let shallowWrapper;
let middleware = [];
let mockStore = configureStore(middleware);
let store = mockStore({});
let dispatch = jest.fn();

beforeEach(() => {
    shallowWrapper = shallow(<App dispatch={dispatch} store={store}/>);
});

it('<App/> constructed from <ReactHighcharts/>', () => {
    expect(shallowWrapper.find(ReactHighcharts).length).toEqual(1);
});

it('<ReactHighcharts/> wrapper renders the "HighchartsChart" element', () => {
    expect(shallowWrapper.find('HighchartsChart').length).toEqual(1);
});

it('has defined reference name', () => {
    expect(shallowWrapper.find('HighchartsChart').node.ref).toEqual('chart');
});