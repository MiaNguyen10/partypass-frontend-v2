import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

import Loadable from '../layouts/full/shared/loadable/Loadable';
import { element } from 'prop-types';
import { roles } from '../config/Constant';

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));

/* ****Pages***** */
const ModernDash = Loadable(lazy(() => import('../views/dashboard/Modern')));

// Pages
const AccountSetting = Loadable(
  lazy(() => import('../views/pages/account-setting/AccountSetting')),
);

// authentication
const Login = Loadable(lazy(() => import('../views/authentication/auth/Login')));
const Error = Loadable(lazy(() => import('../views/authentication/Error')));
const Maintenance = Loadable(lazy(() => import('../views/authentication/Maintenance')));

//institution
const InstitutionList = Loadable(lazy(() => import('../views/institution/InstitutionList')));
const InstitutionDetail = Loadable(lazy(() => import('../views/institution/InstitutionDetail')));
const InstitutionEdit = Loadable(lazy(() => import('../views/institution/InstitutionEdit')));
const InstitutionCreate = Loadable(lazy(() => import('../views/institution/InstitutionCreate')));

//ticket
const TicketList = Loadable(lazy(() => import('../views/ticket/SystemAdmin/TicketList')));
const TicketDetail = Loadable(lazy(() => import('../views/ticket/SystemAdmin/TicketDetail')));
const TicketEdit = Loadable(lazy(() => import('../views/ticket/SystemAdmin/TicketEdit')));
const TicketCreate = Loadable(lazy(() => import('../views/ticket/SystemAdmin/TicketCreate')));

//purchase
const PurchaseList = Loadable(lazy(() => import('../views/purchase/SystemAdmin/PurchaseList')));
const PurchaseDetail = Loadable(lazy(() => import('../views/purchase/SystemAdmin/PurchaseDetail')));

//user
const UserList = Loadable(lazy(() => import('../views/user/UserList')));
const UserDetail = Loadable(lazy(() => import('../views/user/UserDetail')));
const UserEdit = Loadable(lazy(() => import('../views/user/UserEdit')));
const UserCreate = Loadable(lazy(() => import('../views/user/UserCreate')));

// landingpage
const Landingpage = Loadable(lazy(() => import('../views/pages/landingpage/Landingpage')));

// Protected Route
const ProtectedRoute = Loadable(lazy(() => import('../middlewares/ProtectedRoute')));
const ProtectedRouteForRole = Loadable(lazy(() => import('../middlewares/ProtectedRouteForRole')));

const Router = [
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/',
        element: <FullLayout />,
        children: [
          { path: '/', element: <Navigate to="/dashboards/modern" /> },
          { path: '/dashboards/modern', exact: true, element: <ModernDash /> },
          {
            element: <ProtectedRouteForRole permissionRoles={[roles[1].id]} />,
            children: [
              //institution
              { path: '/institutions', element: <InstitutionList /> },
              { path: '/institutions/:id', element: <InstitutionDetail /> },
              { path: '/institutions/:id/edit', element: <InstitutionEdit /> },
              { path: '/institutions/create', element: <InstitutionCreate /> },

              //ticket
              { path: '/tickets', element: <TicketList /> },
              { path: '/tickets/:id', element: <TicketDetail /> },
              { path: '/tickets/:id/edit', element: <TicketEdit /> },
              { path: '/tickets/create', element: <TicketCreate /> },

              //user
              { path: '/users', element: <UserList /> },
              { path: '/users/:id', element: <UserDetail /> },
              { path: '/users/:id/edit', element: <UserEdit /> },
              { path: '/users/create', element: <UserCreate /> },

              //purchase
              { path: '/purchase', element: <PurchaseList /> },
              { path: '/purchase/:id', element: <PurchaseDetail /> },
            ],
          },

          { path: '*', element: <Navigate to="/auth/404" /> },
        ],
      },
    ],
  },
  {
    path: '/',
    element: <BlankLayout />,
    children: [
      { path: '/auth/404', element: <Error /> },
      { path: '/auth/login', element: <Login /> },
      { path: '/auth/maintenance', element: <Maintenance /> },
      { path: '/landingpage', element: <Landingpage /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
];

export default Router;
