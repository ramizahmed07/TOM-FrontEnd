import { ReactComponent as UsersIcon } from "@assets/images/users.svg";
import { ReactComponent as CompaniesIcon } from "@assets/images/companies.svg";
import { ReactComponent as SubAdminIcon } from "@assets/images/sub-admin.svg";
import { ReactComponent as SettingsIcon } from "@assets/images/settings.svg";
import { ReactComponent as IndustryIcon } from "@assets/images/industry.svg";
import { ReactComponent as JobFunctionIcon } from "@assets/images/job-function.svg";
import { ReactComponent as ListIcon } from "@assets/images/list.svg";
import { ReactComponent as DashboardIcon } from "@assets/images/dashboard.svg";
import { Paths, permissions } from "@router";

const {
  Users: { companies, sub_admins },
  Settings: { sectors, job_function, grade_map_table },
} = Paths;

export type Config = {
  title: string;
  icon: any;
  path: string | Array<string>;
  routingPath?: string;
  sub?: Array<Config>;
  permission?: string;
};

const config: Array<Config> = [
  {
    title: "Dashboard",
    icon: DashboardIcon,
    path: Paths.Dashboard.dashboard,
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

export default config;
