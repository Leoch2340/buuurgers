// Импортируем React, FC (тип для функционального компонента) и memo (для мемоизации компонента)
import React, { FC, memo } from 'react';

// Импортируем компонент Link для навигации между страницами
import { Link } from 'react-router-dom';

// Импортируем иконку валюты и компонент форматированной даты из сторонней библиотеки
import {
  CurrencyIcon,
  FormattedDate
} from '@zlden/react-developer-burger-ui-components';

// Импортируем CSS-модули (локальные стили)
import styles from './order-card.module.css';

// Импортируем тип пропсов компонента
import { OrderCardUIProps } from './type';

// Импортируем компонент отображения статуса заказа
import { OrderStatus } from '@components';

// Импортируем хук dispatch из Redux
import { useDispatch } from '../../../services/store';

// Импортируем action для открытия модального окна
import { openModal } from '../../../slices/stellar-burger-slice';

// Объявляем и экспортируем компонент OrderCardUI с мемоизацией
export const OrderCardUI: FC<OrderCardUIProps> = memo(
  ({ orderInfo, maxIngredients, locationState }) => {
    // Получаем dispatch-функцию из Redux
    const dispatch = useDispatch();

    // Обработчик клика по карточке — открытие модального окна
    const onClick = () => {
      dispatch(openModal());
    };

    return (
      // Ссылка на страницу заказа с передачей состояния и обработчиком клика
      <Link
        to={orderInfo.number.toString()} // путь на основе номера заказа
        relative='path' // относительная ссылка
        state={locationState} // передаём дополнительное состояние через Link
        className={`p-6 mb-4 mr-2 ${styles.order}`} // классы Tailwind и модуля
        onClick={onClick} // обработчик клика
      >
        {/* Верхняя часть карточки: номер заказа и дата */}
        <div className={styles.order_info}>
          <span className={`text text_type_digits-default ${styles.number}`}>
            #{String(orderInfo.number).padStart(6, '0')}{' '}
            {/* форматирование номера */}
          </span>
          <span className='text text_type_main-default text_color_inactive'>
            <FormattedDate date={orderInfo.date} /> {/* форматированная дата */}
          </span>
        </div>

        {/* Название заказа */}
        <h4 className={`pt-6 text text_type_main-medium ${styles.order_name}`}>
          {orderInfo.name}
        </h4>

        {/* Статус заказа (если доступен) */}
        <OrderStatus status={orderInfo.status} />

        {/* Если пользователь находится на странице заказов профиля — повторный вывод статуса */}
        {location.pathname === '/profile/orders' && (
          <OrderStatus status={orderInfo.status} />
        )}

        {/* Основная часть: ингредиенты и цена */}
        <div className={`pt-6 ${styles.order_content}`}>
          <ul className={styles.ingredients}>
            {orderInfo.ingredientsToShow.map((ingredient, index) => {
              // Вычисляем слои по zIndex и смещение по правому краю
              let zIndex = maxIngredients - index;
              let right = 20 * index;
              return (
                <li
                  className={styles.img_wrap}
                  style={{ zIndex: zIndex, right: right }}
                  key={index}
                >
                  {/* Отображение изображения ингредиента */}
                  <img
                    style={{
                      opacity:
                        orderInfo.remains && maxIngredients === index + 1
                          ? '0.5' // затемнение последнего слоя, если есть скрытые ингредиенты
                          : '1'
                    }}
                    className={styles.img}
                    src={ingredient.image_mobile}
                    alt={ingredient.name}
                  />
                  {/* Отображение количества скрытых ингредиентов */}
                  {maxIngredients === index + 1 ? (
                    <span
                      className={`text text_type_digits-default ${styles.remains}`}
                    >
                      {orderInfo.remains > 0 ? `+${orderInfo.remains}` : null}
                    </span>
                  ) : null}
                </li>
              );
            })}
          </ul>

          {/* Отображение итоговой стоимости */}
          <div>
            <span
              className={`text text_type_digits-default pr-1 ${styles.order_total}`}
            >
              {orderInfo.total}
            </span>
            <CurrencyIcon type='primary' /> {/* иконка валюты */}
          </div>
        </div>
      </Link>
    );
  }
);
