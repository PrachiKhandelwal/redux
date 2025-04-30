const createSlice = require("@reduxjs/toolkit").createSlice;

const initialState = {
    numOfCakes: 10,
};

//createSlice automatically generates the action creators with the same names as the reducer function that we write, it also generates reducer for  us
const cakeSlice = createSlice({
    //name for the slice
    name: "cake",
    initialState: initialState,
    reducers: {
        ordered: (state) => {
            //we can directly mutate the state since createSlice uses immer library under the hood
            state.numOfCakes--;
        },
        restocked: (state, action) => {
            const amount = action.payload ?? 1;
            state.numOfCakes = state.numOfCakes + amount;
        },
    },
});

module.exports = cakeSlice.reducer;
module.exports.cakeActions = cakeSlice.actions;
