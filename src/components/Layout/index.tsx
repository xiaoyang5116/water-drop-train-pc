import { MenuDataItem, ProLayout } from '@ant-design/pro-components';
import { Link, useNavigate, useOutlet } from 'react-router-dom';
import { Dropdown } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { routes } from '../../routes/menus';
import { AUTH_TOKEN } from '../../utils/constants';
import { useUserStore } from '../../stores/user.store';

const menuItemRender = (item: MenuDataItem, dom: React.ReactNode) => (
  <Link to={item.path || '/'}>{dom}</Link>
);

/**
 * 外层框架
 */
const Layout = () => {
  const outlet = useOutlet();
  const userInfo = useUserStore.use.userInfo();
  const nav = useNavigate();

  return (
    <ProLayout
      title="水滴培训"
      layout="mix"
      avatarProps={{
        src:
          userInfo.avatar
          || 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
        title: userInfo.name,
        size: 'small',
        render: (_, dom: React.ReactNode) => (
          <Dropdown
            menu={{
              items: [
                {
                  key: 'logout',
                  icon: <LogoutOutlined />,
                  label: '退出登录',
                  onClick: () => {
                    sessionStorage.setItem(AUTH_TOKEN, '');
                    localStorage.setItem(AUTH_TOKEN, '');
                    nav('/login');
                  },
                },
              ],
            }}
          >
            {dom}
          </Dropdown>
        ),
      }}
      route={{
        path: '/',
        routes,
      }}
      onMenuHeaderClick={() => nav('/')}
      menuItemRender={menuItemRender}
    >
      {outlet}
    </ProLayout>
  );
};

export default Layout;
