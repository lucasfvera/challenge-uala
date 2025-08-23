import { TransactionItem } from "@/components/molecules/TransactionItem/TransactionItem";
import { Transaction } from "@/services/transactions/types";
import { tryCatch } from "@/utils/tryCatch";
import { Fragment, use } from "react";

interface TransactionListProps {
    asyncTransactions: ReturnType<typeof tryCatch<Transaction[]>>;
}

export const TransactionList = ({
    asyncTransactions,
}: TransactionListProps) => {
    const { data, error } = use(asyncTransactions);

    return (
        <div className="overflow-y-auto">
            {data ? (
                <div className="flex flex-col">
                    {data.map((transaction) => (
                        <Fragment key={transaction.id}>
                            <TransactionItem transaction={transaction} />
                            <div className="w-full border-b border-neutral-border last:hidden"></div>
                        </Fragment>
                    ))}
                </div>
            ) : (
                <div>{error.message}</div>
            )}
        </div>
    );
};
