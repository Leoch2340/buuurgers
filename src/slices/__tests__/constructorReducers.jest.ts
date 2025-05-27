//Тесты для работы с конструктором бургера

import { expect, test, describe } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import stellarBurgerSlice, {
  addIngredient,
  deleteIngredient,
  moveIngredientDown,
  moveIngredientUp,
  selectConstructorItems
} from '../stellar-burger-slice';
import { mockBun, mockIngredient, mockStore } from '../mockData';

const adaptIngredient = (ingredient: typeof mockIngredient) => ({
  ...ingredient,
  id: ingredient._id || ingredient._id
});

function initStore() {
  return configureStore({
    reducer: { stellarBurger: stellarBurgerSlice },
    preloadedState: { stellarBurger: mockStore }
  });
}

describe('Тесты редьюсеров конструктора бургера', () => {
  test('Удаление ингредиента из конструктора', () => {
    const store = initStore();
    const initialState = selectConstructorItems(store.getState());
    const initialCount = initialState.ingredients.length;

    const ingredientToDelete = initialState.ingredients[0];
    store.dispatch(deleteIngredient(ingredientToDelete));

    const newState = selectConstructorItems(store.getState());
    expect(newState.ingredients.length).toBe(initialCount - 1);
  });

  test('Добавление ингредиента в конструктор', () => {
    const store = initStore();
    const initialState = selectConstructorItems(store.getState());
    const initialIngredientCount = initialState.ingredients.length;

    store.dispatch(addIngredient(adaptIngredient(mockIngredient)));
    store.dispatch(addIngredient(adaptIngredient(mockBun)));

    const newState = selectConstructorItems(store.getState());
    expect(newState.ingredients.length).toEqual(initialIngredientCount + 1);
    expect(newState.bun?.name).toEqual(mockBun.name);
  });

  test('Перемещение ингредиента вверх', () => {
    const store = initStore();
    const ingredients = selectConstructorItems(store.getState()).ingredients;
    const lastIngredient = ingredients[ingredients.length - 1];

    store.dispatch(moveIngredientUp(lastIngredient));

    const newIngredients = selectConstructorItems(store.getState()).ingredients;
    expect(newIngredients[newIngredients.length - 2].id).toEqual(
      lastIngredient.id
    );
  });

  test('Перемещение ингредиента вниз', () => {
    const store = initStore();
    const ingredients = selectConstructorItems(store.getState()).ingredients;
    const firstIngredient = ingredients[0];

    store.dispatch(moveIngredientDown(firstIngredient));

    const newIngredients = selectConstructorItems(store.getState()).ingredients;
    expect(newIngredients[1].id).toEqual(firstIngredient.id);
  });
});
