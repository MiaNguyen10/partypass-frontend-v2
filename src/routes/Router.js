import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

import Loadable from '../layouts/full/shared/loadable/Loadable';
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
const InstitutionDetail2 = Loadable(lazy(() => import('../views/institution/InstitutionDetail2')));
const InstitutionEdit = Loadable(lazy(() => import('../views/institution/InstitutionEdit')));
const InstitutionEdit2 = Loadable(lazy(() => import('../views/institution/InstitutionEdit2')));
const InstitutionCreate = Loadable(lazy(() => import('../views/institution/InstitutionCreate')));
const LockerListForInstitution = Loadable(lazy(() => import('../views/institution/LockerListForInstitution')));

//ticket
const TicketList = Loadable(lazy(() => import('../views/ticket/SystemAdmin/TicketList')));
const TicketDetail = Loadable(lazy(() => import('../views/ticket/SystemAdmin/TicketDetail')));
const TicketEdit = Loadable(lazy(() => import('../views/ticket/SystemAdmin/TicketEdit')));
const TicketCreate = Loadable(lazy(() => import('../views/ticket/SystemAdmin/TicketCreate')));

const InstitutionTicketList = Loadable(
  lazy(() => import('../views/ticket/InstitutionAdmin/InstitutionTicketList')),
);
const InstitutionTicketDetail = Loadable(
  lazy(() => import('../views/ticket/InstitutionAdmin/InstitutionTicketDetail')),
);
const InstitutionTicketEdit = Loadable(
  lazy(() => import('../views/ticket/InstitutionAdmin/InstitutionTicketEdit')),
);
const InstitutionTicketCreate = Loadable(
  lazy(() => import('../views/ticket/InstitutionAdmin/InstitutionTicketCreate')),
);

//locker
const LockerList = Loadable(lazy(() => import('../views/locker/LockerList')));
const LockerDetail = Loadable(lazy(() => import('../views/locker/LockerDetail')));
const LockerEdit = Loadable(lazy(() => import('../views/locker/LockerEdit')));
const LockerCreate = Loadable(lazy(() => import('../views/locker/LockerCreate')));

//purchase
const PurchaseList = Loadable(lazy(() => import('../views/purchase/SystemAdmin/PurchaseList')));
const PurchaseDetail = Loadable(lazy(() => import('../views/purchase/SystemAdmin/PurchaseDetail')));

const InstitutionPurchaseList = Loadable(lazy(() => import('../views/purchase/InstitutionAdmin/InstitutionPurchaseList')));
const InstitutionPurchaseDetail = Loadable(lazy(() => import('../views/purchase/InstitutionAdmin/InstitutionPurchaseDetail')));

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

          //route for both system admin and institution admin   
          { path: '/account-profile', element: <AccountSetting /> },       

          //route for system admin
          {
            element: <ProtectedRouteForRole permissionRoles={[roles[1].id]} />,
            children: [
              //institution
              { path: '/institutions', element: <InstitutionList /> },
              { path: '/institutions/:id', element: <InstitutionDetail /> },
              { path: '/institutions/:id/edit', element: <InstitutionEdit /> },
              { path: '/institutions/create', element: <InstitutionCreate /> },
              { path: '/institutions/:id/lockers', element: <LockerListForInstitution /> },

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

          //route for institution admin
          {
            element: <ProtectedRouteForRole permissionRoles={[roles[2].id]} />,
            children: [
              //institution
              { path: '/institution_detail', element: <InstitutionDetail2 /> },
              { path: '/institution_detail/edit', element: <InstitutionEdit2 /> },

              //ticket
              { path: '/tickets_institution', element: <InstitutionTicketList /> },
              { path: '/tickets_institution/:id', element: <InstitutionTicketDetail /> },
              { path: '/tickets_institution/:id/edit', element: <InstitutionTicketEdit /> },
              { path: '/tickets_institution/create', element: <InstitutionTicketCreate /> },

              //locker
              { path: '/lockers', element: <LockerList /> },
              { path: '/lockers/:id', element: <LockerDetail /> },
              { path: '/lockers/:id/edit', element: <LockerEdit /> },
              { path: '/lockers/create', element: <LockerCreate /> },

              //purchase
              { path: '/purchase_institution', element: <InstitutionPurchaseList /> },
              { path: '/purchase_institution/:id', element: <InstitutionPurchaseDetail /> },
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
