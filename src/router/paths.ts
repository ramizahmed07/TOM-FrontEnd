const Auth = {
  login: "/login",
  forgot_password: "/forgot-password",
  reset_password: "/reset-password",
};

const Dashboard = {
  dashboard: "/",
};

const Users = {
  companies: {
    listing: "/companies",
    create_company: "/companies/create-company",
  },
  sub_admins: {
    listing: "/sub_admins",
    create: "/sub_admins/create",
  },
};

const Settings = {
  sectors: {
    listing: "/sectors",
    industry: "/sectors/:sector_id",
    sub_industry: "/sectors/:sector_id/:sub_industry_id",
  },
  job_function: "/job-function",
  grade_map_table: {
    listing: "/grade-map-table",
    create_grade_company: "/grade-map-table/create-grade-company",
  },
};

const Companies = {
  company_profile: "/profile",
};

export { Auth, Settings, Users, Dashboard, Companies };
