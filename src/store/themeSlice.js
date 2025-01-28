import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isDarkMode: localStorage.getItem("theme") === "dark" || true, // Load theme from localStorage
}

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.isDarkMode = !state.isDarkMode;
        },
    },
})

export const { toggleTheme } = themeSlice.actions
export default themeSlice.reducer
