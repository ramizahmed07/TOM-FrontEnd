import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./styles/index.less";
import Login from "@pages/Login";
import Layout from "@components/Layout";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/">
          <Layout />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
