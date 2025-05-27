import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { initialState, TInitialState } from './stellar-burger-types';
import * as actions from './stellar-burger-actions';
import * as selectors from './stellar-burger-selectors';

// Action creator для добавления ингредиента
export const addIngredientAction = (ingredient: TIngredient) => ({
  type: 'stellarBurger/addIngredient',
  payload: {
    ...ingredient,
    id: uuidv4()
  }
});

const stellarBurgerSlice = createSlice({
  name: 'stellarBurger',
  initialState,
  reducers: {
    addIngredient(state, action: PayloadAction<TIngredient & { id: string }>) {
      if (action.payload.type === 'bun') {
        state.constructorItems.bun = action.payload;
      } else {
        state.constructorItems.ingredients.push({
          ...action.payload,
          id: action.payload.id
        });
      }
    },
    closeOrderRequest(state) {
      state.orderRequest = false;
      state.orderModalData = null;
      state.constructorItems = {
        bun: null,
        ingredients: []
      };
    },
    removeOrders(state) {
      state.orders.length = 0;
    },
    removeUserOrders(state) {
      state.userOrders = null;
    },
    init(state) {
      state.isInit = true;
    },
    openModal(state) {
      state.isModalOpened = true;
    },
    closeModal(state) {
      state.isModalOpened = false;
    },
    deleteIngredient(state, action: PayloadAction<TConstructorIngredient>) {
      const ingredientIndex = state.constructorItems.ingredients.findIndex(
        (item) => item.id === action.payload.id
      );
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (_, index) => index !== ingredientIndex
        );
    },
    setErrorText(state, action: PayloadAction<string>) {
      state.errorText = action.payload;
    },
    removeErrorText(state) {
      state.errorText = '';
    },
    moveIngredientUp(state, action: PayloadAction<TConstructorIngredient>) {
      const ingredientIndex = state.constructorItems.ingredients.findIndex(
        (item) => item.id === action.payload.id
      );
      const prevItem = state.constructorItems.ingredients[ingredientIndex - 1];
      state.constructorItems.ingredients.splice(
        ingredientIndex - 1,
        2,
        action.payload,
        prevItem
      );
    },
    moveIngredientDown(state, action: PayloadAction<TConstructorIngredient>) {
      const ingredientIndex = state.constructorItems.ingredients.findIndex(
        (item) => item.id === action.payload.id
      );
      const nextItem = state.constructorItems.ingredients[ingredientIndex + 1];
      state.constructorItems.ingredients.splice(
        ingredientIndex,
        2,
        nextItem,
        action.payload
      );
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(actions.fetchIngredients.pending, (state) => {
        state.loading = true;
      })
      .addCase(actions.fetchIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredients = action.payload;
      })
      .addCase(actions.fetchIngredients.rejected, (state) => {
        state.loading = false;
      })
      .addCase(actions.fetchNewOrder.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(actions.fetchNewOrder.rejected, (state) => {
        state.orderRequest = false;
      })
      .addCase(actions.fetchNewOrder.fulfilled, (state, action) => {
        state.orderModalData = action.payload.order;
        state.orderRequest = false;
      })
      .addCase(actions.fetchLoginUser.pending, (state) => {
        state.loading = true;
        state.errorText = '';
      })
      .addCase(actions.fetchLoginUser.rejected, (state, action) => {
        state.loading = false;
        state.errorText = (action.payload as string) || 'Произошла ошибка';
      })
      .addCase(actions.fetchLoginUser.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.errorText = '';
      })
      .addCase(actions.fetchRegisterUser.pending, (state) => {
        state.loading = true;
        state.errorText = '';
      })
      .addCase(actions.fetchRegisterUser.rejected, (state, action) => {
        state.loading = false;
        state.errorText = (action.payload as string) || 'Произошла ошибка';
      })
      .addCase(actions.fetchRegisterUser.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.errorText = '';
      })
      .addCase(actions.getUserThunk.pending, (state) => {
        state.loading = true;
        state.errorText = '';
      })
      .addCase(actions.getUserThunk.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = { name: '', email: '' };
      })
      .addCase(actions.getUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user.name = action.payload.user.name;
        state.user.email = action.payload.user.email;
        state.isAuthenticated = true;
      })
      .addCase(actions.fetchFeed.pending, (state) => {
        state.loading = true;
      })
      .addCase(actions.fetchFeed.rejected, (state) => {
        state.loading = false;
      })
      .addCase(actions.fetchFeed.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders;
        state.totalOrders = action.payload.total;
        state.ordersToday = action.payload.totalToday;
      })
      .addCase(actions.fetchUserOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(actions.fetchUserOrders.rejected, (state) => {
        state.loading = false;
      })
      .addCase(actions.fetchUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.userOrders = action.payload;
      })
      .addCase(actions.fetchLogout.pending, (state) => {
        state.loading = true;
      })
      .addCase(actions.fetchLogout.rejected, (state) => {
        state.loading = false;
        state.user = { name: '', email: '' };
        state.isAuthenticated = false;
        state.userOrders = null;
      })
      .addCase(actions.fetchLogout.fulfilled, (state) => {
        state.loading = false;
        state.user = { name: '', email: '' };
        state.isAuthenticated = false;
        state.userOrders = null;
        state.constructorItems = { bun: null, ingredients: [] };
        state.orderModalData = null;
        state.orderRequest = false;
      })
      .addCase(actions.fetchUpdateUser.pending, (state) => {
        state.loading = true;
        state.errorText = '';
      })
      .addCase(actions.fetchUpdateUser.rejected, (state, action) => {
        state.loading = false;
        state.errorText = (action.payload as string) || 'Произошла ошибка';
      })
      .addCase(actions.fetchUpdateUser.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.success) {
          state.user.name = action.payload.user.name;
          state.user.email = action.payload.user.email;
        }
      });
  }
});

export const {
  addIngredient,
  closeOrderRequest,
  removeOrders,
  removeUserOrders,
  init,
  openModal,
  closeModal,
  deleteIngredient,
  setErrorText,
  removeErrorText,
  moveIngredientUp,
  moveIngredientDown
} = stellarBurgerSlice.actions;

export {
  selectLoading,
  selectIngredients,
  selectOrderModalData,
  selectConstructorItems,
  selectOrderRequest,
  selectUser,
  selectOrders,
  selectTotalOrders,
  selectTodayOrders,
  selectUserOrders,
  selectIsAuthenticated,
  selectIsInit,
  selectIsModalOpened,
  selectErrorText
} from './stellar-burger-selectors';

export {
  fetchIngredients,
  fetchNewOrder,
  fetchLoginUser,
  fetchRegisterUser,
  getUserThunk,
  fetchFeed,
  fetchUserOrders,
  fetchLogout,
  fetchUpdateUser
} from './stellar-burger-actions';

export default stellarBurgerSlice.reducer;
