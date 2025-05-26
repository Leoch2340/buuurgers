import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages'; // UI-компонент, который отображает ленту заказов.
import {
  fetchFeed,
  fetchIngredients,
  removeOrders,
  selectOrders
} from '../../slices/stellar-burger-slice';
import { TOrder } from '@utils-types';

// Компонент Feed отображает список заказов или прелоадер при отсутствии данных.
export const Feed: FC = () => {
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(selectOrders);

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([dispatch(fetchIngredients()), dispatch(fetchFeed())]);
    };

    fetchData();
  }, [dispatch]);

  const handleRefresh = () => {
    dispatch(fetchFeed());
    dispatch(removeOrders());
  };

  if (orders.length === 0) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleRefresh} />;
};
