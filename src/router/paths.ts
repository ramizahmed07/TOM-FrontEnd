const admin = {
  auth: {
    login: "/login",
    forgot_password: "/forgot-password",
    reset_password: "/reset-password",
  },
  dashboard: {
    dashboard: "/",
  },

  users: {
    companies: {
      listing: "/companies",
      create: "/companies/create",
      edit: "/companies/:company_id/edit",
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
  },

  settings: {
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
  },
};

const client = {
  dashboard: "/client",
  auth: {
    login: "/client/login",
    forgot_password: "/client/forgot-password",
    reset_password: "/client/reset-password",
  },
  grade_setup: "/client/grade-setup",
  salary_range: "/client/salary-range",
  cash_allowances: "/client/cash-allowances",
  short_term_ip: {
    plans: "/client/short-term-plans",
    incentives: "/client/short-term-incentives",
  },
  long_term_ip: {
    plans: "/client/long-term-plans",
    incentives: "/client/long-term-incentives",
  },
  internal_payroll_data: "/client/internal-payroll-data",
  market_data: "/client/market-data",
  offers: {
    listing: "/client/offers",
    create: "/client/offers/create",
  },
};

export { admin, client };
