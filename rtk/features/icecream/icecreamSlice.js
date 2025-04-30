const createSlice = require("@reduxjs/toolkit").createSlice;

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
});

module.exports = icecreamSlice.reducer;
module.exports.icecreamActions = icecreamSlice.actions;