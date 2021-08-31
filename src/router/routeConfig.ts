import ForgotPassword from "@pages/admin/Auth/ForgotPassword";
import Login from "@pages/admin/Auth/Login";
import ResetPassword from "@pages/admin/Auth/ResetPassword";
import GradeMapTable from "@pages/admin/GradeMapTable";
import AddGradeCompany from "@pages/admin/GradeMapTable/AddGradeCompany";
import JobFunction from "@pages/admin/JobFunction";
import SubJobFunction from "@pages/admin/JobFunction/SubJobFunction";
import Sectors from "@pages/admin/Sectors";
import Industry from "@pages/admin/Sectors/Industry";
import SubIndustry from "@pages/admin/Sectors/SubIndustry";
import Companies from "@pages/admin/Companies";
import CreateCompany from "@pages/admin/Companies/CreateCompany";
import CompanyProfile from "@pages/admin/Companies/CompanyProfile";
import SubAdminsCreate from "@pages/admin/User/SubAdmins/SubAdminsCreate";
import SubAdminsEdit from "@pages/admin/User/SubAdmins/SubAdminEdit";
import SubAdminsList from "@pages/admin/User/SubAdmins/SubAdminsList";
import CompanyDetails from "@pages/admin/Companies/CompanyProfile/CompanyDetails";
import BusinessUnits from "@pages/admin/Companies/CompanyProfile/BusinessUnits";
import Regions from "@pages/admin/Companies/CompanyProfile/Regions";
import BusinessUnitRegions from "@pages/admin/Companies/CompanyProfile/BusinessUnits/BusinessUnitRegions";
import BusinessUnitCountries from "@pages/admin/Companies/CompanyProfile/BusinessUnits/BusinessUnitCountries";
import LegalEntities from "@pages/admin/Companies/CompanyProfile/BusinessUnits/LegalEntities";
import ClientLogin from "@pages/client/Auth/Login";
import ClientResetPassword from "@pages/client/Auth/ResetPassword";
import ClientForgotPassword from "@pages/client/Auth/ForgotPassword";
import { Paths, IRoute, permissions } from "@router";

export const routeConfig: IRoute[] = [
  {
    path: Paths.Auth.login,
    component: Login,
    key: "Login",
    isPrivate: false,
  },
  {
    path: Paths.Auth.client_login,
    component: ClientLogin,
    key: "Client Login",
    isPrivate: false,
  },
  {
    path: Paths.Auth.forgot_password,
    component: ForgotPassword,
    key: "Forgot Password",
    isPrivate: false,
  },
  {
    path: Paths.Auth.client_forgot_password,
    component: ClientForgotPassword,
    key: "Client Forgot Password",
    isPrivate: false,
  },
  {
    path: Paths.Auth.reset_password,
    component: ResetPassword,
    key: "Reset Password",
    isPrivate: true,
  },
  {
    path: Paths.Auth.client_reset_password,
    component: ClientResetPassword,
    key: "Reset Password",
    isPrivate: true,
  },
  {
    path: Paths.Users.companies.listing,
    component: Companies,
    key: "Companies",
    exact: true,
    breadcrumb: "Users / Companies list",
    isPrivate: true,
  },
  {
    path: Paths.Users.companies.create,
    component: CreateCompany,
    key: "Company New Company",
    exact: true,
    breadcrumb: "Users / Companies list / Create new company",
    isPrivate: true,
  },
  {
    path: Paths.Users.companies.profile.details,
    component: CompanyProfile,
    key: "Companies",
    breadcrumb: "Users / Companies list",
    isPrivate: true,
    routes: [
      {
        path: Paths.Users.companies.profile.details,
        component: CompanyDetails,
        key: "Companies Details",
        exact: true,
        breadcrumb: "Users / Companies list",
        isPrivate: true,
      },
      {
        path: Paths.Users.companies.profile.business_units.listing,
        component: BusinessUnits,
        key: "Business Units",
        exact: true,
        breadcrumb: "Users / Companies list",
        isPrivate: true,
      },
      {
        path: Paths.Users.companies.profile.business_units.regions,
        component: BusinessUnitRegions,
        key: "Business Unit Regions",
        exact: true,
        breadcrumb: "Users / Companies list",
        isPrivate: true,
      },
      {
        path: Paths.Users.companies.profile.business_units.countries,
        component: BusinessUnitCountries,
        key: "Business Unit Countries",
        exact: true,
        breadcrumb: "Users / Companies list",
        isPrivate: true,
      },
      {
        path: Paths.Users.companies.profile.business_units.legal_entities,
        component: LegalEntities,
        key: "Legal Entities",
        exact: true,
        breadcrumb: "Users / Companies list",
        isPrivate: true,
      },
      {
        path: Paths.Users.companies.profile.regions,
        component: Regions,
        key: "Regions",
        exact: true,
        breadcrumb: "Users / Companies list",
        isPrivate: true,
      },
    ],
  },
  {
    path: Paths.Users.sub_admins.listing,
    component: SubAdminsList,
    key: "SubAminList",
    exact: true,
    breadcrumb: "Users / Sub-Admins",
    isPrivate: true,
  },
  {
    path: Paths.Users.sub_admins.create,
    component: SubAdminsCreate,
    key: "SubAdminsCreate",
    exact: true,
    breadcrumb: "Users / Sub-Admins/ Create Sub Admin",
    isPrivate: true,
  },
  {
    path: Paths.Users.sub_admins.edit,
    component: SubAdminsEdit,
    key: "SubAdminsEdit",
    exact: true,
    breadcrumb: "Users / Sub-Admins/ Create Sub Admin",
    isPrivate: true,
  },

  {
    path: Paths.Settings.sectors.listing,
    component: Sectors,
    key: "Sectors",
    exact: true,
    breadcrumb: "Settings / Sectors",
    isPrivate: true,
    permission: permissions.VIEW_SECTOR,
  },
  {
    path: Paths.Settings.sectors.industry,
    component: Industry,
    key: "Industry",
    breadcrumb: "Settings / Sectors / Industries",
    isPrivate: true,
    exact: true,
    permission: permissions.VIEW_INDUSTRY,
  },
  {
    path: Paths.Settings.sectors.sub_industry,
    component: SubIndustry,
    key: "Sub-Industry",
    breadcrumb: "Settings / Sectors / Industries / Sub Industries",
    isPrivate: true,
    permission: permissions.VIEW_SUB_INDUSTRY,
  },
  {
    path: Paths.Settings.job_function.listing,
    component: JobFunction,
    key: "Job Function",
    breadcrumb: "Settings / Job Function",
    isPrivate: true,
  },
  {
    path: Paths.Settings.job_function.sub_job_function,
    component: SubJobFunction,
    key: "Sub Job Function",
    breadcrumb: "Settings / Job Function / Sub-Function",
    isPrivate: true,
    permission: permissions.VIEW_JOB_SUB_FUNCTION,
  },
  {
    path: Paths.Settings.grade_map_table.listing,
    component: GradeMapTable,
    key: "Grade Map Table",
    exact: true,
    breadcrumb: "Settings / Grade map table",
    isPrivate: true,
  },
  {
    path: Paths.Settings.grade_map_table.create_grade_company,
    component: AddGradeCompany,
    key: "Add new Company",
    breadcrumb: "Settings / Grade map table / Add new company",
    isPrivate: true,
  },
  {
    path: Paths.Settings.grade_map_table.edit_grade_company,
    component: AddGradeCompany,
    key: "Add new Company",
    breadcrumb: "Settings / Grade map table / Edit new company",
    isPrivate: true,
  },
  {
    path: Paths.Dashboard.dashboard,
    component: "Dashboard",
    key: "Dashboard",
    breadcrumb: "Dashboard",
    isPrivate: true,
  },
  {
    path: Paths.Users.sub_admins.listing,
    component: SubAdminsList,
    key: "List sub admins",
    breadcrumb: "Users / Sub admins",
    exact: true,
    isPrivate: true,
  },
  {
    path: Paths.Users.sub_admins.create,
    component: SubAdminsCreate,
    key: "Add new sub admin",
    breadcrumb: "Users / Sub admins / Add new sub admin",
    isPrivate: true,
  },
];
