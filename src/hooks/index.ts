import {
  useEffect,
  // useMemo
} from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';

/**
 * 更改网页标题
 * @param title
 */
export const useTitle = (title: string) => {
  useEffect(() => {
    document.title = title;
  }, [title]);
};

/**
 * 通用页面跳转器
 */
// export const useGoTo = () => {
//   const nav = useNavigate();

//   const back = () => nav(-1);

//   const go = (pageKey: string, params?: Record<string, string | number>) => {
//     if (!pageKey) {
//       nav('/');
//       return;
//     }

//     const route = getRouteByKey(pageKey);

//     if (route && route.path) {
//       if (!params) {
//         nav(`/${route.path}`);
//       } else {
//         // /page/:id  params: {id: 1} ==> /page/1
//         const url = route.path.replace(
//           /\/:(\w+)/g,
//           (_, exp1: string) => `/${params[exp1]}`,
//         );

//         nav(`/${url}`);
//       }
//     }
//   };

//   return { back, go };
// };

/**
 * 获取当前 URL 匹配的路由
 */
// export const useMatchedRoute = () => {
//   const location = useLocation();
//   const route = useMemo(
//     () => routes.find((item) => matchPath(item.path, location.pathname)),
//     [location.pathname],
//   );

//   return route;
// };
