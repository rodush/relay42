import actionMakers, {WS_DATA_RECEIVED} from './actions';

export function wsDataHandler(store = {}, action) {
    switch (action.type) {
        case WS_DATA_RECEIVED:
            return {...store, series: action.payload};
        default:
            return store;
    }
}