import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import socketMiddleware from './middleware';
import reducer from './reducer';
import dataGenerator from './data/series.js';
import {buildPoint} from './helpers';

// Define the shape of store
const initialState = {
    added: [],
    removed: [],
    segmentSize: []
};

let gen = dataGenerator();
let nextVal = gen.next().value;
while (nextVal) {
    initialState.added.push(buildPoint(nextVal, 'totalCallsAdded'));
    initialState.removed.push(buildPoint(nextVal, 'totalCallsRemoved'));
    initialState.segmentSize.push(buildPoint(nextVal, 'segmentSize'));
    nextVal = gen.next().value;
}

export default createStore(reducer, initialState, applyMiddleware(thunk, socketMiddleware));