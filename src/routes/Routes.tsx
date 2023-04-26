import { useRoutes, RouteObject } from 'react-router-dom';
import Protected from 'screens/Protected/Protected';
import Dashboard from 'screens/Dashboard/Dashboard';
import User from 'screens/User/User';
import Login from 'screens/Login/Login';
import Register from 'screens/Register/Register';
import Layout from 'components/Layout/Layout';

const Routes = () => {
  const routes: RouteObject[] = [
    {
      path: '/',
      element: (
        <Layout>
          <Protected />
        </Layout>
      ),
      children: [
        {
          path: '/dashboard',
          element: <Dashboard />,
        },
        {
          path: '/settings',
          element: <User />,
        },
        {
          path: '/files',
          element: <User />,
        },
        {
          path: '/calendar',
          element: <User />,
        },
      ],
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/register',
      element: <Register />,
    },
    {
      path: '*',
      element: <div>Page not found</div>,
    },
  ];

  return useRoutes(routes);
};

export default Routes;
