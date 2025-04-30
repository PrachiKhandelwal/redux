const store = require("./app/store");
const cakeActions = require("./features/cake/cakeSlice").cakeActions;
const icecreamActions = require("./features/icecream/icecreamSlice").icecreamActions;

const unsubscribe = store.subscribe(() => {
    console.log("new state", store.getState());
});

store.dispatch(cakeActions.ordered());
store.dispatch(cakeActions.ordered());
store.dispatch(icecreamActions.restocked(4));
store.dispatch(cakeActions.restocked(10));
store.dispatch(cakeActions.ordered());
store.dispatch(cakeActions.restocked());
store.dispatch(icecreamActions.restocked());
unsubscribe();