import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import jobSlice from "./jobSlice";
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import compnaySlice from "./compnaySlice";
import applicationSlice from "./applicationSlice";

// Define the root reducer first
const rootReducer = combineReducers({
    auth: authSlice,
    job: jobSlice,
    company:compnaySlice,
    application:applicationSlice
})

// Persist configuration
const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}

// Apply persistReducer to the rootReducer
const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
})

export default store;
