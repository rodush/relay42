import {buildPoint} from '../helpers';

test('transforms JSON entry into HighCharts point', () => {
    let entry = {
        "key": {
            "segmentNumber": 1,
            "dayTimestamp": 12456000,
            "timestamp": 12458500,
        },
        "totalCallsAdded": 15,
        "totalCallsRemoved": 7,
        "segmentSize": 10
    };

    expect(buildPoint(entry, 'totalCallsAdded')).toEqual([12458500, 15]);
    expect(buildPoint(entry, 'totalCallsRemoved')).toEqual([12458500, -7]);
    expect(buildPoint(entry, 'segmentSize')).toEqual([12458500, 10]);
});