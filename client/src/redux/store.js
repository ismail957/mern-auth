import {combineReducers, configureStore} from '@reduxjs/toolkit';
import userReducer from './user/userSlice.js';
import {persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducers = combineReducers({user: userReducer});

const persistConfig = {
    key: 'root',
    version: 1,
    storage
}

const persistedReducers = persistReducer(persistConfig, rootReducers)

export const store = configureStore({
    reducer: persistedReducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
});

export const persistor = persistStore(store)