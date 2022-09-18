import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAuth } from '../../types/IAuth';

interface AuthState {
    auth: IAuth,
}

const initialState: AuthState = {
  auth: {
    token: '',
    isAuth: false,
  },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authorise(state, action: PayloadAction<string>) {
      state.auth.token = action.payload;
      state.auth.isAuth = true;
    },
    unAuthorise(state) {
      state.auth.token = '';
      state.auth.isAuth = false;
    },
  },
});

export default authSlice.reducer;
