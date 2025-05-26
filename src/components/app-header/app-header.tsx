import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { selectUser } from '../../slices/stellar-burger-slice';

export const AppHeader: FC = () => {
  const currentUser = useSelector(selectUser);
  return <AppHeaderUI userName={currentUser?.name ?? ''} />;
};
