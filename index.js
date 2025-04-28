const redux = require("redux");

const createStore = redux.createStore;

const bindActionCreators = redux.bindActionCreators;

const CAKE_ORDERED = "CAKE_ORDERED";

const CAKE_RESTOCKED = "CAKE_RESTOCKED";

const ICECREAM_ORDERED = "ICECREAM_ORDERED";

const ICECREAM_RESTOCKED = "ICECREAM_RESTOCKED";

//defining action creator

function orderCake(qty=1) {
    //action object
    return {
        type: CAKE_ORDERED,
        payload: qty,
    };
}

//reducer: (prevState, action) => newState

function restockCake(qty=1) {
    return {
        type: CAKE_RESTOCKED,
        payload: qty,
    };
}

function orderIcecream(qty=1) {
    return {
        type: ICECREAM_ORDERED,
        payload: qty,
    };
}

function restockIcecream(qty=1) {
    return {
        type: ICECREAM_RESTOCKED,
        payload: qty,
    };
}

const initialState = {
    numOfCakes: 10,
    numOfIcecreams: 10,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case CAKE_ORDERED:
            return { ...state, numOfCakes: state.numOfCakes - action.payload };
        case CAKE_RESTOCKED:
            return { ...state, numOfCakes: state.numOfCakes + action.payload };
        case ICECREAM_ORDERED:
            return {
                ...state,
                numOfIcecreams: state.numOfIcecreams - action.payload,
            };
        case ICECREAM_RESTOCKED:
            return {
                ...state,
                numOfIcecreams: state.numOfIcecreams + action.payload,
            };
        default:
            return state;
    }
};

const store = createStore(reducer);

// console.log(store.getState());

const unsubscribe = store.subscribe(() =>
    console.log("updated state: ", store.getState())
);

// store.dispatch(orderCake(3));
// store.dispatch(orderCake(1));
// store.dispatch(restockCake(5));
// unsubscribe();
// store.dispatch(orderCake(1));
// console.log(store.getState());

//bindActionCreators are helper functions that allow us to call action creators directly without manually dispatching them

const actions = bindActionCreators(
    { orderCake, restockCake, orderIcecream, restockIcecream },
    store.dispatch
);
actions.orderCake(1);
actions.restockCake(5);
actions.restockIcecream(10);
actions.orderCake(1);
actions.orderIcecream(2);
