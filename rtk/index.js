const store = require("./app/store");
const cakeActions = require("./features/cake/cakeSlice").cakeActions;
const icecreamActions =
    require("./features/icecream/icecreamSlice").icecreamActions;
const fetchUsers = require("./features/user/userSlice").fetchUsers;

const unsubscribe = store.subscribe(() => {
    console.log("new state", store.getState());
});

// store.dispatch(cakeActions.ordered());
// store.dispatch(icecreamActions.restocked(4));
// store.dispatch(icecreamActions.restocked());
store.dispatch(fetchUsers());
// unsubscribe();
