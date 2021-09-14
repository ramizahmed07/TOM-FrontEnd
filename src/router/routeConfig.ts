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
import GradeSetup from "@pages/client/GradeSetup";
import SalaryRange from "@pages/client/SalaryRange";
import CashAllowances from "@pages/client/CashAllowances";
import LongTermIP from "@pages/client/LongTermIP";
import InternalPayrollData from "@pages/client/InternalPayrollData";
import MarketData from "@pages/client/MarketData";
import AddOffer from "@pages/client/Offers/AddOffer";
import Offers from "@pages/client/Offers";
import { paths, IRoute, permissions } from "@router";
import ShortTermPlans from "@pages/client/ShortTermIP/Plans";
import ShortTermIncentives from "@/pages/client/ShortTermIP/Incentives";

export const admin_routeConfig: IRoute[] = [
  {
    path: paths.admin.auth.login,
    component: Login,
    key: "Login",
    isPrivate: false,
  },
  {
    path: paths.admin.auth.forgot_password,
    component: ForgotPassword,
    key: "Forgot Password",
    isPrivate: false,
  },
  {
    path: paths.admin.auth.reset_password,
    component: ResetPassword,
    key: "Reset Password",
    isPrivate: true,
  },
  {
    path: paths.admin.users.companies.listing,
    component: Companies,
    key: "Companies",
    exact: true,
    breadcrumb: "Users / Companies list",
    isPrivate: true,
  },
  {
    path: paths.admin.users.companies.create,
    component: CreateCompany,
    key: "Company New Company",
    exact: true,
    breadcrumb: "Users / Companies list / Create new company",
    isPrivate: true,
  },
  {
    path: paths.admin.users.companies.profile.details,
    component: CompanyProfile,
    key: "Companies",
    breadcrumb: "Users / Companies list",
    isPrivate: true,
    routes: [
      {
        path: paths.admin.users.companies.profile.details,
        component: CompanyDetails,
        key: "Companies Details",
        exact: true,
        breadcrumb: "Users / Companies list",
        isPrivate: true,
      },
      {
        path: paths.admin.users.companies.profile.business_units.listing,
        component: BusinessUnits,
        key: "Business Units",
        exact: true,
        breadcrumb: "Users / Companies list",
        isPrivate: true,
      },
      {
        path: paths.admin.users.companies.profile.business_units.regions,
        component: BusinessUnitRegions,
        key: "Business Unit Regions",
        exact: true,
        breadcrumb: "Users / Companies list",
        isPrivate: true,
      },
      {
        path: paths.admin.users.companies.profile.business_units.countries,
        component: BusinessUnitCountries,
        key: "Business Unit Countries",
        exact: true,
        breadcrumb: "Users / Companies list",
        isPrivate: true,
      },
      {
        path: paths.admin.users.companies.profile.business_units.legal_entities,
        component: LegalEntities,
        key: "Legal Entities",
        exact: true,
        breadcrumb: "Users / Companies list",
        isPrivate: true,
      },
      {
        path: paths.admin.users.companies.profile.regions,
        component: Regions,
        key: "Regions",
        exact: true,
        breadcrumb: "Users / Companies list",
        isPrivate: true,
      },
    ],
  },
  {
    path: paths.admin.users.sub_admins.listing,
    component: SubAdminsList,
    key: "SubAminList",
    exact: true,
    breadcrumb: "Users / Sub-Admins",
    isPrivate: true,
  },
  {
    path: paths.admin.users.sub_admins.create,
    component: SubAdminsCreate,
    key: "SubAdminsCreate",
    exact: true,
    breadcrumb: "Users / Sub-Admins/ Create Sub Admin",
    isPrivate: true,
  },
  {
    path: paths.admin.users.sub_admins.edit,
    component: SubAdminsEdit,
    key: "SubAdminsEdit",
    exact: true,
    breadcrumb: "Users / Sub-Admins/ Create Sub Admin",
    isPrivate: true,
  },

  {
    path: paths.admin.settings.sectors.listing,
    component: Sectors,
    key: "Sectors",
    exact: true,
    breadcrumb: "Settings / Sectors",
    isPrivate: true,
    permission: permissions.VIEW_SECTOR,
  },
  {
    path: paths.admin.settings.sectors.industry,
    component: Industry,
    key: "Industry",
    breadcrumb: "Settings / Sectors / Industries",
    isPrivate: true,
    exact: true,
    permission: permissions.VIEW_INDUSTRY,
  },
  {
    path: paths.admin.settings.sectors.sub_industry,
    component: SubIndustry,
    key: "Sub-Industry",
    breadcrumb: "Settings / Sectors / Industries / Sub Industries",
    isPrivate: true,
    permission: permissions.VIEW_SUB_INDUSTRY,
  },
  {
    path: paths.admin.settings.job_function.listing,
    component: JobFunction,
    key: "Job Function",
    breadcrumb: "Settings / Job Function",
    isPrivate: true,
  },
  {
    path: paths.admin.settings.job_function.sub_job_function,
    component: SubJobFunction,
    key: "Sub Job Function",
    breadcrumb: "Settings / Job Function / Sub-Function",
    isPrivate: true,
    permission: permissions.VIEW_JOB_SUB_FUNCTION,
  },
  {
    path: paths.admin.settings.grade_map_table.listing,
    component: GradeMapTable,
    key: "Grade Map Table",
    exact: true,
    breadcrumb: "Settings / Grade map table",
    isPrivate: true,
  },
  {
    path: paths.admin.settings.grade_map_table.create_grade_company,
    component: AddGradeCompany,
    key: "Add new Company",
    breadcrumb: "Settings / Grade map table / Add new company",
    isPrivate: true,
  },
  {
    path: paths.admin.settings.grade_map_table.edit_grade_company,
    component: AddGradeCompany,
    key: "Add new Company",
    breadcrumb: "Settings / Grade map table / Edit new company",
    isPrivate: true,
  },
  {
    path: paths.admin.users.sub_admins.listing,
    component: SubAdminsList,
    key: "List sub admins",
    breadcrumb: "Users / Sub admins",
    exact: true,
    isPrivate: true,
  },
  {
    path: paths.admin.users.sub_admins.create,
    component: SubAdminsCreate,
    key: "Add new sub admin",
    breadcrumb: "Users / Sub admins / Add new sub admin",
    isPrivate: true,
  },

  {
    path: paths.admin.dashboard.dashboard,
    component: "Dashboard",
    key: "Dashboard",
    breadcrumb: "Dashboard",
    isPrivate: true,
  },
];

export const client_routeConfig: IRoute[] = [
  {
    path: paths.client.auth.login,
    component: ClientLogin,
    key: "Client Login",
    isPrivate: false,
  },

  {
    path: paths.client.auth.forgot_password,
    component: ClientForgotPassword,
    key: "Client Forgot Password",
    isPrivate: false,
  },
  {
    path: paths.client.auth.reset_password,
    component: ClientResetPassword,
    key: "Reset Password",
    isPrivate: true,
  },
  {
    path: paths.client.grade_setup,
    component: GradeSetup,
    key: "Grade Setup",
    breadcrumb: "Compensation System / Grade Setup",
    isPrivate: true,
  },
  {
    path: paths.client.salary_range,
    component: SalaryRange,
    key: "Salary Range",
    breadcrumb: "Compensation System / Salary Range",
    isPrivate: true,
  },
  {
    path: paths.client.cash_allowances,
    component: CashAllowances,
    key: "Cash Allowances",
    breadcrumb: "Compensation System / Cash Allowances",
    isPrivate: true,
  },
  {
    path: paths.client.short_term_ip.plans,
    component: ShortTermPlans,
    key: "Short Term Plans",
    breadcrumb: "Compensation System / Short Term Incentive Plans",
    isPrivate: true,
  },
  {
    path: paths.client.short_term_ip.incentives,
    component: ShortTermIncentives,
    key: "Short Term Incentives",
    breadcrumb: "Compensation System / Short Term Incentive Plans",
    isPrivate: true,
  },
  {
    path: paths.client.long_term_ip,
    component: LongTermIP,
    key: "Short Term Incentive Plans",
    breadcrumb: "Compensation System / Short Term Incentive Plans",
    isPrivate: true,
  },
  {
    path: paths.client.internal_payroll_data,
    component: InternalPayrollData,
    key: "Internal Payroll Data",
    breadcrumb: "Compensation System / Internal Payroll Data",
    isPrivate: true,
  },
  {
    path: paths.client.market_data,
    component: MarketData,
    key: "Market Data",
    breadcrumb: "Compensation System / Market Data",
    isPrivate: true,
  },
  {
    path: paths.client.offers.listing,
    component: Offers,
    key: "Offers",
    breadcrumb: "Offer Modeller / Offers",
    isPrivate: true,
    exact: true,
  },
  {
    path: paths.client.offers.create,
    component: AddOffer,
    key: "Create Offer",
    breadcrumb: "Offer Modeller / Create Offer",
    isPrivate: true,
  },
];
