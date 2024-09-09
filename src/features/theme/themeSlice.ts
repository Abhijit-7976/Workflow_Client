import { createSlice } from "@reduxjs/toolkit";

export type ThemeType = "light" | "dark";

const themeSlice = createSlice({
  name: "theme",
  initialState: () => {
    const localTheme = localStorage.getItem("theme") as ThemeType | null;
    if (!localTheme) {
      localStorage.setItem("theme", "light");
    }

    const themeType = localTheme || "light";

    let isDarkMode = false;
    switch (themeType) {
      case "light": {
        isDarkMode = false;
        break;
      }
      case "dark": {
        isDarkMode = true;
        break;
      }
    }

    if (isDarkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");

    return { type: themeType };
  },
  reducers: {
    updateTheme: (state, action) => {
      let isDarkMode = false;
      switch (action.payload) {
        case "light": {
          state.type = "light";
          isDarkMode = false;
          break;
        }
        case "dark": {
          state.type = "dark";
          isDarkMode = true;
          break;
        }
      }

      if (isDarkMode) document.documentElement.classList.add("dark");
      else document.documentElement.classList.remove("dark");

      localStorage.setItem("theme", action.payload);
    },
  },
});

export const { updateTheme } = themeSlice.actions;

export default themeSlice.reducer;
