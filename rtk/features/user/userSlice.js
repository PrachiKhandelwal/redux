const createSlice = require("@reduxjs/toolkit").createSlice;
const createAsyncThunk = require("@reduxjs/toolkit").createAsyncThunk;
const axios = require("axios");

const initialState = {
    loading: false,
    users: [],
    error: "",
};

//createAsyncThink accepts two arguments. First argument is action name. Second argument is a callback function that creates a payload

//createAsyncThunk automatically dispatches life cycle actions based on the  returned promise

//generates pending, fulfilled or rejected action types
const fetchUsers = createAsyncThunk("user/fetchUsers", () => {
    return axios
        .get("https://jsonplaceholder.typicode.com/users")
        .then((res) => res.data);
});

const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.pending, (state, action) => {
            state.loading = true;
        }),
            builder.addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
                state.error = "";
            }),
            builder.addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                users = [];
                state.error = action.error.message;
            });
    },
});


module.exports = userSlice.reducer;
module.exports.fetchUsers = fetchUsers;