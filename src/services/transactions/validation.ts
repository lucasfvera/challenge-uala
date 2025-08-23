export type Period = "day" | "week" | "month";

export const PERIODS: Period[] = ["day", "week", "month"];

export function isValidPeriod(value: string | null): value is Period {
    return value !== null && PERIODS.includes(value as Period);
}

export function getValidPeriod(
    value: string | null,
    defaultValue: Period = "week"
): Period {
    return isValidPeriod(value) ? value : defaultValue;
}
