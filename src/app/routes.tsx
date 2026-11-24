/* eslint-disable react-refresh/only-export-components */
import {
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import { lazy } from "react";
import AppLayout from "../shared/layout/AppLayout";
import ServerError from "../shared/pages/ServerError";

const Login = lazy(() => import("../features/auth/pages/Login"));

const ForgotPassword = lazy(
  () => import("../features/auth/pages/ForgotPassword"),
);

const ResetPassword = lazy(
  () => import("../features/auth/pages/ResetPassword"),
);
const UserDashboard = lazy(
  () => import("../features/end-user/pages/Dashboard"),
);

const Bills = lazy(() => import("../features/end-user/pages/Bills"));

const BillDetails = lazy(
  () => import("../features/end-user/pages/BillDetails"),
);

const MeterData = lazy(() => import("../features/end-user/pages/MeterData"));

const UserAlerts = lazy(() => import("../features/end-user/pages/Alerts"));
const ZoneDashboard = lazy(() => import("../features/zone/pages/Dashboard"));

const ZoneMeters = lazy(() => import("../features/zone/pages/MeterManagement"));

const MeterDetails = lazy(() => import("../features/zone/pages/MeterDetails"));

const ZoneUsers = lazy(() => import("../features/zone/pages/UserManagement"));

const ZoneReports = lazy(() => import("../features/zone/pages/Reports"));

const ZoneAlerts = lazy(() => import("../features/zone/pages/Alerts"));

const ZoneSettings = lazy(() => import("../features/zone/pages/Settings"));
const EnterpriseDashboard = lazy(
  () => import("../features/enterprise/pages/Dashboard"),
);

const EnterpriseZones = lazy(
  () => import("../features/enterprise/pages/ZoneManagement"),
);

const ZoneDetails = lazy(
  () => import("../features/enterprise/pages/ZoneDetails"),
);

const EnterpriseMeters = lazy(
  () => import("../features/enterprise/pages/MeterManagement"),
);

const EnterpriseUsers = lazy(
  () => import("../features/enterprise/pages/UserManagement"),
);

const EnterpriseReports = lazy(
  () => import("../features/enterprise/pages/Reports"),
);

const EnterpriseAlerts = lazy(
  () => import("../features/enterprise/pages/Alerts"),
);

const AuditLogs = lazy(() => import("../features/enterprise/pages/AuditLogs"));

const EnterpriseSettings = lazy(
  () => import("../features/enterprise/pages/Settings"),
);
const Profile = lazy(() => import("../shared/pages/Profile"));

const NotFound = lazy(() => import("../shared/pages/NotFound"));

const Maintenance = lazy(() => import("../shared/pages/Maintenance"));

const AccessDenied = lazy(() => import("../shared/pages/AccessDenied"));

const router = createBrowserRouter([
  {
    errorElement: <ServerError />,

    children: [
      {
        path: "/",
        element: <Navigate to="/login" replace />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/reset-password/:token",
        element: <ResetPassword />,
      },
      {
        path: "/maintenance",
        element: <Maintenance />,
      },
      {
        path: "/access-denied",
        element: <AccessDenied />,
      },

      {
        element: <AppLayout />,

        children: [
          {
            path: "user",
            children: [
              {
                index: true,
                element: <Navigate to="dashboard" replace />,
              },
              {
                path: "dashboard",
                element: <UserDashboard />,
              },
              {
                path: "bills",
                element: <Bills />,
              },
              {
                path: "bills/:billId",
                element: <BillDetails />,
              },
              {
                path: "meter-data",
                element: <MeterData />,
              },
              {
                path: "alerts",
                element: <UserAlerts />,
              },
            ],
          },

          {
            path: "zone",
            children: [
              {
                index: true,
                element: <Navigate to="dashboard" replace />,
              },
              {
                path: "dashboard",
                element: <ZoneDashboard />,
              },
              {
                path: "meters",
                element: <ZoneMeters />,
              },
              {
                path: "meters/:meterId",
                element: <MeterDetails />,
              },
              {
                path: "users",
                element: <ZoneUsers />,
              },
              {
                path: "reports",
                element: <ZoneReports />,
              },
              {
                path: "alerts",
                element: <ZoneAlerts />,
              },
              {
                path: "settings",
                element: <ZoneSettings />,
              },
            ],
          },

          {
            path: "enterprise",
            children: [
              {
                index: true,
                element: <Navigate to="dashboard" replace />,
              },
              {
                path: "dashboard",
                element: <EnterpriseDashboard />,
              },
              {
                path: "zones",
                element: <EnterpriseZones />,
              },
              {
                path: "zones/:zoneId",
                element: <ZoneDetails />,
              },
              {
                path: "meters",
                element: <EnterpriseMeters />,
              },
              {
                path: "users",
                element: <EnterpriseUsers />,
              },
              {
                path: "reports",
                element: <EnterpriseReports />,
              },
              {
                path: "alerts",
                element: <EnterpriseAlerts />,
              },
              {
                path: "audit-logs",
                element: <AuditLogs />,
              },
              {
                path: "settings",
                element: <EnterpriseSettings />,
              },
            ],
          },

          {
            path: "profile",
            element: <Profile />,
          },
        ],
      },

      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;

