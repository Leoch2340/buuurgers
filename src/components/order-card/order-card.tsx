import { FC, memo, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import { OrderCardProps } from './type';
import { TIngredient } from '@utils-types';
import { OrderCardUI } from '../ui/order-card';
import { useSelector } from '../../services/store';
import { selectIngredients } from '../../slices/stellar-burger-slice';

const INGREDIENT_DISPLAY_LIMIT = 6; // максимальное число ингредиентов для показа

export const OrderCard: FC<OrderCardProps> = memo(({ order }) => {
  const location = useLocation();
  const fullIngredientList = useSelector(selectIngredients);

  const preparedData = useMemo(() => {
    if (fullIngredientList.length === 0) return null;

    const matchedIngredients = order.ingredients.reduce<TIngredient[]>(
      (acc, id) => {
        const found = fullIngredientList.find((el) => el._id === id);
        return found ? [...acc, found] : acc;
      },
      []
    );

    const priceSum = matchedIngredients.reduce(
      (sum, item) => sum + item.price,
      0
    );

    const displayed = matchedIngredients.slice(0, INGREDIENT_DISPLAY_LIMIT);
    const hiddenCount =
      matchedIngredients.length > INGREDIENT_DISPLAY_LIMIT
        ? matchedIngredients.length - INGREDIENT_DISPLAY_LIMIT
        : 0;

    return {
      ...order,
      ingredientsInfo: matchedIngredients,
      ingredientsToShow: displayed,
      remains: hiddenCount,
      total: priceSum,
      date: new Date(order.createdAt)
    };
  }, [order, fullIngredientList]);

  if (!preparedData) return null;

  return (
    <OrderCardUI
      orderInfo={preparedData}
      maxIngredients={INGREDIENT_DISPLAY_LIMIT}
      locationState={{ background: location }}
    />
  );
});
