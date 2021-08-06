import React, { Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "../styles/index.less";
import Layout from "@components/Layout";
import TableTest from "@pages/admin/TableTest";
import RoutePaths from "./RoutePaths";
import GradeMapTable from "@pages/admin/GradeMapTable";
import AddGradeCompany from "@pages/admin/GradeMapTable/AddGradeCompany";

const Login = React.lazy(() => import("@pages/admin/Auth/Login"));
const ForgotPassword = React.lazy(
  () => import("@pages/admin/Auth/ForgotPassword")
);
const ResetPassword = React.lazy(
  () => import("@pages/admin/Auth/ResetPassword")
);
const CompanyList = React.lazy(
  () => import("@pages/admin/User/Companies/CompanyList")
);
const CompanyCreate = React.lazy(
  () => import("@pages/admin/User/Companies/CompanyCreate")
);
const CompanyProfile = React.lazy(
  () => import("@pages/admin/User/Companies/CompanyProfile")
);

const AppRoutes = () => {
  return (
    <Suspense fallback={"Loading..."}>
      <Router>
        <Switch>
          <Route path={RoutePaths.Auth.login}>
            <Login />
          </Route>
          <Route path={RoutePaths.Auth.forgotPassword}>
            <ForgotPassword />
          </Route>
          <Route path={RoutePaths.Auth.resetPassword}>
            <ResetPassword />
          </Route>
          <Route path={RoutePaths.User.companyListing}>
            <CompanyList />
          </Route>
          <Route path={RoutePaths.User.companyCreate}>
            <CompanyCreate />
          </Route>
          <Route path={RoutePaths.User.companyProfile}>
            <CompanyProfile />
          </Route>
          <Route path={RoutePaths.Home.dashboard}>
            <Layout>
              {/* <TableTest /> */}
              <Route exact path="/grade-map-table">
                <GradeMapTable />
              </Route>
              <Route exact path="/grade-map-table/create-grade-company">
                <AddGradeCompany />
              </Route>
            </Layout>
          </Route>
        </Switch>
      </Router>
    </Suspense>
  );
};

export default AppRoutes;
