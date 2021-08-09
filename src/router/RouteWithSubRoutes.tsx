import { useTypedSelector } from "@/hooks";
import { FC } from "react";
import { Redirect, Route } from "react-router-dom";
import { Paths } from ".";

import { IRoute } from "./types";

const RouteWithSubRoutes: FC<IRoute> = route => {
  const { user } = useTypedSelector(state => state.auth);
  const isAuthenticated = user?.id;
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
};

export default RouteWithSubRoutes;
