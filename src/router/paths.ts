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
    listing: "/sub-admins",
    create_sub_admin: "/sub-admins/create-sub-admin",
  },

};

const Settings = {
  sectors: {
    listing: "/sectors",
    industry: "/sectors/:sector_id",
  },
  job_function: {
    listing: '/job-function',
    sub_job_function: '/job-sub-function/:job_id',
  },
  grade_map_table: {
    listing: "/grade-map-table",
    create_grade_company: "/grade-map-table/create-grade-company",
  },
};

export { Auth, Settings, Users, Dashboard };
