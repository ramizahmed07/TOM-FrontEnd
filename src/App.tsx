import { useEffect } from "react";
import { useDispatch } from "react-redux";

import "@styles/index.less";
import { admin_routeConfig, client_routeConfig, Routes } from "@router";
import { fetchCountries } from "@services";
import Layout from "@components/Layout";
import { useTypedSelector } from "@hooks";
import { adminVars, clientVars } from "./constants";

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
    if (!countries?.length && user?.id) {
      dispatch(fetchCountries());
    }
  }, [dispatch, countries, user]);

  useEffect(() => {
    if (window.location.pathname?.includes("client")) {
      window.less.modifyVars(clientVars);
    } else {
      window.less.modifyVars(adminVars);
    }
  }, []);

  return (
    <Layout>
      <Routes
        routes={
          window.location.pathname?.includes("client")
            ? client_routeConfig
            : admin_routeConfig
        }
      />
    </Layout>
  );
};

export default App;
