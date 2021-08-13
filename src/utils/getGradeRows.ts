import { IGradeCompany, ITARank } from "@store/grade";

export const getRows = (taRanks: ITARank[], companies: IGradeCompany[]) => {
  const data = [];
  let companies_ranks: any = {};
  for (let i = 0; i < companies?.length; i++) {
    const current = companies[i];
    companies_ranks[current.name.replace(" ", "")] =
      current.grade_company_ranks;
  }
  for (let i = 0; i < taRanks?.length; i++) {
    const rank = taRanks[i];
    let row: any = {
      rank: rank.rank,
    };
    Object.keys(companies_ranks).forEach(key => {
      const company_ranks = companies_ranks[key];
      row[key] = company_ranks[i].rank;
    });
    data.push(row);
  }
  return data;
};
