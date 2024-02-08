import { Route, Routes } from 'react-router-dom';
import { Spin } from 'antd';
import Login from './routes/Login';
import Layout from './components/Layout';
import { routes } from './routes/menus';
import { ROUTE_COMPONENT } from './routes';
import { useUserInfo } from './hooks/useUser';

import './App.less';

function App() {
  const { loading } = useUserInfo();

  return (
    <Spin spinning={loading}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          {routes.map((item) => {
            const component = ROUTE_COMPONENT[item.key];
            return (
              <Route key={item.path} path={item.path} element={component} />
            );
          })}
        </Route>
      </Routes>
    </Spin>
  );
}

export default App;
