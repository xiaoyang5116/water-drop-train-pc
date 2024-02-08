import { ReactNode } from 'react';
import { HomeOutlined } from '@ant-design/icons';

interface IRouteConfig {
  path: string;
  name: string;
  index?: boolean;
  hideInMenu?: boolean;
  icon?: ReactNode;
}

export const ROUTER_KEY = {
  HOME: 'home',
  MY: 'my',
  PAGE_404: '404',
};

export const ROUTE_CONFIG: Record<string, IRouteConfig> = {
  [ROUTER_KEY.HOME]: {
    path: 'home',
    name: '首页',
    icon: <HomeOutlined />,
  },
  [ROUTER_KEY.MY]: {
    path: 'my',
    name: '个人信息',
    icon: <HomeOutlined />,
  },
  [ROUTER_KEY.PAGE_404]: {
    path: '*',
    name: '404',
    hideInMenu: true,
  },
};

export const routes = Object.keys(ROUTE_CONFIG).map((item) => ({
  ...ROUTE_CONFIG[item],
  key: item,
}));

export const getRouteByKey = (key: string) => ROUTE_CONFIG[key];
