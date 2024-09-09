import authReducer from "@/features/auth/authSlice";
import flowReducer from "@/features/flow/flowSlice";
import themeReducer from "@/features/theme/themeSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: { auth: authReducer, theme: themeReducer, flow: flowReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
