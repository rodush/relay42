const actionsFactory = {
    connect: (url, version = "v1") => { return {type: WS_CONNECT, url, version}},
    disconnect: () => {return {type: WS_DISCONNECT}},
    disconnected: () => { return {type: WS_DISCONNECTED} },
    handleMessage: (payload) => { return { type: WS_DATA_RECEIVED, payload } },
};

//----------
// PUBLIC
//----------
export const WS_DATA_RECEIVED = 'WS_DATA_RECEIVED';
export const WS_CONNECT = 'WS_CONNECT';
export const WS_DISCONNECT = 'WS_DISCONNECT';
export const WS_DISCONNECTED = 'WS_DISCONNECTED';

export default actionsFactory;
