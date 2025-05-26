import { FC, useMemo } from 'react';
import { useParams, redirect } from 'react-router-dom';

import { useSelector } from '../../services/store';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';

import { TIngredient } from '@utils-types';
import {
  selectIngredients,
  selectOrders
} from '../../slices/stellar-burger-slice';

// Компонент, отвечающий за отображение подробной информации о заказе
export const OrderInfo: FC = () => {
  const { number } = useParams<{ number: string }>();

  // Если номер заказа отсутствует в параметрах URL — перенаправляем на ленту
  if (!number) {
    redirect('/feed');
    return null;
  }

  const allOrders = useSelector(selectOrders);
  const ingredientList: TIngredient[] = useSelector(selectIngredients);

  const targetOrder = allOrders.find(
    (order) => order.number === parseInt(number)
  );

  const preparedOrder = useMemo(() => {
    if (!targetOrder || !ingredientList.length) return null;

    const orderDate = new Date(targetOrder.createdAt);

    type TIngredientDetailsMap = {
      [id: string]: TIngredient & { count: number };
    };

    const detailedIngredients = targetOrder.ingredients.reduce(
      (acc: TIngredientDetailsMap, id: string) => {
        if (!acc[id]) {
          const found = ingredientList.find((el) => el._id === id);
          if (found) {
            acc[id] = { ...found, count: 1 };
          }
        } else {
          acc[id].count += 1;
        }
        return acc;
      },
      {}
    );

    const totalPrice = Object.values(detailedIngredients).reduce(
      (sum, item) => sum + item.price * item.count,
      0
    );

    return {
      ...targetOrder,
      ingredientsInfo: detailedIngredients,
      date: orderDate,
      total: totalPrice
    };
  }, [targetOrder, ingredientList]);

  if (!preparedOrder) return <Preloader />;

  return <OrderInfoUI orderInfo={preparedOrder} />;
};
