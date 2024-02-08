import { LockOutlined, MobileOutlined } from '@ant-design/icons';
import {
  LoginFormPage,
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormText,
} from '@ant-design/pro-components';
import { Tabs } from 'antd';
import { useTitle } from '../../hooks';
import { useAuth } from '../../hooks/useAuth';

import styles from './index.module.less';

const Login = () => {
  useTitle('登录');
  const { sendSmsCodeHandler, loginHandler } = useAuth();
  console.log('Login --> ');

  return (
    <div className={styles.container}>
      <LoginFormPage
        initialValues={{
          tel: '15616917255',
          autoLogin: true,
        }}
        backgroundImageUrl="https://gw.alipayobjects.com/zos/rmsportal/FfdJeJRQWjEeGTpqgBKj.png"
        title="水滴培训"
        subTitle="终身学习，水滴石穿"
        onFinish={loginHandler}
      >
        <Tabs centered items={[{ key: 'phone', label: '手机号登录' }]} />
        <ProFormText
          fieldProps={{
            size: 'large',
            prefix: <MobileOutlined className="prefixIcon" />,
          }}
          name="tel"
          placeholder="手机号"
          rules={[
            {
              required: true,
              message: '请输入手机号！',
            },
            {
              pattern: /^1\d{10}$/,
              message: '手机号格式错误！',
            },
          ]}
        />
        <ProFormCaptcha
          fieldProps={{
            size: 'large',
            prefix: <LockOutlined className="prefixIcon" />,
          }}
          captchaProps={{
            size: 'large',
          }}
          placeholder="请输入验证码"
          captchaTextRender={(timing, count) => {
            if (timing) {
              return `${count} ${'获取验证码'}`;
            }
            return '获取验证码';
          }}
          phoneName="tel"
          name="code"
          rules={[
            {
              required: true,
              message: '请输入验证码！',
            },
          ]}
          onGetCaptcha={sendSmsCodeHandler}
        />
        <div
          style={{
            marginBlockEnd: 24,
          }}
        >
          <ProFormCheckbox noStyle name="autoLogin">
            自动登录
          </ProFormCheckbox>
        </div>
      </LoginFormPage>
    </div>
  );
};

export default Login;
