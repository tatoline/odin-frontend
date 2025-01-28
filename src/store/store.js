import { configureStore } from "@reduxjs/toolkit"
import themeReducer from "./themeSlice"
import storage from "redux-persist/lib/storage"
import { persistReducer, persistStore } from "redux-persist"

// Persist config for the theme slice
const persistConfig = {
    key: "theme",
    storage,
    whitelist: ["isDarkMode"]
}

const persistedThemeReducer = persistReducer(persistConfig, themeReducer)

const store = configureStore({
    reducer: {
        theme: persistedThemeReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"] // Ignore redux-persist actions
            }
          })
})

export const persistor = persistStore(store) // Create persistor
export default store;
