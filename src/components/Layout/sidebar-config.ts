import { ReactComponent as UsersIcon } from "@assets/images/users.svg";
import { ReactComponent as CompaniesIcon } from "@assets/images/companies.svg";
import { ReactComponent as SubAdminIcon } from "@assets/images/sub-admin.svg";
import { ReactComponent as SettingsIcon } from "@assets/images/settings.svg";
import { ReactComponent as IndustryIcon } from "@assets/images/industry.svg";
import { ReactComponent as JobFunctionIcon } from "@assets/images/job-function.svg";
import { ReactComponent as ListIcon } from "@assets/images/list.svg";
import { ReactComponent as DashboardIcon } from "@assets/images/dashboard.svg";

const config = [
  {
    title: "Dashboard",
    icon: DashboardIcon,
    path: "/dashboard",
  },
  {
    title: "Users",
    icon: UsersIcon,
    path: "/users",
    sub: [
      {
        title: "Companies",
        icon: CompaniesIcon,
        path: "/companies",
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
    path: "/settings",
    sub: [
      {
        title: "Sectors, Industry & Sub-Industry",
        icon: IndustryIcon,
        path: "/settings/sectors",
      },
      {
        title: "Job Function & Sub-Function",
        icon: JobFunctionIcon,
        path: "/settings/job-function",
      },
      {
        title: "Grade map table",
        icon: ListIcon,
        path: "/settings/grade-map-table",
      },
    ],
  },
];

export default config;
