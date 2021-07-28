import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./styles/index.less";
import Layout from "@components/Layout";
import Login from "@/modules/admin/pages/Auth/Login";
import Sectors from "@/modules/admin/pages/Sectors";
import Industry from "./modules/admin/pages/Sectors/Industry";
import JobFunction from "./modules/admin/pages/JobFunction";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Layout>
          <Route exact path="/">
            <div>Home</div>
          </Route>
          <Route exact path="/sectors">
            <Sectors />
          </Route>
          <Route exact path="/sectors/:id">
            <Industry />
          </Route>
          <Route exact path="/job-function">
            <JobFunction />
          </Route>
        </Layout>
      </Switch>
    </Router>
  );
}

export default App;
