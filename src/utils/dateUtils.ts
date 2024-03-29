export function convertDateStrToDate(dateStr: string) {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day);
}

/**
 * @param start Start date in format "YYYY-MM-DD"
 * @param end End date in format "YYYY-MM-DD"
 * @returns Array of days of the week between start and end dates
 */
export function getDaysOfWeek(start: string, end: string) {
  const startDate = convertDateStrToDate(start);
  const endDate = convertDateStrToDate(end);
  const daysOfWeek = [];
  for (
    let date = startDate;
    date <= endDate;
    date.setDate(date.getDate() + 1)
  ) {
    daysOfWeek.push(dayOfWeekLookup[date.getDay()]);
  }
  return Array.from(new Set(daysOfWeek));
}

export const dayOfWeekLookup = [
  "Sun",
  "Mon",
  "Tues",
  "Wed",
  "Thurs",
  "Fri",
  "Sat",
];
