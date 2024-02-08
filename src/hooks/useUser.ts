import { useQuery } from '@apollo/client';
import { useLocation, useNavigate } from 'react-router-dom';
import { GET_USER } from '../graphql/user';
import { IUser } from '../utils/type';
import { useUserStore } from '../stores/user.store';

export const useUserInfo = () => {
  const setUserInfo = useUserStore.use.setUserInfo();
  const location = useLocation();
  const nav = useNavigate();

  const { loading, refetch } = useQuery<{ getUserInfo: IUser }>(GET_USER, {
    onCompleted: (res) => {
      if (res.getUserInfo) {
        setUserInfo({ ...res.getUserInfo, refetch });

        if (location.pathname.startsWith('/login')) {
          nav('/');
        }
      }
    },

    onError: () => {
      setUserInfo({ refetch });
      if (location.pathname !== '/login') {
        nav(`/login?orgUrl=${location.pathname}`);
      }
    },

    notifyOnNetworkStatusChange: true,
  });

  return { loading };
};
