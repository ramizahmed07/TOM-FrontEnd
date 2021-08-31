const Auth = {
  login: "/login",
  forgot_password: "/forgot-password",
  reset_password: "/reset-password",
  client_login: "/client/login",
  client_forgot_password: "/client/forgot-password",
  client_reset_password: "/client/reset-password",
};

const Dashboard = {
  dashboard: "/",
};

const Users = {
  companies: {
    listing: "/companies",
    create: "/companies/create",
    profile: {
      details: "/companies/:company_id",
      business_units: {
        listing: "/companies/:company_id/business-units",
        regions: "/companies/:company_id/business-units/:business_unit_id",
        countries:
          "/companies/:company_id/business-units/:business_unit_id/:region_id",
        legal_entities:
          "/companies/:company_id/business-units/:business_unit_id/:region_id/:country_id",
      },

      regions: "/companies/:company_id/regions",
    },
  },
  sub_admins: {
    listing: "/sub-admins",
    create: "/sub-admins/create",
    edit: "/sub-admins/edit/:sub_admin_id",
  },
};

const Settings = {
  sectors: {
    listing: "/sectors",
    industry: "/sectors/:sector_id",
    sub_industry: "/sectors/:sector_id/:industry_id",
  },
  job_function: {
    listing: "/job-function",
    sub_job_function: "/job-sub-function/:job_id",
  },
  grade_map_table: {
    listing: "/grade-map-table",
    create_grade_company: "/grade-map-table/create-grade-company",
    edit_grade_company: "/grade-map-table/edit-grade-company",
  },
};

const Companies = {
  company_profile: "/profile",
};

export { Auth, Settings, Users, Dashboard, Companies };
