import actions, {WS_CONNECT, WS_DISCONNECT} from './actions';

let ws = null;

const onMessage = store => evt => {
    if (!evt.data) {
        return;
    }

    let payload = JSON.parse(evt.data);
    store.dispatch(actions.handleMessage(payload))
};

//------------
// PUBLIC
//------------

export default store => next => action => {
    switch (action.type) {
        case WS_CONNECT:
            if (ws !== null) {
                ws.close();
            }

            ws = new WebSocket(action.url, action.version);

            ws.onerror = ((err) => console.log(err))();
            ws.onopen = ((store) => (evt) => console.log('Hello wizard!'))();
            ws.onmessage = onMessage(store);

            break;
        case WS_DISCONNECT:
            if (ws !== null) {
                ws.close();
            }
            ws = null;

            store.dispatch(action.disconnected());
            break;
        default:
            // Not our business
            next(action);
    }
};