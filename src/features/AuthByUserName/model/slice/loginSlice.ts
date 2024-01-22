import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoginSchema } from '@/features/AuthByUserName/types/loginSchema';

const initialState: LoginSchema = {
    username: '',
    password: '',
};

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setUserName: (state, action: PayloadAction<string>) => {
            state.username = action.payload;
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload;
        },
        clear: (state) => {
            state.username = initialState.username;
            state.password = initialState.password;
        },
    },
});

export const { actions: loginActions } = loginSlice;
export const { reducer: loginReducer } = loginSlice;
