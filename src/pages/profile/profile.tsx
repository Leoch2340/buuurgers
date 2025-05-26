// Импортируем UI-компонент для отображения профиля
import { ProfileUI } from '@ui-pages';

// Импортируем необходимые хуки и типы из React
import { FC, SyntheticEvent, useEffect, useState } from 'react';

// Импортируем useDispatch и useSelector из нашего Redux store
import { useDispatch, useSelector } from '../../services/store';

// Импортируем действия и селекторы из слайса
import {
  fetchUpdateUser, // асинхронный action для обновления данных пользователя
  selectLoading, // селектор состояния загрузки
  selectUser // селектор текущего пользователя
} from '../../slices/stellar-burger-slice';

// Импортируем компонент прелоадера, отображаемый при загрузке
import { Preloader } from '../../components/ui/preloader';

// Компонент отвечает за отображение и редактирование профиля пользователя
export const Profile: FC = () => {
  const dispatch = useDispatch();

  // Получаем данные пользователя из хранилища
  const user = useSelector(selectUser);

  // Получаем флаг загрузки, чтобы отображать спиннер при обновлении
  const isLoading = useSelector(selectLoading);

  // Локальное состояние формы редактирования профиля
  const [formValue, setFormValue] = useState({
    name: user.name, // текущее имя пользователя
    email: user.email, // текущий email пользователя
    password: '' // поле для нового пароля (всегда начинается пустым)
  });

  // Синхронизируем состояние формы с обновлёнными данными пользователя из стора
  useEffect(() => {
    setFormValue((prevState) => ({
      ...prevState, // сохраняем текущие значения (например, пароль)
      name: user?.name || '', // обновляем имя из store или ставим пустую строку
      email: user?.email || '' // обновляем email или ставим пустую строку
    }));
  }, [user]); // Эффект срабатывает при изменении объекта user

  // Вычисляем, были ли внесены изменения в форму
  const isFormChanged =
    formValue.name !== user?.name || // имя было изменено
    formValue.email !== user?.email || // email был изменён
    !!formValue.password; // введён новый пароль (не пустой)

  // Обработка отправки формы редактирования
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault(); // предотвращаем перезагрузку страницы
    dispatch(fetchUpdateUser(formValue)); // отправляем новые данные пользователя в API
  };

  // Обработка отмены изменений формы
  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    // Возвращаем значения формы к текущим данным пользователя (сброс)
    setFormValue({
      name: user.name,
      email: user.email,
      password: '' // очищаем поле пароля
    });
  };

  // Обработка изменения любого поля формы
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValue((prevState) => ({
      ...prevState, // сохраняем остальные поля формы
      [name]: value // обновляем изменённое поле по имени
    }));
  };

  // Показываем прелоадер, если данные пользователя загружаются
  if (isLoading) {
    return <Preloader />;
  }

  // Рендерим UI-компонент формы профиля с передачей всех обработчиков и данных
  return (
    <ProfileUI
      formValue={formValue} // текущие значения формы
      isFormChanged={isFormChanged} // флаг наличия изменений
      handleCancel={handleCancel} // отмена изменений
      handleSubmit={handleSubmit} // отправка формы
      handleInputChange={handleInputChange} // обновление полей ввода
    />
  );
};
