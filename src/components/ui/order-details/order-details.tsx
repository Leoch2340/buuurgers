// Импортируем React
import React from 'react';

// Импортируем стили модуля CSS
import styles from './order-details.module.css';

// Импортируем изображение "выполнено"
import doneImg from '../../../images/done.svg';

// Импортируем тип пропсов для компонента
import { OrderDetailsUIProps } from './type';

// Объявляем и экспортируем функциональный компонент с типизацией пропсов
export const OrderDetailsUI: React.FC<OrderDetailsUIProps> = ({
  orderNumber // Получаем номер заказа из пропсов
}) => (
  <>
    {/* Заголовок с номером заказа */}
    <h2
      className={`${styles.title} text text_type_digits-large mt-2 mb-4`} // Стилизация номера
      data-cy={'new_order_number'} // Атрибут для автотестов
    >
      {orderNumber}
    </h2>

    {/* Подпись под номером */}
    <p className='text text_type_main-medium'>идентификатор заказа</p>

    {/* Картинка, подтверждающая создание заказа */}
    <img
      className={styles.img} // Стилизация изображения
      src={doneImg} // Путь к изображению
      alt='изображение статуса заказа.' // Альтернативный текст
    />

    {/* Информационное сообщение */}
    <p className='text text_type_main-default mb-1'>
      Ваш заказ начали готовить
    </p>

    {/* Дополнительный текст */}
    <p className={`${styles.text} text text_type_main-default`}>
      Дождитесь готовности на орбитальной станции
    </p>
  </>
);
