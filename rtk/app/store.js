const configureStore = require("@reduxjs/toolkit").configureStore;
const logger = require("redux-logger");
const createLogger = logger.createLogger();

const cakeReducer = require("../features/cake/cakeSlice");
const icecreamReducer = require("../features/icecream/icecreamSlice");
const userReducer = require("../features/user/userSlice");

const store = configureStore({
    reducer: {
        cake: cakeReducer,
        icecream: icecreamReducer,
        users: userReducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(createLogger);
    },
});

module.exports = store;
