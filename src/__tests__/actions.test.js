import actions from '../actions';

describe('Action factory', () => {
    it('can build action to initiate WS connection with default protocol version', () => {
        expect(actions.connect('https://a.b.c')).toEqual({type: 'WS_CONNECT', url: 'https://a.b.c', version: 'v1'});
    });

    it('can build action to initiate WS connection with specified protocol version', () => {
        expect(actions.connect('https://a.b.c', 'v2')).toEqual({type: 'WS_CONNECT', url: 'https://a.b.c', version: 'v2'});
    });

    it('can build action to trigger WS disconnection', () => {
        expect(actions.disconnect()).toEqual({type: 'WS_DISCONNECT'});
    });

    it('can build action to notify about WS disconnection', () => {
        expect(actions.disconnected()).toEqual({type: 'WS_DISCONNECTED'});
    });

    it('can build action to handle WS data message', () => {
        let payload = {data: {a: 1, b: 3, c: ['a', 'b']}};
        expect(actions.handleMessage(payload)).toEqual({type: 'WS_DATA_RECEIVED', payload});
    });
});
