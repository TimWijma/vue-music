export enum Period {
    Week = "Last week",
    Month = "Last month",
    Quarter = "Last 3 months",
    Half = "Last 6 months",
    Year = "Last year",
    All = "All time",
}

export const PeriodAPI = {
    [Period.Week]: "LAST_7_DAYS",
    [Period.Month]: "LAST_30_DAYS",
    [Period.Quarter]: "LAST_90_DAYS",
    [Period.Half]: "LAST_180_DAYS",
    [Period.Year]: "LAST_365_DAYS",
    [Period.All]: "ALL",
};
