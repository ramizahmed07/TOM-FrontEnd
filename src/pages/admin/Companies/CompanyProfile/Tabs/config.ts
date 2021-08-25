import { Paths } from "@router";

export const TABS = [
  {
    id: 1,
    title: "Company details",
    path: Paths.Users.companies.profile.details,
  },
  {
    id: 2,
    title: "Business units",
    path: Paths.Users.companies.profile.business_units,
  },
  {
    id: 3,
    title: "Regions",
    path: Paths.Users.companies.profile.regions,
  },
  {
    id: 4,
    title: "Legal entities",
    path: "/profile/legal-entities",
  },
];
