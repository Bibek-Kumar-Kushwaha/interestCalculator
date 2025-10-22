import NepaliDate from "nepali-date-converter";

export function adToBs(adDate: Date) {
  const nDate = new NepaliDate(adDate);
  return { year: nDate.getYear(), month: nDate.getMonth() + 1, day: nDate.getDate() };
}

export function bsToAdDate(year: number, month: number, day: number) {
  const nDate = new NepaliDate(year, month - 1, day);
  return nDate.toJsDate();
}
