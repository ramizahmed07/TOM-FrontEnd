import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./styles/index.less";
import Layout from "@components/Layout";
import Login from "@/modules/admin/pages/Auth/Login";
import TableTest from "@/modules/admin/pages/TableTest";

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
