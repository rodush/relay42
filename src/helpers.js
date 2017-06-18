// Generates a point
export function buildPoint(item, key) {
    switch (key) {
        case 'totalCallsRemoved':
            return [item['key']['timestamp'], -1 * item[key]];
        default:
            return [item['key']['timestamp'], 1 * item[key]];
    }
}
