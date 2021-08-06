import { FC } from "react";
import { Route, Switch } from "react-router";

import { RouteWithSubRoutes, IRoute } from "@router";

const Routes: FC<{ routes: IRoute[] }> = ({ routes }) => {
  return (
    <Switch>
      {routes.map(route => (
        <RouteWithSubRoutes {...route} />
      ))}

      <Route component={() => <div>Not found</div>} />
    </Switch>
  );
};

export default Routes;
