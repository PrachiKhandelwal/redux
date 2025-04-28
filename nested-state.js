const redux = require("redux");

const { produce } = require("immer");

const createStore = redux.createStore;

const bindActionCreators = redux.bindActionCreators;

const STREET_UPDATED = "STREET_UPDATED";

const updateStreet = (newStr) => {
    return {
        type: STREET_UPDATED,
        payload: newStr,
    };
};

const initialState = {
    name: "Prachi",
    address: {
        street: "street 12",
        city: "bangalore",
        state: "karnataka",
    },
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case STREET_UPDATED:
            // return {
            //     ...state,
            //     address: { ...state.address, street: action.payload },
            // };
            return produce(state, (draft) => {
                console.log(draft);
                draft.address.street = action.payload;
            });
        default:
            return state;
    }
};

const store = createStore(userReducer);

const unsubscribe = store.subscribe(() => {
    console.log(store.getState());
});

const actions = bindActionCreators({ updateStreet }, store.dispatch);

actions.updateStreet("street 9");
unsubscribe();
