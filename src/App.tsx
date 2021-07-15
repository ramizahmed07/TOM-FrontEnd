import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./styles/index.less";
import Layout from "@components/Layout";
import Login from "@pages/Login";
import TableTest from "@pages/TableTest";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/">
          <Layout>
            <TableTest />
          </Layout>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
