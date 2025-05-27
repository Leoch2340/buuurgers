//Тесты для асинхронных действий пользователя

import stellarBurgerSlice, {
  fetchLoginUser,
  fetchLogout,
  fetchRegisterUser,
  fetchUpdateUser,
  getUserThunk
} from '../stellar-burger-slice';
import { initialState } from '../stellar-burger-types';

describe('Тесты асинхронных действий пользователя', () => {
  describe('getUserThunk', () => {
    test('pending состояние', () => {
      const state = stellarBurgerSlice(initialState, getUserThunk.pending(''));
      expect(state.loading).toBe(true);
    });

    test('fulfilled состояние', () => {
      const mockResponse = {
        success: true,
        user: { name: 'user', email: 'user@mail.ru' }
      };
      const state = stellarBurgerSlice(
        initialState,
        getUserThunk.fulfilled(mockResponse, '')
      );
      expect(state.user).toEqual(mockResponse.user);
    });

    test('rejected состояние', () => {
      const mockAnswer = { name: 'test', message: 'Произошла ошибка' };
      const state = stellarBurgerSlice(
        initialState,
        getUserThunk.rejected(mockAnswer, '')
      );
      expect(state.loading).toBe(false);
      expect(state.isAuthenticated).toBe(false);
      expect(state.user).toEqual({ name: '', email: '' });
    });
  });

  describe('fetchLoginUser', () => {
    test('pending состояние', () => {
      const state = stellarBurgerSlice(
        initialState,
        fetchLoginUser.pending('', { email: 'test@mail.ru', password: 'test' })
      );
      expect(state.loading).toBe(true);
    });

    test('rejected состояние', () => {
      const mockAnswer = { name: 'test', message: 'Произошла ошибка' };
      const state = stellarBurgerSlice(
        initialState,
        fetchLoginUser.rejected(mockAnswer, '', {
          email: 'test@mail.ru',
          password: 'test'
        })
      );
      expect(state.loading).toBe(false);
      expect(state.errorText).toBe('Произошла ошибка');
    });

    test('fulfilled состояние', () => {
      const state = stellarBurgerSlice(
        initialState,
        fetchLoginUser.fulfilled(
          {
            success: true,
            refreshToken: 'testtoken',
            accessToken: 'testaccess',
            user: { name: 'testuser', email: 'testuser@mail.ru' }
          },
          '',
          { password: 'testuser', email: 'testuser@mail.ru' }
        )
      );
      expect(state.loading).toBe(false);
      expect(state.isAuthenticated).toBe(true);
    });
  });

  describe('fetchRegisterUser', () => {
    test('pending состояние', () => {
      const state = stellarBurgerSlice(
        initialState,
        fetchRegisterUser.pending(
          '',
          { name: 'user', email: 'test@mail.ru', password: 'test' },
          ''
        )
      );
      expect(state.loading).toBe(true);
    });

    test('rejected состояние', () => {
      const mockAnswer = { name: 'test', message: 'Произошла ошибка' };
      const state = stellarBurgerSlice(
        initialState,
        fetchRegisterUser.rejected(mockAnswer, '', {
          name: 'user',
          email: 'test@mail.ru',
          password: 'test'
        })
      );
      expect(state.loading).toBe(false);
      expect(state.errorText).toBe('Произошла ошибка');
    });

    test('fulfilled состояние', () => {
      const state = stellarBurgerSlice(
        initialState,
        fetchRegisterUser.fulfilled(
          {
            success: true,
            refreshToken: 'testtoken',
            accessToken: 'testaccess',
            user: { name: 'testuser', email: 'testuser@mail.ru' }
          },
          '',
          { name: 'user', password: 'testuser', email: 'testuser@mail.ru' }
        )
      );
      expect(state.isAuthenticated).toBe(true);
      expect(state.loading).toBe(false);
    });
  });

  describe('fetchLogout', () => {
    test('pending состояние', () => {
      const state = stellarBurgerSlice(initialState, fetchLogout.pending(''));
      expect(state.loading).toBe(true);
    });

    test('rejected состояние', () => {
      const mockError = { name: 'test', message: 'Произошла ошибка' };
      const state = stellarBurgerSlice(
        initialState,
        fetchLogout.rejected(mockError, '')
      );
      expect(state.loading).toBe(false);
    });

    test('fulfilled состояние', () => {
      const mockAnswer = { success: true };
      const state = stellarBurgerSlice(
        initialState,
        fetchLogout.fulfilled(mockAnswer, '')
      );
      expect(state.loading).toBe(false);
      expect(state.user).toEqual({ name: '', email: '' });
      expect(state.isAuthenticated).toBe(false);
    });
  });

  describe('fetchUpdateUser', () => {
    test('pending состояние', () => {
      const state = stellarBurgerSlice(
        initialState,
        fetchUpdateUser.pending('', { name: 'test' })
      );
      expect(state.loading).toBe(true);
    });

    test('rejected состояние', () => {
      const mockError = { name: 'test', message: 'Произошла ошибка' };
      const state = stellarBurgerSlice(
        initialState,
        fetchUpdateUser.rejected(mockError, '', { name: 'test' })
      );
      expect(state.loading).toBe(false);
    });

    test('fulfilled состояние', () => {
      const mockUser = { name: 'testuser', email: 'changedEmail@mail.ru' };
      const mockResponse = { success: true, user: mockUser };
      const state = stellarBurgerSlice(
        initialState,
        fetchUpdateUser.fulfilled(mockResponse, '', mockUser)
      );
      expect(state.loading).toBe(false);
      expect(state.user).toEqual(mockUser);
    });
  });
});
