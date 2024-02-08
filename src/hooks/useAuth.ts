import { useMutation } from '@apollo/client';
import { App } from 'antd';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { LOGIN, SEND_SMS_CODE } from '../graphql/auth';
import { ResultDateType, ResultType } from '../utils/type';
import { AUTH_TOKEN } from '../utils/constants';
import { useUserInfo } from '../context/UserInfo';

interface ILoginFields {
  tel: string;
  code: string;
  autoLogin: boolean;
}

export const useAuth = () => {
  const { message } = App.useApp();
  const [params] = useSearchParams();
  const nav = useNavigate();
  const { refetch } = useUserInfo();

  const [sendSmsCode] = useMutation<{ sendSmsCode: ResultType }>(SEND_SMS_CODE);
  const [login] = useMutation<{ login: ResultDateType<string> }>(LOGIN);

  const sendSmsCodeHandler = async (tel: string) => {
    const res = await sendSmsCode({
      variables: {
        tel,
      },
    });

    if (res.data?.sendSmsCode?.code === 200) {
      message.success(res.data.sendSmsCode.message);
    } else {
      message.error(res.data?.sendSmsCode.message);
    }
  };

  const loginHandler = async (value: ILoginFields) => {
    const res = await login({
      variables: value,
    });

    if (res.data?.login.code === 200) {
      refetch();
      if (value.autoLogin) {
        sessionStorage.setItem(AUTH_TOKEN, '');
        localStorage.setItem(AUTH_TOKEN, res.data.login.data);
      } else {
        sessionStorage.setItem(AUTH_TOKEN, res.data?.login.data);
        localStorage.setItem(AUTH_TOKEN, '');
      }
      message.success(res.data.login.message);
      nav(params.get('orgUrl') || '/');
      return;
    }
    message.error(res.data?.login.message);
  };

  return { sendSmsCodeHandler, loginHandler };
};
