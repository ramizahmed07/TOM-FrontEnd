import { BrowserRouter as Router } from "react-router-dom";

import "./styles/index.less";
import { routeConfig, Routes } from "@router";
import Layout from "@components/Layout";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useTypedSelector } from "./hooks";
import { fetchCountries } from "./services";

const App = () => {
  const dispatch = useDispatch();
  const { countries } = useTypedSelector(state => state.countries);
  const { user } = useTypedSelector(state => state.auth);

  useEffect(() => {
    if (!countries.length && user?.id) {
      dispatch(fetchCountries());
    }
  }, [dispatch, countries, user]);

  return (
    <Router>
      <Layout>
        <Routes routes={routeConfig} />
      </Layout>
    </Router>
  );
};

export default App;
