import { paths } from "@router";

export const TABS = [
  {
    id: 1,
    title: "Company details",
    path: paths.admin.users.companies.profile.details,
  },
  {
    id: 2,
    title: "Business units",
    path: paths.admin.users.companies.profile.business_units.listing,
  },
  {
    id: 3,
    title: "Regions",
    path: paths.admin.users.companies.profile.regions,
  },
];
