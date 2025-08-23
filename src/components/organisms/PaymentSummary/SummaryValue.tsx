import { Transaction } from "@/services/transactions/types";
import { tryCatch } from "@/utils/tryCatch";
import { use } from "react";

interface SummaryValueProps {
    asyncTransactions: ReturnType<typeof tryCatch<Transaction[]>>;
}

export const SummaryValue = ({ asyncTransactions }: SummaryValueProps) => {
    const { data, error } = use(asyncTransactions);

    const totalEarnings = data
        ?.reduce((acc, transaction) => acc + transaction.amount, 0)
        .toFixed(2);

    return data ? (
        <p className="text-number-lg font-light text-neutral-hard-gray">
            + $ {String(totalEarnings).split(".")[0]},
            <span className="text-number-md text-inherit">
                {String(totalEarnings).split(".")[1] || "00"}
            </span>
        </p>
    ) : (
        <p>{error.message}</p>
    );
};
