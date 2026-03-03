import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type User = {
  id?: string;
  username: string;
  avatarUrl?: string;
};

export type AuthState = {
  user: User | null;
  isHydrating: boolean;
};

const initialState: AuthState = {
  user: null,
  isHydrating: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    clearUser(state) {
      state.user = null;
    },
    setHydrating(state, action: PayloadAction<boolean>) {
      state.isHydrating = action.payload;
    },
  },
});

export const { setUser, clearUser, setHydrating } = authSlice.actions;
export default authSlice.reducer;
