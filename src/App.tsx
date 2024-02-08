import { Route, Routes } from 'react-router-dom';
// import { Spin } from 'antd';
import Login from './routes/Login';
import Layout from './components/Layout';
import { routes } from './routes/menus';
import { ROUTE_COMPONENT } from './routes';
// import { useUser } from './hooks/useUser';
import { UserInfoProvider } from './context/UserInfo';

import './App.less';

function App() {
  return (
    <UserInfoProvider>
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
    </UserInfoProvider>
  );
}

export default App;
