"use server";

import type { Transaction } from "@/services/transactions/types";
import { URL_SERVICE_TRANSACTIONS } from "@/utils/envVars";
import type { Period } from "@/services/transactions/validation";
import { format, isFuture, isWithinInterval } from "date-fns";

const ITEMS_PER_PAGE = 10;

export interface FiltersType {
    date?: { from?: Date; to?: Date };
    card?: Pick<Transaction, "card">["card"];
    installments?: Pick<Transaction, "installments">["installments"];
    amount?: { from?: number; to?: number };
    paymentMethod?: Pick<Transaction, "paymentMethod">["paymentMethod"];
}

type ActiveFilters = {
    [Prop in keyof FiltersType]: (ts: Transaction[]) => Transaction[];
};

// By Value
const filterByCard =
    (card: Pick<Transaction, "card">["card"]) => (ts: Transaction[]) =>
        ts.filter((t) => t.card === card);

const filterByInstallments =
    (installment: Pick<Transaction, "installments">["installments"]) =>
    (ts: Transaction[]) =>
        ts.filter((t) => t.installments === installment);

const filterByPaymentMethod =
    (paymentMethod: Pick<Transaction, "paymentMethod">["paymentMethod"]) =>
    (ts: Transaction[]) =>
        ts.filter((t) => t.paymentMethod === paymentMethod);

// By Range
const filterByAmount =
    (amount: {
        from?: Pick<Transaction, "amount">["amount"];
        to?: Pick<Transaction, "amount">["amount"];
    }) =>
    (ts: Transaction[]) =>
        ts.filter((t) => {
            if (amount.from !== undefined && amount.to !== undefined) {
                return t.amount >= amount.from && t.amount <= amount.to;
            } else if (amount.from !== undefined) {
                return t.amount >= amount.from;
            } else if (amount.to !== undefined) {
                return t.amount <= amount.to;
            }
        });

const filterByDateRange =
    (date: { from?: Date; to?: Date }) => (ts: Transaction[]) =>
        ts.filter((t) => {
            if (date.from && date.to) {
                return isWithinInterval(t.createdAt, {
                    start: date.from,
                    end: date.to,
                });
            } else if (date.from) {
                return isWithinInterval(t.createdAt, {
                    start: date.from,
                    end: t.createdAt,
                });
            } else if (date.to) {
                return isWithinInterval(t.createdAt, {
                    start: t.createdAt,
                    end: date.to,
                });
            }
        });

const filtersFunctions = (filters: FiltersType) => {
    const activeFilters: ActiveFilters = {};
    if (filters["card"]) activeFilters.card = filterByCard(filters["card"]);
    if (filters["installments"])
        activeFilters.installments = filterByInstallments(
            filters["installments"]
        );
    if (filters["paymentMethod"])
        activeFilters.paymentMethod = filterByPaymentMethod(
            filters["paymentMethod"]
        );
    if (filters["amount"])
        activeFilters.amount = filterByAmount(filters["amount"]);
    if (filters["date"])
        activeFilters.date = filterByDateRange(filters["date"]);

    return activeFilters;
};

export const getTransactions = async ({
    page = 1,
    filters = {},
}: {
    page?: number;
    filters?: FiltersType;
}) => {
    const filterFunctions = filtersFunctions(filters);
    const activeFilters = Object.keys(filters);
    try {
        const res = await fetch(URL_SERVICE_TRANSACTIONS, {
            cache: "force-cache",
            next: {
                revalidate: 3600,
            },
        });
        const { transactions } = (await res.json()) as {
            transactions: Transaction[];
        };
        const filteredTransactions = activeFilters.reduce(
            (acc, filterType) =>
                filterFunctions[filterType as keyof typeof filterFunctions]
                    ? filterFunctions[
                          filterType as keyof typeof filterFunctions
                      ]!(acc)
                    : acc,
            transactions
        );

        return filteredTransactions;
        // TODO: Implement manual pagination
        // if (page < 1 || isNaN(page)) page = 1;
        // const fromIndex = (page - 1) * ITEMS_PER_PAGE;
        // const toIndex = page * ITEMS_PER_PAGE;
        // const transactionsPage = transactions.slice(fromIndex, toIndex);
        // const totalPages = Math.ceil(transactions.length / ITEMS_PER_PAGE);
        // const currentPage = page;

        // return { page: transactionsPage, totalPages, currentPage };
    } catch {
        throw new Error("Fetching the transactions failed");
    }
};

export const getTransactionsByPeriod = async (period: Period) => {
    const today = new Date();
    try {
        const res = await fetch(URL_SERVICE_TRANSACTIONS, {
            cache: "force-cache",
            next: {
                revalidate: 3600,
            },
        });
        const { transactions } = (await res.json()) as {
            transactions: Transaction[];
        };

        // Filter transactions based on period
        const filteredTransactions = transactions.filter((transaction) => {
            const transactionDate = new Date(transaction.createdAt);

            switch (period) {
                case "day":
                    return isSameDay(transactionDate, today);
                case "week":
                    return isSameWeek(transactionDate, today);
                case "month":
                    return isSameMonth(transactionDate, today);
                default:
                    return true;
            }
        });

        return filteredTransactions;
        // TODO: Implement manual pagination
        // if (page < 1 || isNaN(page)) page = 1;
        // const fromIndex = (page - 1) * ITEMS_PER_PAGE;
        // const toIndex = page * ITEMS_PER_PAGE;
        // const transactionsPage = transactions.slice(fromIndex, toIndex);
        // const totalPages = Math.ceil(transactions.length / ITEMS_PER_PAGE);
        // const currentPage = page;

        // return { page: transactionsPage, totalPages, currentPage };
    } catch {
        throw new Error("Fetching the transactions failed");
    }
};

export const getTransactionsByDateRange = async (
    fromDate: Date,
    toDate?: Date
) => {
    try {
        const res = await fetch(URL_SERVICE_TRANSACTIONS, {
            cache: "force-cache",
            next: {
                revalidate: 3600,
            },
        });
        const { transactions } = (await res.json()) as {
            transactions: Transaction[];
        };

        // Filter transactions based on period
        const filteredTransactions = transactions.filter((transaction) => {
            const transactionDate = new Date(transaction.createdAt);
            if (!toDate)
                return format(transactionDate, "P") === format(fromDate, "P");
            return isWithinInterval(transactionDate, {
                start: fromDate,
                end: toDate,
            });
        });
        return filteredTransactions;
    } catch {
        throw new Error("Fetching the transactions by date range failed");
    }
};

// Helper functions for date comparison
function isSameDay(date1: Date, date2: Date): boolean {
    return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
    );
}

function isSameWeek(date1: Date, date2: Date): boolean {
    const startOfWeek1 = getStartOfWeek(date1);
    const startOfWeek2 = getStartOfWeek(date2);
    return isSameDay(startOfWeek1, startOfWeek2);
}

function isSameMonth(date1: Date, date2: Date): boolean {
    return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth()
    );
}

function getStartOfWeek(date: Date): Date {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
    return new Date(d.setDate(diff));
}
