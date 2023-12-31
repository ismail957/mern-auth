import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    currentUser: null,
    loading: false,
    error: false,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true;
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload;
            
            console.log(action);
            state.loading = false;
            state.error = false;
        },
        signFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
})

export const {signInStart, signInSuccess, signFailure} = userSlice.actions;

export default userSlice.reducer;