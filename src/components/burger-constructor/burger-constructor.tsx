import { FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { BurgerConstructorUI } from '@ui';
import { TIngredient } from '@utils-types';

import { useDispatch, useSelector } from '../../services/store';
import {
  selectConstructorItems,
  selectOrderRequest,
  selectOrderModalData,
  selectIsAuthenticated,
  fetchNewOrder,
  closeOrderRequest
} from '../../slices/stellar-burger-slice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const constructorItems = useSelector(selectConstructorItems);
  const orderRequest = useSelector(selectOrderRequest);
  const orderModalData = useSelector(selectOrderModalData);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const handleOrder = () => {
    if (!isAuthenticated) {
      navigate('/login', { replace: true });
      return;
    }

    const bunId = constructorItems.bun?._id;
    const fillings = constructorItems.ingredients;

    if (bunId && fillings.length) {
      const ingredientsList = fillings.map((i) => i._id);
      dispatch(fetchNewOrder([bunId, ...ingredientsList, bunId]));
    }
  };

  const handleModalClose = () => {
    dispatch(closeOrderRequest());
  };

  const totalPrice = useMemo(() => {
    const bunTotal = constructorItems.bun ? constructorItems.bun.price * 2 : 0;
    const ingredientsTotal = constructorItems.ingredients.reduce(
      (sum: number, item: TIngredient) => sum + item.price,
      0
    );
    return bunTotal + ingredientsTotal;
  }, [constructorItems]);

  return (
    <BurgerConstructorUI
      price={totalPrice}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={handleOrder}
      closeOrderModal={handleModalClose}
    />
  );
};
