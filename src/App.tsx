import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./styles/index.less";
import Layout from "@components/Layout";
import Login from "@/modules/admin/pages/Auth/Login";
import Settings from "@/modules/admin/pages/Settings";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Layout>
          <Route exact path="/">
            <div>Home</div>
          </Route>
          <Route path="/settings">
            <Settings />
          </Route>
        </Layout>
      </Switch>
    </Router>
  );
}

export default App;
