import { useEffect, useState } from "react";
import { Route, Switch, useHistory, useLocation } from "react-router";

import "./settings.less";
// import Sectors from "@/modules/admin/pages/Sectors";
// import Industry from "@/modules/admin/pages/Sectors/Industry";
// import JobFunction from "@/components/JobFunction";
// import GradeMapTable from "@/components/GradeMapTable";
// import AddGradeCompany from "@/components/GradeMapTable/AddGradeCompany";

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
      Hello
      {/* <Switch>
        <Route exact path="/settings/sectors">
          <Sectors isVisible={isSectorModal} setIsVisible={setIsSectorModal} />
        </Route>
        <Route exact path="/settings/sectors/:sector_id">
          <Industry
            isVisible={isIndustryModal}
            setIsVisible={setIsIndustryModal}
          />
        </Route>
        <Route exact path="/settings/job-function">
          <JobFunction />
        </Route>
        <Route exact path="/settings/grade-map-table">
          <GradeMapTable />
        </Route>
        <Route exact path="/settings/grade-map-table/add-grade-company">
          <AddGradeCompany />
        </Route>
      </Switch> */}
    </div>
  );
};

export default Settings;
