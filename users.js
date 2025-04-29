const redux = require("redux");
const logger = require("redux-logger").createLogger();
const thunkMiddleware = require("redux-thunk").thunk;
const axios = require("axios");

const createStore = redux.createStore;

const bindActionCreators = redux.bindActionCreators;
const applyMiddleware = redux.applyMiddleware;

const { produce } = require("immer");

const initialState = {
    loading: false,
    users: [],
    error: "",
};

//fetch list of users
const FETCH_USERS_REQUESTED = "FETCH_USERS_REQUESTED";
//fetched data successfully
const FETCH_USERS_SUCCEEDED = "FETCH_USERS_SUCCEEDED";
//error while fetching data
const FETCH_USERS_FAILED = "FETCH_USERS_FAILED";

const fetchUsersRequest = () => {
    return {
        type: FETCH_USERS_REQUESTED,
    };
};

const fetchUsersSuccess = (users) => {
    return {
        type: FETCH_USERS_SUCCEEDED,
        payload: users,
    };
};

const fetchUsersFailure = (err) => {
    return {
        type: FETCH_USERS_FAILED,
        payload: err,
    };
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USERS_FAILED:
            return produce(state, (draft) => {
                draft.loading = false;
                draft.users = [];
                draft.error = action.payload;
            });
        case FETCH_USERS_SUCCEEDED:
            return produce(state, (draft) => {
                draft.loading = false;
                draft.error = "";
                draft.users = action.payload;
            });

        case FETCH_USERS_REQUESTED:
            return produce(state, (draft) => {
                draft.loading = true;
            });

        default:
            return state;
    }
};

const fetchUsers = () => {
    //thunk middleware allows action creator to return a funnction instead of an action object
    //the function can perform side effects such as async tasks and also dispatch regular actions
    return function (dispatch) {
        dispatch(fetchUsersRequest());
        axios
            .get("https://jsonplaceholder.typicode.com/users")
            .then((res) => {
                dispatch(fetchUsersSuccess(res.data));
            })
            .catch((err) => {
                console.error(err.message);
                dispatch(fetchUsersFailure(err.message));
            });
    };
};

const store = createStore(
    usersReducer,
    applyMiddleware(logger, thunkMiddleware)
);
const actions = bindActionCreators(
    { fetchUsersFailure, fetchUsersSuccess, fetchUsersRequest },
    store.dispatch
);

store.dispatch(fetchUsers());
