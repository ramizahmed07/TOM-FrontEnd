import { FC } from "react";
import { Route } from "react-router-dom";

import { IRoute } from "./types";

const RouteWithSubRoutes: FC<IRoute> = route => {
  return (
    <Route
      path={route.path}
      render={props => <route.component {...props} routes={route.routes} />}
    />
  );
};

export default RouteWithSubRoutes;
