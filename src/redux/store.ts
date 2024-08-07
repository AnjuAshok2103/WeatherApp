import {combineReducers, configureStore} from '@reduxjs/toolkit';
import weatherSlice from './features/weather/weatherSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import persistReducer from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/es/persistStore';
import {getDefaultMiddleware} from '@reduxjs/toolkit';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['weather'], // <-- name root state to allow, e.g. state.weather
};

const rootReducer = combineReducers({
  weather: weatherSlice,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
