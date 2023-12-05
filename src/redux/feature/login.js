import { createSlice } from '@reduxjs/toolkit';

export const LoginSlice = createSlice({
    name: 'Login',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState: {
        value: 0
    },
    reducers: {
        setLogin: (state) => {
            state.value = 1;
        },
        setLogout: (state) => {
            state.value = 0;
        },
    },
});

export const { setLogin, setLogout } = LoginSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectLogin = (state) => state.loginState.login;

export default LoginSlice.reducer;