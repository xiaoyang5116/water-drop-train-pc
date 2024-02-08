import {
  PropsWithChildren,
  createContext,
  useCallback,
  // useContext,
  useMemo,
  useState,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { IUser } from '../utils/type';
import { GET_USER } from '../graphql/user';

const defaultValue: IUser = {
  id: '',
  tel: '',
  name: '',
  desc: '',
  avatar: '',
};

const UserInfoContext = createContext<{
  userInfo: IUser;
  updateUserInfo:(user: Partial<IUser>) => void;
}>({ userInfo: defaultValue, updateUserInfo: () => {} });

export const UserInfoProvider = ({ children }: PropsWithChildren) => {
  const [userInfo, setUserInfo] = useState(defaultValue);

  console.log('UserInfoProvider', userInfo);

  const updateUserInfo = useCallback(
    (user: Partial<IUser>) => {
      setUserInfo({
        ...userInfo,
        ...user,
      });
    },
    [userInfo],
  );

  const value = useMemo(
    () => ({
      userInfo,
      updateUserInfo,
    }),
    [userInfo, updateUserInfo],
  );

  return (
    <UserInfoContext.Provider value={value}>
      {children}
    </UserInfoContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUserInfo = () => {
  // const { userInfo, updateUserInfo } = useContext(UserInfoContext);

  const location = useLocation();
  const nav = useNavigate();

  const { loading, refetch, data } = useQuery<{ getUserInfo: IUser }>(
    GET_USER,
    {
      onCompleted: (res) => {
        console.log('onCompleted-->');

        if (res.getUserInfo) {
          // updateUserInfo(res.getUserInfo);

          if (location.pathname.startsWith('/login')) {
            nav('/');
          }
          return;
        }

        console.log('onCompleted---> getUserInfo');
        if (location.pathname !== '/login') {
          nav(`/login?orgUrl=${location.pathname}`);
        }
      },

      onError: () => {
        console.log('onError-->');

        if (location.pathname !== '/login') {
          nav(`/login?orgUrl=${location.pathname}`);
        }
      },

      notifyOnNetworkStatusChange: true,
    },
  );

  console.log('sss --->');

  const userInfo = data?.getUserInfo || defaultValue;

  return { userInfo, loading, refetch };
};
