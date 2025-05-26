import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { Preloader } from '../../components/ui/preloader';
import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';

import {
  fetchIngredients,
  fetchUserOrders,
  removeUserOrders,
  selectUserOrders
} from '../../slices/stellar-burger-slice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const initData = async () => {
      dispatch(removeUserOrders());
      await Promise.all([
        dispatch(fetchIngredients()),
        dispatch(fetchUserOrders())
      ]);
    };
    initData();
  }, [dispatch]);

  const orders: TOrder[] | null = useSelector(selectUserOrders);

  if (!orders) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={orders} />;
};
