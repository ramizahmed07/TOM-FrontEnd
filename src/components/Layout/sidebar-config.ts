import { ReactComponent as UsersIcon } from "@assets/images/users.svg";
import { ReactComponent as CompaniesIcon } from "@assets/images/companies.svg";
import { ReactComponent as SubAdminIcon } from "@assets/images/sub-admin.svg";
import { ReactComponent as SettingsIcon } from "@assets/images/settings.svg";
import { ReactComponent as IndustryIcon } from "@assets/images/industry.svg";
import { ReactComponent as JobFunctionIcon } from "@assets/images/job-function.svg";
import { ReactComponent as ListIcon } from "@assets/images/list.svg";
import { ReactComponent as DashboardIcon } from "@assets/images/dashboard.svg";
import RoutePaths from "@/routes/RoutePaths";

const config = [
  {
    title: "Dashboard",
    icon: DashboardIcon,
  },
  {
    title: "Users",
    icon: UsersIcon,
    sub: [
      {
        title: "Companies",
        icon: CompaniesIcon,
        routingPath: RoutePaths.User.companyListing,
      },
      {
        title: "Sub-Admins",
        icon: SubAdminIcon,
      },
    ],
  },
  {
    title: "Settings",
    icon: SettingsIcon,
    sub: [
      {
        title: "Sectors, Industry & Sub-Industry",
        icon: IndustryIcon,
      },
      {
        title: "Job Function & sub-function",
        icon: JobFunctionIcon,
      },
      {
        title: "Grade map table",
        icon: ListIcon,
      },
    ],
  },
];

export default config;
