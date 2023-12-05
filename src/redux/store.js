import { configureStore } from '@reduxjs/toolkit';

import loginReducer from './feature/login';

const store = configureStore({
    reducer: {
        loginState: loginReducer,
    },
});

export default store;