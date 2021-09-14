import moment from "moment";

export function getDaysOfMonth({
  month = moment().month() + 1,
  year = moment().year(),
}: {
  month: number | undefined;
  year: number | undefined;
}): number[] {
  const days = [];
  for (let i = 1; i <= new Date(year, month, 0).getDate(); i++) {
    days.push(i);
  }
  return days;
}
