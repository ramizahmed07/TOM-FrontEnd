import { useTypedSelector } from "@/hooks";
import { FC } from "react";
import { Redirect, Route } from "react-router-dom";

import { Paths } from ".";
import { useTypedSelector } from "@hooks";
import { checkPermission } from "@utils";
import { IRoute } from "./types";

const RouteWithSubRoutes: FC<IRoute> = route => {
  const { user } = useTypedSelector(state => state.auth);
  const isAuthenticated = user?.id;

  if (route?.permission && !checkPermission(route?.permission)) {
    const path = localStorage.getItem("prevPath");
    return <Redirect to={path || "/"} />;
  } else {
    localStorage.setItem("prevPath", window.location.pathname);
    return (
      <Route
        path={route.path}
        render={props =>
          route.isPrivate ? (
            isAuthenticated ? (
              <route.component {...props} routes={route.routes} />
            ) : (
              <Redirect to={Paths.Auth.login} />
            )
          ) : (
            <route.component {...props} routes={route.routes} />
          )
        }
      />
    );
  }
};

export default RouteWithSubRoutes;
