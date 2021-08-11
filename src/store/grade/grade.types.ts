export interface IGradeCompanyRank {
  rank: string | null;
  ta_rank_id: number;
  ta_rank: string;
}

export interface IGradeCompany {
  company: null | string;
  id: number;
  name: string;
  grade_company_ranks: IGradeCompanyRank[];
}
