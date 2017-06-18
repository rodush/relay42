import reducer from '../reducer';

describe('Reducer', () => {
    test('does not modify state for unknown action', () => {
        let state = {a: 1, b: 2, c: [2, 3]};
        expect(reducer(state, {type: 'SOME_ACTION'})).toBe(state);
    });

    test('adds new point(s) when data received and un-shifts from series', () => {
        let payload = {
            "key": {
                "segmentNumber": 3,
                "dayTimestamp": 12456000,
                "timestamp": 12458500,
            },
            "totalCallsAdded": 15,
            "totalCallsRemoved": 7,
            "segmentSize": 10
        };
        let action = {type: 'WS_DATA_RECEIVED', payload};

        let prevState = {
            added: [[12456500, 6], [12457500, 2]],
            removed: [[12456500, 1], [12457500, 4]],
            segmentSize: [[12456500, 3], [12457500, 8]],
        };

        let nextState = {
            added: [[12457500, 2], [12458500, 15]],
            removed: [[12457500, 4], [12458500, -7]],
            segmentSize: [[12457500, 8], [12458500, 10]],
        };

        expect(reducer(prevState, action)).toEqual(nextState);
    });
});
