import SomethingWentWrong from "components/feedback/SomethingWentWrong";
import AdminRoute from "components/routes/AdminRoute ";
import AuthenticatedRoute from "components/routes/AuthenticatedRoute";
import NotAuthenticatedRoute from "components/routes/NotAuthenticatedRoute";
import UserRoute from "components/routes/UserRoute";
import { DessertsPage } from "pages/desserts";
import { ForgotPasswordPage } from "pages/forgot-password";
import { LoginPage } from "pages/login";
import OrganizationsPage from "pages/organizations";
import PlansPage from "pages/plans";
import { RegistrationPage } from "pages/registration";
import { ResetPasswordPage } from "pages/reset-password";
import SessionsPage from "pages/sessions";
import { SignupPage } from "pages/signup";
import { SubscriptionOrdersPage } from "pages/subscription-order";
import { lazy } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Outlet,
  Route,
  ScrollRestoration,
  useRouteError,
} from "react-router-dom";
const Layout = lazy(() => import("features/layout"));

export default createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<WithScroll />} errorElement={<ErrorBoundary />}>
      <Route element={<NotAuthenticatedRoute />}>
        <Route path="registration" element={<RegistrationPage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="forgot-password" element={<ForgotPasswordPage />} />
        <Route path="reset-password" element={<ResetPasswordPage />} />
      </Route>
      <Route element={<AuthenticatedRoute />}>
        <Route element={<UserRoute />}>
          <Route index element={<Navigate to="/my-organizations" replace />} />
          <Route path="/my-organizations" element={<Layout />}>
            <Route path="" element={<OrganizationsPage />} />
            <Route path=":id/sessions" element={<SessionsPage />} />
            <Route path=":id/desserts" element={<DessertsPage />} />
            <Route
              path=":id/subscriptions"
              element={<SubscriptionOrdersPage />}
            />
            <Route
              path=":id/subscription-orders"
              element={<SubscriptionOrdersPage />}
            />
            <Route path=":id/statistics" />
          </Route>
          <Route path="/plans" element={<Layout />}>
            <Route path="" element={<PlansPage />} />
          </Route>
        </Route>
        <Route element={<AdminRoute />}>
          <Route index element={<Navigate to="/organizations" replace />} />
          <Route element={<Layout />}>
            <Route path="organizations" />
            <Route
              path="subscription-orders"
              element={<SubscriptionOrdersPage />}
            />
            <Route path="subscriptions" element={<SubscriptionOrdersPage />} />
            <Route path="plans" element={<PlansPage />} />
          </Route>
        </Route>
        <Route path="*" element={<SomethingWentWrong />} />
      </Route>
    </Route>
  ),
  {
    future: {
      v7_relativeSplatPath: true,
    },
  }
);
function ErrorBoundary() {
  const error = useRouteError() as string;
  return <div>{error}</div>;
}
function WithScroll() {
  return (
    <>
      <Outlet />
      <ScrollRestoration
        getKey={({ pathname, search }) => {
          return pathname + search;
        }}
      />
    </>
  );
}
