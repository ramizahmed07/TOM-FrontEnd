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
  sub_admins: "/sub-admins",
};

const Settings = {
  sectors: {
    listing: "/sectors",
    industry: "/sectors/:sector_id",
  },
  job_function: "/job-function",
  sub_job_function: "/job-function/:id",
  grade_map_table: {
    listing: "/grade-map-table",
    create_grade_company: "/grade-map-table/create-grade-company",
  },
};

export { Auth, Settings, Users, Dashboard };
