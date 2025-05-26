// Импорт функции configureStore для создания Redux-хранилища
import { configureStore } from '@reduxjs/toolkit';

// Импорт типов и хуков из react-redux
import {
  TypedUseSelectorHook, // Типизированный хук useSelector
  useDispatch as dispatchHook, // Переименование useDispatch
  useSelector as selectorHook // Переименование useSelector
} from 'react-redux';

// Импорт слайса состояния приложения
import stellarBurgerSlice from '../slices/stellar-burger-slice';

// Создаём Redux-хранилище
const store = configureStore({
  reducer: {
    // Регистрируем редьюсер слайса stellarBurger
    stellarBurger: stellarBurgerSlice
  },
  // Включаем Redux DevTools, если не в production-среде
  devTools: process.env.NODE_ENV !== 'production'
});

// Типизация: получаем тип корневого состояния хранилища
export type RootState = ReturnType<typeof store.getState>;

// Типизация: получаем тип dispatch-функции
export type AppDispatch = typeof store.dispatch;

// Кастомный useDispatch с типом AppDispatch
export const useDispatch: () => AppDispatch = dispatchHook;

// Кастомный useSelector с типизацией RootState
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

// Экспорт хранилища по умолчанию
export default store;
