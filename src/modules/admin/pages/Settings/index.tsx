import { useEffect, useState } from "react";
import { Route, Switch, useHistory, useLocation } from "react-router";

import "./settings.less";
import Sectors from "@/components/Sectors";
import Industry from "@/components/Sectors/Industry";

const Settings = () => {
  const location = useLocation();
  const history = useHistory();
  const [isSectorModal, setIsSectorModal] = useState(false);
  const [isIndustryModal, setIsIndustryModal] = useState(false);

  useEffect(() => {
    if (location.pathname === "/settings") {
      history.push("/settings/sectors");
    }
  }, [location, history]);

  return (
    <div>
      <Switch>
        <Route exact path="/settings/sectors">
          <Sectors isVisible={isSectorModal} setIsVisible={setIsSectorModal} />
        </Route>
        <Route exact path="/settings/sectors/:sector_id">
          <Industry
            isVisible={isIndustryModal}
            setIsVisible={setIsIndustryModal}
          />
        </Route>
      </Switch>
    </div>
  );
};

export default Settings;
