const createSlice = require("@reduxjs/toolkit").createSlice;

const cakeActions = require("../cake/cakeSlice").cakeActions;

const initialState = {
    numOfIcecreams: 10,
};

const icecreamSlice = createSlice({
    name: "icecream",
    initialState: initialState,
    reducers: {
        ordered: (state, action) => {
            const amount = action.payload ?? 1;
            state.numOfIcecreams += amount;
        },
        restocked: (state, action) => {
            const amount = action.payload ?? 1;
            state.numOfIcecreams += amount;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(cakeActions.ordered, (state, action) => {
            state.numOfIcecreams -= 1;
        });
    },
});

module.exports = icecreamSlice.reducer;
module.exports.icecreamActions = icecreamSlice.actions;
