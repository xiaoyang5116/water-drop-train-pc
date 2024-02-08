import { useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { useLocation, useNavigate } from 'react-router-dom';
// import { App } from 'antd';
import { GET_USER } from '../graphql/user';
import { IUser } from '../utils/type';

const defaultUserInfo: IUser = {
  id: '',
  name: '',
  tel: '',
  desc: '',
  avatar: '',
};

export const useUser = () => {
  // const { message } = App.useApp();
  const nav = useNavigate();
  const location = useLocation();
  // const [userInfo, setUserInfo] = useState<IUser>(defaultUserInfo);

  // const [updateUserInfo] = useMutation(UPDATE_USER);

  const {
    loading, refetch, data, error,
  } = useQuery<{ getUserInfo: IUser }>(
    GET_USER,
    {
      onCompleted: (res) => {
        console.log('onCompleted-->');

        if (res.getUserInfo) {
          // setUserInfo(res.getUserInfo);
          if (location.pathname.startsWith('/login')) {
            nav('/');
          }
          return;
        }

        console.log('onCompleted-->getUserInfo');

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

  const userInfo = useMemo(
    () => (data?.getUserInfo ? data?.getUserInfo : defaultUserInfo),
    [data],
  );

  console.log('useUser', userInfo);

  // const updateUserInfoHandler = async (
  //   values: IUser & { avatar: { url: string } },
  // ) => {
  //   // const preUserInfo = { ...userInfo };
  //   // setUserInfo({ ...preUserInfo, ...values });
  //   const res = await updateUserInfo({
  //     variables: {
  //       // id: userInfo.id,
  //       params: {
  //         name: values.name,
  //         desc: values.desc,
  //         avatar: values.avatar?.url || '',
  //       },
  //     },
  //   });

  //   if (res.data.updateUserInfo.code === 200) {
  //     message.success('更新成功');
  //     // refetch();
  //     // userInfo.refetchHandler();
  //     return;
  //   }
  //   // setUserInfo(preUserInfo);
  //   message.error(res.data.updateUserInfo.message);
  // };

  return {
    loading,
    error,
    userInfo,
    refetch,
  };
};
