const TABS = [
  {
    id: 1,
    title: "Company details",
    path: "/company/:company_id/details",
  },
  {
    id: 2,
    title: "Business units",
    path: "/company/:company_id/business-units",
  },
  {
    id: 3,
    title: "Regions",
    path: "/company/:company_id/regions",
  },
  {
    id: 4,
    title: "Legal entities",
    path: "/company/:company_id/legal-entities",
  },
];

const COMPANY_DETAILS: any = {
  "Company name": "UNILEVER",
  Location: "United State of America (U.S.A)",
  Address: "74 Elizabeth Drive Ridgewood, NJ",
  "Postal code": "07450",
  "Country headquater": "California",
  "Base currency": "($)  -  Dollar",
  "Financial Year": "16th May, 2021   -   13th May, 2022",
  "Stock tracking ID": "10982227651110",
};

const CONTACT_INFO: any = {
  "Contact person": "Allen Cole",
  Country: "U.S.A  (United States of America)",
  "Contact number": "+1  209  791 61 88",
  "Email address": "allen_cole@example.com",
};

export { CONTACT_INFO, COMPANY_DETAILS, TABS };
