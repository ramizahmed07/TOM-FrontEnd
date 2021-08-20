import { BrowserRouter as Router } from "react-router-dom";

import "./styles/index.less";
import { routeConfig, Routes } from "@router";
import Layout from "@components/Layout";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchCountries } from "./services";
import { useTypedSelector } from "./hooks";

const App = () => {
  const dispatch = useDispatch();
  const { countries } = useTypedSelector(state => state.countries);

  useEffect(() => {
    if (!countries.length) {
      dispatch(fetchCountries());
    }
  }, [dispatch, countries]);

  return (
    <Router>
      <Layout>
        <Routes routes={routeConfig} />
      </Layout>
    </Router>
  );
};

export default App;
