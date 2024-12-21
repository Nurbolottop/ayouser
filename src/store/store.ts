import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
    reducer: {}, // Здесь добавляются редьюсеры
});

// Типы для RootState и AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
