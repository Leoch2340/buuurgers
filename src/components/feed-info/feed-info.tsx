import { FC } from 'react';

import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';
import { useSelector } from '../../services/store';
import {
  selectOrders,
  selectTodayOrders,
  selectTotalOrders
} from '../../slices/stellar-burger-slice';

// Возвращает первые 20 номеров заказов с указанным статусом
const extractOrderNumbersByStatus = (
  orderList: TOrder[],
  targetStatus: string
): number[] =>
  orderList
    .filter((order) => order.status === targetStatus)
    .map((order) => order.number)
    .slice(0, 20);

// Компонент отображает информацию о заказах: готовые и ожидающие
export const FeedInfo: FC = () => {
  const orderData = useSelector(selectOrders);
  const totalCount = useSelector(selectTotalOrders);
  const todayCount = useSelector(selectTodayOrders);

  const summary = { total: totalCount, totalToday: todayCount };

  const ready = extractOrderNumbersByStatus(orderData, 'done');
  const pending = extractOrderNumbersByStatus(orderData, 'pending');

  return (
    <FeedInfoUI readyOrders={ready} pendingOrders={pending} feed={summary} />
  );
};
