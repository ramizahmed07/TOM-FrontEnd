import { ReactComponent as UsersIcon } from "@assets/images/users.svg";
import { ReactComponent as CompaniesIcon } from "@assets/images/companies.svg";
import { ReactComponent as SubAdminIcon } from "@assets/images/sub-admin.svg";
import { ReactComponent as SettingsIcon } from "@assets/images/settings.svg";
import { ReactComponent as IndustryIcon } from "@assets/images/industry.svg";
import { ReactComponent as JobFunctionIcon } from "@assets/images/job-function.svg";
import { ReactComponent as ListIcon } from "@assets/images/list.svg";
import { ReactComponent as DashboardIcon } from "@assets/images/dashboard.svg";
import RoutePaths from "@routes/RoutePaths";

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
    path: RoutePaths.Home.dashboard,
  },
  {
    title: "Users",
    icon: UsersIcon,
    path: ["/companies", "/sub-admins"],
    sub: [
      {
        title: "Companies",
        icon: CompaniesIcon,
        path: RoutePaths.User.companyListing,
        routingPath: RoutePaths.User.companyListing,
      },
      {
        title: "Sub-Admins",
        icon: SubAdminIcon,
        path: "/sub-admins",
      },
    ],
  },
  {
    title: "Settings",
    icon: SettingsIcon,
    path: ["/sectors", "/job-function", "/grade-map-table"],
    sub: [
      {
        title: "Sectors, Industry & Sub-Industry",
        icon: IndustryIcon,
        path: "/sectors",
      },
      {
        title: "Job Function & Sub-Function",
        icon: JobFunctionIcon,
        path: "/job-function",
      },
      {
        title: "Grade map table",
        icon: ListIcon,
        path: "/grade-map-table",
      },
    ],
  },
];

export default config;
