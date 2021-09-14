import {
  Action,
  combineReducers,
  configureStore,
  ThunkAction,
} from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import {
  authApi,
  businessUnitApi,
  gradeApi,
  sectorsApi,
  jobFunctionApi,
  subJobFunctionApi,
  subAdminApi,
  companiesApi,
  gradeSetupApi,
  salaryRangeApi,
  cashAllowancesApi,
  shortTermIPApi,
} from "@services";
import { authReducer } from "./auth";
import { businessUnitReducer } from "./business-unit";
import { sectorsReducer } from "./sectors";
import { gradeReducer } from "./grade";
import { jobFunctionReducer } from "./job-function";
import { subJobFunctionReducer } from "./sub-job-function";
import { subAdminReducer } from "./sub-admin";
import { companiesReducer } from "./companies";
import { countriesReducer } from "./countries";
import {
  IJobFunctionReducer,
  ISectorsState,
  ISubAdminReducer,
  IAuthState,
  IBusinessUnitState,
  ISubJobFunctionReducer,
} from "@/types";

export interface ICombineReducerProps {
  auth: IAuthState;
  businessUnit: IBusinessUnitState;
  jobFunction: IJobFunctionReducer;
  subJobFunction: ISubJobFunctionReducer;
  subAdmin: ISubAdminReducer;
  sectors: ISectorsState;
}

const appReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [businessUnitApi.reducerPath]: businessUnitApi.reducer,
  [sectorsApi.reducerPath]: sectorsApi.reducer,
  [gradeApi.reducerPath]: gradeApi.reducer,
  [jobFunctionApi.reducerPath]: jobFunctionApi.reducer,
  [subJobFunctionApi.reducerPath]: subJobFunctionApi.reducer,
  [companiesApi.reducerPath]: companiesApi.reducer,
  [subAdminApi.reducerPath]: subAdminApi.reducer,
  [gradeSetupApi.reducerPath]: gradeSetupApi.reducer,
  [salaryRangeApi.reducerPath]: salaryRangeApi.reducer,
  [cashAllowancesApi.reducerPath]: cashAllowancesApi.reducer,
  [shortTermIPApi.reducerPath]: shortTermIPApi.reducer,
  auth: authReducer,
  businessUnit: businessUnitReducer,
  sectors: sectorsReducer,
  grade: gradeReducer,
  jobFunction: jobFunctionReducer,
  subJobFunction: subJobFunctionReducer,
  subAdmin: subAdminReducer,
  companies: companiesReducer,
  countries: countriesReducer,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["auth"],
};

const rootReducer = (state: any, action: any) => {
  if (
    action?.meta?.arg?.endpointName === "logout" &&
    action?.type === "authApi /executeMutation/fulfilled"
  ) {
    state = {} as RootState;
    localStorage.clear();
  }

  return appReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
    authApi.middleware,
    sectorsApi.middleware,
    gradeApi.middleware,
    companiesApi.middleware,
    gradeSetupApi.middleware,
    salaryRangeApi.middleware,
    cashAllowancesApi.middleware,
    shortTermIPApi.middleware,
  ],
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
