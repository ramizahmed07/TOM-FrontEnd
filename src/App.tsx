import { BrowserRouter as Router } from "react-router-dom";

import "./styles/index.less";
import { routeConfig, Routes } from "@router";
import Layout from "@components/Layout";

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes routes={routeConfig} />
      </Layout>
    </Router>
  );
};

export default App;
