const actionMakers = {
    dataReceived: (payload) => { return { type: WS_DATA_RECEIVED, payload } }
};

//----------
// PUBLIC
//----------
export const WS_DATA_RECEIVED = 'WS_DATA_RECEIVED';

export default actionMakers;
