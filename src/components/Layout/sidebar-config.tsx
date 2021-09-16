import { ReactComponent as UsersIcon } from "@assets/images/users.svg";
import { ReactComponent as CompaniesIcon } from "@assets/images/companies.svg";
import { ReactComponent as SubAdminIcon } from "@assets/images/sub-admin.svg";
import { ReactComponent as SettingsIcon } from "@assets/images/settings.svg";
import { ReactComponent as IndustryIcon } from "@assets/images/industry.svg";
import { ReactComponent as JobFunctionIcon } from "@assets/images/job-function.svg";
import { ReactComponent as ListIcon } from "@assets/images/list.svg";
import { ReactComponent as DashboardIcon } from "@assets/images/dashboard.svg";
import { ReactComponent as ClientUsersIcon } from "@assets/images/client-users-icon.svg";
import { ReactComponent as GradeSetupIcon } from "@assets/images/client-grade-setup-icon.svg";
import { ReactComponent as SalaryRangeIcon } from "@assets/images/client-salary-range-icon.svg";
import { ReactComponent as CashAllowancesIcon } from "@assets/images/client-cash-allowances-icon.svg";
import { ReactComponent as STIPlanIcon } from "@assets/images/client-sti-plan-icon.svg";
import { ReactComponent as LTIPlanIcon } from "@assets/images/client-lti-plan-icon.svg";
import { ReactComponent as InternalPayrollIcon } from "@assets/images/client-internal-payroll-icon.svg";
import { ReactComponent as MarketDataIcon } from "@assets/images/client-market-data-icon.svg";
import { ReactComponent as CompensationSystemIcon } from "@assets/images/client-compensation-system-icon.svg";
import { ReactComponent as ClientDashboardIcon } from "@assets/images/client-dashboard-icon.svg";
import { ReactComponent as ClientCreateOfferIcon } from "@assets/images/client-create-offer-icon.svg";
import { ReactComponent as ClientOfferModellerIcon } from "@assets/images/client-offer-modeller-icon.svg";
import { paths, permissions } from "@router";

const {
  admin: {
    users: { companies, sub_admins },
    dashboard,
    settings: { sectors, job_function, grade_map_table },
  },
  client,
} = paths;

export interface IConfig {
  title: string;
  icon: any;
  path: string | Array<string>;
  routingPath?: string;
  sub?: Array<IConfig>;
  permission?: string;
  client?: boolean;
}

export const admin_config: Array<IConfig> = [
  {
    title: "Dashboard",
    icon: DashboardIcon,
    path: dashboard.dashboard,
  },
  {
    title: "Users",
    icon: UsersIcon,
    path: [
      companies.listing,
      companies.create,
      sub_admins.create,
      sub_admins.listing,
    ],
    sub: [
      {
        title: "Companies",
        icon: CompaniesIcon,
        path: "/companies",
      },
      {
        title: "Sub-Admins",
        icon: SubAdminIcon,
        path: sub_admins.listing,
        permission: permissions.VIEW_TOM_USER,
      },
    ],
  },
  {
    title: "Settings",
    icon: SettingsIcon,
    path: [
      sectors.listing,
      sectors.industry,
      job_function.listing,
      grade_map_table.listing,
      grade_map_table.create_grade_company,
    ],
    sub: [
      {
        title: "Sectors, Industry & Sub-Industry",
        icon: IndustryIcon,
        path: sectors.listing,
        permission: permissions.VIEW_SECTOR,
      },
      {
        title: "Job Function & Sub-Function",
        icon: JobFunctionIcon,
        path: job_function.listing,
        permission: permissions.VIEW_JOB_SUB_FUNCTION,
      },
      {
        title: "Grade map table",
        icon: ListIcon,
        path: grade_map_table.listing,
      },
    ],
  },
];

export const client_config: Array<IConfig> = [
  {
    title: "Dashboard",
    icon: ClientDashboardIcon,
    path: client.dashboard,
    client: true,
  },
  // {
  //   title: "Users",
  //   icon: ClientUsersIcon,
  //   path: [
  //     companies.listing,
  //     companies.create,
  //     sub_admins.create,
  //     sub_admins.listing,
  //   ],
  //   sub: [
  //     {
  //       title: "Companies",
  //       icon: CompaniesIcon,
  //       path: "/companies",
  //     },
  //     {
  //       title: "Sub-Admins",
  //       icon: SubAdminIcon,
  //       path: sub_admins.listing,
  //     },
  //   ],
  // },
  {
    title: "Compensation System",
    icon: CompensationSystemIcon,
    client: true,
    path: [
      client.grade_setup,
      client.salary_range,
      client.cash_allowances,
      client.short_term_ip.plans,
      client.short_term_ip.incentives,
      client.long_term_ip.plans,
      client.long_term_ip.incentives,
    ],
    sub: [
      {
        title: "Grade Setup",
        icon: GradeSetupIcon,
        path: client.grade_setup,
      },
      {
        title: "Salary Range",
        icon: SalaryRangeIcon,
        path: client.salary_range,
      },
      {
        title: "Cash Allowances",
        icon: CashAllowancesIcon,
        path: client.cash_allowances,
      },
      {
        title: `Short Term Incentives`,
        icon: STIPlanIcon,
        path: client.short_term_ip.plans,
      },
      {
        title: "Long Term Incentives",
        icon: LTIPlanIcon,
        path: client.long_term_ip.plans,
      },
      {
        title: "Internal Payroll",
        icon: InternalPayrollIcon,
        path: client.internal_payroll_data,
      },
      {
        title: "Market Data",
        icon: MarketDataIcon,
        path: client.market_data,
      },
    ],
  },
  {
    title: "Offer Modeller",
    icon: ClientOfferModellerIcon,
    client: true,
    path: [client.offers.listing, client.offers.create],
    sub: [
      {
        title: "Offers",
        icon: ClientCreateOfferIcon,
        path: client.offers.listing,
      },
    ],
  },
];
