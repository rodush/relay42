// Generate series dynamically
const DEFAULT_LOOKBACK_INTERVAL = 30 * 86400 * 1000;

function* seriesGenerator(selectionInterval = 30, lookbackInterval = DEFAULT_LOOKBACK_INTERVAL) {
    let segmentNumber = 1;

    while (segmentNumber <= selectionInterval) {
        let timestamp = (new Date()).getTime() - lookbackInterval + (segmentNumber * (86400 * 1000));
        let totalCallsAdded = Math.round(Math.random(0, 50) * 100);
        let totalCallsRemoved = Math.round(Math.random(0, 50) * 100);
        let segmentSize = Math.round(Math.random(0, 20) * 10);

        let nextItem = {
            "key": {
                "segmentNumber": segmentNumber++, // internal segment id
                "dayTimestamp": timestamp, // timestamp normalised to midnight
                "timestamp": timestamp// actual data-point timestamp
            },
            "totalCallsAdded": totalCallsAdded,
            "totalCallsRemoved": totalCallsRemoved,
            "segmentSize": segmentSize
        };

        yield nextItem;
    }
}

// Public API
export default seriesGenerator;