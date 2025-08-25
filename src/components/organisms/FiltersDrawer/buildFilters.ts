import { FiltersType } from "@/services/transactions/actions";
import { PaymentMethod } from "@/services/transactions/types";

export function buildFiltersFromQueryParams(searchParams: {
    [key: string]: string | undefined;
}) {
    const filters: FiltersType = {};

    // Handle card filter
    if (
        searchParams.card &&
        ["visa", "mastercard", "amex"].includes(searchParams.card)
    ) {
        filters.card = searchParams.card as "visa" | "mastercard" | "amex";
    }

    // Handle installments filter
    if (
        searchParams.installments &&
        ["1", "2", "3", "6", "12"].includes(searchParams.installments)
    ) {
        const installments = parseInt(searchParams.installments);
        if (!isNaN(installments) && installments > 0) {
            filters.installments = installments;
        }
    }

    // Handle payment method filter
    if (
        searchParams.paymentMethod &&
        Object.keys(PaymentMethod).includes(searchParams.paymentMethod)
    ) {
        filters.paymentMethod =
            searchParams.paymentMethod as keyof typeof PaymentMethod;
    }

    // Handle amount filter
    if (searchParams.amountFrom || searchParams.amountTo) {
        const from = searchParams.amountFrom;
        const to = searchParams.amountTo;
        if (from && !isNaN(parseInt(from))) {
            filters.amount = {
                from: parseInt(from),
            };
        }
        if (to && !isNaN(parseInt(to))) {
            filters.amount = {
                ...filters.amount,
                to: parseInt(to),
            };
        }
    }

    // Handle date filter
    if (searchParams.dateFrom || searchParams.dateTo) {
        const from = searchParams.dateFrom
            ? new Date(searchParams.dateFrom)
            : undefined;
        const to = searchParams.dateTo
            ? new Date(searchParams.dateTo)
            : undefined;

        if (from !== undefined && !isNaN(from.getTime())) {
            filters.date = { ...filters.date, from };
        }
        if (to !== undefined && !isNaN(to.getTime())) {
            filters.date = { ...filters.date, to };
        }
    }

    return filters;
}
