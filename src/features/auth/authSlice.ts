import LocalStorageUtil from "@/lib/localStorage";
import { User } from "@/lib/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface AuthState {
//   user: User | null;
// }

// const initialState: AuthState = { user: null };

const authSlice = createSlice({
  name: "auth",
  initialState: () => {
    const user = LocalStorageUtil.load<User>("user");

    return { user };
  },
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
      LocalStorageUtil.save("user", action.payload);
    },
    clearUser(state) {
      state.user = null;
      LocalStorageUtil.remove("user");
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;

export default authSlice.reducer;
