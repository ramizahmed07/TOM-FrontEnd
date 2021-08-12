import ForgotPassword from "@/pages/admin/Auth/ForgotPassword";
import Login from "@/pages/admin/Auth/Login";
import ResetPassword from "@/pages/admin/Auth/ResetPassword";
import GradeMapTable from "@/pages/admin/GradeMapTable";
import AddGradeCompany from "@/pages/admin/GradeMapTable/AddGradeCompany";
import JobFunction from "@/pages/admin/JobFunction";
import Sectors from "@/pages/admin/Sectors";
import Industry from "@/pages/admin/Sectors/Industry";
import CompanyList from "@/pages/admin/User/Companies/company-list";
import CompanyCreate from "@/pages/admin/User/Companies/CompanyCreate";
import SubAdminsCreate from "@/pages/admin/User/SubAdmins/SubAdminsCreate";
import SubAdminsList from "@/pages/admin/User/SubAdmins/SubAdminsList";
import { Paths, IRoute } from "@router";

export const routeConfig: IRoute[] = [
  {
    path: Paths.Auth.login,
    component: Login,
    key: "Login",
  },
  {
    path: Paths.Auth.forgot_password,
    component: ForgotPassword,
    key: "Forgot Password",
  },
  {
    path: Paths.Auth.reset_password,
    component: ResetPassword,
    key: "Reset Password",
  },
  {
    path: Paths.Users.companies.listing,
    component: CompanyList,
    key: "Sectors",
    exact: true,
    breadcrumb: "Users / Companies list",
  },
  {
    path: Paths.Users.companies.create_company,
    component: CompanyCreate,
    key: "Company New Company",
    exact: true,
    breadcrumb: "Users / Companies list / Create new company",
  },
  {
    path: Paths.Settings.sectors.listing,
    component: Sectors,
    key: "Sectors",
    exact: true,
    breadcrumb: "Settings / Sectors, Industry & Sub-Industry",
  },
  {
    path: Paths.Settings.sectors.listing,
    component: Industry,
    key: "Industry",
    breadcrumb: "Settings / Sectors, Industry & Sub-Industry",
  },
  {
    path: Paths.Settings.job_function,
    component: JobFunction,
    key: "Job Function",
    breadcrumb: "Settings / Job Function & Sub-Function",
  },
  {
    path: Paths.Settings.grade_map_table.listing,
    component: GradeMapTable,
    key: "Grade Map Table",
    exact: true,
    breadcrumb: "Settings / Grade map table",
  },
  {
    path: Paths.Settings.grade_map_table.create_grade_company,
    component: AddGradeCompany,
    key: "Add new Company",
    breadcrumb: "Settings / Grade map table / Add new company",
  },
  {
    path: Paths.Users.sub_admins.listing,
    component: SubAdminsList,
    key: "List sub admins",
    breadcrumb: "Users / Sub admins",
    exact: true,
  },
  {
    path: Paths.Users.sub_admins.create,
    component: SubAdminsCreate,
    key: "Add new sub admin",
    breadcrumb: "Users / Sub admins / Add new sub admin",
  },
];
