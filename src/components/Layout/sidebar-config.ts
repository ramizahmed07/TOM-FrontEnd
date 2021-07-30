import { ReactComponent as UsersIcon } from "@assets/images/users.svg";
import { ReactComponent as CompaniesIcon } from "@assets/images/companies.svg";
import { ReactComponent as SubAdminIcon } from "@assets/images/sub-admin.svg";
import { ReactComponent as SettingsIcon } from "@assets/images/settings.svg";
import { ReactComponent as IndustryIcon } from "@assets/images/industry.svg";
import { ReactComponent as JobFunctionIcon } from "@assets/images/job-function.svg";
import { ReactComponent as ListIcon } from "@assets/images/list.svg";
import { ReactComponent as DashboardIcon } from "@assets/images/dashboard.svg";
import { Paths } from "@/router";

const { Users, Settings } = Paths;

export type Config = {
  title: string;
  icon: any;
  path: string | Array<string>;
  routingPath?: string;
  sub?: Array<Config>;
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
    path: [Users.companies.listing, Users.sub_admins],
    sub: [
      {
        title: "Companies",
        icon: CompaniesIcon,
        path: Users.companies.listing,
      },
      {
        title: "Sub-Admins",
        icon: SubAdminIcon,
        path: Users.sub_admins,
      },
    ],
  },
  {
    title: "Settings",
    icon: SettingsIcon,
    path: [
      Settings.sectors.listing,
      Settings.sectors.industry,
      Settings.job_function,
      Settings.grade_map_table.listing,
      Settings.grade_map_table.create_grade_company,
    ],
    sub: [
      {
        title: "Sectors, Industry & Sub-Industry",
        icon: IndustryIcon,
        path: Settings.sectors.listing,
      },
      {
        title: "Job Function & Sub-Function",
        icon: JobFunctionIcon,
        path: Settings.job_function,
      },
      {
        title: "Grade map table",
        icon: ListIcon,
        path: Settings.grade_map_table.listing,
      },
    ],
  },
];

export default config;
