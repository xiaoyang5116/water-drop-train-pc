import { ROUTER_KEY } from './menus';
import Home from './Home';
import My from './My';
import Page404 from './Page404';

export const ROUTE_COMPONENT = {
  [ROUTER_KEY.HOME]: <Home />,
  [ROUTER_KEY.MY]: <My />,
  [ROUTER_KEY.PAGE_404]: <Page404 />,
};
