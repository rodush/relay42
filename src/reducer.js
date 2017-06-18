import {WS_DATA_RECEIVED} from './actions';
import {buildPoint} from './helpers';

export default function reducer(state = {}, action) {
    switch (action.type) {
        case WS_DATA_RECEIVED:
            return {
                added: [...(state.added.slice(1)), buildPoint(action.payload, 'totalCallsAdded')],
                removed: [...(state.removed.slice(1)), buildPoint(action.payload, 'totalCallsRemoved')],
                segmentSize: [...(state.segmentSize.slice(1)), buildPoint(action.payload, 'segmentSize')]
            };
        default:
            return state;
    }
}