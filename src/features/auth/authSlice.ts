import { createSlice } from "@reduxjs/toolkit";
import { login, register, clearError } from "./authActions";


const userToken = localStorage.getItem('userToken')
    ? localStorage.getItem('userToken')
    : null;

const initialState = {
    userInfo: null,
    loading: false,
    error: "",
    success: false,
    userToken,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(register.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(register.fulfilled, (state) => {
            state.loading = false;
            state.success = true;
        });
        builder.addCase(register.rejected, (state, { payload }) => {
            state.loading = false;
            state.error = payload as string;
        });
        builder.addCase(login.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(login.fulfilled, (state) => {
            state.loading = false;
            state.success = true;
        });
        builder.addCase(login.rejected, (state, { payload }) => {
            state.loading = false;
            state.error = payload as string;
        });
        builder.addCase(clearError.fulfilled, (state) => {
            state.error = "";
        });
    },
});

export default authSlice.reducer;