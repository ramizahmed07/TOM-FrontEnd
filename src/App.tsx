import { BrowserRouter as Router } from "react-router-dom";
import { useEffect } from "react";

import "@styles/index.less";
import { routeConfig, Routes } from "@router";
import Layout from "@components/Layout";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "./hooks";
import { fetchCountries } from "./services";

declare global {
  interface Window {
    less: any;
  }
}

const App = () => {
  const dispatch = useDispatch();
  const { countries } = useTypedSelector(state => state.countries);
  const { user } = useTypedSelector(state => state.auth);

  useEffect(() => {
    if (!countries.length && user?.id) {
      dispatch(fetchCountries());
    }
  }, [dispatch, countries, user]);

  useEffect(() => {
    if (window.location.pathname?.includes("client")) {
      window.less
        .modifyVars({
          "@primary-color": "#b3ff00",
        })
        .then((res: any) => console.log("res", res))
        .catch((err: any) => console.log("err", err));
    }
    console.log(window.location.pathname);
  }, []);

  return (
    <Router>
      <Layout>
        <Routes routes={routeConfig} />
      </Layout>
    </Router>
  );
};

export default App;
