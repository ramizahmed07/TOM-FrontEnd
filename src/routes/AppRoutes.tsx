import React, { Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "../styles/index.less";
import Layout from "@components/Layout";
import TableTest from "@/modules/admin/pages/TableTest";
import RoutePaths from "./RoutePaths";

const Login = React.lazy(() => import("@/modules/admin/pages/Auth/Login"));
const ForgotPassword = React.lazy(
  () => import("@/modules/admin/pages/Auth/ForgotPassword")
);
const ResetPassword = React.lazy(
  () => import("@/modules/admin/pages/Auth/ResetPassword")
);

const AppRoutes = () => {
  return (
    <Suspense fallback={"Loading ..."}>
      <Router>
        <Switch>
          <Route path={RoutePaths.Auth.login} component={Login} />
          <Route
            path={RoutePaths.Auth.forgotPassword}
            component={ForgotPassword}
          />
          <Route
            path={RoutePaths.Auth.resetPassword}
            component={ResetPassword}
          />
          <Route path={RoutePaths.Home.dashboard}>
            <Layout>
              <TableTest />
            </Layout>
          </Route>
        </Switch>
      </Router>
    </Suspense>
  );
};

export default AppRoutes;
